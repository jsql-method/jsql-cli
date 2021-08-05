const parserMock = require("./parserMock");
const fs = require("fs");

parserMock.parseText(fs.readFileSync('./test/cases/extreme/case3.js', 'utf8'));