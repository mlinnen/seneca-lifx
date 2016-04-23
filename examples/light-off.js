// This example is a standalone example that will call the lifx:lights command and then turn off the first light that comes back in the array

var seneca = require('seneca')();
seneca.use('../lifx-control');

function lightoff() {
    console.log('Get a list of lights');
    // Send the action to get a list of all lights on the network
    seneca.act({role: 'lifx', cmd: 'lights'}, function(err,result){
        if (err) return console.error(err)
        
        // Get the first light in the list
        var id = result.answer[0].id;
        var name = result.answer[0].name;
        console.log('Turning the ' + name + ' light off');
        
        // Send the action to turn the light off
        seneca.act({role: 'lifx', cmd: 'light_off', id: id}, function(err,result){
            if (err) return console.error(err)
            console.log(result);
            // Give the plugin time to send the command to the light before shutting down the process
            setTimeout(exit, 3000);
        });
    });

    
}

function exit()
{
    process.exit(1);
}

// Give the plugin time to initialize the communications to the LIFX lights before doing something with the lights.
setTimeout(lightoff, 5000);