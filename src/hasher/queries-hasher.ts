/*
 * Copyright (c) 2017-2019 JSQL Sp. z.o.o. (Ltd, LLC) www.jsql.it
 * See LICENSE or https://jsql.it/public-packages-license
 */

import {Params} from "../cmd/params";
import {Printer} from "../cmd/printer";
import {Parser} from "./parser";
import {Query} from "./query";
import {FileUtils} from "./file-utils";
import {Env} from "../env/env";
import * as request from "request";

export class QueriesHasher {

    private params: Params = null;

    private timeStart: number;
    private timeEnd: number;

    private queriesList: Set<string>;

    private tmpOutputFile: string;
    private tmpFileContent: string;

    constructor(params: Params) {
        this.params = params;
    }

    hashQueries(inputFile, outputFile): void {

        this.timeStart = new Date().getTime();

        let fileContent: string = FileUtils.getFileContent(inputFile);

        if (fileContent == null) {
            //Avoid file not found error
            return;
        }

        this.queriesList = Parser.resolveQueries(fileContent, this.params);

        if (this.queriesList === null) {
            //Avoid processing when no queries
            return;
        }

        if (this.params.debug) {
            console.log('this.queriesList', this.queriesList);
        }

        this.tmpFileContent = fileContent;
        this.tmpOutputFile = outputFile;

        this.getHashes(this.afterHashes.bind(this));

    }

    afterHashes(hashes: Array<Query>, queriesMap: Map<string, string>): void {

        if (this.params.debug) {
            console.log('hashes', hashes);
        }

        if (hashes == null) {
            //Avoid server error
            return;
        }

        Parser.replaceQueries(this.tmpOutputFile, this.tmpFileContent, hashes, queriesMap);

        this.timeEnd = new Date().getTime();
        Printer.printTime(this.timeEnd - this.timeStart);

        this.timeStart = null;
        this.timeEnd = null;
        this.queriesList = null;

    }

    getHashes(callBack: any): void {

        let queriesMap = new Map<string, string>();
        let queriesArray = [];

        this.queriesList.forEach(function (query) {
            let plainQuery = query.replace('@sql','').trim();
            queriesMap.set(plainQuery, query);
            queriesArray.push(plainQuery);
        });

        if (this.params.debug) {
            console.log(JSON.stringify(queriesArray));
        }

        let self = this;

        request.post({
            url: Env.getRequestUrl(this.params.env),
            body: JSON.stringify(queriesArray),
            headers: {
                'content-type': 'application/json',
                'Api-Key': this.params.apiKey,
                'Dev-Key': this.params.devKey
            }
        }, function (error, response, body) {

            if(!response){

                if(self.params.debug){
                    console.log('error', error);
                }

                Printer.printError(null, JSON.stringify(error), self.params);
            }

            if (self.params.debug) {
                console.log('res.statusCode', response.statusCode);
            }

            if (response.statusCode === 200) {

                if (self.params.debug) {
                    console.log('res.body', body);
                }

                let res = JSON.parse(body).data as Array<Query>;

                callBack(res, queriesMap);

            } else if(response.statusCode !== 401 && response.statusCode !== 400) {
                Printer.printError(null, response, self.params);
            }else{

                if(body.indexOf("Unauthorized") > -1){
                    Printer.printError("you are not authorized - check your ApiKey and DevKey");
                }else{
                    Printer.printError(null);
                }


            }

            if (self.params.debug) {
                console.log('res.body', body);
            }

        });

    }

    static isHtmlWithScript(fileContent: string) : string {

        if(fileContent.indexOf('<script>') > -1){

            let fileContentReal = null;

            try {
                fileContentReal = fileContent.substring(fileContent.indexOf('<script>')+8, fileContent.indexOf('</script>'));
            }catch (e){
                Printer.printError('Cannot parse HTML file, syntax error');
            }

            if(fileContentReal != null){
                fileContent = fileContentReal;
            }

        }

        return fileContent

    }

    hashQueriesInFiles(files: string[]) {

        this.timeStart = new Date().getTime();

        let fileContent: string = '';

        for (let i = 0; i < files.length; i++) {
            let fileContentTmp = FileUtils.getFileContent(files[i]);
            fileContent += QueriesHasher.isHtmlWithScript(fileContentTmp);
        }

        if (fileContent == null) {
            //Avoid file not found error
            return;
        }

        if (this.params.debug) {
            FileUtils.saveFile("debug-out.js", fileContent);
        }

        this.queriesList = Parser.resolveQueries(fileContent, this.params);

        if (this.queriesList === null) {
            //Avoid processing when no queries
            return;
        }

        if (this.params.debug) {
            console.log('this.queriesList', this.queriesList);
        }

        this.getHashes(this.afterHashesInFiles.bind(this));

    }

    afterHashesInFiles(hashes: Array<Query>, queriesMap: Map<string, string>): void {

        if (this.params.debug) {
            console.log('hashes', hashes);
        }

        if (hashes == null) {
            //Avoid server error
            return;
        }

        if(this.queriesList == null){
            //Avoid error
            this.queriesList = new Set();
        }

        this.timeEnd = new Date().getTime();
        Printer.printSummary(this.queriesList.size);
        Printer.printTime(this.timeEnd - this.timeStart);

        this.timeStart = null;
        this.timeEnd = null;
        this.queriesList = null;

    }

}