const fs = require('fs');
const link = [ "<a href=\"./subpages/"/*full filename here */, "\">", /*truncated filename here*/"</a>"];

var subdirectoryFiles = fs.readdirSync('./subpages', {encoding: 'utf8'});
var contentFiles = [];

for(let i = 0; i < subdirectoryFiles.length; i++) {
    let cFile = subdirectoryFiles[i];
    if(cFile.match(/(.+\.md)|(.+\.html)/g)) contentFiles.push(cFile);
    else console.log(`File \"${cFile}\" in the subdirectory is not a markdown or HTML file.`);
}

let outputFile = fs.openSync("catalog.md", "w");

fs.writeSync(outputFile, "<title>Blog Catalog</title>\n");

for(let i = 0; i < contentFiles.length; i++) {
    let cFile = contentFiles[i];
    // Write a link to the page
    fs.writeSync(outputFile, link[0] + cFile + link[1] + cFile.split('.')[0] + link[2] + '\n'); 
}

fs.close(outputFile, () => {});
