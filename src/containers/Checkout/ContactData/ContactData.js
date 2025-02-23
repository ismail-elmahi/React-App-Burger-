import React, {Component} from 'react';
import {connect} from 'react-redux';
import Button from '../../../components/UI/Button/Button';
import classes from '../ContactData/ContactData.module.css';
import axios from '../../../axios-order';
import Spinner from '../../../components/UI/Spinners/Spinners';
import Input from '../../../components/UI/input/input';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../../store/actions/index';
import {checkValidity} from '../../../shared/utility';

class ContactData extends Component {
state = {
    orderForm: {
        name: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Your Name'
            },
            value: '',
            validation: {
                required: true
            },
            valid: false,
            touched: false
        },
        street: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Street'
            },
            value: '',
            validation: {
                required: true
            },
            valid: false,
            touched: false
        },
        zipCode: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'ZIP Code'
            },
            value: '',
            validation: {
                required: true,
                minLength: 5,
                maxLength: 5,
                isNumeric: true
            },
            valid: false,
            touched: false
        },
        country: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Country'
            },
            value: '',
            validation: {
                required: true
            },
            valid: false,
            touched: false
        },
        email: {
            elementType: 'input',
            elementConfig: {
                type: 'email',
                placeholder: 'Your E-Mail'
            },
            value: '',
            validation: {
                required: true,
                isEmail: true
            },
            valid: false,
            touched: false
        },
        deliveryMethod: {
            elementType: 'select',
            elementConfig: {
                options: [
                    {value: 'fastest', displayValue: 'Fastest'},
                    {value: 'cheapest', displayValue: 'Cheapest'}
                ]
            },
            value: 'fastest',
            validation: {},
            valid: true
        }
    },
    formIsValid: false
}
    orderHandler = (e) => {
    e.preventDefault();
    
      const formData = {};
      for(let formElementIdentifier in this.state.orderForm){
          formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
      }
    const order = { 
        ingredients: this.props.ings,
        price:this.props.price,
        orderData: formData,
        userId:this.props.userId
    }
    this.props.onOrderBurger(order, this.props.token);
   
}
 
     inputChangeHandler = (event, inputIdentifier) => {
   const updateOrderForm = {
    ...this.state.orderForm
   };
    const updateElementForm ={
       ...updateOrderForm[inputIdentifier]  
   }; 
    updateElementForm.value = event.target.value;
    updateElementForm.valid = checkValidity(updateElementForm.value, updateElementForm.validation);
    updateElementForm.touched= true;  
    updateOrderForm[inputIdentifier] = updateElementForm;

    let formIsValid = true;
    for (let inputIdentifier in updateOrderForm){
        formIsValid= updateOrderForm[inputIdentifier].valid && formIsValid;
    }
      this.setState({orderForm : updateOrderForm, formIsValid: formIsValid})
} 

render() {
    const formElementArray = [];
    for(let key in this.state.orderForm) {
        formElementArray.push({
            id : key,
            config: this.state.orderForm[key]
        });
    }
let form = (
    <form onSubmit={this.orderHandler}>
        {formElementArray.map(formElement => (
     
            <Input 
            key={formElement.id}
            elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}
            invalid={!formElement.config.valid}
            shouldValidate={formElement.config.validation}
            touched={formElement.config.touched}
            changed={(event) => this.inputChangeHandler(event, formElement.id)} />
       ))}
      <Button btnType="Success" disabled={!this.state.formIsValid}> Order </Button>
    </form>
);
if(this.props.loading) {
    form = <Spinner />; 
}
    return(
    <div className={classes.ContactData}>
        <h1>Enter your Conatact Data</h1>
         {form}
    </div>
    );
}

}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        loading: state.order.loading,
        token : state.auth.token,
        userId : state.auth.userId
    }
};

const mapDispatchToProps = dispatch => {
    return {
     onOrderBurger: (orderData, token) => dispatch(actions.purchaseBurger(orderData, token))
    };
    }; 

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));