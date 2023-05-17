import $ from "jquery";
import moment from "moment";
import daterangepicker from "daterangepicker";

//showing heroSearch form id according to the navigation id.
function heroSearch() {
  $(".hero-nav").on("click", function (e) {
    e.preventDefault();
    if (!(e.target.tagName.toLowerCase() === "a") && !e.target.href) return;
    $(".hero-nav__link").removeClass("hero-nav__active");
    $(e.target).addClass("hero-nav__active");
    //Change the from id attribute value for different search
    $(".search-form").attr("id", `${e.target.id}-search`);
  });
}

function locationSearch() {
  //Search suggestion popup data according to the input filed value
  const suggestions = [
    { cityName: "London", addr: "Greater London, United Kingdom" },
    { cityName: "New York", addr: "New York State, United States" },
    { cityName: "Paris", addr: "France" },
    { cityName: "Madrid", addr: "Spain" },
    { cityName: "Santorini", addr: "Greece" },
  ];

  function suggestionPopupToggle() {}

  function findSuggestions(query, suggestions, limit = 5) {
    const regex = new RegExp(query, "ig");
    const suggLocations = suggestions.filter((suggs, i) => {
      if (regex.test(suggs.cityName)) {
        return suggs;
      }
    });
    if (suggLocations.length < limit) {
      return suggLocations;
    } else {
      return suggLocations.slice(0, 5);
    }
  }

  function renderSuggestions(suggestions) {
    const html = $.map(suggestions, function (sugg) {
      return `
        <li class="search-loc__popup-item">
          <i class="fa-solid fa-location-dot search-loc__popup-icon"></i>
          <div class="search-loc__popup-text">
            <h4 class="search-loc__popup-title">${sugg.cityName}</h4>
            <span class="search-loc__popup-addr">${sugg.addr}</span>
          </div>
        </li>
        `;
    }).join("");
    $(".search-loc__popup").empty();
    $(".search-loc__popup").get(0).insertAdjacentHTML("beforeend", html);
  }

  $(".loc__input").on("input", function () {
    if ($(".search-loc").hasClass("hidden")) {
      $(".search-loc").removeClass("hidden");
    }
    setTimeout(() => {
      const query = $(this).val().toLowerCase();
      let result = findSuggestions(query, suggestions); //function should return array
      if (result.length == 0) {
        result = suggestions;
      }
      renderSuggestions(result);
    }, 500);
  });

  // Filipping according to the bounding box height
  function popup() {
    const el = $(".search-form");
    const searchLocElHight = $(".search-loc").height();
    const rect = {
      top: el.offset().top - $(window).scrollTop(),
    };
    if (rect.top > searchLocElHight) {
      $(".search-loc").addClass("search-loc--top");
    } else {
      $(".search-loc").removeClass("search-loc--top");
    }
  }

  //Suggestion popup control according to the input filed click
  $(".loc__input").on("click", function (e) {
    $(".search-loc").toggleClass("hidden");
    popup();
  });

  const observer = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting) {
        popup();
      } else {
        popup();
      }
    },
    {
      root: null,
      target: 0,
      rootMargin: "-160px",
    }
  );

  // Start observing the element
  $([$(".section-destinations")[0], $(".search-loc")[0]]).each(function () {
    observer.observe(this);
  });

  $(".search-form__group--1").on("click", function (e) {
    e.preventDefault();
    const locationItemEl = e.target.closest(".search-loc__popup-item");
    if (!locationItemEl) {
      return;
    }
    $(".loc__input").val(
      $(locationItemEl).find(".search-loc__popup-title").text()
    );

    $(".search-loc").toggleClass("hidden");
  });

  //click outside the location search form hidden the popup
  $(document).on("click", function (e) {
    if (!$(e.target).closest(".search-form__group--1").length) {
      if (!$(".search-loc").hasClass("hidden")) {
        $(".search-loc").addClass("hidden");
      }
    }
  });
}

function checkInOut() {
  const currentDate = moment();
  // $("#date-range").on("click", function () {
  //   const daterangepicker = $(".daterangepicker")[0];
  //   var currentTop = parseFloat(daterangepicker.style.top); // Get the current top value as a numeric value
  //   var updatedTop = currentTop + 20; // Add 10 pixels to the current top value
  //   daterangepicker.style.top = updatedTop + "px";
  //   console.log(daterangepicker.style.top);
  // });
  $("#date-range").daterangepicker({
    locale: {
      format: "DD/MM/YYYY",
    },
    startDate: currentDate,
    minDate: currentDate,
    opens: "center",
    autoApply: true,
  });

  $("#date-range").on("show.daterangepicker", function () {
    console.log("worked!");
    const daterangepicker = $(".daterangepicker")[0];
    var currentTop = parseFloat(daterangepicker.style.top); // Get the current top value as a numeric value
    var updatedTop = currentTop + 20; // Add 10 pixels to the current top value
    daterangepicker.style.top = updatedTop + "px";
    console.log(daterangepicker.style.top);
    // $(".daterangepicker").addClass("custom-class");
    // $(".daterangepicker .ranges li").addClass("custom-class");
    // $(".daterangepicker .applyBtn").addClass("custom-class");
    // $(".daterangepicker .cancelBtn").addClass("custom-class");
  });
}

export { heroSearch, locationSearch, checkInOut };
