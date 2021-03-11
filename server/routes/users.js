const express = require('express');
const router = express.Router();
const { User } = require("../models/User");

const { auth } = require("../middleware/auth");

//=================================
//             User
//=================================

router.get("/auth", auth, (req, res) => {
    res.status(200).json({
        _id: req.user._id,
        isAdmin: req.user.role === 0 ? false : true,
        isAuth: true,
        email: req.user.email,
        name: req.user.name,
        lastname: req.user.lastname,
        role: req.user.role,
        image: req.user.image,
    });
});

router.post("/register", (req, res) => {

    const user = new User(req.body);

    user.save((err, doc) => {
        if (err) return res.json({ success: false, err });
        return res.status(200).json({ 
            success: true
        });
    });
});

router.post('/login', (req,res) => {
    
    // 요청된 이메일을 데이터베이스에 존재하는지 찾는다.
    
    User.findOne({email: req.body.email} , (err,user) =>{
        if(!user){
            return res.json({
            loginSuceess: false,
            message: '일치하는 유저가 존재하지 않습니다.'
        })
    }

    user.comparePassword(req.body.password, (err,isMatch) =>{
        if(!isMatch)  return res.json({
            loginSuccess: false,
            message: "해당하는 회원이 없습니다"
        });
        
        user.generateToken((err,user)=>{
            if(err) return res.status(400).send(err);
            res.cookie("w_authExp", user.tokenExp);
            res.cookie("w_auth", user.token)
            .status(200)
            .json({
                loginSuccess: true,
                userId: user._id
            })
        })

    })
    })

    // 요청된 이메일이 데이터베이스에 존재한다면 비밀번호가 맞는지 확인

    // 만약 비밀번호가 일치하면 토큰 값 생성
})


router.get("/logout", auth, (req, res) => {
    User.findOneAndUpdate({ _id: req.user._id }, { token: "", tokenExp: "" }, (err, doc) => {
        if (err) return res.json({ success: false, err });
        return res.status(200).send({
            success: true
        });
    });
});

module.exports = router;
