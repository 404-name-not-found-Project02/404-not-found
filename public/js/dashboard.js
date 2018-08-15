//Table Code


// Build table function
function renderTable() {

    id = localStorage.getItem("provider_id");
    // seedAppointments();
    $.get("/api/appointments/table/" + id, function (data) {
        // console.log(data);
        // console.log(data[0].note)
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
                $("#" + appointment.id).append("<td id='start" + appointment.id + "'>" + moment(appointment.start).local().format("MM/DD/YYYY HH:mm") + "</td> ");
                $("#" + appointment.id).append("<td id='end" + appointment.id + "'>" + moment(appointment.end).local().format("MM/DD/YYYY HH:mm") + "</td>");
                $("#" + appointment.id).append("<td id='note" + appointment.id + "'>" + note + "</td>");
                $("#" + appointment.id).append("<td class='table-btn'><a href='#!' class='waves-effect waves-light btn' id='edit-btn' data-id='" + appointment.id + "'>Edit</a></td> ");

            });

            $(".btn-floating").removeClass("pulse")
        } else {
            $(".tableBody").empty();
            $(".btn-floating").addClass("pulse")
            $(".tableBody").append("<tr><td>You currently do not have any appointments scheduled. Click the + button to add an appointment.</td></tr>")
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
    $("#start").data("time", moment(start).utc().format("YYYY/MM/DD HH:mm:ss"));
    $("#end").data("time", moment(end).utc().format("YYYY/MM/DD HH:mm:ss"));
    $("#client_name").val(title);
    $("#note").val(note);
    var displayStart = moment(start).format("MMMM Do YYYY, h:mm a");
    var displayEnd = moment(end).format("MMMM Do YYYY, h:mm a");
    $("#start").val(displayStart);
    $("#end").val(displayEnd);
    $("#delete-btn").data("id", id);
    $("#delete-btn").css("visibility", "visible");
    $("#modal-btn").data("event", "update");
    $("#modal-btn").data("id", id);
    $("#modal-btn").text("Update");
    $("#modal-btn").append("<i class='material-icons right'>send</i>");
    $("#client_name").focus();

};

$(document).on("click", "#edit-btn", editAppt);

var noteUpdate = document.getElementById("note");
noteUpdate.addEventListener("keyup", function (event) {
    event.preventDefault();
    if (event.keyCode === 13) {
        document.getElementById("modal-btn").click();
    }
});
// var endUpdate = document.getElementById("end");
// endUpdate.addEventListener("keyup", function (event) {
//     event.preventDefault();
//     if (event.keyCode === 13) {
//         document.getElementById("modal-btn").click();
//     }
// });

$("#delete-btn").on("click", function (event) {
    event.preventDefault();
    var id = $(this).data("id");
    if (confirm("Delete This Appointment? This Cannot Be Un-Done!!")) {
        deleteAppointment(id);
    }

})

$("#addApptBtn").on("click", function () {
    var date = moment().format("MM/DD/YYYY");
    var time = moment().format("hh:00 a");
    var hour = 1
    var minute = 0
    var eventType = "create"
    $("#newAppt").modal("open");
    updateModalAppt("", date, time, hour, minute, "", eventType, "")
    // $("#newAppt").modal("open");
    // $("input").val("");
    // $("label").addClass("active");
    // // var displayStart = moment().format("MMMM Do YYYY, h:mm a");
    // // var displayEnd = moment().format("MMMM Do YYYY, h:mm a");
    // // $("#start").val(displayStart);
    // // $("#end").val(displayEnd);
    // $("#delete-btn").css("visibility", "hidden");
    // $("#modal-btn").data("event", "create");
    // $("#modal-btn").text("Create");
    // $("#modal-btn").append("<i class='material-icons right'>send</i>");
    // $("#client_name").focus();
})

// document ready function
$(document).ready(function () {

    renderTable();

    $("#imageForm").attr("action", "/api/upload/" + localStorage.getItem("provider_id"));

    var options = {
        beforeSubmit: showRequest, //pre-submit callback
        success: showResponse  // post-submit callback
    };

    //bind to the form's submit event
    $("#imageForm").submit(function () {
        $(this).ajaxSubmit(options);
        //always return false to prevent standard browser submit and page navigation
        return false;
    });

    // pre-submit callback
    function showRequest(formData, jqForm, options) {
        var input = $("#upload")[0];
        if (input.files && input.files[0]) {
            var reader = new FileReader();

            reader.onload = function (e) {
                $("#profileImage").attr("src", e.target.result);
            }
            reader.readAsDataURL(input.files[0]);
        }
    };

    // post-submit callback
    function showResponse(responeText, statusText, xhr, $form) {
    }

    $.get("/api/upload/" + localStorage.getItem("provider_id"), function (data) {
        if (data) {
            $("#profileImage").attr("src", "https://storage.googleapis.com/name-not-found.appspot.com/ProfileIMG_" + localStorage.getItem("provider_id"));
        }
    });

    $("#upload-btn").on("click", function (event) {
        event.preventDefault();
        $("#imageForm").submit();
    });
    getProvider(localStorage.getItem("provider_id"));
});







