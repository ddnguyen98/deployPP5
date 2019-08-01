import React, {Component} from 'react';
import {Card, Container, Form, Button} from 'react-bootstrap'
import * as firebase from 'firebase';





class Profile extends Component{
    state={
        email:'',
        dogName:'',
        dogBreed:'',
        dogAge:'',
        first:'',
        last:'',
        bio:'',
        dogdates:[],
        loaded:false,
        show: false
    }

    componentDidMount(){
        firebase.auth().onAuthStateChanged((user) => {
            this.setState({email: user.email})
            firebase.database().ref('/users/' + user.uid).once('value').then((snapshot)=>{
                this.setState({
                    dogName: snapshot.val().dogName, 
                    dogAge: snapshot.val().dogAge, 
                    dogBreed: snapshot.val().dogBreed, 
                    first: snapshot.val().first, 
                    last: snapshot.val().last, 
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
        const {dogName, dogAge, dogBreed, first, last, bio} = this.state
        let user = firebase.auth().currentUser;
        firebase.database().ref('/users/' + user.uid).once('value').then((snapshot)=>{
            if (user != null) {
                firebase.database().ref(`users/${user.uid}`).set({
                    dogdates: snapshot.val().dogdates,
                    bio: bio,
                    dogAge: dogAge,
                    dogBreed: dogBreed,
                    dogName: dogName,
                    first: first,
                    last: last
                })
            }
        })

    }

    changeValTrue = () =>{this.setState({show:true})}
    changeValFalse= () =>{this.setState({show:false})}

    render(){
        const {dogName, dogAge, dogBreed, first, last, bio} = this.state


        return(
            <Container>
                <Card style={styles.card}>
                    <Card.Body> 
                    <Form style={styles.content}>
                        <div>
                        <img src="https://pawedin.com/system/pets/default_images/default_pet.jpg" 
                       height="40%" width="40%" style={styles.img} alt="placeholder"></img>                 
                            <Form.Group style={styles.group}>
                            <Form.Label>Dog Name</Form.Label>
                            <Form.Control placeholder="Dog Name" type="text" id="dogName" value={dogName} style={styles.name} onChange={this.storeInfo} />
                            </Form.Group>
                            <Form.Group >
                            <Form.Label>Dog Breed</Form.Label>
                            <Form.Control placeholder="Dog Breed" type="text" id="dogBreed" value={dogBreed} style={styles.breed} onChange={this.storeInfo}/>
                            </Form.Group>
                            <Form.Group >
                            <Form.Label>Dog Age</Form.Label>
                            <Form.Control placeholder="Dog Age" as="select" id="dogAge" value={dogAge} style={styles.age} onChange={this.storeInfo}>
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                            <option>6</option>
                            <option>7</option>
                            <option>8</option>
                            <option>9</option>
                            <option>10</option>
                            <option>11</option>
                            <option>12</option>
                             </Form.Control>
                            </Form.Group>

                            <Form.Group >
                            <Form.Label>Owner First Name</Form.Label>
                            <Form.Control placeholder="First" type="text" id="first" value={first} style={styles.age} onChange={this.storeInfo}/>
                            </Form.Group>

                            <Form.Group >
                            <Form.Label>Owner Last Name</Form.Label>
                            <Form.Control placeholder="Last" type="text" id="last" value={last} style={styles.age} onChange={this.storeInfo}/>
                            </Form.Group>

                            </div>
                            <Form.Group>
                            <Form.Label>Description</Form.Label>
                            <Form.Control placeholder="Enter Bio Here" as="textarea" id="bio" rows="5" value={bio} style={styles.bio}onChange={this.storeInfo}/>
                            </Form.Group>

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
        margin: '0 50px 100px 10px'
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
      },
      group:{
          display: 'inline'
      }
  }


export default Profile;

