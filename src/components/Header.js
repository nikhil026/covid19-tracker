import React from 'react';
import { Navbar, Row } from 'react-materialize';
import { NavLink } from 'react-router-dom';
import CoronaImage from './../corona.png';

export const Header = () => {
    let brand = (<NavLink to="/"> <img alt='Corona Stats Tracker' style={style.logoImage} className='brand-logo' src={CoronaImage} /></NavLink>);

    return (
        <Row>
            <Navbar style={style.navStyle} brand={brand} className="col l10 offset-l1 s12 offset-s0 black-text">
                <NavLink exact={true} style={style.navLinkColor} to="/">Home</NavLink>
                <NavLink activeClassName="active-link" style={style.navLinkColor} to="/country">Country</NavLink>
                <NavLink activeClassName="active-link" style={style.navLinkColor} to="/compare-countries/compare">Compare</NavLink>
                <NavLink activeClassName="active-link" style={style.navLinkColor} to="/india">India</NavLink>
            </Navbar>


        </Row>
    )
}
const style = {
    navStyle: {
        shadow: "0 0 0",
        boxShadow: "0 0 0",
        background: window.innerWidth > 600 ? '#fff' : 'linear-gradient(to left,#cc2b5e,#753a88)',
    },
    logoImage: {
        height: 60,
        width: 60,
        float: 'center',
        marginLeft: window.innerWidth > 600 ? '35vw' : '0vw',
        // position: 'fixed'
    },
    navLinkColor: {
        color: window.innerWidth > 600 ? '#333' : '#333',
        fontWeight: 'bold',
        // marginLeft: 20,
        // marginRight: 10
    },
    hamColor: {
        color: '#484848'
    }
}