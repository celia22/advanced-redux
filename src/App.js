import { useSelector, useDispatch } from 'react-redux';
import { Fragment, useEffect } from 'react';
import  {uiActions } from './store/uiSlice'

import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import Notification from './components/UI/Notification';

let isInitial = true;

function App() {
  const dispatch = useDispatch();
  const showCart = useSelector((state) => state.ui.cartIsVisible);
  const cart = useSelector((state) => state.cart);
  const notification = useSelector((state) => state.ui.notification);

  useEffect(() => {
    const sendDataToCart = async () => {
      dispatch(
        uiActions.showNotification({
          status: 'pending',
          title: 'sending',
          message: 'sending cart data',
        })
      );
      const response = await fetch(
        'https://redux-cart-8cb78-default-rtdb.europe-west1.firebasedatabase.app/cart.json',
        { method: 'PUT', body: JSON.stringify(cart) }
      );

      if (!response.ok) {
        throw new Error('sending data to cart failed');
      }

      dispatch(
        uiActions.showNotification({
          status: 'success',
          title: 'Success!!',
          message: 'sending cart data',
        })
      );
    };

    if (isInitial) {
      isInitial = false;
      return;
    }

    sendDataToCart().catch((error) => {
      dispatch(
        uiActions.showNotification({
          status: 'error',
          title: 'Error!!',
          message: 'sending cart data failed',
        })
      )
    });
  }, [cart, dispatch]);

  return (
    <Fragment>
      {notification && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )}
      <Layout>
        {showCart && <Cart />}
        <Products />
      </Layout>
    </Fragment>
  );
}

export default App;
