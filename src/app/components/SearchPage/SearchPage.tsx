import * as React from 'reactn';
import { Container } from 'reactstrap';
import * as localForage from 'localforage';
import ResultsArea from './ResultsArea';
import ICard from '../../interfaces/ICard';
import SearchFields from './SearchFields';
import { busqueda } from '../../api/Search';

interface IState
{
  searchTerm: string;
  searchResults: ICard[];
  searching: boolean;
}
class SearchPage extends React.Component<any, IState>
{
  constructor(props: any)
  {
    super(props);

    this.handleSearch = this.handleSearch.bind(this);
    this.addBarcode = this.addBarcode.bind(this);
    this.state = {
      searchTerm: '',
      searchResults: undefined,
      searching: false,
    };

    this.setGlobal({
      addBarcode: this.addBarcode,
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
      <Container fluid={true} className="fill-flex d-flex h-100 flex-column">
        <SearchFields
          searchAction={this.handleSearch}
          searching={this.state.searching}
          initialText={this.props.match.params.term || ''}
        />
        <ResultsArea results={this.state.searchResults} />
      </Container>
    );
  }

  private async handleSearch(event: any)
  {
    event.preventDefault();

    const term: string = (document.querySelector('#searchField') as HTMLInputElement).value;
    this.props.history.push('/search/' + term);

    this.performSearchAsync(term);
  }

  private async performSearchAsync(term: string)
  {
    this.setState({
      searching: true,
    });

    try
    {
      const resultados: ICard[] = await busqueda(term);

      // Chack items already added to our list.
      const bcs: string[] = await localForage.getItem('barcodes') as string[];
      resultados.forEach((item: ICard) =>
      {
        item.added = bcs.find((bc) => item.barcode === bc) && true;
      });

      this.setState({
        searchTerm: term,
        searchResults: resultados,
        searching: false,
      });

    } catch (err)
    {
      this.setState({
        searching: false,
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
}

export default SearchPage;