import {toggleAdvancedSearchMenu} from "./library.js";
import {advancedSearch, randomSearch, inputSearch} from "./search_functions.js"


document.addEventListener("DOMContentLoaded", randomSearch);

document.getElementById("search").addEventListener("input", inputSearch);

document.getElementById("menu").addEventListener('click', toggleAdvancedSearchMenu);

document.getElementById("advanced_search_button").addEventListener('click', advancedSearch);

$(function () {
    $('[data-toggle="popover"]').popover()
})