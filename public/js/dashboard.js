//Table Code

// appointment constructor
function Appointment(client_name, start, end, note) {
    this.client_name = client_name;
    this.start = start;
    this.end = end;
    this.note = note;
};

// seed appointments
var client1 = new Appointment("James Stewart", "2018-08-15 15:00:00", "2018-08-15 16:00:00", "Likes a bowl cut");
var client2 = new Appointment("Brenna Smith", "2018-08-15 16:00:00", "2018-08-15 17:00:00", "BANGZZZZZ");
var client3 = new Appointment("Cody McCoderson", "2018-08-15 17:00:00", "2018-08-15 18:00:00", "Shave it all off");
var client4 = new Appointment("Cynthia Melvin", "2018-08-15 18:00:00", "2018-08-15 19:00:00", "She's super old");

// appointments object
var appointments = [];

var seedAppointments = function () {
    appointments.push(client1);
    appointments.push(client2);
    appointments.push(client3);
    appointments.push(client4);
    // console appointments array
    // console.log(appointments);
};


// Build table function
function renderTable() {
    id = localStorage.getItem("provider_id")
    // seedAppointments();
    $.get("/api/appointments/table/" + id, function (data) {
        console.log(data)

        data.forEach(function (appointment) {
            console.log(appointment);
            if (appointment.note) {
                var note = appointment.note
            } else {
                var note = "None"
            }
            var tr = $("<tr>");
            tr.attr("id", appointment.id);
            tr.addClass("tableRow")
            var td = $("<td id='client_name" + appointment.id + "' class='tableData'>" + appointment.title + "</td>")
            $(".tableBody").append(tr);
            $("#" + appointment.id).append(td);
            $("#" + appointment.id).append("<td id='start" + appointment.id + "'>" + moment(appointment.start).format("MM/DD/YYYY HH:mm") + "</td> ");
            $("#" + appointment.id).append("<td id='end" + appointment.id + "'>" + moment(appointment.end).format("MM/DD/YYYY HH:mm") + "</td>");
            $("#" + appointment.id).append("<td id='note" + appointment.id + "'>" + note + "</td>");
            $("#" + appointment.id).append("<td class='table-btn'><a href='#newAppt' class='waves-effect waves-light btn edit-btn modal-trigger' id='" + appointment.id + "'>Edit</a></td> ");

        });
    });

}

// edit appointment function
$(".edit-btn").on("click", function (event) {
    event.preventDefault();

    console.log("click event worked")

    id = $(this).attr("id");

    $(".modal").modal("open");

});



// document ready function
$(document).ready(function () {
    renderTable();
});
