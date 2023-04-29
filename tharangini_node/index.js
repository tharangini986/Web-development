const http = require('http');
const fs = require('fs');
const MongoClient = require('mongodb').MongoClient;
const config = require('./config');


const client = new MongoClient(config.mongodbUrl);



const handlePublic = (req, res) => {
  const filePath = './public/'+ req.url;
  if (req.url.match(".jpeg$") || req.url.match(".png$")){
    fs.readFile(filePath, (err, data) => {
              if (err) {
                console.error(err);
                res.writeHead(500, {'Content-Type': 'text/plain'});
                res.end('Internal Server Error');
              } else {
                if(req.url.match(".jpeg$")){
                  res.writeHead(200, {'Content-Type': 'text/jpeg'});
                  res.end(data);
                }else if(req.url.match(".png$")){
                  res.writeHead(200, {'Content-Type': 'text/png'});
                  res.end(data);
                }
              }
            });
  }else if(req.url.match(".css$") || req.url.match(".js$")){
      fs.readFile(filePath, 'utf8', (err, data) => {
          if (err) {
            console.error(err);
            res.writeHead(500, {'Content-Type': 'text/plain'});
            res.end('Internal Server Error');
          } else {
            if(req.url.match(".css$")){
                res.writeHead(200, {'Content-Type': 'text/css'});
                res.end(data);
              }else if(req.url.match(".js$")){
                res.writeHead(200, {'Content-Type': 'text/js'});
                res.end(data);
              }
          }
        });
  }
};

const handleRootRequest = (req, res) => {
  const filePath = './public/index.html';
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.writeHead(500, {'Content-Type': 'text/plain'});
      res.end('Internal Server Error');
    } else {
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.end(data);
    }
  });
};


const handleApiRequest = async (req, res) => {
  try {
    await client.connect();
    const db = client.db(config.dbName);
    const collection = db.collection(config.collectionName);

    if (req.method === 'GET') {
      var data = await collection.find({}).toArray();
      data = JSON.stringify(data, null, 2);
      data = `${data}`;
      fs.writeFile('./public/db.json', data, 'utf8', (err) => {
        if (err) throw err;
      });
      res.writeHead(200, {"Content-Type":"application/json",
                          "Access-Control-Allow-Origin":"*",
                          "Access-Control-Allow-Methods": "GET",
                           "Access-Control-Allow-Headers":"Origin, X-Requested-With, Content-Type, Accept"
                        });
      res.end(data);
    }
    else {
      res.writeHead(405, {'Content-Type': 'text/plain'});
      res.end('Method Not Allowed');
    }
  } catch (err) {
    console.error(err);
    res.writeHead(500, {'Content-Type': 'text/plain'});
    res.end('Internal Server Error');
  }
};



const server = http.createServer((req, res) => {
  if (req.url === '/') {
    handleRootRequest(req, res);
  } else if (req.url === '/api') {
    handleApiRequest(req, res);
  } else if (req.url.match(".css$") || req.url.match(".png$") || req.url.match(".jpeg$") || req.url.match(".js$")) {
    handlePublic(req, res);
  }

});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});