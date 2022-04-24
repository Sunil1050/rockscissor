import './index.css'

const ButtonItem = props => {
  const {eachBtn, onClickButton, renderUserButton} = props
  const {id, imageUrl} = eachBtn
  const onChangePlayingView = () => {
    onClickButton(id)
    renderUserButton(id)
  }

  return (
    <div className="button-item">
      <button
        type="button"
        className="button"
        data-testid={`${id.toLowerCase()}Button`}
        onClick={onChangePlayingView}
      >
        <img src={imageUrl} alt={id} className="button-icon" />
      </button>
    </div>
  )
}
export default ButtonItem
