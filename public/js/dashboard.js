//Table Code


// Build table function
function renderTable() {

    id = localStorage.getItem("provider_id");
    // seedAppointments();
    $.get("/api/appointments/table/" + id, function (data) {
        if (data != "") {
            $(".tableBody").empty();
            data.forEach(function (appointment) {
                //console.log(appointment);
                if (appointment.note) {
                    var note = appointment.note
                } else {
                    var note = "None"
                };
                var tr = $("<tr>");
                tr.attr("id", appointment.id);
                tr.addClass("tableRow")
                var td = $("<td id='client_name" + appointment.id + "' class='tableData'>" + appointment.title + "</td>")
                $(".tableBody").append(tr);
                $("#" + appointment.id).append(td);
                $("#" + appointment.id).append("<td id='start" + appointment.id + "'>" + moment(appointment.start).local().format("MM/DD/YYYY hh:mm a") + "</td> ");
                $("#" + appointment.id).append("<td id='end" + appointment.id + "'>" + moment(appointment.end).local().format("MM/DD/YYYY hh:mm a") + "</td>");
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

    console.log("startClick");
    $("#newAppt").modal("open");
    var id = $(this).data("id");
    var title = $("#client_name" + id).text();
    var date = moment($("#start" + id).text()).format("MM/DD/YYYY");
    var time = moment($("#start" + id).text()).format("hh:mm a");
    var note = $("#note" + id).text();
    var start = $("#start" + id).text();
    var end = $("#end" + id).text()
    var eventType = "update";
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







