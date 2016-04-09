module.exports = function lifx(options) {

    var seneca = this;
    var role = options.role

    var LifxClient = require('node-lifx').Client;
    var client = new LifxClient();
    client.on('light-new', function(light) {
        console.log(light);
    });

    client.init({
        debug: false, // logs all messages in console if turned on 
    });

    this.add({ role: role, cmd: 'light_on' }, function light_on(msg, respond) {
        var light = client.light(msg.id);
        if (light) {
            console.log(light);
            light.on();
            respond(null, { answer: 'ok' });
        }
        else
            respond(null, { answer: 'not found' });
    });

    this.add({ role: role, cmd: 'light_off' }, function light_on(msg, respond) {
        var light = client.light(msg.id);
        if (light) {
            console.log(light);
            light.off();
            respond(null, { answer: 'ok' });
        }
        else
            respond(null, { answer: 'not found' });
    });

    this.add({role: role ,cmd:'lights'}, function list(msg, respond) {
        var lights = client.lights();
        var data = [];
        for (var i = 0; i < lights.length; i++) {
            data.push({ id: lights[i].id, ip: lights[i].address, name: lights[i].label, status: lights[i].status });
        }
        console.log(lights);
        respond(null, { answer: data });
    });
}
