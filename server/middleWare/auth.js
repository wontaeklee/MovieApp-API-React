const {User} = require('../models/User')

let auth = (req,res,next) =>{

        // 인증을 처리하는 곳
    
        // 클라이언트 쿠키에서 토큰 값을 가져온다.
    
        let token = req.cookies.x_auth;
    
        // 토큰을 복호화 후 유저를 찾는다.
    
        User.findByToken(token,(err,user)=>{
            if(err) throw err;
            if(!user) return res.json({isAuth: false, error: true})

            req.token = token;
            req.user = user;
            next()
        })
    
        // 유저가 존재하면 인증 Okay else No
}

module.exports = {auth} 
