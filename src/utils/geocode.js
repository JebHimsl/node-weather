const request = require("postman-request");

const geocode = (address, callback) => {
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(address) + ".json?access_token=pk.eyJ1IjoiamhpbXNsIiwiYSI6ImNrbXpkdG5ueDBjdWsyb256ZjRvc20zbmoifQ.11XLA2fHzBHDimKIdUmNfQ&limit=1";

    request({ url: url, json: true }, (error, response) => {
        if(error){
            callback("Unable to connect to location services.", undefined);
        } else if (response.body.message) {
            callback("Location error: " + response.body.message, undefined);
        } else if (response.body.features.length === 0){
            callback("Unable to find location.");
        } else {
            let long = response.body.features[0].center[0];
            let lat = response.body.features[0].center[1];
            let place = response.body.features[0].place_name;
            callback(undefined, {long: long, lat: lat, place: place});
        }

    });
}

module.exports = geocode;