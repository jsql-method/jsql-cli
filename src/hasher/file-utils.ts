/*
 * Copyright (c) 2017-2019 JSQL Sp. z.o.o. (Ltd, LLC) www.jsql.it
 * See LICENSE or https://jsql.it/public-packages-license
 */

import * as fs from "fs";
import * as fse from 'fs-extra';
import {Printer} from "../cmd/printer";
import {Params} from "../cmd/params";

export class FileUtils {

    static getFileContent(filePath: string): string {

        if(!fs.existsSync(filePath)){
            Printer.printError('File not exists '+filePath);
            return null;
        }

        return fs.readFileSync(filePath, 'utf8');
    }

    static saveFile(file: string, fileContent: string) : void {
        fse.outputFileSync(file, fileContent)
    }

    static getDeveloperKey(params: Params): string {

        if(params.devKey != null){
            return params.devKey;
        }

        let fileContent: string = FileUtils.getFileContent(params.devKeyFileName);

        if (fileContent == null) {
            //Avoid file not found error
            return null;
        }

        return fileContent;

    }

}