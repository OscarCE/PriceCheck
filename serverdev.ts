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

// new cookie jar
const j = request.jar();

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

  const payload = `<devicefingerprint>
	<Attributes>
<Attribute>
		<Name>OS</Name>
		<Value><![CDATA[Mac OSX (Version Unknown) Unknown]]></Value>
	</Attribute>
<Attribute>
		<Name>TIME_ZONE</Name>
		<Value><![CDATA[11]]></Value>
	</Attribute>
<Attribute>
		<Name>SCREEN_ATTRIBUTES</Name>
		<Value><![CDATA[24|1280|800|1280|777]]></Value>
	</Attribute>
<Attribute>
		<Name>USER_AGENT</Name>
		<Value><![CDATA[mozilla/5.0 (macintosh; intel mac os x 10_14_1) applewebkit/537.36 (khtml, like gecko) chrome/70.0.3538.110 safari/537.36|MacIntel]]></Value>
	</Attribute>
<Attribute>
		<Name>BROWSER_VER</Name>
		<Value><![CDATA[Chrome 70]]></Value>
	</Attribute>
<Attribute>
		<Name>LANGUAGES</Name>
		<Value><![CDATA[BRW=en-AU|SYS=|USR=]]></Value>
	</Attribute>
<Attribute>
		<Name>FLASH_VER</Name>
		<Value><![CDATA[Not Installed]]></Value>
	</Attribute>
<Attribute>
		<Name>SILVERLIGHT</Name>
		<Value><![CDATA[Not Installed]]></Value>
	</Attribute>
<Attribute>
		<Name>PLUGINS</Name>
		<Value><![CDATA[Plugin 0: Chrome PDF Plugin; Portable Document Format; internal-pdf-viewer; (Portable Document Format; application/x-google-chrome-pdf; pdf). Plugin 1: Chrome PDF Viewer; ; mhjfbmdgcfjbbpaeojofohoefgiehjai; (; application/pdf; pdf). Plugin 2: Native Client; ; internal-nacl-plugin; (Native Client Executable; application/x-nacl; ) (Portable Native Client Executable; application/x-pnacl; ). ]]></Value>
	</Attribute>
<Attribute>
		<Name>FONTS</Name>
		<Value><![CDATA[Arial Black|Courier New|Menlo|Papyrus|Plantagenet Cherokee|Tahoma|Trebuchet MS|Webdings]]></Value>
	</Attribute>
<Attribute>
		<Name>TIME_SKEW</Name>
		<Value><![CDATA[]]></Value>
	</Attribute>
<Attribute>
		<Name>GEOIP_HTML5</Name>
		<Value><![CDATA[undefined]]></Value>
	</Attribute>
<Attribute>
		<Name>CANVAS</Name>
		<Value><![CDATA[396d29a426c8717b7a2514f4acd640f68a902e0af96399119f32278d856b79cf]]></Value>
	</Attribute>
<Attribute>
		<Name>LOCAL_IP</Name>
		<Value><![CDATA[Local IP is not defined]]></Value>
	</Attribute>
<Attribute>
		<Name>HASH</Name>
		<Value><![CDATA[e85142af8aef046709b146add7998b830c0dd26e1e01d9e5535bf3fcbdc6f4ef]]></Value>
	</Attribute>
	</Attributes>
</devicefingerprint>`;

  // Send the request.
  request(host, {
    headers: {
      'User-Agent': config.userAgent,
    },
    jar: j,
    method: req.method,
    body: req.method === 'POST' ? req.body : undefined,
    json: true,
  }, (error, response, body) =>
    {
      if (error)
      {
        res.end('Error 3.1');
        return;
      }

      if (req.method === 'POST')
      {
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(body));
      } else
      {
        const isHtml = /<html>/gmi.test(body);

        // If the response is an HTML, get the final cookie.
        if (isHtml)
        {
          request('https://shop.coles.com.au/fp/awasah/',
            {
              headers: {
                'Content-type': 'application/xml',
              },
              jar: j,
              method: 'POST',
              body: payload,
            }, (error2, response2, body2) =>
            {
              if (error2)
              {
                res.end('Error 3.2');
                return;
              }
              // Now that we have the final cookie, send the request again
              // to get the JSON we want.
              request(host,
                {
                  headers: {
                    'User-Agent': config.userAgent,
                  },
                  jar: j,
                  method: 'GET',
                  json: true,
                }, (error3, response3, body3) =>
                {
                  if (error3)
                  {
                    res.end('Error 3.3');
                    return;
                  }
                  res.setHeader('Content-Type', 'application/json');
                  res.end(JSON.stringify(body3));
                },
              );
            },
          );
        }
        else
        {
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify(body));
        }
      }
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
