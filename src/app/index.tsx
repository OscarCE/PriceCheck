import * as React from 'reactn';
import * as ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import * as localForage from 'localforage';
import App from './components/App';

import 'bootstrap/dist/css/bootstrap.min.css';

declare let module: any;

localForage.config({
  name: 'PriceCheck',
  storeName: 'PriceCheckDB',
});

React.setGlobal({
  barcodes: [],
});

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById('root'),
);

if (module.hot)
{
  module.hot.accept();
}
