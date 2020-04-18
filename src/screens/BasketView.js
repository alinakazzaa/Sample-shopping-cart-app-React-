import React from 'react'
import { BasketItem } from '../components/BasketItem'
import { connect } from 'react-redux'
import Header from '../components/Header'
import { updateBasketItem, removeBasketItem } from '../actions/basket'
import { setCurrentItemSuccess } from '../actions/item'

/**
 * 
 * The customer should be able to select items to purchase and add to a shopping cart, with the purchase being processed
 *  by the system and stock levels being updated to reflect the results of the purchase. Features such as discounting and
 *  loyalty cards for customers may be applied in specific circumstances as decided by the developer. Customers should be
 *  able to interactively rate the item on a scale of 1-5 and to leave comments/reviews of an item.
 */


class BasketView extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

        }

        this.goToItem = this.goToItem.bind(this)
    }


    removeFromBasket = item => {
        const { removeBasketItem } = this.props
        removeBasketItem(item)
    }

    updateQuantity = (item, quantity) => {
        const { updateBasketItem } = this.props
        updateBasketItem({ ...item, basketQuantity: quantity })
    }


    goToItem = item => {
        const { history, setCurrentItemSuccess } = this.props
        setCurrentItemSuccess(item)
        history().push(`/viewItem/${item.id}`)
    }

    completePurchase = () => {
        const { history } = this.props
        history().push("/order")
    }

    render() {
        const { basket, user, history } = this.props

        return (
            <div className="container">
                <Header isCustomer={!user.currentUser.admin} history={history}>
                    <div className="top">
                        <p className="title">Your Basket</p>
                    </div>
                </Header>
                <div className="basketList">
                    {basket.basketItems.length == 0 ? <div style={{ marginTop: 230 }}><p className="subTitle">No Items in Basket</p></div> :
                        basket.basketItems.map((item, index) => {
                            return <BasketItem key={index} item={item} goToItem={this.goToItem}
                                removeFromBasket={this.removeFromBasket} updateQuantity={this.updateQuantity} />
                        })
                    }
                </div >
                <div className="centered"><p className="title">Total $ {basket.basketTotal}</p></div>
                {basket.basketItems.length > 0 && <div className="centered"><input className="bigBtn" type="submit" value="Buy" onClick={this.completePurchase} /> </div>}
            </div >)
    }
}

const mapStateToProps = state => ({
    user: state.user,
    basket: state.basket
})


const mapDispatchToProps = {
    updateBasketItem,
    removeBasketItem,
    setCurrentItemSuccess
}

export default connect(mapStateToProps, mapDispatchToProps)(BasketView)
