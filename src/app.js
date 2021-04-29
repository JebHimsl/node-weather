const path = require('path');
const express = require('express');
const hbs = require("hbs");

const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");


const app = express();
const port = process.env.PORT || 3000;

// Define paths for Express config
const pubDir = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars location and views location
app.set("views", viewsPath);
app.set("view engine", "hbs");
hbs.registerPartials(partialsPath);

// Setup static directory to serve.
app.use(express.static(pubDir));

app.get("", (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Jeb'
    });

});

app.get("/help", (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Jeb'
    });

});

app.get("/about", (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Jeb'
    });

});

app.get('/weather', (req, res) => {

    let query = req.query;

    if (!query.address) {
        res.send({
            error: "You must provide an address."
        });
    } else {

        geocode(query.address, (error, {long, lat, place} = {}) => {
            // if (error) {
            //     console.log("Error: ", error);
            // } else {
            //     console.log("Returned geocode: ", data);
            // }
            if (error) {
                //return console.log("Error: ", error);  // Eliminating else by using return statement.
                return res.send({
                    error: "You must provide an address."
                });
            } 
        
            console.log(long + ":" + lat + ":" + place);
            forecast(long, lat, (error, data) => {
                if (error) {
                    let mess = "Unable to geocode address: " + query.address;
                    res.send({
                        error: mess 
                    });
                } else {
                    console.log("Sending response..." + data.forecast + ", " + data.location);
                    res.send({
                        forecast: data.forecast,
                        location: data.location,
                        address: query.address,
                        feelslike: data.feelslike,
                        temperature: data.temperature, 
                        place: place
                    });
                }
            });
        });


        // res.send(
        //     {
        //         forecast: 'Sunny',
        //         location: 'Bozeman',
        //         address: query.address
        //     }
        // );
    }
});

app.get('/products', (req, res) => {
    console.log(req.query);
    let query = req.query;
    console.log("fate: " + query.name);

    if (!query.name) {
        res.send({
            error: "You must provide a search term."
        });  // Could return here but crappy 
    } else {
        res.send({
            products: []
        });
    }

});

app.get('/help/*', (req, res) => {
    res.render('notFound', {
        title: 'Help',
        name: 'Jeb',
        message: "Help article not found."
    });
});

app.get('*', (req, res) => {
    res.render('notFound', {
        title: '404',
        name: 'Jeb',
        message: "Resource not found."
    });
});

app.listen(port, () => {
    console.log("Server is running on port " + port);
});