


$(document).ready(function() {

setInterval(renderDate, 4);

function renderDate() {
    var currentDate = moment().format('dddd[ | ]MMMM D, h:mm:ss');
    var currentDay = moment().format('dddd');
    $('#currentDate').text(currentDate);
    $('#currentDay').text(currentDay);

}

});