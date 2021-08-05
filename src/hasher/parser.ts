/*
 * Copyright (c) 2017-2019 JSQL Sp. z.o.o. (Ltd, LLC) www.jsql.it
 * See LICENSE or https://jsql.it/public-packages-license
 */

import {FileUtils} from "./file-utils";
import {Query} from "./query";
import {QueriesParser} from "../parser/queries-parser";
import {Params} from "../cmd/params";

export class Parser {

    static resolveQueries(fileContent: string, params: Params): Set<string> {
        return QueriesParser.parseText(fileContent, params);
    }

    static replaceQueries(file: string, fileContent: string, hashes: Array<Query>, queriesMap: Map<string, string>): void {

        for (let queryHashPair of hashes) {
            fileContent = fileContent.split(queriesMap.get(queryHashPair.query)).join(queryHashPair.token)
        }

        FileUtils.saveFile(file, fileContent);

    }

}