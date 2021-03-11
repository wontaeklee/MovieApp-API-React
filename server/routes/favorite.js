const express = require('express');
const router = express.Router();
const { Favorite } = require('../models/Favorite')


router.post('/favoriteNumber', (req,res) => {    
 
    // mongoDB에서 favorite 숫자 가져오기

        Favorite.find({'movieId' : req.body.movieId})
        .exec(( err, info)=> {
            if(err)
            return res.status(400).send(err)

            res.status(200).json({success: true, favoriteNumber: info.length})
        })

    // 그 다음에 다시 숫자 정보 보내주기
})

router.post('/favorited', (req,res) => {    

    // 내가 이 영화를 Favorite 리스트에 넣었는지에 대한 정보를 가져오기

        Favorite.find({'movieId' : req.body.movieId, 'userFrom': req.body.userFrom})
        .exec(( err, info)=> {
            if(err)
            return res.status(400).send(err)

            let result = false
            if(info.length != 0){
                result = true
            }
            res.status(200).json({success: true, favorited: result})
        })

    // 그 다음에 다시 숫자 정보 보내주기
})

router.post('/addToFavorite', (req,res) => {    

    const favorite = new Favorite(req.body)

    favorite.save((err, doc) =>{
        if(err)
        return res.status(400).send(err)
        return res.status(200).json({success: true })
    })
})

router.post('/removeFromFavorite', (req,res) => {
    
    Favorite.findOneAndDelete({movieId : req.body.movieId, userFrom : req.body.userFrom})
    .exec((err , doc) =>{
        if(err) return res.status(400).send(err)
        return res.status(200).json({success: true })
    })
})

router.post('/getFavoriteMovie', (req,res) => {
    
    Favorite.find({'userFrom': req.body.userFrom})
    .exec((err,favorites) => {
        if(err)
        return res.status(400).send(err);
        return res.status(200).json({
            success:true,
            favorites
        })
    })
})

router.post('/removeFromFavorite', (req,res) => {
    
    Favorite.findOneAndDelete({movieId: req.body.movieId, userFrom: req.body.userFrom})
    .exec((err, result) => {
        if(err) return res.status(400).send(err)
        return res.status(200).json({
            success: true
        })
    })
})





module.exports = router;
