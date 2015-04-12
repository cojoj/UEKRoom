var devPlan = {
  availablePlaces: function(params, callback) {
    ActivityIndicator.show('Szukam wolnych sal...');
    app.checkInternetConnection(function() {
      $.getJSON("http://cash.dev.uek.krakow.pl/api/places/available", params, function(dates) {
        ActivityIndicator.hide();
        callback(devPlan.parse(params, dates));
      });
    });
  },
  parse: function(params, data) {

    var parsedData = [];

    for (var i = 0; i < data.length; i++)
    {
      var day_data = data[i];
      day_data.allDay = false;
      day_data.title = ' - ' + day_data.ends_at;
      day_data.start = day_data.date + 'T' + day_data.starts_at;
      day_data.end = day_data.date + 'T' + day_data.ends_at;
      day_data.description = 'Wolne sale: <br><br>';
      parsedData.push(day_data);
      var places = day_data.available_places;

      for (var j = 0; j < places.length; j++)
      {
        if (params['include_labs'] == '1' && !places[j].short_location.contains('lab.'))
        {
          continue;
        }
        day_data.description += '- ' + places[j].full_location + '<br>';
      }
    }

    return parsedData;
  }
}