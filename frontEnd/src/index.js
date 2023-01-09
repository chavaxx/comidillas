import HomeScreen from "./screens/HomeScreen.js";
import ProductScreen from "./screens/ProductScreen.js";
import { parseRequestUrl } from "./utils.js";
import Error404Screen from "./screens/Error404Screen.js";
import CartScreen from "./screens/CartScreen.js";
//import ProfileScreen from "./screens/ProfileScreen.js";
//import RegisterScreen from "./screens/RegisterScreen.js";
const routes = {
    '/': HomeScreen,
    '/product/:id': ProductScreen,
    '/cart/:id':CartScreen,
    '/cart': CartScreen,
    //'/register': RegisterScreen,
    //'/profile': ProfileScreen,
}
const router = async () => {
    const request = parseRequestUrl();
    const parseUrl = 
        (request.resource ? `/${request.resource}` : '/') +
        (request.id ? '/:id' : '') + 
        (request.verb ? `/${request.verb}` : '');
    const screen = routes[parseUrl] ? routes[parseUrl] : Error404Screen;

    const main = document.getElementById('main-container');
    main.innerHTML = await screen.render();
    await screen.after_render();
};
window.addEventListener('load', router);
window.addEventListener('hashchange', router);