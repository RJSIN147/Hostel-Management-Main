import {
  STUDENT_LIST_REQUEST,
  STUDENT_LIST_SUCCESS,
  STUDENT_LIST_ERROR,
  STUDENT_ADD_ERROR,
  STUDENT_ADD_REQUEST,
  STUDENT_ADD_SUCCESS,
  STUDENT_DELETE_ERROR,
  STUDENT_DELETE_REQUEST,
  STUDENT_DELETE_SUCCESS,
  STUDENT_UPDATE_ERROR,
  STUDENT_UPDATE_REQUEST,
  STUDENT_UPDATE_SUCCESS,
  STUDENT_DETAILS_REQUEST,
  STUDENT_DETAILS_SUCCESS,
  STUDENT_DETAILS_ERROR,
  STUDENT_ROOM_NO_REQUEST,
  STUDENT_ROOM_NO_SUCCESS,
  STUDENT_ROOM_NO_ERROR,
} from "../constants/studentConstant";
import api from "../config/axios";

export const listStudents = (keyword = "", pageNumber = "") => async (
  dispatch,
  getState
) => {
  try {
    dispatch({ type: STUDENT_LIST_REQUEST });
    const { data } = await api.get(
      `/student/all?keyword=${keyword}&pageNumber=${pageNumber}`
    );
    dispatch({
      type: STUDENT_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: STUDENT_LIST_ERROR,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const addStudent = (student) => async (dispatch, getState) => {
  try {
    dispatch({ type: STUDENT_ADD_REQUEST });
    const { data } = await api.post(`/student/addStudent`, student);

    dispatch({
      type: STUDENT_ADD_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: STUDENT_ADD_ERROR,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getStudentDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: STUDENT_DETAILS_REQUEST });
    const { data } = await api.get(`/student/${id}`);

    dispatch({
      type: STUDENT_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: STUDENT_DETAILS_ERROR,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateStudent = (student) => async (dispatch, getState) => {
  try {
    dispatch({ type: STUDENT_UPDATE_REQUEST });
    const { data } = await api.put(`/student/${student._id}`, student);

    dispatch({
      type: STUDENT_UPDATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: STUDENT_UPDATE_ERROR,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteStudent = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: STUDENT_DELETE_REQUEST });
    const { data } = await api.delete(`/student/${id}`);

    dispatch({
      type: STUDENT_DELETE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: STUDENT_DELETE_ERROR,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getStudentsByRoomNo = (roomNo) => async (dispatch, getState) => {
  try {
    dispatch({ type: STUDENT_ROOM_NO_REQUEST });
    const { data } = await api.get(`/student/room/${roomNo}`);
    dispatch({
      type: STUDENT_ROOM_NO_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: STUDENT_ROOM_NO_ERROR,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
