import React from 'react'
import { connect } from 'react-redux'
import 'react-tabs/style/react-tabs.css'
import { addItem } from '../actions/item'
import { ItemForm } from '../components/ItemForm'
import Header from '../components/Header'

class AddItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: {
                category: 'beauty'
            }
        }
    }

    handleSubmit = event => {
        const { addItem, history } = this.props
        event.preventDefault()
        addItem(this.state.value)
        history().goBack()
    }

    handleChange = event => {
        event.preventDefault()
        this.setState({ value: { ...this.state.value, [event.target.name]: event.target.value } })
    }

    onSelectChange = val => {
        this.setState({ value: { ...this.state.value, category: val } })
    }

    onChangeImage = image => {
        this.setState({ value: { ...this.state.value, image } })
    }

    render() {
        const { user, history } = this.props
        return (
            < div className="container" >
                <Header isCustomer={!user.currentUser.admin} history={history}>
                </Header>
                <ItemForm value={this.state.value}
                    onSelectChange={this.onSelectChange}
                    handleSubmit={this.handleSubmit}
                    handleChange={this.handleChange}
                    onChangeImage={this.onChangeImage} />
            </div >
        )
    }
}

const mapDispatchToProps = {
    addItem
}

export default connect(null, mapDispatchToProps)(AddItem)