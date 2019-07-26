import React, {Component} from 'react';
import {Card, Container, Form, FormControl, Button, Modal} from 'react-bootstrap'

class Splash extends Component{
  //Set up deeper levels of states to store data
  state={
    email: '',
    password: '',
    status: '',
    show: false,
    message: ''
}


  render(){
    return(
        <div>
            <Container>
                Welcoem to paw pals! Sign up here!
            </Container>
            <Container>
                <Card>
                <Form inline>
                <FormControl type="email" placeholder="Email" className="mr-sm-2" id="email" onChange={this.loginValue}/>
                <FormControl type="password" placeholder="Password" className="mr-sm-2" id="password" onChange={this.loginValue}/>
                <FormControl type="password" placeholder="Type Password Again" className="mr-sm-2" id="password2" onChange={this.loginValue}/>
                <Button variant="outline-success" onClick={this.submitLogin}>Login</Button>
                <Button variant="outline-success" onClick={this.createAccount}>Sign Up</Button>
                </Form>
                </Card>
            </Container>
        </div>
    )
   }
}

export default Splash;
