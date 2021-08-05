let assert = require('assert');
const execSync = require('child_process').execSync;

const API_KEY = 'dawid.senko@jsql.it';
const DEV_KEY_NAME = 'test-key.key';

function constructCmd(input, key) {
    let cmd =  'jsql-cli --debug --apiKey=' + API_KEY + ' --output=/out' + input + ' --input=' + input + ' --devKeyFileName=' + (key || DEV_KEY_NAME)+' --env=local';
    console.log(cmd);
    return cmd;
}

describe('JSQL CLI cases', function () {

    describe('#execCommand(args, cwd)', function () {

        it('should print error - developer key does not exists', async () => {

            const response = execSync(constructCmd('/test/cases/basic/case1.js', 'test-key2')).toString();

            if (response.indexOf('File not exists') === -1) {
                assert.fail('Does not check if developer key exists');
            }

        });

        it('should hash basic case 1', async () => {
            const response = execSync(constructCmd('/test/cases/basic/case1.js')).toString();
            console.log(response);
        });


        it('should hash extreme case 3', async () => {
            const response = execSync(constructCmd('/test/cases/extreme/case3.js')).toString();
            console.log(response);
        });

    });

});