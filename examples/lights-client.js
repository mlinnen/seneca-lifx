require('seneca')()
  .client({host:"localhost" })
  .act({role: 'lifx', cmd: 'lights'}, function(err,result){
      console.log('data' , JSON.stringify(result,null,2));
  });
