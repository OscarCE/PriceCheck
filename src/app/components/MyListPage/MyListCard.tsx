import * as React from 'react';
import { Card, CardBody, CardText, CardTitle, CardImg, Button } from 'reactstrap';
import ICard, { IPrice } from '../../interfaces/ICard';

interface IProps
{
  product: ICard;
}

const MyListCard = (props: IProps) =>
{
  const removeHandler = (barcode: string) =>
  {
    alert(`Remove barcode: ${barcode}`);
  };

  return (
    <Card className="h-100">
      <CardBody>
        <CardTitle>
          {props.product && props.product.name}
        </CardTitle>
        <CardImg className="p-3" src={props.product && props.product.imageUrl} />
        <CardText>
          Content: {props.product && props.product.size}
        </CardText>
        <CardText tag="div">
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
        color="secondary"
        className="mx-3 mb-3"
        onClick={removeHandler.bind(this, props.product.barcode)}
      >
        Remove
      </Button>
    </Card>
  );
};

export default MyListCard;
