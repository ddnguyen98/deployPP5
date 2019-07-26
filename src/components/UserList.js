import React, {Component} from 'react';
import {Container, Table, Modal, Button} from 'react-bootstrap'
import * as firebase from 'firebase';


class UserList extends Component{
    state={
        dogdates:[],
        loaded:false,
        selectedId: '',
        show: false
    }
    //Loading data to be used in table
  componentDidMount(){
    firebase.auth().onAuthStateChanged((user) => {
        this.setState({email: user.email})
        firebase.database().ref('/users/' + user.uid).once('value').then((snapshot)=>{
            //Sets up object and puts data along with key
            snapshot.child('dogdates').forEach(test=>{
                this.state.dogdates.push({
                    dogAge: test.val().dogAge,
                    dogBreed: test.val().dogBreed,
                    dogName: test.val().dogName,
                    dogimg: test.val().dogimg,
                    dogTemp: test.val().dogTemp,
                    email: test.val().email,
                    first: test.val().first,
                    last: test.val().last,
                    status: test.val().status,
                    id: test.key
                })
            })
            this.setState({loaded: true})
        });
    })
  }

  loadData = e =>{
      console.log(e.target)
    this.setState({selectedId: e.target.id})
    this.changeValTrue()
  }
  changeValTrue = () =>{this.setState({show:true})}
  changeValFalse= () =>{this.setState({show:false})}

  render(){
    const {dogdates, loaded, selectedId} = this.state
    let yesData = [];
    let noData = [];


    if(loaded){
        dogdates.forEach(dog=>{
            if(dog.status === 'yes'){
                yesData.push(dog)
            }
            else if(dog.status === 'no'){
                noData.push(dog)
            }
        })
    }    
    return(
        <Container>
            <Modal show={this.state.show} onHide={this.changeValFalse}>
                <Modal.Header closeButton>
                    <Modal.Title>Notification</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {dogdates.map(dog=>{
                        console.log(dog)
                        if(dog.id === selectedId){
                            console.log(dog)
                            return(
                                <div key="modal">
                                    <img src={dog.dogimg} alt="Dog Img" height="200" width="200"></img>
                                    <p>{dog.dogName}</p>
                                    <p>{dog.dogAge}</p>
                                    <p>{dog.dogBreed}</p>
                                    <p>{dog.email}</p>
                                    <p>{dog.first}</p>
                                    <p>{dog.last}</p>
                                    <p>Hello my name is {dog.dogName} and I am {dog.dogTemp}.
                                    My owner is called {dog.first} {dog.last}. I hope I can get
                                    To be your friend today!
                                    </p>
                                </div>
                            )
                        }
                    })}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary"  onClick={this.changeValFalse}>
                    Close
                    </Button>
                </Modal.Footer>
            </Modal>  
            <Container>           
            <h2>Play Date Friends</h2>         
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Dog</th>
                            <th>Owner</th>
                        </tr>
                    </thead>
                    <tbody>
                    {yesData.map(dog=>{
                    return(
                        <tr key={dog.first + dog.last} >
                            <td><Button id={dog.id} onClick={this.loadData}>View Profile</Button>{dog.dogName}</td>
                            <td>{dog.first} {dog.last}</td>
                        </tr>
                    )
                    })}
                    </tbody>
                </Table>
            </Container>
            <Container>
            <h2>Maybe Play Dates</h2>                    
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                            <th>Dog</th>
                            <th>Owner</th>
                         </tr>
                        </thead>
                        <tbody>
                        {noData.map(dog=>{
                        return(
                        <tr key={dog.first + dog.last} id={dog.id}>
                            <td><Button id={dog.id} onClick={this.loadData}>View Profile</Button>{dog.dogName}</td>
                            <td>{dog.first} {dog.last}</td>
                        </tr>
                        )
                        })}
                        </tbody>
                    </Table>
            </Container>
        </Container>
    )
   }
}

export default UserList;
