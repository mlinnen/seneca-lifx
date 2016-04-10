# seneca-lifx

## A plugin for [Seneca](http://senecajs.org) 
This plugin will expose actions to control LIFX lights.

[![npm version](https://badge.fury.io/js/seneca-lifx.svg)](https://www.npmjs.com/package/seneca-lifx)
[![Build Status](https://travis-ci.org/mlinnen/seneca-lifx.svg)](https://travis-ci.org/mlinnen/seneca-lifx)

## Install
Since Seneca and this service are built on top of [Node.js](https://nodejs.org) you will need to have it installed.
To install run the following:
```
npm install seneca
npm install seneca-lifx
```

## Quick Example
Make sure you have already done the install steps to get the seneca and dependency modules in your working folder. 

```
var seneca = require('seneca')();
seneca.use('seneca-lifx');

function lighton() {
    console.log('Get a list of lights');
    // Send the action to get a list of all lights on the network
    seneca.act({role: 'lifx', cmd: 'lights'}, function(err,result){
        if (err) return console.error(err)
        
        // Get the first light in the list
        var id = result.answer[0].id;
        var name = result.answer[0].name;
        console.log('Turning the ' + name + ' light on');
        
        // Send the action to turn the light on
        seneca.act({role: 'lifx', cmd: 'light_on', id: id}, function(err,result){
            if (err) return console.error(err)
            console.log(result);
            process.exit(1);
        });
    });
}

// Give the plugin time to initialize the communications to the LIFX lights before doing something with the lights.
setTimeout(lighton, 5000);
```
 
## Actions

### ACTION: role:lifx, cmd:lights
Gets a list of all the lights on the network.

### ACTION: role:lifx, cmd:light_on, id:d073d511b1fd
Turns on a light.
- _id_: This can be the IP, LIFX Unique ID, or the name of the light

### ACTION: role:lifx, cmd:light_off, id:d073d511b1fd
Turns off a light.
- _id_: This can be the IP, LIFX Unique ID, or the name of the light

## Roadmap
These are a few items I think this module could use to make it more useful.  I don't have any plans on
when the following will be done or in what order.
- Add support for setting the color of the lights
- Track the up/down time of a LIFX bulb
- Add support for setting the label of a LIFX bulb
- Add unit tests and enable the Travis CI tests and code coverage

