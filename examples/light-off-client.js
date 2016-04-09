require('seneca')()
  .client({host:"localhost" })
  .act({role: 'lifx', cmd: 'light_off',id:'d073d511b1fd'}, console.log)
  .act({role: 'lifx', cmd: 'light_off',id:'d073d5118d58'}, console.log);
