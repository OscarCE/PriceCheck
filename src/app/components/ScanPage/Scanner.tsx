import * as React from 'react';
import * as Quagga from 'quagga';

interface IProps
{
  onDetected: (result: string) => void;
}

class Scanner extends React.Component<IProps, any>
{
  constructor(props: IProps)
  {
    super(props);

    this._onDetected = this._onDetected.bind(this);
  }

  public componentDidMount()
  {
    Quagga.init({
      inputStream: {
        type: 'LiveStream',
        constraints: {
          width: 640,
          height: 480,
          facingMode: 'environment', // or user
        },
      },
      locator: {
        patchSize: 'medium',
        halfSample: true,
      },
      numOfWorkers: 2,
      decoder: {
        readers: ['ean_reader'],
      },
      locate: true,
    }, (err: Error) =>
      {
        if (err)
        {
          // tslint:disable-next-line:no-console
          console.log('error', err);
          return;
        }
        Quagga.start();
      });
    Quagga.onDetected(this._onDetected);
  }

  public componentWillUnmount()
  {
    Quagga.offDetected(this._onDetected);
  }

  public render()
  {
    return (
      <div id="interactive" className="viewport" />
    );
  }

  private _onDetected(result: any)
  {
    this.props.onDetected(result);
  }
}

export default Scanner;
