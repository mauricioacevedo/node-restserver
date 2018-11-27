const express = require('express');

const bcrypt = require('bcrypt');
const _ = require('underscore');
const User = require('../models/user')

const app = express();


app.get('/user', function (req,res) {
    //res.json('get User');

    let from = req.query.from || 0;
    from = Number(from);

    let limite= req.query.limite || 5;
    limite = Number(limite);

    User.find({status: true}, 'name email role status google img')
        .skip(from)
        .limit(limite)
        .exec((err,users)=>{

            if(err){
                res.status(400).json({
                    ok: false,
                    err
                });
                //return ;
            }else {

                User.count({status:true}, (err,counter)=>{

                    res.json({
                        ok:true,
                        users,
                        counter
                    });

                });


                
            }


        });
});

app.post('/user', function (req,res) {
    let body = req.body;

    let user = new User({
        name: body.name,
        email: body.email,
        password: bcrypt.hashSync(body.password,10),
        role: body.role
    });

    user.save( (err,userDB) => {
        if(err){
            res.status(400).json({
                ok: false,
                err
            });
            //return ;
        }else {

            userDB.password=null;

            res.json({
                ok: true,
                user: userDB
            });
        }




    } );

    /*
    if(body.name === undefined){
        res.status(400).json({
            ok: false,
            msg: "Name is obligatory"
        });
    }else {
        res.json({
            info:body
        });
    }*/

    

});

app.put('/user/:id', function (req,res) {

    let id = req.params.id;

    let body = _.pick(req.body,['name','email','img','role','status']);

    //delete body.password;
    //delete body.google;

    User.findByIdAndUpdate(id, body, {new:true,runValidators:true}, (err,userDB)=>{

        if(err){
            return res.status(400).json({
                ok: false,
                err
            });
            //return ;
        }

        res.json({
            ok: true,
            user: userDB
        });

    });

});

app.delete('/user/:id', function (req,res) {
    //res.json('delete User');
    let id = req.params.id;

    let removedStatus = {
        status: false
    }

    //User.findByIdAndRemove(id, (err,userDB)=>{
    User.findByIdAndUpdate(id, removedStatus , {new:true}, (err,userDB)=>{

        if(err){
            return res.status(400).json({
                ok: false,
                err
            });
            //return ;
        }

        if(!userDB){
            return res.status(400).json({
                ok: false,
                error: {
                    message: 'User not found!!!'
                }
            });
        }

        res.json({
            ok: true,
            user: userDB
        });


    });

});

module.exports = app;