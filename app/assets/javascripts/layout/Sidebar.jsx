/**
 * Represents the sidebar menu.
 */
import React from 'react';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import FontIcon from 'material-ui/FontIcon';
import muiThemeable from 'material-ui/styles/muiThemeable';
import {Link} from 'react-router';
import { AuthMin } from './../core/auth/Auth';
import { ADMIN_PAGE } from './../core/auth/rights';

import {connect} from "react-redux";
import {List, RaisedButton} from "material-ui";

class Sidebar extends React.Component {

    constructor(props) {
        super(props);
        this.open = this.open.bind(this);
        this.close = this.close.bind(this);

        this.style = {
            sidebar: {
                margin: '0',
                padding: '0',
                height: '100%',
                width: '290px',
                left: '-220px',
                transform: 'translate(0,0)',
                transition: '0.3s',
                backgroundColor: this.props.muiTheme.palette.primary1Color,
                textColor: '#e8e8e8',
                display: 'block',
                position: 'fixed',
                zIndex: '99999'



            },
            rightIcon: {
                textAlign: 'center',
                lineHeight: '24px',
                fontSize: '24px',
                backgroundColor: '#E8E8E8',
                margin: '6px',
                width: '24px',
                height: '24px',
                padding: '6px',
                right: '11px'
            },
            menuItem: {
                color: '#E8E8E8'
            }
        };

        this.state = {open: false};
    }

    /**
     * Called when the sidebar should open.
     */
    open() {
        let sidebar = JSON.parse(JSON.stringify(this.style.sidebar));
        sidebar.transform = 'translate(220px, 0)';
        this.style.sidebar = sidebar;
        this.setState({open: true});
    }

    /**
     * Called when the sidebar should close.
     */
    close() {
        let sidebar = JSON.parse(JSON.stringify(this.style.sidebar));
        sidebar.transform = 'translate(0, 0)';
        this.style.sidebar = sidebar;
        this.setState({open: false});
    }


    //Using <Link to="url"/> to use the defined client-urls in main.jsx
    render() {
        const { } = this.props;
        return (
            <div style={this.style.sidebar} id="sidebar" onMouseEnter={this.open} onMouseLeave={this.close}>
                <Menu autoWidth={false} width={290}>
                    <MenuItem primaryText="Hjem" containerElement={<Link to="/" />} style={this.style.menuItem} rightIcon={<FontIcon style={this.style.rightIcon} className="material-icons">home</FontIcon>}/>
                    <MenuItem primaryText="Prosjekter" containerElement={<Link to="/projects" />} style={this.style.menuItem} rightIcon={<FontIcon style={this.style.rightIcon} className="material-icons">assignment</FontIcon>} />
                    <MenuItem primaryText="Krav" containerElement={<Link to="/requirements" />} style={this.style.menuItem} rightIcon={<FontIcon style={this.style.rightIcon} className="material-icons">speaker_notes</FontIcon>}/>
                    <AdminPage style={this.style.menuItem} styleIcon={this.style.rightIcon}/>
                    <MenuItem primaryText="Logg ut" containerElement={<Link to="/logout" />} style={this.style.menuItem} rightIcon={<FontIcon style={this.style.rightIcon} className="material-icons">directions_run</FontIcon>}/>
                </Menu>
            </div>
        );
    }
}

const AdminPage = AuthMin(ADMIN_PAGE)(({style, styleIcon}) => {
    return (
        <MenuItem primaryText="Admin" containerElement={<Link to="/admin" />} style={style} rightIcon={<FontIcon style={styleIcon} className="material-icons">not_interested</FontIcon>}/>
    );
});

const mapStateToProps = (state) => {
    return {

    };
};

const mapDispatchToProps = (dispatch) => {
    return {

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(muiThemeable()(Sidebar));