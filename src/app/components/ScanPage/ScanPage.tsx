import * as React from 'react';
import Scanner from './Scanner';

interface IState
{
  scanning: boolean;
  results: string[];
}
class ScanPage extends React.Component<any, IState> {
  constructor(props: any)
  {
    super(props);
    this.state = {
      scanning: false,
      results: [],
    };

    this._scan = this._scan.bind(this);
    this._onDetected = this._onDetected.bind(this);
  }

  public render()
  {
    return (
      <div>
        <Scanner onDetected={this._onDetected} />
      </div>
    );
  }

  private _scan()
  {
    this.setState((prevState) => ({
      scanning: !prevState.scanning,
    }));
  }

  private _onDetected(result)
  {
    this.setState((prevState) => ({
      results: prevState.results.concat([result]),
    }));
    this.props.history.push('/search/' + result.codeResult.code);
  }
}

export default ScanPage;
