import React from 'react'
import logo from '../logo.svg'
import logoutImg from '../resources/images/log-out.png'
import basketImg from '../resources/images/basket.png'
import userImg from '../resources/images/user.png'
import { logOutUser } from '../actions/user'
import { connect } from 'react-redux'

class Header extends React.Component {

    logOut = () => {
        const { user, logOutUser, history, match } = this.props
        logOutUser(user.currentUser)
        history().push("/")
    }
    render() {
        const { children, isCustomer, history } = this.props

        return (<div className="pageHeader">
            <img src={logo} className="app-logo" alt="logo" />
            {children}
            <div className="topRight">
                {isCustomer &&
                    <div style={{ display: 'flex', flexDirection: 'row' }}><button onClick={() => history().push("/basket")}
                        className="btn"><img className="iconImg"
                            src={basketImg} /></button>
                        <div style={{ marginLeft: 30 }}><button onClick={() => history().push("/userDetails")} className="btn">
                            <img height={30} src={userImg} />
                        </button></div>
                        <div style={{ marginLeft: 30 }}><button onClick={() => this.logOut()} className="btn"><img className="iconImg" src={logoutImg} /></button></div>
                    </div>
                }
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