let searchText = document.getElementById("searchBox");
let button = document.getElementById("search");
searchText.onkeydown = function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    let searchTerm = searchText.value;
    window.location.href = `search.html?search=${searchTerm}`;
  }
};

button.addEventListener("click", function () {
  let searchTerm = searchText.value;
  window.location.href = `search.html?search=${searchTerm}`;
});
