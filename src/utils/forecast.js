const request = require('request')

const forecast = (latitude , longitude , callback) => {
   const url = 'https://api.darksky.net/forecast/39c4e8060a136e0ef7b8745f24254d14/' + encodeURIComponent(latitude) + ',' + encodeURIComponent(longitude) + '?units=si&lang=fr'
   request({ url: url, json: true }, (err, { body, body: { currently: { temperature, precipProbability, humidity} } } ) => {
      if(err){
         callback('Unable to connect to weather service ...')
      }else if(body.error){
         callback('Unable to find location')
      }else{
         callback(undefined, body.daily.data[0].summary + 'La temperature est a ' + temperature +'°C .Il y a ' + precipProbability + '% chance de pleuvoir.\nAinsi qu\'un taux d\'humiditée de ' + Math.round(humidity*100) +'% .')
      }
   })
}

module.exports = forecast