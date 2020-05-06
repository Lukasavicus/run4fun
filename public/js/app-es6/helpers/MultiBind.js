import {ProxyFactory} from '../services/ProxyFactory';

export class MultiBind {
    constructor(model, views, ...properties){

        let proxy = ProxyFactory.create(model, [{
            'props' : properties,
            'applicability' : "after",
            'action' : model => {
                views.forEach(view => view.update(model));
            }
        }]);
        views.forEach(view => view.update(model));
        return proxy;
    }
}