/**
 * Root container for the application.
 * Contains {@link Sidebar}, {@link Header} and {@link SideMenu}
 */
import React from 'react';
import { connect } from 'react-redux';
import { checkLogin } from './redux/actions/authActions';
import CircularProgress from 'material-ui/CircularProgress';
import Header from './layout/Header';
import Sidebar from './layout/Sidebar';
import Snack from './core/Snack';
import Login from "./login/Login";

class Root extends React.Component {

    componentWillMount() {
        this.props.checkLogin();
    }

    render() {
        const { authorized } = this.props;

        if (authorized.sent && (authorized.received || authorized.error)) {
            if (authorized.received) {
                return (
                    <div>
                        <Sidebar/>
                        <div id="main_content">

                            <Header/>
                            <div className="container">
                                <div id="pagecontainer">
                                    {this.props.children}
                                </div>
                                <Snack/>
                            </div>
                        </div>
                    </div>
                );
            }
            return <Login/>
        }
        return (
            <div style={{display: 'flex', justifyContent: 'center'}}>
                <CircularProgress size={80} thickness={7} />
            </div>
        );

    }

}

const mapStateToProps = (state) => {
    return {
        authorized: state.authReducer.authorized
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        checkLogin: () => {
            dispatch(checkLogin());
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Root);