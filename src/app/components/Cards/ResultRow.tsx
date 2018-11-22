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
    <Card className="result-row flex-row justify-content-between p-2 h-100">
      <CardImg src={content.imageUrl} />
      <CardTitle className="card-product-title p-2 flex-fill">
        {content.name}
        <CardText className="card-content">
          Content: {content.size}
        </CardText>
      </CardTitle>
      <CardText tag="div" className="card-price-list px-2 d-flex flex-column justify-content-around">
        {
          content.prices.map((price: IPrice) =>
          {
            return (
              <div key={price.id} className={'store-' + price.store + (price.special ? ' special' : '')}>
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
      <div className="d-flex pl-2">
        <Button
          color={content.added ? 'danger' : 'secondary'}
          onClick={
            parent === 'list' ? removeBarcode.bind(this, content.barcode) :
              content.added ? undoAddBarcode.bind(this, content.barcode) : addBarcode.bind(this, content.barcode)
          }
        >
          <FontAwesomeIcon icon={content.added ? faTrash : faPlus} />
        </Button>
      </div>
    </Card>
  );
};

export default ResultRow;
