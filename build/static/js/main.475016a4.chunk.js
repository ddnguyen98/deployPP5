(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{118:function(e,t,a){"use strict";a.r(t);var n=a(0),o=a.n(n),l=a(24),r=a.n(l),s=(a(80),a(12)),i=a(13),c=a(15),d=a(14),g=a(16),m=a(8),u=a(121),h=a(127),p=a(120),f=a(71),E=a(28),y=a(126),b=a(125),v=a(124),w=a(69),x=a(123),A=function(e){function t(){var e,a;Object(s.a)(this,t);for(var n=arguments.length,o=new Array(n),l=0;l<n;l++)o[l]=arguments[l];return(a=Object(c.a)(this,(e=Object(d.a)(t)).call.apply(e,[this].concat(o)))).state={email:"",password:"",status:"",show:!1,message:""},a.submitLogin=function(e){var t=a.state,n=t.email,o=t.password;m.auth().signInWithEmailAndPassword(n,o).then(function(){a.setState({message:"Account logged in"}),a.changeValTrue()}).catch(function(e){var t=e.message;a.setState({message:t}),a.changeValTrue()})},a.loginValue=function(e){"email"===e.target.id?a.setState({email:e.target.value}):a.setState({password:e.target.value})},a.logOut=function(e){m.auth().signOut().then(function(){this.setState({message:"Succesful Logout"}),this.changeValTrue()}).catch(function(e){})},a.changeValTrue=function(){a.setState({show:!0})},a.changeValFalse=function(){a.setState({show:!1})},a}return Object(g.a)(t,e),Object(i.a)(t,[{key:"componentDidMount",value:function(){var e=this;m.auth().onAuthStateChanged(function(t){t?e.setState({status:!1}):e.setState({status:!0})})}},{key:"render",value:function(){return this.state.status?o.a.createElement(y.a,{bg:"dark",variant:"dark",expand:"lg"},o.a.createElement(y.a.Brand,{href:"#/"},"Paw Pals"),o.a.createElement(y.a.Toggle,{"aria-controls":"basic-navbar-nav"}),o.a.createElement(y.a.Collapse,{id:"basic-navbar-nav"},o.a.createElement(b.a,{className:"mr-auto justify-content-end"}),o.a.createElement(v.a,{inline:!0},o.a.createElement(w.a,{type:"email",placeholder:"Email",className:"mr-sm-2",id:"email",onChange:this.loginValue}),o.a.createElement(w.a,{type:"password",placeholder:"Password",className:"mr-sm-2",id:"password",onChange:this.loginValue}),o.a.createElement(p.a,{variant:"outline-danger",onClick:this.submitLogin},"Login"))),o.a.createElement(x.a,{show:this.state.show,onHide:this.changeValFalse},o.a.createElement(x.a.Header,{closeButton:!0},o.a.createElement(x.a.Title,null,"Notification")),o.a.createElement(x.a.Body,null,this.state.message),o.a.createElement(x.a.Footer,null,o.a.createElement(p.a,{variant:"danger",onClick:this.changeValFalse},"Close")))):o.a.createElement(y.a,{bg:"dark",variant:"dark",expand:"lg"},o.a.createElement(y.a.Brand,{href:"#/"},"Paw Pals"),o.a.createElement(y.a.Toggle,{"aria-controls":"basic-navbar-nav"}),o.a.createElement(y.a.Collapse,{id:"basic-navbar-nav"},o.a.createElement(b.a,{className:"mr-auto justify-content-end"},o.a.createElement(b.a.Link,{href:"#/"},"Home"),o.a.createElement(b.a.Link,{href:"#/profile"},"Profile"),o.a.createElement(b.a.Link,{href:"#/matches"},"Matches")),o.a.createElement(b.a.Link,{href:"#/"},o.a.createElement(p.a,{variant:"outline-danger",onClick:this.logOut},"Logout")),o.a.createElement(x.a,{show:this.state.show,onHide:this.changeValFalse},o.a.createElement(x.a.Header,{closeButton:!0},o.a.createElement(x.a.Title,null,"Notification")),o.a.createElement(x.a.Body,null,this.state.message),o.a.createElement(x.a.Footer,null,o.a.createElement(p.a,{variant:"danger",onClick:this.changeValFalse},"Close")))))}}]),t}(n.Component),S=function(e){function t(){return Object(s.a)(this,t),Object(c.a)(this,Object(d.a)(t).apply(this,arguments))}return Object(g.a)(t,e),Object(i.a)(t,[{key:"render",value:function(){return o.a.createElement("footer",{style:k.body},o.a.createElement(u.a,null,o.a.createElement("p",null,"Paw Pals \xa9 Paw Pals is a passion project to bring fellow dog owners together to have plenty of fun"),o.a.createElement("p",null,"Thank you for taking the time to enjoy this site.")))}}]),t}(n.Component),k={body:{padding:"25px 0",background:"#343a40",color:"#ffffff"}},D=S,C=a(44),j=function(e){function t(){var e,a;Object(s.a)(this,t);for(var n=arguments.length,o=new Array(n),l=0;l<n;l++)o[l]=arguments[l];return(a=Object(c.a)(this,(e=Object(d.a)(t)).call.apply(e,[this].concat(o)))).state={email:"",dogName:"",dogBreed:"",dogAge:"",firstName:"",lastName:"",bio:"",dogdates:[],loaded:!1},a.storeInfo=function(e){a.setState(Object(C.a)({},e.target.id,e.target.value))},a.updateInfo=function(e){var t=a.state,n=t.dogName,o=t.dogAge,l=t.dogBreed,r=t.firstName,s=t.lastName,i=t.bio,c=m.auth().currentUser;m.database().ref("/users/"+c.uid).once("value").then(function(e){null!=c&&m.database().ref("users/".concat(c.uid)).set({dogdates:e.val().dogdates,bio:i,dogAge:o,dogBreed:l,dogName:n,first:r,last:s})})},a}return Object(g.a)(t,e),Object(i.a)(t,[{key:"componentDidMount",value:function(){var e=this;m.auth().onAuthStateChanged(function(t){e.setState({email:t.email}),m.database().ref("/users/"+t.uid).once("value").then(function(t){e.setState({dogName:t.val().dogName,dogAge:t.val().dogAge,dogBreed:t.val().dogBreed,firstName:t.val().first,lastName:t.val().last,bio:t.val().bio}),t.child("dogdates").forEach(function(t){e.state.dogdates.push(t.val())}),e.setState({loaded:!0})})})}},{key:"render",value:function(){var e=this.state,t=e.dogName,a=e.dogAge,n=e.dogBreed,l=e.firstName,r=e.lastName,s=e.bio;return o.a.createElement(u.a,null,o.a.createElement(h.a,{style:O.card},o.a.createElement(h.a.Body,null,o.a.createElement(v.a,{style:O.content},o.a.createElement("div",null,o.a.createElement("img",{src:"https://pawedin.com/system/pets/default_images/default_pet.jpg",height:"40%",width:"40%",style:O.img,alt:"placeholder"}),o.a.createElement(v.a.Control,{placeholder:"Dog Name",type:"text",id:"dogName",value:t,style:O.name,onChange:this.storeInfo}),o.a.createElement(v.a.Control,{placeholder:"Dog Breed",type:"text",id:"dogBreed",value:n,style:O.breed,onChange:this.storeInfo}),o.a.createElement(v.a.Control,{placeholder:"Dog Age",type:"text",id:"dogAge",value:a,style:O.age,onChange:this.storeInfo}),o.a.createElement(v.a.Control,{placeholder:"First",type:"text",id:"first",value:l,style:O.age,onChange:this.storeInfo}),o.a.createElement(v.a.Control,{placeholder:"Last",type:"text",id:"last",value:r,style:O.age,onChange:this.storeInfo})),o.a.createElement(v.a.Control,{placeholder:"Enter Bio Here",as:"textarea",id:"bio",rows:"5",value:s,style:O.bio,onChange:this.storeInfo}))),o.a.createElement(p.a,{variant:"danger",type:"button",onClick:this.updateInfo},"Update")))}}]),t}(n.Component),O={img:{float:"left",border:"#DADADA solid 1px",margin:"0 10px 10px"},card:{margin:"50px"},input:{width:"25%"},content:{display:"inline"},age:{fontSize:"20px",width:"40%",margin:"5px"},name:{color:"#9A1212",fontWeight:"bold",fontSize:"40px",width:"40%",margin:"5px"},breed:{color:"#9A1212",fontSize:"30px",width:"40%",margin:"5px"},bio:{margin:"5px"}},N=j,B=a(122),I=function(e){function t(){var e,a;Object(s.a)(this,t);for(var n=arguments.length,o=new Array(n),l=0;l<n;l++)o[l]=arguments[l];return(a=Object(c.a)(this,(e=Object(d.a)(t)).call.apply(e,[this].concat(o)))).state={dogdates:[],loaded:!1,selectedId:"",show:!1},a.loadData=function(e){console.log(e.target),a.setState({selectedId:e.target.id}),a.changeValTrue()},a.changeValTrue=function(){a.setState({show:!0})},a.changeValFalse=function(){a.setState({show:!1})},a}return Object(g.a)(t,e),Object(i.a)(t,[{key:"componentDidMount",value:function(){var e=this;m.auth().onAuthStateChanged(function(t){e.setState({email:t.email}),m.database().ref("/users/"+t.uid).once("value").then(function(t){t.child("dogdates").forEach(function(t){e.state.dogdates.push({dogAge:t.val().dogAge,dogBreed:t.val().dogBreed,dogName:t.val().dogName,dogimg:t.val().dogimg,dogTemp:t.val().dogTemp,email:t.val().email,first:t.val().first,last:t.val().last,status:t.val().status,id:t.key})}),e.setState({loaded:!0})})})}},{key:"render",value:function(){var e=this,t=this.state,a=t.dogdates,n=t.loaded,l=t.selectedId,r=[],s=[];return n&&a.forEach(function(e){"yes"===e.status?r.push(e):"no"===e.status&&s.push(e)}),o.a.createElement(u.a,{style:L.content},o.a.createElement(x.a,{show:this.state.show,onHide:this.changeValFalse,size:"lg"},o.a.createElement(x.a.Header,{closeButton:!0}),a.map(function(e){if(e.id===l)return o.a.createElement(h.a,{style:L.card,key:"modal"},o.a.createElement(h.a.Body,{style:L.contents},o.a.createElement("div",null,o.a.createElement("img",{src:e.dogimg,alt:"Dog Img",height:"40%",width:"40%",style:L.img}),o.a.createElement("h1",{style:L.name},e.dogName.toUpperCase()),o.a.createElement("h2",{style:L.breed},e.dogBreed),o.a.createElement("h3",{style:L.age},"Age: ",e.dogAge)),o.a.createElement(u.a,{style:L.bio},o.a.createElement("p",null,"Hello my name is ",e.dogName," and I am ",e.dogTemp,". I enjoy playing in the park with other dogs and eating snacks"),o.a.createElement("p",null,"My owner is called ",e.first," ",e.last," and they take very good care o me."),o.a.createElement("p",null,"You can contact my owner at ",e.email," and I hope we can have a fun playdate!"))))})),o.a.createElement("div",{style:L.table},o.a.createElement("h2",null,"Play Date Friends"),o.a.createElement(B.a,{striped:!0,bordered:!0,hover:!0,variant:"dark"},o.a.createElement("thead",null,o.a.createElement("tr",null,o.a.createElement("th",null,"Dog"),o.a.createElement("th",null,"Owner"))),o.a.createElement("tbody",null,r.map(function(t){return o.a.createElement("tr",{key:t.first+t.last},o.a.createElement("td",null,o.a.createElement(p.a,{id:t.id,onClick:e.loadData,style:L.button,variant:"danger"},"View Profile"),t.dogName),o.a.createElement("td",null,t.first," ",t.last))})))),o.a.createElement("div",{style:L.table},o.a.createElement("h2",null,"Maybe Play Dates"),o.a.createElement(B.a,{striped:!0,bordered:!0,hover:!0,variant:"dark"},o.a.createElement("thead",null,o.a.createElement("tr",null,o.a.createElement("th",null,"Dog"),o.a.createElement("th",null,"Owner"))),o.a.createElement("tbody",null,s.map(function(t){return o.a.createElement("tr",{key:t.first+t.last,id:t.id},o.a.createElement("td",null,o.a.createElement(p.a,{id:t.id,onClick:e.loadData,style:L.button,variant:"danger"},"View Profile"),t.dogName),o.a.createElement("td",null,t.first," ",t.last))})))))}}]),t}(n.Component),L={table:{width:"calc(50% - 20px)",display:"inline-block",margin:"10px"},content:{display:"block",margin:"0 auto",padding:"50px 0 150px"},button:{margin:"0 15px"},card:{},img:{float:"left",border:"#DADADA solid 1px",margin:"10px"},bio:{clear:"both"},age:{padding:"10px 0 0 0",fontSize:"20px"},name:{padding:"10px 0 0 0",color:"#9A1212",fontWeight:"bold",fontSize:"40px"},breed:{padding:"10px 0 0 0",color:"#9A1212",fontSize:"30px"},modal:{width:"1000px"}},T=I,V=function(e){function t(){var e,a;Object(s.a)(this,t);for(var n=arguments.length,o=new Array(n),l=0;l<n;l++)o[l]=arguments[l];return(a=Object(c.a)(this,(e=Object(d.a)(t)).call.apply(e,[this].concat(o)))).state=Object(C.a)({email:"",password:"",passwordCheck:"",status:"",message:"",show:!1},"message",""),a.createAccount=function(e){var t=a.state,n=t.email,o=t.password;o===t.passwordCheck?m.auth().createUserWithEmailAndPassword(n,o).then(function(){m.auth().onAuthStateChanged(function(e){m.database().ref("users/".concat(e.uid)).set({dogdates:" ",bio:"Enter dog bio here",dogAge:"Age of dog",dogBreed:"Breed of dog",dogName:"Dogs name",first:"Your first name",last:"your Last name"})}),a.setState({message:"Account Created"}),a.changeValTrue()}).catch(function(e){var t=e.message;a.setState({message:t}),a.changeValTrue()}):(a.setState({message:"Make sure your password is the same"}),a.changeValTrue())},a.loginValue=function(e){"semail"===e.target.id?a.setState({email:e.target.value}):"spassword"===e.target.id?a.setState({password:e.target.value}):"spassword2"===e.target.id&&a.setState({passwordCheck:e.target.value})},a.changeValTrue=function(){a.setState({show:!0})},a.changeValFalse=function(){a.setState({show:!1})},a}return Object(g.a)(t,e),Object(i.a)(t,[{key:"render",value:function(){return o.a.createElement("div",null,o.a.createElement(u.a,null),o.a.createElement(u.a,null,o.a.createElement(h.a,{style:F.card},o.a.createElement(u.a,{style:F.content},o.a.createElement(h.a.Body,null,"Welcome to paw pals! Sign up here! Meet plenty of new friends from many users around to have the best experience of a life time!"),o.a.createElement(v.a,null,o.a.createElement(v.a.Group,{controlId:"formBasicEmail"},o.a.createElement(w.a,{type:"email",placeholder:"Email",className:"mr-sm-2",id:"semail",onChange:this.loginValue})),o.a.createElement(v.a.Group,{controlId:"formBasicEmail"},o.a.createElement(w.a,{type:"password",placeholder:"Password",className:"mr-sm-2",id:"spassword",onChange:this.loginValue})),o.a.createElement(v.a.Group,{controlId:"formBasicEmail"},o.a.createElement(w.a,{type:"password",placeholder:"Type Password Again",className:"mr-sm-2",id:"spassword2",onChange:this.loginValue})),o.a.createElement(p.a,{variant:"outline-danger",onClick:this.createAccount},"Sign Up"))))),o.a.createElement(x.a,{show:this.state.show,onHide:this.changeValFalse},o.a.createElement(x.a.Header,{closeButton:!0},o.a.createElement(x.a.Title,null,"Notification")),o.a.createElement(x.a.Body,null,this.state.message),o.a.createElement(x.a.Footer,null,o.a.createElement(p.a,{variant:"danger",onClick:this.changeValFalse},"Close"))))}}]),t}(n.Component),F={card:{margin:"120px 0"},content:{padding:"20px"}},P=V,M=function(e){function t(){var e,a;Object(s.a)(this,t);for(var n=arguments.length,o=new Array(n),l=0;l<n;l++)o[l]=arguments[l];return(a=Object(c.a)(this,(e=Object(d.a)(t)).call.apply(e,[this].concat(o)))).state={uFirst:"",uLast:"",uEmail:"",dogAge:"",dogBreed:"",dogName:"",dogTemp:"",dogid:"",dogimg:null,isLoadingInfo:!1,isLoadingDog:!1,status:""},a.loadApi=function(e){!1===a.state.isLoadingInfo&&!1===a.state.isLoadingDog?a.loadDetailsPerson():!0===a.state.isLoadingInfo&&!1===a.state.isLoadingDog&&a.loadDetailsDog()},a.loadDetailsDname=function(e){fetch("https://randomuser.me/api/").then(function(e){return e.json()}).then(function(e){/^[a-zA-Z]+$/.test(e.results[0].name.first)?a.setState({dogName:e.results[0].name.first}):a.loadDetailsDname()})},a.loadDetailsPerson=function(e){fetch("https://randomuser.me/api/").then(function(e){return e.json()}).then(function(e){var t=/^[a-zA-Z]+$/;t.test(e.results[0].name.first)&&t.test(e.results[0].name.last)?(a.setState({uFirst:e.results[0].name.first,uLast:e.results[0].name.last,uEmail:e.results[0].email,isLoadingInfo:!0}),a.loadDetailsDname()):a.loadDetailsPerson()})},a.loadDetailsDog=function(e){fetch("https://api.thedogapi.com/v1/breeds/search?q=".concat(a.state.uFirst[0])).then(function(e){return e.json()}).then(function(e){for(var t=0;t<e.length;t++)if(e[t].name[0].toLowerCase()===a.state.uFirst[0].toLowerCase()){a.setState({dogBreed:e[t].name,isLoadingDog:!0}),a.setState({dogAge:Math.floor(10*Math.random()+1)}),a.setState({dogid:e[t].id}),a.setState({dogTemp:e[t].temperament}),"undefined"===typeof e[t].temperament&&a.setState({dogTemp:"Happy, Loving, Kind"}),null===a.state.dogimg&&fetch("https://api.thedogapi.com/v1/images/search?breed_ids=".concat(a.state.dogid)).then(function(e){return e.json()}).then(function(e){0===e.length?a.setState({dogimg:"https://pawedin.com/system/pets/default_images/default_pet.jpg"}):a.setState({dogimg:e[0].url})});break}})},a.create_UUID=function(e){var t=(new Date).getTime();return"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,function(e){var a=(t+16*Math.random())%16|0;return t=Math.floor(t/16),("x"===e?a:3&a|8).toString(16)})},a.yesDogs=function(e){var t=a.create_UUID(),n=a.state,o=n.uEmail,l=n.uFirst,r=n.uLast,s=n.dogAge,i=n.dogBreed,c=n.dogName,d=n.dogimg,g=n.dogTemp;m.auth().onAuthStateChanged(function(e){e&&m.database().ref("users/".concat(e.uid,"/dogdates/").concat(t)).set({dogAge:s,dogBreed:i,dogName:c,dogimg:d,dogTemp:g,email:o,first:l,last:r,status:"yes"})}),a.setState({isLoadingDog:!1,isLoadingInfo:!1,dogimg:null}),a.loadApi()},a.noDogs=function(e){var t=a.create_UUID(),n=a.state,o=n.uEmail,l=n.uFirst,r=n.uLast,s=n.dogAge,i=n.dogBreed,c=n.dogName,d=n.dogimg,g=n.dogTemp;m.auth().onAuthStateChanged(function(e){e&&m.database().ref("users/".concat(e.uid,"/dogdates/").concat(t)).set({dogAge:s,dogBreed:i,dogName:c,dogimg:d,dogTemp:g,email:o,first:l,last:r,status:"no"})}),a.setState({isLoadingDog:!1,isLoadingInfo:!1,dogimg:null}),a.loadApi()},a}return Object(g.a)(t,e),Object(i.a)(t,[{key:"componentDidMount",value:function(){var e=this;m.auth().onAuthStateChanged(function(t){t?e.setState({status:!1}):e.setState({status:!0})})}},{key:"render",value:function(){var e=this,t=this.state,a=t.isLoadingInfo,n=t.isLoadingDog,l=t.uEmail,r=t.uFirst,s=t.uLast,i=t.dogAge,c=t.dogBreed,d=t.dogName,g=t.dogimg,m=t.dogTemp,y=t.status;return!1!==n&&!1!==a||this.loadApi(),!1===n||!1===a?o.a.createElement(u.a,{style:z.loading}):!0===n&&!0===a?o.a.createElement(f.a,null,o.a.createElement(A,null),o.a.createElement(E.a,{exact:!0,path:"/",render:function(){return y?o.a.createElement(P,null):o.a.createElement(u.a,null,o.a.createElement(h.a,{style:z.card},o.a.createElement(p.a,{onClick:e.yesDogs,style:z.button,variant:"danger"},"Go On A Playdate!"),o.a.createElement(h.a.Body,{style:z.contents},o.a.createElement("div",null,o.a.createElement("img",{src:g,alt:"Dog Img",height:"40%",width:"40%",style:z.img}),o.a.createElement("h1",{style:z.name},d.toUpperCase()),o.a.createElement("h2",{style:z.breed},c),o.a.createElement("h3",{style:z.age},"Age: ",i)),o.a.createElement(u.a,{style:z.bio},o.a.createElement("p",null,"Hello my name is ",d," and I am ",m,". I enjoy playing in the park with other dogs and eating snacks"),o.a.createElement("p",null,"My owner is called ",r," ",s," and they take very good care o me."),o.a.createElement("p",null,"You can contact my owner at ",l," and I hope we can have a fun playdate!"))),o.a.createElement(p.a,{onClick:e.noDogs,style:z.button,variant:"danger"},"Maybe Next Time!")))}}),o.a.createElement(E.a,{path:"/profile",render:function(){return o.a.createElement(N,null)}}),o.a.createElement(E.a,{path:"/matches",render:function(){return o.a.createElement(T,null)}}),o.a.createElement(D,null)):void 0}}]),t}(n.Component),z={card:{margin:"100px 0"},img:{float:"left",border:"#DADADA solid 1px",margin:"10px"},bio:{clear:"both"},contents:{},button:{},age:{padding:"10px 0 0 0",fontSize:"20px"},name:{padding:"10px 0 0 0",color:"#9A1212",fontWeight:"bold",fontSize:"40px"},breed:{padding:"10px 0 0 0",color:"#9A1212",fontSize:"30px"},loading:{background:"white"},loadingcard:{margin:"100px"}},H=M,U=(a(117),function(e){function t(){return Object(s.a)(this,t),Object(c.a)(this,Object(d.a)(t).apply(this,arguments))}return Object(g.a)(t,e),Object(i.a)(t,[{key:"render",value:function(){return o.a.createElement("div",{style:_.body},o.a.createElement(H,null))}}]),t}(n.Component)),_={body:{background:"#DADADA"}},W=U;Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));m.initializeApp({apiKey:"AIzaSyD2bxg_sJcq3m625n7tDHAp_nkMjGtUdOw",authDomain:"dogdata-3200f.firebaseapp.com",databaseURL:"https://dogdata-3200f.firebaseio.com",projectId:"dogdata-3200f",storageBucket:"dogdata-3200f.appspot.com",messagingSenderId:"1085718428729",appId:"1:1085718428729:web:b95fef7c3f7b8e31"}),r.a.render(o.a.createElement(W,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})},75:function(e,t,a){e.exports=a(118)},80:function(e,t,a){}},[[75,1,2]]]);
//# sourceMappingURL=main.475016a4.chunk.js.map