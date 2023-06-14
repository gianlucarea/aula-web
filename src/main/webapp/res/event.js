$(document).ready(function () {

    function populateCourseNamesAddEvent() {
        $.ajax({
            url: 'rest/course/all',
            type: 'GET',
            success: function (response) {
                var courseNames = Object.keys(response); //array di nomi delle aule

                // choice box con nomi delle aule
                var courseSelect = $('#courseIdEvent');
                courseNames.forEach(function (courseName) {
                    courseSelect.append('<option value="' + response[courseName] + '">' + courseName + '</option>');
                });
            },
            error: function () {
                console.log('Errore durante il recupero dei nomi delle aule');
            }
        });
    }

    function populateClassroomNamesAddEvent() {
        $.ajax({
            url: 'rest/classroom/all',
            type: 'GET',
            success: function (response) {
                var classroomNames = Object.keys(response); //array di nomi delle aule

                // choice box con nomi delle aule
                var classroomSelect = $('#classroomIdEvent');
                classroomNames.forEach(function (className) {
                    classroomSelect.append('<option value="' + response[className] + '">' + className + '</option>');
                });
            },
            error: function () {
                console.log('Errore durante il recupero dei nomi delle aule');
            }
        });
    }

    $('.recurrentEventDiv').hide();

    populateClassroomNamesAddEvent();
    populateCourseNamesAddEvent();
    });

 $('#addEventForm').submit(function (event) {
    event.preventDefault();

    var formData = {
        name: $('#eventName').val(),
        date: $('#eventDate').val(),
        start_time: $('#startTime').val(),
        end_time: $('#endTime').val(),
        description: $('#eventDescription').val(),
        type: $('#eventType').val(),
        email: $('#eventEmail').val(),
        classroom_id: $('#classroomIdEvent').val(),
        course_id: $('#courseIdEvent').val(),
        until_date: $('#untilDate').val(),
        typeOfRecurrency: $('#recurrencyType').val()
    };
    
    function populateEventTable() {
        $.ajax({
          url: 'rest/event/now',
          type: 'GET',
          success: function(response) {

            $('#e-table-body').empty();

            Object.keys(response).forEach(function(key) {

              var event = response[key];
              var row = '<tr>' +
                '<td>' + event["name"] + '</td>' +
                '<td>' + event["date"] + '</td>' +
                '<td>' + event["start_time"] + '</td>' +
                '<td>' + event["end_time"] + '</td>' +
                '<td>' + event["description"] + '</td>' +
                '<td>' + event["type"] + '</td>' +
                //'<td>' + event["email"] + '</td>' +
                '</tr>';
              $('#e-table-body').append(row);
            });
          },
          error: function() {
            alert('Errore durante il recupero degli eventi.');
          }
        });
      }
    
      populateEventTable();
});

$('#eventType').change(function (event) {
    console.log("z");
    var value = $('#eventType').val();
    if (value === "LEZIONE" || value === "PARZIALE" || value === "ESAME") {
        $('#courseIdEvent').val("");
        $('#courseIdEvent').prop("disabled", false);
    } else {        
        $('#courseIdEvent').val("");
        
        $('#courseIdEvent').prop("disabled", true);

    }
});

$('#recurrentCheckbox').change(function (event) {
    var value = $('#recurrentCheckbox').prop('checked');
    $('#untilDate').val("");
    $('#recurrencyType').val("");

    if(value){
        $('.recurrentEventDiv').show();
    } else {
       $('.recurrentEventDiv').hide();
    }
    console.log(value);
});