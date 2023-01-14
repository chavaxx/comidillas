import { getUserInfo, setPayment } from '../localStorage';
import CheckoutSteps from '../components/CheckoutSteps';
import { showMessage } from '../utils';

const PaymentScreen = {
    after_render: () => {
        document
        .getElementById('payment-form')
        .addEventListener('submit', async (e) => {
            e.preventDefault();
            if(document.getElementById('consent').checked){
                const paymentMethod = document.querySelector(
                    'input[name="payment-method"]:checked'
                    ).value;
                setPayment({ paymentMethod });
                document.location.hash = '/placeorder';
            }
            else{
                showMessage("Please accept the privacy policy")
            }
            
        });

    },
    render: () => {
        const { name } = getUserInfo();
        if (!name) {
            document.location.hash = '/';
        }
        return `
        ${CheckoutSteps.render({ step1: true, step2: true, step3: true })}
        <div class="form-container">
            <form id="payment-form">
                <ul class="form-items">
                    <li>
                        <h1>Payment</h1>
                    </li>
                    <li>
                        <div>
                            <input type="radio"
                            name="payment-method"
                            id="paypal"
                            value="Paypal"
                            checked />
                            <label for="paypal" >PayPal</label>
                        </div>
                    </li>
                    <li>
                        <div>
                            <input type="radio"
                            name="payment-method"
                            id="creditcard" value="Credit Card"/>
                            <label for="creditcard">Credit Card</label>
                        </div>
                    </li>
                    <li>
                        <h3>Privacy policy</h3>
                        <div><input type="checkbox" name="consent"  required id="consent"> Accept usage of data</div>
                    </li>
                    <li>
                        <button type="submit" class="primary">Continue</button>
                    </li>
                </ul>
            </form>
        </div>
        `;
    },
};

export default PaymentScreen;