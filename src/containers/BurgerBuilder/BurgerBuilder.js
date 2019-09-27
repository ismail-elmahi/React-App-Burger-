import React, {Component} from 'react';
import {connect} from 'react-redux';
import Auxiliary from '../../hoc/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinners/Spinners';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';
import axios from '../../axios-order';

export class BurgerBuilder extends Component {
    //  constructor(props) {
       
    //  }
     state = {
         purchasing: false,
         
     }
componentDidMount () {
    this.props.onInitIngredients();
   
}
     updatePurchaseState (ingredients) {
          
          const sum = Object.keys(ingredients)
          .map(igkey => {
              return ingredients[igkey]
          })
          .reduce((sum, el) => {
              return sum + el;
          }, 0 );
          return sum > 0;
     }
 

purchasingHandler = () => {
    if(this.props.isAuthenticated) {
        this.setState({purchasing: true});
    }else {
        this.props.onSetAuthRedirectPath('/checkout');
        this.props.history.push('/auth');
    }
    
}
purchasingCancel = () =>{
    this.setState({purchasing: false});
}
purchasContinueHandler = () => {
    // alert('You are continue');
    this.props.onInitPurchase(); 
    this.props.history.push('/checkout'); 
}

    render() {  
        const disableInfo = {
            ...this.props.ings
        };
        for( let key in disableInfo) {
            disableInfo[key] = disableInfo[key] <= 0
        }
        let orderSummary = null;
        let burger= this.props.error ? <p>ingredients can't loaded</p> : <Spinner/>
        if(this.props.ings) { 
        burger= (
            <Auxiliary>
                <Burger ingredients={this.props.ings}/>
                <BuildControls 
                ingredientAdded={this.props.onIngredientAdded}
                ingredientRemoved={this.props.onIngredientRemoved} 
                disabled={disableInfo}
                purshasable={this.updatePurchaseState(this.props.ings)}
                ordered={this.purchasingHandler}
                isAuth= {this.props.isAuthenticated}
                price = {this.props.price} />
            </Auxiliary>
        );
        orderSummary =  <OrderSummary
        price={this.props.price}
        purchasCancel={this.purchasingCancel}
        purchasContinue={this.purchasContinueHandler}
        ingredients={this.props.ings}/>;
        }
       
        return(
            <Auxiliary>
                <Modal show={this.state.purchasing} modelClose={this.purchasingCancel}> 
                   {orderSummary} 
                </Modal>
               {burger}
                
            </Auxiliary>
        );
    }
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        error : state.burgerBuilder.error,
        isAuthenticated: state.auth.token !== null 
    }
}

const mapDispatchToProps =  dispatch => {
    return {
       onIngredientAdded: (ingName) => dispatch(actions.addIngredient(ingName)),
       onIngredientRemoved: (ingName) => dispatch(actions.removeIngredient(ingName)), 
       onInitIngredients: () => dispatch(actions.initIngredients()),
       onInitPurchase : () => dispatch(actions.purchaseInit()),
       onSetAuthRedirectPath : (path) => dispatch(actions.setAuthRedirectPath(path))
    }
}




export default  connect(mapStateToProps, mapDispatchToProps)(withErrorHandler( BurgerBuilder, axios));