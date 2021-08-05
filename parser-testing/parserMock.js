var Lexer = require('flex-js');

Lexer.prototype.echo = function () {};

function parseText(fileContent) {

    let startTime = new Date().getTime();

    fileContent = isHtmlWithScript(fileContent);
    let matches = collectMatches(fileContent);

    let sorted = Array.from(matches);

    sorted.sort(function(a, b){
        return b.length - a.length;
    });

    matches = new Set(sorted);

    let endTime = new Date().getTime();

    console.log('Time: ' + (endTime - startTime) + 'ms');
    console.log('matches.size', matches.size);
    console.log('matches', matches);

    return new Set(sorted);

}

function isHtmlWithScript(fileContent){

    if(fileContent.indexOf('<script>') > -1){

        let fileContentReal = null;

        try {
            fileContentReal = fileContent.substring(fileContent.indexOf('<script>')+8, fileContent.indexOf('</script>'));
        }catch (e){
            //throw error Error parsing HTML file
        }

        if(fileContentReal != null){
            fileContent = fileContentReal;
        }

    }

    return fileContent


}

function collectMatches(fileContent) {

    let matches = new Set();

    var lexer = new Lexer();
    lexer.setDebugEnabled(false);
    lexer.setIgnoreCase(true);  // does not make sense for this scanner, just for reference

    lexer.addRule(/(["'])(?:(?=(\\?))\2.)*?\1/, function (lexer) {

        let text = lexer.text.trim();
        text = filterMatch(text);

        if(text !== null){
            matches.add(text);
        }

    });

    lexer.setSource(fileContent);
    lexer.lex();

    return matches;

}


function filterMatch(match) {

    match = match.trim();

    if(match.length > 1){
        match = match.substring(1, match.length - 1);
    }else {
        return null;
    }

    match = match.trim();

    if(!match.startsWith("@sql")){
        return null;
    }

    match = match.trim();

    if(match === '@sql'){
        return null;
    }

    return match.length === 0 ? null : match;

}

module.exports = {parseText};