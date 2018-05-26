const express = require('express');
const router  = express.Router();
const Band    = require('../models/Band');
const Project = require('../models/Project');
const User    = require('../models/User');
const Request = require('../models/Request');
const uploadCloud = require("../helpers/cloudinary");
const upload = require('multer')({dest:'./public/test'});

//New snippet
router.post('/profile/snippet', upload.single('snippet'), (req, res, next)=>{
  res.send('ya');
  //req.body.snippet = req.file.url;
  User.findByIdAndUpdate(req.user._id, req.body, {new:true})
    .then(user=>{
      res.json(user);
    })
    .catch(e=>next(e));
});

//New profile pic
router.post('/profile/pic', uploadCloud.single('profilePic'), (req, res, next)=>{
  req.body.profilePic = req.file.url;
  User.findByIdAndUpdate(req.user._id, {$push:{snippet:req.body}}, {new:true})
    .then(user=>{
       res.json(user)
    })
    .catch(e=>next(e));
});

//Sending requests
router.post('/request/:id', (req, res, next) => {
  Request.create({
    from:req.body.user,
    to:req.body.params,
    snippet:req.body.snippet,
    notes:req.body.notes
  })
    .then(request=>{
      return User.findByIdAndUpdate(request.to,{$push:{requests:request}})
    })
});

//New Band
router.post('/band/new', (req, res, next) => {
  Band.create(req.body)
    .then(band=>{
      console.log(band)
    })
});
//Search Bands
router.post('/band/search', (req, res, next) => {
  Band.find({'name':{$regex:req.body.search}})
    .then(bands=>{
      console.log(bands)
    })
});

//New Project
router.post('/project/new', (req, res, next) => {
  Project.create(req.body)
    .then(project=>{
      console.log(project)
    })
});
//Search Projects
router.post('/project/search', (req, res, next) => {
  Project.find({'name':{$regex:req.body.search}})
    .then(projects=>{
      console.log(projects)
    })
});

//User search queries:
//by instrument
router.post('/user/search/instrument', (req, res, next) => {
  User.find({'instrument':{$regex:req.body.search}})
    .then(users=>{
      console.log(users)
    })
});
//by influences
router.post('/user/search/influence', (req, res, next) => {
  User.find({'influence':{$regex:req.body.search}})
    .then(users=>{
      console.log(users)
    })
});
//by name
router.post('/user/search/name', (req, res, next) => {
  User.find({'name':{$regex:req.body.search}})
    .then(users=>{
      console.log(users)
    })
});

module.exports = router;
