let args = process.argv[2] ?  process.argv.slice(2) : [ 'start' ];
args.unshift('run');
const opts = { stdio: 'inherit', cwd: 'client', shell: true };
require('child_process').spawn('npm -e', args, opts).on('exit', function(code) {
    process.exit(code);
});
