/*
 * Copyright (c) 2017-2019 JSQL Sp. z.o.o. (Ltd, LLC) www.jsql.it
 * See LICENSE or https://jsql.it/public-packages-license
 */

import {Params} from "../cmd/params";
import {QueriesHasher} from "./queries-hasher";
import * as fs from "fs";

export class FileProcess {

    private queriesHasher: QueriesHasher;

    constructor() {
    }

    processFile(params: Params): void {

        this.queriesHasher = new QueriesHasher(params);

        if (params.devKey == null) {
            //Avoid developer key not found error
            return;
        }

        this.queriesHasher.hashQueries(this.resolveFile(params.inputFile), this.resolveFile(params.outputFile));

    }

    resolveFile(file: string) : string {

        if(file.indexOf("[...]") > -1){

            file = file.split("\\").join("/");

            let fileDir = ".";
            let fileWithoutDir = file;

            if(file.indexOf("/") > -1){
                fileDir = file.substring(0, file.lastIndexOf("/"));
                fileWithoutDir = file.substring(file.lastIndexOf("/")+1, file.length);
            }

            let fileStart = fileWithoutDir.split('[...]')[0];
            let fileEnd = fileWithoutDir.split('[...]')[1];

            let files = fs.readdirSync(fileDir).filter((fn) => { return fn.startsWith(fileStart) && fn.endsWith(fileEnd); });

            if(files.length > 0){
                file = fileDir + '/' + files[0];
            }

        }

        return file;

    }


}