//=============
//Token expiration
//=============
//60 segs * 60 min * 24 hours * days
process.env.TOKEN_EXPIRES = 60 * 60 * 24 * 30;

//=============
//Auth SEED
//=============
process.env.SEED_AUTH = process.env.SEED_AUTH || 'seed-auth-fabri';


//=============
//port
//=============

process.env.PORT = process.env.PORT || 8080;

//=============
//ENVIRONMENT
//=============

process.env.NODE_ENV = process.env.NODE_ENV || 'dev'

//=============
//DATABASE
//=============

let urlDB;

if(process.env.NODE_ENV==='dev'){
    urlDB='mongodb://localhost:27017/cafe';
}else{
    //Production baby
    urlDB=process.env.MONGO_URL;
}

process.env.URLDB=urlDB;

