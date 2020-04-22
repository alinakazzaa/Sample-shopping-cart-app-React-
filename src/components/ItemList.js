import React from 'react'
import { ListItem } from '../components/ListItem'


export const ItemList = ({ items, isAdmin, removeItem, goToItem }) => {
    return (
        <div className="itemsContainer">
            <div className="middle">
                {items.length == 0 && <div className="centered"><p className="blueText">No Items yet</p></div>}
                {items.length > 0 &&
                    < div className="itemsList">
                        {items.map((item, index) => {
                            return <ListItem key={index} isAdmin={isAdmin}
                                removeItem={removeItem} item={item} goToItem={goToItem} />
                        })}
                    </div>}
            </div>
        </div>
    )
}