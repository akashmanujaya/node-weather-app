const request = require('request')

const geoCode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiYWthc2htYW51amF5YSIsImEiOiJja2g4cG55MDgwbXFtMnFvOHpwbXhyZWg5In0.xFH6XdyUmnxebQ2Y2iM64w&limit=1'

    request({url, json:true}, (error, {body}) => {
        if(error){
            callback('Unable to connect to the location services !', undefined)
        } else if(body.features.length === 0){
            callback('Unable to find location, Pleae Try another location', undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                lognitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geoCode