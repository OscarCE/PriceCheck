import * as React from 'reactn';
import ICard, { IPrice } from '../../interfaces/ICard';
import Card from 'reactstrap/lib/Card';
import CardImg from 'reactstrap/lib/CardImg';
import CardText from 'reactstrap/lib/CardText';
import CardTitle from 'reactstrap/lib/CardTitle';
import Button from 'reactstrap/lib/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';

interface IProps
{
  content: ICard;
  parent: 'search' | 'list';
}
const ResultRow = ({ content, parent }: IProps) =>
{
  const [addBarcode, setAddBarcode] = React.useGlobal('addBarcode');
  const [undoAddBarcode, setUndoAddBarcode] = React.useGlobal('undoAddBarcode');
  const [removeBarcode, setRemoveBarcode] = React.useGlobal('removeBarcode');

  return (
    <Card className="result-row flex-row justify-content-between h-100">
      <CardImg src={content.imageUrl} />
      <CardTitle className="card-product-title m-2 flex-fill">
        {content.name}
        <CardText className="card-content">
          Content: {content.size}
        </CardText>
      </CardTitle>
      <CardText tag="div" className="card-price-list m-2 d-flex flex-column justify-content-around">
        {
          content.prices.map((price: IPrice) =>
          {
            return (
              <div key={price.id} className={'store ' + price.store + (price.special ? ' special' : '')}>
                <div className="prices-container">
                  <span className="logo">
                    {
                      price && price.store.toUpperCase()
                    }
                  </span>
                  <span className="price">
                    {
                      price.price
                        ? price.price.toLocaleString('en-AU', { style: 'currency', currency: 'AUD' })
                        : 'N/A'
                    }
                  </span> {
                    ' '
                  } <span className="cupstring">
                    {
                      price.cupString && `${price.cupString}`
                    }
                  </span>
                </div>
              </div>
            );
          })
        }
      </CardText>
      <Button
        className="ml-2"
        color={content.added ? 'danger' : 'secondary'}
        onClick={
          parent === 'list' ? removeBarcode.bind(this, content.barcode) :
            content.added ? undoAddBarcode.bind(this, content.barcode) : addBarcode.bind(this, content.barcode)
        }
      >
        <FontAwesomeIcon icon={content.added ? faTrash : faPlus} />
      </Button>
    </Card>
  );
};

export default ResultRow;
