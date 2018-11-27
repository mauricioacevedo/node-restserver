require('./config/config')


const express = require('express');
const mongoose = require('mongoose');

const app = express();

const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended:false}));

app.use(bodyParser.json());
app.use(require('./routes/userRoutes'));


mongoose.connect(process.env.URLDB, { useNewUrlParser: true }, (err,resp) => {

    if(err) throw err;

    console.log('Database cafe ONLINE!');

});

app.listen(process.env.PORT, () => {
    console.log(`Listening on port ${process.env.PORT}`);
});

