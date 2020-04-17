import React from 'react'
import logo from '../logo.svg'
import '../styles.css'
import { getAllUsers } from '../actions/user'
import { getAllItems } from '../actions/item'
import { connect } from 'react-redux'

class ItemCatalog extends React.Component {
    constructor(props) {
        super(props)

    }

    componentDidMount() {
        const { getAllItems } = this.props
        getAllItems()
    }

    render() {
        const { history, item, user } = this.props

        return (
            < div className="container" >
                <div className="itemsContainer">
                    <div className="top">
                        <form onChange={this.handleChange} onSubmit={this.handleSubmit} >
                            <input className="input" type="text" name="username" />
                            <input className="bigBtn" type="submit" value="Search" />
                        </form>
                        {user.currentUser.admin && <button className="addBtn" onClick={() => history().push("/addItem")}>Add Item</button>}
                    </div>
                    <div className="middle">
                        {item.allItems.length == 0 && <div className="centered"><p className="blackText">No Items yet</p></div>}
                        {<ol className="itemList">

                        </ol>}
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
    getAllUsers,
    getAllItems
}

export default connect(mapStateToProps, mapDispatchToProps)(ItemCatalog)