import React, {Component} from 'react';
import * as firebase from 'firebase';
import {Navbar, Nav, Form, FormControl, Button, Modal } from 'react-bootstrap'
import logo from '../images/dog.png';


class Navigation extends Component{
    state={
        email: '',
        password: '',
        status: '',
        show: false,
        message: ''
    }


    //Checks for current user if logged in previously
    componentDidMount(){
        firebase.auth().onAuthStateChanged((user) => {
            if(user){
                this.setState({status: false})
            }
            else{
                this.setState({status: true})
            }
        })
    }
    
    //Checks for correct login
    submitLogin = e =>{ 
        const { email, password } = this.state;
    
        firebase.auth().signInWithEmailAndPassword(email, password)
        .then(()=>{
            this.setState({message: "Account logged in"})
            this.changeValTrue();
        })
        .catch(error =>{
            let errorMessage = error.message;
            this.setState({message: errorMessage})
            this.changeValTrue();
          });
    }
    //Gathers values to be collected for submit
    loginValue = e =>{
    if(e.target.id === 'email'){
        this.setState({email: e.target.value})
    }
    else{
        this.setState({password: e.target.value})
    } 
    }
    //logs out current user.
    logOut = e =>{
    firebase.auth().signOut().then(function() {
        this.setState({message: 'Succesful Logout'})
        this.changeValTrue();
        }).catch(function(error) {
        });
    }
    changeValTrue = () =>{this.setState({show:true})}
    changeValFalse= () =>{this.setState({show:false})}

  render(){
      //If logged in will change navbar
    const {status} = this.state;
    if(status){
        return(
            <Navbar bg="dark" variant="dark" expand="lg" >
                <Navbar.Brand href="#/">      
                <img style={styles.logo}
                src={logo}
                width="50"
                height="50"
                alt="React Bootstrap logo"
                />Paw Pals</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto justify-content-end">
                        </Nav>
                        <Form inline>
                            <FormControl type="email" placeholder="Email" className="mr-sm-2" id="email" onChange={this.loginValue}/>
                            <FormControl type="password" placeholder="Password" className="mr-sm-2" id="password" onChange={this.loginValue}/>
                            <Button variant="outline-danger" onClick={this.submitLogin}>Login</Button>
                        </Form>
                </Navbar.Collapse>
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
            </Navbar>
        )
    }
    else{
        return(
            <Navbar bg="dark" variant="dark" expand="lg">
                <Navbar.Brand href="#/">                
                <img style={styles.logo}
                src={logo}
                width="50"
                height="50"
                alt="React Bootstrap logo"
                />Paw Pals</Navbar.Brand>   
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav" >
                        <Nav className="mr-auto justify-content-end" >
                        <Nav.Link href="#/">Home</Nav.Link>
                        <Nav.Link href="#/profile">Profile</Nav.Link>
                        <Nav.Link href="#/matches">Matches</Nav.Link>
                        </Nav>
                        <Nav.Link href="#/"><Button variant="outline-danger" onClick={this.logOut}>Logout</Button></Nav.Link>
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
                </Navbar.Collapse>
            </Navbar>
        )
    }
   }
}

export default Navigation;

const styles = {
    logo:{
        margin: '0 10px'
    }
}

