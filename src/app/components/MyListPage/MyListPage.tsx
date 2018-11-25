import * as React from 'reactn';
import MyListArea from './MyListArea';
import * as localForage from 'localforage';
import Container from 'reactstrap/lib/Container';
import ICard from '../../interfaces/ICard';
import * as ProductFn from './../../api/Search';

interface IState
{
  barcodes: string[];
  listProds: Array<Promise<ICard>>;
}
class MyListPage extends React.Component<any, IState>
{
  constructor(props: any)
  {
    super(props);

    this.removeBarcode = this.removeBarcode.bind(this);
    this.state = {
      barcodes: [],
      listProds: [],
    };

    this.setGlobal({
      removeBarcode: this.removeBarcode,
    });
  }

  public render()
  {
    return (
      <Container fluid={true} className="fill-flex d-flex flex-column">
        <MyListArea listProds={this.state.listProds} />
      </Container>
    );
  }

  public async componentDidMount()
  {
    try
    {
      // Load the barcode list from the local db to the global state.
      let bcs: string[] = await localForage.getItem('barcodes') as string[];
      bcs = bcs || [];
      const arrayProds: Array<Promise<ICard>> = ProductFn.barcodeListSearch(bcs);

      this.setState({
        barcodes: bcs,
        listProds: arrayProds,
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

      // Delete the item from the array of promises based on the index
      // and update the state.
      this.state.listProds.map(async (item, ind, arr) =>
      {
        const it = await item;
        if (it.barcode === barcode)
        {
          arr.splice(ind, 1);
          this.setState({
            listProds: arr,
          });
        }
      });

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
