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
    urlDB='mongodb://cafeuser:123456siete@ds117834.mlab.com:17834/cafe';
}

process.env.URLDB=urlDB;

