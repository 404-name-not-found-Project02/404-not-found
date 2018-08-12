$(document).ready(function () {
    M.AutoInit();
    $('#calendar').fullCalendar({
        header: {
            left: 'prev,next today',
            center: 'title',
            right: 'month,agendaWeek,agendaDay'
        },
        defaultDate: moment(),
        navLinks: true, // can click day/week names to navigate views
        selectable: true,
        selectHelper: true,
        nowIndicator: true,
        timezone: "local",
        // dayClick: function(date) {
        //     alert('clicked ' + date.format());
        //   },
        // select: function (startDate, endDate) {
        //     alert('selected ' + startDate.format() + ' to ' + endDate.format());
        // },
        eventClick: function (calEvent, jsEvent, view) {
            $("#apptSubmit").attr("data-id", "")
            $(".modal").modal("open");
            $("input").val("");
            $("label").addClass("active")
            $("#client_name").val(calEvent.title);
            $("#start").val(moment(calEvent.start).format("MM-DD-YYYY HH:mm"));
            $("#end").val(moment(calEvent.end).format("MM-DD-YYYY HH:mm"));
            $("#apptSubmit").attr("data-id", calEvent.id)
            console.log(calEvent)
            // alert('Event: ' + calEvent.title);
            // alert('Coordinates: ' + jsEvent.pageX + ',' + jsEvent.pageY);
            // alert('View: ' + view.name);

            // change the border color just for fun
            // $(this).css('border-color', 'red');

        },
        select: function (start, end) {
            $(".modal").modal("open");
            $("input").val("");
            $("label").addClass("active")
            var displayStart = moment(start).format("MM-DD-YYYY HH:mm")
            var displayEnd = moment(end).format("MM-DD-YYYY HH:mm")
            $("#start").val(displayStart);
            $("#end").val(displayEnd);

            // if (title) {

            // }
            // var title = prompt('Client Name:');
            // var eventData;
            // if (title) {
            //     eventData = {
            //         title: title,
            //         start: start,
            //         end: end
            //     };
            //     $('#calendar').fullCalendar('renderEvent', eventData, true); // stick? = true
            //     console.log(eventData)
            // }
            // $('#calendar').fullCalendar('unselect');
        },
        editable: true,
        eventLimit: true, // allow "more" link when too many events
        events: [
            { id: 1, title: "Testing Title", start: "2018-08-12T12:00:00.000Z", end: "2018-08-12T14:00:00.000Z" },
            { "id": 1, "title": "Testing Title", "start": "2018-08-12T12:00:00.000Z", "end": "2018-08-12T14:00:00.000Z" }
        ]
    });

});

function createAppointment(appointment) {
    $.post("/api/appointments", appointment, function () {
    });
}

$("#upload-btn").on("click", function (e) {
    console.log("clicked me")
    e.preventDefault();
    $("#upload:hidden").trigger("click");
})

function getAppointments(id) {
    // id = 1;
    $.get("/api/appointments/" + id, function (data) {
        if (data) {
            $('#calendar').fullCalendar({
                events: [data]
            });
            console.log(data)
            // If this post exists, prefill our cms forms with its data
            // titleInput.val(data.title);
            // bodyInput.val(data.body);
            // postCategorySelect.val(data.category);
            // // If we have a post with this id, set a flag for us to know to update the post
            // // when we hit submit
            // updating = true;
        }
    });
}

$("#apptSubmit").on("click", function (event) {
    event.preventDefault();

})

