// tslint:disable:no-var-requires
// tslint:disable:no-console
// tslint:disable:max-line-length

import * as path from 'path';
import * as express from 'express';
import * as webpack from 'webpack';
import * as https from 'https';
import axios from 'axios';
import * as fs from 'fs';
import * as bodyParser from 'body-parser';
import { AddressInfo } from 'net';
import webpackConfig from './webpack.dev';
const compiler = webpack(webpackConfig);
const appPort = Number(process.env.PORT) || 3000;
const httpsOptions = {
  key: fs.readFileSync('./server/cert/localhost+3-key.pem'),
  cert: fs.readFileSync('./server/cert/localhost+3.pem'),
};

const userAgent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.77 Safari/537.36';
const colesRetries = 5;

const app = express();
app.use(bodyParser.json());

// -------------------------------------------------------  ------------------

async function getColes(url: string, retriesUsed: number = 0): Promise<string>
{
  console.log('getColes, retry:', retriesUsed);
  try
  {
    const resp = await axios.get(url, {
      headers: {
        'User-Agent': userAgent,
      },
    });

    const cookieTemp: string = getColesCookie(resp.data);

    if (cookieTemp)
    {
      return getColesWithCookie(url, cookieTemp);
    }
    else
    {
      return resp.data;
    }
  }
  catch (error)
  {
    console.log('Error getColes:', retriesUsed, ':', error.message);
    console.trace('Error getColes: ', error.message);
    if (retriesUsed >= colesRetries)
    {
      throw error;
    } else
    {
      return await getColes(url, retriesUsed++);
    }
  }
}

async function getColesWithCookie(url: string, cookie: string): Promise<string>
{
  console.log('getColesWithCookie');
  try
  {
    const resp = await axios.get(url, {
      headers: {
        'Cookie': cookie,
        'User-Agent': userAgent,
      },
    });
    const cookieTemp = getColesCookie(resp.data);
    if (cookieTemp)
    {
      return await getColesWithCookie(url, cookieTemp);
    } else
    {
      return resp.data;
    }
  } catch (error)
  {
    console.trace('Error getColesWithCookie: ', error.message);
    throw error;
  }
}

function getColesCookie(data: string): string
{
  console.log('getColesCookie');
  if (typeof data !== 'string')
  {
    return undefined;
  }
  const htmlRegex: RegExp = /(var .*?)document.cookie=(.*?)\+'; path/;
  const htmlMatches: RegExpMatchArray = data.match(htmlRegex);

  if (htmlMatches && htmlMatches.length === 3)
  {
    console.log('----matches html');
    const ct = htmlMatches[1] + ';let cookie=' + htmlMatches[2] + ';return cookie;';
    const cookieString: string = Function(ct)();
    const cookieRegex: RegExp = /(.+)=(.+)/;
    const cookieMatches: RegExpMatchArray = cookieString.match(cookieRegex);

    if (cookieMatches && cookieMatches.length === 3)
    {
      return cookieString;
    }
  }
  return undefined;
}

app.all('/api/type2/*', (req, res) =>
{

  const url = req.url.match(/\/api\/type2\/(.*$)/)[1];
  const isColes = /coles/.test(req.url);

  if (isColes)
  {
    getColes(url).then((data) =>
    {
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify(data));
    }).catch((error) =>
    {
      console.trace('Coles error: ', error.message);
      res.end(error.message);
    });
  } else if (req.method === 'POST')
  {
    axios.post(url, req.body, {
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': userAgent,
      },
    }).then((response) =>
    {
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify(response.data));
    }).catch((error) =>
    {
      console.trace('POST error.', error.message);
      res.end(error.message);
    });
  } else if (req.method === 'GET')
  {
    axios.get(url, {
      headers: {
        'User-Agent': userAgent,
      },
    }).then((response) =>
    {
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify(response.data));
    }).catch((error) =>
    {
      console.trace('GET error.', error.message);
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
server.listen(appPort, '0.0.0.0', null, null);
server.on('listening', () =>
{
  console.log(`App listening on ${(server.address() as AddressInfo).port}`);
});
