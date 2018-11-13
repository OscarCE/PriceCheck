import * as React from 'react';
import { Row, Container, Col } from 'reactstrap';
import ICard from '../../interfaces/ICard';
import ResultCard from './ResultCard';

interface IProps
{
  results: ICard[];
}

const SearchResults = ({ results }: IProps) =>
{
  return (
    <Row noGutters={true}>
      {
        results.map((result: ICard) =>
        {
          return (
            <Col key={Math.random() * 1000} xs="6" sm="4" className="mb-3 px-2">
              <ResultCard content={result} />
            </Col>
          );
        })
      }
    </Row>
  );
};

export default SearchResults;
