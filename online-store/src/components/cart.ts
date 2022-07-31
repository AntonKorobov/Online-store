const cardsToBuyCounter = document.querySelector('.cart__counter') as HTMLElement;

export let cartData: (string | number)[] = JSON.parse(localStorage.getItem('cartData') || '[]');
export let cartCounter: number = cartData.length;

export function addProductToCart(productProperty: string) {
    const id = productProperty;

    const search = cartData.indexOf(id);
    if (search === -1 && cartCounter === 20) {
        alert('Sorry, cart is full. You need to delete some products to add new.');
    }
    if (search === -1 && cartCounter < 20) {
        cartData.push(id);
    } else {
        cartData[search] = 0;
        cartData = cartData.filter((element) => element !== 0);
    }

    cartCounter = cartData.length;

    localStorage.setItem('cartData', JSON.stringify(cartData));
}

export function updateCartCounter() {
    cardsToBuyCounter.innerHTML = cartCounter.toString();
    if (cartCounter !== 0) {
        cardsToBuyCounter.classList.add('cart__counter_visible');
    } else {
        cardsToBuyCounter.classList.remove('cart__counter_visible');
    }
}
