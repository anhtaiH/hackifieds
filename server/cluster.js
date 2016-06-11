const cluster = require('cluster');

const children = {};
const Queue = require('./queueStack').Queue;
const listingQueue = new Queue();

const listingsController = require('./controllers/listingsController.js');
const imageController = require('./controllers/imageController.js');

const GoogleMapsAPI = require('googlemaps');
const distance = require('google-distance-matrix');

const imagemin = require('imagemin');
const imageminMozjpeg = require('imagemin-mozjpeg');
const imageminPngquant = require('imagemin-pngquant');
const keys = require('./auth/keys.js');


const log = (p, msg) => {
  var name;
  var pid;
  if (p.name !== undefined) {
    name = p.name;
    pid = p.process.pid;
  } else {
    name = 'master';
    pid = process.pid;
  }
  console.log('[' + name + ' @ ' + pid + '] ' + msg);
};

const masterJob = () => {
  log('master', 'started master');

  const checkOnHTTPServer = () => {
    if (children.server === undefined) {
      log('master', 'starting an http server');
      children.server = cluster.fork({ ROLE: 'server' });
      children.server.name = 'http server';

      children.server.on('online', () => {
        log(children.server, 'ready for requests');
      });
      children.server.on('exit', () => {
        log(children.server, 'died');
        delete children.server;
      });

      // listen for messages from the http server
      children.server.on('message', (msg) => {
        log(children.server, 'got a message from the http server' + JSON.stringify(msg));
        // let the worker know there is a new listing he needs to proccess
        children.worker.send(msg.listingId);
      });
    }
  };

  const checkOnWorker = () => {
    if (children.worker === undefined) {
      log('master', 'starting worker');
      children.worker = cluster.fork({ ROLE: 'worker' });
      children.worker.name = 'worker';

      children.worker.on('online', () => {
        log(children.worker, 'ready');
      });
      children.worker.on('exit', () => {
        log(children.worker, 'died');
        delete children.worker;
      });

      // listen for messages from the listing worker
      children.worker.on('message', (msg) => {
        log(children.worker, JSON.stringify(msg));
      });
    }
  };

  const masterLoop = () => {
    checkOnHTTPServer();
    checkOnWorker();
  };

  // keep checking to see if anyone of them are dead so we can remake them
  setInterval(masterLoop, 1000);
};

const httpJob = () => {
  require('./server.js');
};

const updateListing = (listingId, lat, lng, distanceToHackReactor) => {
  listingsController.updateListing(listingId, lat, lng,
    JSON.stringify(distanceToHackReactor), (err) => {
      if (!err) {
        console.log('gmap done');
      }
    });
};

const gmap = (listingId, address, done) => {
  var lat;
  var lng;
  var distanceToHackReactor;
  var tasks = 2;
  distance.key = keys.GMAP_SECRET;
  distance.units('imperial');

  const publicConfig = {
    key: keys.GMAP_SECRET,
    secure: true,
  };

  const gmapAPI = new GoogleMapsAPI(publicConfig);

  gmapAPI.geocode({ address }, (err, data) => {
    lat = data.results[0].geometry.location.lat;
    lng = data.results[0].geometry.location.lng;
    console.log('gmap', lat, lng);
    if (--tasks === 0) {
      updateListing(listingId, lat, lng, distanceToHackReactor);
      done();
    }
  });

  distance.matrix([address], ['8, 944 Market St, San Francisco, CA 94102'],
    (err, data) => {
      distanceToHackReactor = {
        miles: data.rows[0].elements[0].distance.text,
        time: data.rows[0].elements[0].duration.text,
      };
      console.log('distance: ', distanceToHackReactor);
      if (--tasks === 0) {
        updateListing(listingId, lat, lng, distanceToHackReactor);
        done();
      }
    });
};

const img = (pictures, done) => {
  console.log('pictures!!', pictures);
  for (var i = 0; i < pictures.length; i++) {
    var picId = pictures[i];
    imagemin(['dist/images/' + picId], 'dist/compressed',
    { plugins: [imageminMozjpeg({ quality: 90 }),
    imageminPngquant({ quality: '65-80' })] })
    .then((files) => {
      console.log(files);
      imageController.addImage(picId, files[0].data, (err, res) => {
        if (err) {
          console.log(err);
        }
        console.log(res);
      });
      //=> [{data: <Buffer 89 50 4e …>, path: 'build/images/foo.jpg'}, …]
    })
    .catch((err) => {
      console.log(err);
    });
  }
  done();
};

const array = [];
const workerJob = () => {
  // listen for new listings that need to be processed
  process.on('message', (listing) => {
    console.log('im enqueueing ', listing);
    array.push(listing);
    // listingQueue.enqueue(listing);
  });

  const processListing = (listingId, callback) => {
    var tasksLeft = 2;
    listingsController.getListing(listingId, (err, listing) => {
      if (!err) {
        gmap(listingId, listing.address, () => {
          if (--tasksLeft === 0) {
            console.log('processed', listing.listingId);
            callback(null);
          }
        });
        img(JSON.parse(listing.pictures), () => {
          if (--tasksLeft === 0) {
            console.log('processed', listing.listingId);
            callback(null);
          }
        });
      } else {
        console.log(err);
      }
    });
  };

  const workerLoop = () => {
    if (array.length === 0) {
      setTimeout(workerLoop, 1000);
    } else {
      const listing = array.pop();
      process.send({ msg: 'processing listing', listing });

      processListing(listing, (err) => {
        if (!err) {
          process.send({ msg: 'success listing processed' });
        } else {
          array.push(listing);
        }
        // keep processing listings
        setTimeout(workerLoop, 1000);
      });
    }
  };

  workerLoop();
};

if (cluster.isMaster) {
  masterJob();
} else {
  if (process.env.ROLE === 'worker') {
    workerJob();
  } else {
    httpJob();
  }
}
