import _ from "lodash";
import fetchJsonp from 'fetch-jsonp';

class Ajax {
    get(url, params = {}) {
        url = this.serializeUrl(url, params);
        return fetch(url)
            .then(this.checkStatus)
            .then(this.parseJSON)
            .then(this.checkCode)
            .catch((err) => { Promise.reject({ msg: err }) })
    }
    post(url, params = {}) {
        const options = {
            body: JSON.stringify(params),
            method: "POST",
            headers: {
                'content-type': 'application/json'
            }
        }
        return fetch(url, options)
            .then(this.checkStatus)
            .then(this.parseJSON)
            .then(this.checkCode)
            .catch((err) => Promise.reject({ msg: err }))
    }
    upload(url, params = {}) {
        const formData = this.JsonToFormData(params);
        const options = {
            body: formData,
            method: 'POST',
            headers: {
                'content-type': 'multipart/form-data'
            }
        }
        return fetch(url, options)
            .then(this.checkStatus)
            .then(this.parseJSON)
            .then(this.checkCode)
            .catch((err) => Promise.reject({ msg: err }))
    }
    jsonp(url, params) {
        url = this.serializeUrl(url, params);
        //fetch 兼容不行 🙅 
        return fetchJsonp(url)
            .then(this.checkStatus)
            .then(this.parseJSON)
            .then(this.checkCode)
            .catch((err) => { Promise.reject({ msg: err }) })
    }
    all(promises) { 
        return Promise.all(promises);
    }
    postFormData(url, params = {}) {
        const formData = this.JsonToSearchParams(params);
        const options = {
            body: formData,
            method: 'POST',
        }
        return fetch(url, options)
            .then(this.checkStatus)
            .then(this.parseJSON)
            .then(this.checkCode)
            .catch((err) => Promise.reject({ msg: err }))
    }
    JsonToSearchParams(params) {
        if (_.isPlainObject(params)) {
            const formData = new URLSearchParams();
            for (let key in params) {
                let value = params[key];
                formData.append(key, value);
            }
            return formData;
        } else {
            throw new Error("the param is a plain Object");
        }
    }
    JsonToFormData(params) {
        if (_.isPlainObject(params)) {
            const formData = new FormData();
            for (let key in params) {
                let value = params[key];
                formData.append(key, value);
            }
            return formData;
        } else {
            throw new Error("the param is a plain Object");
        }
    }
    serializeUrl(url, params) {
        if (!url) { throw new Error("the first param is url") };
        if (!url.includes("?")) { url += "?" };
        if (_.isPlainObject(params)) {
            for (let key in params) {
                let value = params[key];
                if (url.endsWith("?")) {
                    url += `${key}=${value}`;
                } else {
                    url += `&${key}=${value}`;
                }
            }
        } else {
            throw new Error("the second param is a plain Object");
        }
        return url;
    }
    checkStatus(response) {
        if (response.status >= 200 && response.status < 500) {
            return response
        }
        const error = new Error(response.statusText);
        error.response = response;
        return Promise.reject(error)
    }
    checkCode(response) {
        let { status } = response;
        switch (status) {
            case 701:
                // window.location.href = "";
                return Promise.reject(response);
            case 200:
                return Promise.resolve(response);
            default:
                return Promise.reject(response);
        }
    }
    parseJSON(response) {
        return response.json();
    }
}


export default new Ajax();