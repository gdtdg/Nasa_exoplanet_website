import {toggleAdvancedSearchMenu} from "./library.js";
import {advancedSearch, randomSearch, search} from "./search_functions.js"


document.addEventListener("DOMContentLoaded", randomSearch);

document.getElementById("search").addEventListener("input", search);

document.getElementById("menu").addEventListener('click', toggleAdvancedSearchMenu);

document.getElementById("advanced_search_button").addEventListener('click', advancedSearch);

$(function () {
    $('[data-toggle="popover"]').popover()
})