const express = require('express');
const router  = express.Router();
const Band    = require('../models/Band');
const Project = require('../models/Project');
const User    = require('../models/User');
const Request = require('../models/Request');

//Search Bands
//User search queries:
//by instrument
//by influences
//by name

//New snippet
router.post('/profile/:id/snippets', (req, res, next)=>{
  User.findByIdAndUpdate(req.params.id, {$push: req.body}, {new:true})
    .then(user=>{
      res.json(user);
    })
    .catch(e=>next(e));
});

//Profile Editing:
//New profile pic
router.post('/profile/:id/profilePic', (req, res, next)=>{
  User.findByIdAndUpdate(req.params.id, req.body, {new:true})
    .then(user=>{
       res.json(user)
    })
    .catch(e=>next(e));
});
//Edit data
router.post('/profile/:id/edit', (req, res, next)=>{
  User.findByIdAndUpdate(req.params.id, req.body, {new:true})
    .then(user=>{
      res.json(user)
    })
    .catch(e=>next(e));
});

//Sending requests
router.post('/request/:id', (req, res, next) => {
  Request.create({
    from:req.body.user,
    to:req.params.id,
    snippet:req.body.snippet,
    notes:req.body.notes
  })
    .then(request=>{
      return User.findByIdAndUpdate(request.to,{$push: {requests:request}})
    })
    .catch(e=>console.log(e))
});




//New Band
router.post('/band/new', (req, res, next) => {
  Band.create(req.body)
    .then(band=>{
      console.log(band)
    })
});


//New Project
router.post('/band/new', (req, res, next) => {
  Band.create(req.body)
    .then(project=>{
      console.log(project)
    })
});


module.exports = router;
