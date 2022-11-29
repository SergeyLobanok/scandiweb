import React,{Component} from "react";

import "./PDP.scss";
import {gql}  from "@apollo/client";
import { Query } from '@apollo/client/react/components';
import PDPcharacteristics from "./PDPcharacteristics";





class PDPComponent extends React.Component{
    constructor(props){
        super(props);
        this.state ={
            productID : window.location.pathname.slice(9),
            productAttributes:{},
            currentImageIndex:0,
        };
    }

    showImage(index){
        this.setState({
            currentImageIndex: index
        });
        
    }

    
    
  

    render(){
        const  GETINFORMATION =  gql`{
            product(id:${JSON.stringify(this.state.productID)}){
                id
                name
                description
                brand
                inStock
                gallery
                prices{
                  amount
                  currency{
                    label
                    symbol
                  }
                }
                attributes{
                    name
                    type
                    items{
                      displayValue
                      id
                      value
                    }
                }
           }
            
        }`;
      
        
        
        return(
            <Query query={GETINFORMATION}>
                {({data, loading})=>{
                    if(loading) return <h1>Loading...</h1>
                    else {
                        return(
                            <div className="wrapper">
                                <div className="container">
                                    <div className="PDP">
                                        <div className="PDP-images">
                                            <div className="list-images">
                                                {data.product.gallery.map((image,index)=>{
                                                        return(<div className="image">
                                                            <img src={image} alt="Image" onClick={()=>this.showImage(index)}/>
                                                        </div>)
                                                    })}           
                                            </div>
                                            <div className="image">
                                                {data.product.gallery.map((image, index)=>{
                                                    if(index=== this.state.currentImageIndex){
                                                    return <img src={image} alt="" />
                                                    }
                                                })}
                                                
                                                
                                            </div>
                                        </div>
                                        <div className="PDP-description">
                                            <h1 >{data.product.name}</h1> 
                                            <h2 >{data.product.brand}</h2>
                                            
                                            <PDPcharacteristics data={data.product} onChoosenAttributes={this.props.onChoosenAttributes} key={data.product.id} choosenAttributes={this.props.choosenAttributes}/> 
                                        
                                            <div className="price">PRICE:<br/>{data.product.prices.map(price=>{
                                                if(price.currency.symbol === this.props.currentCurrency.join()){
                                                    return (<p>{price.currency.symbol} <b/>{price.amount} </p>)
                                                }
                                            })}</div>
                                            
                                            {data.product.inStock === true ? 
                                            <div className="addToCart" onClick={()=>this.props.addToOrder(data.product)}>add to cart</div> : <p>Unfortunantly, this product is out of stock</p>
                                            
                                            }
                                            
                                            <div className="desc" dangerouslySetInnerHTML={{ __html:data.product.description }}></div>
                                        </div>
                                        
                                    </div>
                    
                                    
                                </div>
                            </div>
                        )
                    }
                }}
            
            
            </Query>
            
        )
    }
}

export default PDPComponent;