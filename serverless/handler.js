'use strict'

const AWS = require('aws-sdk'); // eslint-disable-line import/no-extraneous-dependencies
const ddb = new AWS.DynamoDB.DocumentClient()
const shortid = require('shortid');
const commonHeaders = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*'
}

const tableName = "minesweeper"

const handleGenericError = (
  err = 'No error object',
  cb,
  msg = 'There was a problem',
  statusCode = 500
) => {
  console.warn(msg)
  console.warn(err)
  cb(null, {
    statusCode,
    headers: {
      ...commonHeaders,
      'Content-Type': 'text/plain',
    },
    body: msg
  })
}

module.exports.hello = async (event, context, callback) => {
  console.log('Hello')
  callback(null, {
    statusCode: 200,
    headers: {
      ...commonHeaders,
      'Content-Type': 'text/plain',
    },
    body: 'Helloooo'
  })
}

module.exports.getGame = async (event, context, callback) => {
  console.log('Get game')
  try {
    const query = event.queryStringParameters
    console.log(query)
    const game = query.game || null
    console.log('Game: ' + game)

    if (!game) {
      handleGenericError(null, callback, 'No game in query', 401) 
      return
    }

    const { Items, Count } = await ddb.query({
      TableName: tableName,
      KeyConditionExpression: "#game = :game",
      ExpressionAttributeNames:{
        "#game": "game"
      },
      ExpressionAttributeValues: {
        ":game": game
      }
    }).promise()

    if (Count === 0) {
      handleGenericError(null, callback, 'Game not found', 404)
      return
    }

    callback(null, {
      statusCode: 200,
      headers: {
        ...commonHeaders
      },
      body: JSON.stringify(Items[0])
    })
  } catch (err) {
    handleGenericError(err, callback)
  }
}

module.exports.storeGame = async (event, context, callback) => {
  console.log('Store game')
  try {
    const body = JSON.parse(event.body)
    const game = body.game || shortid.generate()
    const cells = body.cells

    if (!cells) {
      handleGenericError(null, callback, 'No cells in request body', 401) 
      return
    }

    console.log('Putting cells in DynamoDB')
    console.log('Example cell: ' + JSON.stringify(cells[0]))
    await ddb.put({
      TableName: tableName,
      Item: {
        game,
        cells
      },
    }).promise()
    
    callback(null, {
      statusCode: 200,
      headers: {
        ...commonHeaders
      },
      body: JSON.stringify({
        game
      })
    })
  } catch (err) {
    handleGenericError(err, callback)
  }
}

module.exports.deleteGame = async (event, context, callback) => {
  console.log('Delete game')
  try {
    const query = event.queryStringParameters
    console.log(query)
    const game = query.game || null
    console.log('Game: ' + game)

    if (!game) {
      handleGenericError(null, callback, 'No game in query', 401) 
      return
    }

    await ddb.delete({
      TableName: tableName,
      Key:{
        "game": game
      },
    }).promise()

    callback(null, {
      statusCode: 200,
      headers: {
        ...commonHeaders,
        'Content-Type': 'text/plain'
      },
      body: `Game "${game}" deleted succesfully`
    })
  } catch (err) {
    handleGenericError(err, callback)
  }
}
