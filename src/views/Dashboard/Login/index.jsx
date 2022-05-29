import React, { useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginUserAPI } from '../../../config/store/action';
import Button from '../../../components/Button';
import { ActionType } from '../../../config/store/action/globalActionType';
import './login.css';

export const Login = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isLoading, loginAPI } = props;
  const [state, setstate] = useState({
    user: '',
    password: ''
  });

  const handleChangeText = (e) => {
    setstate({
      ...state,
      [e.target.id]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { user, password } = state;
    const res = await loginAPI({ email: user, password }).catch((err) => err);
    if (res) {
      localStorage.setItem('userData', JSON.stringify(res));
      setstate({
        user: '',
        password: ''
      });
      dispatch({ type: ActionType.IS_LOGIN, value: true });
      navigate('/dashboard');
    } else {
      console.log('login faield');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <p>Login</p>
        <input
          id="user"
          className="input"
          type="text"
          placeholder="User"
          onChange={handleChangeText}
          value={state.user}
        />
        <input
          id="password"
          className="input"
          type="password"
          placeholder="Password"
          onChange={handleChangeText}
          value={state.password}
        />
        <Button onClick={handleSubmit} title="Login" isLoading={isLoading} />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  isLoading: state.isLoading
});

const mapDispatchToProps = (dispatch) => ({
  loginAPI: (data) => dispatch(loginUserAPI(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
