$(document).ready(function() {
  var schedule = [
    {
      hour: "9am",
      event: []
    },
    {
      hour: "10am",
      event: []
    },
    {
      hour: "11am",
      event: []
    },
    {
      hour: "12pm",
      event: []
    },
    {
      hour: "1pm",
      event: []
    },
    {
      hour: "2pm",
      event: []
    },
    {
      hour: "3pm",
      event: []
    },
    {
      hour: "4pm",
      event: []
    },
    {
      hour: "5pm",
      event: []
    }
  ];

  renderDate();

  function renderDate() {
    var currentDate = moment().format("dddd[ | ]MMMM D, h:mm:ss");
    var currentDay = moment().format("dddd");
    $("#currentDate").text(currentDate);
    $("#currentDay").text(currentDay);
    setInterval(renderDate, 4);
  }

  getSchedule();

  function getSchedule() {
    var storedSchedule = JSON.parse(localStorage.getItem("schedule"));
    if (storedSchedule !== null) {
      schedule = storedSchedule;
    }
    renderSchedule();
  }

  function renderSchedule() {
    $("tbody").empty();
    schedule.forEach((item, i) => {
      var block = `<tr data-index="${i}" class="hour-block d-flex mb-1 shadow-sm rounded-right">
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
  }

  function storeSchedule() {
    localStorage.setItem("schedule", JSON.stringify(schedule));
  }

  $(document).on("click", ".update-btn", function(e) {
    e.preventDefault();
    // Find the new event text
    var content = $(this)
      .closest(".input-group")
      .find(".event-text")
      .val();
    // Find the spot in the schedule where it needs to go
    var index = $(this)
      .closest(".hour-block")
      .attr("data-index");
    var target = schedule[index].event;
    // Push the content to the schedule or replace old event at selected index
    if(target.length > 0) {
      target.splice(0, target.length);
    }
    target.push(content);
    storeSchedule();
    renderSchedule();
  });
});
