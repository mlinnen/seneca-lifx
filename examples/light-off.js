var seneca = require('seneca')();
seneca.use('../lifx-control');

function lightoff() {
    seneca.act({role: 'lifx', cmd: 'light_off', id: 'd073d511b1fd'}, console.log);
    setTimeout(process.exit(1), 2000);
}

setTimeout(lightoff, 3000);