import * as React from 'react';
import { Container } from 'reactstrap';

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
  constructor(props)
  {
    super(props);

    this.handleSearch = this.handleSearch.bind(this);
    this.state = {
      searchTerm: '',
      searchResults: undefined,
      searching: false,
    };
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

  private async handleSearch(event: React.SyntheticEvent)
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
}

export default SearchPage;
