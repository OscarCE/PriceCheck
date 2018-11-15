import * as React from 'reactn';
import MyListArea from './MyListArea';
import * as localForage from 'localforage';

interface IState
{
  barcodes: string[];
}
class MyListPage extends React.Component<any, IState>
{
  constructor(props: any)
  {
    super(props);

    this.removeBarcode = this.removeBarcode.bind(this);
    this.state = {
      barcodes: [],
    };
    this.setGlobal({
      removeBarcode: this.removeBarcode,
    });
  }

  public render()
  {
    return (
      <MyListArea barcodeList={this.state.barcodes} />
    );
  }

  public async componentDidMount()
  {
    try
    {
      // Load the barcode list from the local db to the global state.
      let bcs: string[] = await localForage.getItem('barcodes') as string[];
      bcs = bcs || [];
      this.setState({
        barcodes: bcs,
      });
    } catch (error)
    {
      alert('Error while loading the items.');
    }
  }
  private removeBarcode = async (barcode: string) =>
  {
    try
    {
      // From the current barcode list, remove the selected item.
      const bcs: string[] = await localForage.getItem('barcodes') as string[];
      const newBcs: string[] = bcs.filter((bc) => bc !== barcode);

      // Save the new list to the local db.
      localForage.setItem('barcodes', newBcs);
      this.setState({
        barcodes: newBcs,
      });
    }
    catch (error)
    {
      alert('Error while deleting the item.');
    }
  }
}

export default MyListPage;
