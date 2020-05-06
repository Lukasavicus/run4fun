export class HttpService {

    constructor(){
        this._fetch = (originalFetch => {
        return (...args) => {
            //console.log("arg before ",args);
            if(window.sessionStorage.token){
                let options = args[1];
                if(options === undefined)
                    args.push({'headers' : {'x-access-token' : window.sessionStorage.token}})
                else
                    options.headers['x-access-token'] = window.sessionStorage.token;
            }
            //console.log("arg after ",args);
            const result = originalFetch.apply(window, args);
            return result;//.then(console.log('Request was sent'));
        };
      })(fetch);
  
    // if(window.sessionStorage.token)
    //     delete window.sessionStorage.token;
    }

    _handleErrors(res) {
        if(!res.ok) throw new Error(res.statusText);
        return res;
    }

    get(url) {
        return this._fetch(url)
            .then(res => this._handleErrors(res))
            .then(res => res.json());
        
    }
    
    post(url, options, response_json=false) {
        return this._fetch(url, options)
        .then(res => this._handleErrors(res))
        .then(res => response_json ? res.json() : res)
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