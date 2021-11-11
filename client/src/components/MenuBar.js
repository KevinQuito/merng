// import React, { Component } from 'react' // instead of component, we'll get useState
import React, { useState } from 'react';
import { Menu } from 'semantic-ui-react';
import { Link } from 'react-router-dom';


// This is a class based component so, we'll change it; we only want functional components
// export default class MenuExampleSecondaryPointing extends Component {
  function MenuBar() {
//   state = { activeItem: 'home' }
    const [activeItem, setActiveItem] = useState('');

//   const handleItemClick = (e, { name }) => this.setState({ activeItem: name })
    const handleItemClick = (e, { name }) => setActiveItem(name);

    // we don't need to render since this is a functional component
//   render() {
    // const { activeItem } = this.state
    // each menu item has a name, meaning if the active property is true, then it will be highlighted, indicating that we're active on the page right now
    return (
        <Menu pointing secondary>
          <Menu.Item
            name='home'
            active={activeItem === 'home'}
            onClick={handleItemClick}
            as={Link}
            to="/"
          />
          
          <Menu.Menu position='right'>
          <Menu.Item
            name='login'
            active={activeItem === 'login'}
            onClick={handleItemClick}
            as={Link}
            to="/login"
          />
            <Menu.Item
              name='register'
              active={activeItem === 'register'}
              onClick={handleItemClick}
              as={Link}
              to="/register"
            />
          </Menu.Menu>
        </Menu>
    )
  }
// }


export default MenuBar;