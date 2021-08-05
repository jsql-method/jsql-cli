import {Params} from "../cmd/params";
import * as Lexer from "flex-js";

export class QueriesParser {

    static parseText(fileContent: string, params: Params): Set<string> {

        Lexer.prototype.echo = function () {};

        let startTime = new Date().getTime();

        fileContent = QueriesParser.isHtmlWithScript(fileContent);
        let matches = QueriesParser.collectMatches(fileContent);

        let sorted = Array.from(matches);

        sorted.sort(function (a, b) {
            return b.length - a.length;
        });

        matches = new Set(sorted);

        let endTime = new Date().getTime();

        if (params.debug) {
            console.log('Time: ' + (endTime - startTime) + 'ms');
            console.log('Matches: ', matches);
        }

        return matches;

    }


    static isHtmlWithScript(fileContent) {

        if (fileContent.indexOf('<script>') > -1) {

            let fileContentReal = null;

            try {
                fileContentReal = fileContent.substring(fileContent.indexOf('<script>') + 8, fileContent.indexOf('</script>'));
            } catch (e) {
                //throw error Error parsing HTML file
            }

            if (fileContentReal != null) {
                fileContent = fileContentReal;
            }

        }

        return fileContent


    }

    static collectMatches(fileContent): Set<string> {

        let matches = new Set();

        let lexer = new Lexer();
        lexer.setDebugEnabled(false);
        lexer.setIgnoreCase(true);

        lexer.addRule(/(["'])(?:(?=(\\?))\2.)*?\1/, function (lexer) {

            let text = lexer.text.trim();
            text = QueriesParser.filterMatch(text);

            if (text !== null) {
                matches.add(text);
            }

        });

        lexer.setSource(fileContent);
        lexer.lex();

        return matches;

    }


    static filterMatch(match): string {

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


}