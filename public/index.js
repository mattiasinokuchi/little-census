console.log("language: ", window.navigator.language);

if (window.navigator.language == 'sv-SE') {
  console.log('svenska');
  document.querySelectorAll("#sv").forEach(function (node) {
    node.hidden = false;
  });
  document.querySelectorAll("#en").forEach(function (node) {
    node.hidden = true;
  });
} else {
  console.log('engelska');
  document.querySelectorAll("#sv").forEach(function (node) {
    node.hidden = true;
  });
  document.querySelectorAll("#en").forEach(function (node) {
    node.hidden = false;
  });
}
