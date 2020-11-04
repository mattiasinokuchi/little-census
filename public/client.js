const resetButton = document.querySelector("#reset");
const inside = document.querySelector("#inside");
const visits = document.querySelector("#visits");
const inButton = document.querySelector("#in");
const outButton = document.querySelector("#out");
const last = document.querySelector("#lastInQue");
const first = document.querySelector("#firstInQue");
const queTime = document.querySelector("#queTime");
const queButton = document.querySelector("#que");
const callButton = document.querySelector("#call");

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

queButton.addEventListener("click", function(event) {
  countsAt('/que');
});

callButton.addEventListener("click", function(event) {
  countsAt('/call');
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
    last.textContent = data.que;
    first.textContent = data.call;
    if (data.que === data.call) {
      callButton.disabled = true;
      showTime(Date.now());
    } else {
      callButton.disabled = false;
      showTime(data.queTime);
    }
    if (data.letIn === data.letOut) {
      outButton.disabled = true;
    } else {
      outButton.disabled = false;
    }
  } catch(error) {
    console.log(error);
  }
}

function showTime(time){
  let ms = Date.now()-time;
  queTime.textContent = Math.round(ms/1000/60);
  setTimeout(countsAt('/load'), 60000);
}
