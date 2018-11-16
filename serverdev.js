const path = require('path');
const express = require('express');
const webpack = require('webpack');
const https = require('https');
const axios = require('axios');
const webpackConfig = require('./webpack.dev.js');
const compiler = webpack(webpackConfig);
const fs = require('fs');
const bodyParser = require('body-parser');
const appPort = process.env.PORT || 3000;
const httpsOptions = {
  key: fs.readFileSync('./server/cert/localhost+3-key.pem'),
  cert: fs.readFileSync('./server/cert/localhost+3.pem'),
};

const app = express();
app.use(bodyParser.json());

// -------------------------------------------------------------------------

function getColes(url) {
  console.log('getColes');
  return axios.get(url)
    .then(resp => {
      let cookieTemp = getColesCookie(resp.data);
      if (cookieTemp) {
        return getColesWithCookie(url, cookieTemp);
      } else {
        return resp.data;
      }
    });
}

function getColesWithCookie(url, cookie) {
  console.log('getColesWithCookie');
  return axios.get(url, {
    headers: {
      Cookie: cookie,
    }
  }).then(resp => {
    let cookieTemp = getColesCookie(resp.data);
    if (cookieTemp) {
      return getColesWithCookie(url, cookieTemp);
    } else {
      return resp.data;
    }
  });
}

function getColesCookie(data) {
  if (typeof data !== 'string') {
    return;
  }
  const htmlRegex = /(var .*?)document.cookie=(.*?)\+'; path/;
  const htmlMatches = data.match(htmlRegex);

  if (htmlMatches && htmlMatches.length === 3) {
    console.log('----matches html');
    let cookieString = eval(htmlMatches[1] + ';let cookie=' + htmlMatches[2] + ";cookie");
    const cookieRegex = /(.+)=(.+)/;
    const cookieMatches = cookieString.match(cookieRegex);

    if (cookieMatches && cookieMatches.length === 3) {
      return cookieString;
    }
  }
  return;
}

app.all('/api/type2/*', (req, res) => {

  let url = req.url.match(/\/api\/type2\/(.*$)/)[1];
  const isColes = /coles/.test(req.url);

  if (isColes) {
    getColes(url).then(data => {
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify(data));
    }).catch((error) => {
      console.log('Coles error.', error.message);
      res.end(error.message);
    });
  } else if (req.method === 'POST') {
    axios.post(url, req.body)
      .then((response) => {
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify(response.data));
      }).catch((error) => {
        console.log('POST error.', error.message);
        res.end(error.message);
      });
  } else if (req.method === 'GET') {
    axios.get(url)
      .then(response => {
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify(response.data));
      }).catch((error) => {
        console.log('GET error.', error.message);
        res.end(error.message);
      });
  }
});

// -------------------------------------------------------------------------

app.use(express.static(path.resolve(__dirname, 'dist')));
app.use(
  require('webpack-dev-middleware')(compiler, {
    publicPath: webpackConfig.output.publicPath,
    writeToDisk: true,
    stats: { colors: true },
  })
);
app.use(require('webpack-hot-middleware')(compiler));

app.get('/*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'dist/index.html'), function (err) {
    if (err) {
      res.status(500).send(err);
    }
  });
});

// -------------------------------------------------------------------------

const server = https.createServer(httpsOptions, app);
server.listen(appPort, '0.0.0.0');
server.on('listening', () => {
  console.log(`App listening on ${server.address().port}`);
});
