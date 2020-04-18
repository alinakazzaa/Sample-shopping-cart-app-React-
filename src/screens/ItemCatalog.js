import React from 'react'
import logo from '../logo.svg'
import { logOutUser } from '../actions/user'
import { getAllItems, setCurrentItemSuccess, removeItem } from '../actions/item'
import { connect } from 'react-redux'
import { ListItem } from '../components/ListItem'
import { SortingView } from '../components/SortingView'
import logoutImg from '../resources/images/log-out.png'


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
        this.handleChange = this.handleChange.bind(this)
    }

    componentDidMount() {
        const { getAllItems, item } = this.props
        getAllItems()
        if (!item.error)
            this.setState({ items: item.allItems })
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

        this.setState({ items: filteredItems })
    }

    goToItem = item => {
        const { history, setCurrentItemSuccess } = this.props
        setCurrentItemSuccess(item)
        history().push(`/viewItem/${item.id}`)
    }

    setSortOrder = (name, value) => {
        let items
        let x, y

        if (value == true) {
            items = [...this.state.items.sort((a, b) => {
                let x = name == "title" && a.title.toLowerCase() ||
                    name == "manufacturer" && a.manufacturer.toLowerCase() ||
                    name == "category" && a.category.toLowerCase()
                let y = name == "title" && b.title.toLowerCase() ||
                    name == "manufacturer" && b.manufacturer.toLowerCase() ||
                    name == "category" && b.category.toLowerCase()
                if (x < y) { return -1 }
                if (x > y) { return 1 }
                return 0;
            })]
        } else {
            items = [...this.state.items.sort((a, b) => {
                var x = name == "title" && a.title.toLowerCase() ||
                    name == "manufacturer" && a.manufacturer.toLowerCase() ||
                    name == "category" && a.category.toLowerCase()
                var y = name == "title" && b.title.toLowerCase() ||
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

    logOut = () => {
        const { user, logOutUser, history, match } = this.props
        logOutUser(user.currentUser)
        history().push("/")
    }

    render() {
        const { sorters, items } = this.state
        const { history, item, user } = this.props
        console.log(this.props)
        return (
            < div className="container" >
                <div className="pageHeader">
                    <img src={logo} className="app-logo" alt="logo" />
                    <div className="top">
                        <form onChange={this.handleChange} >
                            <div className="lblDiv"><label className="subTitle">Search</label></div>
                            <input className="input" type="text" name="searchVal" />
                        </form>
                        {user.currentUser.admin && <button className="addBtn"
                            onClick={() => history().push('/addItem')}>Add Item</button>}
                    </div>
                    <button onClick={() => this.logOut()} className="btn"><img className="iconImg" src={logoutImg} /></button>
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
                </div>
                <div className="itemsContainer">
                    <div className="middle">
                        {item.allItems.length == 0 && <div className="centered"><p className="blueText">No Items yet</p></div>}
                        {items.length > 0 &&
                            < div className="itemsList">
                                {items.map((item, index) => {
                                    return <ListItem key={index} isAdmin={user.currentUser.admin} removeItem={this.props.removeItem} item={item} goToItem={this.goToItem} />
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
    removeItem,
    logOutUser
}

export default connect(mapStateToProps, mapDispatchToProps)(ItemCatalog)