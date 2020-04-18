import React from 'react'
import deleteImg from '../resources/images/delete.png'
import rightImg from '../resources/images/arrow-right.png'
import { quantities } from '../constants/quantities'

export const BasketItem = ({ item, goToItem, removeFromBasket, updateQuantity }) => {

    return <div className="itemContainer">
        <div className="header">
            <button onClick={() => removeFromBasket(item)} className="btn"><img className="iconImg" src={deleteImg} /></button>
        </div>
        <div className="itemBody">
            <div className="infoBox">
                <p className="blackText">{item.title}</p>
                <p className="blueText"> {item.manufacturer}</p>
            </div>
            <div className="imageBox">
                <img className="imageSmall" src={item.image} />
            </div>
        </div>
        <div className="itemBottom">
            <p className="blueText">$ {item.price}</p>
            <select name="basketQuantity" className="input" value={item.basketQuantity}
                onChange={selected => updateQuantity(item, selected.target.value)}>
                {quantities.map((quantity, index) => {
                    return <option key={index} value={quantity}>{quantity}</option>
                })}
            </select>
        </div>
        <div className="footer">
            <button onClick={() => goToItem(item)} className="btn"><img className="iconImg" src={rightImg} /></button>
        </div>
    </div>
}