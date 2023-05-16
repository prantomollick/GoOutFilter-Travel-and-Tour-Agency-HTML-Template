import "../sass/main.scss";
import $ from "jquery";
import moment from "moment";
import daterangepicker from "daterangepicker";
import { categoriesSubMenu } from "./layout/navigation.js";
import { heroSearch, locationSearch } from "./layout/heroSearch.js";

//Navigation
categoriesSubMenu();

//hero search
heroSearch();

//search input
locationSearch();

// $(function () {
//   $("#date-range").daterangepicker({
//     startDate: moment().startOf("hour"),
//     endDate: moment().startOf("hour").add(32, "hour"),
//   });
// })();

// // Get a reference to the element
// var element = $(".search-form");

// // Get the position and size of the element relative to the viewport
// var rect = {
//   scrollTop: $(window).scrollTop(),
//   left: element.offset().left,
//   top: element.offset().top - $(window).scrollTop(),
//   bottom:
//     $(window).height() -
//     (element.offset().top - $(window).scrollTop() + element.outerHeight()),
//   width: element.outerWidth(),
//   height: element.outerHeight(),
//   windowheight: $(window).height(),
// };

// // Output the bounding rectangle to the console
// console.log("Bounding rectangle: ", rect);
