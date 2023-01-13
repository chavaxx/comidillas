import { getUserInfo, getCartItems } from "../localStorage";

const Header = {
    render:() =>{
        const {name} = getUserInfo();
        let cartItems = getCartItems();
        const totalItems = cartItems.reduce((a,c)=> a + c.qty, 0);
        return `<div class="brand">
        <a href="/#/">Comidillas</a>
    </div>
    <div class="cart-container">
    ${name ?`<a href="/#/profile">${name}</a>`:`<a href="/#/signin">Sing-In</a>`}
            <span classname="number-cart-items">${totalItems}</span>
            <a href="/#/cart"><img src="/../../images/shopping-cart.png" class="shopping-cart"></a>
    </div>`
    },
    after_render: ()=>{},
};
export default Header