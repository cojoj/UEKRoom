var calendar = {

  bind: function($holder, data) {

    var months = ['Styczeń', 'Luty', 'Marzec', 'Kwiecień', 'Maj', 'Czerwiec', 'Lipiec', 'Sierpień', 'Wrzesień', 'Październik', 'Listopad', 'Grudzień'];
    var monthsShort = ['Sty', 'Lut', 'Mar', 'Kwi', 'Maj', 'Cze', 'Lip', 'Sie', 'Wrz', 'Paź', 'Lis', 'Gru'];
    var days = ['Niedziela', 'Poniedziałek', 'Wtorek', 'Środa', 'Czwartek', 'Piątek', 'Sobota'];
    var daysShort =  ['Nie', 'Pon', 'Wto', 'Śro', 'Czw', 'Pią', 'Sob'];

    if (data.length == 0) {
       $holder.html('<h4>Brak wyników</h4>');
       return;
    }

    $holder.fullCalendar({
      defaultDate: new Date(data[0].date),
      monthNames: months,
      monthNamesShort: monthsShort,
      dayNames: days,
      dayNamesShort: daysShort,
      buttonText:
      {
        today:    'dzisiaj',
        month:    'miesiąc',
        week:     'tydzień',
        day:      'dzień',
        prev:     'Poprzedni',
        next:     'Następny'
      },
      firstDay: 1,
      allDaySlot: false,
      theme: true,
      header: {
        left: 'prev',
        center: 'title',
        right: 'next'
      },
      defaultView: 'basicWeek',
      slotMinutes: 15,
      dragOpacity: "0.5",
      timeFormat: 'H(:mm)',
      eventLimit: true,
      events: data,
      eventClick: function(event) {
        var popup = $("#popup-result");
        var date = new Date(event.start);

        contentHtml = '<h4>' + moment(date).format('DD.MM.YYYY, h:mm') + '<h4>';
        contentHtml += event.description;

        popup.html(contentHtml).popup( 'open' );
      }
    })
}

}