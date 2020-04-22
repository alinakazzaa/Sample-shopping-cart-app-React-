import React from 'react'
import { addUser, setCurrentUserSuccess } from '../actions/user'
import { connect } from 'react-redux'
import Header from '../components/Header'

class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            admin: false
        }

        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    handleSubmit = event => {
        event.preventDefault()
        const { addUser, history } = this.props
        let userValue = { ...this.state }
        addUser(userValue)
        history().push("/customer")
    }

    handleChange = event => {
        event.preventDefault();
        this.setState({ [event.target.name]: event.target.value })
    }


    render() {
        const { history } = this.props
        return (
            < div className="container" >
                <Header isCustomer={null} history={history}>
                </Header>
                <p className="title">ItemStore</p>
                <div className="centered">
                    <form className="formContainer" onChange={this.handleChange} onSubmit={this.handleSubmit} >
                        <label className="subTitle">
                            Email
                            </label>
                        <input className="input" type="text" name="email" />
                        <label className="subTitle">
                            Full name
                            </label>
                        <input className="input" type="text" name="fullName" />
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
                        <input className="input" type="text" name="confirmPassword" />
                        <input className="bigBtn" type="submit" value="Register" />
                    </form>
                </div>
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