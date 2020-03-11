import React, {
  Component
} from 'react'
import './App.css'
import Map from './Map'

class App extends Component {

  handleOnLocationMark = ({ longitude, latitude}) => {
    console.log('Longitude:', longitude)
    console.log('Latitude:', latitude)
  }

  render() {
    return (
      <div className="App">
        <Map onLocationMark={this.handleOnLocationMark} />
      </div>
    );
  }
}

export default App
