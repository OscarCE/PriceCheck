import * as React from 'react';
import SVG from 'react-inlinesvg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

// tslint:disable-next-line:no-var-requires
const DesertImg = require('./../../assets/images/desert.svg');

interface IProps
{
  bg: 'start' | 'no-results';
}
const SearchEmptyScreen = ({ bg }: IProps) =>
{
  const noResults = (
    <>
      <div>
        <SVG className="span-svg-100" src={DesertImg} />
      </div>
      <div className="note">
        No results found.
    </div>
    </>
  );

  const start = (
    <FontAwesomeIcon size="10x" flip="horizontal" icon={faSearch} />
  );

  return (
    <div className="d-flex flex-column fill-flex justify-content-center align-items-center lightgray">
      {
        bg === 'start' ? start : noResults
      }
    </div>
  );
};

export default SearchEmptyScreen;
