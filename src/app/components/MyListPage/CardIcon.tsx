import * as React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import Card from 'reactstrap/lib/Card';
import CardBody from 'reactstrap/lib/CardBody';
import CardText from 'reactstrap/lib/CardText';
// tslint:disable-next-line:no-var-requires
const DeadFace = require('./../../assets/images/deadFace.svg');

interface IProps
{
  state: 'loading' | 'error';
}

const MyListLoadingCard = (props: IProps) =>
{
  return (
    <Card className="h-100 card-icon">
      <CardBody className="h-100">
        <CardText className="h-100 text-secondary d-flex align-items-center justify-content-center">
          {
            props.state === 'loading' && <FontAwesomeIcon size="3x" icon={faSpinner} pulse={true} />
          }
          {
            props.state === 'error' && <img className="icon" src={DeadFace} />
          }
        </CardText>
      </CardBody>
    </Card>
  );
};

export default MyListLoadingCard;
