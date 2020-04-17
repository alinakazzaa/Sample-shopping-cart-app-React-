import React from 'react'
import logo from '../logo.svg'
import '../styles.css'
import { getAllItems, setCurrentItemSuccess, removeItem } from '../actions/item'
import { connect } from 'react-redux'
import { ListItem } from '../components/ListItem'


class ItemCatalog extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isSearch: false,
            searched: []
        }
        this.handleChange = this.handleChange.bind(this)
    }

    componentDidMount() {
        const { getAllItems } = this.props
        getAllItems()
    }

    handleChange = event => {
        event.preventDefault()
        const value = event.target.value
        const { item } = this.props
        const filteredItems = [...item.allItems.filter(item => {
            return item.title.toLowerCase().includes(value.toLowerCase()) ||
                item.manufacturer.toLowerCase().includes(value.toLowerCase()) ||
                item.category.toLowerCase().includes(value.toLowerCase())
        })]

        this.setState({ searched: filteredItems, isSearch: true })
    }

    goToItem = item => {
        const { history, setCurrentItemSuccess } = this.props
        setCurrentItemSuccess(item)
        history().push(`/viewItem/${item.id}`)
    }

    render() {
        const { isSearch, searched } = this.state
        const { history, item, user, match } = this.props
        const items = isSearch ? searched : item.allItems
        console.log(match)
        return (
            < div className="container" >
                <img src={logo} className="app-logo" alt="logo" />
                <div className="itemsContainer">
                    <div className="top">
                        <form onChange={this.handleChange} >
                            <div className="lblDiv"><label className="subTitle">Search</label></div>
                            <input className="input" type="text" name="searchVal" />
                        </form>
                        {user.currentUser.admin && <button className="addBtn"
                            onClick={() => history().push('/addItem')}>Add Item</button>}
                    </div>
                    <div className="middle">
                        {item.allItems.length == 0 && <div className="centered"><p className="blueText">No Items yet</p></div>}
                        {items.length > 0 &&
                            < div className="itemsList">
                                {item.allItems.map((item, index) => {
                                    return <ListItem key={index} isAdmin={user.currentUser.admin} removeItem={this.props.removeItem} item={item} index={index} goToItem={this.goToItem} />
                                })}
                            </div>}
                    </div>
                </div>
            </div >
        )
    }
}

const mapStateToProps = state => ({
    user: state.user,
    item: state.item
})


const mapDispatchToProps = {
    getAllItems,
    setCurrentItemSuccess,
    removeItem
}

export default connect(mapStateToProps, mapDispatchToProps)(ItemCatalog)