import * as React from 'react';

import SearchStart from './SearchStart';
import SearchNoMatch from './SearchNoMatch';
import ICard from '../../interfaces/ICard';
import SearchResults from './SearchResults';

interface IProps
{
  results: ICard[];
}

const ResultsArea = ({ results }: IProps) =>
{
  if (results === undefined)
  {
    return (
      <SearchStart />
    );
  }
  else if (results.length === 0)
  {
    return (
      <SearchNoMatch />
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
