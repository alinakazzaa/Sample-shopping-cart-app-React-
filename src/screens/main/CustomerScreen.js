import React from 'react'
import { connect } from 'react-redux'
import Header from '../../components/Header'
import ItemCatalog from '../ItemCatalog'
import basketImg from '../../resources/images/basket.png'


class CustomerScreen extends React.Component {

    render() {
        const { history, user, match } = this.props
        console.log(this.props)
        return (
            < div className="container" >
                <Header match={match} isCustomer={!user.currentUser.admin} history={history}>
                    <button onClick={() => history().push("/customer/basket")}
                        className="btn"><img className="iconImg"
                            src={basketImg} /></button>
                </Header>
                <ItemCatalog match={match} history={history} />
            </div >
        )
    }
}

const mapStateToProps = state => ({
    user: state.user
})


const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(CustomerScreen)