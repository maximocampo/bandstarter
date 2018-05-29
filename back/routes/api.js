const express = require('express');
const router  = express.Router();
const Reply    = require('../models/Reply');
const User    = require('../models/User');
const Request = require('../models/Request');

router.get('/request/ignore/:id', (req,res,next)=>{
  Request.findByIdAndRemove(req.params.id)
    .then(request=>request)
    .catch(e=>next(e))
});

router.get('/profile/:id', (req, res, next) => {
  User.findById(req.params.id)
    .then(user=>{
      return res.json(user)
    })
    .catch(e=>console.log(e))
});

//User search queries:
//by instrument
router.post('/search/user/instrument', (req,res,next)=>{
  User.find({'instruments': {'$regex': new RegExp(req.body.query, "i")}})
    .then(users=>{
      return res.json(users)
    })
    .catch(e=>next(e))
});
//by influences
router.post('/search/user/influences', (req,res,next)=>{
  User.find({'influences': {'$regex': new RegExp(req.body.query, "i")}})
    .then(users=>{
      return res.json(users)
    })
    .catch(e=>next(e))
});
//by name
router.post('/search/user/name', (req,res,next)=>{
  User.find({'name': {'$regex': new RegExp(req.body.query, "i")}})
    .then(users=>{
      return res.json(users)
    })
    .catch(e=>next(e))
});

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
  req.body.to   = req.params.id;
  Request.create(req.body)
    .then(request=>{
      return User.findByIdAndUpdate(request.to,{$push: {requests:request}})
    })
    .catch(e=>console.log(e))
});

//New Reply
router.post('/reply/new', (req, res, next) => {
  Reply.create(req.body)
    .then(reply=>{
      return User.findByIdAndUpdate(reply.to,{$push:{replies:reply}})
    })
    .catch(e=>console.log(e))
});


//New Project
router.post('/band/new', (req, res, next) => {
  Band.create(req.body)
    .then(project=>{
      console.log(project)
    })
});

//by id
router.get('/user/:id', (req,res,next)=>{
  User.findById(req.params.id)
    .populate([{
      "path":'requests',
      "populate":{path:'from'}
    },{
      "path":"replies",
      "populate":{path:'from'}
    }])
    .then(users=>{
      return res.json(users)
    })
    .catch(e=>next(e))
});

module.exports = router;
