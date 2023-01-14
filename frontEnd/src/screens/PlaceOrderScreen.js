import CheckoutSteps from "../components/CheckoutSteps";
import { getCartItems, getShipping, getPayment, cleanCart } from "../localStorage";
import { hideLoading, showLoading, showMessage } from "../utils";
import { createOrder } from "../api";

const convertCartToOrder = () => {
    const orderItems = getCartItems();
    if (orderItems.length === 0) {
      document.location.hash = '/cart';
    }
    const shipping = getShipping();
    if (!shipping.address) {
      document.location.hash = '/shipping';
    }
    const payment = getPayment();
    if (!payment.paymentMethod) {
      document.location.hash = '/payment';
    }
    //const itemsPrice = orderItems.reduce((a, c) => a + c.price * c.qty, 0);
    const itemsPrice = orderItems.reduce((a,c) => a + (c.qty<8?c.price:c.qty>15?c.price*0.84:c.price*0.92) * c.qty, 0)
    const shippingPrice = itemsPrice > 100 ? 0 : 10;
    const taxPrice = Math.round(0.15 * itemsPrice * 100) / 100;
    const deliveryPrice = shipping.delivery == "DHL Express"? 67 : shipping.delivery =="DHL"? 0:-10;
    const totalPrice = (itemsPrice + shippingPrice + taxPrice + deliveryPrice).toFixed(2);
    return {
      orderItems,
      shipping,
      payment,
      itemsPrice,
      shippingPrice,
      taxPrice,
      deliveryPrice,
      totalPrice,
    };
  };

const PlaceOrderScreen = {
    after_render: async () => {
        document
        .getElementById('placeorder-button')
        .addEventListener('click', async () => {
            const order = convertCartToOrder();
            showLoading();
            const data = await createOrder(order);
            hideLoading();
            if (data.error) {
                showMessage(data.error);
            } else {
               cleanCart();
                document.location.hash = `/order/${data.order._id}`;
            }
        });
        
    },
    render: () => {
        const {
            orderItems,
            shipping,
            payment,
            itemsPrice,
            shippingPrice,
            taxPrice,
            deliveryPrice,
            totalPrice,
        } = convertCartToOrder();
            return `
                <div>
                ${CheckoutSteps.render({
                    step1: true,
                    step2: true,
                    step3: true,
                    step4: true,
                })}
                    <div class="order">
                        <div class="order-info">
                            <div>
                                <h2>Shipping</h2>
                                <div>
                                ${shipping.address}, ${shipping.city}, ${shipping.postalCode},
                                ${shipping.country}, ${shipping.delivery}
                                </div>
                            </div>
                            <div>
                                <h2>Payment</h2>
                                <div>
                                Payment Method : ${payment.paymentMethod}
                                </div>
                            </div>
                            <div>
                                <ul class="cart-list-container">
                                    <li>
                                        <h2>Shopping Cart</h2>
                                        <div>Price</div>
                                    </li>
                                    ${orderItems
                                        .map(
                                        (item) => `
                                        <li>
                                            <div class="cart-image">
                                                <img src="${item.image}" alt="${item.name}" />
                                            </div>
                                            <div class="cart-name">
                                                <div>
                                                    <a href="/#/product/${item.product}">${item.name} </a>
                                                </div>
                                                <div> Qty: ${item.qty} </div>
                                            </div>
                                            <div class="cart-price"> \u20AC${(item.qty<8?item.price:item.qty>15?item.price*0.84:item.price*0.92).toFixed(2)}</div>
                                        </li>
                                    `)
                                .join('\n')}
                                </ul>
                            </div>   
                        </div>
                        <div class="order-action">
                            <ul>
                                <li>
                                    <h2>Summary</h2>
                                </li>
                                <li><div> Items</div><div>\u20AC${itemsPrice}</div></li>
                                <li><div> Shipping</div><div>\u20AC${shippingPrice}</div></li>
                                <li><div> Tax</div><div>\u20AC${taxPrice}</div></li>
                                <li><div> Delivery fee</div><div>\u20AC${deliveryPrice}</div></li>
                                <li class="total"><div> Total</div><div>\u20AC${totalPrice}</div></li>
                                <li>
                                <button id="placeorder-button" class="primary fw"> Place Order </button>
                        </div>
                    </div>
                </div>
                
                                    
            `;
    },
};

export default PlaceOrderScreen;