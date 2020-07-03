export default {
    isPromise(obj) {
        return !!obj  //有实际含义的变量才执行方法，变量null，undefined和''空串都为false
            && (typeof obj === 'object' || typeof obj === 'function') // 初始promise 或 promise.then返回的
            && typeof obj.then === 'function';
    },
    cookie: {
        removeCookie(name) {
            this.setCookie(name, "", new Date(0));
        },
        getCookie(name) {
            let cookie = document.cookie;
            let cookieName = encodeURIComponent(name) + "=",
                cookieStart = cookie.indexOf(cookieName),
                cookieValue = null;
            if (cookieStart > -1) {
                let cookieEnd = cookie.indexOf(';', cookieStart);
                if (cookieEnd == -1) {
                    cookieEnd = cookie.length;
                }
                cookieValue = decodeURIComponent(cookie.substring(cookieStart + cookieName.length, cookieEnd));
            }
            return cookieValue;
        },
        setCookie(name, value, expires) {
            let cookieText = encodeURIComponent(name) + "=" + encodeURIComponent(value);
            if (expires instanceof Date) {
                cookieText += "; expires=" + expires.toGMTString();
            } else {
                cookieText += "; expires=Fri, 31 Dec 9999 23:59:59 GMT";
            }
            document.cookie = cookieText + ";path=/;domain=" + document.domain;
        },
    },
}