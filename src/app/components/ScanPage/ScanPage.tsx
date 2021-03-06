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
        {this.state.scanning ? <Scanner onDetected={this._onDetected} /> : null}
      </div>
    );
  }

  public componentDidMount()
  {
    this.setState({
      scanning: true,
    });
  }

  public componentWillUnmount()
  {
    this.setState({
      scanning: false,
    });
  }

  private _scan()
  {
    this.setState((prevState) => ({
      scanning: !prevState.scanning,
    }));
  }

  private _onDetected(result: any)
  {
    this.setState((prevState) => ({
      results: prevState.results.concat([result]),
    }));
    this.props.history.push('/search/' + result.codeResult.code);
  }
}

export default ScanPage;
