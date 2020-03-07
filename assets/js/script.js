$(document).ready(function() {
  init();

  var schedule = [
    {
      hour: "9am",
      event: [

      ]
    },
    {
      hour: "10am",
      event: [
        
      ]
    },
    {
      hour: "11am",
      event: [
        
      ]
    },
    {
      hour: "12pm",
      event: [
        
      ]
    },
    {
      hour: "1pm",
      event: [
        
      ]
    },
    {
      hour: "2pm",
      event: [
        
      ]
    },
    {
      hour: "3pm",
      event: [
        
      ]
    },
    {
      hour: "4pm",
      event: [
        
      ]
    },
    {
      hour: "5pm",
      event: [
        
      ]
    }
  ];

  function init() {
    renderDate();
    // getSchedule();
  }

  function renderDate() {
    var currentDate = moment().format("dddd[ | ]MMMM D, h:mm:ss");
    var currentDay = moment().format("dddd");
    $("#currentDate").text(currentDate);
    $("#currentDay").text(currentDay);
    setInterval(renderDate, 4);
  }

  // Store schedule
  localStorage.setItem('schedule', JSON.stringify(schedule));

  // Get schedule
  var storedSchedule = JSON.parse(localStorage.getItem("schedule"));
  if (storedSchedule !== null) {
    schedule = storedSchedule;
  }

  // Render schedule
  // Cannot for the life of me get this into a working function, it only works outside a function or when I bring schedule directly in
  schedule.forEach((item) => {
    console.log(item)
    var block = 
      `<tr data-index="${item}" class="d-flex mb-1 shadow-sm rounded-right">
          <th scope="row" class="col-2 --border-left">${item.hour}</th>
          <td class="col-10 p-0">
            <div class="input-group">
            <textarea class="form-control event-text">${item.event}</textarea>
            <div class="input-group-append">
              <button class="update-btn btn d-flex justify-center align-center">
                <i class="px-2 fas fa-2x fa-sync-alt"></i>
              </button>
            </div>
            </div>
          </td>
        </tr>`;
    $("tbody").append(block);
  });

  //   function storeSchedule() {}

  //   function clearSchedule() {}

  $('.update-btn').on('click', function(e) {
    e.preventDefault()
    console.log($(this).find('event-text'))
  })
});
