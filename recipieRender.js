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
      <img src=${item.image} />
      <span>
        <h1>${item.title}</h1>
        <ul>
          <li>${item.servings} servings</li>
          <li>${item.readyInMinutes} minutes.</li>
          <li>
          <span class=${item.cheap}>Cheap</span>
          <span class=${item.glutenFree}>Gluten Free</span>
          <span class=${item.vegetarian}>Vegetarian</span>
          <span class=${item.Vegan}>Vegan</span>
          <span class=${item.veryHealthy}>Healthy</span>
          
          </li>
        </ul>
      </span>
    </div>
  </section>
  <section class="recipie_section">
  <div class="recipie_container">
    <span id="ingrediets">

    </span>
    <span id="ingredients" class="ingredients">
      <table id="ingredientList"></table>
    </span>
    <span id="instructions">
      <ol id="instructionList" class="instruction_list"></ol>
    </span>
  </div>
</section>
    `;
  let container = document.getElementById("recipieContainer");
  container.insertAdjacentHTML("afterbegin", recipie);

  //inserts ingredients list
  let ingredientTable = document.getElementById("ingredientList");

  for (let i = 0; i < item.extendedIngredients.length; i++) {
    let ingredients = item.extendedIngredients[i];
    let ingredient = `
    <tr>
      <td>${ingredients.measures.metric.amount} ${ingredients.measures.metric.unitShort}</td>
      <td>${ingredients.nameClean}</td>
    </tr>`;
    console.log(ingredient);
    ingredientTable.insertAdjacentHTML("beforeend", ingredient);
  }

  let instructions = document.getElementById("instructionList");
  let steps = item.analyzedInstructions[0].steps;
  for (let i = 0; i < steps.length; i++) {
    let recipieStep = `<li>${steps[i].step}</li>`;
    instructions.insertAdjacentHTML("beforeend", recipieStep);
  }
}

function renderError(error) {
  console.log("rendering error", error);
  let container = document.getElementById("errorContainer");
  if (error == 404) {
    message =
      "I've looked far an wide, and I'm like 90% sure it doesn't exist. You should totally check under the bed though..";
  } else if (error == 401) {
    message = "So apparently you cant be here, guess you're not cool enough...";
  } else if (error == 402) {
    message =
      "Free only goes so far, spoonaculars daily quota is all dried up.";
  } else {
    message = "I have no idea what happened lol ¯_(ツ)_/¯";
  }
  container.append(`${error}: ${message}`);
  container.classList.add("error");
}

getId();
