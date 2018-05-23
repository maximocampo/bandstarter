const router = require("express").Router();
const passport = require("passport");
const User = require("../models/User");
//const multer = require("multer");
//const upload = multer({dest: './public/uploads'});
//const uploadCloud = require("../helpers/cloudinary");

//router.post('/profile', uploadCloud.single('profilePic'), (req,res, next)=>{
//  req.body.profilePic = req.file.url;
//  //console.log(req.body);
//  User.findByIdAndUpdate(req.user._id, req.body)
//    .then((body)=>{
//      //console.log(body);
//      res.redirect('/profile');
//      //user.message = "Actualizado";
//    })
//    .catch(e=>next(e));
//});
//
//router.get('/logout', (req,res)=>{
//  req.logout();
//  res.redirect('/');
//})
//
//
router.post('/login', passport.authenticate('local',{
  successRedirect: '/profile'
}))

router.post('/signup',
  (req,res)=>{
    User.register(req.body, req.body.password, (err, user) =>{
      if (err) return res.send(err);
      console.log(req.body)
      passport.authenticate('local')(req,res,function(){
        res.redirect('/profile');
      });
    })

  });


module.exports = router