fetch("http://localhost:5000/weatherforecast")
    .then(response => response.json())
    .then(console.log)
    .catch(console.error);
