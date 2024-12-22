import { Dispatch } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import axios from "axios";
import {
   getUserStart,
   getUserSuccess,
   getUserFailure,
} from '../store/UserStore';

export const getUsers = () => async (dispatch: Dispatch) => {
   dispatch(getUserStart());
   try {
      const response = await axios.get("https://dummyjson.com/users");
      dispatch(getUserSuccess(response?.data));
   } catch (err: any) {
      dispatch(getUserFailure(err.message ?? 'Error fetch users'));
      toast.error(err.message ?? 'Error fetch users');
   }
};
