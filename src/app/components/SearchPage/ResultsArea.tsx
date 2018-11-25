import * as React from 'react';
import ICard from '../../interfaces/ICard';
import SearchResults from './SearchResults';
import SearchEmptyScreen from '../Cards/ScreenBg';

interface IProps
{
  results: ICard[];
}

const ResultsArea = ({ results }: IProps) =>
{
  if (results === undefined)
  {
    return (
      <SearchEmptyScreen bg="initialSearch" />
    );
  }
  else if (results.length === 0)
  {
    return (
      <SearchEmptyScreen bg="no-results" />
    );
  }
  else
  {
    return (
      <SearchResults results={results} />
    );
  }
};

export default ResultsArea;
