'use strict';

System.register(['../services/ProxyFactory'], function (_export, _context) {
    "use strict";

    var ProxyFactory, MultiBind;

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
            _export('MultiBind', MultiBind = function MultiBind(model, views) {
                for (var _len = arguments.length, properties = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
                    properties[_key - 2] = arguments[_key];
                }

                _classCallCheck(this, MultiBind);

                var proxy = ProxyFactory.create(model, [{
                    'props': properties,
                    'applicability': "after",
                    'action': function action(model) {
                        views.forEach(function (view) {
                            return view.update(model);
                        });
                    }
                }]);
                views.forEach(function (view) {
                    return view.update(model);
                });
                return proxy;
            });

            _export('MultiBind', MultiBind);
        }
    };
});
//# sourceMappingURL=MultiBind.js.map