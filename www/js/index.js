var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
        this.fetchGroups();
    },
    // deviceready Event Handler
    onDeviceReady: function() {
        app.printDeviceInfo();
    },
    printDeviceInfo: function() {
        var model = '<p><b>Model: </b>' + device.model + '</p>';
        var platform = '<p><b>Platforma: </b>' + device.platform + '</p>';
        var uuid = '<p><b>UUID: </b>' + device.uuid + '</p>';
        $('#info').append(model + platform + uuid);
    },
    // Fetch all groups from the Cash API
    fetchGroups: function() {
        $.getJSON("http://devplan.uek.krakow.pl/api/groups", function(groups) {
            $.each(groups, function(index, group) {
                // console.log(group.name);
                $("#groups-list").append('<li><a href="#" onclick="app.search(this)" data-id="' +  group.id + '">' + group.name + '</a></li>');
            })
            $("#groups-list").listview("refresh");
        });
    },
    search: function(group) {

        var groupId = $(group).data('id'),
            startDate = $('#start-date').val(),
            endDate = $('#end-date').val(),
            internalOnly = $('#internal-only').attr(':checked'),
            includeLabs = $('#include-labs').attr(':checked');

        if (!groupId || !startDate || !endDate) {
            alert('Wypełnij wszystie pola');
        }

        var params = {
            'group_id': [groupId],
            'start_date': $.datepicker.formatDate("yy-mm-dd", new Date(startDate)),
            'end_date': $.datepicker.formatDate("yy-mm-dd", new Date(endDate)),
            'internal_only': internalOnly,
            'include_labs': includeLabs
        }

        devPlan.availablePlaces(params, function(dates) {
            calendar.bind($('#calendar'), dates);
            $.mobile.changePage('#Result');
        });
    }
};

app.initialize();