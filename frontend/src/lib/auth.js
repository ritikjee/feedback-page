import Cookies from 'js-cookie'


export const setToken = (token) => {
    if(typeof window === 'undefined'){
        return;
    }
    Cookies.set('id',token.user.id);
    Cookies.set('username',token.user.username);
    Cookies.set('jwt',token.jwt);
    Cookies.set('role',token.user.admin);

    if(Cookies.get('username')){
        window.location.href = '/';
    }

};

export const removeToken = () => {
    if(typeof window === 'undefined'){
        return;
    }
    Cookies.remove('id');
    Cookies.remove('username');
    Cookies.remove('jwt');
    Cookies.remove('role');
    window.location.href = '/';
}

export const getUserFromCookie = () => {
    return Cookies.get('username');
}

export const getTokenFromCookie = () => {
    return Cookies.get('jwt');
}

export const getRoleFromCookie = () => {
    return Cookies.get('role');
}

export const getIdFromCookie = () => {
    return Cookies.get('id');
}
    