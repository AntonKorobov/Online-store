export let cart = {};
export let cartCounter = 0;

export function addProductToCart(product) {
    // let id = product['Id'];

    // if (id in cart) {
    //     //delete product
    // } else {
    //     let cartItem = {
    //         id: id,
    //     };
    //     cart[id] = cartItem
    // }
    
    // cartCounter++;
    // sum += price;

    // localStorage.setItem("cart", JSON.stringify(cart));
    // updateCart();
}
    
function updateCart() {
    localStorage.setItem("count", cartCounter);
}