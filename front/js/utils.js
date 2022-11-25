const CART_KEY = 'cart'

export async function fetchJson(...params){
    const response = await fetch(...params)
    return response.json()
}

export function getCart(){
    return JSON.parse(localStorage.getItem(CART_KEY)) || []
}

export function saveCart(cart){
    localStorage.setItem(CART_KEY, JSON.stringify(cart))
}

