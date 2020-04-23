import React from 'react'
import logo from '../logo.svg'
import logoutImg from '../resources/images/log-out.png'
import { logOutUser } from '../actions/user'
import { connect } from 'react-redux'

class Header extends React.Component {

    logOut = () => {
        const { user, logOutUser, history } = this.props
        logOutUser(user.currentUser)
        history().push("/")
    }

    render() {
        const { children, match } = this.props
        return (<div className="pageHeader">
            <img src={logo} className="app-logo" alt="logo" />
            {children}
            <div className="topRight">

                {match.path !== "/" && <div style={{ marginLeft: 30 }}><button onClick={() => this.logOut()} className="btn"><img className="iconImg" src={logoutImg} /></button></div>}
            </div>
        </div>)
    }
}

const mapStateToProps = state => ({
    user: state.user
})


const mapDispatchToProps = {
    logOutUser
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)