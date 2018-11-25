import * as React from 'react';
import Async from 'react-promise';
import CardIcon from './CardIcon';
import ICard from '../../interfaces/ICard';
import Col from 'reactstrap/lib/Col';
import ResultCard from '../Cards/ResultCard';
import Navbar from 'reactstrap/lib/Navbar';
import Nav from 'reactstrap/lib/Nav';
import Button from 'reactstrap/lib/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThList, faThLarge } from '@fortawesome/free-solid-svg-icons';
import Row from 'reactstrap/lib/Row';
import ResultRow from '../Cards/ResultRow';
import ScreenBg from '../Cards/ScreenBg';

interface IProps
{
  listProds: Array<Promise<ICard>>;
}

interface IState
{
  mode: 'card' | 'row';
}

class MyListArea extends React.Component<IProps, IState>
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
        {
          this.props.listProds.length > 0
            ? <Navbar color="light" className="justify-content-end">
              <Nav>
                <Button onClick={this.toggleMode}>
                  <FontAwesomeIcon icon={mode === 'card' ? faThList : faThLarge} />
                </Button>
              </Nav>
            </Navbar>
            : ''
        }
        <Row noGutters={true} className="text-dark bg-light h-100" >
          {
            this.props.listProds.length === 0
              ? <ScreenBg bg="emptyList" />
              : this.props.listProds.map((pp: Promise<ICard>, index: number) =>
              {
                return (
                  <Col
                    key={Math.random() * 1000}
                    xs={mode === 'card' ? 6 : 12}
                    sm={mode === 'card' ? 4 : 12}
                    md={mode === 'card' ? 3 : 12}
                    lg={mode === 'card' ? 2 : 6}
                    className="mb-3 px-2 mx-auto"
                  >
                    <Async
                      promise={pp}
                      then={mode === 'card' ? productCard : productRow}
                      catch={ErrorCard}
                      pending={LoadingCard}
                    />
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

export default MyListArea;

const LoadingCard = () =>
{
  return (
    <CardIcon state="loading" />
  );
};
const ErrorCard = () =>
{
  return (
    <CardIcon state="error" />
  );
};
const productCard = (prod: ICard) =>
{
  return (
    <ResultCard parent="list" content={prod} />
  );
};
const productRow = (prod: ICard) =>
{
  return (
    <ResultRow parent="list" content={prod} />
  );
};
