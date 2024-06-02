const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.render('index');
});

app.post('/joke', async (req, res) => {
    const name = req.body.name;
    try {
        const response = await axios.get(`https://v2.jokeapi.dev/joke/Any?contains=${name}&type=single`);
        const joke = response.data.joke ? response.data.joke : "No joke found.";
        res.render('joke', { name, joke });
    } catch (error) {
        console.error(error);
        res.send("Error retrieving joke.");
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
