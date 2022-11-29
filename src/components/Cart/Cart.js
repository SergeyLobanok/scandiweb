import { specifiedSDLRules } from "graphql/validation/specifiedRules";
import React,{Component, Fragment} from "react";
import { elementAt } from "rxjs-compat/operator/elementAt";
import "./Cart.scss";

class Cart extends React.Component{
    constructor(props){
        super(props);
        this.state ={
            orders:this.props.orders,
            attributes:[],
        };
    }

   





    showOrders(){
        let orders = this.props.orders;
        return orders.map(product=>{
            return <div className="element-ordrer">
                        <div className="description">
                        <h2>{product.name}</h2>
                        <h3>{product.brand}</h3>
                        {product.prices.map(price=>{
                            if(price.currency.symbol === this.props.currentCurrency.join()){
                                return <p>{price.currency.symbol}{new Intl.NumberFormat().format(price.amount)}</p>
                            }
                        })}
                        <div className="attributes">
                        {product.attributes.map(attrib=>{
                        if(attrib.name !== 'Color'){     
                        return  <div className="attributes-elements">
                                <h2>{attrib.name}</h2> 
                                <div className="wrapElement">
                                    {attrib.items.map(el=>{
                                        return <div className="attributes-element" onClick={()=>this.props.onChoosenAttributes(product.id, attrib.name, el.value)} key={el.id} name={attrib.name} style={this.props.choosenAttributes.find(elem=>(Object.keys(elem).find(element=> element === attrib.name) && Object.values(elem).find(element=> element === el.value))) ? {background: '#1D1F22', color: '#ffffff'} : {background: '#ffffff', color: '#000000'}} >{el.value}</div> 
                                    })}         
                                </div>
                            </div>  
                        }
                        if(attrib.name === 'Color'){     
                            return  <div className="attributes-elements">
                                    <h2>{attrib.name}</h2> 
                                    <div className="wrapElement">
                                        {attrib.items.map(el=>{
                                            return <div className="attributes-element" onClick={()=>this.props.onChoosenAttributes(product.id, attrib.name, el.value)} style={{background: el.value, width:"36px", height:"36px"}} ></div> 
                                        })}         
                                    </div>
                                </div>  
                            }
                    })}
                        </div>
                    </div>
                    <div className="wrapperLocal">
                    <div className="amount">
                        <div className="plus" onClick={()=>this.props.increaseItem(product.id)}>
                            +
                        </div>
                        <div className="count">
                        {product.count}
                        </div>
                        <div className="minus" onClick={()=>this.props.decreaseItem(product.id)}>
                        -
                        </div>
                    </div>
                    <div className="images">
                    {product.gallery.map((image, index)=>{
                        if(index === product.currentImageIndex){
                            return (
                                <Fragment>
                                    <img src={image} alt="" className="imageProduct"/>
                                    <div className="arrows">
                                        <img src={require('../../resourses/images/left.png')} alt="left" onClick={()=>this.props.prevImage(product.id)} />
                                        <img src={require('../../resourses/images/right.png')} alt="right"  onClick={()=>this.props.nextImage(product.id)}/>
                                    </div>
                                </Fragment>
                                )
                        }
                    })}
                        
                    </div>
                </div>
            </div> 
            })
        
    }

     

    render(){
        return(
            <div className='wrapper'> 
                <div className="container">
                    <section className="cart">
                        <h1>Cart</h1>
                        <div className="elements-orders">                     
                            {this.showOrders()}  
                        </div>
                        {this.props.toCountFinalSum()}
                    </section>
                </div>
            </div>
        )
    }

}

export default Cart;