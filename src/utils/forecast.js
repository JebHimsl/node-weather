const request = require("postman-request");


const forecast = (long, lat, callback) => {
    const url = "http://api.weatherstack.com/current?units=f&access_key=a5f188b176527ed1f07ac74b6f1988e8&query=" + lat + "," + long;

    request({ url: url, json: true }, (procError, response) => {

        const {body} = response;
        const {current, location, error} = body;
        //const {info} = error;
        const {temperature, feelslike, weather_descriptions} = current;
        const {name, localtime} = location;

        if (procError) {
            callback("Unable to connect to weather service.", undefined);

        } else {

            if (error) {
                callback(body.error.info, undefined); //Only parameter is error
            } else {

                //let current = body.current;
                let resp = "Currently in " + name + " at " + localtime;
                resp += "\nIt is currently " + temperature + " degrees out.";
                resp += "\nIt feels like " + feelslike + " degrees out.";
                let desc = weather_descriptions;
                let dhold = "";
                for (i = 0; i < desc.length; i++) {
                    resp += "\n";
                    resp += desc[i];
                    dhold += desc[i];
                }
                console.log("Before leaving forcast, resp = " + resp);
                let jresp = {
                    temperature: temperature,
                    feelslike: feelslike,
                    location: name,
                    forecast: dhold
                }
                callback(undefined, jresp); //Must have both error (undefined) and response parameters.
            }

        }

    });
}

module.exports = forecast;