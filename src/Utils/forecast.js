const request = require('request')

const forecast = (data,callback)=>{
    const url ='https://api.darksky.net/forecast/bcc936f131db5bd553b33f2137b523ee/'+data.lat+','+data.long+'?units=si'

    request({url:url, json:true},(error,response)=>{
        if(error){
            callback('Unable to connect to internet, please check your network connection',undefined)
        }else if(response.body.error){
            callback('Please enter valid location details',undefined)
        }else{
            const {summary,temperature,precipProbability,temp=5} = response.body.currently
            
            //console.log(data.location +', Lat:'+data.lat+', Long:'+data.long)
            callback(undefined,summary+". It's currently "+temperature +" degrees out. There is "+precipProbability+"% of rain.")
        }
    })
}

module.exports = forecast