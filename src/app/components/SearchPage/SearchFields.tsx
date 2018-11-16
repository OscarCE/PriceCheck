import * as React from 'react';
import { Row, Col, InputGroup, InputGroupAddon, Input, Button, Form } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

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
        <Form onSubmit={props.searchAction}>
          <InputGroup>
            <Input
              id="searchField"
              className="rounded border-bottom"
              defaultValue={props.initialText || ''}
              placeholder="Enter a search term or barcode"
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
