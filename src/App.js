import React, {Component} from 'react';
import Home from './components/Home'
import 'bootstrap/dist/css/bootstrap.min.css';





class App extends Component{


  render(){
    return(
      <div style={styles.body}>
      <Home />
      </div>
    )
   }
}
const styles = {
  body: {
    background: '#DADADA'
  }
}

export default App;


