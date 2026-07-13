'use strict';

System.register(['./View'], function (_export, _context) {
    "use strict";

    var View, _createClass, AdminView;

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

            _export('AdminView', AdminView = function (_View) {
                _inherits(AdminView, _View);

                function AdminView(HTMLElement) {
                    _classCallCheck(this, AdminView);

                    return _possibleConstructorReturn(this, (AdminView.__proto__ || Object.getPrototypeOf(AdminView)).call(this, HTMLElement));
                }

                _createClass(AdminView, [{
                    key: '_list',
                    value: function _list(items) {
                        if (!items || items.length == 0) return '<p class="muted">No data yet.</p>';

                        return '\n            <ul class="admin-list">\n                ' + items.slice(0, 12).map(function (item) {
                            return '<li><span>' + item.title + '</span><strong>' + item.count + '</strong></li>';
                        }).join('') + '\n            </ul>\n        ';
                    }
                }, {
                    key: 'template',
                    value: function template(model) {
                        if (model.role != 'admin') {
                            return '\n                <div class="empty-state">\n                    <p>Admin area</p>\n                    <span>Login with an admin account to see app-wide metrics.</span>\n                </div>\n            ';
                        }

                        if (!model.adminSummary) {
                            return '\n                <div class="empty-state">\n                    <p>Admin data not loaded yet.</p>\n                    <span>Use the refresh button to load the app summary.</span>\n                </div>\n                <button id="refresh-admin" type="button">Refresh admin data</button>\n            ';
                        }

                        var summary = model.adminSummary;

                        return '\n            <div class="admin-kpis">\n                <div><span>Users</span><strong>' + summary.totals.users + '</strong></div>\n                <div><span>Activities</span><strong>' + summary.totals.activities + '</strong></div>\n                <div><span>Distance</span><strong>' + summary.totals.distance + ' km</strong></div>\n                <div><span>Badges</span><strong>' + summary.totals.badges_unlocked + '</strong></div>\n                <div><span>Collectibles</span><strong>' + summary.totals.collectibles_bought + '</strong></div>\n            </div>\n\n            <button id="refresh-admin" type="button">Refresh admin data</button>\n\n            <div class="admin-columns">\n                <div>\n                    <h3>Collectibles bought</h3>\n                    ' + this._list(summary.collectible_purchases) + '\n                </div>\n                <div>\n                    <h3>Badges unlocked</h3>\n                    ' + this._list(summary.badge_unlocks) + '\n                </div>\n            </div>\n\n            <table id="admin-users-table">\n                <thead>\n                    <tr>\n                        <th>User</th>\n                        <th>Role</th>\n                        <th>Balance</th>\n                        <th>Runs</th>\n                        <th>Km</th>\n                        <th>Badges</th>\n                        <th>Collectibles</th>\n                        <th></th>\n                    </tr>\n                </thead>\n                <tbody>\n                    ' + summary.users.map(function (user) {
                            return '\n                        <tr>\n                            <td>' + user.login + '<br><span class="muted">' + user.email + '</span></td>\n                            <td>' + user.role + '</td>\n                            <td>' + user.balance + ' \u26A1</td>\n                            <td>' + user.activities_count + '</td>\n                            <td>' + user.total_distance + '</td>\n                            <td>' + user.badges_count + '</td>\n                            <td>' + user.collectibles_count + '</td>\n                            <td>' + (user.role == 'admin' ? '' : '<button class="table-action danger admin-delete-user" data-user-id="' + user._id + '" type="button">delete</button>') + '</td>\n                        </tr>\n                    ';
                        }).join('') + '\n                </tbody>\n            </table>\n        ';
                    }
                }]);

                return AdminView;
            }(View));

            _export('AdminView', AdminView);
        }
    };
});