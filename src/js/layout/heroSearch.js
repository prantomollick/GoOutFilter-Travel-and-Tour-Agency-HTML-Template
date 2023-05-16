import $ from "jquery";

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

function displaySuggestions(suggestions) {
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

function locationSearch() {
  //Search suggestion popup data according to the input filed value
  const suggestions = [
    { cityName: "London", addr: "Greater London, United Kingdom" },
    { cityName: "New York", addr: "New York State, United States" },
    { cityName: "Paris", addr: "France" },
    { cityName: "Madrid", addr: "Spain" },
    { cityName: "Santorini", addr: "Greece" },
  ];
  $(".loc__input").on("input", function () {
    setTimeout(() => {
      const query = $(this).val().toLowerCase();
      let result = findSuggestions(query, suggestions); //function should return array
      if (result.length == 0) {
        result = suggestions;
      }
      displaySuggestions(result);
    }, 500);
  });

  // Filipping according to the bounding box height
  function popup() {
    const el = $(".search-form");
    const searchLocElHight = $(".search-loc").height();
    const rect = {
      top: el.offset().top - $(window).scrollTop(),
      // bottom:
      //   $(window).height() -
      //   (el.offset().top - $(window).scrollTop() + el.outerHeight()),
    };
    if (rect.top > searchLocElHight) {
      $(".search-loc").addClass("search-loc--top");
    } else {
      $(".search-loc").removeClass("search-loc--top");
    }
  }

  //Suggestion popup control according to the input filed click
  $(".loc__input").on("click", function (e) {
    $(".search-loc").toggle();
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
  // observer.observe($(".header")[0]);

  $(".search-form__group--1").on("click", function (e) {
    e.preventDefault();
    const locationItemEl = e.target.closest(".search-loc__popup-item");
    if (!locationItemEl) {
      return;
    }

    $(".loc__input").val(
      $(locationItemEl).find(".search-loc__popup-title").text()
    );

    $(".search-loc").toggle();
  });

  $(document).on("click", function (e) {
    if (!$(e.target).closest(".search-form__group--1").length) {
      $(".search-loc").hide();
    }
  });
}

export { heroSearch, locationSearch };
