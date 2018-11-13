import * as React from 'react';

import { Row } from 'reactstrap';
// tslint:disable-next-line:no-var-requires
const DesertImg = require('./../../assets/images/desert.svg');

const SearchNoMatch = (props) =>
{
  return (
    <div className="fill-flex d-flex flex-column justify-content-center align-items-center lightgray no-match">
      <div className="w-50">
        <img className="w-100" src={DesertImg} />
      </div>
      <div className="note">
        No results found.
      </div>
    </div>
  );
};

export default SearchNoMatch;
