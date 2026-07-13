'use strict';

System.register(['./View'], function (_export, _context) {
    "use strict";

    var View, _createClass, BadgesView;

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

            _export('BadgesView', BadgesView = function (_View) {
                _inherits(BadgesView, _View);

                function BadgesView(HTMLElement) {
                    _classCallCheck(this, BadgesView);

                    return _possibleConstructorReturn(this, (BadgesView.__proto__ || Object.getPrototypeOf(BadgesView)).call(this, HTMLElement));
                }

                _createClass(BadgesView, [{
                    key: 'template',
                    value: function template(model) {
                        var earnedBadges = model.badgeList.badges.filter(function (badge) {
                            return badge.earned;
                        });
                        var groups = model.badgeList.badges.reduce(function (badgesByGroup, badge) {
                            var group = badge.group || 'General';
                            badgesByGroup[group] = badgesByGroup[group] || [];
                            badgesByGroup[group].push(badge);
                            return badgesByGroup;
                        }, {});

                        return '\n            <div class="badge-toolbar">\n                <button class="badge-filter active" type="button" onclick="this.closest(\'#badges\').dataset.filter=\'all\'; this.parentNode.querySelectorAll(\'.badge-filter\').forEach(button => button.classList.remove(\'active\')); this.classList.add(\'active\')">All</button>\n                <button class="badge-filter" type="button" onclick="this.closest(\'#badges\').dataset.filter=\'earned\'; this.parentNode.querySelectorAll(\'.badge-filter\').forEach(button => button.classList.remove(\'active\')); this.classList.add(\'active\')">Earned</button>\n            </div>\n\n            ' + (earnedBadges.length == 0 ? '\n                <div class="empty-state badge-empty-earned">\n                    <p>No badges earned yet.</p>\n                    <span>Register runs to unlock the colored versions of these badges.</span>\n                </div>\n            ' : '') + '\n\n            ' + Object.keys(groups).map(function (group) {
                            return '\n                <div class="badge-group ' + (groups[group].some(function (badge) {
                                return badge.earned;
                            }) ? '' : 'no-earned') + '">\n                    <h3>' + group + '</h3>\n                    <div class="badge-grid">\n                        ' + groups[group].sort(function (a, b) {
                                return Number(b.earned) - Number(a.earned) || a.title.localeCompare(b.title);
                            }).map(function (badge) {
                                var earnedAt = badge.earnedAt ? new Date(badge.earnedAt).toLocaleDateString() : '';
                                var points = badge.earnedValue || badge.value;

                                return '\n                                <button class="badge ' + (badge.earned ? 'earned' : 'blocked') + '" type="button" onclick="document.getElementById(\'badge-modal-' + badge.id + '\').showModal()">\n                                    <span class="badge-status">' + (badge.earned ? 'Earned' : 'Blocked') + '</span>\n                                    <img src="' + badge.icon + '" class="badge-img" alt="' + badge.title + '">\n                                    <span class="badge-title">' + badge.title + '</span>\n                                    <span class="badge-description">' + badge.description + '</span>\n                                </button>\n                                <dialog class="badge-modal" id="badge-modal-' + badge.id + '">\n                                    <div class="badge-modal-header">\n                                        <img src="' + badge.icon + '" alt="' + badge.title + '">\n                                        <div>\n                                            <h4>' + badge.title + '</h4>\n                                            <p>' + badge.group + '</p>\n                                        </div>\n                                    </div>\n                                    <p class="badge-modal-text">' + badge.description + '</p>\n                                    <p class="badge-modal-text">' + (badge.earned ? 'Earned on ' + earnedAt + '. This badge yielded ' + points + '\u26A1.' : 'Reward: ' + badge.value + '\u26A1. Keep training to unlock it.') + '</p>\n                                    <form method="dialog">\n                                        <button type="submit">Close</button>\n                                    </form>\n                                </dialog>\n                            ';
                            }).join('') + '\n                    </div>\n                </div>\n            ';
                        }).join('') + '\n        ';
                    }
                }]);

                return BadgesView;
            }(View));

            _export('BadgesView', BadgesView);
        }
    };
});
//# sourceMappingURL=BadgesView.js.map