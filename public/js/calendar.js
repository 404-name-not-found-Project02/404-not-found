var calendarObject = {};
var gAppointments = {};
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

            start: '06:00', // a start time (6am in this example)
            end: '19:00', // an end time (7pm in this example)
        },

        eventClick: function (calEvent, jsEvent, view) {
            // console.log($.fullCalendar.moment(calEvent.start._d).utc());
            console.log("startClick");
            $("#newAppt").modal("open");
            calendarObject = calEvent;
            var id = calEvent.id;
            var title = calEvent.title;
            var date = moment(calEvent.start._i).format("MM/DD/YYYY");
            var time = moment(calEvent.start._i).format("HH:mm a");
            var hour = 0;
            var minute = 0;
            var note = "";
            for (let i = 0; i < gAppointments.length; i++) {
                if (gAppointments[i].id == id) {
                    note = gAppointments[i].note;
                };
            }
            var eventType = "update";
            var duration = moment(calEvent.end._i).diff(moment(calEvent.start._i)) / 1000 / 60;
            if (duration / 60 % 1 == 0) {
                hour = parseInt(duration / 60);
                minute = 0;
                // console.log(parseInt(duration / 60))
            } else {
                minute = duration % 60;
                hour = (duration - minute) / 60;
                console.log(hour + " " + minute)
            };
            updateModalAppt(title, date, time, hour, minute, note, eventType, id);
            console.log("endClick");

        },
        select: function (start, end, jsEvent, view) {
            console.log("startClick");
            $("#newAppt").modal("open");
            // calendarObject = calEvent;
            var id = "";
            var title = "";
            var date = moment(start).format("MM/DD/YYYY");
            var time = moment(start).format("HH:mm a");
            var hour = 1;
            var minute = 0;
            var note = "";
            var eventType = "create";
            var duration = moment(end).diff(moment(start)) / 1000 / 60;
            if (duration / 60 % 1 == 0) {
                hour = parseInt(duration / 60);
                minute = 0;
                // console.log(parseInt(duration / 60))
            } else {
                minute = duration % 60;
                hour = (duration - minute) / 60;
                console.log(hour + " " + minute)
            };
            updateModalAppt(title, date, time, hour, minute, note, eventType, id);
            console.log("endClick");
        },
        //dayClick: function (date, allDay, jsEvent, view) {
        //console.log("this is the day click function")
        //},
        editable: true,
        eventLimit: true,
        eventDrop: function (event, delta, revertFunc) {
            calendarObject = event;
            var id = event.id;
            var appointment = {};
            appointment.title = event.title;
            if (event.allDay) {
                appointment.start = moment(event.start._i).utc().format("YYYY/MM/DD");
                appointment.end = moment(event.end._i).utc().format("YYYY/MM/DD");
            } else {
                appointment.start = moment(event.start._i).utc().format("YYYY/MM/DD HH:mm:ss");
                if (event.end != null) {
                    appointment.end = moment(event.end._i).utc().format("YYYY/MM/DD HH:mm:ss");
                } else {
                    appointment.end = moment(event.end._i).add(30, "m").utc().format("YYYY/MM/DD HH:mm:ss");
                }
            };
            if (!confirm("Are you sure about this change?")) {
                revertFunc();
            } else {
                updateAppointment(id, appointment)
            }

        },
        eventResize: function (event, jsEvent, ui, view) {
            var id = event.id;
            var appointment = {};
            calendarObject = event;
            if (event.allDay) {
                appointment.start = moment(event.start._d).format("YYYY/MM/DD");
                appointment.end = moment(event.start._d).format("YYYY/MM/DD");
            } else {
                appointment.start = moment(event.start._i).utc().format("YYYY/MM/DD HH:mm:ss");
                appointment.end = moment(event.end._i).utc().format("YYYY/MM/DD HH:mm:ss");
            }
            appointment.title = event.title;
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
                success: function (doc) {
                    var events = [];
                    $(doc).each(function () {
                        //console.log($(this).attr('end'));
                        if ($(this).attr('start') === $(this).attr('end')) {
                            events.push({
                                id: $(this).attr('id'),
                                title: $(this).attr('title'),
                                start: $(this).attr('start'),
                                note: $(this).attr('note'),
                                allDay: true,
                                timezone: timezone,
                            });
                        } else {
                            events.push({
                                id: $(this).attr('id'),
                                title: $(this).attr('title'),
                                start: $(this).attr('start'),
                                end: $(this).attr('end'),
                                note: $(this).attr('note'),
                            });
                        }
                        // console.log(events)
                    });
                    callback(events);
                }
            });
        }

    });
    getAppointments(localStorage.getItem("provider_id"));
});

function createAppointment(appointment, callback) {
    $.post("/api/appointments", appointment, function () {
    }).then(function () {
        $("#calendar").fullCalendar("refetchEvents");
        getAppointments(localStorage.getItem("provider_id"));
        renderTable();
    })

}

function getAppointments(id) {
    //id = 1;
    $.get("/api/appointments/" + id, function (data) {
        if (data) {
            gAppointments = data;
            $('#calendar').fullCalendar({
                events: [data]
            });

            $("#calendar").fullCalendar("refetchEvents");
        }
    });
};

function getProvider(id) {
    //id = 1;
    $.get("/api/providers/" + id, function (data) {
        if (data) {
            console.log(data);
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
            var id = $("#modal-btn").data("id");
            var timeInMins = parseInt($("#duration-hour").val().trim() * 60) + parseInt($("#duration-min").val().trim());
            var start = moment($("#start").val().trim() + " " + $("#start-time").val().trim()).utc().format("YYYY/MM/DD HH:mm:ss")
            var end = moment($("#start").val().trim() + " " + $("#start-time").val().trim()).add(parseInt(timeInMins), "m").utc().format("YYYY/MM/DD HH:mm:ss")
            var appointment = {};
            appointment.start = start;
            appointment.end = end;
            appointment.title = $("#client_name").val().trim();
            appointment.note = $("#note").val().trim();
            updateAppointment(id, appointment);
            M.toast({ html: 'Appointment Updated!', classes: 'rounded' });
            break;
        case "create":
            var appointment = {};
            var timeInMins = parseInt($("#duration-hour").val().trim() * 60) + parseInt($("#duration-min").val().trim());
            var start = moment($("#start").val().trim() + " " + $("#start-time").val().trim()).utc().format("YYYY/MM/DD HH:mm:ss")
            var end = moment($("#start").val().trim() + " " + $("#start-time").val().trim()).add(parseInt(timeInMins), "m").utc().format("YYYY/MM/DD HH:mm:ss")
            appointment.start = start
            appointment.end = end
            appointment.title = $("#client_name").val().trim();
            appointment.note = $("#note").val().trim();
            appointment.provider_id = localStorage.getItem("provider_id");
            createAppointment(appointment);
            M.toast({ html: 'Appointment Created!', classes: 'rounded' });
            break;
        default:
            break;
    }


})

function updateModalAppt(title, date, time, hour, minute, note, eventType, id) {
    console.log("Update modal");
    $("input").val("");
    $("#client_name").val(title);
    $("#start").val(date);
    $("#start-time").val(time)
    $("#duration-hour").val(hour);
    $("#duration-min").val(minute);
    $("#note").val(note);
    $("#modal-btn").data("event", eventType);
    $("#modal-btn").text(eventType);
    $("#delete-btn").css("visibility", "visible");
    $("#modal-btn").data("id", id);
    $("#delete-btn").data("id", id);
    $("#modal-btn").append("<i class='material-icons right'>send</i>");
    $("label").addClass("active")
    $("#client_name").focus();
    console.log("end update modal");

}