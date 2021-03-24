export default class UserInfo {
  constructor(profileNameSelector, profileJobSelector, avatarSelector) {
    this._nameField = document.querySelector(profileNameSelector);
    this._jobField = document.querySelector(profileJobSelector);
    this._avatar = document.querySelector(avatarSelector);
  }
  setAvatar(data) {
    this._avatar.src = data.avatar;
  }
  getUserInfo() {
    const userInfo = {
      name: this._nameField.textContent,
      about: this._jobField.textContent,
    };
    return userInfo;
  }

  setUserInfo(data) {
    this._nameField.textContent = data.name;
    this._jobField.textContent = data.about;
  }
}
