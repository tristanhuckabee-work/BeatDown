import { csrfFetch } from "./csrf";

const GET = 'GET_COMMENTS';
const COMMENT = 'ADD_COMMENT';
const DELETE = 'DELETE_COMMENT';

const getComments = payload => {
  return { type: GET, payload }};
const addComment = payload => {
  return { type: COMMENT, payload }};
const deleteComment = payload => {
  return { type: DELETE, payload }};

export const getAllComments = payload => async dispatch => {
  const res = await csrfFetch('/api/comments/');
  const arr = await res.json();
  const data = arr.filter(comment => comment.songId === payload ? true : false );

  dispatch( getComments(data) );
}
export const addNewComment  = payload => async dispatch => {
  const {songId, userId, content} = payload;
  const res = await csrfFetch('/api/comments/new', {
    method: 'POST',
    body: JSON.stringify({songId, userId, content})
  });
  const data = await res.json();
  data.User = payload.user;

  dispatch( addComment(data) );
}
export const delOneComment  = payload => async dispatch => {
  const res = await csrfFetch('/api/comments/del', {
    method: 'DELETE',
    body: JSON.stringify({id: payload})
  });
  const data = await res.json();
  console.log(data);
  dispatch( deleteComment(data) );
  return payload;
}

const initialState = [];
const CommentReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case GET:
      return action.payload;
    case COMMENT:
      newState = state;
      newState.push(action.payload);
      return newState;
    case DELETE:
      newState = state;
      return  newState.filter(comment => {
        if (comment.id === action.payload.id) {
          return false;
        } else {
          return true;
        }
      })
    default:
      return state;
  }
}

export default CommentReducer;