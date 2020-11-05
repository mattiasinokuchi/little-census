console.log("language: ", window.navigator.language);

if (window.navigator.language == 'sv-SE') {
  console.log('svenska');
  document.querySelectorAll('[lang="sv"]').forEach(function (node) {
    node.hidden = false;
  });
  document.querySelectorAll('[lang="en"]').forEach(function (node) {
    node.hidden = true;
  });
} else {
  console.log('engelska');
  document.querySelectorAll('[lang="sv"]').forEach(function (node) {
    node.hidden = true;
  });
  document.querySelectorAll('[lang="en"]').forEach(function (node) {
    node.hidden = false;
  });
}
