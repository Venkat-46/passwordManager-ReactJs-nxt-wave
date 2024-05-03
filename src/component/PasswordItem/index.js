import './index.css'

const PasswordItem = props => {
  const {passwordData, onClickDelete, showPassword} = props
  const {id, website, username, password, bgColor} = passwordData
  const initial = username.slice(0, 1)

  const onDelete = () => {
    onClickDelete(id)
  }

  return (
    <li className="password-item">
      <p className={`initial-text ${bgColor}`}>{initial}</p>
      <div>
        <p className="text">{website}</p>
        <p className="text">{username}</p>
        {showPassword ? (
          <p className="text">{password}</p>
        ) : (
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
            alt="stars"
            className="stars-img"
          />
        )}
      </div>
      <button
        data-testid="delete"
        type="button"
        className="delete-button"
        onClick={onDelete}
      >
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
          alt="delete"
          className="delete-img"
        />
      </button>
    </li>
  )
}

export default PasswordItem
