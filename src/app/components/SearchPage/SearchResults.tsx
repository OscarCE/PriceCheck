import * as React from 'react';
import ICard from '../../interfaces/ICard';
import ResultCard from './ResultCard';
import ResultRow from './ResultRow';
import Row from 'reactstrap/lib/Row';
import Col from 'reactstrap/lib/Col';
import Button from 'reactstrap/lib/Button';
import { faThList } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Navbar from 'reactstrap/lib/Navbar';
import Nav from 'reactstrap/lib/Nav';

interface IProps
{
  results: ICard[];
}

interface IState
{
  mode: 'card' | 'row';
}

class SearchResults extends React.Component<IProps, IState>
{
  constructor(props)
  {
    super(props);

    this.toggleMode = this.toggleMode.bind(this);
    this.state = {
      mode: 'card',
    };
  }
  public render()
  {
    const { mode } = this.state;

    return (
      <>
        <Navbar color="light" className="justify-content-end">
          <Nav>
            <Button onClick={this.toggleMode}>
              <FontAwesomeIcon icon={faThList} />
            </Button>
          </Nav>
        </Navbar>
        <Row noGutters={true} className="text-dark bg-light" >
          {
            this.props.results.map((result: ICard) =>
            {
              return (
                <Col
                  key={Math.random() * 1000}
                  xs={mode === 'card' ? 6 : 12}
                  sm={mode === 'card' ? 4 : 12}
                  md={mode === 'card' ? 3 : 12}
                  lg={mode === 'card' ? 2 : 12}
                  className="mb-3 px-2"
                >
                  {
                    mode === 'card' ? <ResultCard content={result} /> : <ResultRow content={result} />
                  }
                </Col>
              );
            })
          }
        </Row>
      </>
    );
  }

  private toggleMode()
  {
    this.setState((prevState) => (
      {
        mode: prevState.mode === 'card' ? 'row' : 'card',
      }
    ));
  }
}

export default SearchResults;
