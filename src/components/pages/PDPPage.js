import React,{ Component, Fragment } from 'react';
import Header from '../Header/Header';
import PDPComponent from '../PDP/PDPComponent';


class PDPPage extends React.Component{
    

    render(){
        return(
            <>
            <Header orders={this.props.orders} chooseCategory={this.props.chooseCategory} changeCurrency={this.props.changeCurrency} currentCurrency={this.props.currentCurrency} count={this.props.count} increaseItem={this.props.increaseItem} decreaseItem={this.props.decreaseItem} activeCategory={this.props.activeCategory} onChoosenAttributes={this.props.onChoosenAttributes} choosenAttributes={this.props.choosenAttributes} addToFinalOrder={this.props.addToFinalOrder} showMobileMenu={this.props.showMobileMenu} closeMobileMenu={this.props.closeMobileMenu}/>
            <PDPComponent addToOrder={this.props.addToOrder} currentCurrency={this.props.currentCurrency} onChoosenAttributes={this.props.onChoosenAttributes}  choosenAttributes={this.props.choosenAttributes} />
            </>

        )
    }
}

export default PDPPage;