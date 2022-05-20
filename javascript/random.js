let container = document.getElementById("randomContainer");

async function random() {
  let response = await fetch(
    "https://api.spoonacular.com/recipes/random?number=5&apiKey=d70af83541ae424ea49d502f873f9311"
  );
  let json = await response.json();
  console.log(json);
  render1(json);
}

function render1(items) {
  for (let i = 0; i < items.length; i++) {
    let item = document.createElement("div");
    item.classList.add("result");
    item.href = `recipie.html?id=${items[i].id}`;

    let img = document.createElement("img");
    img.classList.add("result_image");
    img.src = items[i].image;

    let title = document.createElement("h2");
    title.innerText = items[i].title;

    item.append(img);
    item.append(title);
    container.append(item);
    console.log(item);
  }
}

random();
