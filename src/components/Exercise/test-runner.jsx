const createTestRunner = tests => code => new Promise((resolve, reject) => {
  const worker = new Worker('/workers/test-runner.js');

  worker.addEventListener('error', (ev) => {
    // storeResults({ code, error: ev.message, updatedAt: new Date() });
    worker.terminate();
    reject(new Error(ev.message));
  });

  worker.addEventListener('message', (ev) => {
    // storeResults({
    //   code,
    //   testResults: e.data,
    //   updatedAt: new Date(),
    //   error: '',
    // });
    worker.terminate();
    resolve(ev.data);
  });

  worker.postMessage({ code, tests });
});

export default createTestRunner;