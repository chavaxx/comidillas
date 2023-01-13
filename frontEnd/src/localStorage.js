export const getCartItems = () =>{
    const cartItems = localStorage.getItem('cartItems')?
    JSON.parse(localStorage.getItem('cartItems')):[];
    return cartItems;
}

export const setCartItems = (cartItems) =>{
    localStorage.setItem('cartItems',JSON.stringify(cartItems));
}

export const setUserInfo = ({
    _id='',
    name='',
    email = '',
    password = '',
    token = '',
    isAdmin = false,
    lastOnline='',
    screen = '',
    os = '',
}) =>{
    localStorage.setItem('userInfo',JSON.stringify({
        _id, 
        name, 
        email,
        password,
        token,
        isAdmin,
        lastOnline, 
        screen,
        os,
    })
)}

export const clearUser = () => {
    localStorage.removeItem('userInfo');
}

export const getUserInfo = () =>{
    return localStorage.getItem('userInfo')?
    JSON.parse(localStorage.getItem('userInfo')):
    {name:'', email:'', password:''}
}