console.log("language: ", window.navigator.language);

/*function localize (language) {
  if (['sv'].includes(language)) {
    console.log("includes sv");
    let lang = ':lang(' + language + ')';
    let hide = '[lang]:not(' + lang + ')';
    document.querySelectorAll(hide).forEach(function (node) {
      node.style.display = 'none';
    });
    let show = '[lang]' + lang;
    document.querySelectorAll(show).forEach(function (node) {
      node.style.display = 'unset';
    });
  }
}

localize(window.navigator.language);*/
