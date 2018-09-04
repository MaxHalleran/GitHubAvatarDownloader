const request = require('request');
const fs = require('fs');
const token = require('./secrets.js');

console.log('Welcome to the GitHub Avatar Downloader!');

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

// //function check if the directory exists and if not will create it
// let checkDirectory = function(directory, callback) {
//   fs.stat(directory, function(err, stats) {
//     //Check if the error defined and the error code is "not exists"
//     if (err && err.errno === 34) {
//       //creates the directory
//       fs.mkdir(directory, callback);
//     } else {
//       callback(err);
//     }
//   });
// }

function downloadImageByURL(url, filePath) {

  // //check to make sure the directory exists. If not, create it
  // checkDirectory(filePath.substring(0, 9), function(err, stats) {
  //   return;
  // });

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
          console.log("Download Complete.")
         })

         //create a file with the image inside of it
         .pipe(fs.createWriteStream(filePath));
}

getRepoContributors("jquery", "jquery", function(err, result) {
  result.forEach( function (contributor) {
    downloadImageByURL(contributor.avatar_url, './avatars/' + contributor.login + '.jpg');
  });
});