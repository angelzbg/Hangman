import React from "react";
import ReactDOM from "react-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from "reactstrap";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      gameID: null, 
      maxTries: 10,
      tries: 0,
      charCount: 4,
      firstChar: "w",
      lastChar: "d",
      current: "word",
      gameState: 5, // 1 = not started, 2 = started, 3 = won, 4 = lose, 5 = welcome
      wordState: "w**d",
      inputLetter: ''
    };
    this.handleChange = this.handleChange.bind(this);
  };

  handleChange(value) {
    this.setState({
      inputLetter: value
    });
  };

  render(){
    return (
      <div>
        <center>
            {
              this.state.gameState === 5
                ? (<h1>Wellcome to Hangout</h1>)
                : this.props.textOrHtml
            }

            {
              this.state.gameState === 2 || this.state.gameState === 3 || this.state.gameState === 4
                ? (<p>You have {this.state.maxTries-this.state.tries} tries left</p>)
                : this.props.textOrHtml
            }

            {
              this.state.gameState === 2 || this.state.gameState === 4
                ? (<p>{this.state.wordState}</p>)
                : this.props.textOrHtml
            }

            {
              this.state.gameState === 3 || this.state.gameState === 4
                ? (<p><font color='#0059b3'>{this.state.current}</font></p>)
                : this.props.textOrHtml
            }

            {this.renderSwitchHangState(this.state.tries)}

            {this.renderSwitchWinLose(this.state.gameState)}

            {
              this.state.gameState === 1 || this.state.gameState === 3 || this.state.gameState === 4 || this.state.gameState === 5
                ? (<Button onClick={() => this.startNewGame()}>Start new game</Button>)
                : this.props.textOrHtml
            }

            {
              this.state.gameState === 2
                ? (<form>
                Aim letter:<br></br>
                <input type="text" value={this.state.inputLetter} onChange={(e) =>this.handleChange(e.target.value)} ></input><br></br>
                <Button onClick={() => this.tryLetter()}>Submit</Button><br></br>
                </form>)
                : this.props.textOrHtml
            }
        </center>
      </div>
    );
  };

  renderSwitchHangState(tries){
    switch(tries) {
      case 1:
        return <div><img src="Hangman-1.png"></img><br></br></div>;
      case 2:
        return <div><img src="Hangman-2.png"></img><br></br></div>;
      case 3:
        return <div><img src="Hangman-3.png"></img><br></br></div>;
      case 4:
        return <div><img src="Hangman-4.png"></img><br></br></div>;
      case 5:
        return <div><img src="Hangman-5.png"></img><br></br></div>;
      case 6:
        return <div><img src="Hangman-6.png"></img><br></br></div>;
      default:
        return <div><img src="Hangman-0.png"></img><br></br></div>;
    }
  };

  renderSwitchWinLose(gameState){
    switch(gameState) {
      case 3:
        return <h3><font color='lime'>WIN</font></h3>;
      case 4:
        return <h3><font color='red'>LOSE</font></h3>;
      default:
        return this.props.textOrHtml;
    }
  };

  startNewGame(){
    fetch('http://localhost:8080/api/hangman/games', {
      method:'POST',
      mode:'cors',
    })
    .then((resp) => resp.json())
    .then(
        data => this.setState({ 
          gameID: data.id, 
          maxTries: data.maxTries,
          tries: data.tries,
          charCount: data.charCount,
          firstChar: data.firstChar,
          lastChar: data.lastChar,
          current: data.current,
          gameState: 2,
          wordState: data.wordState
        })
    );
  };

  tryLetter(){
    fetch('http://localhost:8080/api/hangman/games/' + this.state.gameID + '/try?character=' + this.state.inputLetter, {
      method:'POST',
      mode:'cors'
    })
    .then((resp) => resp.json())
    .then(
        data => this.setState({ 
          gameID: data.id, 
          maxTries: data.maxTries,
          tries: data.tries,
          charCount: data.charCount,
          firstChar: data.firstChar,
          lastChar: data.lastChar,
          current: data.current,
          wordState: data.wordState
        })
    )
    .then(
      this.checkGameInfo()
    )
  };

  checkGameInfo(){
    if(this.state.wordState === this.state.current){
      this.setState({
        gameState: 3
      });
    } else if(this.state.maxTries-this.state.tries===0){
      this.setState({
        gameState: 4
      });
    }
  };

};

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);