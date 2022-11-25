const response = await fetch('http://localhost:3000/api/products')
const products = await response.json()

products.forEach(product => {
    console.log(product)
    const productContainer = document.querySelector('#items')
    const template = document.querySelector('#item').content.cloneNode(true)

    template.querySelector('.productImg').src = product.imageUrl
    template.querySelector('.productName').innerText = product.name
    template.querySelector('.productDescription').innerText = product.description
    template.querySelector('.productLink').href = `./product.html?id=${product._id}`
    productContainer.appendChild(template)
})
