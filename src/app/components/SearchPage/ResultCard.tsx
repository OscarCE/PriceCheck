import * as React from 'reactn';
import { Card, CardBody, CardTitle, CardText, Button, CardImg } from 'reactstrap';
import ICard, { IPrice } from '../../interfaces/ICard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

interface IProps {
  content: ICard;
}

const ResultCard = ({ content }: IProps) => {
  const [addBarcode, setAddBarcode] = React.useGlobal('addBarcode');

  return (
    <Card className="h-100 fit-height">
      <CardBody>
        <CardTitle className="card-product-title">
          {content.name}
        </CardTitle>
        <CardImg className="d-block py-2 w-75 mx-auto" src={content.imageUrl} />
        <CardText className="card-content">
          Content: {content.size}
        </CardText>
        <CardText tag="div" className="card-price-list">
          {
            content.prices.map((price: IPrice) => {
              return (
                <div key={price.id} className={'store-' + price.store.toLowerCase()}>
                  <span className="logo">{
                    price && price.store.toUpperCase()
                  }</span> {
                    price.price ? price.price.toLocaleString('en-AU', { style: 'currency', currency: 'AUD' }) : 'N/A'
                  } {
                    price.cupString && `(${price.cupString})`
                  }
                </div>
              );
            })
          }
        </CardText>
      </CardBody>
      <Button
        color={content.added ? 'success' : 'secondary'}
        disabled={content.added}
        className="mx-3 mb-3 btn-labeled icn-btn"
        onClick={addBarcode.bind(this, content.barcode)}
      >
        <span className="btn-label">
          <FontAwesomeIcon icon={faCheck} />
        </span>
        {
          content.added ? 'Added' : 'Add'
        }
      </Button>
    </Card>
  );
};

export default ResultCard;
