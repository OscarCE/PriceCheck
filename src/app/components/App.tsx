import * as React from 'react';
import { Switch, Route } from 'react-router';

import { Container, Row, Col } from 'reactstrap';

import './App.css';
import NavBar from './UI/Navbar';
import MyListPage from './MyListPage/MyListPage';
import SearchPage from './SearchPage/SearchPage';
import ScanPage from './ScanPage/ScanPage';
import NoMatch from './Other/NoMatch';

class App extends React.Component<IProps, IState>
{
  constructor(props: IProps)
  {
    super(props);

    this.state = {
      products: [],
    };
  }

  public render()
  {
    return (
      <div className="h-100">
        <Container fluid={true} className="d-flex h-100 flex-column">
          <Row>
            <Col className="ui-navbar">
              <NavBar />
            </Col>
          </Row>
          <Row className="d-flex justify-content-start mt-3 fill-flex">
            {/* <Col> */}
              <Switch>
                <Route exact={true} path="/" component={MyListPage} />
                <Route path="/search/:term" component={SearchPage} />
                <Route path="/search" component={SearchPage} />
                <Route path="/scan" component={ScanPage} />
                <Route component={NoMatch} />
              </Switch>
            {/* </Col> */}
          </Row>
        </Container>
      </div>
    );
  }
}

export default App;

interface IProps
{
  lista?: string[];
}
interface IState
{
  products: string[];
}
