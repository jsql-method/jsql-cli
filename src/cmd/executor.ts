/*
 * Copyright (c) 2017-2019 JSQL Sp. z.o.o. (Ltd, LLC) www.jsql.it
 * See LICENSE or https://jsql.it/public-packages-license
 */

import chalk from "chalk";
import {Params} from "./params";
import {Printer} from "./printer";
import {WatcherProcess} from "../hasher/watcher-process";
import {FileProcess} from "../hasher/file-process";
import {FileUtils} from "../hasher/file-utils";
import * as path from "path";

export class Executor {

    private DEV_KEY_FILENAME: string = 'jsql.key';

    watcherProcess: WatcherProcess;
    fileProcess: FileProcess;

    constructor() {
        this.watcherProcess = new WatcherProcess();
        this.fileProcess = new FileProcess();
    }

    getParameters(args: string[], cwd: string): Params {

        if (cwd === '\\' || cwd === '/') {
            cwd = '';
        }

        let params = {
            apiKey: null,
            devKey: null,
            inputFile: null,
            inputDir: null,
            outputFile: null,
            outputDir: null,
            noArguments: false,
            help: false,
            cwd: cwd,
            devKeyFileName: null,
            debug: false,
            env: 'prod',
            watch: false,
            extensions: null,
            version: false
        } as Params;

        for (let i = 0; i < args.length; i++) {

            if (args[i].indexOf("--") === 0) {

                let parameterName = args[i].substring(0, args[i].indexOf('=') > -1 ? args[i].indexOf('=') : args[i].length);
                parameterName = parameterName.replace('--', '').trim();

                let parameterValue = args[i].substring(args[i].indexOf('=') + 1, args[i].length).trim();

                switch (parameterName) {
                    case 'apiKey':
                    case 'devKeyFileName':
                    case 'env':
                    case 'extensions':
                    case 'devKey':
                        params[parameterName] = parameterValue;
                        break;
                    case 'output':
                    case 'input':
                        parameterValue = parameterValue.split('\\').join('/');
                        params[parameterName + 'File'] = path.normalize(cwd !== '' ? cwd + '/' + parameterValue : parameterValue);
                        break;
                    case 'help':
                    case 'debug':
                    case 'version':
                    case 'watch':
                        params[parameterName] = true;
                        break;
                }

            }

        }

        if (params.apiKey === null || params.inputFile === null || (!params.watch && params.outputFile === null)) {
            params.noArguments = true;
        }

        if (params.devKeyFileName == null) {
            params.devKeyFileName = this.DEV_KEY_FILENAME;
        }

        if (params.watch && params.inputFile.indexOf('*') > -1) {
            params.inputDir = path.normalize(params.inputFile.substring(0, params.inputFile.indexOf('*')));
            params.inputPattern = path.normalize(params.inputFile.substring(params.inputFile.indexOf('*'), params.inputFile.length));
        } else if (params.watch) {
            params.inputDir = path.normalize(params.inputFile + '');
        }

        return params;

    }

    execCli(args: string[], cwd: string): void {

        let params: Params = this.getParameters(args, cwd);
        params.devKey = FileUtils.getDeveloperKey(params);

        if (params.debug) {
            console.log('params : ', params);
        }

        if (params.watch) {
            this.watcherProcess.watch(params);
        } else {
            this.fileProcess.processFile(params);
        }

    }

    execCommand(args: string[], cwd: string, welcomeMessage: boolean): void {

        if (welcomeMessage) {
            Printer.printJSQL(init.bind(this));
        }

        function init() {

            let params: Params = this.getParameters(args, cwd);

            if (params.help) {
                Printer.showHelp();
            } else if (params.version) {
                Printer.showVersion();
            } else if (params.noArguments) {
                console.error('JSQL CLI: Insufficient parameters supplied to the command\nType ' + chalk.blueBright('--help') + ' for more details');
            } else {
                this.execCli(args, cwd);
            }

        }

    }

}