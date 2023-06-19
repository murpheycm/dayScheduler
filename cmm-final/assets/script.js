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

  // Columns with hour blocks defined
  $("div.row").each(function (i) {
    const timeValue = timeBlock[i].tValue;
    const labelCol = $("<div>");
    const inputCol = $("<div>");
    labelCol
      .addClass("col-2 col-md-1 hour text-center py-3")
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
  })

  // Text area and save buttons, each appended to the time block
  $(".time-block").each(function (i) {
    const saveCol = $("<button type='submit' class='col-span-2 h-16 bg-indigo-500 text-white font-bold hover:bg-indigo-400 transition duration-500 ease-in-out'><i class='fas fa-save text-xl'></i></button>");
    const timeValue = timeBlock[i].tValue;
    const inputDesc = $("<textarea>").text(timeBlock[i].userInput);
    inputDesc
      .addClass("col-8 col-md-10 float-left description")
      .attr("id", timeValue)
    saveCol
      .addClass("btn saveBtn col-2 col-md-1")
      .text("Save")
    $(this).append(inputDesc);
    $(this).append(saveCol);
    $(".description").show();
  });

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
