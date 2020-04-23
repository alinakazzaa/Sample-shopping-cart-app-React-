import React from 'react'
import logo from '../logo.svg'
import '../styles.css'
import { connect } from 'react-redux'
import 'react-tabs/style/react-tabs.css'
import { updateItem } from '../actions/item'
import { addItemToBasket, updateBasketItem } from '../actions/basket'
import { ItemForm } from '../components/ItemForm'
import { ItemView } from '../components/ItemView'
import Header from '../components/Header'

class ViewItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: {
                category: 'beauty',
                basketQuantity: 1
            },
            editing: false
        }

        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.onSelectChange = this.onSelectChange.bind(this)
        this.onChangeImage = this.onChangeImage.bind(this)
    }

    componentDidMount() {
        const { item } = this.props
        this.setState({ value: { ...this.state.value, ...item.currentItem } })
    }

    handleSubmit = event => {
        const { updateItem } = this.props
        event.preventDefault()
        updateItem(this.state.value)
        this.setState({ editing: false })
    }

    handleChange = event => {
        event.preventDefault()
        this.setState({ value: { ...this.state.value, [event.target.name]: event.target.value } })
    }

    onSelectChange = category => {
        this.setState({ value: { ...this.state.value, category } })
    }

    onChangeImage = image => {
        this.setState({ value: { ...this.state.value, image } })
    }

    addToBasket = item => {
        const { addItemToBasket, updateBasketItem, basket } = this.props

        if (basket.basketItems.find(found => found.id === item.id) === undefined) {
            addItemToBasket(item)
        } else {
            updateBasketItem(item)
        }
    }

    addItemRating = rating => {
        const { updateItem, item } = this.props
        const ratings = [...item.currentItem.ratings] || []
        ratings.push(rating)
        updateItem({ ...item.currentItem, ratings })
    }


    render() {
        const { value, editing } = this.state
        const { user, history } = this.props

        return (
            < div className="container" >
                {!editing && user.currentUser.admin && < input className="bigBtn"
                    onClick={() => this.setState({ editing: true })} type="submit" value="Edit" />}
                <div>
                    {editing ? <ItemForm value={value}
                        onSelectChange={this.onSelectChange}
                        handleSubmit={this.handleSubmit}
                        handleChange={this.handleChange}
                        onChangeImage={this.onChangeImage} />
                        : <ItemView
                            value={value}
                            addItemRating={this.addItemRating}
                            addToBasket={this.addToBasket}
                            isCustomer={!user.currentUser.admin}
                            setBasketQuantity={quantity => this.setState({
                                value: {
                                    ...value,
                                    basketQuantity: quantity
                                }
                            })}
                        />}
                </div>

            </div >
        )
    }
}

const mapStateToProps = state => ({
    item: state.item,
    user: state.user,
    basket: state.basket
})

const mapDispatchToProps = {
    updateItem,
    addItemToBasket,
    updateBasketItem
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewItem)