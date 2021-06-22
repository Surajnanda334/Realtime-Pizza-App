const axios = require('axios').default;
import AWN from "awesome-notifications"
// Set global options
let options =  {
  position: 'bottom-right',
  durations: {
    global: 1000,
    success: 1000,
  }
}
// Initialize instance of AWN
let notifier = new AWN(options)

// Set custom options for next call if needed, it will override globals
// let nextCallOptions = {...}
// Call one of available functions

let addToCart = document.querySelectorAll('.add-to-cart')
let cartCounter = document.querySelector('#cartCounter')

function updateCart(pizza){
  axios.post('/update-cart', pizza).then(res => {
    console.log(res);
    cartCounter.innerHTML = res.data.totalQty
    notifier.success(`${pizza.name} added to cart`, options)
  })
}

addToCart.forEach((btn) => {
  btn.addEventListener('click', (e)=>{
    let pizza = JSON.parse(btn.dataset.pizza)
    updateCart(pizza)
  }) 
})