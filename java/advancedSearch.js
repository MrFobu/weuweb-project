let searchText = document.getElementById("searchBox");

searchText.onkeydown = function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    let searchTerm = searchText.value;
    window.location.href = `search.html?search=${searchTerm}`;
  }
};
