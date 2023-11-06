$(function () {
  // stores the current date in a month day, year format
  const day = dayjs().format("MMM D, YYYY");
  // gets the current hour
  const currentH = Number(dayjs().format("H"));

  // sets the currentDay text into the date we got above
  $("#currentDay").text(day);

  // gets the click event listener on
  $('button[aria-label="save"]').on("click", function () {

    // finds the text area element using this and the sibling method
    let textArea = $(this).siblings("textarea");

    // gets the users inputed text
    let userText = JSON.stringify(textArea.val());


    // the closest method goes up the DOM tree starting from the textarea element
    // and finds the time-block class which then gets the id of the poarent using the attribute method
    let timeOfDay = textArea.closest(".time-block").attr("id");

    // saves user input and the time-block id in local storage
    localStorage.setItem(timeOfDay, userText);
  });

  for (let i = 9; i < 18; i++) {
    // gets the hour id of the current index
    let hour = "#hour-" + i.toString();

    // stores the parsed text from local storage
    let savedText = JSON.parse(localStorage.getItem(hour.substring(1)));

    // sets an if else statement to change the time-block id to the right time of day
    if (i === currentH) {
      $(hour).addClass("present").removeClass("past").removeClass("future");
    } else if (i < currentH) {
      $(hour).addClass("past").removeClass("present").removeClass("future");
    } else if (i > currentH) {
      $(hour).addClass("future").removeClass("present").removeClass("past");
    }

    $(hour).children("textarea").text(savedText);
  }

});
