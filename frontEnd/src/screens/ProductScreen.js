import { getProduct } from '../api';

const ProductScreen = {
    render: async () => {
        const request = parseRequestUrl();
        const product = await getProduct(request.id);
        if(product.error) {
            retrun`<div>${product.error}</div>`;
        }
        return `<h1>${product.name}</h1>`;
    },
};
export default ProductScreen;
