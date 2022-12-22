const urlParams = new URLSearchParams(window.location.search)
const order_id = urlParams.get('orderId')

document.querySelector('#orderId').textContent = order_id
