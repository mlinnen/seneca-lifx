var Promise = require("bluebird");

module.exports = function lifx(options) {

    var seneca = this;
    var role = options.role

    var LifxClient = require('node-lifx').Client;
    Promise.promisifyAll(LifxClient);

    var client = new LifxClient();
    client.on('light-new', function(light) {
        console.log('discovered light id=' + light.id + ' label=' + light.label);
    });
    client.on('light-online', function(light) {
        console.log('online light id=' + light.id + ' label=' + light.label);
    });
    client.on('light-offline', function(light) {
        console.log('offline light id=' + light.id + ' label=' + light.label);
    });

    client.init({
        debug: false, // logs all messages in console if turned on 
    });

    this.add({ role: role, cmd: 'light_on' }, function light_on(msg, respond) {
        var light = client.light(msg.id);
        if (light) {
            //console.log(light);
            light.on();
            respond(null, { answer: 'ok' });
        }
        else
            respond(null, { answer: 'not found' });
    });

    this.add({ role: role, cmd: 'light_off' }, function light_on(msg, respond) {
        var light = client.light(msg.id);
        if (light) {
            //console.log(light);
            light.off();
            respond(null, { answer: 'ok' });
        }
        else
            respond(null, { answer: 'not found' });
    });

    this.add({ role: role, cmd: 'lights' }, function list(msg, respond) {
        var lights = client.lights();
        var data = [];
        for (var i = 0; i < lights.length; i++) {
            data.push({ id: lights[i].id, ip: lights[i].address, name: lights[i].label, status: lights[i].status });
        }
        series(lights.shift());

        function series(item) {
            if (item) {
                item.getState(function(err, result) {
                    if (err) return final();
                    var elementPos = data.map(function(x) { return x.name; }).indexOf(item.label);
                    var objectFound = data[elementPos];
                    if (objectFound) {
                        objectFound.color = { 'hue': result.color.hue, 'saturation': result.color.saturation, 'brightness': result.color.brightness, 'kelvin': result.color.kelvin };
                        objectFound.power = result.power;
                    }
                    return series(lights.shift());
                });
            } else {
                return final();
            }
        }
        function final() {
            console.log('done ', data);
            respond(null, { answer: data });
        }
    });

    return {
        name: role
    }
}
