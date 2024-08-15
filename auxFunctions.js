const fs = require('fs')

const getFilenames = async function() {
    const arrFilenames = [];
    const files = await fs.promises.readdir('./src-html/');
    for (const filename of files)
        arrFilenames.push(filename);
    // we make the last entry to be the 404.html file
    arrFilenames.sort().reverse();
    return arrFilenames;
}

function thisFunction(url, validFilenames) {
    if (url === '/')
        return validFilenames.indexOf('index.html');

    for (let i = 0; i < validFilenames.length; ++i) {
        if (url.indexOf('.') === -1) {
            if ((url + '.html') === ('/' + validFilenames[i]))
                return i
        } else {
            if (url === '/' + validFilenames[i])
                return i
        }
    }
    return validFilenames.length - 1;
}

module.exports = {
    getFilenames: getFilenames,
    thisFunction: thisFunction,
}
