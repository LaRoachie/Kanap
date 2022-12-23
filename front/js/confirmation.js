const urlParams = new URLSearchParams(window.location.search)
const order_id = urlParams.get('orderId')

// Affichage du numéro de commande
document.querySelector('#orderId').textContent = order_id
