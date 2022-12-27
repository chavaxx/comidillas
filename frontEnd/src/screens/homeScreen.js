import data from '../data.js';
const homeScreen = {
    render: () => {
        const { products } = data;
        return `
        <ul class="products">
            ${products
                .map(
                    (product) => `
            <li>
                <div class="product">
                    <a href="/#/product/${products._id}">
                        <img src="${products.image}" alt="${products.name}"/>
                    </a>
                <div class="product-name">
                    <a href="/#/product/1">
                        ${products.name}
                    </a>
                </div>
                <div class="product-brand">
                        ${products.brand}
                </div>
                <div class="product-price">
                        €${products.price}
                </div>
                </div>
            </li>
            `
            ).join('\n')}
        `;
    },
};

export default homeScreen;