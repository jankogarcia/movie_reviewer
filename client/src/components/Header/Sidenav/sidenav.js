import React from 'react';
import SideNav from 'react-simple-sidenav';

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
            //onShowNav={props.onShowNav}
        >
            ITEMS
        </SideNav>
    )
}

export default Sidenav;