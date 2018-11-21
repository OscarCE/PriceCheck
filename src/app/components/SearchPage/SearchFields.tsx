import * as React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import Row from 'reactstrap/lib/Row';
import Col from 'reactstrap/lib/Col';
import Form from 'reactstrap/lib/Form';
import InputGroup from 'reactstrap/lib/InputGroup';
import Input from 'reactstrap/lib/Input';
import InputGroupAddon from 'reactstrap/lib/InputGroupAddon';
import Button from 'reactstrap/lib/Button';

interface IProps
{
  searchAction: any;
  searching: boolean;
  initialText?: string;
}

const SearchFields = (props: IProps) =>
{
  return (
    <Row className="mb-3 min-content">
      <Col>
        <Form action="." onSubmit={props.searchAction}>
          <InputGroup>
            <Input
              id="searchField"
              className="rounded"
              defaultValue={props.initialText || ''}
              placeholder="Enter a search term or barcode"
              type="search"
            />
            <InputGroupAddon addonType="append">
              <Button
                color="primary"
                className="rounded-circle ml-3"
                onClick={props.searchAction}
              >
                <FontAwesomeIcon flip="horizontal" spin={props.searching} icon={faSearch} />
              </Button>
            </InputGroupAddon>
          </InputGroup>
        </Form>
      </Col>
    </Row>
  );
};

export default SearchFields;
