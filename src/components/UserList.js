import React, {Component} from 'react';
import {Container, Table, Modal, Button, Card} from 'react-bootstrap'
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
        <Container style={styles.content}>
            <Modal show={this.state.show} onHide={this.changeValFalse}  size="lg">
                <Modal.Header closeButton >
                </Modal.Header>
                    {dogdates.map(dog=>{
                        if(dog.id === selectedId){
                                return(
                                    <Card style={styles.card} key="modal">
                                      <Card.Body style={styles.contents}>  
                                        <div>                
                                        <img src={dog.dogimg} alt="Dog Img" height="400" width="500" style={styles.img}></img>
                                        <h1 style={styles.name}>{dog.dogName.toUpperCase()}</h1>
                                        <h2 style={styles.breed}>{dog.dogBreed}</h2>
                                        <h3 style={styles.age}>Age: {dog.dogAge}</h3>
                                        </div>
                                        <Container style={styles.bio}>
                                          <p>Hello my name is {dog.dogName} and I am {dog.dogTemp}. I enjoy playing in the park with other dogs and eating snacks</p>
                                          <p>My owner is called {dog.first} {dog.last} and they take very good care o me.</p>
                                          <p>You can contact my owner at {dog.email} and I hope we can have a fun playdate!</p>
                                        </Container>
                                        </Card.Body>
                                    </Card>  
                            )
                        }
                    })}
            </Modal>  
            <div style={styles.table}>           
            <h2>Play Date Friends</h2>         
                <Table striped bordered hover variant="dark">
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
                            <td><Button id={dog.id} onClick={this.loadData} style={styles.button} variant="danger">View Profile</Button>{dog.dogName}</td>
                            <td>{dog.first} {dog.last}</td>
                        </tr>
                    )
                    })}
                    </tbody>
                </Table>
            </div>
            <div style={styles.table}>
            <h2>Maybe Play Dates</h2>                    
                    <Table striped bordered hover variant="dark">
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
                            <td><Button id={dog.id} onClick={this.loadData} style={styles.button} variant="danger">View Profile</Button>{dog.dogName}</td>
                            <td>{dog.first} {dog.last}</td>
                        </tr>
                        )
                        })}
                        </tbody>
                    </Table>
            </div>
        </Container>
    )
   }
}
const styles = {
    table: {
        width: 'calc(50% - 20px)',
        display:'inline-block',
        margin: '10px'
      },
      content:{
          display:'block',
          margin: '0 auto',
          padding: '50px 0 150px'
      },
      button:{
          margin:"0 15px"
      },
      card: {
      },
      img:{
        float: 'left',
        border: '#DADADA solid 1px',
        margin: '10px'
      },
      bio:{
        clear:'both'
      },
      age:{
        padding:'10px 0 0 0',
        fontSize: '20px'
      },
      name:{
        padding:'10px 0 0 0',
        color:'#9A1212',
        fontWeight:'bold',
        fontSize: '40px'
      },
      breed:{
        padding:'10px 0 0 0',
        color:'#9A1212',
        fontSize: '30px'
      },
      modal:{
          width:'1000px'
      }
  }
export default UserList;
