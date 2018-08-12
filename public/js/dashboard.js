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

    seedAppointments();

    for (i = 0; i < appointments.length; i++) {

        var id = i;
        var client_name = appointments[i].client_name
        var start = appointments[i].start
        var end = appointments[i].end
        var note = appointments[i].note

        // console log variables
        // console.log(id + "|" + client_name + "|" + start + "|" + end + "|" + note);

        var tableData = "<tr id='row" + id + "'> \
                            <td id='client_name" + id + "'>" + client_name + "</td> \
                            <td id='start" + id + "'>" + start + "</td> \
                            <td id='end" + id + "'>" + end + "</td> \
                            <td id='note" + id + "'>" + note + "</td> \
                            <td> \
                                <a href='#newAppt' class='waves-effect waves-light btn edit-btn modal-trigger' id='" + id + "'>Edit</a> \
                            </td> \
                        </tr>";

        // console log tableData for each appointment
        // console.log(tableData);

        $(".tableBody").append(tableData);

    };

    // edit appointment function
    $(".edit-btn").on("click", function (event) {
        event.preventDefault();

        console.log("click event worked")

        id = $(this).attr("id");

        var string = "<div id='appt'> \
                            <div id='apptType'> \
                                <div class='row'> \
                                    <form class='col s12'> \
                                        <div class='row'> \
                                            <div class='input-field col s12'> \
                                                <input id='client_name' type='text' class='validate'> \
                                                <label for='client_name'>Client Name:</label> \
                                            </div> \
                                        </div> \
                                        <div class='row'> \
                                            <div class='input-field col s6'> \
                                                <input id='start' type='text' class='validate'> \
                                                <label for='start'>Start:</label> \
                                            </div> \
                                            <div class='input-field col s6'> \
                                                <input id='end' type='text' class='validate'> \
                                                <label for='end'>End:</label> \
                                            </div> \
                                        </div> \
                                        <div class='row'> \
                                            <div class='input-field col s12'> \
                                                <input id='note' type='text' class='validate'> \
                                                <label for='note'>Note (optional):</label> \
                                            </div> \
                                            <div class='modal-footer center-align'> \
                                                <a href='#!' class='waves-effect waves-light btn modal-action modal-close' id='apptSubmit'>Submit \
                                                    <i class='material-icons right'>send</i> \
                                                </a> \
                                            </div> \
                                        </div> \
                                    </form> \
                                </div> \
                            </div> \
                        </div>";

        $("#newAppt").html(string);
        $(".modal").modal("open");

    });

};


// document ready function
$(document).ready(function () {
    renderTable();
});
