import React from 'react';
import SideNav from 'react-simple-sidenav';
import SideNavItems from './sidenav_items';

const styles = {
    background:'#242424',
    maxWidth:'220px'
}

const Sidenav = (props) => {
    return(
        <SideNav
            navStyle={styles}
            showNav={props.showNav}
            onHideNav={props.onHideNav}
        >
            <SideNavItems />
        </SideNav>
    )
}

export default Sidenav;