import * as React from 'reactn';
import { Card, CardBody, CardText, CardTitle, CardImg, Button } from 'reactstrap';
import ICard, { IPrice } from '../../interfaces/ICard';
import * as localForage from 'localforage';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';

interface IProps
{
  product: ICard;
}

const MyListCard = (props: IProps) =>
{
  const [removeBarcode, setRemoveBarcode] = React.useGlobal('removeBarcode');

  return (
    <Card className="h-100">
      <CardBody>
        <CardTitle className="card-product-title">
          {props.product && props.product.name}
        </CardTitle>
        <CardImg className="p-3" src={props.product && props.product.imageUrl} />
        <CardText className="card-content">
          Content: {props.product && props.product.size}
        </CardText>
        <CardText tag="div" className="card-price-list">
          {
            props.product.prices.map((price: IPrice) =>
            {
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
        color="danger"
        className="mx-3 mb-3 btn-labeled"
        onClick={removeBarcode.bind(this, props.product.barcode)}
      >
        <span className="btn-label">
          <FontAwesomeIcon icon={faTrashAlt} />
        </span>
        Remove
      </Button>
    </Card>
  );
};

export default MyListCard;
