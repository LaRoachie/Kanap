import {getCart, saveCart, fetchJson} from './utils.js'

try {
    const urlParams = new URLSearchParams(window.location.search)
    const id = urlParams.get('id')
    const product = await fetchJson(`http://localhost:3000/api/products/${id}`)

    // 1
    product.colors.forEach(color => {
        const option = document.createElement('option')
        option.value = color
        option.innerText = color
        document.querySelector('#colors').appendChild(option)
    })

    // 2
    // const addColors = color => {
    //     const option = document.createElement('option')
    //     option.value = color
    //     option.innerText = color
    //     document.querySelector('#colors').appendChild(option)
    // }
    // product.colors.forEach (color => addColors(color))

    // 2bis
    // product.colors.forEach(addColors)


    document.querySelector('#title').innerText = product.name
    document.querySelector('#price').innerText = product.price
    document.querySelector('#description').innerText = product.description


    // AddCart
    document.querySelector('#addToCart').addEventListener('click', () => {

        const cart = getCart()
        let cartItem = cart.find(cartItem => cartItem.id === product._id && cartItem.color === document.querySelector('#colors').value)
        if (!cartItem) {
            cartItem = {
                id: product._id,
                quantity: 0,
                // quantity: +document.querySelector('#quantity').value,
                color: document.querySelector('#colors').value
            }
            cart.push(cartItem)
        }
        cartItem.quantity += parseInt(document.querySelector('#quantity').value)
        saveCart(cart)
    })

} catch (error) {
    alert("une erreur s'est produite")
}


// 3
// function addColors (color) {
//     const option = document.createElement('option')
//     option.value = color
//     option.innerText = color
//     document.querySelector('#colors').appendChild(option)
// }


