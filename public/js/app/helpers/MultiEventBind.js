'use strict';

System.register(['../services/ProxyFactory'], function (_export, _context) {
    "use strict";

    var ProxyFactory, MultiEventBind;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    return {
        setters: [function (_servicesProxyFactory) {
            ProxyFactory = _servicesProxyFactory.ProxyFactory;
        }],
        execute: function () {
            _export('MultiEventBind', MultiEventBind = function MultiEventBind(model, views_and_properties_map) {
                _classCallCheck(this, MultiEventBind);

                var options = views_and_properties_map.map(function (view_and_props) {
                    view_and_props['applicability'] = "after";
                    view_and_props['action'] = function (model) {
                        view_and_props['views'].forEach(function (view) {
                            return view.update(model);
                        });
                    };
                    return view_and_props;
                });

                var proxy = ProxyFactory.create(model, options);

                views_and_properties_map.forEach(function (view_and_props) {
                    view_and_props['views'].forEach(function (view) {
                        return view.update(model);
                    });
                });

                return proxy;
            });

            _export('MultiEventBind', MultiEventBind);
        }
    };
});
//# sourceMappingURL=MultiEventBind.js.map