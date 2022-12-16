const urlParams = new URLSearchParams(window.location.search)
const order_id = urlParams.get('orderId')

document.querySelector('#orderId').innerHTML = order_id
