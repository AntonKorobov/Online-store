export let cartData = JSON.parse(localStorage.getItem("cartData")) || [];
export let cartCounter = cartData.length;

export function addProductToCart(productProperty) {
    let id = productProperty;

    let search = cartData.indexOf(id);

    if (search === -1) {
        cartData.push(id);
    } else {
        cartData[search] = 0;
        cartData = cartData.filter((element) => element !== 0);
    }

    cartCounter = cartData.length;

    // console.log(cartData);
    localStorage.setItem("cartData", JSON.stringify(cartData));
}