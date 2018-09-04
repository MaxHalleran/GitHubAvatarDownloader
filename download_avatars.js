const request = require('request');
const fs = require('fs');
const token = require('./secrets.js');
const args = process.argv;

function getRepoContributors(repoOwner, repoName, cb) {

  var options = {
    url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
    headers: {
      'User-Agent': 'request',
      'Authorization': token.GITHUB_TOKEN
    }
  };

  request(options, function(err, res, body) {
    cb(err, JSON.parse(body));
  });

}

function checkDirectory(directory, callback) {
  fs.stat(directory, function(err, stats) {
    //Check if error defined and the error code is "not exists"
    if (err && err.errno === 34) {
      //Create the directory, call the callback.
      fs.mkdir(directory, callback);
    } else {
      //just in case there was a different error:
      callback(err);
    }
  });
}

function downloadImageByURL(url, filePath) {

  checkDirectory('./avatars', function(error) {
    if(error) {
      console.log("oh no!!!", error);
    } else {
      //Carry on.
    }
  });

  //Get request at https://sytantris.github.io/http-examples/future.jpg
  request.get(url)

         //Safeguard against an error
         .on('error', function(err) {
          throw err;
         })
         //on initial response back from the server
         //respond with the status code, message and the content type.
         //And let the user know that the image is downloading
         .on('response', function (response) {
          console.log("Response Status Code: ", response.statusCode);
          console.log("Response status Message: ", response.statusMessage);
          console.log("Response headers: ", response.headers['content-type']);
          console.log("Downloading image...");
         })

         //When the image has been downloaded, let the user know
         .on('end', function () {
          console.log("Download Complete.");
         })

         //create a file with the image inside of it
         .pipe(fs.createWriteStream(filePath));
}

getRepoContributors(args[2], args[3], function(err, result) {
  if (process.argv.length < 4) {
    console.log("Error. Please specify both the user and the repo");
    return;
  } else {
  result.forEach( function (contributor) {
    downloadImageByURL(contributor.avatar_url, './avatars/' + contributor.login + '.jpg');
  });
}});