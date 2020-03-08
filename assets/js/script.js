$(document).ready(function() {
  init(); 
  
  var schedule = [
    {
      name: "9am",
      event: [],
      hour: "9"
    },
    {
      name: "10am",
      event: [],
      hour: "10"
    },
    {
      name: "11am",
      event: [],
      hour: "11"
    },
    {
      name: "12pm",
      event: [],
      hour: "12"
    },
    {
      name: "1pm",
      event: [],
      hour: "13"
    },
    {
      name: "2pm",
      event: [],
      hour: "14"
    },
    {
      name: "3pm",
      event: [],
      hour: "15"
    },
    {
      name: "4pm",
      event: [],
      hour: "16"
    },
    {
      name: "5pm",
      event: [],
      hour: "17"
    }
  ];

  function renderDate() {
    var currentDate = moment().format("dddd[ | ]MMMM D, h:mm:ss");
    var currentDay = moment().format("dddd");
    $("#currentDate").text(currentDate);
    $("#currentDay").text(currentDay);
    setInterval(renderDate, 4);
  }

  function getSchedule() {
    var storedSchedule = JSON.parse(localStorage.getItem("schedule"));
    if (storedSchedule !== null) {
      schedule = storedSchedule;
    } else {
      schedule = [
        {
          name: "9am",
          event: [],
          hour: "9"
        },
        {
          name: "10am",
          event: [],
          hour: "10"
        },
        {
          name: "11am",
          event: [],
          hour: "11"
        },
        {
          name: "12pm",
          event: [],
          hour: "12"
        },
        {
          name: "1pm",
          event: [],
          hour: "13"
        },
        {
          name: "2pm",
          event: [],
          hour: "14"
        },
        {
          name: "3pm",
          event: [],
          hour: "15"
        },
        {
          name: "4pm",
          event: [],
          hour: "16"
        },
        {
          name: "5pm",
          event: [],
          hour: "17"
        }
      ];
    }
    renderSchedule();
  }

  function renderSchedule() {
    $("tbody").empty();
    schedule.forEach((item, i) => {
      var block = `<tr data-index="${i}" data-hour="${item.hour}" class="hour-block d-flex mb-1 shadow-sm rounded-right">
            <th scope="row" class="col-2 --border-left">${item.name}</th>
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
    renderColorCode();
  }

  function storeSchedule() {
    localStorage.setItem("schedule", JSON.stringify(schedule));
  }

  function renderColorCode() {
    var currentHour = moment().hour();
    $.each($(".hour-block"), function(index, block) {
      var hour = $(block).attr("data-hour");
      var current = $(currentHour);
      if (hour == current[0]) {
        $(this)
          .find("textarea")
          .addClass("present");
      }
      if (hour < current[0]) {
        $(this)
          .find("textarea")
          .attr("disabled", "disabled");
      }
      if (hour > current[0]) {
        $(this)
          .find("textarea")
          .addClass("future");
      }
    });
  }

  function init() {
    renderDate();
    getSchedule();
    console.log(schedule)
    console.log(localStorage.schedule)
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
    if (target.length > 0) {
      target.splice(0, target.length);
    }
    target.push(content);
    console.log(schedule)
    console.log(localStorage.schedule)
    storeSchedule();
    renderSchedule();
  });
});
