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

        console.log($('#internal-only'));

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
            }, 500);
        });
    }
};

app.initialize();