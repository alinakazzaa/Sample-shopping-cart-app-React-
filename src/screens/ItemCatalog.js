import React from 'react'
import logo from '../logo.svg'
import '../styles.css'
import { getAllUsers, setCurrentUserSuccess } from '../actions/user'
import { connect } from 'react-redux'

class ItemCatalog extends React.Component {

    componentDidMount() {
        const { user } = this.props
        console.log(user.currentUser)
    }

    render() {
        const { history } = this.props
        return (
            < div className="container" >
                <p>Hello</p>
            </div >
        )
    }
}

const mapStateToProps = state => ({
    user: state.user
})


const mapDispatchToProps = {
    getAllUsers,
    setCurrentUserSuccess
}

export default connect(mapStateToProps, mapDispatchToProps)(ItemCatalog)