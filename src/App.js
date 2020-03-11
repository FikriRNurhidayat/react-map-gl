import React, {
  Component
} from 'react'
import './App.css'
import 'antd/dist/antd.css'
import Map from './Map'
import {
  Modal,
  Button,
} from 'antd'

class App extends Component {
  state = {
    visible: false
  }

  showModal = () => {
    this.setState({
      visible: true
    })
  }

  hideModal = () => {
    this.setState({
      visible: false
    })
  }

  handleOk = () => {
    this.hideModal() 
  }

  handleCancel = () => {
    this.hideModal()
  }

  handleOnLocationMark = ({ longitude, latitude}) => {
    console.log('Longitude:', longitude)
    console.log('Latitude:', latitude)
  }

  render() {
    return (
      <div className="App">
      {/*<Map onLocationMark={this.handleOnLocationMark} />*/}
      </div>
    );
  }
}

export default App
