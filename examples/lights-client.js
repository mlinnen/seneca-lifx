// This example requires the lifx-control-service to be running as it connects to it over http and gets a list of lights

require('seneca')()
  .client({host:"localhost" })
  .act({role: 'lifx', cmd: 'lights'}, function(err,result){
      console.log('data' , JSON.stringify(result,null,2));
  });
