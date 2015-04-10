var calendar = {

  bind: function($holder, data) {

    var months = ['Styczeń', 'Luty', 'Marzec', 'Kwiecień', 'Maj', 'Czerwiec', 'Lipiec', 'Sierpień', 'Wrzesień', 'Październik', 'Listopad', 'Grudzień'];
    var monthsShort = ['Sty', 'Lut', 'Mar', 'Kwi', 'Maj', 'Cze', 'Lip', 'Sie', 'Wrz', 'Paź', 'Lis', 'Gru'];
    var days = ['Niedziela', 'Poniedziałek', 'Wtorek', 'Środa', 'Czwartek', 'Piątek', 'Sobota'];
    var daysShort =  ['Nie', 'Pon', 'Wto', 'Śro', 'Czw', 'Pią', 'Sob'];

    if (data.length == 0) {
      return;
    }

    $holder.empty().fullCalendar({
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
        day:      'dzień'
      },
      firstDay: 1,
      allDaySlot: false,
      theme: true,
      header: {
        left: 'prev,next today',
        center: 'title',
        right: 'month, agendaWeek'
      },
      defaultView: 'month',
      slotMinutes: 15,
      dragOpacity: "0.5",
      timeFormat: 'H(:mm)',
      eventLimit: true,
      editable: true,
      events: data,
      eventClick: function(event) {
        alert(event);
        // var modal = $("#modal");
        // var date = new Date(event.start);
        // modal.find(".modal-title").html(days[date.getDay()] + ',  '
        //   + date.getUTCDate() + '  ' + months[date.getMonth()]
        //   + '   ' + date.getFullYear()
        //   + '  (' + date.getUTCHours() + ':' + date.getMinutes()
        //     + event.title + ')');
        // modal.find(".modal-body").html(event.description);
        // modal.modal();
      }
    })
}

}