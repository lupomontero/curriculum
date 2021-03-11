#! /usr/bin/env node

const { spawn } = require('child_process');
const fs = require('fs').promises;
const path = require('path');
const http = require('http');
const { EventEmitter } = require('events');
const mkdirp = require('mkdirp');
const chokidar = require('chokidar');
const WebSocketServer = require('websocket').server;
const { repository, version } = require('../package.json');


const rubricVersion = '3.x';


const log = (...args) => {
  console.log((new Date()), ...args);
};


const createStore = (initialState) => {
  const ee = new EventEmitter();
  let state = initialState;
  ee.getState = () => state;
  ee.setState = (newState) => {
    if (newState === state) {
      return;
    }
    state = { ...state, ...newState };
    ee.emit('change', state);
  };
  return ee;
};

const createServer = () => {
  const server = http.createServer((request, response) => {
    log(`Received request for ${request.url}`);
    response.writeHead(404);
    response.end();
  });

  server.listen(8080, () => {
    log('Server is listening on port 8080');
  });

  return server;
};


const createWebSocketServer = (httpServer, store) => {
  const wsServer = new WebSocketServer({
    httpServer,
    autoAcceptConnections: false
  });

  const originIsAllowed = (origin) => {
    // TODO: put logic here to detect whether the specified origin is allowed.
    return true;
  };

  wsServer.on('request', (request) => {
    if (!originIsAllowed(request.origin)) {
      request.reject();
      log(`Connection from origin ${request.origin} rejected.`);
      return;
    }

    const connection = request.accept('state-protocol', request.origin);
    log('Connection accepted.');

    const onChange = (data) => {
      // console.log('Change!', data);
      connection.sendUTF(JSON.stringify({ eventName: 'change', data }));
    };

    connection.sendUTF(JSON.stringify({ eventName: 'init', data: store.getState() }));
    store.on('change', onChange);

    connection.on('message', (message) => {
      if (message.type === 'utf8') {
        log(`Received Message: ${message.utf8Data}`);
        // connection.sendUTF(message.utf8Data);
        // connection.sendUTF(JSON.stringify(store.getState()));
      } else if (message.type === 'binary') {
        log(`Received Binary Message of ${message.binaryData.length} bytes`);
        // connection.sendBytes(message.binaryData);
      }
    });

    connection.on('close', (reasonCode, description) => {
      log(`Peer ${connection.remoteAddress} disconnected.`);
      store.off('change', onChange);
    });
  });

  return wsServer;
};


const createParser = store => (type, slug, locale, track) => {
  log(`Parsing ${type} ${slug} ${locale}...`);
  const collectionName = `${type}s`;
  const suffix = locale.split('-')[0];
  const fname = `./build/${collectionName}/${locale === 'es-ES' ? slug : `${slug}-${suffix}`}.json`;
  const fd = require('fs').openSync(fname, 'w');
  const child = spawn('npx', [
    'curriculum-parser',
    type,
    `${collectionName}/${slug}`,
    '--repo', repository,
    '--version', version,
    '--rubric', rubricVersion,
    '--track', track,
    '--locale', locale,
    ...(locale === 'es-ES' ? [] : ['--suffix', suffix]),
  ], { stdio: [null, fd, 'inherit'] });

  child.on('error', (err) => {
    console.error('Child error', err);
  });

  child.on('close', (code) => {
    if (code !== 0) {
      console.error('Failed parsing', type, slug, locale, track, code);
      return;
    }

    log(`Finished parsing ${type} ${slug} ${locale}...`);

    const absPath = path.resolve(fname);
    delete require.cache[absPath];
    const json = require(absPath);
    const prevState = store.getState();
    store.setState({
      [collectionName]: prevState[collectionName]
        .filter(item => item.slug !== slug)
        .concat(json)
        .sort((a, b) => {
          if (a.slug > b.slug) {
            return 1;
          }
          if (a.slug < b.slug) {
            return -1;
          }
          return 0;
        }),
    });
  });

  // Cancel function
  return () => {};
};


const createWatcher = (store) => {
  const parse = createParser(store);
  const watcher = chokidar.watch(['./topics', './projects']);
  const jobs = {};

  watcher.on('change', (path, stats) => {
    const parts = path.split('/');
    const type = parts[0].slice(0, -1);
    const id = `${type}-${parts[1]}`;

    if (!['project', 'topic'].includes(type)) {
      return;
    }

    // if already parsing 1st cancel current job...
    if (jobs[id]) {
      jobs[id]();
    }

    // parse and keep cancel function for later...
    jobs[id] = parse(type, parts[1], 'es-ES', 'js');
  });
};


const readBuildDir = () => Promise.all(['projects', 'topics'].map(
  key => fs.stat(path.join('./build', key))
    .then(stats => (
      !stats.isDirectory()
        ? {}
        : fs.readdir(path.join('./build', key))
          .then(files => files.map(
            file => require(path.resolve('./build', key, file)),
          ))
    ))
    .catch((err) => {
      if (err.code !== 'ENOENT') {
        throw err;
      }
      return mkdirp(path.join('./build', key));
    }),
))
  .then(([projects, topics]) => ({ projects, topics }));


readBuildDir()
  .then((initialState) => {
    const store = createStore(initialState);
    const httpServer = createServer();
    const wsServer = createWebSocketServer(httpServer, store);
    const watcher = createWatcher(store);
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });