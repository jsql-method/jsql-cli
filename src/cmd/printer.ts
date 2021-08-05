/*
 * Copyright (c) 2017-2019 JSQL Sp. z.o.o. (Ltd, LLC) www.jsql.it
 * See LICENSE or https://jsql.it/public-packages-license
 */

import chalk from 'chalk';
import {Query} from "../hasher/query";
import {Env} from "../env/env";
import * as request from "request";
import {Params} from "./params";

export class Printer {

    static printError(message: string, details?: string, params?: Params) {

        if (message) {
            console.log(chalk.redBright('Ups! Error occurred - ' + message));
        } else {
            console.log(chalk.redBright('Ups! Error occurred - we got report and send you email with link to issue'));

            if(details && params){
                Printer.reportError(details, params);
            }

        }

    }

    static reportError(details: string, params: Params){

        request.post({
            url: Env.getReportUrl(params.env),
            body: JSON.stringify({
                d: details,
                p: {
                    inputFile: params.inputFile,
                    outputFile: params.outputFile,
                    noArguments: params.noArguments,
                    help: params.help,
                    cwd: params.cwd,
                    devKeyFileName: params.devKeyFileName,
                    debug: params.debug,
                    env: params.env,
                    watch: params.watch,
                    inputDir: params.inputDir,
                    outputDir: params.outputDir,
                    inputPattern: params.inputPattern,
                    extensions: params.extensions,
                    version: params.version
                }
            }),
            headers: {
                'content-type': 'application/json',
                'Api-Key': params.apiKey,
                'Dev-Key': params.devKey
            }
        }, function (error, response, body) {

            if(params.debug){
                console.log(chalk.redBright('Report sended'));
            }

        });


    }

    static printSummary(queriesCount: number) {
        console.log(chalk.greenBright('___________________________'));
        console.log(chalk.blueBright(queriesCount + ' queries hashed '));
    }

    static printTime(time) {

        let timeText = '';
        if (time < 10) {
            timeText = chalk.greenBright(time + ' ms');
        } else if (time < 20) {
            timeText = chalk.cyanBright(time + ' ms');
        } else {
            timeText = chalk.redBright(time + ' ms ' + chalk.white(' Optimize your code or report a issue on jsql.it/issues'));
        }

        console.log(chalk.blueBright('Build in: ') + ' ' + timeText);
    }

    static printJSQL(callback) {

        console.log(chalk.blueBright("       _    _____    ____    _      "));
        console.log(chalk.blueBright("      | |  / ____|  / __ \\  | |     "));
        console.log(chalk.blueBright("      | | | (___   | |  | | | |     "));
        console.log(chalk.blueBright("  _   | |  \\___ \\  | |  | | | |     "));
        console.log(chalk.blueBright(" | |__| |  ____) | | |__| | | |____ "));
        console.log(chalk.blueBright("  \\____/  |_____/   \\___\\_\\ |______|"));
        console.log(chalk.blueBright("                                    "));

        callback();

    }

    static showHelp() {

        console.log('Available parameters:');
        console.log(chalk.blueBright('--apiKey') + ' Application key from JSQL customer panel');
        console.log(chalk.blueBright('--input') + ' Input file ex. /src/app.js');
        console.log(chalk.blueBright('--output') + ' Output file ex. /dist/app.js');
        console.log(chalk.blueBright('--devKeyFileName (optional)') + ' Provide custom developer key filename');
        console.log(chalk.green('Remember to put a file with a developer key in the project directory'));
        console.log('For more details see ' + chalk.bold('https://jsql.it/jsql-cli-docs'));

    }

    static showVersion() {
        console.log('JSQL CLI version is '+chalk.blueBright('1.4.0'));
    }

}




