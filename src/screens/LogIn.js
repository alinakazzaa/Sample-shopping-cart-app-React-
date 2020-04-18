import React from 'react'
import { getAllUsers, setCurrentUserSuccess } from '../actions/user'
import { connect } from 'react-redux'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import 'react-tabs/style/react-tabs.css'
import { LoginForm } from '../components/LoginForm'
import Header from '../components/Header'

class LogIn extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: {
                username: '',
                password: ''
            }
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
        event.preventDefault()
        this.setState({ value: { ...this.state.value, [event.target.name]: event.target.value } })

    }

    render() {
        const { history } = this.props
        return (
            < div className="container" >
                <Header isCustomer={null} history={history}>
                </Header>
                <div className="formContainer">
                    <Tabs onSelect={index => this.setState({ index })}>
                        <TabList>
                            <Tab>Customer</Tab>
                            <Tab>Administrator</Tab>
                        </TabList>
                        <TabPanel>
                            <LoginForm isAdmin={false} handleChange={this.handleChange}
                                handleSubmit={this.handleSubmit} history={this.props.history} />
                        </TabPanel>
                        <TabPanel forceRender={false}>
                            <LoginForm isAdmin={true} handleChange={this.handleChange}
                                handleSubmit={this.handleSubmit} history={this.props.history} />
                        </TabPanel>
                    </Tabs>
                </div>
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