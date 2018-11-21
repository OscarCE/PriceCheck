import * as path from 'path';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as url from 'url';
import * as request from 'request-promise-native';

const config = {
  appPort: Number(process.env.PORT) || 3000,
  // tslint:disable-next-line:max-line-length
  userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.77 Safari/537.36',
  validHosts: [
    'www.woolworths.com.au',
    'shop.coles.com.au',
  ],
};

const app = express();
app.use(bodyParser.json());

// -------------------------------------------------------  ------------------

app.all('/api/type2/*', (req, res) =>
{
  // Check that theres something after the prefix
  const matches = req.url.match(/\/api\/type2\/(.*$)/);
  if (!matches || matches.length < 2)
  {
    return res.end('Error 1');
  }

  // Check that the match is an URL.
  let remoteUrl: url.UrlWithStringQuery;
  try
  {
    remoteUrl = url.parse(decodeURI(matches[1]));
  } catch (error)
  {
    return res.end('Error 2');
  }

  // No relative urls.
  if (!remoteUrl.host)
  {
    return res.end('Error 3');
  }

  // Only https.
  if (remoteUrl.protocol !== 'https:')
  {
    return res.end('Error 4');
  }

  // Only allowed hosts
  if (config.validHosts.indexOf(remoteUrl.host) === -1)
  {
    return res.end('Error 5');
  }

  // Send the request.
  request(remoteUrl.href, {
    headers: {
      'User-Agent': config.userAgent,
    },
    method: req.method,
    body: req.body,
    json: true,
  }).then((response) =>
  {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(response));
  }).catch((error) =>
  {
    res.end(error.message);
  });
});

// -------------------------------------------------------------------------

app.use(express.static(path.resolve(__dirname, 'dist')));

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

app.listen(config.appPort, () =>
{
  // tslint:disable-next-line:no-console
  console.log(`App listening on ${config.appPort}`);
});
