import React from 'react'
import { logOutUser } from '../actions/user'
import { getAllItems, setCurrentItemSuccess, removeItem } from '../actions/item'
import { connect } from 'react-redux'
import { SortingView } from '../components/SortingView'
import { ItemList } from '../components/ItemList'
import ViewItem from './ViewItem'


class ItemCatalog extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            items: [],
            sorters: {
                title: { asc: null },
                category: { asc: null },
                manufacturer: { asc: null },
            }
        }

        this.goToItem = this.goToItem.bind(this)
    }

    componentDidMount() {
        const { getAllItems, item } = this.props
        getAllItems()
        if (!item.error)
            this.setState({ items: item.allItems })
    }

    searchItems = event => {
        event.preventDefault()
        const value = event.target.value
        const { item } = this.props
        const filteredItems = [...item.allItems.filter(item => {
            return item.title.toLowerCase().includes(value.toLowerCase()) ||
                item.manufacturer.toLowerCase().includes(value.toLowerCase()) ||
                item.category.toLowerCase().includes(value.toLowerCase())
        })]

        this.setState({ items: filteredItems })
    }

    goToItem = item => {
        const { history, setCurrentItemSuccess, user } = this.props
        setCurrentItemSuccess(item)
        const userType = user.currentUser.admin ? "admin" : "customer"
        history().push(`${userType}/viewItem/${item.id}`)
    }

    setSortOrder = (name, value) => {
        let items
        let x, y

        if (value == true) {
            items = [...this.state.items.sort((a, b) => {
                x = name == "title" && a.title.toLowerCase() ||
                    name == "manufacturer" && a.manufacturer.toLowerCase() ||
                    name == "category" && a.category.toLowerCase()
                y = name == "title" && b.title.toLowerCase() ||
                    name == "manufacturer" && b.manufacturer.toLowerCase() ||
                    name == "category" && b.category.toLowerCase()
                if (x < y) { return -1 }
                if (x > y) { return 1 }
                return 0;
            })]
        } else {
            items = [...this.state.items.sort((a, b) => {
                x = name == "title" && a.title.toLowerCase() ||
                    name == "manufacturer" && a.manufacturer.toLowerCase() ||
                    name == "category" && a.category.toLowerCase()
                y = name == "title" && b.title.toLowerCase() ||
                    name == "manufacturer" && b.manufacturer.toLowerCase() ||
                    name == "category" && b.category.toLowerCase()
                if (x < y) { return 1 }
                if (x > y) { return -1 }
                return 0;
            })]
        }

        this.setState({
            ...this.state,
            sorters: { ...this.state.sorters, [name]: { asc: value } },
            items
        })
    }

    render() {
        const { sorters, items } = this.state
        const { item, user, match } = this.props
        const path = user.currentUser.admin ? "/admin" : "/customer"
        return (
            < div className="container">
                {match.path == path && <div>
                    <div className="top">
                        <form onChange={this.searchItems} >
                            <div className="lblDiv"><label className="subTitle">Search</label></div>
                            <input className="input" type="text" name="searchVal" />
                        </form>
                    </div>
                    <div className="sorters">
                        <SortingView setSortOrder={this.setSortOrder} asc={sorters.title.asc} name="title" />
                        <SortingView setSortOrder={this.setSortOrder} asc={sorters.category.asc} name="category" />
                        <SortingView setSortOrder={this.setSortOrder} asc={sorters.manufacturer.asc} name="manufacturer" />
                        <button onClick={() =>
                            this.setState({
                                items: [...item.allItems], sorters:
                                {
                                    title: { asc: null },
                                    category: { asc: null },
                                    manufacturer: { asc: null },
                                }
                            })} className="btn">Clear Filters</button>
                    </div> </div>}
                {match.path == "/:userType/viewItem/:id" ? <ViewItem /> :
                    <ItemList items={items} isAdmin={user.currentUser.admin}
                        removeItem={this.props.removeItem} goToItem={this.goToItem} />}
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
    removeItem,
    logOutUser
}

export default connect(mapStateToProps, mapDispatchToProps)(ItemCatalog)