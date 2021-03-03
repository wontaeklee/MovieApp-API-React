const express = require('express')
const mongoose = require('mongoose')
const bodyparser = require('body-parser')
const cookieParser = require('cookie-parser')

const config = require('./config/key')
const {User} = require('./models/User')
const {auth} = require('./middleWare/auth')

const app = express()

// application/x-www-form-urlencoded
app.use(bodyparser.urlencoded({extended: true}))
app.use(bodyparser.json())
app.use(cookieParser())


mongoose.connect(config.mongoURI,{
    useNewUrlParser:true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
}).then(()=> console.log('MongoDB Connected')).catch(err => console.log(err))



app.get('/',(req,res) => res.send('Hello Wontaek'))

app.get('/api/hello', (req,res)=>{
    res.send("Hello World");
})

app.post('/api/users/register',(req,res) => {
    // 회원 가입 시 필요한 정보들을 Client에서 가져오면
    // 그것들을 데이터 베이스에 넣어준다.

    const user = new User(req.body)
    
    user.save((err, userInfo)=>{
        if(err) return res.json({success: false, err})
        return res.status(200).json({
            success: true,
        })
    })
})

app.post('/api/users/login', (req,res) => {
    
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
        })
        user.generateToken((err,user)=>{
            if(err) return res.status(400).send(err);

            res.cookie("x_auth", user.token)
            .status(200)
            .json({
                loginSuceess: true,
                userId: user._id
            })
        })

    })
    })

    // 요청된 이메일이 데이터베이스에 존재한다면 비밀번호가 맞는지 확인

    // 만약 비밀번호가 일치하면 토큰 값 생성
})

app.get('/api/users/auth', auth , (req,res) =>{

    res.status(200).json({
        _id: req.user._id,
        isAdmin: req.user.role == 0? false : true,
        isAuth: true,
        email: req.user.email,
        name: req.user.name,
        lastname: req.user.lastname,
        role: req.user.role,
        image: req.user.image


    })
})


app.get('/api/users/logout', auth, (req,res)=>{

    User.findOneAndUpdate({_id: req.user._id},
        { token: "" }, (err,user) =>{
            if(err) return res.json({
                success: false,
                message: err
            });

            return res.status(200).send({
                success: true
            })


        })
}) 

const port = 5000
app.listen(port, ()=> console.log(`Example App listening on port ${port}!`))
