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
    async postRegister(req,res){
      const{name,email,password} = req.body

      //email exist check
      User.exists({email: email}, (err,result)=>{
        if(!result)
          {
              //random string to encrypt password with 10 salt rounds
            const randomString = bcrypt.genSaltSync(10);
            const hashedPassword = bcrypt.hashSync(password,randomString)
            //create a user
            const user = new User({
              name,
              email,
              password: hashedPassword,
            })
    
            user.save()
            .then((data)=>{
              // Login
              console.log(data);
              return res.redirect('/')
            }).catch(err =>{
              req.flash('error', 'Something went wrong')
              // return res.redirect('/register')
              console.log("error",err);
              return res.redirect('/register')
            })
          }else{
            req.flash('error', `(${email})`)
            req.flash('errorm', `this Email is already in use `)
            req.flash('name', name)
            req.flash('email', email)
            console.log(`${email} is already in use`);
            res.redirect('/register')
            
          }
      })
    },
  }
}

module.exports= authController