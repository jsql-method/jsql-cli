/*
 * Copyright (c) 2017-2019 JSQL Sp. z.o.o. (Ltd, LLC) www.jsql.it
 * See LICENSE or https://jsql.it/public-packages-license
 */

export class Env {

    public static getServerUrl(env: string) : string {

        switch (env) {
            case 'local' :
                return 'http://localhost:9191';
            case 'dev' :
                return 'https://dev-api.jsql.it';
            case 'test' :
                return 'https://test-api.jsql.it';
            case 'prod' :
                return 'https://api.jsql.it';
        }

    }

    public static getReportUrl(env: string) : string {

        switch (env) {
            case 'local' :
                return Env.getServerUrl(env) + '/api/request/error';
            case 'dev' :
                return Env.getServerUrl(env) + '/api/request/error';
            case 'test' :
                return Env.getServerUrl(env) + '/api/request/error';
            case 'prod' :
                return Env.getServerUrl(env) + '/api/request/error';
        }

    }

    public static getRequestUrl(env: string): string {

        switch (env) {
            case 'local' :
                return Env.getServerUrl(env) + '/api/request/hashes';
            case 'dev' :
                return Env.getServerUrl(env) + '/api/request/hashes';
            case 'test' :
                return Env.getServerUrl(env) + '/api/request/hashes';
            case 'prod' :
                return Env.getServerUrl(env) + '/api/request/hashes';
        }

    }

}