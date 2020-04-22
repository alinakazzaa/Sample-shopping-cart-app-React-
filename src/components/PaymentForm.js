import React from 'react'


export const PaymentForm = ({ value, onSelectChange, handleChange }) => {
    console.log(value)
    const months = () => {
        const list = []

        for (let i = 1; i < 13; i++) {
            list.push(String(i))
        }

        return list
    }

    const years = () => {
        const list = []

        for (let i = 2020; i < 2030; i++) {
            list.push(String(i))
        }

        return list
    }

    return <div>
        <form className="formContainer" onChange={handleChange}>
            <p className="subTitle">Payment Details</p>
            <div className="formRow"><label className="subTitle">
                Name on Card
            </label>
                <input value={value.fullName || null} className="input" type="text" name="fullName" /></div>
            <div className="formRow"><label className="subTitle">
                Card Number
            </label>
                <input value={value.cardNumber || null} className="input" type="text" name="cardNumber" /></div>
            <div className="formRow"> <label className="subTitle">
                Expiry Date
            </label>
                <div><select name="month" className="inputSmall" value={value.month || months()[0]}
                    onChange={selected => onSelectChange(selected)}>
                    {months().map(day => {
                        return <option value={day}>{day}</option>
                    })}
                </select> /
                <select name="year" className="inputSmall" value={value.year || years()[0]}
                        onChange={selected => onSelectChange(selected)}>
                        {years().map(month => {
                            return <option value={month}>{month}</option>
                        })}
                    </select></div>
            </div>
            <div className="formRow"><label className="subTitle">
                CCV
            </label>
                <input value={value.ccv || null} className="input" type="text" name="ccv" /></div>
        </form>
    </div >
}