import request from 'superagent'
import geo from 'mt-geo'
let url = `https://sheets.googleapis.com/v4/spreadsheets/${process.env.REACT_APP_SHEET_ID}/values:batchGet?ranges=Sheet1&majorDimension=ROWS&key=${process.env.REACT_APP_SHEET_API_KEY}`



function parseIt(str){
    if(str.indexOf('.') == 2 || str.indexOf('-') == 0) return str
    return geo.parseDMS(str);
}


function getMarkers() {
    return new Promise(function(resolve, reject){
        request
        .get(url)
        .accept('json')
        .end((err, resp) => {
            if (!err) {
                const markers = []
                resp.body.valueRanges[0].values.forEach((marker, index) => {
                    if (index < 1) return
                    let latitude = parseIt(marker[0])
                    let longitude = parseIt(marker[1])
                    markers.push({
                        id: index - 1,
                        name: marker[2],
                        lat: latitude,
                        lng: longitude,
                        num: marker[3],
                        img: marker[5],
                        icon: 'https://maps.google.com/mapfiles/ms/icons/blue.png',
                        sel: false,
                        avail: true
                    })
                })
                resolve(markers)
            } else reject(err)
        })
    })
}
   
export function fetchMarkers() {
    return dispatch => {
        dispatch(fetchMarkersBegin());
        return getMarkers()
        .then(json => {
            dispatch(fetchMarkersSuccess(json));
            return json;
        })
        .catch(error =>
            dispatch(fetchMarkersFailure(error))
        )
    }
}

export const FETCH_MARKERS_BEGIN = "FETCH_MARKERS_BEGIN"
export const FETCH_MARKERS_SUCCESS = "FETCH_MARKERS_SUCCESS"
export const FETCH_MARKERS_FAILURE = "FETCH_MARKERS_FAILURE"

export const fetchMarkersBegin = () => ({
    type: FETCH_MARKERS_BEGIN
})

export const fetchMarkersSuccess = markers => ({
    type: FETCH_MARKERS_SUCCESS,
    payload: { markers }
})

export const fetchMarkersFailure = error => ({
    type: FETCH_MARKERS_FAILURE,
    payload: { error }
})



export const TOGGLE_SELECTED_MARKER = "TOGGLE_SELECTED_MARKER"
export const SET_MARKER_ICON = "SET_MARKER_ICON"

export const toggleSelect = data => ({
    type: TOGGLE_SELECTED_MARKER,
    data
})

export const setMarker = new_icon => ({
    type: SET_MARKER_ICON,
    new_icon
})




export const SET_AVAILABLE_MARKER = "SET_AVAILABLE_MARKER"

export const setAvailableMarker = marker_item => ({
    type: SET_AVAILABLE_MARKER,
    marker_item
})