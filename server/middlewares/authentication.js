const jwt = require('jsonwebtoken');

//==========================
//VERIFY TOKEN
//==========================

let verifyToken = (req, res, next) => {

    let token = req.get('token');
    //console.log(process.env.SEED_AUTH);
    jwt.verify(token, process.env.SEED_AUTH, (err, decoded)=>{

        if( err ){
            return res.status(401).json({
                ok: false,
                err: {
                    message: 'The actual token is not valid!!!'
                }
            });
        }

        req.userSession = decoded.user;

        next();
    });
    // res.json({
    //     token:token
    // });

};

//==========================
//VERIFY ADMIN ROLE
//==========================
let checkAdminRole = (req,res,next) => {

    let user = req.userSession;

    if(user.role === 'ADMIN_ROLE'){
        next();
    }else {
        return res.json({
            ok: false,
            err: {
                message: 'User is not administrator.'
            }
        });
    }

};

module.exports = {
    verifyToken,
    checkAdminRole
}