import mongodb from 'mongodb';
import Bluebird from 'bluebird';

Bluebird.promisifyAll(mongodb);

let instances = {};

export default {
  connect,
  db,
  collection,
  ObjectID: mongodb.ObjectID,
  _instances: instances,
};

async function connect(arg) {
  let url, name;

  if(typeof arg === 'string') {
    url = arg;
    name = 'default';
  }
  else {
    url = arg.url;
    name = arg.name || 'default';
  }

  instances[name] = await mongodb.connectAsync(url);
  return instances[name];
}

function db(connection = 'default') {
  return instances[connection];
}

function collection(name, connection = 'default') {
  return instances[connection].collection(name);
}