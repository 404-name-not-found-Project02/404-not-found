$("#edit-btn").on("click", function () {

    console.log("click event worked");

    var date = $("#date").val().trim()
    var time = $("#time").val().trim()
    var client_name = $("#client_name").val().trim()
    var note = $("#note").val().trim()

    var string = "<div class='modal' id='newAppt'><div id='appt'> \
     <div id='apptType'><div class='row'> \
            <form class='col s12'> \
                <div class='row'> \
                    <div class='input-field col s12'> \
                        <input id='date' type='text' class='validate'> \
                        <label for='date'>Date</label> \
                    </div> \
                </div> \
                <div class='row'> \
                    <div class='input-field col s6'> \
                        <input id='time' type='text' class='validate'> \
                        <label for='time'>Time</label> \
                    </div> \
                    <div class='input-field col s6'> \
                        <input id='client_name' type='text' class='validate'> \
                        <label for='client_name'>Client Name</label> \
                    </div> \
                </div> \
                <div class='row'> \
                    <div class='input-field col s12'> \
                        <input id='note' type='text' class='validate'> \
                        <label for='note'>Note (optional)</label> \
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
</div> \
</div>";


    $("#newAppt").innerAdjacentHTML('beforeend', string);
    


});