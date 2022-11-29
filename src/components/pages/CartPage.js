import React,{Component, Fragment} from "react";
import Header from "../Header/Header";
import Cart from "../Cart/Cart";

class CartPage extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <Fragment>
                <Header orders={this.props.orders} chooseCategory={this.props.chooseCategory} changeCurrency={this.props.changeCurrency} currentCurrency={this.props.currentCurrency} count={this.props.count} increaseItem={this.props.increaseItem} decreaseItem={this.props.decreaseItem} activeCategory={this.props.activeCategory} choosenAttributes={this.props.choosenAttributes} onChoosenAttributes={this.props.onChoosenAttributes} addToFinalOrder={this.props.addToFinalOrder} showMobileMenu={this.props.showMobileMenu} closeMobileMenu={this.props.closeMobileMenu}/>

                    <Cart orders={this.props.orders} increaseItem={this.props.increaseItem} decreaseItem={this.props.decreaseItem} currentCurrency={this.props.currentCurrency} nextImage={this.props.nextImage} prevImage={this.props.prevImage} onChoosenAttributes={this.props.onChoosenAttributes}  choosenAttributes={this.props.choosenAttributes}  addToFinalOrder={this.props.addToFinalOrder} chooseAttrib={this.props.chooseAttrib} toCountFinalSum={this.props.toCountFinalSum}/>

            </Fragment>
        )
    }
}

export default CartPage;