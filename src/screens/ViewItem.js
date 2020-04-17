import React from 'react'
import logo from '../logo.svg'
import '../styles.css'
import { connect } from 'react-redux'
import 'react-tabs/style/react-tabs.css'
import { updateItem } from '../actions/item'
import { ItemForm } from '../components/ItemForm'

class ViewItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: {
                category: 'beauty'
            }
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
        const { updateItem, history } = this.props
        event.preventDefault()
        updateItem(this.state.value)
        history().goBack()
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
        console.log(this.state.value)
        return (
            < div className="container" >
                <ItemForm logo={logo} value={this.state.value}
                    onSelectChange={this.onSelectChange}
                    handleSubmit={this.handleSubmit}
                    handleChange={this.handleChange}
                    onChangeImage={this.onChangeImage} />
            </div >
        )
    }
}

const mapStateToProps = state => ({
    item: state.item
})

const mapDispatchToProps = {
    updateItem
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewItem)