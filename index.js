fs = require('fs');

const express = require('express');
const app = express();

const { getFilenames, thisFunction } = require('./auxFunctions.js');
const pathHTML = './src-html/';

let validFilenames
getFilenames().then(result => validFilenames = result);

app.get('*', function(req, res) {
    const indexFile = thisFunction(req.url, validFilenames);
    fs.readFile(pathHTML + validFilenames[indexFile], function(error, data) {
        if (error) {
            res.writeHead(404, { 'Content-Type': 'text/html' });
            return res.end('404 Not Found');
        } else {
            if (indexFile === validFilenames.length - 1) {
                res.writeHead(404, { 'Content-Type': 'text/html' });
                res.write(data);
                return res.end('404 Not Found');
            } else {
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.write(data);
                return res.end();
            }
        }
    });
});

app.listen(8080, () => console.log('server is up'));
