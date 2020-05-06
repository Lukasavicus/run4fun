import {ProxyFactory} from '../services/ProxyFactory';

export class Bind {
    constructor(model, view, ...properties){

        let proxy = ProxyFactory.create(model, [{
            'props' : properties,
            'applicability' : "after",
            'action' : model => {
                view.update(model)
            }
        }]);
        view.update(model);
        return proxy;
    }
}