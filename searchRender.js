function getSearch() {
  let searchParams = new URLSearchParams(window.location.search);
  let searchTerm = searchParams.get("search");
  console.log(searchTerm);
  search(searchTerm);
}

async function search(term) {
  let response = await fetch(
    `https://api.spoonacular.com/recipes/complexSearch?query=${term}&apiKey=d70af83541ae424ea49d502f873f9311`
  );
  let json = await response.json();
  console.log(json);
  render(json.results);
}

let container = document.getElementById("searchResults");
function render(objectList) {
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
}
getSearch();
