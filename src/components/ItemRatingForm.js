import React from 'react'
import StarRatingComponent from 'react-star-rating-component'

export const ItemRatingForm = ({ handleRatingChange, star }) => {

    return (
        <div>
            <p className="subTitle">Please rate this product</p>
            <div className="ratingBox"> <textarea onChange={event =>
                handleRatingChange(event.target.value)} className="ratingComment" name="comment" />
                <StarRatingComponent
                    name="star"
                    starCount={5}
                    value={star}
                    onStarClick={value => handleRatingChange(value)}
                />
                {star > 0 && <p className="subTitle">Your rating: {star}</p>}
            </div>
            <input className="bigBtn" type="submit" value="Save" />
        </div>
    )
}