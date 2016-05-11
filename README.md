# mongo-async
A simple MongoDB client manager compatible with async/await functions.

## Usage

Connecting to MongoDB outside an async function:
```javascript
import mongo from 'mongo-async';
const mongoUrl = 'mongodb://localhost/mydb'

mongo
  .connect(mongoUrl)
  .then(db => console.log(`Connected to ${config.mongodb}`))
  .catch(console.log);
```

Connecting to MongoDB from an async function:
```javascript
import mongo from 'mongo-async';
const mongoUrl = 'mongodb://localhost/mydb'

async function start() {
  let db = await mongo.connect(mongoUrl);
  // do something with the db
}
```

Using a database:
```javascript
import mongo from 'mongo-async';
async function doStuff() { 
  let db = mongo.db();
  let collection = db.collection('items';
  // do stuff with collection
}
```

Or using a collection:
```javascript
import mongo from 'mongo-async';
async function doStuff() {
  let collection = mongo.collection('items');
  // do stuff with collection
}
```

Future enhancements...
* Named connections instead of one singletone
* await for db/collection methods that resolve when the connection has been established
