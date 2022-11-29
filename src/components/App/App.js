import React,{Component} from "react";
import Header from "../Header/Header";
import Category from "../Category/Category";
import { BrowserRouter as Router,Routes, Route} from "react-router-dom";
import CategoryPage from "../pages/CategoryPage";
import PDPPage from "../pages/PDPPage";
import CartPage from "../pages/CartPage";



class App extends Component{
    constructor(props){
        super(props);
        this.state = {
            orders : [],
            tax:21,
            finalOrders:[],
            activeCategory : ['all'],
            currentCurrency : ['$'],
            choosenAttributes:[],
        };
        this.addToOrder = this.addToOrder.bind(this);
        this.chooseCategory = this.chooseCategory.bind(this);
        this.changeCurrency = this.changeCurrency.bind(this);
        this.increaseItem = this.increaseItem.bind(this);
        this.decreaseItem = this.decreaseItem.bind(this);
        this.nextImage = this.nextImage.bind(this);
        this.prevImage = this.prevImage.bind(this);
        this.onChoosenAttributes = this.onChoosenAttributes.bind(this);
        this.addToFinalOrder = this.addToFinalOrder.bind(this);
        this.toCountFinalSum = this.toCountFinalSum.bind(this);
    }


    render(){
        return(
            
            <Router>
                <Routes>
                    <Route  path='/' element={ <CategoryPage orders={this.state.orders} chooseCategory={this.chooseCategory} changeCurrency={this.changeCurrency} currentCurrency={this.state.currentCurrency} count={this.state.count} increaseItem={this.increaseItem} decreaseItem={this.decreaseItem}  addToOrder={this.addToOrder}  onChangeCategory={this.onChangeCategory} activeCategory={this.state.activeCategory} onChoosenAttributes={this.onChoosenAttributes} choosenAttributes={this.state.choosenAttributes} addToFinalOrder={this.addToFinalOrder}  finalOrders={this.state.finalOrders} showMobileMenu={this.showMobileMenu} closeMobileMenu={this.closeMobileMenu}/>}/>
                    <Route  path='/PDPPage/:id' element={<PDPPage orders={this.state.orders} chooseCategory={this.chooseCategory} changeCurrency={this.changeCurrency} currentCurrency={this.state.currentCurrency} count={this.state.count} increaseItem={this.increaseItem} decreaseItem={this.decreaseItem}  addToOrder={this.addToOrder}  onChangeCategory={this.onChangeCategory} activeCategory={this.state.activeCategory} onChoosenAttributes={this.onChoosenAttributes} choosenAttributes={this.state.choosenAttributes} showMobileMenu={this.showMobileMenu} closeMobileMenu={this.closeMobileMenu}/>}/>
                    <Route  path='/CartPage' element={ <CartPage orders={this.state.orders} chooseCategory={this.chooseCategory} changeCurrency={this.changeCurrency} currentCurrency={this.state.currentCurrency} count={this.state.count} increaseItem={this.increaseItem} decreaseItem={this.decreaseItem}  addToOrder={this.addToOrder}  onChangeCategory={this.onChangeCategory} activeCategory={this.state.activeCategory} nextImage={this.nextImage} prevImage={this.prevImage} onChoosenAttributes={this.onChoosenAttributes} choosenAttributes={this.state.choosenAttributes} addToFinalOrder={this.addToFinalOrder} chooseAttrib={this.chooseAttrib}  toCountFinalSum={this.toCountFinalSum} showMobileMenu={this.showMobileMenu} closeMobileMenu={this.closeMobileMenu}/>}/>   
                </Routes>
            </Router>
        )
    }

    showMobileMenu(){
        let burger = document.querySelector('.burger'),
            nav = document.querySelector('nav'),
            ul = document.querySelector('ul'),
            li = document.querySelector('li'),
            closeButton = document.querySelector('.close'),
            shopingCart = document.querySelector('.shopping-cart-area'),
            a = document.querySelector('a');
        burger.style.display = 'none';
        nav.style.display = 'block';
         ul.style.display = 'block';
         li.style.display = 'block';
         li.style.height = 'auto';
        a.style.display = 'block';
        shopingCart.style.display = 'block';
        closeButton.style.display = 'block';
        closeButton.style.marginLeft = '20px'
    }

    closeMobileMenu(){
        let burger = document.querySelector('.burger'),
        nav = document.querySelector('nav'),
        ul = document.querySelector('ul'),
        li = document.querySelector('li'),
        closeButton = document.querySelector('.close'),
        a = document.querySelector('a');
        burger.style.display = 'block';
        nav.style.display = 'none';
         ul.style.display = 'none';
         li.style.display = 'none';
         li.style.height = 'auto';
        a.style.display = 'none';
        closeButton.style.display = 'none';
    }
    
    chooseCategory(category){
        if(this.state.activeCategory.length === 0){
            this.setState({activeCategory: [...this.state.activeCategory, category]});
        }else{
            this.setState({activeCategory: [...this.state.activeCategory.slice(1), category]});
        }
        
    }

    changeCurrency(currency){
           return this.setState({currentCurrency: [...this.state.currentCurrency.slice(1), currency]});
    }

    addToOrder =(item)=>{
        let isInArray = false;
        this.state.orders.forEach(element =>{
            if(element.id === item.id){
                isInArray = true;
            }
        })
            if(!isInArray && item.inStock === true){
                let newItem = Object.assign({}, item);
                newItem.count = 1;
                newItem.currentImageIndex = 0;
                newItem.choosenAttributes = '';
                newItem.totalPrice = item.prices;
                this.setState({ orders: [...this.state.orders, newItem]})

            }
        
    }

    increaseItem (id){
       this.setState({orders: this.state.orders.map(product=>{
        if(id === product.id){
            return{
                ...product,
                count: ++product.count, 
                totalPrice: product.prices.map((element)=>({
                    ...element,
                    amount: element.amount * product.count
                }))
            }    
        }
            return product;     
           }         
       )})
    }
   
    

    decreaseItem (id){
        
        this.setState({orders: this.state.orders.map(product=>{
         if(id === product.id){
             return{
                 ...product,
                 count: --product.count, 
                 totalPrice: product.prices.map((element)=>({
                     ...element,
                     amount: element.amount * product.count
                 }))
             }   
         }
             return product;     
            }         
        )})
        this.state({orders: this.state.orders.map(product=>{
            if(id === product.id){
                if(product.count < 1){
                    this.setState({orders: this.state.orders.filter(item => item.id !== id)})
                }
            }
        })})
        
    }

    nextImage(id){
        this.setState({orders: this.state.orders.map(product=>{
            if(product.id === id){
                if(product.currentImageIndex === product.gallery.length - 1){
                    return{
                        ...product, 
                        currentImageIndex: product.currentImageIndex = 0 
                            
                    }
                }
                else{
                    return{
                        ...product, 
                        currentImageIndex: ++product.currentImageIndex
                            
                    }
                }
            }
            return product;
        })})
    }

    prevImage(id){
        this.setState({orders: this.state.orders.map(product=>{
            if(product.id === id){
                if(product.currentImageIndex=== 0){
                    return{
                        ...product, 
                        currentImageIndex: product.gallery.length -1    
                    }
                }
                else{
                    return{
                        ...product, 
                        currentImageIndex: product.currentImageIndex -1 
                    }
                }
               
            }
            return product;
        })}) 
    }
    

    onChoosenAttributes(id,name, value){
       
        let isInArray = false;
        this.state.choosenAttributes.forEach(element =>{
            if(element.productID === id){
                isInArray = true;
            }
        })

        if(!isInArray){
            this.setState({
                 choosenAttributes:[...this.state.choosenAttributes, {productID: id, [name]: value }]
            })
        }
        if(isInArray){
            this.state.choosenAttributes.map(el=>{
            
                if(el.productID ===id && el.attributeName !== name){
                    return this.setState({choosenAttributes: [...this.state.choosenAttributes.map(product=>{
                    if(product.productID === id){
                    return {
                        ...product,
                        [name] : value
                        }     
                                            
                    }
                return product
            }
            )]})
            }        
            })
        }
    
    
       
      
    }


    toCountFinalSum(){
        let sum = 0,
            tax = this.state.tax,
            sizeOfTax = 0,
            quantity = 0,
            sumOfTax = 0;

        this.state.orders.map(product =>{
            product.totalPrice.map(price=>{  
                if(price.currency.symbol === this.state.currentCurrency.join()){
                    sum = sum + price.amount;
                }                      
            })
        })

        this.state.orders.map(product =>{
            quantity = quantity + product.count
        })

        sumOfTax = sum - (sum/100*tax)
        sizeOfTax = sum - sumOfTax



        return (
            <>
                {
                <div className="information">
                    <table>
                        <tr>
                            <td>tax {this.state.orders.length !== 0 ? this.state.tax : ''}%:</td>
                            <td><b>{this.state.currentCurrency}{new Intl.NumberFormat().format(sizeOfTax)}</b></td>
                        </tr>
                        <tr>
                            <td>Quantity:</td>
                            <td><b>{quantity}</b></td>
                        </tr>
                        <tr>
                            <td>total: </td>
                            <td><b className="totalSum">{this.state.currentCurrency}{new Intl.NumberFormat().format(sum)}</b></td>
                        </tr>
                    </table>
                    <div className="order" value="order" onClick={(e)=>this.addToFinalOrder(e)}>order</div>
                 </div>
                    
                }
            </>
        )

    }
     


    addToFinalOrder= async (e)=>{
        if(this.state.orders.length === 0){
            return
        }else{
            await this.setState({
                orders: this.state.orders.map(product=>{
                    if(this.state.choosenAttributes.find(item=> item.productID === product.id && item.length !== 0)){
                        return{
                            ...product,
                            choosenAttributes:this.state.choosenAttributes.find(item=> item.productID === product.id)
                        }
                    }
                    return product
                })
            })
        
            
            if(this.state.orders.every(product=> product.choosenAttributes.length !== 0 || product.attributes.length === 0)){
                let orders = this.state.orders;
                orders.sum = e.target.value !== "check out" ? document.querySelector(".totalSum").textContent : document.querySelector(".sumInMiniCart").textContent
                this.setState({          
                    finalOrders: [...this.state.finalOrders, orders] 
                })
                this.setState({
                    orders:[]
                })
                this.setState({
                    choosenAttributes:[]
                })
                alert("Thank you!")
            }else{
                alert("Pleace choose attributes")
            }
            
        
        }
         
    }

     
    

}


export default App;