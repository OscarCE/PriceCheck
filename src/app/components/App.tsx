import * as React from 'react';
import { Switch, Route } from 'react-router';
import './App.css';
import NavBar from './UI/NavBar';
import MyListPage from './MyListPage/MyListPage';
import SearchPage from './SearchPage/SearchPage';
import ScanPage from './ScanPage/ScanPage';
import NoMatch from './Other/NoMatch';
import Container from 'reactstrap/lib/Container';
import Row from 'reactstrap/lib/Row';

class App extends React.Component<any, any>
{
  constructor(props: any)
  {
    super(props);
  }

  public render()
  {
    return (
      <div className="h-100">
        <Container fluid={true} className="d-flex h-100 flex-column min-content">
          <Row className="d-flex justify-content-start mt-3 fill-flex min-content navbar-padding">
            <Switch>
              <Route exact={true} path="/" component={MyListPage} />
              <Route path="/search/:term" component={SearchPage} />
              <Route path="/search" component={SearchPage} />
              <Route path="/scan" component={ScanPage} />
              <Route component={NoMatch} />
            </Switch>
          </Row>
          <NavBar />
        </Container>
      </div>
    );
  }
}

export default App;
