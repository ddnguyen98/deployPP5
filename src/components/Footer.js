import React, {Component} from 'react';
import {Container} from 'react-bootstrap'

class Footer extends Component{
  //Set up deeper levels of states to store data


  render(){
    return(
      <footer  style={styles.body}>
      <Container >
        <p>Paw Pals &copy; Paw Pals is a passion project to bring fellow dog owners together to have plenty of fun</p>
        <p>Thank you for taking the time to enjoy this site.</p>
      </Container>
    </footer>
    )
   }
}

const styles = {
  body: {
    padding: '25px 0',
    background: '#343a40',
    color: '#ffffff'
  }
}

export default Footer;
