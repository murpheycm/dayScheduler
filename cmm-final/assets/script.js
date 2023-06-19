$(document).ready(function() {

  //Function to create date
  var currentTime = dayjs().format("dddd, MMMM DD YYYY");
  $("#currentDay").text(currentTime);


  // colorcode timeblocks to indicate whether they are in the past, present or future
     var currentHour = dayjs().format('H');
     $(".time-block").each(function() {
         if (parseInt(currentHour) === parseInt(this.id)) {
             $(this).addClass("present");
         } else if (parseInt(currentHour) > parseInt(this.id)) {
             $(this).addClass("past");
         } else {
             $(this).addClass("future");
         }
      });
      $(".saveBtn").each(function() {
        if (parseInt(currentHour) === parseInt(this.id.split("-")[1])) {
            $(this).addClass("present");
        } else if (parseInt(currentHour) > parseInt(this.id.split("-")[1])) {
            $(this).addClass("past");
        } else {
            $(this).addClass("future");
        }
    })

    // client-side storage for events
    var storedEvents = [];

    initialise();

    function renderEvents() {
        $("textarea").each(function() {
            this.value = "";
        })
        
        $.each(storedEvents, function() {
            $("textarea" + this.eventTime)[0].value = this.eventText;
        }) 
    }

    function initialise() {
        var userEvent = JSON.parse(localStorage.getItem("storedEvents"));
        if (userEvent !== null) {
            storedEvents = userEvent;
        }

        renderEvents();
    }

    function storeEvents() {
        localStorage.setItem("storedEvents", JSON.stringify(storedEvents));
    }

    $("button").on("click", function(event) {
        event.preventDefault();
        event.stopPropagation();

        var className = $(event.target).attr("class");
        
        var eventObject = {
            eventTime: className,
            eventText: $("textarea." + className).val()
        } 
        console.log(eventObject.eventText);

        if (storedEvents.length > 0) {
            $.each(storedEvents, function() {
                if (this.eventTime === event.target.className) {
                    storedEvents.splice($.inArray(this, storedEvents), 1);
                }    
            });
        }

        storedEvents.push(eventObject);

        $.each(storedEvents, function() {
            if (this.eventText === "") {
                storedEvents.splice($.inArray(this, storedEvents), 1);
            }
        })

        storeEvents();
        renderEvents();
    })




});
