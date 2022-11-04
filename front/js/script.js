try {
    const response = await fetch('http://localhost:3000/api/products')
    const products = await response.json()
    console.log(products)

    const section = document.querySelector('#items')
    for (const product of products) {
        const template = document.querySelector('#item').content.cloneNode(true)
        template.querySelector('.productLink').href = `./product.html?id=${product._id}`
        template.querySelector('.productImg').src = product.imageUrl
        template.querySelector('.productImg').alt = product.altTxt
        template.querySelector('.productName').innerText = product.name
        template.querySelector('.productDescription').innerText = product.description
        section.appendChild(template)
    }

} catch (error) {
    alert("une erreur s'est produite")
}


// async function main() {
//     try {
//         const response = await fetch('http://localhost:3000/api/products')
//         const products = await response.json()
//         console.log(products)
    
//         const section = document.querySelector('#items')
//         for (const product of products) {
//             const template = document.querySelector('#item').content.cloneNode(true)
//             template.querySelector('.productImg').src = product.imageUrl
//             section.appendChild(template)
//         }
    
//     } catch (error) {
//         alert("une erreur s'est produite")
//     }
// }

// main()



// fetch('http://localhost:3000/api/products').then(response => {
//     return response.json()
// }).then(products => {
//     const section = document.querySelector('#items')
//     for (const product of products) {
//         const template = document.querySelector('#item').content.cloneNode(true)
//         template.querySelector('.productImg').src = product.imageUrl
//         section.appendChild(template)
//     }
// }).catch(err => console)