import * as actionType from './actionType';
import axios from '../../axios-order';

export const purchaseBurgerSuccess = (id, orderData) => {
    return {
       type: actionType.PURCHASE_BURGER_SUCCESS,
       orderId: id,
       orderData: orderData    
    };
};

export const purchaseBurgerFail = (error) => {
    return {
       type: actionType.PURCHASE_BURGER_FAIL,
       error: error    
    };
};

export const purchaseBurgerStart = () =>{
    return {
        type: actionType.PURCHASE_BURGER_START
    }
}

export const purchaseBurger = (orderData, token) => {
    return dispatch => {
        dispatch(purchaseBurgerStart());
        axios.post('/orders.json?auth=' + token, orderData) 
        .then(response => {
           dispatch(purchaseBurgerSuccess(response.data.name, orderData)); 
        })
        .catch(error => {
            dispatch( purchaseBurgerFail(error) );
        });
    };
};

export  const purchaseInit = () =>{
    return {
        type: actionType.PURCHASE_INIT
    };
};

export const fetechOrdersSucces = (orders) => {
       return {
           type:actionType.FETECH_ORDERS_SUCCES,
           orders : orders

       };

};
export const fetechOrdersFail = (error) => {
       return {
           type:actionType.FETECH_ORDERS_FAIL,
           error: error

       };

};
export const fetechOrdersStart = () => {
       return {
           type:actionType.FETECH_ORDERS_START

       };

};

export const fetechOrders = (token, userId) => {
    return dispatch => {
        dispatch(fetechOrdersStart());
        const queryParams = '?auth=' + token + '&orderBy="userId"&equalTo="' + userId + '"';
        axios.get('/orders.json' + queryParams)
        .then(res => {
            const fetechedOrders = [];
            for(let key in res.data) {
                fetechedOrders.push( {
                    ...res.data[key],
                    id:key
                })
            }
        dispatch(fetechOrdersSucces(fetechedOrders));

        })
        .catch (err => {
           dispatch(fetechOrdersFail(err));
        })
    }
}

