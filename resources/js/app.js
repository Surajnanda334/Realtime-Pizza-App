const axios = require('axios').default;

let addToCart = document.querySelectorAll('.add-to-cart')
let cartCounter = document.querySelector('#cartCounter')

function updateCart(pizza){
  axios.post('/update-cart', pizza).then(res => {
    console.log(res);
    cartCounter.innerHTML = res.data.totalQty
    alert(`${pizza.name} added to cart sucessfully`)
  })
}

addToCart.forEach((btn) => {
  btn.addEventListener('click', (e)=>{
    let pizza = JSON.parse(btn.dataset.pizza)
    updateCart(pizza);
  }) 
})