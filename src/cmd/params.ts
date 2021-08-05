/*
 * Copyright (c) 2017-2019 JSQL Sp. z.o.o. (Ltd, LLC) www.jsql.it
 * See LICENSE or https://jsql.it/public-packages-license
 */

export interface Params {

    apiKey: string;
    devKey: string,
    inputFile: string;
    outputFile: string;
    noArguments: boolean;
    help: boolean;
    cwd: string;
    devKeyFileName: string;
    debug: boolean;
    env: string;

    watch: boolean;
    inputDir?: string;
    outputDir?:string;
    inputPattern?:string;

    extensions?:string;

    version?:boolean;

}