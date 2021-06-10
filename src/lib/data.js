const data = {};
const listeners = {};


const watch = () => {
  const ws = new WebSocket('ws://127.0.0.1:8080/');

  const onError = (ev) => {
    console.error('error', ev);
  };

  const onOpen = (ev) => {
    console.log('open', ev);
    // ws.send(JSON.stringify({ ok: true }));
  };

  const onClose = (ev) => {
    console.log('close', ev);
  };

  const onMessage = (ev) => {
    const { type, data } = JSON.parse(ev.data);
    console.log('message', type, data);
    // if (['init', 'change'].includes(eventName)) {
    //   setState(data);
    // }
  };

  ws.addEventListener('error', onError);
  ws.addEventListener('open', onOpen);
  ws.addEventListener('close', onClose);
  ws.addEventListener('message', onMessage);
};


export const unsubscribe = (path, callback) => {
  listeners[path] = (listeners[path] || []).filter(fn => fn !== callback);
};


export const subscribe = (path, callback) => {
  // if we already have data we invoke callback
  if (data[path]) {
    setTimeout(() => callback(data[path]));
  } else {
    fetch(`/data/${path}.json`)
      .then(resp => resp.json())
      .catch(err => err)
      .then((json) => {
        data[path] = json;
        callback(json);
      });
  }

  if (listeners[path]) {
    listeners[path].push(callback);
  } else {
    listeners[path] = [callback];
  }

  return () => unsubscribe(path, callback);
};


if (process.env.NODE_ENV === 'development') {
  watch();
}


export default { subscribe, unsubscribe };