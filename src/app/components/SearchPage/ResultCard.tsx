import * as React from 'reactn';
import { Card, CardBody, CardTitle, CardText, Button, CardImg } from 'reactstrap';
import ICard, { IPrice } from '../../interfaces/ICard';
import * as localForage from 'localforage';

interface IProps
{
  content: ICard;
}

const ResultCard = ({ content }: IProps) =>
{
  // const [prods, setProds] = React.useGlobal('barcodes');

  const addToProducts = async (newBarcode: string) =>
  {
    try
    {
      // Get all the items from the DB, if it is empty, assign an empty array.
      let bcs: string[] = await localForage.getItem('barcodes') as string[];
      bcs = bcs || [];

      // Only add the item if it is not in the list already.
      const repeated = bcs.filter((oldBarcode) => oldBarcode === newBarcode);
      if (repeated.length === 0)
      {
        localForage.setItem('barcodes', bcs.concat(newBarcode));
        // setProds(bcs.concat(newBarcode));
        React.setGlobal({
          barcodes: bcs.concat(newBarcode),
        });
      }
      else
      {
        alert(`Item already in list. [${newBarcode}]`);
      }
    }
    catch (error)
    {
      alert('Error while adding the item.');
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
