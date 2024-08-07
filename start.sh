#!/bin/bash

# Check if the correct number of arguments is provided


# Clone the repository
rm -rf avtsl-acc-api
if git clone https://github.com/sandeepkj90/avtsl-acc-api.git ; then
  echo "Repository cloned successfully"
  cd avtsl-acc-api
  npm install
  pm2 stop index.js
  pm2 start index.js

else
  echo "Failed to clone repository"
  exit 1
fi
