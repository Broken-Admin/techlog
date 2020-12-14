const fs = require('fs');
const link = ["<a href=\"/techlog/subpages/"/*full filename here */, "\">", /*truncated filename here*/"</a>"];

var subdirectoryFiles = fs.readdirSync('./subpages', { encoding: 'utf8' });
var contentFiles = [];

for (let i = 0; i < subdirectoryFiles.length; i++) {
    let cFile = subdirectoryFiles[i];
    let cStats = fs.statSync(`subpages/${cFile}`);
    if (cFile.match(/.+\.html/g)) contentFiles.push({filename: cFile, birthtimeMs: cStats.birthtimeMs});
    else console.log(`File \"${cFile}\" in the subdirectory is not a HTML file.`);
}

// Sort the files by their creation timestamp, ascending in date
contentFiles.sort((a, b) => {
    return(a.birthtimeMs - b.birthtimeMs);
});

// Simplify the file objects to just filenames
for(let i = 0; i < contentFiles.length; i++) {
    let cFileObject = contentFiles[i];
    contentFiles[i] = cFileObject.filename;
}

let outputFile = fs.openSync("catalog.html", "w");

// Set up the main file

fs.writeSync(outputFile, "<head>");
fs.writeSync(outputFile, "<title>techlog: catalog</title>\n");
// Viewport to make site responsive
fs.writeSync(outputFile, "<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n");
fs.writeSync(outputFile, "<link rel=\"stylesheet\" href=\"/techlog/assets/css/style.css\">\n");
fs.writeSync(outputFile, "<link rel=\"stylesheet\" href=\"/techlog/style/custom.css\">\n");
fs.writeSync(outputFile, "</head>\n<body>");

// Write the main page header
fs.writeSync(outputFile, "<section class=\"page-header\">\n");
fs.writeSync(outputFile, "<h1 class=\"project-name\">techlog catalog</h1>\n");
cDate = new Date();
fs.writeSync(outputFile, `<h2 class=\"project-tagline\">The catalog of the articles I've written up to this point, last updated ${cDate.getDate().toString().padStart(2, '0')}/${cDate.getMonth().toString().padStart(2, '0')}/${cDate.getFullYear()}<!--(DD.MM.YYYY)-->.</h2>\n`);
// Return to Landing Page button
fs.writeSync(outputFile, "<a href=\"https://broken-admin.github.io/techlog\" class=\"btn\">Return to Landing Page</a>");
fs.writeSync(outputFile, "</section>\n");

fs.writeSync(outputFile, "<section class=\"main-content\">\n");
// Link are written to the catalog in ascending of creation date and time.
for (let i = 0; i < contentFiles.length; i++) {
    let cFile = contentFiles[i];
    let cStats = fs.statSync(`subpages/${cFile}`);
    // The date constructor needs Ms
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/Date
    let birthDate = new Date(cStats.birthtimeMs)
    let modifiedDate = new Date(cStats.mtimeMs);
    // Write a link to the page
    fs.writeSync(outputFile, `\t<p>${link[0]}${cFile}${link[1]}${cFile.split('.')[0]}${link[2]} | `);
    fs.writeSync(outputFile, `File created ${birthDate.getDate().toString().padStart(2, '0')}/${birthDate.getMonth().toString().padStart(2, '0')}/${birthDate.getFullYear()}<!--(DD.MM.YYYY)-->, `);
    fs.writeSync(outputFile, `last modified ${modifiedDate.getDate().toString().padStart(2, '0')}/${modifiedDate.getMonth().toString().padStart(2, '0')}/${modifiedDate.getFullYear()}<!--(DD.MM.YYYY)-->.`)
    fs.writeSync(outputFile, "</p>\n");
}

if(contentFiles.length <= 0) {
    fs.writeSync(outputFile, "<p>It seems that no articles have been written yet, please check later.</p>\n");
}

// Footer
fs.writeSync(outputFile, "<div class=\"center-button\"><a href=\"#\" class=\"btn page-button\">Go to Top</a></div>");
fs.writeSync(outputFile, "<footer class=\"site-footer\">\n<span class=\"site-footer-owner\"><a href=\"https://github.com/Broken-Admin/techlog\">techlog</a> is maintained by <a href=\"https://github.com/Broken-Admin\">Broken-Admin</a>.</span>\n</footer>\n")
// End the main content section
fs.writeSync(outputFile, "</section>\n");
// End the body
fs.writeSync(outputFile, "</body>");

// Close the file and finalize the writing
fs.close(outputFile, () => { });