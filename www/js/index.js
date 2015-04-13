var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
        this.loadUi();
    },
    loadUi: function() {
        $(function() {

            $('#start-date').val(moment().format('YYYY-MM-DD'));
            $('#end-date').val(moment().add(1, 'weeks').format('YYYY-MM-DD'));

            $('#theme-select').on('change', function(event) {
                $.mobile.changeGlobalTheme($(this).val());
            });

            $('#sign-in').click(function() {
                if (window.localStorage.getItem('user') != null) {
                    var user = {
                        login: $('#signin-login').val(),
                        password: $('#signin-password').val()
                    };

                    var localUser = JSON.parse(window.localStorage.getItem('user'));

                    if (localUser.login == user.login && localUser.password == user.password) {
                        $.mobile.changePage('#Form');
                    } else {
                        alert('Zły login lub hasło! Spróbuj jeszcze raz...');
                    };
                } else {
                    alert('Nie masz konta! Zarejestruj się!');
                };
            });

            $('#sign-up').click(function() {
                var user = {
                    login: $('#signup-login').val(),
                    password: $('#signup-password').val()
                }

                window.localStorage.setItem('user', JSON.stringify(user));
                $.mobile.changePage('#Form');
            });

        });
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    onDeviceReady: function() {
        app.printDeviceInfo();
        app.printLocationInfo();
        app.fetchGroups();
    },
    checkInternetConnection: function(callback) {
        var networkState = navigator.connection.type;

        if (networkState != Connection.NONE || device.platform == 'browser') {
            callback();
        } else {
            alert('Aplikacja wymaga połączenia z internetem');
        };
    },
    printLocationInfo: function() {
        navigator.geolocation.getCurrentPosition(function(position) {
            $('.device-position').append('<p><b>Lokalizacja: </b>' + position.coords.latitude + ', ' + position.coords.longitude + '</p>');
        });
    },
    printDeviceInfo: function() {
        var model = '<p><b>Model: </b>' + device.model + '</p>';
        var platform = '<p><b>Platforma: </b>' + device.platform + '</p>';
        var uuid = '<p><b>UUID: </b>' + device.uuid + '</p>';
        $('.device-info').append(model + platform + uuid);
    },
    // Fetch all groups from the Cash API
    fetchGroups: function() {
        if (!window.localStorage.getItem('groupsJSON')) {
            ActivityIndicator.show('Pobieram listę grup...');
            app.checkInternetConnection(function() {
                $.getJSON("http://devplan.uek.krakow.pl/api/groups", function(groups) {
                    $.each(groups, function(index, group) {
                        $("#groups-list").append('<li><a href="#" onclick="app.search(this)" data-id="' +  group.id + '">' + group.name + '</a></li>');
                    });
                    $("#groups-list").listview("refresh");
                    ActivityIndicator.hide();
                    window.localStorage.setItem('groupsJSON', JSON.stringify(groups));
                });
            });
        } else {
            var groups = JSON.parse(window.localStorage.getItem('groupsJSON'));
            $.each(groups, function(index, group) {
                $("#groups-list").append('<li><a href="#" onclick="app.search(this)" data-id="' +  group.id + '">' + group.name + '</a></li>');
            });
            $("#groups-list").listview("refresh");
        };
    },
    search: function(group) {

        var groupId = $(group).data('id'),
            startDate = $('#start-date').val(),
            endDate = $('#end-date').val(),
            internalOnly = $('#internal-only').is(':checked');
            includeLabs = $('#include-labs').is(':checked');

        if (!groupId || !startDate || !endDate) {
            alert('Wypełnij wszystie pola');
            return;
        }

        var params = {
            'group_id': [groupId],
            'start_date': moment(new Date(startDate)).format('YYYY-MM-DD'),
            'end_date': moment(new Date(endDate)).format('YYYY-MM-DD'),
            'internal_only': internalOnly,
            'include_labs': includeLabs
        }

        devPlan.availablePlaces(params, function(dates) {            
            $.mobile.changePage('#Result');
            var $wrapper = $('#calendar-wrapper').html('Wyszukuje ...');
            setTimeout(function() {
                $wrapper.empty().append('<div id="calendar"></div>');
                calendar.bind($('#calendar'), dates);
            }, 1200);
        });
    }
};

app.initialize();

// Dynamically changes the theme of all UI elements on all pages,
// also pages not yet rendered (enhanced) by jQuery Mobile.
$.mobile.changeGlobalTheme = function(theme)
{
    // These themes will be cleared, add more
    // swatch letters as needed.
    var themes = " a b c d e";

    // Updates the theme for all elements that match the
    // CSS selector with the specified theme class.
    function setTheme(cssSelector, themeClass, theme)
    {
        $(cssSelector)
            .removeClass(themes.split(" ").join(" " + themeClass + "-"))
            .addClass(themeClass + "-" + theme)
            .attr("data-theme", theme);
    }

    // Add more selectors/theme classes as needed.
    setTheme(".ui-mobile-viewport", "ui-overlay", theme);
    setTheme("[data-role='page']", "ui-body", theme);
    setTheme("[data-role='header']", "ui-bar", theme);
    setTheme("[data-role='listview'] > li", "ui-bar", theme);
    setTheme(".ui-btn", "ui-btn-up", theme);
    setTheme(".ui-btn", "ui-btn-hover", theme);
};