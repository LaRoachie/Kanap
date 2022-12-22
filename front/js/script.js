import {getCart, saveCart, fetchJson} from './utils.js'

// Appel API et récupération de la réponse
// const response = await fetch('http://localhost:3000/api/products')
// const products = await response.json()
const products = await fetchJson('http://localhost:3000/api/products')

// Boucle pour inserer les données pour chaque produits à l'aide d'un template
products.forEach(product => {
    const productContainer = document.querySelector('#items')
    const template = document.querySelector('#item').content.cloneNode(true)

    template.querySelector('.productImg').src = product.imageUrl
    template.querySelector('.productImg').alt = product.altTxt
    template.querySelector('.productName').innerText = product.name
    template.querySelector('.productDescription').innerText = product.description
    template.querySelector('.productLink').href = `./product.html?id=${product._id}`
    productContainer.appendChild(template)
})
