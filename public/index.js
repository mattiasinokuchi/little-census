if (window.navigator.language == 'sv-SE') {
  document.querySelectorAll('[lang="sv"]').forEach(function (node) {
    node.hidden = false;
  });
  document.querySelectorAll('[lang="en"]').forEach(function (node) {
    node.hidden = true;
  });
} else {
  document.querySelectorAll('[lang="sv"]').forEach(function (node) {
    node.hidden = true;
  });
  document.querySelectorAll('[lang="en"]').forEach(function (node) {
    node.hidden = false;
  });
}
