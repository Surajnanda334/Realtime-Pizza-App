const User = require('../../models/user')
var bcrypt = require('bcryptjs');

function authController(){
  return{
    login:function(req,res){

      res.render('auth/login')
    },
    register:function(req,res){

      res.render('auth/register')
    },
    postRegister:function(req,res) {
      const{name,email,password} = req.body

      //email exist check
      User.exists({email: email}, (err,result)=>{
        if(!result)
          {
              //random string to encrypt password with 10 salt rounds
            const randomString = bcrypt.genSaltSync(10);
    
            //create a user
            const user = new User({
              name: name,
              email: email,
              password: bcrypt.hashSync(password,randomString),
            })
    
            user.save()
            .then((data)=>{
              // Login
              console.log(data);
              return res.redirect('/')
            }).catch(err =>{
              req.flash('error', err)
              // return res.redirect('/register')
              console.log("error",err);
              return res.redirect('/')
            })
          }else{
            req.flash('error', err)
            console.log("error",err);
            res.json({
              message:`${email} already in use  try with another email 😞 or login into your account`,
            })
            
          }
      })
    }
  }
}

module.exports= authController