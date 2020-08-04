import React, {createRef, Component} from  'react'
import { Modal } from 'react-bootstrap';
import firebase, { fauth } from "./../service/Fire.js"


class GameRoom extends Component{
    constructor(props){
        super(props);
        this.state = {
            roomId: null,
            playerName: null,
            opponentName: null,
            inGame: false,
            showGameMenu: false,
            showMainMenu: false,
            showNameMenu: false,
            currUserId: null,

        }
        this.login = this.login.bind(this);
        this.logout = this.logout.bind(this);

    }
    
    componentDidMount() {
        fauth.onAuthStateChanged((user) => {
            if (user) {
                this.setState({ currUserId: user.uid });
                if(this.state.playerName === null){
                    // Will have to retrieve it.
                }else{
                    firebase.database().ref('players/' + user.uid).set({
                        "Name": this.state.playerName
                    });
                }
            } 
            
        });
    }

    login = () =>{
        fauth.signInAnonymously().then((result) =>{
            const userId = result.user.uid;
            this.setState({
                currUserId: userId
            });
        });
    }

    logout = () => {
        fauth.signOut()
            .then(() => {
            this.setState({
                currUserId: null
            });
        });
    }

    // Changing the local and passing data to parent
    handleChange (event) {
        console.log("handle change reached in child")
        this.setState({
            [event.target.name]: event.target.value }, () =>{
                if(this.props.onChange){
                    this.props.onChange(this.state);
                }
            })
    } // Latter just remove the above part of continuous sending data to parent and use the below

    passToParent= () => {
        this.props.onChange(this.state)
    }

    showGameMenu = () => {
        this.setState({ showGameMenu: true });
    };
    showMainMenu = () => {
        this.setState({ showMainMenu: true });
    };
    showNameMenu = () => {
        this.setState({ showNameMenu: true });
    };

    hideNameMenu = () => {
        this.setState({ showNameMenu: false });
    };
    hideGameMenu = () => {
        this.setState({ showGameMenu: false });
    };
    hideMainMenu = () => {
        this.setState({ showMainMenu: false });
    };

    userCreate = (event) => {
        event.preventDefault()
        console.log("Creating User")
        try {
            this.login()
            this.hideNameMenu()
            this.showMainMenu()
        } catch (error) {
            console.log("Creating the User: "+error)
        }
    }

    createRoom = (event) => {     
        if(this.state.currUserId !== null){
            var num = (new Date()).getTime()
            firebase.database().ref('gameRooms/' + num ).set({
                'player1': this.state.currUserId,
                'player2': null
            });
            this.hideMainMenu()
            this.showGameMenu()
            this.passToParent()
        }else{
            console.log("Unable to create Room")
        }
    }

    joinRoom = (event) => {
        event.preventDefault()
        try {
            var num = this.state.roomId
            firebase.database().ref('gameRooms/' + num ).update({
                'player2': this.state.currUserId
            });
            this.hideMainMenu()
            this.showGameMenu()
        } catch (error) {
            console.log(error)
        }   
    }

    render(){
        
        return(
            <>  <button onClick={(e) => this.logout()}>Logout</button>
                <Modal show={this.state.showNameMenu} onHide={this.hideNameMenu} backdrop="static" centered>
                    <Modal.Header closeButton>
                        <Modal.Title>Player Info</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form>
                            <div className="input-group mb-3">
                                <div className="input-group-prepend">
                                    <span className="input-group-text">Person</span>
                                </div>
                                <input type="text" className="form-control" name="playerName" onChange={event => this.handleChange(event)} placeholder="Enter Your Name"></input>
                            </div>            
                            <div className="input-group mb-3">
                                <button type="button" onClick={this.userCreate} className="btn btn-primary">Enter Game Menu</button>
                            </div>
                        </form>
                    </Modal.Body>
                </Modal>
                <Modal show={this.state.showMainMenu} onHide={this.hideMainMenu} backdrop="static" centered >
                    <Modal.Header closeButton >
                        <Modal.Title>Game Menu</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form>    
                            <div className="input-group mb-3">
                                <button type="button" onClick={this.createRoom} className="btn btn-primary">Create Room</button>
                                <h5>Or</h5>    
                                <input type="text" className="form-control" name="roomId" onChange={event => this.handleChange(event)} placeholder="Room Id"></input>
                                <div className="input-group-append">
                                    <button className="btn btn-success" onClick={this.joinRoom} type="button">Join Room</button>
                                </div>
                            </div>
                        </form>
                    </Modal.Body>
                </Modal>
                <Modal show={this.state.showGameMenu} onHide={this.hideGameMenu} backdrop="static" centered>
                    <Modal.Header closeButton>
                        <Modal.Title>Match Making</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
                    <Modal.Footer>
                        <button className="btn btn-success" type="button">Join Room</button>
                    </Modal.Footer>
                </Modal>
                <button type="button" onClick={ (this.state.currUserId === null) ? this.showNameMenu: this.showMainMenu} className="btn btn-primary">
                    {this.inGame ? <>Exit Room</>:<>New Room</>}
                </button>
            </>
        )
    }
}

export default GameRoom