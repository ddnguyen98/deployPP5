import React, {Component} from 'react';
import * as firebase from 'firebase';
import {Card, Container, Form, FormControl, Button, Modal} from 'react-bootstrap'

class Splash extends Component{
  //Set up deeper levels of states to store data
  state={
    email: '',
    password: '',
    passwordCheck: '',
    status: '',
    message: '',
    show: false
    }
    createAccount = e =>{
        const { email, password, passwordCheck } = this.state;
        if(password === passwordCheck){
            firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(()=>{
                firebase.auth().onAuthStateChanged((user) => {
                    firebase.database().ref(`users/${user.uid}`).set({
                        dogdates: ' ',
                        bio: '',
                        dogAge: '',
                        dogBreed: '',
                        dogName: '',
                        first: '',
                        last: ''
                    })
                    
                })
                this.setState({message: "Account Created"})
                this.changeValTrue();
            })
            .catch(error=>{
                let errorMessage = error.message;
                this.setState({message: errorMessage})
                this.changeValTrue();
                });
        }
        else{
        this.setState({message: 'Make both passwords you entered are the same.'})
        this.changeValTrue();
        }
    }

    //Gathers values to be collected for submit
    loginValue = e =>{
        if(e.target.id === 'semail'){
            this.setState({email: e.target.value})
        }
        else if(e.target.id === 'spassword'){
            this.setState({password: e.target.value})
        } 
        else if(e.target.id === 'spassword2'){
            this.setState({passwordCheck: e.target.value})
        }
    }
    changeValTrue = () =>{this.setState({show:true})}
    changeValFalse= () =>{this.setState({show:false})}

  render(){
    return(
        <div>
            <Container>
            </Container>
            <Container>
                <Card style={styles.card}>
                <Container style={styles.content}>
                    <Card.Body>
                    <h1>Welcome to paw pals!</h1> Sign up here!
                    Meet plenty of new friends from many users around to have the best experience of a life time!
                    <p>Get a list of playdates for your pup to have fun with.</p>
                    </Card.Body>
                    <Form style={styles.form}>
                        <FormControl style={styles.input} type="email" placeholder="Email" className="mr-sm-2" id="semail" onChange={this.loginValue}/>

                        <FormControl style={styles.input} type="password" placeholder="Password" className="mr-sm-2" id="spassword" onChange={this.loginValue}/>
                        <FormControl style={styles.input} type="password" placeholder="Type Password Again" className="mr-sm-2" id="spassword2" onChange={this.loginValue}/>

                    <Button variant="outline-danger" style={styles.button} onClick={this.createAccount}>Sign Up</Button>
                    </Form>
                    </Container>
                </Card>
            </Container>
            <Modal show={this.state.show} onHide={this.changeValFalse}>
                    <Modal.Header closeButton>
                        <Modal.Title>Notification</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>{this.state.message}</Modal.Body>
                    <Modal.Footer>
                        <Button variant="danger"  onClick={this.changeValFalse}>
                        Close
                        </Button>
                    </Modal.Footer>
            </Modal>
        </div>
    )
   }
}
const styles = {
    card: {
        margin: '120px 0',
        textAlign: 'center'
      },
      content:{
          padding:'20px'
      },
      button:{
          textAlign: 'center',
          width: '100px',
          margin: '0 auto'
      },
      form:{
          width: '50%',
          margin: '0 auto'
      },
      input:{
          margin: '10px 0'
      }
  }

export default Splash;
