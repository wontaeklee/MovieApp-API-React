const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const saltRounds = 10
const jwt = require('jsonwebtoken')

const userSchema = mongoose.Schema({
    name:{
        type: String,
        maxlength: 50
    },

    email:{
        type: String,
        trim: true,
        unique: 1
    },

    password:{
        type: String,
        minlength: 5
    },
    
    lasname:{
        type:  String,
        maxlength: 50
    },

    role:{
        type: Number,
        default: 0
    },

    image:{
        type:String
    },

    token:{
        type: String
    },

    tokenExp:{
        type: Number
    }
})


// pre 메소드를 이용하여 save 단계 이전에 실행
userSchema.pre('save',function(next){
    
    // 비밀번호를 암호화
    var user = this;

    if(user.isModified('password')){
        bcrypt.genSalt(saltRounds, function(err, salt){
            if(err) return next(err)
    
            bcrypt.hash(user.password, salt, function(err, hash){   
                if(err) return next(err)
                user.password = hash
                next()
            })
        })
    } else {
        next()
    }
})


userSchema.methods.comparePassword = function(plainPassword, cb){

    // painPassword : 12345 암호화 된 비밀번호 : $2b$10$AHZqcS3gmGcJGpWQzw/J0uDS5kK/bBIjVAGBx916ZWZ/vUyUGiSKS
    bcrypt.compare(plainPassword, this.password, function(err, isMatch){
        if(err) return cb(err)
        cb(null,isMatch)
    })
}

// user_id 값에 해당하는 토큰 값 생성 메소드
userSchema.methods.generateToken = function(cb){
    
    // jsonwebtoken을 이용한 token 값 생성

    var user = this;

    var token = jwt.sign(user._id.toHexString(), 'secretToken')

    user.token = token 

    user.save(function (err, user){
        if(err) return cb(err)
        cb(null, user)
    })

}

userSchema.statics.findByToken = function(token, cb){
    var user = this;

    // 토큰을 deconde 한다
    jwt.verify(token,'secretToken', function(err, decoded){

        // 유저 아이디를 이용하여 유저를 찾음
        // 클라이언트에서 가져온 token과 DB에 저장된 토큰이 일치하는지 확인

        user.findOne({"_id": decoded, token: token}, function(err, user){
            if(err) return cb(err);
            cb(null,user)
        })
    })
}


const User = mongoose.model('User',userSchema)

module.exports = {User}