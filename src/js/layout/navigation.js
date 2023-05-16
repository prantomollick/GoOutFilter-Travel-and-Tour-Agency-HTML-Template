import $ from "jquery";

function categoriesSubMenu() {
  $(".js-tab__ctrl").on("click", function (e) {
    e.preventDefault();
    if (
      !(e.target.tagName.toLowerCase() === "button") &&
      !(e.target.type === "button")
    )
      return;

    //Remove All active class
    $(".tab-ctrl__btn").removeClass("tab-ctrl__btn--active");

    //Add active class with take value from html data attribute
    const dataAttrTabCtl = $(e.target)
      .addClass("tab-ctrl__btn--active")
      .data("tab-ctl");

    //get rid active class from all `tab-details` class element
    $(".js-tab__ctrl > .tab-details").removeClass("tab-details__active");

    //put active class on specific selected element
    $(`.js-tab__ctrl > .tab-details--${dataAttrTabCtl}`).addClass(
      "tab-details__active"
    );
  });
}

export { categoriesSubMenu };
