import {
  USER_PROFILE,
  CLEAR_USER_PROFILE_ERRORS,
  RESET_USER_PROFILE_STATE,
} from "./constant";
import Service from "../../services";
import * as API from "./actionTypes";
import { getAccessToken, setAccessToken } from "../../helpers/local-storage";

const getUserProfileAction = () => async (dispatch) => {
  dispatch({ type: USER_PROFILE.request });
  const token = getAccessToken();
  const response = await Service.fetchGet(
    `${API.BASE_USER}${API.USERS_PROFILE.Profile}`,
    token
  );
  if (response[0] === true) {
    dispatch({ type: USER_PROFILE.success, payload: response[1].data });
  } else {
    dispatch({
      type: USER_PROFILE.fail,
      payload: response[1],
    });
  }
};

const setPasswordAction = (data) => async(dispatch)=>{
  const token = getAccessToken();
  dispatch({type: USER_PROFILE.request})
  const response = await Service.fetchPost(
    `${API.BASE_USER}${API.USERS_PROFILE.SetPassword}`, data, token
  );

  if (response[0] === true) {
    const res = {fullName: data.fullName}
    dispatch({ type: USER_PROFILE.update, payload: res});
    return response
  } else {
    dispatch({
      type: USER_PROFILE.fail,
      payload: response[1],
    });
  }
}

const findUserEmailAction = async(email)=>{
  const json = {
    userInput : email,
  }
  const response = await Service.fetchPost(
    `${API.BASE_AUTH}${API.AUTH_ROUTES.userEmail}`, json
  );
  
  return response
}

const userLoginAction = async(data)=>{
  const response = await Service.fetchPost(
    `${API.BASE_AUTH}${API.AUTH_ROUTES.userLogin}`, data
  );
  
  return response;
}

const sendEmailVerificationAction = async(data)=>{
  console.log(data, "sending email verification")
  const response = await Service.fetchPost(
      `${API.BASE_AUTH}${API.AUTH_ROUTES.sendEmailOTP}`, data
  );
  return response;
}

const verifyEmailAction = (data) => async(dispatch)=>{
  dispatch({ type: USER_PROFILE.request });
  const response = await Service.fetchPost(
    `${API.BASE_AUTH}${API.AUTH_ROUTES.verifyEmail}`, data
  );
  if (response[0] === true) {
    console.log(response)
    setAccessToken(response[1]?.token)
    dispatch({ type: USER_PROFILE.success, payload: response[1]?.data });
    return response[0]
  } else {
    dispatch({
      type: USER_PROFILE.fail,
      payload: response[1],
    });
  }

};


const clearUserProfileErrorsAction = () => (dispatch) => {
  dispatch({
    type: CLEAR_USER_PROFILE_ERRORS,
  });
};

const resetUserProfileAction = () => (dispatch) => {
  dispatch({ type: RESET_USER_PROFILE_STATE });
};

export default {
  getUserProfileAction,
  clearUserProfileErrorsAction,
  resetUserProfileAction,
  findUserEmailAction,
  userLoginAction,
  sendEmailVerificationAction,
  verifyEmailAction,
  setPasswordAction,
};
