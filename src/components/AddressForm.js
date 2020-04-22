import React from 'react'

export const AddressForm = ({ value, handleChange }) => {

    return <div>
        <form className="formContainer" onChange={handleChange} >
            <p className="subTitle">Delivery Address</p>
            <div className="formRow"><label className="subTitle">
                First and Last Name
            </label>
                <input value={value.fullName || null} className="input" type="text" name="fullName" /></div>
            <div className="formRow"><label className="subTitle">
                Address Line 1
            </label>
                <input value={value.address1 || null} className="input" type="text" name="address1" /></div>
            <div className="formRow"><label className="subTitle">
                Address Line 2
            </label>
                <input value={value.address2 || null} className="input" type="text" name="address2" />
            </div>
            <div className="formRow"><label className="subTitle">
                City
            </label>
                <input value={value.city || null} className="input" type="text" name="city" /></div>
            <div className="formRow"><label className="subTitle">
                County
            </label>
                <input value={value.county || null} className="input" type="text" name="county" /></div>
            <div className="formRow"><label className="subTitle">
                Country
            </label>
                <input value={value.country || null} className="input" type="text" name="country" /></div>
        </form>
    </div >
}