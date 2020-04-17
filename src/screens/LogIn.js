import React from 'react'
import logo from '../logo.svg'
import '../styles.css'
import { getAllUsers, setCurrentUserSuccess } from '../actions/user'
import { connect } from 'react-redux'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import 'react-tabs/style/react-tabs.css'

class LogIn extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: {
                username: '',
                password: ''
            },
            index: 0
        }

        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    componentDidMount() {
        const { getAllUsers } = this.props
        getAllUsers()
    }

    handleSubmit = event => {
        event.preventDefault()
        const { user, setCurrentUserSuccess, history } = this.props
        const found = user.allUsers.find(u => u.username === this.state.value.username)

        if (found) {
            if (this.state.value.password === found.password) {
                setCurrentUserSuccess(found)
                history().push("/catalog")
            }
        }
    }

    handleChange = event => {
        event.preventDefault();
        if (event.target.name === "username") {
            this.setState({ value: { ...this.state.value, username: event.target.value } })
        } else {
            this.setState({ value: { ...this.state.value, password: event.target.value } })
        }
    }

    loginComponent = () => {
        const { history, user } = this.props

        return <div>
            <img src={logo} className="app-logo" alt="logo" />
            {this.state.index == 0 && <p className="title">ItemStore</p>}
            {this.state.index == 1 && <p className="subTitle">ItemStore</p>}
            {this.state.index == 1 && <p className="subTitle">Admin Login</p>}
            <form className="formContainer" onChange={this.handleChange} onSubmit={this.handleSubmit} >
                <label className="subTitle">
                    Username
            </label>
                <input className="input" type="text" name="username" />
                <label className="subTitle">
                    Password
            </label>
                <input className="input" type="text" name="password" />
                <input className="bigBtn" type="submit" value="Log In" />
            </form>
            {this.state.index == 0 && <form>
                <input className="bigBtn"
                    onClick={() => history().push("/register", { current: user.currentUSer })}
                    type="submit" value="Register" />
            </form>}
        </div>
    }


    render() {
        return (
            < div className="container" >
                <Tabs onSelect={index => this.setState({ index })}>
                    <TabList> <Tab>Customer</Tab>
                        <Tab>Administrator</Tab></TabList>
                    <TabPanel>
                        <h2>{this.loginComponent()}</h2>
                    </TabPanel>
                    <TabPanel>
                        <h2>{this.loginComponent()}</h2>
                    </TabPanel>
                </Tabs>
            </div >
        )
    }
}

const mapStateToProps = state => ({
    user: state.user
})


const mapDispatchToProps = {
    getAllUsers,
    setCurrentUserSuccess
}

export default connect(mapStateToProps, mapDispatchToProps)(LogIn)