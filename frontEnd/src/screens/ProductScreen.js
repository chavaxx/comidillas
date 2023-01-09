import { parseRequestUrl } from '../utils';
import { getProduct } from '../api';
import Rating from '../components/Rating';

const ProductScreen = {
    after_render:() =>{
        const request = parseRequestUrl();
        document.getElementById("add-button").addEventListener('click',
        () =>{
            document.location.hash = `/cart/${request.id}`;
        });
    },
    render: async () => {
        const request = parseRequestUrl();
        const product = await getProduct(request.id);
        if(product.error) {
            retrun`<div>${product.error}</div>`;
        }
        return `
        <div class="content">
            <div class="back-to-result">
                <a href="/#/"> Back to result </a>
            </div>
            <div class="details">
                <div class="details-image">
                    <img src="${product.image}" alt="${product.name}"/>
                </div>
                <div class="details-info">
                    <ul>
                        <li>
                            <h1>${product.name}</h1>
                        </li>
                        <li>
                        ${Rating.render({
                            value: product.rating,
                            text: `${product.numReviews} reviews`,
                        })}
                        </li>
                        <li>
                            Price: <strong>'\u20AC'${product.price}</strong>
                        </li>
                        <li>
                            Description:
                            <div>
                                <h1>${product.description}</h1>
                            </div>
                        </li>
                    </ul>
                </div>
                <div class="details-action">
                    <ul>
                        <li>
                            Price: '\u20AC'${product.price}
                        </li>
                        <li>
                            Status:
                                ${product.countInStock > 0 
                                    ? `<span class="success"> In Stock </span>`
                                    : `<span class="error"> Unavailable </span>`
                                }
                        </li>
                        <li>
                                <button id="add-button" class="fw primary">Add to Cart</button>
                        </li>
                    </ul>
                </div>
            </div>
        </div>`;
    },
};
export default ProductScreen;
