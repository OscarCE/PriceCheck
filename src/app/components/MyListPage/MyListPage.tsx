import * as React from 'reactn';
import MyListArea from './MyListArea';
import * as localForage from 'localforage';

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
      <MyListArea barcodeList={this.global.barcodes} />
    );
  }

  public async componentDidMount()
  {
    try {
      let bcs: string[] = await localForage.getItem('barcodes') as string[];
      bcs = bcs || [];
      this.setGlobal({
        barcodes: bcs,
      });
    } catch (error) {
      alert('Error while loading My List items.');
    }
  }
}

export default MyListPage;
