import React from 'react'
import { connect } from 'react-redux'
import Header from '../../components/Header'
import ItemCatalog from '../ItemCatalog'


class AdminScreen extends React.Component {
    render() {
        const { history, user, match } = this.props
        console.log(user)
        return (
            < div className="container" >
                <Header match={match} isCustomer={!user.currentUser.admin} history={history} />
                <div style={{ display: 'flex', justifyContent: 'center' }}><button className="addBtn"
                    onClick={() => history().push('/admin/addItem')}>Add Item</button></div>
                <ItemCatalog history={history} match={match} />
            </div >
        )
    }
}

const mapStateToProps = state => ({
    user: state.user
})


const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(AdminScreen)