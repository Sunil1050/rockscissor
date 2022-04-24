import {Component} from 'react'
import Popup from 'reactjs-popup'
import 'reactjs-popup/dist/index.css'
import {RiCloseLine} from 'react-icons/ri'
import Header from './components/Header'
import ButtonItem from './components/ButtonItem'
import './App.css'

const choicesList = [
  {
    id: 'ROCK',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rock-paper-scissor/rock-image.png',
  },
  {
    id: 'SCISSORS',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rock-paper-scissor/scissor-image.png',
  },
  {
    id: 'PAPER',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rock-paper-scissor/paper-image.png',
  },
]

class App extends Component {
  state = {
    isPlaying: true,
    activeButton: choicesList[0].id,
    randomButtonList: [choicesList[0]],
    result: '',
    count: 0,
  }

  onClickButton = btnId => {
    const {randomButtonList, count} = this.state
    console.log(btnId)

    const randomBtn = this.renderRandomButton()
    this.setState({
      isPlaying: false,
      activeButton: btnId,
    })
    this.setState(prevState => ({
      randomButtonList: [...prevState.randomButtonList, randomBtn],
    }))
    const {id} = randomButtonList[randomButtonList.length - 1]
    console.log(id)
    if (btnId === id) {
      this.setState({result: 'IT IS DRAW'})
    }
    const isWon =
      (btnId === 'PAPER' && id === 'ROCK') ||
      (btnId === 'SCISSORS' && id === 'PAPER') ||
      (btnId === 'ROCK' && id === 'SCISSORS')
    if (isWon) {
      this.setState({
        result: 'YOU WON',
        count: count + 1,
      })
    } else {
      this.setState({
        result: 'YOU LOSE',
        count: count - 1,
      })
    }
  }

  onClickPlayingBtn = () => {
    this.setState({isPlaying: true})
  }

  renderUserButton = id => {
    switch (id) {
      case 'ROCK':
        return (
          <button
            type="button"
            data-testid="rockButton"
            className="game-results-button"
          >
            <img
              src={choicesList[0].imageUrl}
              alt="your choice"
              className="button-icon"
            />
          </button>
        )
      case 'SCISSORS':
        return (
          <button
            type="button"
            data-testid="rockButton"
            className="game-results-button"
          >
            <img
              src={choicesList[1].imageUrl}
              alt="your choice"
              className="button-icon"
            />
          </button>
        )
      case 'PAPER':
        return (
          <button
            type="button"
            data-testid="rockButton"
            className="game-results-button"
          >
            <img
              src={choicesList[2].imageUrl}
              alt="your choice"
              className="button-icon"
            />
          </button>
        )
      default:
        return null
    }
  }

  renderRandomButton = () => {
    const randomNum = Math.floor(Math.random() * choicesList.length)
    return choicesList[randomNum]
  }

  renderPlayingView = () => (
    <div className="button-container">
      {choicesList.map(item => (
        <ButtonItem
          eachBtn={item}
          onClickButton={this.onClickButton}
          renderUserButton={this.renderUserButton}
          key={item.id}
        />
      ))}
    </div>
  )

  renderGameResultsView = () => {
    const {activeButton, result, randomButtonList} = this.state
    const userButton = this.renderUserButton(activeButton)
    const {imageUrl} = randomButtonList[randomButtonList.length - 1]
    return (
      <div className="mt-5">
        <div className="d-flex justify-content-around">
          <div className="text-center">
            <h3 className="text-white">YOU</h3>
            {userButton}
          </div>
          <div className="text-center mt-3 align-self-center">
            <p className="text-white font-weight-bold">{result}</p>
            <button
              type="button"
              className="game-result-btn"
              onClick={this.onClickPlayingBtn}
            >
              PLAY AGAIN
            </button>
          </div>

          <div className="text-center">
            <h3 className="text-white">OPPONENT</h3>
            <button
              type="button"
              data-testid="scissorsButton"
              className="game-results-button"
            >
              <img
                src={imageUrl}
                alt="opponent choice"
                className="game-results-button-icon"
              />
            </button>
          </div>
        </div>
      </div>
    )
  }

  render() {
    const {isPlaying, count, randomButtonList} = this.state
    console.log(randomButtonList)
    return (
      <div className="bg-container">
        <div className="container">
          <Header count={count} />
          {isPlaying ? this.renderPlayingView() : this.renderGameResultsView()}
          <div className="d-flex flex-row justify-content-end mt-3">
            <Popup
              modal
              trigger={
                <button type="button" className="trigger-button">
                  Rules
                </button>
              }
            >
              {close => (
                <>
                  <div className="p-4">
                    <div className="d-flex flex-row justify-content-end">
                      <button
                        type="button"
                        className="close-button"
                        onClick={() => close()}
                      >
                        <RiCloseLine className="close-icon" />
                      </button>
                    </div>
                    <img
                      src="https://assets.ccbp.in/frontend/react-js/rock-paper-scissor/rules-image.png"
                      alt="rules"
                      className="w-100 mt-3"
                    />
                  </div>
                </>
              )}
            </Popup>
          </div>
        </div>
      </div>
    )
  }
}

export default App
