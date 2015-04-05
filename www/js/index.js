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
        app.fetchGroups();
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Fetch all groups from the Cash API
    fetchGroups: function() {
        $.getJSON("http://devplan.uek.krakow.pl/api/groups", function(groups) {
            $.each(groups, function(index, group) {
                // console.log(group.name);
                $("#groups-list").append("<li>" + group.name + "</li>");
            })
            $("#groups-list").listview("refresh");
        });
    }
};

app.initialize();