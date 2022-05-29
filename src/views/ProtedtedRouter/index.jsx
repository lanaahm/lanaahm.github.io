import React from 'react';
import { connect } from 'react-redux';
import { Navigate } from 'react-router-dom';

export const ProtedtedRouter = (props) => {
  const { isLogin, children } = props;

  if (!isLogin) return <Navigate to="/login" />;

  return children;
};
const mapStateToProps = (state) => ({
  isLogin: state.isLogin
});

export default connect(mapStateToProps, null)(ProtedtedRouter);
