import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import PasswordItem from '../PasswordItem/index'
import './index.css'

const initialPasswordList = []
const backgroundColorsList = [
  'red',
  'blue',
  'green',
  'yellow',
  'gray',
  'orange',
  'purple',
]
class PasswordManager extends Component {
  state = {
    passwordsList: initialPasswordList,
    showPassword: false,
    searchItem: '',
    website: '',
    username: '',
    password: '',
  }

  onShowPassowrd = () => {
    this.setState(prevState => ({showPassword: !prevState.showPassword}))
  }

  onClickSubmit = event => {
    event.preventDefault()
    const {website, username, password} = this.state
    const index = Math.floor(Math.random() * backgroundColorsList.length)
    const bgColor = backgroundColorsList[index]
    const newPassword = {
      id: uuidv4(),
      website,
      username,
      password,
      bgColor,
    }
    this.setState(prevState => ({
      passwordsList: [...prevState.passwordsList, newPassword],
      website: '',
      username: '',
      password: '',
    }))
  }

  onClickDelete = id => {
    this.setState(prevState => ({
      passwordsList: prevState.passwordsList.filter(
        eachItem => eachItem.id !== id,
      ),
    }))
  }

  onUserSearch = event => {
    this.setState({searchItem: event.target.value})
  }

  onChangeWebsite = event => {
    this.setState({website: event.target.value})
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  renderPasswordInputSection = () => {
    const {website, username, password} = this.state
    return (
      <div className="user-input-section">
        <div className="password-image-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-sm-img.png"
            alt="password manager"
            className="password-img"
          />
        </div>
        <form onSubmit={this.onClickSubmit} className="input-form-container">
          <h1 className="text">Add New Password</h1>
          <div className="input-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
              alt="website"
              className="form-img"
            />
            <input
              type="text"
              value={website}
              placeholder="Enter Website"
              className="input"
              onChange={this.onChangeWebsite}
            />
          </div>
          <div className="input-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
              alt="username"
              className="form-img"
            />
            <input
              type="text"
              value={username}
              placeholder="Enter Username"
              className="input"
              onChange={this.onChangeUsername}
            />
          </div>
          <div className="input-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
              alt="password"
              className="form-img"
            />
            <input
              type="password"
              value={password}
              placeholder="Enter Password"
              className="input"
              onChange={this.onChangePassword}
            />
          </div>
          <button type="submit" className="form-button">
            Add
          </button>
        </form>
        <div className="password-image-container-lg">
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png"
            alt="password manager"
            className="password-img-lg"
          />
        </div>
      </div>
    )
  }

  renderPasswordsListSection = () => {
    const {passwordsList, showPassword, searchItem} = this.state

    const searchResultes = passwordsList.filter(eachItem =>
      eachItem.website.toLowerCase().includes(searchItem.toLowerCase()),
    )
    const isListEmpty = searchResultes.length === 0

    return (
      <div className="password-list-constainer">
        <div className="heading-section">
          <div className="your-password-container">
            <h1 className="your-password-text">Your Passwords</h1>
            <p className="count-text">{searchResultes.length}</p>
          </div>
          <div className="search-input-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
              alt="search"
              className="search-img"
            />
            <input
              type="search"
              placeholder="search"
              value={searchItem}
              onChange={this.onUserSearch}
              className="search-input"
            />
          </div>
        </div>
        <div className="password-section">
          <div className="check-box-contianer">
            <input
              id="showPassword"
              type="checkbox"
              className="check-box"
              onChange={this.onShowPassowrd}
            />
            <label htmlFor="showPassword" className="check-box-label">
              Show Passwords
            </label>
          </div>
          {isListEmpty ? (
            <div>
              <img
                src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
                alt="no passwords"
                className="no-passwords-img"
              />
              <p className="no-passwords-text">No Passwords</p>
            </div>
          ) : null}
          <ul className="password-list-items">
            {searchResultes.map(eachItem => (
              <PasswordItem
                key={eachItem.id}
                bgColors={backgroundColorsList}
                showPassword={showPassword}
                passwordData={eachItem}
                onClickDelete={this.onClickDelete}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }

  render() {
    return (
      <div className="app-container">
        <div className="password-manager-container">
          <div className="logo-img-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
              alt="app logo"
              className="logo-img"
            />
          </div>
          {this.renderPasswordInputSection()}
          {this.renderPasswordsListSection()}
        </div>
      </div>
    )
  }
}
export default PasswordManager
