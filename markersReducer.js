import update from 'immutability-helper'
import {
    FETCH_MARKERS_BEGIN,
    FETCH_MARKERS_SUCCESS,
    FETCH_MARKERS_FAILURE,
    TOGGLE_SELECTED_MARKER,
    SET_MARKER_ICON,
    SET_AVAILABLE_MARKER,
  } from './../actions/markersAction'

  
  const initialState = {
    items: [],
    selected_marker: null,
    loading: false,
    error: null
  }

  export default function markerReducer(state = initialState, action) {
    switch(action.type) {
      case FETCH_MARKERS_BEGIN:
        return {
          ...state,
          loading: true,
          error: null
        }
  
      case FETCH_MARKERS_SUCCESS:
        return {
          ...state,
          loading: false,
          items: action.payload.markers
        }
  
      case FETCH_MARKERS_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload.error,
          items: []
        }

      case TOGGLE_SELECTED_MARKER:
        const { data } = action
        return update(state, {
          items: {
            [data[0]]: {
              sel: {$set: data[1]}
            }
          },
          selected_marker : {$set: data[0]}
        })

      case SET_MARKER_ICON:
        const { new_icon } = action
        return update(state, {
          items: {
            [new_icon[0]]: {
              icon: {$set: new_icon[1]}
            }
          }
        })

      case SET_AVAILABLE_MARKER:
        const { marker_item } = action
        return update(state, {
          items: {
            [marker_item[0]]: {
              avail: {$set: marker_item[1]}
            }
          }
        })

      default:
        return state
    }
  }
