var express = require('express');
//const { response } = require('../app');
var router = express.Router();
var dbExport=require('../HELPER/user-helper')
var loginChecker=((req,res,next)=>{
  if(req.session.user){
    req.session.status
    
    next()

  }else{
    res.redirect('/')
  }

})
let sessionKeep=((req,res,next)=>{
  if(req.session.user){
    next()
  }else{
    req.redirect('/user-home')
  }
})
  



/* GET home page. */
router.get('/', function (req, res, next) {
  
  
  
  res.render('index', { user: true, });
});
router.get('/user-home',loginChecker,sessionKeep, (req, res) => {
  let datas=req.session.user
  res.render('user/user-home', { user: true,datas, style: 'style.css' })
});
router.get('/show-apps',loginChecker,sessionKeep, (req, res) => {
  let datas=req.session.user
  res.render('user/show-apps', { user: true,datas, style: 'all.css' })
});
router.get('/show-clicks',loginChecker,sessionKeep, (req, res) => {
  let datas=req.session.user
  res.render('user/show-clicks', { user: true,datas, style: 'all.css' })
});


router.post('/',(req,res)=>{
  dbExport.userLoginData(req.body).then((responsee)=>{
    console.log(req.body);
    req.session.user=responsee.user
    req.session.logedInn=true
    if(responsee.status){
      res.redirect('user/user-home')
  
    }else{
      res.redirect('/')
    }

  })
  
  

});
router.get('/create-account',(req,res)=>{
  res.render('user/create-account')
  
});
router.post('/create-account',(req,res)=>{
  dbExport.getAllData(req.body).then((response)=>{
    
    res.redirect('/')

  })

  //console.log(req.body);
  
})
module.exports = router;