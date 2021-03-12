export default class UserInfo {
  constructor (profileNameSelector, profileJobSelector) {
    this._nameField = document.querySelector(profileNameSelector);
    this._jobField = document.querySelector(profileJobSelector);
  }

  getUserInfo() {
    const userInfo = {
      name: this._nameField.textContent,
      job: this._jobField.textContent,
    }
    return userInfo;
  }

  setUserInfo({ name, job }) {
    this._nameField.textContent = name;
    this._jobField.textContent = job;
  }
}