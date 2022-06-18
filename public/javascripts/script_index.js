import {toggleAdvancedSearchMenu} from "./library.js";
import {handleAdvancedSearch, handleRandomSearch, handleInputSearch} from "./search_functions.js"


document.addEventListener("DOMContentLoaded", handleRandomSearch);

document.getElementById("search").addEventListener("input", handleInputSearch);

document.getElementById("menu").addEventListener('click', toggleAdvancedSearchMenu);

document.getElementById("advanced_search_button").addEventListener('click', handleAdvancedSearch);

$(function () {
    $('[data-toggle="popover"]').popover()
})