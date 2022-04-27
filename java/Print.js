function boxEvent() {
  var checkbox = document.getElementsByClassName("checkbox");

  for (let i = 0; i < checkbox.length; i++) {
    checkbox[i].parentElement.parentElement.classList.add("no_print");
    checkbox[i].addEventListener("change", function () {
      if (this.checked) {
        event.target.parentElement.parentElement.classList.add("print");
        event.target.parentElement.parentElement.classList.remove("no_print");
      } else {
        event.target.parentElement.parentElement.classList.remove("print");
        event.target.parentElement.parentElement.classList.add("no_print");
      }
    });
  }
}
