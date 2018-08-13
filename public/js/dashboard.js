//Table Code


// Build table function
function renderTable() {

    id = localStorage.getItem("provider_id");
    // seedAppointments();
    $.get("/api/appointments/table/" + id, function (data) {
        console.log(data);
        if (data != "") {
            $(".tableBody").empty();
            data.forEach(function (appointment) {
                //console.log(appointment);
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
                $("#" + appointment.id).append("<td class='table-btn'><a href='#!' class='waves-effect waves-light btn' id='edit-btn' data-id='" + appointment.id + "'>Edit</a></td> ");

            });

            $(".btn-floating").removeClass("pulse")
        }
    });

}
//modal-trigger
// edit appointment function
function editAppt(event) {
    event.preventDefault();
    $("#newAppt").modal("open");
    var id = $(this).data("id");
    var start = $("#start" + id).text();
    var end = $("#end" + id).text();
    var title = $("#client_name" + id).text();
    var note = $("#note" + id).text();
    $("input").val("");
    $("label").addClass("active");
    $("#start").data("time", start);
    $("#end").data("time", end);
    $("#client_name").val(title);
    $("#note").val(note);
    var displayStart = moment(start).format("MM-DD-YYYY HH:mm");
    var displayEnd = moment(end).format("MM-DD-YYYY HH:mm");
    $("#start").val(displayStart);
    $("#end").val(displayEnd);
    $("#delete-btn").data("id", id);
    $("#delete-btn").css("visibility", "visible");
    $("#modal-btn").data("event", "update");
    $("#modal-btn").text("Update");
    $("#modal-btn").append("<i class='material-icons right'>send</i>");
    $("#client_name").focus();

};

$(document).on("click", "#edit-btn", editAppt);

$("#delete-btn").on("click", function (event) {
    event.preventDefault();
    var id = $(this).data("id");
    deleteAppointment(id);
})

$("#addApptBtn").on("click", function () {
    $("#newAppt").modal("open");
    $("input").val("");
    $("label").addClass("active");
    var displayStart = moment().format("MMMM Do YYYY, h:mm a");
    var displayEnd = moment().format("MMMM Do YYYY, h:mm a");
    $("#start").val(displayStart);
    $("#end").val(displayEnd);
    $("#delete-btn").css("visibility", "hidden");
    $("#modal-btn").data("event", "create");
    $("#modal-btn").text("Create");
    $("#modal-btn").append("<i class='material-icons right'>send</i>");
    $("#client_name").focus();
})

// document ready function
$(document).ready(function () {
    renderTable();
});

