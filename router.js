const express = require('express');
const {User} = require("./models.js")
const router = express.Router();
const mongoose = require("./db.js")
const {authenticate} = require('./middleware.js');
const _ = require('lodash');

router.get('/', async (req, res) => {
  const ress =  await User.find({});
  res.send(ress);
})


router.post('/login', (req, res) => {
  var body = _.pick(req.body, ['email', 'password']);
  console.log(body)
  User.findByCredentials(body.email, body.password).then((user) => {
    return user.generateAuthToken().then((token) => {
      res.header('x-auth', token).send(user);
    });
  }).catch((e) => {
    res.status(400).send();
  });
});

router.get('/:id',authenticate ,async (req, res) => {
  const ress =  await User.findById(req.params.id);
  res.status(200).send(ress);
});

router.post('/',async (req, res) => {
console.log(req.body)

if(req.body.email && req.body.password) {

  const myUser = new User({
    email:req.body.email,
    password:req.body.password
  })
  myUser.save().then(() => {
     return myUser.generateAuthToken();
   }).then((token) => {
     res.header('x-auth', token).status(200).send(myUser);
   }).catch((e) => {
     res.status(400).send(e);
   })
} else {
   res.status(400).send({
     message:"enter all data"
   })
}
});

router.delete('/:id',authenticate,async (req, res) => {
  var id = req.params.id;
  const det = await User.findByIdAndRemove(id)
  console.log(det)
  res.send(det)
});

router.patch('/:id',authenticate,async (req, res) => {
const updt = await User.findByIdAndUpdate(req.params.id,{$set: req.body}, {new: true})
console.log(updt)
res.status(200).send({
  "message":"updates"
})
});



module.exports = router;
