import * as React from 'reactn';
import ICard, { IPrice } from '../../interfaces/ICard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import Card from 'reactstrap/lib/Card';
import CardBody from 'reactstrap/lib/CardBody';
import CardTitle from 'reactstrap/lib/CardTitle';
import CardImg from 'reactstrap/lib/CardImg';
import CardText from 'reactstrap/lib/CardText';
import Button from 'reactstrap/lib/Button';

interface IProps
{
  content: ICard;
  parent: 'search' | 'list';
}

const ResultCard = ({ content, parent }: IProps) =>
{
  const [addBarcode, setAddBarcode] = React.useGlobal('addBarcode');
  const [undoAddBarcode, setUndoAddBarcode] = React.useGlobal('undoAddBarcode');
  const [removeBarcode, setRemoveBarcode] = React.useGlobal('removeBarcode');

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
      </CardBody>
      <Button
        color={content.added ? 'danger' : 'secondary'}
        className="mx-3 mb-3 btn-labeled icn-btn"
        onClick={
          parent === 'list'
            ? removeBarcode.bind(this, content.barcode)
            : content.added
              ? undoAddBarcode.bind(this, content.barcode)
              : addBarcode.bind(this, content.barcode)
        }
      >
        <span className="btn-label">
          <FontAwesomeIcon icon={content.added ? faTrash : faPlus} />
        </span>
        {
          content.added ? 'Remove' : 'Add'
        }
      </Button>
    </Card>
  );
};

export default ResultCard;
