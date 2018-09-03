// This application uses the command line interface to search up a GitHub Repo and return
// the contributors and their avatars and save them in a file called contributors.

// We are using request because that's a project requirement and fs to be able to write files
const request = require('request');
const fs = require('fs');

// We need to take in the name of a repo user and their repository directly from the command line

// Then we need to send a GET request