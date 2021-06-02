function cartController(){
  return{
    index: function(req,res){
      res.render('customers/cart')
    }
  }
}

module.exports = cartController