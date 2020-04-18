import React from 'react'
import logo from '../logo.svg'
import '../styles.css'
import { connect } from 'react-redux'
import 'react-tabs/style/react-tabs.css'
import { updateItem } from '../actions/item'
import { ItemForm } from '../components/ItemForm'
import { ItemView } from '../components/ItemView'

class ViewItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: {
                category: 'beauty'
            },
            editing: false
        }

        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.onSelectChange = this.onSelectChange.bind(this)
        this.onChangeImage = this.onChangeImage.bind(this)
    }

    componentDidMount() {
        const { item } = this.props
        this.setState({ value: item.currentItem })
    }

    handleSubmit = event => {
        const { updateItem } = this.props
        event.preventDefault()
        updateItem(this.state.value)
        this.setState({ editing: false })
    }

    handleChange = event => {
        event.preventDefault()
        this.setState({ value: { ...this.state.value, [event.target.name]: event.target.value } })
    }

    onSelectChange = category => {
        this.setState({ value: { ...this.state.value, category } })
    }

    onChangeImage = image => {
        this.setState({ value: { ...this.state.value, image } })
    }


    render() {
        const { user } = this.props
        return (
            < div className="container" >
                <div className="pageHeader">
                    <img src={logo} className="app-logo" alt="logo" />
                    {!this.state.editing && user.currentUser.admin && < input className="bigBtn"
                        onClick={() => this.setState({ editing: true })} type="submit" value="Edit" />}
                </div>
                <div className="centered">
                    {this.state.editing ? <ItemForm value={this.state.value}
                        onSelectChange={this.onSelectChange}
                        handleSubmit={this.handleSubmit}
                        handleChange={this.handleChange}
                        onChangeImage={this.onChangeImage} />
                        : <ItemView value={this.state.value} />}
                </div>}

            </div >
        )
    }
}

const mapStateToProps = state => ({
    item: state.item,
    user: state.user
})

const mapDispatchToProps = {
    updateItem
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewItem)