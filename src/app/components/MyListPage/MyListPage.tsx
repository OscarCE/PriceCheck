import * as React from 'reactn';
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
      <MyListArea barcodeList={this.global.products} />
    );
  }
}

export default MyListPage;
