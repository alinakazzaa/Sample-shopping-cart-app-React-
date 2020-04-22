import React from 'react'
import { connect } from 'react-redux'
import Header from '../components/Header'
import { updateUser } from '../actions/user'
import { addOrder } from '../actions/order'
import { PaymentForm } from '../components/PaymentForm'
import { AddressForm } from '../components/AddressForm'


class UserDetails extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            address: {},
            payment: {}
        }

    }

    componentDidMount() {
        const { user } = this.props
        const address = user.currentUser.address ? { ...user.currentUser.address } : { fullName: user.currentUser.fullName }
        const payment = user.currentUser.payment ? { ...user.currentUser.payment } : { fullName: user.currentUser.fullName }
        this.setState({ payment, address })
    }

    handleSubmit = () => {
        const { payment, address } = this.state
        const { user, updateUser } = this.props

        updateUser({ ...user.currentUser, payment, address })
    }

    handlePaymentChange = event => {
        event.preventDefault()
        this.setState({ payment: { ...this.state.payment, [event.target.name]: event.target.value } })
    }

    handleAddressChange = event => {
        event.preventDefault()
        this.setState({ address: { ...this.state.address, [event.target.name]: event.target.value } })
    }

    onSelectChange = event => {
        if (event.target.name == "day") {
            this.setState({ payment: { ...this.state.payment, day: event.target.value } })
        } else {
            this.setState({ payment: { ...this.state.payment, month: event.target.value } })
        }

    }

    render() {
        const { user, history, basket } = this.props

        return (
            <div className="container">
                <Header isCustomer={!user.currentUser.admin} history={history}>
                    <div className="top">
                        <p className="subTitle">Check your details are correct and update them</p>
                    </div>
                </Header>
                <div className="centered">
                    <AddressForm value={this.state.address} handleChange={this.handleAddressChange} />
                    <PaymentForm onSelectChange={this.onSelectChange} value={this.state.payment} handleChange={this.handlePaymentChange} />
                </div>
                <div className="centered"><input className="bigBtn" type="submit" value="Save" onClick={this.handleSubmit} /></div>
            </div >)
    }
}

const mapStateToProps = state => ({
    user: state.user,
    basket: state.basket
})


const mapDispatchToProps = {
    addOrder,
    updateUser
}

export default connect(mapStateToProps, mapDispatchToProps)(UserDetails)
