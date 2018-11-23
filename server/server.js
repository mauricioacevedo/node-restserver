require('./config/config')

const express = require('express');
const app = express();

const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended:false}));

app.use(bodyParser.json());

app.get('/user', function (req,res) {
    res.json('get User');
});

app.post('/user', function (req,res) {
    let body = req.body;

    if(body.name === undefined){
        res.status(400).json({
            ok: false,
            msg: "Name is obligatory"
        });
    }else {
        res.json({
            info:body
        });
    }

    
});

app.put('/user/:id', function (req,res) {

    let id = req.params.id;
    res.json({
        id
    });
});

app.delete('/user', function (req,res) {
    res.json('delete User');
});

app.listen(process.env.PORT, () => {
    console.log(`Listening on port ${process.env.PORT}`);
});