const request = require('postman-request')

const forecast = (lat, long, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=174b627d936caaedd658fd174b72ed3a&query='+ lat + ',' + long + '&units=m'

    request({url, json: true}, (error, {body}) => {
        if(error) {
            callback('Unable to connect to weaher services!', undefined)
        } else if(body.error) {
            callback('Unable to find temperature. Try another search.', undefined)
        } else {
            callback(undefined,
                body.current.weather_descriptions[0] + '. It is ' + body.current.temperature + ' degrees outside. It feels like '
                        + body.current.feelslike + ' The humidity rate is: ' + body.current.humidity + '%'
            )
        }
    })
}

module.exports=forecast 