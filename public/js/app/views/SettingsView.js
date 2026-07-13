'use strict';

System.register(['./View'], function (_export, _context) {
    "use strict";

    var View, _createClass, SettingsView;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    function _possibleConstructorReturn(self, call) {
        if (!self) {
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        }

        return call && (typeof call === "object" || typeof call === "function") ? call : self;
    }

    function _inherits(subClass, superClass) {
        if (typeof superClass !== "function" && superClass !== null) {
            throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
        }

        subClass.prototype = Object.create(superClass && superClass.prototype, {
            constructor: {
                value: subClass,
                enumerable: false,
                writable: true,
                configurable: true
            }
        });
        if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
    }

    return {
        setters: [function (_View2) {
            View = _View2.View;
        }],
        execute: function () {
            _createClass = function () {
                function defineProperties(target, props) {
                    for (var i = 0; i < props.length; i++) {
                        var descriptor = props[i];
                        descriptor.enumerable = descriptor.enumerable || false;
                        descriptor.configurable = true;
                        if ("value" in descriptor) descriptor.writable = true;
                        Object.defineProperty(target, descriptor.key, descriptor);
                    }
                }

                return function (Constructor, protoProps, staticProps) {
                    if (protoProps) defineProperties(Constructor.prototype, protoProps);
                    if (staticProps) defineProperties(Constructor, staticProps);
                    return Constructor;
                };
            }();

            _export('SettingsView', SettingsView = function (_View) {
                _inherits(SettingsView, _View);

                function SettingsView(HTMLElement) {
                    _classCallCheck(this, SettingsView);

                    return _possibleConstructorReturn(this, (SettingsView.__proto__ || Object.getPrototypeOf(SettingsView)).call(this, HTMLElement));
                }

                _createClass(SettingsView, [{
                    key: 'template',
                    value: function template(model) {
                        var settings = model.publicSettings;
                        var publicUrl = window.location.origin + '/public.html?login=' + encodeURIComponent(model.login);

                        return '\n            <form id="public-settings-form" class="settings-form">\n                <div>\n                    <h3>Public profile</h3>\n                    <p>Your public page: <a href="' + publicUrl + '" target="_blank">' + publicUrl + '</a></p>\n                </div>\n\n                <label><input type="checkbox" id="public-kpis" ' + (settings.kpis ? 'checked' : '') + '> Show KPIs</label>\n                <label><input type="checkbox" id="public-runs" ' + (settings.runs ? 'checked' : '') + '> Show runs</label>\n                <label><input type="checkbox" id="public-badges" ' + (settings.badges ? 'checked' : '') + '> Show badges</label>\n                <label><input type="checkbox" id="public-collectibles" ' + (settings.collectibles ? 'checked' : '') + '> Show collectibles</label>\n\n                <button type="submit">Save settings</button>\n            </form>\n        ';
                    }
                }]);

                return SettingsView;
            }(View));

            _export('SettingsView', SettingsView);
        }
    };
});