import * as React from 'react';
import Async from 'react-promise';
import CardIcon from './CardIcon';
import MyListCard from './MyListCard';

import * as ProductFn from './../../api/Search';
import ICard from '../../interfaces/ICard';
import Col from 'reactstrap/lib/Col';

interface IProps {
  barcodeList: string[];
}

const MyListArea = (props: IProps) => {
  return (
    <>
      {
        ProductFn.barcodeListSearch(props.barcodeList).map((pp: Promise<ICard>) => {
          return (
            <Col key={Math.random() * 1000} xs="6" sm="4" md="3" lg="2" className="mb-3 px-2">
              <Async
                promise={pp}
                then={productCard}
                catch={ErrorCard}
                pending={LoadingCard}
              />
            </Col>
          );
        })
      }
    </>
  );
};

export default MyListArea;

const LoadingCard = () => {
  return (
    <CardIcon state="loading" />
  );
};
const ErrorCard = () => {
  return (
    <CardIcon state="error" />
  );
};
const productCard = (prod: ICard) => {
  return (
    <MyListCard product={prod} />
  );
};
