// This example is a standalone example that will call the lifx:lights command 

var seneca = require('seneca')();
seneca.use('../lifx-control');

function lights() {
    console.log('Get a list of lights');
    // Send the action to get a list of all lights on the network
    seneca.act({role: 'lifx', cmd: 'lights'}, function(err,result){
        if (err) return console.error(err)
        
        // write the list to the console
        console.log(result);
        process.exit(1);
    });
}

// Give the plugin time to initialize the communications to the LIFX lights before doing something with the lights.
setTimeout(lights, 5000);
    

