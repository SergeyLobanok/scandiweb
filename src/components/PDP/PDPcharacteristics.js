import React,{Component} from "react";
import { elementAt } from "rxjs-compat/operator/elementAt";
import { every } from "rxjs-compat/operator/every";

import Category from "../Category/Category";




class PDPcharacteristics extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            product : this.props.data,
            productID: this.props.data.id,
            changeAttributes : this.props.changeAttributes,
            
            
        };
    }


    
    render(){
        
        return(
       
            <div className="characteristics">
                {this.state.product.attributes.map(attrib=>{
                    if(attrib.name !== 'Color'){     
                        return  <div className="element">
                                <h2>{attrib.name}</h2> 
                                <div className="elementWrap">
                                    {attrib.items.map(el=>{
                                        return <div className="eachElement" onClick={()=>this.props.onChoosenAttributes(this.state.product.id, attrib.name, el.value)} key={el.id} name={attrib.name}  style={this.props.choosenAttributes.find(item=>(Object.keys(item).find(element=> element === attrib.name) && Object.values(item).find(element=> element === el.value))) ? {background: '#1D1F22', color: '#ffffff'} : {background: '#ffffff', color: '#000000'}}>{el.value}</div> 
                                    })}         
                                </div>
                            </div>  
                    }
                    if(attrib.name === 'Color'){
                        return  <div className="element">
                           <h2>Color:</h2> 
                            <div className="elementWrap">
                                {attrib.items.map(el=>{
                                    return <div className="color" onClick={()=>this.props.onChoosenAttributes(this.state.product.id, attrib.name, el.value)} style={{background: el.value, width:"36px", height:"36px"}} ></div>
                                })}         
                                    
                            </div>
                        </div>  
                    }
                    }
                )}

            </div>

        )
        
    }

}

export default PDPcharacteristics;