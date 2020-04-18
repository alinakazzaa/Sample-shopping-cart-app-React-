import React from 'react'
import StarRatingComponent from 'react-star-rating-component'

export class ItemRatingForm extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            star: 0,
            comment: ''
        }

        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleSubmit = () => {
        const { addItemRating } = this.props
        addItemRating({ ...this.state })
    }

    render() {
        const { star, comment } = this.state


        return (
            <div className="container">
                <p className="subTitle">Please rate this product</p>
                <form
                    onChange={event => this.setState({ ...this.state, [event.target.name]: event.target.value })}
                    onSubmit={this.handleSubmit} >
                    <div className="ratingBox"> <textarea className="ratingComment" name="comment" />
                        <StarRatingComponent
                            name="star"
                            starCount={5}
                            value={star}
                            onStarClick={value => this.setState({ ...this.state, star: value })}
                        />
                        {star > 0 && <p className="subTitle">Your rating: {star}</p>}
                    </div>
                    <input className="bigBtn" type="submit" value="Save" />
                </form>
            </div>
        )
    }
}