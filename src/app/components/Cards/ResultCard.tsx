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
      </CardBody>
      <Button
        color={content.added ? 'danger' : 'secondary'}
        className="d-flex mx-3 w-100 btn-labeled icn-btn"
        onClick={
          parent === 'list'
            ? removeBarcode.bind(this, content.barcode)
            : content.added
              ? undoAddBarcode.bind(this, content.barcode)
              : addBarcode.bind(this, content.barcode)
        }
      >
        <span className="btn-icon">
          <FontAwesomeIcon icon={content.added ? faTrash : faPlus} />
        </span>
        <span className="btn-label">
          {
            content.added ? 'Remove' : 'Add'
          }
        </span>
      </Button>
    </Card>
  );
};

export default ResultCard;
