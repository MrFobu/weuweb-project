function getId() {
  let searchParams = new URLSearchParams(window.location.search);
  let id = searchParams.get("id");
  console.log(id);
  getItem(id);
}

async function getItem(id) {
  let response = await fetch(
    `https://api.spoonacular.com/recipes/${id}/information?apiKey=d70af83541ae424ea49d502f873f9311`
  );
  let status = response.status;
  console.log("status is", status);
  try {
    let item = await response.json();
    console.log(item);
    render(item);
  } catch (err) {
    if (response.status >= 400) {
      renderError(response.status);
    }
  }
}

function render(item) {
  console.log("rendering item");
  let recipie = `
    <section class="title_section">
    <div class="recipie_header">
      <img class="recipie_image" src=${item.image} />
      <div class="information">
        <h1>${item.title}</h1>
        <ul class="info_list">
          <li><i class="fa fa-solid fa-utensils"></i> ${item.servings} servings</li>
          <li><i class="fa fa-solid fa-clock"></i> ${item.readyInMinutes} minutes.</li>
          <li class="tags">
          <div class="${item.cheap} tag">Cheap</div>
          <div class="${item.glutenFree} tag">Gluten Free</div>
          <div class="${item.vegetarian} tag">Vegetarian</div>
          <div class="${item.vegan} tag">Vegan</div>
          <div class="${item.veryHealthy} tag">Healthy</div>
          </li>
        </ul>
      </div>
    </div>
  </section>
  <section class="recipie_section">
  <div class="recipie_container">
    <div id="ingredients" class="ingredients">
      <table id="ingredientList"></table>
      <button onclick="window.print()">Print <i class="fa fa-solid fa-print"></i></button>
      </div>
    <div id="instructions">
      <ol id="instructionList" class="instruction_list"></ol>
    </div>
  </div>
</section>
    `;
  let container = document.getElementById("recipieContainer");
  container.insertAdjacentHTML("afterbegin", recipie);

  //inserts ingredients list
  let ingredientTable = document.getElementById("ingredientList");
  for (let i = 0; i < item.extendedIngredients.length; i++) {
    let ingredients = item.extendedIngredients[i];
    let newRow = ingredientTable.insertRow();
    let cell1 = newRow.insertCell();
    let cell2 = newRow.insertCell();
    let cell3 = newRow.insertCell();
    var newText = document.createTextNode(
      `${ingredients.measures.metric.amount} ${ingredients.measures.metric.unitShort}`
    );
    var newText2 = document.createTextNode(`${ingredients.nameClean}`);
    var box = document.createElement("input");
    box.type = "checkbox";
    box.classList.add("checkbox");
    box.classList.add("no_print");
    cell1.appendChild(box);
    cell2.appendChild(newText);
    cell3.appendChild(newText2);
  }
  //Inserts instructions
  let instructions = document.getElementById("instructionList");
  let steps = item.analyzedInstructions[0].steps;
  for (let i = 0; i < steps.length; i++) {
    let recipieStep = `<li>${steps[i].step}</li>`;
    instructions.insertAdjacentHTML("beforeend", recipieStep);
  }
  boxEvent();
}

function renderError(error) {
  console.log("rendering error", error);
  let container = document.getElementById("errorContainer");
  if (error == 404) {
    message =
      "I've looked far an wide, and I'm like 90% sure it doesn't exist. Try checking under the bed..";
  } else if (error == 401) {
    message = "So apparently you cant be here, guess you're not cool enough...";
  } else if (error == 402) {
    message =
      "Free only goes so far, spoonaculars daily quota is all dried up.";
  } else {
    message = "I have no idea how this happened lol ??_(???)_/??";
  }
  container.append(`${error}: ${message}`);
  container.classList.add("error");
}

getId();
