/*
 * Copyright (c) 2017-2019 JSQL Sp. z.o.o. (Ltd, LLC) www.jsql.it
 * See LICENSE or https://jsql.it/public-packages-license
 */

import {Params} from "../cmd/params";
import {QueriesHasher} from "./queries-hasher";
import watch from "node-watch";
import * as fs from "fs";
import * as path from "path";

export class WatcherProcess {

    private queriesHasher: QueriesHasher;
    private params: Params = null;
    private extensions: string[] = ['js'];

    constructor() {
    }

    getFilesFromDirectory(dir: string, extensions: string[]) {

        let files = [];
        let self = this;
        let list = fs.readdirSync(dir);
        list.forEach(function(file) {
            file = path.normalize(dir + '/' + file);
            let stat = fs.statSync(file);
            if (stat && stat.isDirectory()) {
                files = files.concat(self.getFilesFromDirectory(file, extensions));
            } else {

                if(WatcherProcess.inExtension(file, extensions)){
                    files.push(file);
                }

            }
        });

        return files;

    }

    static inExtension(fileName: string, extensions: string[]) : boolean {

        for(let i = 0; i < extensions.length; i++){

            if(fileName.endsWith('.'+extensions[i])){
                return true;
            }

        }

        return false;

    }

    watch(params: Params) : void {

        this.params = params;
        this.queriesHasher = new QueriesHasher(this.params);

        if (this.params.devKey == null) {
            //Avoid developer key not found error
            return;
        }

        this.params.outputDir = this.params.outputFile;

        if(this.params.inputPattern){

            let extensionFromPattern = this.params.inputPattern.substring(this.params.inputPattern.indexOf('.')+1, this.params.inputPattern.length);

            if(extensionFromPattern === '*'){
                this.extensions = this.params.extensions.split(',');
            }else{
                this.extensions = [extensionFromPattern];
            }

        }

        this.watchDirectory();

    }

    hashQueriesInMemory() {

        let files = this.getFilesFromDirectory(this.params.inputDir, this.extensions);

        if(this.params.debug){
            console.log('Files:', files);
        }

        this.queriesHasher.hashQueriesInFiles(files);

    }

    watchDirectory() {

        this.hashQueriesInMemory();

        let recursive = this.params.inputPattern ? this.params.inputPattern.indexOf('**') > -1 : true;
        watch(this.params.inputDir, { recursive: recursive }, this.onFileChange.bind(this));

    }

    onFileChange(evt, fileName) {

        if (evt == 'update') {

            if(WatcherProcess.inExtension(fileName, this.extensions)){
                this.hashQueriesInMemory();
            }

        }

    }

}