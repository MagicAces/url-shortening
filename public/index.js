

$(document).mouseover((event)=> {
  if($("small").text() !== "")
    $("input").addClass("wrong");

});

$("input").click((event) => {
  $("input").removeClass("wrong");
});

var buttons = $(".copy-button");

buttons.click((event) => {
  for(var i = 0; i < buttons.length; i++) {
    if(event.target === buttons[i]) {
      copycontent(i);
      buttons[i].textContent = "Copied!";
      buttons[i].style.backgroundColor = "hsl(257, 27%, 26%)";
    } else {
      buttons[i].textContent = "Copy";
      buttons[i].style.backgroundColor = "hsl(180, 66%, 49%)";
    }
  }
});

$(".mobile-icon").click((event) => {
  if ($(".mobile-icon").attr("src") === "images/icon-close.svg") {
    $(".nav-mobile").css("display", "none");
    $(".mobile-icon").attr("src", "images/icon-hamburger.svg");
  } else {
    $(".nav-mobile").css("display", "grid");
    $(".mobile-icon").attr("src", "images/icon-close.svg");
  }
});


async function copycontent(index) {
  try {

    await navigator.clipboard.writeText($(".copy-link")[index].textContent);
    console.log("Content copied");
  } catch(err) {
    console.error(err);
  }
}
