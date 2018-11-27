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

