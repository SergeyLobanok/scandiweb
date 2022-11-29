import React, {Component} from "react";
import './Category.scss';
import {gql}  from "@apollo/client";
import {graphql} from "@apollo/client/react/hoc";
import { Link } from "react-router-dom";



const  getAllCategoriesQuery =  gql`
{
    categories{
        name
        products{
          id
          name
          brand
          inStock
          gallery
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
}`;


    
class Category extends Component{
    constructor(props){
        super(props);
        this.state ={
            amount : {
                length: 6
            }
        }
        this.loadMore = this.loadMore.bind(this);
    }
  

    loadMore(){
        let button = document.querySelector('button');
        button.style.display = "none";
        this.setState({
            amount:{}
        })
        
    }
    

    showProducts(){
        let data = this.props.data;
        if(data.loading === false){
        let outofstock = document.querySelector('.outofstock');
            
           return data.categories.map(item =>{
                if(item.name === this.props.activeCategory.join()){
                    return (item.products.slice(0,this.state.amount.length).map(element =>{
                            return <div className="category-element" key={element.id} item={element} >
                            <div className="category-element-img">
                                <img src={element.gallery}   alt="Image"/>
                                <img src={require("../../resourses/images/Circle Icon.png")} id="cart" alt="image" onClick={()=>this.props.addToOrder(element)}/>
                               
                                <div className="outofstock" style= {element.inStock ? {display: 'none'} : {display :'block' } }>
                                    <div className="outofstock-text">
                                        out of stock
                                    </div> 
                                </div>
                            </div>
                            <Link to={{pathname:`/PDPPage/${element.id}`, propsPage:element.id, id:element.id}}><h3>{element.name}</h3></Link>
                            {element.prices.map(price=>{
                                if(price.currency.symbol === this.props.currentCurrency.join()){
                                   return  <p><b>{price.currency.symbol}</b><b>{price.amount}</b></p>
                                }
                                else{
                                    return;
                                }       
                                })}                    
                            </div>  
                       
                    }));
                    
                }
               
            });
            
        }else{
            return( <div>Loading <br/> Pleace wait...</div>)
        }

 
    };


    showEl(Category){
        let dataCategories = this.props.data;
        if(dataCategories.loading === false){
            return dataCategories.categories.map(item=>{
                if(this.props.activeCategory.join() === item.name){
                    return  (<h2>{item.name.charAt(0).toUpperCase()+ item.name.slice(1)}</h2>)
                }
                if(this.props.activeCategory.length === 0 && item.name === 'all'){
                    return (<h2>{item.name.charAt(0).toUpperCase()+ item.name.slice(1)}</h2>)
                }
             });
        }else{
            return;
        }
    }

    render(){
        return(  
            <div className='wrapper'>    
            <div className="container">
            <section className="category">
                {this.showEl()}
                <div className="category-elements">
                    {this.showProducts()}
                    
                </div>
                <button onClick={this.loadMore} style={this.props.activeCategory.join() === 'all' ? {display:'block'}:{display:'none'}}>Load more...</button>
            </section>
            </div>
            </div> 
           
        )
    }
}





export default graphql(getAllCategoriesQuery)(Category);