import React, { useEffect } from 'react';
import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';

const Orders  = (props) => {

  const { onGetOrders } = props;

  useEffect(() => {
    onGetOrders(props.token, props.userId);
  }, [onGetOrders, props.token, props.userId]);

  let order = props.loading ? <Spinner /> : <h2 style={{ textAlign: 'center' }}>No Orders yet!</h2>;
  if (props.error) {
    order = <h2  style={{ textAlign: 'center' }}>Error Occured!</h2>;
  }

  if (props.orders && props.orders.length > 0) {
    order = props.orders.map(order =>
      <Order key={order.id} ingredients={order.ingredients} price={order.price} />);
  }

  return (
    <div>
      {order}
    </div>
  );
};

const mapStateToProps = state => {
  return {
    orders: state.orders.orders,
    loading: state.orders.loading,
    error: state.orders.error,
    token: state.auth.token,
    userId: state.auth.userId
  };
}

const mapDispatchToProps = dispatch => {
  return {
    onGetOrders: (token, user) => dispatch(actions.getOrders(token, user))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));