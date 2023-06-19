$(document).ready(function() {

  //Function to create date
  var currentTime = dayjs().format("dddd, MMMM DD YYYY");
  $("#currentDay").text(currentTime);

  const timeBlock = [
    {
      label: "9:00 AM",
      tValue: "9",
      userInput: "",
    },
    {
      label: "10:00 AM",
      tValue: "10",
      userInput: "",
    },
    {
      label: "11:00 AM",
      tValue: "11",
      userInput: "",
    },
    {
      label: "12:00 PM",
      tValue: "12",
      userInput: "",
    },
    {
      label: "1:00 PM",
      tValue: "13",
      userInput: "",
    },
    {
      label: "2:00 PM",
      tValue: "14",
      userInput: "",
    },
    {
      label: "3:00 PM",
      tValue: "15",
      userInput: "",
    },
    {
      label: "4:00 PM",
      tValue: "16",
      userInput: "",
    },
    {
      label: "5:00 PM",
      tValue: "17",
      userInput: "",
    },
  ];

  // Rows
  $(timeBlock).each(function (i) {
    const row = $("<div>");
    if (i < $(timeBlock).length) {
      row
        .addClass("row")
      $(".container").append(row);
    }
    i++
  });

  // Columns with hours
  $("div.row").each(function (i) {
    const timeValue = timeBlock[i].tValue;
    const labelCol = $("<div>");
    const inputCol = $("<div>");

    labelCol
      .addClass("col-2 hour")
      .text(timeBlock[i].label)
    inputCol
      .addClass("col-10 time-block")
      .attr("value", timeValue)
    $(this).append(labelCol);
    $(this).append(inputCol);
    i++
  });


  // Past, Present, or Future time blocks in relation to the current time
  $(".time-block").each(function (i) {
    const currentHour = parseInt(dayjs().format('H'));
    const timeId = $(this).attr("value");
    if (currentHour < timeId) {
      $(this).addClass("future");
    } else if (currentHour == timeId) {
      $(this).addClass("present");
    } else if (currentHour > timeId) {
      $(this).addClass("past");
    }
    i++
  })

  

  
});
