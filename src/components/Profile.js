import React, {Component} from 'react';
import {Card, Container, Form, Table,Button,Modal} from 'react-bootstrap'
import * as firebase from 'firebase';





class Profile extends Component{
    state={
        email:'',
        dogName:'',
        dogBreed:'',
        dogAge:'',
        firstName:'',
        lastName:'',
        bio:'',
        dogdates:[],
        loaded:false
    }

    componentDidMount(){
        firebase.auth().onAuthStateChanged((user) => {
            this.setState({email: user.email})
            firebase.database().ref('/users/' + user.uid).once('value').then((snapshot)=>{
                this.setState({
                    dogName: snapshot.val().dogName, 
                    dogAge: snapshot.val().dogAge, 
                    dogBreed: snapshot.val().dogBreed, 
                    firstName: snapshot.val().first, 
                    lastName: snapshot.val().last, 
                    bio: snapshot.val().bio,
                })
                snapshot.child('dogdates').forEach(test=>{
                    this.state.dogdates.push(test.val())
                })
                this.setState({loaded: true})
            });
        })
    }
    storeInfo = e =>{
        this.setState({[e.target.id]: e.target.value})
    }
    updateInfo = e =>{
        const {dogName, dogAge, dogBreed, firstName, lastName, bio} = this.state
        let user = firebase.auth().currentUser;
        firebase.database().ref('/users/' + user.uid).once('value').then((snapshot)=>{
            if (user != null) {
                firebase.database().ref(`users/${user.uid}`).set({
                    dogdates: snapshot.val().dogdates,
                    bio: bio,
                    dogAge: dogAge,
                    dogBreed: dogBreed,
                    dogName: dogName,
                    first: firstName,
                    last: lastName
                })
            }
        })

    }

    render(){
        const {dogName, dogAge, dogBreed, firstName, lastName, bio} = this.state


        return(
            <Container>
                <Card>
                    <Card.Body> 
                        <img src="https://pawedin.com/system/pets/default_images/default_pet.jpg" width="200" height="200" alt="placeholder"></img>                 
                    <Form>
                        <Form.Group controlId="dogName">
                            <Form.Control type="text" value={dogName} onChange={this.storeInfo} />
                        </Form.Group>
                        <Form.Group controlId="dogBreed">
                            <Form.Control type="text" value={dogBreed} onChange={this.storeInfo}/>
                        </Form.Group>
                        <Form.Group controlId="dogAge">
                            <Form.Control type="text" value={dogAge} onChange={this.storeInfo}/>
                        </Form.Group>
                        <Form.Group controlId="firstName">
                            <Form.Control type="text" value={firstName} onChange={this.storeInfo}/>
                        </Form.Group>
                        <Form.Group controlId="lastName">
                            <Form.Control type="text" value={lastName} onChange={this.storeInfo}/>
                        </Form.Group>
                        <Form.Group controlId="bio">
                            <Form.Control as="textarea" rows="3" value={bio} onChange={this.storeInfo}/>
                        </Form.Group>
                        <Button variant="primary" type="button" onClick={this.updateInfo}>
                            Update
                        </Button>
                    </Form>
                    </Card.Body>
                </Card>
                
            </Container>
        )
    }
}

export default Profile;

