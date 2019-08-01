import React, { Component } from 'react';
import * as firebase from 'firebase';
import {Card, Container, Button} from 'react-bootstrap'
import { HashRouter, Route} from 'react-router-dom'
import Navigation from './Navigation'
import Footer from './Footer'
import Profile from './Profile';
import UserList from './UserList'
import Splash from './Splash'

class Home  extends Component {
    
  state ={
    uFirst: '',
    uLast: '',
    uEmail: '',
    dogAge: '',
    dogBreed: '',
    dogName: '',
    dogTemp:'',
    dogid: '',
    dogimg: null,
    isLoadingInfo: false,
    isLoadingDog: false,
    status:''
    }
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

  // Loads all current api details
  loadApi = e =>{
    if(this.state.isLoadingInfo === false && this.state.isLoadingDog === false){
      this.loadDetailsPerson();
     }
    else if(this.state.isLoadingInfo === true && this.state.isLoadingDog === false){
      this.loadDetailsDog();
    }
  }

  loadDetailsDname = e =>{
    fetch('https://randomuser.me/api/')
    .then(response => { return response.json() })
    .then(data => {
      let reg =/^[a-zA-Z]+$/;
      if(!reg.test(data.results[0].name.first)){
        this.loadDetailsDname();
      }
      else{
        this.setState({dogName : data.results[0].name.first})
      }
    })
  }

  loadDetailsPerson = e =>{
    fetch('https://randomuser.me/api/')
    .then(response => { return response.json() })
    .then(data => {
      let reg =/^[a-zA-Z]+$/;
      if(!reg.test(data.results[0].name.first) || !reg.test(data.results[0].name.last)){
        this.loadDetailsPerson();
      }
      else{
        this.setState({uFirst : data.results[0].name.first, uLast : data.results[0].name.last, uEmail : data.results[0].email, isLoadingInfo: true}) 
        this.loadDetailsDname();
      }
    })
  }

  loadDetailsDog = e =>{
    fetch(`https://api.thedogapi.com/v1/breeds/search?q=${this.state.uFirst[0]}`)
    .then(response => { return response.json() })
    .then(data => {
      for (let i = 0; i < data.length; i++) {  
        if(data[i].name[0].toLowerCase() === this.state.uFirst[0].toLowerCase()){
          this.setState({dogBreed : data[i].name, isLoadingDog: true})
          this.setState({dogAge: Math.floor(Math.random() * 10 + 1)})
          this.setState({dogid: data[i].id})
          this.setState({dogTemp: data[i].temperament})
          if(typeof data[i].temperament === 'undefined'){
            this.setState({dogTemp: "Happy, Loving, Kind"});
          }
          if(this.state.dogimg === null){

            fetch(`https://api.thedogapi.com/v1/images/search?breed_ids=${this.state.dogid}`)
            .then(response => { return response.json() })
            .then(info =>{
              if(info.length === 0){
                this.setState({dogimg: "https://pawedin.com/system/pets/default_images/default_pet.jpg"})
              }
              else{
                this.setState({dogimg: info[0].url})
              }
            })
          }

          break;
        }
      }
    })
  }

  //Random id for random users being stored
  create_UUID = e =>{
    var dt = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (dt + Math.random()*16)%16 | 0;
        dt = Math.floor(dt/16);
        return (c==='x' ? r :(r&0x3|0x8)).toString(16);
    });
    return uuid;
  
  }

  //Add dogs to list to be view on profile later
  yesDogs = e =>{
    let randomId = this.create_UUID();
    let {uEmail, uFirst, uLast, dogAge, dogBreed, dogName, dogimg, dogTemp } = this.state
    firebase.auth().onAuthStateChanged((user) => {
          if (user) {
                firebase.database().ref(`users/${user.uid}/dogdates/${randomId}`).set({
            dogAge: dogAge,
            dogBreed: dogBreed,
            dogName: dogName,
            dogimg: dogimg,
            dogTemp: dogTemp,
            email: uEmail,
            first: uFirst,
            last: uLast,
            status: 'yes',
          }); 
        }
      });
      this.setState({isLoadingDog: false, isLoadingInfo: false, dogimg: null})
      this.loadApi();
  }
  noDogs = e =>{
    let randomId = this.create_UUID();
    let {uEmail, uFirst, uLast, dogAge, dogBreed, dogName, dogimg, dogTemp } = this.state
    firebase.auth().onAuthStateChanged((user) => {
          if (user) {
                firebase.database().ref(`users/${user.uid}/dogdates/${randomId}`).set({
            dogAge: dogAge,
            dogBreed: dogBreed,
            dogName: dogName,
            dogimg: dogimg,
            dogTemp: dogTemp,
            email: uEmail,
            first: uFirst,
            last: uLast,
            status: 'no',
          }); 
        }
      });
      this.setState({isLoadingDog: false, isLoadingInfo: false, dogimg: null})
      this.loadApi();
  }
  //store more than 1 user to load data, holder user data in set state along with details of dog you will be viewing
 
    render(){
        let { isLoadingInfo, isLoadingDog, uEmail, uFirst, uLast, dogAge, dogBreed, dogName, dogimg, dogTemp, status } = this.state

        if(isLoadingDog === false || isLoadingInfo === false ){
          this.loadApi();
        }
    
        if(isLoadingDog === false || isLoadingInfo === false ){
          return( 
          <Container style={styles.loading}>
            
          </Container>
        )
        }
        else if(isLoadingDog === true && isLoadingInfo === true){
          return(
            <HashRouter>
              <Navigation/>
              <Route exact path="/" render={()=>{
                if(status){
                  return(
                    <Splash/>
                  )
                }
                else{
                  return(
                    <Container >
                      <Card style={styles.card}>
                      <Button onClick={this.yesDogs} style={styles.button} variant="danger">Go On A Playdate!</Button>
                        <Card.Body style={styles.contents}>  
                          <div>                
                          <img src={dogimg} alt="Dog Img" height="40%" width="40%" style={styles.img}></img>
                          <h1 style={styles.name}>{dogName.toUpperCase()}</h1>
                          <h2 style={styles.breed}>{dogBreed}</h2>
                          <h3 style={styles.age}>Age: {dogAge}</h3>
                          </div>
                          <Container style={styles.bio}>
                            <p>Hello my name is {dogName} and I am {dogTemp}. I enjoy playing in the park with other dogs and eating snacks</p>
                            <p>My owner is called {uFirst} {uLast} and they take very good care o me.</p>
                            <p>You can contact my owner at {uEmail} and I hope we can have a fun playdate!</p>
                          </Container>
                          </Card.Body>
                          <Button onClick={this.noDogs} style={styles.button} variant="danger">Maybe Next Time!</Button>
                      </Card>              
                    </Container>
                    )
                }
              }}/>
              <Route path="/profile" render={()=>{
                return(
                  <Profile/>
                )
              }}/>
              <Route path="/matches" render={()=>{
                return(
                  <UserList/>
                )
              }}/>
              <Footer/>
              </HashRouter>
          );
        }  
    }

}

const styles = {
  card: {
    margin: '50px auto',
    width: '85%'
  },
  img:{
    float: 'left',
    border: '#DADADA solid 1px',
    margin: '10px 50px 10px 10px'
  },
  bio:{
    clear:'both'
  },
  contents:{
  },
  button:{
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
  loading:{
    background:"white"
  },
  loadingcard:{
    margin: "100px"
  }
}

export default Home

