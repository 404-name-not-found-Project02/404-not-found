var calendarObject = {}

$(document).ready(function () {
    M.AutoInit();
    $('#calendar').fullCalendar({
        header: {
            left: 'prev,next today',
            center: 'title',
            right: 'month,agendaWeek,agendaDay,listWeek'
        },
        defaultDate: moment(),
        navLinks: true, //can click day/week names to navigate views
        selectable: true,
        selectHelper: true,
        nowIndicator: true,
        timezone: "local",
        defaultView: "agendaWeek",
        businessHours: {
            // days of week. an array of zero-based day of week integers (0=Sunday)
            dow: [0, 1, 2, 3, 4, 5, 6], // Monday - Thursday

            start: '06:00', // a start time (10am in this example)
            end: '19:00', // an end time (6pm in this example)
        },
        //dayClick: function(date) {
        //alert('clicked ' + date.format());
        //},
        //select: function (startDate, endDate) {
        //alert('selected ' + startDate.format() + ' to ' + endDate.format());
        //},
        eventClick: function (calEvent, jsEvent, view) {
            // console.log($.fullCalendar.moment(calEvent.start._d).utc());
            calendarObject = calEvent;
            var startUTC = moment(calEvent.start._i).utc().format("YYYY/MM/DD HH:mm:ss");
            var endUTC = moment(calEvent.end._i).utc().format("YYYY/MM/DD HH:mm:ss");
            $("#modal-btn").data("event", "update");
            $("#modal-btn").text("Update");
            $("#delete-btn").css("visibility", "visible");
            $("#modal-btn").data("id", calEvent.id);
            $("#delete-btn").data("id", calEvent.id);
            $("#modal-btn").append("<i class='material-icons right'>send</i>");
            $("#newAppt").modal("open");
            $("input").val("");
            $("label").addClass("active")
            $("#start").data("time", startUTC);
            $("#end").data("time", endUTC);
            $("#client_name").val(calEvent.title);
            $("#start").val(moment(calEvent.start).local().format("MMMM Do YYYY, h:mm a"));
            // moment($("#start").data("time")).local().format("YYYY-MM-DD HH:mm:ss")
            $("#end").val(moment(calEvent.end).local().format("MMMM Do YYYY, h:mm a"));
            $("#client_name").focus();
        },
        select: function (start, end, jsEvent, view) {
            //Intl.DateTimeFormat().resolvedOptions().timeZone
            // console.log(moment(start).utc());
            // console.log(start);
            $("#delete-btn").css("visibility", "hidden");
            $("#newAppt").modal("open");
            $("#modal-btn").data("event", "create");
            $("#modal-btn").text("Submit");
            $("#modal-btn").append("<i class='material-icons right'>send</i>");
            $("input").val("");
            $("label").addClass("active");
            $("#start").data("time", start);
            $("#end").data("time", end);
            if (start.hasTime()) {
                var displayStart = moment(start).format("MMMM Do YYYY, h:mm a");
                var displayEnd = moment(end).format("MMMM Do YYYY, h:mm a");
            } else {
                var displayStart = moment(start).format("MMMM Do YYYY");
                var displayEnd = moment(end).format("MMMM Do YYYY");
            }
            $("#start").val(displayStart);
            $("#end").val(displayEnd);
            $("#client_name").focus();
        },
        //dayClick: function (date, allDay, jsEvent, view) {
        //console.log("this is the day click function")
        //},
        editable: true,
        eventLimit: true,
        eventDrop: function (event, delta, revertFunc) {

            //console.log(moment(event.start._d).format("YYYY/MM/DD HH:mm:ss"));
            //moment.tz.setDefault("America/New_York");
            //console.log(delta)
            calendarObject = event;
            var id = event.id;
            var appointment = {};
            appointment.title = event.title;
            if (event.allDay) {
                //need to fix this timezone issue... .add(1, "day") is a temp fix.
                // console.log(event.allDay)
                appointment.start = moment(event.start._i).utc().format("YYYY/MM/DD");
                appointment.end = moment(event.end._i).utc().format("YYYY/MM/DD");
            } else {
                appointment.start = moment(event.start._i).utc().format("YYYY/MM/DD HH:mm:ss");
                if (event.end != null) {
                    appointment.end = moment(event.end._i).utc().format("YYYY/MM/DD HH:mm:ss");
                } else {
                    //appointment.end = moment(event.start._d).add(6.5, "hours").format("YYYY/MM/DD HH:mm");
                    appointment.end = moment(event.end._i).add(30, "m").utc().format("YYYY/MM/DD HH:mm:ss");
                }
            }
            // console.log(appointment)
            // console.log(appointment.start)
            // console.log(appointment.end)

            if (!confirm("Are you sure about this change?")) {
                revertFunc();
            } else {
                updateAppointment(id, appointment)
            }

        },
        eventResize: function (event, jsEvent, ui, view) {
            //console.log(moment(event.start._d).format("YYYY/MM/DD HH:mm:ss"));
            var id = event.id;
            var appointment = {};
            calendarObject = event
            // console.log(event);
            if (event.allDay) {
                appointment.start = moment(event.start._d).format("YYYY/MM/DD");
                appointment.end = moment(event.start._d).format("YYYY/MM/DD");
            } else {
                appointment.start = moment(event.start._i).utc().format("YYYY/MM/DD HH:mm:ss");
                appointment.end = moment(event.end._i).utc().format("YYYY/MM/DD HH:mm:ss");
            }
            appointment.title = event.title;
            // console.log(appointment)
            // console.log(appointment.start)
            // console.log(appointment.end)

            if (!confirm("Are you sure about this change?")) {
                revertFunc();
            } else {
                updateAppointment(id, appointment)
            }
        },

        events: function (start, end, timezone, callback) {
            $.ajax({
                method: "GET",
                url: "/api/appointments/" + localStorage.getItem("provider_id"),
                //data: {
                ////our hypothetical feed requires UNIX timestamps
                //start: start.unix(),
                //end: end.unix()
                //},
                success: function (doc) {
                    var events = [];
                    //console.log("outside the each");
                    //console.log(doc);
                    $(doc).each(function () {
                        //console.log($(this).attr('end'));
                        if ($(this).attr('start') === $(this).attr('end')) {
                            events.push({
                                id: $(this).attr('id'),
                                title: $(this).attr('title'),
                                start: $(this).attr('start'),
                                allDay: true,
                                timezone: timezone,
                            });
                        } else {
                            events.push({
                                id: $(this).attr('id'),
                                title: $(this).attr('title'),
                                start: $(this).attr('start'),
                                end: $(this).attr('end'),
                            });
                        }
                        // console.log(events)
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
    //console.log("clicked me")
    e.preventDefault();
    $("#upload:hidden").trigger("click");
})

function getAppointments(id) {
    //id = 1;
    $.get("/api/appointments/" + id, function (data) {
        if (data) {
            $('#calendar').fullCalendar({
                events: [data]
            });
            //console.log(data)
            $("#calendar").fullCalendar("refetchEvents");
            //If this post exists, prefill our cms forms with its data
            //titleInput.val(data.title);
            //bodyInput.val(data.body);
            //postCategorySelect.val(data.category);
            ////If we have a post with this id, set a flag for us to know to update the post
            ////when we hit submit
            //updating = true;
        }
    });
};

function getProvider(id) {
    //id = 1;
    $.get("/api/providers/" + id, function (data) {
        if (data) {
            //console.log(data);
            var displayName = data[0].first_name + " " + data[0].last_name;
            $("#providerName").text(displayName);
            $("#brand-text").text(data[0].brand_name);
        }
    })
};

function getAppointmentsTable(id) {
    //id = 1;
    $.get("/api/appointments/table/" + id, function (apptsTbl) {
        //console.log(apptsTbl)
        return new Promise(resolve => {
            resolve(apptsTbl);
        });

        //return (apptsTbl)

    });
}

function updateAppointment(id, appointment) {
    $.post("/api/appointments/" + id, appointment, function () {
    }).then(function () {
        getAppointments(localStorage.getItem("provider_id"));
        $("#calendar").fullCalendar("refetchEvents");
        renderTable();
        // console.log("appointment updated")
    })
};
function deleteAppointment(id) {

    $.ajax({
        method: "DELETE",
        url: "/api/appointments/delete/" + id,
        success: function (doc) {
            //console.log("Deleted");
            //console.log(doc);
            getAppointments(localStorage.getItem("provider_id"));
            $("#calendar").fullCalendar("refetchEvents");
            renderTable();
        }
    });
};

$("#modal-btn").on("click", function (event) {
    event.preventDefault();
    var eventType = $("#modal-btn").data("event");
    switch (eventType) {
        case "update":
            // console.log($("#end").data("time"))
            var id = $("#modal-btn").data("id");
            // console.log(id)
            var start = moment(moment($("#start").val().trim(), "MMM Do YYYY HH:mm a").format("YYYY/MM/DD HH:mm:ss")).utc().format();
            var end = moment(moment($("#end").val().trim(), "MMM Do YYYY HH:mm a").format("YYYY/MM/DD HH:mm:ss")).utc().format();
            var appointment = {};
            appointment.start = start;
            appointment.end = end;
            appointment.title = $("#client_name").val().trim();
            appointment.note = $("#note").val().trim();
            // console.log(appointment);
            //appointment.provider_id = localStorage.getItem("provider_id");
            ////console.log(appointment);
            // console.log("updating the appointment")
            updateAppointment(id, appointment);
            break;
        case "create":
            //console.log(eventType)
            var start = $("#start").val().trim();
            var end = $("#end").val().trim();
            var appointment = {};
            var start = moment($("#start").val().trim(), "MMM Do YYYY HH:mm a").format();
            var end = moment($("#end").val().trim(), "MMM Do YYYY HH:mm a").format();
            appointment.start = moment(start).format();
            appointment.end = moment(end).format();
            appointment.title = $("#client_name").val().trim();
            appointment.note = $("#note").val().trim();
            appointment.provider_id = localStorage.getItem("provider_id");
            //console.log(appointment);
            createAppointment(appointment);

            break;
        default:
            break;
    }


})

