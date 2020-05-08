// WIP
import {ProxyFactory} from '../services/ProxyFactory';

export class MultiEventBind {
    constructor(model, views_and_properties_map){

        let options = views_and_properties_map.map(view_and_props => {
            view_and_props['applicability'] = "after";
            view_and_props['action'] = (model) => {
                view_and_props['views'].forEach(view => view.update(model));
            };
            return view_and_props;
        });

        let proxy = ProxyFactory.create(model, options);

        views_and_properties_map.forEach(view_and_props => {
            view_and_props['views'].forEach(view => view.update(model));
        });

        return proxy;
    }
}

/**
    this._user = new MultiBind(new User(window.sessionStorage.login), [
            {
                views : [
                    new ActivitiesView($("#activities-data")), 
                    new ActivitiesDashboardView($("#management-dashboard")),
                    new NavigationBarView($(".user-pill"))
                ],
                props : ['addActivity']
            },
            {
                views : [new BadgesView($("#badges"))],
                props : ['addBadges']
            },
            {
                views : [new CollectiblesView($("#collectibles"))],
                props : ['addCollectible']
            }
        ]);
 */