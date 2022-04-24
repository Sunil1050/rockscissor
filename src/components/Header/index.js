import './index.css'

const Header = props => {
  const {count} = props
  return (
    <div className="header-container">
      <div className="align-self-center">
        <h1 className="header-heading">Rock Paper Scissors</h1>
      </div>
      <div className="score-box">
        <p className="score-text">Score</p>
        <p className="score">{count}</p>
      </div>
    </div>
  )
}
export default Header
