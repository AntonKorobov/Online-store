export let cart = {};
export let cartCounter = 0;

export function addProductToCart(productProperty) {
    // let id = product['Id'];
    let id = productProperty;

    if (id in cart) {
        delete cart[id].id
        cartCounter--;
    } else {
        let cartItem = {
            id: id,
        };
        cart[id] = cartItem
        console.log(cart);
        cartCounter++;
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    updateCart();
}
    
function updateCart() {
    localStorage.setItem("count", cartCounter);
    console.log(cartCounter);
}