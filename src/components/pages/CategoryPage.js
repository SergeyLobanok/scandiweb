import React,{ Component, Fragment } from 'react';
import Header from '../Header/Header';
import Category from '../Category/Category';

class CategoryPage extends React.Component{

    render(){
        return(
            <>
             <Header orders={this.props.orders} chooseCategory={this.props.chooseCategory} changeCurrency={this.props.changeCurrency} currentCurrency={this.props.currentCurrency} count={this.props.count} increaseItem={this.props.increaseItem} decreaseItem={this.props.decreaseItem} activeCategory={this.props.activeCategory} choosenAttributes={this.props.choosenAttributes} addToFinalOrder={this.props.addToFinalOrder}  onChoosenAttributes={this.props.onChoosenAttributes} showMobileMenu={this.props.showMobileMenu} closeMobileMenu={this.props.closeMobileMenu}/>
             
             <Category addToOrder={this.props.addToOrder}  onChangeCategory={this.props.onChangeCategory} activeCategory={this.props.activeCategory} currentCurrency={this.props.currentCurrency} finalOrders={this.props.finalOrders}/>

            </>
            

        )
    }
}

export default CategoryPage;