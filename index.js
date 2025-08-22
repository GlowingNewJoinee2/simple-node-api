const express = require('express');
const app = express();
const mongoose = require('mongoose');

mongoose.connect("mongodb+srv://taqiulhassan00:AiXDjDcqJnV5gF8w@nodebackend.2ladmpo.mongodb.net/?retryWrites=true&w=majority&appName=NodeBackend")
    .then(() => {
        console.log("Connected!");
        app.listen(3000, () => {
            console.log(`Server started on port 3000`);
        });
    })
    .catch(err => console.log(err));

app.get('/', (req, res) => {
    res.send('Hello from the Node Api');
});

app.post('/api/products', (req, res) => {
    res.send("Product added")
});
