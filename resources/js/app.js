const axios = require('axios').default;
import AWN from "awesome-notifications"
//notifications
let notifier = new AWN()

let addToCart = document.querySelectorAll('.add-to-cart')
let cartCounter = document.querySelector('#cartCounter')

function updateCart(pizza){
  axios.post('/update-cart', pizza).then(res => {
    console.log(res);
    cartCounter.innerHTML = res.data.totalQty
    notifier.success('Your custom message')
  })
}

addToCart.forEach((btn) => {
  btn.addEventListener('click', (e)=>{
    let pizza = JSON.parse(btn.dataset.pizza)
    updateCart(pizza);
  }) 
})