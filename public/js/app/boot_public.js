'use strict';

System.register([], function (_export, _context) {
    "use strict";

    var params;
    function dateToText(dateText) {
        var date = new Date(dateText);
        var day = String(date.getDate()).padStart(2, '0');
        var month = String(date.getMonth() + 1).padStart(2, '0');
        return day + '/' + month + '/' + date.getFullYear();
    }

    function grouped(items, field) {
        return items.reduce(function (groups, item) {
            var key = item[field] || 'General';
            groups[key] = groups[key] || [];
            groups[key].push(item);
            return groups;
        }, {});
    }

    function renderCards(items, field) {
        var groups = grouped(items, field);
        return Object.keys(groups).map(function (group) {
            return '\n        <div class="collectible-group">\n            <h3>' + group + '</h3>\n            <div class="collectible-grid">\n                ' + groups[group].map(function (item) {
                return '\n                    <div class="collectible owned">\n                        <img src="' + item.icon + '" class="collectible-img" alt="' + item.title + '">\n                        <p class="collectible-title">' + item.title + '</p>\n                        <p class="collectible-description">' + (item.description || item.hist || '') + '</p>\n                    </div>\n                ';
            }).join('') + '\n            </div>\n        </div>\n    ';
        }).join('');
    }

    function renderProfile(profile) {
        document.querySelector("#public-profile").innerHTML = '\n        <section class="section-title">\n            <div class="section-header">\n                <p>' + profile.name + '</p>\n                <span class="muted">@' + profile.login + '</span>\n            </div>\n\n            ' + (profile.kpis ? '\n                <div class="admin-kpis">\n                    <div><span>Total distance</span><strong>' + profile.kpis.total_distance + ' km</strong></div>\n                    <div><span>Total time</span><strong>' + profile.kpis.total_time + '</strong></div>\n                    <div><span>Longest run</span><strong>' + profile.kpis.max_distance + ' km</strong></div>\n                    <div><span>Activities</span><strong>' + profile.kpis.activities_count + '</strong></div>\n                </div>\n            ' : '') + '\n\n            ' + (profile.runs && profile.runs.length ? '\n                <table>\n                    <thead>\n                        <tr><th>Date</th><th>Activity</th><th>Place</th><th>Distance</th><th>Time</th></tr>\n                    </thead>\n                    <tbody>\n                        ' + profile.runs.map(function (run) {
            return '\n                            <tr>\n                                <td>' + dateToText(run.date) + '</td>\n                                <td>' + run.physical_activity + '</td>\n                                <td>' + run.place + '</td>\n                                <td>' + run.route_distance + ' km</td>\n                                <td>' + run.time + '</td>\n                            </tr>\n                        ';
        }).join('') + '\n                    </tbody>\n                </table>\n            ' : '') + '\n        </section>\n\n        ' + (profile.badges && profile.badges.length ? '\n            <section class="section-title">\n                <div class="section-header"><p>Badges</p></div>\n                ' + renderCards(profile.badges, 'group') + '\n            </section>\n        ' : '') + '\n\n        ' + (profile.collectibles && profile.collectibles.length ? '\n            <section class="section-title">\n                <div class="section-header"><p>Collectibles</p></div>\n                ' + renderCards(profile.collectibles, 'serie') + '\n            </section>\n        ' : '') + '\n    ';
    }

    function search(login) {
        var profile = document.querySelector("#public-profile");
        if (!login) return;

        profile.innerHTML = '\n        <section class="section-title">\n            <div class="empty-state">\n                <p>Loading profile...</p>\n            </div>\n        </section>\n    ';

        fetch('/public/' + encodeURIComponent(login)).then(function (res) {
            if (!res.ok) throw new Error('Profile not found');
            return res.json();
        }).then(renderProfile).catch(function (error) {
            profile.innerHTML = '\n                <section class="section-title">\n                    <div class="empty-state">\n                        <p>' + error.message + '</p>\n                        <span>Check the runner login and try again.</span>\n                    </div>\n                </section>\n            ';
        });
    }

    return {
        setters: [],
        execute: function () {
            document.querySelector("#public-search-form").addEventListener('submit', function (event) {
                event.preventDefault();
                search(document.querySelector("#public-login").value.trim());
            });

            params = new URLSearchParams(window.location.search);

            if (params.get('login')) {
                document.querySelector("#public-login").value = params.get('login');
                search(params.get('login'));
            }
        }
    };
});