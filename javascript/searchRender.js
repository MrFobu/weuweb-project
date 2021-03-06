let searchTerm = "";
function getSearch() {
  let searchParams = new URLSearchParams(window.location.search);
  searchTerm = searchParams.get("search");
  console.log(searchTerm);
  search(searchTerm);
}

async function search(term) {
  let response = await fetch(
    `https://api.spoonacular.com/recipes/complexSearch?query=${term}&apiKey=d70af83541ae424ea49d502f873f9311&number=20`
  );
  let json = await response.json();
  console.log(json);
  render(json.results);
}

let container = document.getElementById("searchResults");
function render(objectList) {
  if (objectList.length > 0) {
    for (let i = 0; i < objectList.length; i++) {
      let item = document.createElement("a");
      item.classList.add("result");
      item.href = `recipie.html?id=${objectList[i].id}`;

      let img = document.createElement("img");
      img.classList.add("result_image");
      img.src = objectList[i].image;

      let title = document.createElement("h2");
      title.innerText = objectList[i].title;

      item.append(img);
      item.append(title);
      container.append(item);
    }
  } else if (searchTerm != null) {
    let err = document.createElement("h1");
    err.innerHTML = "There is nothing here... maybe try something else";
    container.append(err);
  }
}
getSearch();
