import React, {Component} from 'react';
import {Card, Container, Form, Button} from 'react-bootstrap'
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
                <Card style={styles.card}>
                    <Card.Body> 
                    <Form style={styles.content}>
                        <div>
                        <img src="https://pawedin.com/system/pets/default_images/default_pet.jpg" 
                        width="300" height="300" style={styles.img} alt="placeholder"></img>                 

                            <Form.Control placeholder="Dog Name" type="text" id="dogName" value={dogName} style={styles.name} onChange={this.storeInfo} />

                            <Form.Control placeholder="Dog Breed" type="text" id="dogBreed" value={dogBreed} style={styles.breed} onChange={this.storeInfo}/>

                            <Form.Control placeholder="Dog Age" type="text" id="dogAge" value={dogAge} style={styles.age} onChange={this.storeInfo}/>

                            <Form.Control placeholder="First" type="text" id="first" value={firstName} style={styles.age} onChange={this.storeInfo}/>

                            <Form.Control placeholder="Last" type="text" id="last" value={lastName} style={styles.age} onChange={this.storeInfo}/>
                            </div>
                            <Form.Control placeholder="Enter Bio Here" as="textarea" id="bio" rows="5" value={bio} style={styles.bio}onChange={this.storeInfo}/>

                    </Form>
                    </Card.Body>
                    <Button variant="danger" type="button" onClick={this.updateInfo}>
                            Update
                            </Button>
                </Card>
                
            </Container>
        )
    }
}

const styles = {
    img: {
        float: 'left',
        border: '#DADADA solid 1px',
        margin: '0 10px 10px'
      },
      card:{
          margin:'50px'
      },
      input:{
          width: "25%"
      },
      content:{
          display:"inline"
      },
      age:{
        fontSize: '20px',
        width: "40%",
        margin: "5px"
      },
      name:{
        color:'#9A1212',
        fontWeight:'bold',
        fontSize: '40px',
        width: "40%",
        margin: "5px"

      },
      breed:{
        color:'#9A1212',
        fontSize: '30px',
        width: "40%",
        margin: "5px"

      },
      bio:{
        margin: "5px"
      }
  }


export default Profile;

