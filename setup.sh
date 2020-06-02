#!/bin/sh

cd client/
serverless deploy

cd ../serverless/ 
serverless deploy
