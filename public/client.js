const resetButton = document.querySelector("#reset");
const inside = document.querySelector("#inside");
const visits = document.querySelector("#visits");
const inButton = document.querySelector("#in");
const outButton = document.querySelector("#out");

inButton.addEventListener("click", function(event) {
  countsAt('/let-in');
});

outButton.addEventListener("click", function(event) {
  countsAt('/let-out');
});

resetButton.addEventListener("click", function(event) {
  if (window.confirm("Nollställ besöksräknare?")) {
    countsAt('/reset');
  }
});

window.onload = function () {
  countsAt('/load');
}

async function countsAt(url) {
  try {
    const response = await fetch(url);
    const data = await response.json();
    visits.textContent = data.letIn;
    inside.textContent = data.letIn-data.letOut;
    if (data.letIn === data.letOut) {
      outButton.disabled = true;
    } else {
      outButton.disabled = false;
    }
  } catch(error) {
    console.log(error);
  }
}
