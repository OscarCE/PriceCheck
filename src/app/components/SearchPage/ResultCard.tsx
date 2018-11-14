import * as React from 'reactn';
import { Card, CardBody, CardTitle, CardText, Button, CardImg } from 'reactstrap';
import ICard, { IPrice } from '../../interfaces/ICard';

interface IProps
{
  content: ICard;
}

const ResultCard = ({ content }: IProps) =>
{
  const [prods, setProds] = React.useGlobal('products');

  const addToProducts = (barcode: string) =>
  {
    const a = prods.filter((oldBarcode) => oldBarcode === barcode);
    if (a.length === 0)
    {
      setProds(prods.concat(barcode));
    }
    else
    {
      alert(`Product already in list. [${barcode}]`);
    }
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
        <CardText tag="div">
          {
            content.prices.map((price: IPrice) =>
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
        className="align-self-end mx-3 mb-3"
        onClick={addToProducts.bind(this, content.barcode)}
      >
        Add to my list
      </Button>
    </Card>
  );
};

export default ResultCard;
