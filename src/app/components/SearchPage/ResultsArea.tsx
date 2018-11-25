import * as React from 'react';
import ICard from '../../interfaces/ICard';
import SearchResults from './SearchResults';
import SearchEmptyScreen from '../Cards/ScreenBg';

interface IProps
{
  error: string;
  searching: boolean;
  results: ICard[];
}

const ResultsArea = ({ error, results, searching }: IProps) =>
{
  if (searching)
  {
    return <SearchEmptyScreen bg="searching" />;
  }
  else if (error)
  {
    return <SearchEmptyScreen bg="error" msg={error} />;
  }
  else if (results === undefined)
  {
    return <SearchEmptyScreen bg="initialSearch" />;
  }
  else if (results.length === 0)
  {
    return <SearchEmptyScreen bg="no-results" />;
  }
  else
  {
    return <SearchResults results={results} />;
  }
};

export default ResultsArea;
