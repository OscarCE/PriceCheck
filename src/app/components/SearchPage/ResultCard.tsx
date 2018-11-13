import * as React from 'react';
import { Card, CardBody, CardTitle, CardText, Button, CardImg } from 'reactstrap';
import ICard, { IPrice } from '../../interfaces/ICard';

interface IProps
{
  content: ICard;
}

const ResultCard = ({ content }: IProps) =>
{
  const addToProducts = (barcode: string) =>
  {
    alert(`Add barcode: ${barcode}`);
  };

  return (
    <Card className="h-100">
      <CardBody>
        <CardTitle>
          {content.name}
        </CardTitle>
        <CardImg src={content.imageUrl} />
        <CardText>
          Content: {content.size}
        </CardText>
        <CardText>
          {
            content.prices.map((price: IPrice) =>
            {
              return (
                <div key={price.id}>
                  {
                    price && price.store.toUpperCase()
                  }: {
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
        className="align-self-end mx-3 mb-3"
        onClick={addToProducts.bind(this, content.barcode)}
      >
        Add to my list
      </Button>
    </Card>
  );
};

export default ResultCard;
