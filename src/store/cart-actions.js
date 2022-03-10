import { uiActions } from './uiSlice';
import { cartActions } from './cartSlice';


export const fetchCartData = () => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await fetch(
        'https://redux-cart-8cb78-default-rtdb.europe-west1.firebasedatabase.app/cart.json'
      );
      if (!response.ok) {
        throw new Error('could not fetch cart data!');
      }
      const data = await response.json();
      return data;
    };
    try {
      const cartData = await fetchData();
      dispatch(cartActions.replaceCart({items:cartData.items || [], totalQuantity: cartData.totalQuantity,
      })) // esto se hace para que no de undefined si el cart esta vacio y se hace el fetch inicial
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: 'error',
          title: 'Error!!',
          message: 'fetching cart data failed',
        })
      );
    }
  };
};

export const sendCartData = (cart) => {
  return async (dispatch) => {
    dispatch(
      uiActions.showNotification({
        status: 'pending',
        title: 'sending',
        message: 'sending cart data',
      })
    );

    const sendRequest = async () => {
      const response = await fetch(
        'https://redux-cart-8cb78-default-rtdb.europe-west1.firebasedatabase.app/cart.json',
        { method: 'PUT', body: JSON.stringify({
            items: cart.items,
            totalQuantity: cart.totalQuantity,
        }) }
      );
      if (!response.ok) {
        throw new Error('sending data to cart failed');
      }
    };

    try {
      await sendRequest();
      dispatch(
        uiActions.showNotification({
          status: 'success',
          title: 'Success!!',
          message: 'sending cart data',
        })
      );
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: 'error',
          title: 'Error!!',
          message: 'sending cart data failed',
        })
      );
    }
  };
};
