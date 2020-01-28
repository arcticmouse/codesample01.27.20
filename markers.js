import React from "react"
import { connect } from "react-redux"
import { fetchMarkers, toggleSelect, setMarker } from "./../actions/markersAction"



class MarkerList extends React.Component {
  componentDidMount() {
    this.props.fetchMarkers()
  }

  onMarkerSelect = (m) => {
    let data = [m.id, (m.sel === false) ? true : false]
    this.props.toggleSelect(data)
    
    let marker = m
    if(marker.icon.indexOf('-dot') == -1) { //if does not have dot
        marker.icon = marker.icon.slice(0, -4) + '-dot' + marker.icon.slice(-4)
    } else {
        marker.icon = marker.icon.slice(0, -8) + marker.icon.slice(-4)
    }
    let data2 = [marker.id, marker.icon]
    this.props.setMarker(data2)
  }  

  render() {
    const { error, loading, markers } = this.props

    if (error) {
      return <div>Error! {error.message}</div>
    }

    if (loading) {
      return <div>Loading...</div>
    }

    return (
      <div className="banner-list">
        <h3>Click on a banner name on the list below to select a banner.</h3>
        <h3>Banners</h3>
        <p>listed numerically by secondary number, e.g. the '10' in 115/10 - Eshleman Rd / Barrow Ln</p>
        <select multiple>
          {markers.map((marker, i) => {
              if(marker.avail) return (
                <option 
                key={i} 
                onClick={() => this.onMarkerSelect(marker)} 
                className={(marker.sel === false) ? 'unselected' : 'selected'}>{marker.num} - {marker.name}
              </option>
              )
            }
          )}
        </select>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  markers: state.markers.items,
  loading: state.markers.loading,
  error: state.markers.error
})

const mapDispatchToProps = dispatch => {
  return {
    fetchMarkers: () => dispatch(fetchMarkers()),
    toggleSelect: (data) => dispatch(toggleSelect(data)),
    setMarker: (data) => dispatch(setMarker(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MarkerList)