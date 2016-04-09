require('seneca')()
  .client({host:"localhost" })
  .act({role: 'lifx', cmd: 'lights'}, console.log);
