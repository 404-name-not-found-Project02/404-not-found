
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
            $("#modal-btn").data("event", "update");
            $("#modal-btn").text("Update");
            $("#modal-btn").append("<i class='material-icons right'>send</i>");
            $(".modal").modal("open");
            $("input").val("");
            $("label").addClass("active")
            $("#client_name").val(calEvent.title);
            $("#start").val(moment(calEvent.start).format("MM-DD-YYYY HH:mm"));
            $("#end").val(moment(calEvent.end).format("MM-DD-YYYY HH:mm"));
            $("#apptSubmit").attr("data-id", calEvent.id)
            console.log(calEvent);
            console.log(jsEvent);
            // alert('Event: ' + calEvent.title);
            // alert('Coordinates: ' + jsEvent.pageX + ',' + jsEvent.pageY);
            // alert('View: ' + view.name);

            // change the border color just for fun
            // $(this).css('border-color', 'red');

        },
        select: function (start, end, jsEvent, view) {
            console.log(view.dateProfile.isRangeAllDay)
            $(".modal").modal("open");
            $("#modal-btn").data("event", "create");
            $("#modal-btn").text("Submit");
            $("#modal-btn").append("<i class='material-icons right'>send</i>");
            $("input").val("");
            $("label").addClass("active");
            $("#start").data("time", start);
            $("#end").data("time", end);
            if (view.dateProfile.isRangeAllDay) {
                var displayStart = moment(start).format("MM-DD-YYYY");
                var displayEnd = moment(end).format("MM-DD-YYYY");
            } else {
                var displayStart = moment(start).format("MM-DD-YYYY HH:mm");
                var displayEnd = moment(end).format("MM-DD-YYYY HH:mm");
            }
            $("#start").val(displayStart);
            $("#end").val(displayEnd);
        },
        editable: true,
        eventLimit: true, // allow "more" link when too many events
        events: function (start, end, timezone, callback) {
            $.ajax({
                method: "GET",
                url: "/api/appointments/" + localStorage.getItem("provider_id"),
                // data: {
                //     // our hypothetical feed requires UNIX timestamps
                //     start: start.unix(),
                //     end: end.unix()
                // },
                success: function (doc) {
                    var events = [];
                    console.log("outside the each");
                    console.log(doc);
                    $(doc).each(function () {
                        // console.log($(this).attr('end'));
                        events.push({
                            id: $(this).attr('id'),
                            title: $(this).attr('title'),
                            start: $(this).attr('start'),
                            end: $(this).attr('end'), // will be parsed
                        });
                    });
                    callback(events);
                }
            });
        }
    });

});

function createAppointment(appointment, callback) {
    $.post("/api/appointments", appointment, function () {
    }).then(function () {
        $("#calendar").fullCalendar("refetchEvents");
        getAppointments(localStorage.getItem("provider_id"));
        renderTable();
    })

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
            $("#calendar").fullCalendar("refetchEvents");
            // If this post exists, prefill our cms forms with its data
            // titleInput.val(data.title);
            // bodyInput.val(data.body);
            // postCategorySelect.val(data.category);
            // // If we have a post with this id, set a flag for us to know to update the post
            // // when we hit submit
            // updating = true;
        }
    });
};

function getProvider(id) {
    // id = 1;
    $.get("/api/providers/" + id, function (data) {
        if (data) {
            console.log(data)
            var displayName = data[0].first_name + " " + data[0].last_name
            $("#providerName").text(displayName)
        }
    })
};

function getAppointmentsTable(id) {
    // id = 1;
    $.get("/api/appointments/table/" + id, function (apptsTbl) {
        console.log(apptsTbl)
        return new Promise(resolve => {
            resolve(apptsTbl);
        });

        // return (apptsTbl)

    });
}

$("#modal-btn").on("click", function (event) {
    event.preventDefault();
    var eventType = $("#modal-btn").data("event");
    switch (eventType) {
        case "update":
            console.log(eventType)
            break;
        case "create":
            console.log(eventType)
            var start = $("#start").val().trim();
            var end = $("#end").val().trim();
            var appointment = {};
            appointment.start = moment(start).format("YYYY/MM/DD HH:mm:ss");
            appointment.end = moment(end).format("YYYY/MM/DD HH:mm:ss");
            appointment.title = $("#client_name").val().trim();
            appointment.note = $("#note").val().trim();
            appointment.provider_id = localStorage.getItem("provider_id");
            // console.log(appointment);
            createAppointment(appointment);

            break;
        default:
            break;
    }
    // console.log("clicked")
    // var start = $("#start").val().trim();
    // var end = $("#end").val().trim();
    // var appointment = {};
    // appointment.start = moment(start).format("YYYY/MM/DD HH:mm:ss");
    // appointment.end = moment(end).format("YYYY/MM/DD HH:mm:ss");
    // appointment.title = $("#client_name").val().trim();
    // appointment.note = $("#note").val().trim();
    // appointment.provider_id = localStorage.getItem("provider_id");
    // // console.log(appointment);
    // createAppointment(appointment);


})

