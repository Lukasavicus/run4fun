export class ProxyFactory {
    
    /*
     * :applicability: parametro responsavel por controlar a aplicação da(s) ação(ões)
     * das funções de armadilha. Valores possíveis e exemplos:
     * "antes": aplica a função antes da chamada do parâmetro
     * "depois": aplica a função depois da chamada do parâmetro
     * "ambos": aplica a função antes e depois da chamada do parâmetro
     */
     //static create(objeto, props, action, applicability, other_action) {

    //static options = [];

    static create(objeto, options) {
        this.options = options;
        //console.log("new Proxy for:", objeto);
        //console.log('options', options);

        return new Proxy(objeto, {
                get(target, prop, receiver) {
                    //let option = ProxyFactory._get_option_by_property(prop);
                    let option = options.filter(option => (option.props.includes(prop)))[0];
                    //console.log('option', option, 'prop', prop);

                    // if(prop == 'send')
                    //     console.log('here comes the send');

                    if(option != undefined && ProxyFactory._ehFuncao(target[prop])) {
                        //console.log("entrou");
                        return function() {
                            // before_action
                            if(['before', 'both'].includes(option.applicability)){
                                //console.log('calling action before');
                                // console.log('where is RequestFactory? ');
                                // console.log('target', target);
                                // console.log('receiver', receiver);
                                option.action(target);
                            }
                            //console.log('calling prop->target');
                            let retorno = Reflect.apply(target[prop], target, arguments);
                            // after_effects
                            if(['after', 'both'].includes(option.applicability)){
                                //console.log('calling action after', option.action, target);
                                option.action(target);
                            }
                            return retorno;
                        }
                    }

                    if(ProxyFactory._ehFuncao(target[prop])){
                        // console.log('Esta funcao foi chamada: ', prop);
                        return (Reflect.get(target, prop, receiver)).bind(target);
                    }
                    else{
                        // console.log('Esta propriedade foi chamada: ', prop);
                        return target[prop];
                    }
                },
                
                set(target, prop, value, receiver) {
                    let option = options.filter(option => (option.props.includes(prop)))[0];
                    // console.log('option', option, 'prop', prop);
                    // console.log('Esta propriedade foi setada: ', prop);

                    let retorno = (target[prop] = value);

                    if(option != undefined)
                        option.action(target);

                    return retorno;
                },

                // other handlers
                construct: function(target, args) {
                    // console.log('HANDLERS - constructing');
                    let object = new target(...args);
                    options[0].action(object)
                    return object;
                },
                apply: function(target, that, args) {
                    console.log('HANDLERS - applying');
                    // sup.apply(that, args);
                    // base.apply(that, args);
                },
                getPrototypeOf(target) {
                    console.log('HANDLERS - getPrototypeOf');
                    //return monsterPrototype;
                },
                setPrototypeOf: function(target, prototype) {
                    console.log('HANDLERS - setPrototypeOf');
                },
                isExtensible: function(target) {
                    console.log('HANDLERS - isExtensible');
                }
        });
    }
    
    static _ehFuncao(func) {
        return typeof(func) == typeof(Function);
    }

    // static _get_option_by_property(property){
    //     console.log('searching on', property, this.options);
    //     return this.options.filter(option => (option.props.includes(property)))[0];
    // }
}

    /* 
     * Usage example:

     this._request_proxy = ProxyFactory.create(
			new XMLHttpRequest(), [
				{'props' : ['send', 'upload'], 'action' : this._on_request.bind(this), 'applicability' : "before"},
				{'props' : ['ontimeout'], 'action' : this._on_requestError.bind(this), 'applicability' : "before"},
				//{'props' : ['onload', 'onloadend', 'onprogress'], 'action' : this._on_response.bind(this), 'applicability' : "before"},
				//{'props' : ['onload', 'onloadend', 'onprogress'], 'action' : this._on_response.bind(this), 'applicability' : "after"},
				{'props' : ['onreadystatechange'], 'action' : this._on_response.bind(this), 'applicability' : "before"},
				{'props' : ['onerror'], 'action' : this._on_responseError.bind(this), 'applicability' : "before"},
		]);

     */