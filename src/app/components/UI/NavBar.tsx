import * as React from 'react';
import { Navbar, NavbarBrand, NavbarToggler, Nav, NavItem, NavLink, Collapse } from 'reactstrap';
import { Link } from 'react-router-dom';

interface IState
{
  open: boolean;
}
class NavBar extends React.Component<any, IState> {
  constructor(props: any)
  {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      open: false,
    };
  }

  public render()
  {
    return (
      <Navbar color="dark" dark={true} expand="md">
        <NavbarBrand href="/">PC</NavbarBrand>
        <NavbarToggler onClick={this.toggle} color="light" />
        <Collapse isOpen={this.state.open} navbar={true}>
          <Nav className="ml-auto" navbar={true}>
            <NavItem>
              <NavLink onClick={this.toggle} activeclassname="active" to="/search" tag={Link}>Search</NavLink>
            </NavItem>
            <NavItem>
              <NavLink onClick={this.toggle} activeclassname="active" to="/scan" tag={Link}>Scan Barcode</NavLink>
            </NavItem>
            <NavItem>
              <NavLink onClick={this.toggle} activeclassname="active" to="/" tag={Link}>My List</NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    );
  }

  private toggle()
  {
    this.setState({
      open: !this.state.open,
    });
  }
}

export default NavBar;
