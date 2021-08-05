let assert = require('assert');
let Executor = require('..\\dist\\cmd\\executor').Executor;

describe('JSQL CLI arguments', function () {

    describe('#getParameters(args, cwd, debug)', function () {

        it('should return empty set - with non-jsql params', function () {

            let executor = new Executor();

            let args = ['ABC', '123'];
            let cwd = 'C:\\Users\\Default';
            let debug = false;

            let params = executor.getParameters(args, cwd, debug);

            assert(params.noArguments, 'Parameters are not empty');

        });

        it('should return empty set - with no params', function () {

            let executor = new Executor();

            let args = [];
            let cwd = 'C:\\Users\\Default';
            let debug = false;

            let params = executor.getParameters(args, cwd, debug);

            assert(params.noArguments, 'Parameters are not empty');

        });

        it('should return help - with --help with value', function () {

            let executor = new Executor();

            let args = ['--help=true'];
            let cwd = 'C:\\Users\\Default';
            let debug = false;

            let params = executor.getParameters(args, cwd, debug);

            assert(params.noArguments, 'Help should not shown');

        });

        it('should return help - with --help without value', function () {

            let executor = new Executor();

            let args = ['--help'];
            let cwd = 'C:\\Users\\Default';
            let debug = false;

            let params = executor.getParameters(args, cwd, debug);

            assert(params.help, 'Help should not shown');

        });

           it('should return insufficient parameters - only --apiKey', function () {

            let executor = new Executor();

            let args = ['--apiKey=123'];
            let cwd = 'C:\\Users\\Default';
            let debug = false;

            let params = executor.getParameters(args, cwd, debug);

            assert(params.noArguments, 'Insufficient parameters did not show');

        });

        it('should return correct --apiKey value', function () {

            let executor = new Executor();

            let args = ['--apiKey=54fj349dm34kvx0k034'];
            let cwd = 'C:\\Users\\Default';
            let debug = false;

            let params = executor.getParameters(args, cwd, debug);

            assert.strictEqual(params.apiKey, '54fj349dm34kvx0k034', 'Should be equal');

        });

        it('should return insufficient parameters - only --input', function () {

            let executor = new Executor();

            let args = ['--input=\\src\\app.js'];
            let cwd = 'C:\\Users\\Default';
            let debug = false;

            let params = executor.getParameters(args, cwd, debug);

            assert(params.noArguments, 'Insufficient parameters did not show');

        });


        it('should return insufficient parameters - only --output', function () {

            let executor = new Executor();

            let args = ['--output=dist\\app.js'];
            let cwd = 'C:\\Users\\Default';
            let debug = false;

            let params = executor.getParameters(args, cwd, debug);

            assert(params.noArguments, 'Insufficient parameters did not show');

        });


        it('should return correct --input value - case 1', function () {

            let executor = new Executor();

            let args = ['--input=\\src\\app.js'];
            let cwd = 'C:\\Users\\Default';
            let debug = false;

            let params = executor.getParameters(args, cwd, debug);

            assert.strictEqual(params.inputFile, cwd + '\\src\\app.js', 'Should be equal');

        });

        it('should return correct --input value - case 2', function () {

            let executor = new Executor();

            let args = ['--input=app.js'];
            let cwd = 'C:\\Users\\Default';
            let debug = false;

            let params = executor.getParameters(args, cwd, debug);

            assert.strictEqual(params.inputFile, cwd + '\\app.js', 'Should be equal');

        });

        it('should return correct --input value - case 3', function () {

            let executor = new Executor();

            let args = ['--input=\\src\\test\\app.js'];
            let cwd = 'C:\\Users\\Default';
            let debug = false;

            let params = executor.getParameters(args, cwd, debug);

            assert.strictEqual(params.inputFile, cwd + '\\src\\test\\app.js', 'Should be equal');

        });

        it('should return correct --input value - case 4', function () {

            let executor = new Executor();

            let args = ['--input=src\\app.js'];
            let cwd = 'C:\\Users\\Default';
            let debug = false;

            let params = executor.getParameters(args, cwd, debug);

            assert.strictEqual(params.inputFile, cwd + '\\src\\app.js', 'Should be equal');

        });

        it('should return correct --output value - case 1', function () {

            let executor = new Executor();

            let args = ['--output=\\src\\app.js'];
            let cwd = 'C:\\Users\\Default';
            let debug = false;

            let params = executor.getParameters(args, cwd, debug);

            assert.strictEqual(params.outputFile, cwd + '\\src\\app.js', 'Should be equal');

        });

        it('should return correct --output value - case 2', function () {

            let executor = new Executor();

            let args = ['--output=app.js'];
            let cwd = 'C:\\Users\\Default';
            let debug = false;

            let params = executor.getParameters(args, cwd, debug);

            assert.strictEqual(params.outputFile, cwd + '\\app.js', 'Should be equal');

        });

        it('should return correct --output value - case 3', function () {

            let executor = new Executor();

            let args = ['--output=\\src\\test\\app.js'];
            let cwd = 'C:\\Users\\Default';
            let debug = false;

            let params = executor.getParameters(args, cwd, debug);

            assert.strictEqual(params.outputFile, cwd + '\\src\\test\\app.js', 'Should be equal');

        });

        it('should return correct --output value - case 4', function () {

            let executor = new Executor();

            let args = ['--output=src\\app.js'];
            let cwd = 'C:\\Users\\Default';
            let debug = false;

            let params = executor.getParameters(args, cwd, debug);

            assert.strictEqual(params.outputFile, cwd + '\\src\\app.js', 'Should be equal');

        });


        it('should return correct --input value - case 5', function () {

            let executor = new Executor();

            let args = ['--input=app.js'];
            let cwd = '/';
            let debug = false;

            let params = executor.getParameters(args, cwd, debug);

            assert.strictEqual(params.inputFile, 'app.js', 'Should be equal');

        });

    });

});