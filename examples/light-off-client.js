// This example requires the lifx-control-service to be running as it connects to it over http and turns off lights by id

require('seneca')()
  .client({host:"localhost" })
  .act({role: 'lifx', cmd: 'light_off',id:'d073d511b1fd'}, console.log)
  .act({role: 'lifx', cmd: 'light_off',id:'d073d5118d58'}, console.log);
