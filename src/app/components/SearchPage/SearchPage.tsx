import * as React from 'reactn';
import * as localForage from 'localforage';
import ResultsArea from './ResultsArea';
import ICard from '../../interfaces/ICard';
import SearchFields from './SearchFields';
import { busqueda } from '../../api/Search';
import Container from 'reactstrap/lib/Container';

interface IState
{
  searchTerm: string;
  searchResults: ICard[];
  searching: boolean;
  error: string;
}
class SearchPage extends React.Component<any, IState>
{
  constructor(props: any)
  {
    super(props);

    this.handleSearch = this.handleSearch.bind(this);
    this.addBarcode = this.addBarcode.bind(this);
    this.undoAddBarcode = this.undoAddBarcode.bind(this);

    this.state = {
      searchTerm: '',
      searchResults: undefined,
      searching: false,
      error: undefined,
    };

    this.setGlobal({
      addBarcode: this.addBarcode,
      undoAddBarcode: this.undoAddBarcode,
    });
  }

  public componentDidMount()
  {
    const term: string = this.props.match.params.term || '';
    if (term)
    {
      this.performSearchAsync(term);
    }
  }

  public render()
  {
    return (
      <Container fluid={true} className="fill-flex d-flex flex-column">
        <SearchFields
          searchAction={this.handleSearch}
          searching={this.state.searching}
          initialText={this.props.match.params.term || ''}
        />
        <ResultsArea
          error={this.state.error}
          searching={this.state.searching}
          results={this.state.searchResults}
        />
      </Container>
    );
  }

  private async handleSearch(event: any)
  {
    event.preventDefault();

    const searchField: HTMLInputElement = (document.querySelector('#searchField') as HTMLInputElement);
    searchField.blur();
    const term: string = searchField.value;
    this.props.history.push('/search/' + term);

    this.performSearchAsync(term);
  }

  private async performSearchAsync(term: string)
  {
    this.setState({
      searching: true,
      error: undefined,
    });

    try
    {
      const resultados: ICard[] = await busqueda(term);

      // Check items already added to our list.
      const bcs: string[] = (await localForage.getItem('barcodes') as string[]) || [];
      resultados.forEach((item: ICard) =>
      {
        item.added = bcs.find((bc) => item.barcode === bc) && true;
      });

      this.setState({
        searchTerm: term,
        searchResults: resultados,
        searching: false,
        error: undefined,
      });

    } catch (err)
    {
      this.setState({
        searching: false,
        error: 'An error ocurred while searching.',
      });
    }
  }

  private async addBarcode(newBarcode: string)
  {
    try
    {
      // Get all the items from the local db. If it is empty, assign an empty array.
      let bcs: string[] = await localForage.getItem('barcodes') as string[];
      bcs = bcs || [];

      // Only add the item if it is not in the list already.
      const repeated = bcs.filter((oldBarcode) => oldBarcode === newBarcode);
      if (repeated.length === 0)
      {
        // Add it to the local db.
        localForage.setItem('barcodes', bcs.concat(newBarcode));

        // New array with added items marked as added.
        const newResults = this.state.searchResults.map((item) =>
        {
          if (item.barcode === newBarcode)
          {
            item.added = true;
          }
          return item;
        });

        // Pass it to the state so it gets re-drawn.
        this.setState({
          searchResults: newResults,
        });
      }
      else
      {
        alert(`Item already in list. [${newBarcode}]`);
      }
    }
    catch (error)
    {
      alert('Error while adding the item.');
    }
  }

  private async undoAddBarcode(newBarcode: string)
  {
    try
    {
      // Get all the items from the local db. If it is empty, assign an empty array.
      let bcs: string[] = await localForage.getItem('barcodes') as string[];
      bcs = bcs || [];

      // Only add the item if it is not in the list already.
      const filteredList = bcs.filter((oldBarcode) => oldBarcode !== newBarcode);
      localForage.setItem('barcodes', filteredList);

      const newResults = this.state.searchResults.map((item) =>
      {
        if (item.barcode === newBarcode)
        {
          item.added = false;
        }
        return item;
      });

      this.setState({
        searchResults: newResults,
      });
    }
    catch (error)
    {
      alert('Error while removing the item.');
    }
  }
}

export default SearchPage;
