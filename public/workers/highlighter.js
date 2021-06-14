self.addEventListener('message', (event) => {
  const { version, code, language } = event.data;

  importScripts(`//cdnjs.cloudflare.com/ajax/libs/highlight.js/${version}/highlight.min.js`);

  if (language) {
    return postMessage(hljs.highlight(language, code).value);
  }
  return postMessage(hljs.highlightAuto(code).value);
});