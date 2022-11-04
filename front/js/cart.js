try {
    const response = await fetch('http://localhost:3000/api/products')
    const products = await response.json()
    console.log(products)

    const section = document.querySelector('#cart__items')
    for (const product of products) {
        const template = document.querySelector('#cart').content.cloneNode(true)
        template.querySelector('.productImg').src = product.imageUrl
        template.querySelector('.productImg').alt = product.altTxt
        template.querySelector('.productName').innerText = product.name
        template.querySelector('.productColor').innerText = product.color
        template.querySelector('.productPrice').innerText = product.price + " €"
        template.querySelector('.productQuantity').innerText = product.quantity
        section.appendChild(template)
    }

} catch (error) {
    alert("une erreur s'est produite")
}