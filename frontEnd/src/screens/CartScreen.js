import { getProduct } from "../api";
import { getCartItems, getUserInfo, setCartItems } from "../localStorage";
import { parseRequestUrl, rerender } from "../utils";

const addToCart = (item,forceUpdate = false) =>{
    let cartItems = getCartItems();
    const existItem = cartItems.find(x => x.product === item.product);
    if(existItem){
        if(forceUpdate){
            cartItems = cartItems.map((x) => x.product === existItem.product? item: x);
        } 
    }
    else{
        cartItems = [...cartItems, item];
    }
    setCartItems(cartItems);
    if(forceUpdate){
        rerender(CartScreen)
    }   
}

const removeFromCart = (id) =>{
    setCartItems(getCartItems().filter(x=> x.product !== id));
    if(id === parseRequestUrl().id){
        document.location.hash = '/cart';
    }
    else{
        rerender(CartScreen)
    }
}

const CartScreen = {
    after_render: () =>{
        const qtySelects = document.getElementsByClassName("qty-select");
        Array.from(qtySelects).forEach((qtySelect) =>{
            qtySelect.addEventListener('change',(e)=>{
                const item = getCartItems().find(x => x.product === qtySelect.id);
                addToCart({...item,qty:Number(e.target.value)}, true);
            });
        });
        const deleteButtons = document.getElementsByClassName("delete-button");
        Array.from(deleteButtons).forEach(deleteButton =>{
            deleteButton.addEventListener('click',()=>{
                removeFromCart(deleteButton.id);
            });
        });
        document.getElementById("checkout-button").addEventListener("click", () =>{
            if(getUserInfo().name){
                document.location.hash = '/shipping';
            }
            else{
                document.location.hash = '/signin';
            }
            
        })
    },
    render: async () =>{
        const request = parseRequestUrl();
        if(request.id){
            const product = await getProduct(request.id);
            addToCart({
                product: product._id,
                name: product.name,
                image:product.image,
                price:product.price,
                countInStock: product.countInStock,
                qty:1,
            })
        }
        const cartItems = getCartItems();
        const totalItems = cartItems.reduce((a,c)=> a + c.qty, 0);
        return ` <div class ="content cart">
            <div class = "cart-list">
                <ul class= "cart-list-container">
                    <li>
                        <h3>Shopping cart</h3>
                        <div>Price</div>
                    </li>
                    <li>
                        ${
                            cartItems.length === 0? '<div>Cart is empty. <a href="/#/">To store</a></div>':
                            cartItems.map(item => `
                            <li>
                                <div class="cart-image">
                                    <img src="${item.image}" alt="${item.name}">
                                </div>
                                <div class="cart-name">
                                    <div>
                                        <a href="/#/product/${item.product}">${item.name}</a>
                                    </div>
                                    <div>
                                        Quantity: <select class="qty-select" id="${item.product}">
                                        ${
                                            [...Array(item.countInStock).keys()].map(x => item.qty === x+1?
                                                `<option selected value="${x+1}">${x+1}</option>`:
                                                `<option value="${x+1}">${x+1}</option>`
                                                )
                                        }

                                        </select>
                                        <button type="button" class="delete-button" id="${item.product}">
                                        Delete
                                        </button>
                                    </div>
                                </div>
                                <div class="cart-price">
                                    \u20AC${item.price} discounted price: \u20AC${(item.qty<8?item.price:item.qty>15?item.price*0.84:item.price*0.92).toFixed(2)}
                                </div>
                            </li>`).join('\n')
                        }
                    </li>
                </ul>
            </div>
            <div class="cart-action">
                <h3>
                    
                    Subtotal (${totalItems} items): \u20AC${(cartItems.reduce((a,c) => a + (c.qty<8?c.price:c.qty>15?c.price*0.84:c.price*0.92) * c.qty, 0)).toFixed(2)}
                </h3>
                <button id="checkout-button" class="primary fw">
                    Proceed to checkout
                </button>
            </div>
        </div>
        `;
    },
};

export default CartScreen;