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
    try
    {
      // Load the barcode list from the local db to the global state.
      let bcs: string[] = await localForage.getItem('barcodes') as string[];
      bcs = bcs || [];
      this.setGlobal({
        barcodes: bcs,
      });
    } catch (error)
    {
      alert('Error while loading the items.');
    }
  }
}

export default MyListPage;
