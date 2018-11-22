import * as React from 'react';
import ICard from '../../interfaces/ICard';
import ResultCard from '../Cards/ResultCard';
import ResultRow from '../Cards/ResultRow';
import Row from 'reactstrap/lib/Row';
import Col from 'reactstrap/lib/Col';
import Button from 'reactstrap/lib/Button';
import { faThList, faThLarge } from '@fortawesome/free-solid-svg-icons';
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
              <FontAwesomeIcon icon={mode === 'card' ? faThList : faThLarge} />
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
                  sm={mode === 'card' ? 4 : 11}
                  md={mode === 'card' ? 3 : 9}
                  lg={mode === 'card' ? 2 : 6}
                  className="mb-3 mx-auto px-2"
                >
                  {
                    mode === 'card'
                      ? <ResultCard parent="search" content={result} />
                      : <ResultRow parent="search" content={result} />
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
