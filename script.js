/*=============== LODING SCREEN ===============*/
window.addEventListener("load", function () {
  const loader = document.querySelector(".loader");
  loader.className += " hidden";
});

/*=============== SILDE MENU ===============*/
$(document).ready(function () {
  // Variables for dragging
  var isDragging = false;
  var startX, scrollLeft;

  // Variables for long press
  var pressTimer;
  var scrollSpeed = 20;

  // Handle mousedown/touchstart event on tabs-box
  $(".tabs-box").on("mousedown touchstart", function (event) {
    // Set isDragging to true and record initial values
    isDragging = true;
    startX =
      event.type === "touchstart"
        ? event.touches[0].pageX - $(".tabs-box").offset().left
        : event.pageX - $(".tabs-box").offset().left;
    scrollLeft = $(".tabs-box").scrollLeft();

    // Set press timer to increase scroll speed if button is long pressed
    pressTimer = setTimeout(function () {
      scrollSpeed = 40; // Increase scroll speed
    }, 500); // Change time as needed
  });

  // Handle mousemove/touchmove event on tabs-box
  $(".tabs-box").on("mousemove touchmove", function (event) {
    // If isDragging is true, calculate the new scroll position and set it
    if (isDragging) {
      var mousePos =
        event.type === "touchmove"
          ? event.touches[0].pageX - $(".tabs-box").offset().left
          : event.pageX - $(".tabs-box").offset().left;
      var scrollPos = scrollLeft - (mousePos - startX);
      $(".tabs-box").scrollLeft(scrollPos);
    }
  });

  // Handle mouseup/touchend event on tabs-box
  $(".tabs-box").on("mouseup touchend", function () {
    isDragging = false;

    // Reset scroll speed and press timer
    scrollSpeed = 20;
    clearTimeout(pressTimer);
  });

  // Handle click event on filter items
  $(".filter-item").click(function () {
    const value = $(this).attr("data-filter");
    if (value == "all") {
      $(".cards").show("1000");
    } else {
      $(".cards")
        .not("." + value)
        .hide("1000");
      $(".cards")
        .filter("." + value)
        .show("cards");
    }
    // Add active class to clicked filter item
    $(this).addClass("active-filter").siblings().removeClass("active-filter");
  });

  // Handle keydown event on wrapper12 to move left or right using keyboard
  $(".wrapper12").on("keydown", function (event) {
    // Check if wrapper12 is being hovered over
    if ($(this).is(":hover")) {
      // Move left if left arrow key is pressed
      if (event.keyCode === 37) {
        $(".tabs-box").animate({ scrollLeft: "-=" + scrollSpeed }, 100);
      }
      // Move right if right arrow key is pressed
      else if (event.keyCode === 39) {
        $(".tabs-box").animate({ scrollLeft: "+=" + scrollSpeed }, 100);
      }
    }
  });
});

/*=============== MENU ===============*/
// Get all the <a> tags within the menu
const menuLinks = document.querySelectorAll(
  ".header .nav .nav__menu .nav__list .nav__item .nav__link"
);

// Get all the div elements
const mapDiv = document.getElementById("map");
const placeDiv = document.getElementById("place");
const aidDiv = document.getElementById("aid");
const infoDiv = document.getElementById("info");

// Add click event listener to each <a> tag
menuLinks.forEach(function (link) {
  link.addEventListener("click", function () {
    // Remove "active" class from all <a> tags
    menuLinks.forEach(function (link) {
      link.classList.remove("active-link");
    });

    // Add "active" class to the clicked <a> tag
    this.classList.add("active-link");

    // Hide all div elements
    mapDiv.style.display = "none";
    placeDiv.style.display = "none";
    aidDiv.style.display = "none";
    infoDiv.style.display = "none";

    // Show the corresponding div based on the clicked link
    if (this.id === "nav-map") {
      mapDiv.style.display = "block";
    } else if (this.id === "nav-place") {
      placeDiv.style.display = "block";
    } else if (this.id === "nav-aid") {
      aidDiv.style.display = "block";
    } else if (this.id === "nav-info") {
      infoDiv.style.display = "block";
    }
  });
});

/*=============== HAMBURGET MENU ===============*/
const toggleBtn = document.querySelector(".toggle_btn");
const toggleBtnIcon = document.querySelector(".toggle_btn i");
const dropDownMenu = document.querySelector(".dropdown_menu");
const menuItems = document.querySelectorAll(".dropdown_menu li");

toggleBtn.onclick = function () {
  dropDownMenu.classList.toggle("open");
  const isOpen = dropDownMenu.classList.contains("open");
  toggleBtnIcon.classList = isOpen ? "bx bx-x" : "bx bx-menu";
};

menuItems.forEach(function (menuItem) {
  menuItem.addEventListener("click", function () {
    dropDownMenu.classList.remove("open");
    toggleBtnIcon.classList = "bx bx-menu";
  });
});

window.addEventListener("scroll", function () {
  if (dropDownMenu.classList.contains("open")) {
    dropDownMenu.classList.remove("open");
    toggleBtnIcon.classList = "bx bx-menu";
  }
});

document.addEventListener("keydown", function (event) {
  if (event.key === "Escape" && dropDownMenu.classList.contains("open")) {
    dropDownMenu.classList.remove("open");
    toggleBtnIcon.classList = "bx bx-menu";
  }
});

$(document).ready(function () {
  $("#searchInput").on("keyup", function () {
    var value = $(this).val().toLowerCase();
    $(".card").filter(function () {
      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
    });
  });
});

/*=============== input ===============*/
function makeEditable(element) {
  const text = element.innerText;
  element.style.display = "none";

  const inputField = document.createElement("input");
  inputField.setAttribute("type", "text");
  inputField.setAttribute("class", "input-field");
  inputField.value = text;
  inputField.addEventListener("blur", function () {
    element.innerText = this.value;
    this.parentNode.removeChild(this);
    element.style.display = "block";
  });

  element.parentNode.insertBefore(inputField, element.nextSibling);
  inputField.focus();
}
