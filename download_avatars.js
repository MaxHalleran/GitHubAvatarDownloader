//Initialize all the modules and information needed throughout the program
const dotenv = require('dotenv').config;
const request = require('request');
const fs = require('fs');
const args = process.argv;

function getRepoContributors(repoOwner, repoName, cb) {

  if (process.argv.length < 4) {
    console.log("Error. Please specify both the user and the repo");
    return;
  }

  var options = {
    url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
    headers: {
      'User-Agent': 'request',
      'Authorization': dotenv.GITHUB_TOKEN
    }
  };

  request(options, function(err, res, body) {
    cb(err, JSON.parse(body));
  });
}

function checkDirectory(directory) {
  if (!fs.existsSync(directory)) {
    fs.mkdirSync(directory);
  }
}

function downloadImageByURL(url, filePath) {

  checkDirectory('./avatars');

  //Get request at https://sytantris.github.io/http-examples/future.jpg
  request.get(url)

         //Safeguard against an error
         .on('error', function(err) {
          throw err;
         })
         //on initial response back from the server, respond with the status code, message and the content type.
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
  console.log(result);
  //result.forEach( function (contributor) {
    //downloadImageByURL(contributor.avatar_url, './avatars/' + contributor.login + '.jpg');
//  });
});