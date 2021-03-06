import * as React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faBarcode, faThLarge } from '@fortawesome/free-solid-svg-icons';
import Navbar from 'reactstrap/lib/Navbar';
import Nav from 'reactstrap/lib/Nav';
import NavItem from 'reactstrap/lib/NavItem';
import NavLink from 'reactstrap/lib/NavLink';

interface IState {
  open: boolean;
}
class NavBar extends React.Component<any, IState> {
  constructor(props: any) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      open: false,
    };
  }

  public render() {
    return (
      <Navbar color="dark" dark={true} expand="xs" fixed="bottom" className="ui-navbar">
        <Nav navbar={true} className="flex-fill nav-justified">
          <NavItem>
            <NavLink activeclassname="active" to="/scan" tag={Link}>
              <FontAwesomeIcon icon={faBarcode} />
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink activeclassname="active" to="/search" tag={Link}>
              <FontAwesomeIcon icon={faSearch} />
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink activeclassname="active" to="/" tag={Link}>
              <FontAwesomeIcon icon={faThLarge} />
            </NavLink>
          </NavItem>
        </Nav>
      </Navbar>
    );
  }

  private toggle() {
    this.setState({
      open: !this.state.open,
    });
  }
}

export default NavBar;
