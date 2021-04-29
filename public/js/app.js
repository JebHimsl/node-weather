


// fetch('http://puzzle.mead.io/puzzle').then((response) => {
//     response.json().then((data) => {
//         console.log(data);
//     })
// });

// fetch('http://localhost:3000/weather?address=455 Middle Cottonwood Lane Bozeman MT 59715').then((response) => {
//     response.json().then((data) => {
//         if (data.error) {
//             console.log(data.error);
//         } else {
//             console.log(data.location);
//             console.log(data.forecast);
//         }
//     })
// });

const weatherForm = document.querySelector('form');
const searchElement = document.querySelector('input');
const p1 = document.querySelector('#p1');
const p2 = document.querySelector('#p2');
const p3 = document.querySelector('#p3');

p1.textContent= '';
p2.textContent= '';
p3.textContent= '';

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const location = searchElement.value;

    //const url = 'http://localhost:3000/weather?address=' + location;

    const url = '/weather?address=' + location;

    console.log(url);

    p1.textContent='Loading...';
    p2.textContent='';

    fetch(url).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                console.log(data.error);
                p1.textContent= 'Error: ' + data.error;
                p2.textContent='';
                p3.textContent='';
            } else {
                console.log(data.location);
                console.log(data.forecast);
                p1.textContent= 'Location: ' + data.location;
                p2.textContent= 'Forecast: ' + data.forecast;
                p3.textContent= 'Temp: ' + data.temperature + '  ... but it feels like: ' + data.feelslike;
            }
        })
    });



})