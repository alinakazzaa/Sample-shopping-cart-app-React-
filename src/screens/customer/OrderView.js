import React from 'react'
import { connect } from 'react-redux'
import Header from '../../components/Header'
import { updateUser } from '../../actions/user'
import { addOrder } from '../../actions/order'
import { updateItem } from '../../actions/item'
import { PaymentForm } from '../../components/PaymentForm'
import { AddressForm } from '../../components/AddressForm'
import { DialogModal } from '../../components/DialogModal'


class OrderView extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            address: { saveAddress: true },
            payment: { savePayment: true },
            dialogClosed: true
        }

    }

    componentDidMount() {
        const { user } = this.props
        const address = user.currentUser.address ? { ...this.state.address, ...user.currentUser.address } : { fullName: user.currentUser.fullName }
        const payment = user.currentUser.payment ? { ...this.state.payment, ...user.currentUser.payment } : { fullName: user.currentUser.fullName }
        this.setState({
            payment: { ...payment }, address: { ...address }
        })
    }

    handleSubmit = () => {
        const { payment, address, saveAddress, savePayment } = this.state
        const { user, basket, addOrder, updateItem } = this.props
        const currect = user.currentUser

        let newOrder = {
            items: [...basket.basketItems.map(item => { return item.id })],
            customerID: currect.id,
            totalPaid: basket.basketTotal
        }

        if (savePayment) {
            updateUser({ ...user.currentUser, payment })
        }

        if (saveAddress) {
            updateUser({ ...user.currentUser, address })
        }

        basket.basketItems.map(item => {
            updateItem({ ...item, quantity: Number(item.quantity) - Number(item.basketQuantity), basketQuantity: null })
        })



        addOrder(newOrder, user.currentUser)
        this.setState({ dialogClosed: false })
    }

    handlePaymentChange = event => {
        event.preventDefault()

        if (event.target.name == "savePayment") {
            this.setState({ payment: { ...this.state.payment, [event.target.name]: !this.state.payment.savePayment } })
        } else {
            this.setState({ payment: { ...this.state.payment, [event.target.name]: event.target.value } })
        }

    }

    handleAddressChange = event => {
        event.preventDefault()

        if (event.target.name == "saveAddress") {
            this.setState({ address: { ...this.state.address, [event.target.name]: !this.state.address.saveAddress } })
        } else {
            this.setState({ address: { ...this.state.payment, [event.target.name]: event.target.value } })
        }
    }

    onSelectChange = event => {
        if (event.target.name == "day") {
            this.setState({ payment: { ...this.state.payment, day: event.target.value } })
        } else {
            this.setState({ payment: { ...this.state.payment, month: event.target.value } })
        }

    }

    closeModal = () => {
        const { history } = this.props
        this.setState({ dialogClosed: true })
        history().push("/customer")
    }

    render() {
        const { user, history, basket, match } = this.props

        return (
            <div className="container">
                <DialogModal isOpen={!this.state.dialogClosed} onOpen={null} onClose={this.closeModal} title="Confirmed!"><p className="title">Order Submitted! Wait for email confirmation</p></DialogModal>
                <Header match={match} isCustomer={!user.currentUser.admin} history={history}>
                    <div className="top">
                        <p className="subTitle">Check your details are correct and update them</p>
                    </div>
                </Header>
                <div className="centered">
                    <AddressForm value={this.state.address} handleChange={this.handleAddressChange} />
                    <PaymentForm onSelectChange={this.onSelectChange} value={this.state.payment} handleChange={this.handlePaymentChange} />
                </div>
                <div className="centered"><input className="bigBtn" type="submit" value="Pay" onClick={this.handleSubmit} /><p className="title">Total $ {basket.basketTotal}</p></div>
            </div >)
    }
}

const mapStateToProps = state => ({
    user: state.user,
    basket: state.basket
})


const mapDispatchToProps = {
    addOrder,
    updateItem
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderView)
