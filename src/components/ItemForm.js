import React from 'react'
import { ImagePicker } from 'react-file-picker'
import { categories } from '../constants/categories'

export const ItemForm = ({ logo, value, onSelectChange, handleChange, handleSubmit, onChangeImage }) => {

    return <div className="mainBox">
        <img src={logo} className="app-logo" alt="logo" />
        <div className="centered">
            <div className="imageBox">
                <p className="subTitle">Image</p>
                {<img className="image" src={value.image} /> || null}
                <ImagePicker
                    extensions={['jpg', 'jpeg', 'png']}
                    dims={{ minWidth: 100, maxWidth: 500, minHeight: 100, maxHeight: 500 }}
                    onChange={image => onChangeImage(image)}
                    onError={errMsg => console.log(errMsg)}
                >
                    <button className="selectBtn">
                        Select product image
                </button>
                </ImagePicker>
            </div>
            <form className="formContainer" onChange={handleChange} onSubmit={handleSubmit} >
                <label className="subTitle">
                    Title
            </label>
                <input value={value.title || null} className="input" type="text" name="title" />
                <label className="subTitle">
                    Description
            </label>
                <input value={value.description || null} className="input" type="text" name="description" />
                <label className="subTitle">
                    Manufacturer
            </label>
                <input value={value.manufacturer || null} className="input" type="text" name="manufacturer" />
                <label className="subTitle">
                    Price
            </label>
                <input value={value.price || null} className="input" type="text" name="price" />
                <label className="subTitle">
                    Category
            </label>
                <select name="category" className="input" value={value.category}
                    onChange={selected => onSelectChange(selected)}>
                    {categories.map(category => {
                        return <option value={category.name}>{category.value}</option>
                    })}
                </select>
                <input className="bigBtn" type="submit" value="Save" />
            </form>
        </div>
    </div >
}