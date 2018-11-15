import * as React from 'react';
import { Row } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const SearchStart = (props: any) =>
{
  return (
    <Row className="fill-flex d-flex justify-content-center align-items-center lightgray">
      <FontAwesomeIcon size="10x" flip="horizontal" icon={faSearch} />
    </Row>
  );
};

export default SearchStart;
