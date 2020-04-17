import React from 'react'
import logo from '../logo.svg'
import '../styles.css'
import { addUser, setCurrentUserSuccess } from '../actions/user'
import { connect } from 'react-redux'

class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: ''
        }

        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    handleSubmit = event => {
        event.preventDefault()
        const { addUser, history } = this.props
        let userValue = { ...this.state }
        addUser(userValue)
        history().push("/catalog")
    }

    handleChange = event => {
        event.preventDefault();
        this.setState({ [event.target.name]: event.target.value })
    }


    render() {

        return (
            < div className="container" >
                <img src={logo} className="app-logo" alt="logo" />
                <p className="title">ItemStore</p>
                <form className="formContainer" onChange={this.handleChange} onSubmit={this.handleSubmit} >
                    <label className="subTitle">
                        Email
                            </label>
                    <input className="input" type="text" name="email" />
                    <label className="subTitle">
                        Full name
                            </label>
                    <input className="input" type="text" name="full-name" />
                    <label className="subTitle">
                        Username
                            </label>
                    <input className="input" type="text" name="username" />
                    <label className="subTitle">
                        Password
                            </label>
                    <input className="input" type="text" name="password" />
                    <label className="subTitle">
                        Confirm password
                            </label>
                    <input className="input" type="text" name="confirm-password" />
                    <input className="bigBtn" type="submit" value="Register" />
                </form>
            </div >
        )
    }
}

const mapStateToProps = state => ({
    user: state.user
})


const mapDispatchToProps = {
    addUser,
    setCurrentUserSuccess
}

export default connect(mapStateToProps, mapDispatchToProps)(Register)