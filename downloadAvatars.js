// This application uses the command line interface to search up a GitHub Repo and return
// the contributors and their avatars and save them in a file called contributors.

// We are using request because that's a project requirement and fs to be able to write files
const request = require('request');
const gitToken = require('./secrets.js');
//const fs = require('fs');

console.log('Welcome to the GitHub Avatar Downloader!');

function getRepoContributors(repoOwner, repoName, cb) {
  var options = {
    url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
    header: {
      'User-Agent': 'request'
    },
    "Authorization": gitToken
  };
  request(options, function(err, res, body) {
    cb(err, body);
  });
}

getRepoContributors("jquery", "jquery", function(err, result) {
  console.log("Errors:", err);
  console.log("Result:", result);
});

// We need to take in the name of a repo user and their repository directly from the command line

// Then we need to send a GET request