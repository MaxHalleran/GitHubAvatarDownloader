// This application uses the command line interface to search up a GitHub Repo and return
// the contributors and their avatars and save them in a file called contributors.

// We are using request because that's a project requirement and fs to be able to write files. Our Authentication token is held in secret.js
const request = require('request');
const gitToken = require('./secrets.js');
const fs = require('fs');

//Just a friendly message to ensure it's (still) working
console.log('Welcome to the GitHub Avatar Downloader!');

//The actual function that will perform
function getRepoContributors(repoOwner, repoName, cb) {

  //the object holding the url and user info
  var options = {
    url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
    headers: {
      'User-Agent': 'request',
      'Authorization': gitToken.GITHUB_TOKEN
    },
  };

  //The request funciton
  request.get(/*Authorization: token options.headers.Authorization*/ options.url)
  console.log(options.url)

         .on('error', function(err){
          throw err;
         })

         .on('response', function(response) {
          console.log(response);
         })
  // request(options, function(err, res, body) {
  //   cb(err, body);
  // });
}

//Calling the getRepoContributors function with hardcoded queries.
getRepoContributors("jquery", "jquery", function(err, result) {
  console.log("Errors:", err);
  console.log("Result:", result);
});