'use strict'

const AWS = require('aws-sdk'); // eslint-disable-line import/no-extraneous-dependencies
const ddb = new AWS.DynamoDB.DocumentClient();

module.exports.hello = async (event, context, callback) => {
  console.log('Hello')
  callback(null, {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    body: 'Helloooo'
  })
}

module.exports.getGame = async (event, context, callback) => {
  console.log('Get game')
  callback(null, {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    body: 'Get game'
  })
}

module.exports.storeGame = async (event, context, callback) => {
  console.log('Store game')
  const body = JSON.parse(event.body)
  try {
    const cells = body.cells || []

    console.log('Putting cells in DynamoDB')
    console.log('Example cell: ' + JSON.stringify(cells[0]))
    await ddb.put({
      TableName: 'minesweeper',
      Item: {
        game: 'cc',
        cells
      },
    }).promise()
    
    callback(null, {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({
        game: 'cc'
      })
    })
  } catch (err) {
    const msg = 'There was a problem'
    console.warn(msg)
    console.warn(err)
    callback(null, {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      body: msg
    })
  }
}
