// main.js
const map = L.map('map').setView([0, 0], 2);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

async function fetchPredictions(locations) {
    const res = await fetch("http://localhost:8000/predict", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(locations)
    });
    return await res.json();
}

// Example: locations with latest readings
const locations = [
    {latitude: 17.31, longitude: -93.67, NO2_ugm3: 10, O3_ugm3: 20, HCHO_ugm3: 5, hour: 12, dayofweek: 4, month: 10},
    {latitude: 17.31, longitude: -93.65, NO2_ugm3: 12, O3_ugm3: 25, HCHO_ugm3: 6, hour: 12, dayofweek: 4, month: 10}
];

fetchPredictions(locations).then(data => {
    const preds = data.predictions;
    const color_map = {0:'green',1:'lightgreen',2:'orange',3:'red',4:'darkred'};
    
    locations.forEach((loc, idx) => {
        const level = preds[idx];
        L.circle([loc.latitude, loc.longitude], {
            color: color_map[level],
            fillColor: color_map[level],
            fillOpacity: 0.7,
            radius: 20000
        }).bindPopup(`Level: ${level}`).addTo(map);
    });
});
