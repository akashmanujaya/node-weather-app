const request = require('request')

const forecast = (lat, lon, callback) => {
    const url = 'https://api.openweathermap.org/data/2.5/onecall?lat=' +lat+ '&lon=' +lon+ '&exclude=hourly,daily&appid=3a26545d577f37af4b6cac885d9d6c2c&units=metric'

    request({url, json:true}, (error, {body}) => {
        if(error){
            callback('Unable to connect to the location services !', undefined)
        } else if(body.message){
            callback('Nothing to geocode. please check latitude and lognitude', undefined)
        } else {
            callback(undefined, {
                latitude: body.lat,
                lognitude: body.lon,
                tempreture: body.current.temp,
                humidity: body.current.humidity
            })
        }
    })
}

module.exports = forecast