// tslint:disable:no-var-requires
// tslint:disable:no-console
// tslint:disable:max-line-length

import * as path from 'path';
import * as express from 'express';
import * as webpack from 'webpack';
import * as https from 'https';
import * as fs from 'fs';
import * as bodyParser from 'body-parser';
import { AddressInfo } from 'net';
import webpackConfig from './webpack.dev';
import * as request from 'request-promise-native';
const compiler = webpack(webpackConfig);
const httpsOptions = {
  key: fs.readFileSync('./server/cert/localhost+3-key.pem'),
  cert: fs.readFileSync('./server/cert/localhost+3.pem'),
};

const config = {
  appPort: Number(process.env.PORT) || 3000,
  userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.77 Safari/537.36',
  validHosts: [
    'w', // woolworths
    'c', // coles
  ],
};

const app = express();
app.use(bodyParser.json());

// -------------------------------------------------------  ------------------

app.all('/api/type2/*', (req, res) =>
{
  // Check that theres something after the prefix
  // matches[0] = matched object
  // matches[1] = host, 'c' or 'w'
  // matches[2] = search term
  const matches = req.url.match(/\/api\/type2\/(c|w)\/(.*$)/);
  if (!matches || matches.length < 3)
  {
    return res.end('Error 1');
  }

  // Only allowed hosts
  if (config.validHosts.indexOf(matches[1]) === -1)
  {
    return res.end('Error 2');
  }

  let host: string;
  switch (matches[1])
  {
    case 'w':
      host = 'https://www.woolworths.com.au/apis/ui/Search/products';
      break;
    case 'c':
      host = 'https://shop.coles.com.au/search/resources/store/20501/productview/bySearchTerm/' + matches[2];
      break;
  }

  // Send the request.
  request(host, {
    headers: {
      'User-Agent': config.userAgent,
    },
    method: req.method,
    body: req.method === 'POST' ? req.body : undefined,
    json: true,
  }).then((response) =>
  {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(response));
  }).catch((error) =>
  {
    res.end('Error 3');
  });
});

// -------------------------------------------------------------------------

app.use(express.static(path.resolve(__dirname, 'dist')));
app.use(
  require('webpack-dev-middleware')(compiler, {
    publicPath: webpackConfig.output.publicPath,
    writeToDisk: true,
    stats: { colors: true },
  }),
);
app.use(require('webpack-hot-middleware')(compiler));

app.get('/*', (req, res) =>
{
  res.sendFile(path.resolve(__dirname, 'dist/index.html'), (err: Error) =>
  {
    if (err)
    {
      res.status(500).send(err);
    }
  });
});

// -------------------------------------------------------------------------

const server = https.createServer(httpsOptions, app);
server.listen(config.appPort, '0.0.0.0', null, null);
server.on('listening', () =>
{
  console.log(`App listening on ${(server.address() as AddressInfo).port}`);
});
