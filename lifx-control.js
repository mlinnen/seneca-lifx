module.exports = function lifx(options) {

    var seneca = this;
    var role = options.role

    var LifxClient = require('node-lifx').Client;

    var client = new LifxClient();
    client.on('light-new', function(light) {
        seneca.log.info('discovered light id=' + light.id + ' label=' + light.label);
    });
    client.on('light-online', function(light) {
        seneca.log.info('online light id=' + light.id + ' label=' + light.label);
    });
    client.on('light-offline', function(light) {
        seneca.log.info('offline light id=' + light.id + ' label=' + light.label);
    });

    client.init({
        debug: false, // logs all messages in console if turned on 
    });

    this.add({ role: role, cmd: 'light_on' }, function light_on(msg, respond) {
        var light = client.light(msg.id);
        if (light) {
            light.on();
            seneca.log.info('LIFX Light id=' + light.id + ' label=' + light.label + ' was turned on');
            respond(null, { answer: 'ok' });
        }
        else
            respond(null, { answer: 'not found' });
    });

    this.add({ role: role, cmd: 'light_off' }, function light_on(msg, respond) {
        var light = client.light(msg.id);
        if (light) {
            light.off();
            seneca.log.info('LIFX Light id=' + light.id + ' label=' + light.label + ' was turned off');
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
        
        // kick off the async series loop since the light.getState is an async operation and we need to collect the results of this before returning
        series(lights.shift());

        function series(light) {
            if (light) {
                light.getState(function(err, result) {
                    if (err) return final();
                    var elementPos = data.map(function(x) { return x.name; }).indexOf(light.label);
                    var objectFound = data[elementPos];
                    if (objectFound) {
                        objectFound.color = { 'hue': result.color.hue, 'saturation': result.color.saturation, 'brightness': result.color.brightness, 'kelvin': result.color.kelvin };
                        objectFound.power = result.power;
                    }
                    
                    // recursive call until we run out of lights in the array.
                    return series(lights.shift());
                });
            } else {
                // We are done with the list of lights
                return final();
            }
        }
        function final() {
            seneca.log.debug('done ', data);
            respond(null, { answer: data });
        }
    });

    return {
        name: role
    }
}
