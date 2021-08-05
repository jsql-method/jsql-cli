/*
 * Copyright (c) 2017-2019 JSQL Sp. z.o.o. (Ltd, LLC) www.jsql.it
 * See LICENSE or https://jsql.it/public-packages-license
 */

'use strict';

if (window.JSQL) {
    throw new Error('JSQL: Main object conflict');
} else {

    window.JSQL = function (config) {

        this.host = null;
        this.path = null;
        this.querySet = {};
        this.headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        };

        if(config){

            if(config.apiKey){
                this.headers['Api-Key'] = config.apiKey;
            }

            if(config.devKey){
                this.headers['Dev-Key'] = config.devKey;
            }

        }

        this.hideErrors = false;
        this.rxjs = false;

        this.setConfig(config);

    }

}

JSQL.prototype.setConfig = function (config) {

    if (config === undefined || config === null || Object.keys(config).length === 0) {
        config = {};
    }

    if (config.host === undefined || config.host === null || typeof config.host !== 'string' || config.host.trim().length === 0 || config.host === '') {
        config.host = 'https://provider.jsql.it/';
    }

    if (config.path === undefined || config.path === null || typeof config.path !== 'string' || config.path.trim().length === 0 || config.path === '') {
        config.path = '/api/jsql/';
    }

    if (config.host.endsWith('/') && config.path.startsWith('/')) {
        config.path = config.path.substring(1, config.path.length);
    }

    if (!config.host.endsWith('/') && !config.path.startsWith('/')) {
        config.path = '/'+config.path;
    }

    if (!config.path.endsWith('/')) {
        config.path += '/';
    }

    if (config.hideErrors !== undefined && config.hideErrors !== null) {
        this.hideErrors = config.hideErrors;
    }

    this.host = config.host;
    this.path = config.path;
    this.url = this.host + this.path;
    this.rxjs = config.rxjs === undefined ? false : config.rxjs;

};

/**
 * Function to override - should return promise
 *
 * @param type
 * @param data
 * @param headers
 * @returns {*}
 */
JSQL.prototype.request = function () {
    this.throw('No request implementation');
};

/**
 * Function to override - should return complete promise / subscribe
 * Please create promise with existing function construct()
 *
 * @param token
 * @param type
 */
JSQL.prototype.wrap = function () {
    this.throw('No wrap implementation');
};

JSQL.prototype.construct = function (token, type, options) {

    var _JSQL = this;

    var isTransaction = false;
    function prepareForTransaction(){

        isTransaction = true;

        if(!options){
            options = { headers: {} };
        }

        if (options.headers === undefined || options.headers === null) {
            options.headers = {};
        }

        options.headers['txid'] = token.txid;

        token = token.token;

    }

    if(type === 'rollback' || type === 'commit'){
        prepareForTransaction();
    }else if(token !== null && token !== undefined){

        if(token.token && token.txid){
            prepareForTransaction();
        }

    }

    if(isTransaction && type !== 'rollback' && type !== 'commit' && token === undefined || token === null || (typeof token !== 'string' && !this.isArray(token))){
        this.throw('Unable to execute with unset token');
    }else if(token === undefined || token === null || (typeof token !== 'string' && !this.isArray(token))) {
        this.throw('Unable to execute with unset token');
    }

    var defaultOptions = {
        throwSelectOneError: false,
        ignoreSelectOneMoreResults: (type === 'selectOne' ? true : false),
        headers: {},
        successName: 'success',
        errorName: 'error',
        alwaysName: 'always'
    };

    if (options === undefined || options === null) {
        options = defaultOptions;
    } else {

        for (var option in defaultOptions) {

            if (defaultOptions.hasOwnProperty(option)) {

                if (options[option] === undefined || options[option] === null) {
                    options[option] = defaultOptions[option];
                }

            }

        }

    }

    if (options.headers === undefined || options.headers === null) {
        options.headers = {};
    }

    for (var header in _JSQL.headers) {

        if (_JSQL.headers.hasOwnProperty(header)) {
            if (options.headers[header] === undefined || options.headers[header] === null) {
                options.headers[header] = _JSQL.headers[header];
            }
        }

    }

    var promise = {
        xhrPromise: null,
        type: type,
        isUsedParamsArray: false,
        isTransaction: isTransaction,
        headers: options.headers,
        options: options,
        data: {
            token: token,
            params: {}
        },
        querySet: [],
        catchCallback: function () {
        },
        param: function (paramName, paramValue) {

            if(promise.type === 'rollback'){
                _JSQL.throw('Transactions already rollbacked');
                return promise;
            }

            if(promise.type === 'commit'){
                _JSQL.throw('Transaction already commited');
                return promise;
            }

            if (promise.isUsedParamsArray) {
                _JSQL.throw('Cannot mix params array and single params');
                return promise;
            }

            if (paramName !== undefined && paramName !== null && typeof paramName === 'string' && paramValue) {

                if (promise.data.params[paramName] !== undefined) {
                    console.warn('JSQL: Parameter "' + paramName + '" already exist, will be replaced');
                }

                promise.data.params[paramName] = paramValue;

            } else {
                _JSQL.throw('"param" function accept args: [paramName:string, paramValue:primitive]');
            }

            return promise;

        },
        params: function (paramsArrayOrParamsObject) {

            if(promise.type === 'rollback'){
                _JSQL.throw('Transactions already rollbacked');
                return promise;
            }

            if(promise.type === 'commit'){
                _JSQL.throw('Transaction already commited');
                return promise;
            }

            if (_JSQL.isArray(paramsArrayOrParamsObject)) {

                if (!_JSQL.isEmptyObject(promise.data.params)) {
                    _JSQL.throw('Cannot mix params array and object params');
                    return promise;
                }

                promise.isUsedParamsArray = true;

                promise.data.params = paramsArrayOrParamsObject;

            } else {

                _JSQL.each(paramsArrayOrParamsObject, function (paramName, paramValue) {

                    if (promise.data.params[paramName]) {
                        console.warn('JSQL: Parameter "' + paramName + '" already exist, will be replaced');
                    }

                    promise.data.params[paramName] = paramValue;

                });

            }

            return promise;

        },
        successResultCallback: function (result, callBack) {

            if(promise.type === 'commit' || promise.type === 'rollback'){

                if (_JSQL.rxjs) {
                    return result;
                } else {
                    callBack(result);
                }

            }else if (promise.type === 'selectOne' && !promise.options.ignoreSelectOneMoreResults && result.length > 1) {
                promise.options.throwSelectOneError = true;
            } else if (_JSQL.isArray(result)) {

                if (_JSQL.rxjs) {
                    return result;
                } else if (promise.type === 'selectOne' && promise.options.ignoreSelectOneMoreResults) {
                    callBack(result.length > 0 ? result[0] : null);
                } else {
                    callBack(result);
                }

            } else {

                if (_JSQL.rxjs) {
                    return result;
                } else {
                    callBack(result);
                }

            }

        },
        then: function (callBack) {

            promise.checkAndCreateXhrPromise();
            promise.createAlways();

            promise.xhrPromise[promise.options.successName](function (result) {
                promise.successResultCallback(result, callBack);
            });

            return promise;

        },
        thenRxjs: function (result) {
            return promise.successResultCallback(result);
        },
        catch: function (callBack) {

            promise.checkAndCreateXhrPromise();
            promise.createAlways();

            promise.xhrPromise[promise.options.errorName](function (error) {
                callBack(error);
            });

            promise.catchCallback = callBack;

            return promise;

        },
        catchRxjs: function (error) {
            return error;
        },
        createAlways: function () {

            if (!promise.xhrPromise[promise.options.alwaysName]) {
                promise.xhrPromise[promise.options.alwaysName] = function () {

                    if (promise.options.throwSelectOneError) {
                        promise.catchCallback("JSQL: More than one result not allowed with selectOne");
                    }

                }
            }

        },
        checkAndCreateXhrPromise: function () {

            if (!promise.xhrPromise) {
                promise.xhrPromise = _JSQL.request(_JSQL.url + (promise.type === 'selectOne' ? 'select' : promise.type), promise.data, promise.headers, promise);
            }

        }
    };

    return promise;

};

/**
 * Set of operations functions
 * @param token
 */
JSQL.prototype.select = function (token) {
    return this.wrap(token, 'select', this);
};

JSQL.prototype.selectOne = function (token) {
    return this.wrap(token, 'selectOne', this);
};

JSQL.prototype.update = function (token) {
    return this.wrap(token, 'update', this);
};

JSQL.prototype.insert = function (token) {
    return this.wrap(token, 'insert', this);
};

JSQL.prototype.remove = function (token) {
    return this.wrap(token, 'delete', this);
};

JSQL.prototype.delete = function (token) {
    return this.wrap(token, 'delete', this);
};/*
 * Copyright (c) 2017-2019 JSQL Sp. z.o.o. (Ltd, LLC) www.jsql.it
 * See LICENSE or https://jsql.it/public-packages-license
 */


/**
 * Named queries repositories
 */
JSQL.prototype.querySet = {};
JSQL.prototype.repoSet = {};
JSQL.prototype.repo = function (name) {

    if (!name) {
        return this.repoSet;
    }

    var repoSet = {};
    if (name) {

        if (!this.repoSet[name]) {
            this.repoSet[name] = {};
        }

        repoSet = this.repoSet[name];

    }


    var self = this;
    var repoObj = {
        name: name,
        set: function (queryName, sqlQueryFunction) {
            self.set(this.name + '.' + queryName, sqlQueryFunction);
            return this;
        },
        get: function (queryName) {
            var args = self.toArray(arguments);
            args.shift();
            args.unshift(this.name + '.' + queryName);
            return self.get.apply(self, args);
        }
    };

    return Object.assign(repoObj, repoSet);

};

JSQL.prototype.get = function (queryName) {

    var set = this.querySet[queryName] || null;
    if (this.isFunction(set)) {

        var args = [];
        for (var i = 1; i < arguments.length; i++) {
            args.push(arguments[i]);
        }

        var out = set.apply(this, args);
        return out.build();

    }

    return set;
};

JSQL.prototype.set = function (queryName, sqlQuery) {
    this.querySet[queryName] = sqlQuery;
    return this;
};

/**
 * Creates independed queries builder structure
 * @param sqlQuery
 * @returns {{setName: string, append: append}}
 */
JSQL.prototype.query = function (sqlQuery) {

    var self = this;

    var setName = 'set_' + Object.keys(this.querySet).length;
    this.querySet[setName] = [sqlQuery];

    return {
        __isStructure: true,
        __setName: setName,
        build: function () {
            return self.querySet[this.__setName];
        },
        append: function (sqlQuery) {
            self.querySet[this.__setName].push(' ' + sqlQuery + ' ');
            return this;
        }
    };

};/*
 * Copyright (c) 2017-2019 JSQL Sp. z.o.o. (Ltd, LLC) www.jsql.it
 * See LICENSE or https://jsql.it/public-packages-license
 */


JSQL.prototype.txid = function(){

    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    var time = new Date().getTime()+'';
    for (var i = 0; i < time.length; i++){
        text += possible.charAt(Math.floor(Math.random() * possible.length));
        text += time[0];
    }

    return text;
};

JSQL.prototype.tx = function () {

    var self = this;

    var jsqlTx = {
        __txid: self.txid(),
        select: function (token) {
            return self.wrap({token: token, txid: jsqlTx.__txid}, 'select', self);
        },
        selectOne: function (token) {
            return self.wrap({token: token, txid: jsqlTx.__txid}, 'selectOne', self);
        },
        update: function (token) {
            return self.wrap({token: token, txid: jsqlTx.__txid}, 'update', self);
        },
        insert: function (token) {
            return self.wrap({token: token, txid: jsqlTx.__txid}, 'insert', self);
        },
        remove: function (token) {
            return self.wrap({token: token, txid: jsqlTx.__txid}, 'delete', self);
        },
        delete: function (token) {
            return self.wrap({token: token, txid: jsqlTx.__txid}, 'delete', self);
        },
        commit: function(){
            return self.wrap({token: '', txid: jsqlTx.__txid}, 'commit', self);
        },
        rollback: function(){
            return self.wrap({token: '', txid: jsqlTx.__txid}, 'rollback', self);
        }
    };

    return jsqlTx;

};
/*
 * Copyright (c) 2017-2019 JSQL Sp. z.o.o. (Ltd, LLC) www.jsql.it
 * See LICENSE or https://jsql.it/public-packages-license
 */


JSQL.prototype.isFunction = function (obj) {
    return typeof obj === 'function' || false;
};

JSQL.prototype.throw = function (error) {

    if (!this.hideErrors) {
        throw new Error('JSQL Core error: '+error);
    }

};

JSQL.prototype.each = function (obj, iterator) {

    for (var prop in obj) {

        if (obj.hasOwnProperty(prop)) {
            iterator(prop, obj[prop]);
        }

    }

};

JSQL.prototype.isEmptyObject = function (obj) {

    var isEmpty = true;
    for (var prop in obj) {

        if (obj.hasOwnProperty(prop)) {

            if (obj[prop] !== undefined) {
                isEmpty = false;
                break;
            }

        }

    }

    return isEmpty;

};

JSQL.prototype.isArray = function (obj) {

    if (typeof Array.isArray === 'undefined') {
        return Object.prototype.toString.call(obj) === '[object Array]';
    } else {
        return Array.isArray(obj);
    }

};

JSQL.prototype.toArray = function(arrayLike){

    var arr = [];
    for(var i = 0; i < arrayLike.length; i++){
        arr[i] = arrayLike[i];
    }

    return arr;

};/*
 * Copyright (c) 2017-2019 JSQL Sp. z.o.o. (Ltd, LLC) www.jsql.it
 * See LICENSE or https://jsql.it/public-packages-license
 */

if (window.module !== undefined) {
    module.exports = JSQL;
}
;/*
 * Copyright (c) 2017-2019 JSQL Sp. z.o.o. (Ltd, LLC) www.jsql.it
 * See LICENSE or https://jsql.it/public-packages-license
 */

(function (angular) {
    'use strict';

    angular
        .module('jsql-angular', [])
        .provider('jsql', jsql);

    /**
     * @ngInject
     */
    function jsql() {

        var _jsql = null;
        var config = null;

        this.setConfig = function (jsqlConfig) {
            config = jsqlConfig;
        };

        this.$get = ["$http", function unicornLauncherFactory($http) {

            if(_jsql == null){
                jsqlOverride($http);
                _jsql = new JSQL(config);
            }

            return _jsql;

        }];

    }

    function jsqlOverride($http) {

        /**
         * Override @request function
         * @param requestUrl
         * @param requestData
         * @param requestHeaders
         * @returns promise
         */
        JSQL.prototype.request = function (requestUrl, requestData, requestHeaders) {

            return $http({
                url: requestUrl,
                method: 'POST',
                dataType: 'json',
                headers: requestHeaders,
                data: requestData
            });

        };

        /**
         * Overridie @wrap function
         * @param token
         * @param queryType
         * @returns promise
         */
        JSQL.prototype.wrap = function (token, queryType) {

            return this.construct(token, queryType, {
                successName: 'then',
                errorName: 'catch',
                alwaysName: 'finally'
            });

        };

    }

})(angular);
;'use strict';

var app = angular.module('testApp',
    ['templates-main', 'ui.router', 'ngRoute', 'ngSanitize', 'ngAnimate', 'jsql-angular'])

    .config(['$httpProvider', '$provide', function ($httpProvider) {

        $httpProvider.defaults.useXDomain = true;
        delete $httpProvider.defaults.headers.common["X-Requested-With"];
    }])

    .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {

        $stateProvider.state('home', {
            url: '/',
            templateUrl: 'app/controllers/home/home.html',
            controller: 'HomeController',
            controllerAs: 'vm',
            data: {}
        });

        $urlRouterProvider.otherwise('/');

    }])

    .config(['jsqlProvider', function (jsqlProvider) {

        jsqlProvider.setConfig({
            host: window.host,
            apiKey: window.apiKey,
            devKey: window.devKey
        });

    }]);
;(function (angular) {
    'use strict';

    angular
        .module('testApp')
        .factory('Cases', ['jsql', Cases]);

    /**
     * @ngInject
     */
    function Cases(jsql) {

        var cases = {
            cases: {},
            names: {},
            results: [],
            resultCase: function(status, duration, caseName){
                cases.results.unshift({
                    status: status,
                    duration: duration,
                    caseName: caseName
                });
            }
        };

        cases.names.caseName1 = 'Insert person';
        cases.cases[cases.names.caseName1] = function () {

            var start = new Date().getTime();

            var resultCallback = function (status) {
                var end = new Date().getTime();
                var duration = end - start;

                cases.resultCase(status, duration, cases.names.caseName1);
                cases.cases[cases.names.caseName2]();

            };

            try {

                jsql.insert("@sql insert into person (id, name, surname, age) values (nextval('person_id_seq'), :name, :surname, :age)")
                    .params({
                        name: 'Mirek',
                        surname: 'Wołyński',
                        age: 38
                    })
                    .then(function (result) {
                        console.log(cases.names.caseName1, result);
                        resultCallback('SUCCESS');
                    })
                    .catch(function (error) {
                        console.error(error);
                        resultCallback('FAILED');
                    })

            } catch (error) {
                console.error(error);
                resultCallback('FAILED');
            }


        };



        cases.names.caseName2 = 'Insert car';
        cases.cases[cases.names.caseName2] = function () {

            var start = new Date().getTime();

            var resultCallback = function (status) {
                var end = new Date().getTime();
                var duration = end - start;

                cases.resultCase(status, duration, cases.names.caseName2);
                cases.cases[cases.names.caseName3]();

            };

            try {

                jsql.insert("@sql insert into car (id, price, year, model) values (nextval('car_id_seq'), ?, ?, ?)")
                    .params([19.500, 2000, 'Audi A3'])
                    .then(function (result) {
                        console.log(cases.names.caseName2, result);
                        resultCallback('SUCCESS');
                    })
                    .catch(function (error) {
                        console.error(error);
                        resultCallback('FAILED');
                    })

            } catch (error) {
                console.error(error);
                resultCallback('FAILED');
            }


        };


        cases.names.caseName3 = 'Update persons';
        cases.cases[cases.names.caseName3] = function () {

            var start = new Date().getTime();

            var resultCallback = function (status) {
                var end = new Date().getTime();
                var duration = end - start;

                cases.resultCase(status, duration, cases.names.caseName3);
                cases.cases[cases.names.caseName4]();

            };

            try {

                jsql.update("@sql update person set salary = 4000 where age > :age")
                    .param('age', 30)
                    .then(function (result) {
                        console.log(cases.names.caseName3, result);
                        resultCallback('SUCCESS');
                    })
                    .catch(function (error) {
                        console.error(error);
                        resultCallback('FAILED');
                    })

            } catch (error) {
                console.error(error);
                resultCallback('FAILED');
            }


        };


        cases.names.caseName4 = 'Update cars';
        cases.cases[cases.names.caseName4] = function () {

            var start = new Date().getTime();

            var resultCallback = function (status) {
                var end = new Date().getTime();
                var duration = end - start;

                cases.resultCase(status, duration, cases.names.caseName4);
                cases.cases[cases.names.caseName5]();

            };

            try {

                // jsql.update("update car set created_at = ?")
                //     .params([ new Date().getTime() ])
                jsql.update("@sql update car set type = ?")
                    .params([ 'osobowy' ])
                    .then(function (result) {
                        console.log(cases.names.caseName4, result);
                        resultCallback('SUCCESS');
                    })
                    .catch(function (error) {
                        console.error(error);
                        resultCallback('FAILED');
                    })

            } catch (error) {
                console.error(error);
                resultCallback('FAILED');
            }


        };


        cases.names.caseName5 = 'Select person';
        cases.cases[cases.names.caseName5] = function () {

            var start = new Date().getTime();

            var resultCallback = function (status) {
                var end = new Date().getTime();
                var duration = end - start;

                cases.resultCase(status, duration, cases.names.caseName5);
                cases.cases[cases.names.caseName6]();

            };

            try {

                jsql.selectOne("@sql select * from person where age > :ageMin and age < :ageMax limit 1")
                    .param('ageMin', 30)
                    .param('ageMax', 50)
                    .then(function (result) {
                        console.log(cases.names.caseName5, result);

                        if (!jsql.isArray(result)) {
                            resultCallback('SUCCESS');
                        } else {
                            resultCallback('FAILED');
                        }

                    })
                    .catch(function (error) {
                        console.error(error);
                        resultCallback('FAILED');
                    })


            } catch (error) {
                console.error(error);
                resultCallback('FAILED');
            }


        };

        cases.names.caseName6 = 'Select cars';
        cases.cases[cases.names.caseName6] = function () {

            var start = new Date().getTime();

            var resultCallback = function (status) {
                var end = new Date().getTime();
                var duration = end - start;

                cases.resultCase(status, duration, cases.names.caseName6);
                cases.cases[cases.names.caseName7]();

            };

            try {

                jsql.select("@sql select id, price from car")
                    .then(function (result) {
                        console.log(cases.names.caseName6, result);

                        if (jsql.isArray(result)) {
                            resultCallback('SUCCESS');
                        } else {
                            resultCallback('FAILED');
                        }

                    })
                    .catch(function (error) {
                        console.error(error);
                        resultCallback('FAILED');
                    })


            } catch (error) {
                console.error(error);
                resultCallback('FAILED');
            }


        };

        cases.names.caseName7 = 'Delete persons';
        cases.cases[cases.names.caseName7] =  function () {

            var start = new Date().getTime();

            var resultCallback = function (status) {
                var end = new Date().getTime();
                var duration = end - start;

                cases.resultCase(status, duration, cases.names.caseName7);
                cases.cases[cases.names.caseName8]();

            };

            try {

                jsql.remove("@sql delete from person where age > 30")
                    .then(function (result) {
                        console.log(cases.names.caseName7, result);
                        resultCallback('SUCCESS');
                    })
                    .catch(function (error) {
                        console.error(error);
                        resultCallback('FAILED');
                    })

            } catch (error) {
                console.error(error);
                resultCallback('FAILED');
            }


        };

        cases.names.caseName8 = 'Delete cars';
        cases.cases[cases.names.caseName8] =  function () {

            var start = new Date().getTime();

            var resultCallback = function (status) {
                var end = new Date().getTime();
                var duration = end - start;

                cases.resultCase(status, duration, cases.names.caseName8);
                cases.cases[cases.names.caseName9]();

            };

            try {

                jsql.remove("@sql delete from car where price <> :price")
                    .params({
                        price: 10.000
                    })
                    .then(function (result) {
                        console.log(cases.names.caseName8, result);
                        resultCallback('SUCCESS');
                    })
                    .catch(function (error) {
                        console.error(error);
                        resultCallback('FAILED');
                    })

            } catch (error) {
                console.error(error);
                resultCallback('FAILED');
            }


        };


        cases.names.caseName9 = 'Transaction insert and rollback';
        cases.cases[cases.names.caseName9] =  function () {

            var start = new Date().getTime();

            var resultCallback = function (status) {
                var end = new Date().getTime();
                var duration = end - start;

                cases.resultCase(status, duration, cases.names.caseName9);
                cases.cases[cases.names.caseName10]();

            };

            try {

                var transaction = jsql.tx();

                transaction.insert("@sql insert into car (id, price, year, model) values (nextval('car_id_seq'), ?, ?, ?)")
                    .params([180000, 2018, 'Audi A6'])
                    .then(function (result) {
                        console.log(cases.names.caseName9, result);

                        transaction.rollback().then(function(result){
                            console.log(cases.names.caseName9, result);
                            resultCallback('SUCCESS');
                        });

                    })
                    .catch(function (error) {
                        console.error(error);
                        resultCallback('FAILED');
                    })

            } catch (error) {
                console.error(error);
                resultCallback('FAILED');
            }


        };

        cases.names.caseName10 = 'Transaction insert and commit';
        cases.cases[cases.names.caseName10] =  function () {

            var start = new Date().getTime();

            var resultCallback = function (status) {
                var end = new Date().getTime();
                var duration = end - start;

                cases.resultCase(status, duration, cases.names.caseName10);
                // cases.cases[cases.names.caseName11]();

            };

            try {

                var transaction = jsql.tx();

                transaction.insert("@sql insert into car (id, price, year, model) values (nextval('car_id_seq'), ?, ?, ?)")
                    .params([200000, 2019, 'Volkswagen Variant'])
                    .then(function (result) {
                        console.log(cases.names.caseName10, result);

                        transaction.commit().then(function(result){
                            console.log(cases.names.caseName10, result);
                            resultCallback('SUCCESS');
                        });

                    })
                    .catch(function (error) {
                        console.error(error);
                        resultCallback('FAILED');
                    })

            } catch (error) {
                console.error(error);
                resultCallback('FAILED');
            }


        };

        return cases;


    }
})(angular);;(function (angular) {
    'use strict';

    angular
        .module('testApp')
        .controller('HomeController', ['$scope',  'Cases', HomeController]);

    /**
     * @ngInject
     */
    function HomeController($scope, Cases) {
        var vm = this;

        vm.results = Cases.results;

        Cases.cases[Cases.names.caseName1]();

    }
})(angular);;'use strict';

app.run(['$rootScope', function ($rootScope) {
}]);
