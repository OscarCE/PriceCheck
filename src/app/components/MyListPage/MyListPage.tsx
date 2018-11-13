import * as React from 'react';
import MyListArea from './MyListArea';

interface IState
{
  products: string[];
}
class MyListPage extends React.Component<any, IState>
{
  constructor(props)
  {
    super(props);
  }

  public render()
  {
    return (
      <MyListArea barcodeList={this.state.products} />
    );
  }
}

export default MyListPage;
