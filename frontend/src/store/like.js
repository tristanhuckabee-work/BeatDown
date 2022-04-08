import { csrfFetch } from "./csrf";

// ------------------------------------------------------------------------- //
const GET    = '/likes'
const LIKE   = '/likes/add'
const UNLIKE = '/likes/del'

const initialState = [];

const getLikes = (payload) => {
  return { type: GET, payload } };
const addLike  = (payload) => {
  return { type: LIKE, payload } };
const delLike  = (payload) => {
  return { type: UNLIKE, payload } };

export const getAllLikes = (payload) => async dispatch => {
  const res = await csrfFetch('/api/likes');
  const likeArray = await res.json();

  dispatch( getLikes( likeArray ) );
}
export const addOneLike = (payload) => async dispatch => {
  const res = await csrfFetch('/api/likes/add', {
    method: 'POST',
    body: JSON.stringify(payload)
  });
  await res.json();
  dispatch( addLike(payload) )
}
export const delOneLike = (id) => async dispatch => {
  const res = await csrfFetch('/api/likes/del', {
    method: 'DELETE',
    body: JSON.stringify(id)
  });
  const data = await res.json();
  dispatch( delLike(data) );
}

const LikeReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case GET:
      newState = [ ...state ];
      newState = action.payload;

      return newState;
    case LIKE:
      newState = [ ...state ];
      newState.concat( action.payload );

      return newState;
    case UNLIKE:
      newState = [ ...state ]
      newState = newState.filter( like => {
        if ( like.id !== action.payload ) return like;
      });

      return newState;
    default:
      return state;
  }
}

// ------------------------------------------------------------------------- //

export default LikeReducer;