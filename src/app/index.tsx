import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './components/App';

import { BrowserRouter as Router } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';

declare let module: any;

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
