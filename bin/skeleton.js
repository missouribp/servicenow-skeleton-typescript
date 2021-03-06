#!/usr/bin/env node

'use strict'
var fs = require('fs');
var path = require('path');

var copyFile = function(srcFile, destFile) {
    var content = fs.readFileSync(srcFile, 'utf8');
    fs.writeFileSync(destFile, content, 'utf8');
}

if(process.argv[process.argv.length-1] == 'init'){
    console.log('Initializing ServiceNow Skeleton Project');

    var appRoot = process.cwd();

    var copyFiles = ['servicenowconfig.js', 'src/tsconfig.json', 'typings.json', 'tslint.json'];
    var sourceRoot = path.relative(appRoot, path.dirname(__dirname));

    copyFiles.forEach(file => {
        var dest = path.join(appRoot, path.basename(file));
        if(!fs.existsSync(dest)){
            copyFile(path.join(sourceRoot, file), dest);
        }
    });

    var gulpFileDest = path.join(appRoot, 'gulpfile.js');
    var content = "require('require-dir')('" + path.normalize(path.join(sourceRoot, "dist")).replace(/\\/g, '\\\\') + "')";
    if(fs.existsSync(gulpFileDest)){
        content = fs.readFileSync(gulpFileDest, 'utf8') + '\n' + content;
    }
    
    fs.writeFileSync(gulpFileDest, content);

    console.info("Init complete.  You may also need to run 'typings install' to finish setting up the skeleton");
}
else{
    console.info('Valid Commands:');
    console.info('init : Initializes the current directory for the servicenow skeleton project');
}