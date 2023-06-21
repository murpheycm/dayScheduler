$(document).ready(function() {

  //Function to create date
  var currentTime = dayjs().format("dddd, MMMM DD, YYYY");
  $("#currentDay").text(currentTime);

  // Time Block information array
  const timeBlock = [
    {
      timeLabel: "9:00 AM",
      timeValue: "9",
      blockInput: "",
    },
    {
      timeLabel: "10:00 AM",
      timeValue: "10",
      blockInput: "",
    },
    {
      timeLabel: "11:00 AM",
      timeValue: "11",
      blockInput: "",
    },
    {
      timeLabel: "12:00 PM",
      timeValue: "12",
      blockInput: "",
    },
    {
      timeLabel: "1:00 PM",
      timeValue: "13",
      blockInput: "",
    },
    {
      timeLabel: "2:00 PM",
      timeValue: "14",
      blockInput: "",
    },
    {
      timeLabel: "3:00 PM",
      timeValue: "15",
      blockInput: "",
    },
    {
      timeLabel: "4:00 PM",
      timeValue: "16",
      blockInput: "",
    },
    {
      timeLabel: "5:00 PM",
      timeValue: "17",
      blockInput: "",
    },
  ];

  // Building Rows and Columns with hour blocks defined
  $(timeBlock).each(function (i) {
    const row = $("<div>");
    if (i < $(timeBlock).length) {
      row
        .addClass("row")
      $(".container").append(row);
    }
  });

  $("div.row").each(function (i) {
    const timeValue = timeBlock[i].timeValue;
    const labelCol = $("<div>");
    const inputCol = $("<div>");
    labelCol
      .addClass("col-2 col-md-1 hour text-center py-3")
      .text(timeBlock[i].timeLabel)
    inputCol
      .addClass("col-11 time-block")
      .attr("value", timeValue)
    $(this).append(labelCol);
    $(this).append(inputCol);
  });

  // Text area and save buttons, each appended to the time block
  $(".time-block").each(function (i) {
    const saveBtnCol = $(
      `<button type="submit" class="saveBtn col-2"><i class="fas fa-save text-xl"></i></button>`
    );
    const timeValue = timeBlock[i].timeValue;
    const inputDescription = $("<textarea>").text(timeBlock[i].blockInput);
    inputDescription
      .addClass("col-8 col-md-10 description")
      .attr("id", timeValue)
    $(this).append(inputDescription);
    $(this).append(saveBtnCol);
  });

  // Past, Present, or Future time blocks in relation to the current time
  $(".time-block").each(function (i) {
    const currentHour = parseInt(dayjs().format('H'));
    const timeId = $(this).attr("value");
    if (currentHour < timeId) {
      $(this).addClass("future");;
    } else if (currentHour == timeId) {
      $(this).addClass("present");
    } else if (currentHour > timeId) {
      $(this).addClass("past");
    }
  })

  // Save Button event listener 'click' and saved to local storage following page refresh
  $(".saveBtn").on("click", function () {
    const savedInput = $(this).siblings("textarea").val()
    const timeInput = $(this).parent().attr("value")
    localStorage.setItem(timeInput, savedInput);
  });

  // Render data from local storage in the text area of the time block
  for (let i = 9; i < 18; i++) {
    $(`#${i}`).val(localStorage.getItem(i));
  }
});
