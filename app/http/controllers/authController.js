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
        if(result)
          {
            req.flash('error', 'Email already in use')
            return res.redirect('/register')
          }
      })
      
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
        return res.redirect('/')
      }).catch(err =>{
        req.flash('error', err)
        return res.redirect('/register')
      })

      console.log(req.body);
    }
  }
}

module.exports= authController