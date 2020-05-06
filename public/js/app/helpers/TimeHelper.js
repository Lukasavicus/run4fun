'use strict';

System.register([], function (_export, _context) {
    "use strict";

    var _createClass, TimeHelper;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    return {
        setters: [],
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

            _export('TimeHelper', TimeHelper = function () {
                function TimeHelper() {
                    _classCallCheck(this, TimeHelper);

                    throw new Error("This class should not be instantiated");
                }

                _createClass(TimeHelper, null, [{
                    key: 'getNumberSeconds',
                    value: function getNumberSeconds(timeString) {
                        var hours = parseInt(timeString.split(':')[0]); // TODO: improve it
                        var minutes = parseInt(timeString.split(':')[1]);
                        var seconds = parseInt(timeString.split(':')[2]);

                        return hours * 3600 + minutes * 60 + seconds * 1;
                    }
                }, {
                    key: 'getNumberHours',
                    value: function getNumberHours(timeString) {
                        return TimeHelper.getNumberSeconds(timeString) / 3600;
                    }
                }, {
                    key: 'timeToText',
                    value: function timeToText() {
                        var h = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
                        var m = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
                        var s = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;


                        var hours = h;
                        var minutes = m;
                        var seconds = s;

                        var secs = "00";
                        var mins = "00";
                        var hrs = "00";

                        //console.log(hours, minutes, seconds, h, m, s);

                        if (seconds >= 60) {
                            hrs = parseInt(seconds / 3600);
                            seconds %= 3600;
                            mins = parseInt(seconds / 60);
                            seconds %= 60;
                            secs = parseInt(seconds % 60);
                        } else {
                            secs = seconds;
                        }

                        if (minutes >= 60) {
                            hrs = parseInt(minutes / 60);
                            minutes %= 60;
                            mins = parseInt(minutes % 60);
                        } else if (s < 60) {
                            mins = minutes;
                        }

                        if (s < 60 && m < 60) {
                            hrs = hours;
                        }

                        //console.log(hrs, mins, secs);

                        secs = (secs < 10 ? '0' : '') + secs;
                        mins = (mins < 10 ? '0' : '') + mins;
                        hrs = (hrs < 10 ? '0' : '') + hrs;

                        return hrs + ':' + mins + ':' + secs;
                    }
                }]);

                return TimeHelper;
            }());

            _export('TimeHelper', TimeHelper);
        }
    };
});
//# sourceMappingURL=TimeHelper.js.map