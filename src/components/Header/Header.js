import React,{Component} from "react";
import './Header.scss';
import {gql}  from "@apollo/client";
import {graphql} from "@apollo/client/react/hoc";
import { concat } from "rxjs-compat/operator/concat";
import { Link } from "react-router-dom";

const  getCategoriesNames =  gql`
{
    categories{
        name 
        products{
            prices{
              amount
              currency{
                symbol
                label
              }
            }
            attributes{
                type
                name
                items{
                  value
                  displayValue
                  id
                }
            }
        }
    }
    currencies{
        label,
        symbol
    }
}`;

class Header extends Component{
    constructor(props){
        super(props);

    }


   
    

    showCategories(){
        let menuData = this.props.data;
        let activeCategory = this.props.activeCategory;
        if(menuData.loading === false){
            return menuData.categories.map(item => {
                return (<li id={item.id} onClick={()=>this.props.chooseCategory(item.name)} style={activeCategory.join() === item.name ? {color: '#5ECE7B', borderBottom: '2px solid #5ECE7B'}:{color: ''} }>
                  {item.name}
                </li>)
            });
        }else{
            return
        }
    }



    onLoadCurrency(){
        let dataCurrency = this.props.data;
       if(dataCurrency.loading === false){
            return dataCurrency.currencies.map(({label, symbol})=>{
                return (<div  className="typeofcurrency" onClick={()=>this.props.changeCurrency(symbol)}>{symbol} {label}</div>)
            })
       }else{
            return;
       }
        
    }

    currentSymbol(){
        let dataCurrency = this.props.data;
        if(dataCurrency.loading === false){
             return dataCurrency.currencies.map(({symbol})=>{
                if(symbol === this.props.currentCurrency.join()){
                    return (<p>{symbol}</p>)
                }
             })
        }else{
             return;
        }
    }

    showCurrency(){
        const typeofcurrency = document.querySelector(".typesofcurrency"),
        img = document.querySelector("#currency");
        if(typeofcurrency.style.display === 'none' ){
            typeofcurrency.style.display = 'block';
            img.style.transform = 'rotate(' + 180 + 'deg)';
        }else{
            typeofcurrency.style.display = 'none';
            img.style.transform = 'rotate(' + 360 + 'deg)';
        }
    };

   


    showCart(){
        const cart = document.querySelector(".shopping-cart-open");
        const wrapper = document.querySelector(".wrapper");
        if(cart.style.display === 'none'){
            cart.style.display = 'block';
            wrapper.classList.add('special')
        }else{
            cart.style.display = 'none';
            wrapper.classList.remove('special')
        }
    };


  


    showPreOrders(){
        const orders = this.props.orders;
        return orders.map(product =>{
            return <div className="shopping-cart-item" key={product.id} item={product}>
                        <div className="item-information">
                            <h3>
                                {product.brand}
                            </h3>                    
                {product.prices.map(price=>{
                    if(price.currency.symbol === this.props.currentCurrency.join()){
                       return  <p><b>{price.currency.symbol}</b><b>{new Intl.NumberFormat().format(price.amount)}</b></p>
                    }
                    else{
                        return;
                    }             
                })} 
                
                {product.attributes.map(attrib=>{
                     if(attrib.name !== 'Color'){     
                        return  <div className="size">
                                <h2>{attrib.name}</h2> 
                                <div className="typeofsize">
                                    {attrib.items.map(el=>{
                                        return <div className="extra-small" onClick={()=>this.props.onChoosenAttributes(product.id, attrib.name, el.value)} key={el.id} name={attrib.name} style={this.props.choosenAttributes.find(item=>(Object.keys(item).find(element=> element === attrib.name) && Object.values(item).find(element=> element === el.value))|| (Object.keys(item).find(element=> element !== attrib.name) &&  Object.values(item).find(element=>element === el.value))) ? {background: '#1D1F22', color: '#ffffff'} : {background: '#ffffff', color: '#000000'}} >{el.value}</div> 
                                    })}         
                                </div>
                            </div>  
                    }
                    if(attrib.name === 'Color'){
                        return  <div className="size">
                             Color:
                             <div className="typeofsize">
                                 {attrib.items.map(el=>{
                                     return <div className="extra-small" style={{background: el.value, width:"18px", height:"18px", whiteSpace:'wrap'}}></div>
                                 })}         
                             </div>
                         </div>  
                     }
                    }
                )}
                </div>
            
                   <div className="item-amount">
                    <div className="plus" onClick={()=>this.props.increaseItem(product.id)}>
                        <img src={require("../../resourses/images/plus-square.png")} alt="plus"/>
                        </div>
                        <div className="item-count" key={product.id}>
                            {product.count}
                        </div>
                        <div className="minus"  onClick={()=>this.props.decreaseItem(product.id)}>
                            <img src={require("../../resourses/images/minus-square.jpg")} alt="minus"/>
                        </div>
                    </div>
                    <div className="item-img">
                        <img src={product.gallery} alt="image"/>
                    </div>
            
            </div>
        })

    }



    
    
    countTotalSum(){
        
        let sum = 0;
        
        let totalCur = this.props.currentCurrency;

         this.props.orders.map(product =>{
             product.totalPrice.map(price=>{                        
                if(price.currency.symbol === this.props.currentCurrency.join()){
                    sum = sum + price.amount;
                    totalCur = price.currency.symbol;
                }
            })
        })

        return(
            <>
                <b>
                    {
                        totalCur
                    }
                </b>
                <b className="sumInMiniCart">
                    
                    {
                        new Intl.NumberFormat().format(sum)
                        
                    }
                </b>
            </>
           

        )
       
    }


 


    render(){
        return( 
            <div className="container"> 
            <header>  
                <nav>
                    <ul>
                        <Link to={'/'}>{this.showCategories()}</Link>
                    </ul>
                </nav>
                <div className="logo">
                <img src={require('../../resourses/images/a-logo.png')} alt="logo"/>
                </div>
                <div className="currency" onClick={this.showCurrency}>
                {this.currentSymbol()}
                    <img src={require('../../resourses/images/arrow.png')} alt="" id="currency"/>
                    <div className="typesofcurrency">
                        {this.onLoadCurrency()}
                    </div>
                </div>
                <div className="shopping-cart-area">
                    <div className="shopping-cart-value" style={this.props.orders.length > 0 ? {dispay:'block'}: {display:'none'}}>{this.props.orders.length}</div>
                    <div className="shopping-cart" onClick={this.showCart} >
                        <img src={require('../../resourses/images/Empty Cart.png')} alt="shopping-cart" />
                    </div>
                </div>  
                <div className="burger"  onClick={()=>this.props.showMobileMenu()}>
                    <div className="line-hight"></div>
                    <div className="line-midlle"></div>
                    <div className="line-down"></div>
                </div>
                <div className="close" onClick={()=>this.props.closeMobileMenu()}>
                    <img src={require('../../resourses/images/close.png')} alt="close"/>
                </div>
                <div className="shopping-cart-open">
                    <h4><b>My Bag,</b>{this.props.orders.length} items</h4>
                    {this.showPreOrders()}
                    
                    <div className="sum">
                        <h3><b>Total</b></h3><p><b></b>{this.countTotalSum()}</p>
                    </div>
                    <div className="buttons">
                        <Link to={"/CartPage"}><input type="button" value="view bag"/></Link>
                        <input type="button" value="check out" id="check" onClick={(e)=>this.props.addToFinalOrder(e)}/>
                    </div>
                </div>
                
            </header>
            </div>
        )
    }
}

export default graphql(getCategoriesNames) (Header);