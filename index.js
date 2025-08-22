const express = require('express');
const mongoose = require('mongoose');
const productRoute = require('./routes/product.route.js');
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use("/api/products", productRoute);

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

