import React from 'react'

export const ItemView = ({ value }) => {

    return <div className="mainBox">
        <div className="centered">
            <div className="imageBox">
                <p className="subTitle">Image</p>
                {<img className="image" src={value.image} /> || null}
            </div>
            <div className="formContainer">
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
                    Category
            </label>
                <p className="blackText">{value.category}</p>
            </div>
        </div>
    </div >
}