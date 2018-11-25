import * as React from 'react';
import SVG from 'react-inlinesvg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faSpinner } from '@fortawesome/free-solid-svg-icons';

// tslint:disable-next-line:no-var-requires
const DesertImg = require('./../../assets/images/desert.svg');
// tslint:disable-next-line:no-var-requires
const DeadFace = require('./../../assets/images/deadFace.svg');

interface IProps
{
  bg: 'initialSearch' | 'no-results' | 'emptyList' | 'searching' | 'error';
  msg?: string;
}

const ScreenBg = ({ bg, msg }: IProps) =>
{
  const noResults = (
    <>
      <div>
        <SVG className="span-svg-100" src={DesertImg} />
      </div>
      <div className="note">
        No results found.
      </div>
    </>
  );

  const initialSearch = (
    <FontAwesomeIcon size="10x" flip="horizontal" icon={faSearch} />
  );

  const searching = (
    <FontAwesomeIcon size="10x" icon={faSpinner} pulse={true} />
  );

  const emptyList = (
    <>
      <div>
        <SVG className="span-svg-100" src={DesertImg} />
      </div>
      <div className="note">
        Your list is empty. Try adding some items.
      </div>
    </>
  );

  const error = (
    <>
      <div>
        <SVG className="span-svg-100" src={DeadFace} />
      </div>
      <div className="note">
        {
          msg
        }
      </div>
    </>
  );

  const bgScreen = (bgName: string) =>
  {
    switch (bgName)
    {
      case 'initialSearch':
        return initialSearch;
      case 'no-results':
        return noResults;
      case 'emptyList':
        return emptyList;
      case 'searching':
        return searching;
      case 'error':
        return error;
    }
  };

  return (
    <div className="d-flex flex-column fill-flex justify-content-center align-items-center lightgray">
      {
        bgScreen(bg)
      }
    </div>
  );
};

export default ScreenBg;
