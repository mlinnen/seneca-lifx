var seneca = require('seneca')();
seneca.use('../lifx-control');

function lighton() {
    seneca.act({role: 'lifx', cmd: 'light_on', id: 'd073d511b1fd'}, console.log);
    setTimeout(process.exit(1), 2000);
}

setTimeout(lighton, 3000);