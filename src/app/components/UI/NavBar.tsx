import * as React from 'react';
import { Navbar, Nav, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faBarcode, faList } from '@fortawesome/free-solid-svg-icons';

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
      <Navbar color="dark" dark={true} expand="xs" fixed="bottom">
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
                <FontAwesomeIcon icon={faList} />
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
