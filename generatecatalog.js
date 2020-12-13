const fs = require('fs');
const link = ["<a href=\"/techlog/subpages/"/*full filename here */, "\">", /*truncated filename here*/"</a>"];

var subdirectoryFiles = fs.readdirSync('./subpages', { encoding: 'utf8' });
var contentFiles = [];

for (let i = 0; i < subdirectoryFiles.length; i++) {
    let cFile = subdirectoryFiles[i];
    if (cFile.match(/.+\.html/g)) contentFiles.push(cFile);
    else console.log(`File \"${cFile}\" in the subdirectory is not a HTML file.`);
}

let outputFile = fs.openSync("catalog.html", "w");

// Set up the main file
fs.writeSync(outputFile, "<head>");
fs.writeSync(outputFile, "<title>techlog</title>\n");
// Viewport to make site responsive
fs.writeSync(outputFile, "<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n");
fs.writeSync(outputFile, "<link rel=\"stylesheet\" href=\"/techlog/assets/css/style.css\">\n");
fs.writeSync(outputFile, "<link rel=\"stylesheet\" href=\"/techlog/style/custom.css\">\n");
fs.writeSync(outputFile, "</head>\n<body>");

// Write the main page header
fs.writeSync(outputFile, "<section class=\"page-header\">\n");
fs.writeSync(outputFile, "<h1 class=\"project-name\">techlog catalog</h1>\n");
cDate = new Date();
fs.writeSync(outputFile, `<h2 class=\"project-tagline\">The catalog of the articles I've written up to this point, last updated ${cDate.getMonth().toString().padStart(2, '0')}/${cDate.getDay().toString().padStart(2, '0')}/${cDate.getFullYear()}<!--(MM.DD.YYYY)--> at ${cDate.getHours().toString().padStart(2, '0')}:${cDate.getMinutes().toString().padStart(2, '0')}:${cDate.getSeconds().toString().padStart(2, '0')}<!--(HH:MM:SS)-->.</h2>\n`);
fs.writeSync(outputFile, "</section>\n");

fs.writeSync(outputFile, "<section class=\"main-content\">\n");
for (let i = 0; i < contentFiles.length; i++) {
    let cFile = contentFiles[i];
    // Write a link to the page
    fs.writeSync(outputFile, "\t<p>" + link[0] + cFile + link[1] + cFile.split('.')[0] + link[2] + "</p>\n");
}

if(contentFiles.length <= 0) {
    fs.writeSync(outputFile, "<p>It seems that no articles have been written yet, please check later.</p>\n");
}

// Footer
fs.writeSync(outputFile, "<footer class=\"site-footer\">\n<span class=\"site-footer-owner\"><a href=\"https://github.com/Broken-Admin/techlog\">techlog</a> is maintained by <a href=\"https://github.com/Broken-Admin\">Broken-Admin</a>.</span>\n</footer>\n")
// End the main content section
fs.writeSync(outputFile, "</section>\n");
// End the body
fs.writeSync(outputFile, "</body>");

// Close the file and finalize the writing
fs.close(outputFile, () => { });