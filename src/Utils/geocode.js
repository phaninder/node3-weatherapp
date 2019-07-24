const request = require('request')

const getGeoCode = (location,callback)=>{
    const geocodeUrl ='https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(location) +'.json?access_token=pk.eyJ1IjoicGhhbmkxNSIsImEiOiJjank3aW0yazgwMTkyM2hueGg3b2dhdnJ1In0.rkcS24iv27RUkSp0zyFyBw&limit=1'

    request({url:geocodeUrl,json:true},(error,response)=>{
        if(error){
            callback('Unable to connect to internet, please check your network connection',undefined)
        } else if(response.body.features.length === 0){
            callback('Please enter valid address',undefined)
        }else{
            const data ={
             location : response.body.features[0].place_name,
             long : response.body.features[0].center[0],
             lat :response.body.features[0].center[1]
            }

            callback(undefined,data)
        }
    })
}

module.exports = getGeoCode;