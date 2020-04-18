import React from 'react'
import { quantities } from '../constants/quantities'
import { ItemRatingForm } from '../components/ItemRatingForm'

export const ItemView = ({ value, addToBasket, isCustomer, setBasketQuantity, addItemRating }) => {

    return <div className="mainBox">
        <div className="topRight">
            <div className="imageBox">
                <p className="subTitle">Image</p>
                {<img className="image" src={value.image} /> || null}
            </div>
            <form className="itemForm">
                <label className="subTitle">
                    Title
            </label>
                <p className="blackText">{value.title}</p>
                <label className="subTitle">
                    Description
            </label>
                <p className="blackText">{value.description || null}</p>
                <label className="subTitle">
                    Manufacturer
            </label>
                <p className="blackText">{value.manufacturer}</p>
                <label className="subTitle">
                    Price
            </label>
                <p className="blackText">{value.price || null}</p>
                <label className="subTitle">
                    Weight
            </label>
                <p className="blackText">{value.weight || null}</p>
                <label className="subTitle">
                    Quantity in Stock
            </label>
                <p className="blackText">{value.quantity || null}</p>
                <label className="subTitle">
                    Category
            </label>
                <p className="blackText">{value.category}</p>
            </form>
        </div>
        {isCustomer && <div className="rightBox"><div className="basketActions">
            <select name="basketQuantity" className="input" value={value.basketQuantity || quantities[0]}
                onChange={selected => setBasketQuantity(selected.target.value)}>
                {quantities.map(quantity => {
                    return <option value={quantity}>{quantity}</option>
                })}
            </select>
            <input className="bigBtn" type="submit" value="Add To Basket" onClick={() => addToBasket(value)} />
        </div>
            <div>
                <ItemRatingForm addItemRating={addItemRating} />
            </div>
        </div>}
    </div >
}