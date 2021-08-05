/*
 * Copyright (c) 2017-2019 JSQL Sp. z.o.o. (Ltd, LLC) www.jsql.it
 * See LICENSE or https://jsql.it/public-packages-license
 */

import {Executor} from "./cmd/executor";
import * as path from "path";
//process.bin = process.title = 'jsql-cli';
new Executor().execCommand(process.argv, path.normalize(path.resolve()), true);





