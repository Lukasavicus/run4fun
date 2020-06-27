export class HttpService {

    constructor(){
        this._fetch = (originalFetch => {
        return (...args) => {
            console.log("arg before ",args);
            if(window.sessionStorage.token){
                if(args[1] === undefined || args[1].headers === undefined ){
                    args.push({'headers' : {'x-access-token' : window.sessionStorage.token}});
                }
                else{
                    console.log('I do have a token ! Let me pass');
                    args[1].headers['x-access-token'] = window.sessionStorage.token;
                }
            }
            console.log("arg after ",args);
            //const result = originalFetch.apply(window, args);
            const result = originalFetch.apply(window, args).then((res) => {
                if(!res.ok && res.status == 401){
                    // IF 401 REDIRECT
                    // delete window.sessionStorage.token;
                    // delete window.sessionStorage.login;
                    // window.location.href = "home.html";
                }
                return res;
            });
            return result;//.then(console.log('Request was sent'));
        };
      })(fetch);
  
    // if(window.sessionStorage.token)
    //     delete window.sessionStorage.token;
    }

    _handleErrors(res) {
        console.log('HttpService', res);
        if(!res.ok) throw new Error(res.statusText);
        return res;
    }

    get(url) {
        return this._fetch(url)
            .then(res => this._handleErrors(res))
            // .then(res => res.json());
            .then(res => {
                // console.log('GET Res', res);
                let res_json = res.json();
                // console.log('GET ResJson', res_json);
                return res_json;
            });
    }
    
    post(url, options, response_json=false) {
        console.log('POST', url, options, response_json);
        return this._fetch(url, options)
        .then(res => this._handleErrors(res))
        .then(res => response_json ? res.json() : res)
    }

    patch(url) {
        return this._fetch(url, {
            method: 'PATCH'
        })
        .then(res => this._handleErrors(res))
        .then(res => res.json());
    }

    // This is deprecated
    _get(url) {
        return new Promise((resolve, reject) => {
            let xhr = new XMLHttpRequest();
            xhr.open('GET', url);
            xhr.onreadystatechange = () => {
                if(xhr.readyState == 4) {
                    if(xhr.status == 200) {
                        resolve(JSON.parse(xhr.responseText));
                    }
                    else {
                        console.log(xhr.responseText);
                        reject(xhr.responseText);
                    }
                }
            }
            xhr.send();
        });
    }
}