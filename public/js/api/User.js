/**
 * Класс User управляет авторизацией, выходом и
 * регистрацией пользователя из приложения
 * Имеет свойство URL, равное '/user'.
 * */
class User {
  static URL = "/user";
  static STORAGE_KEY = "currentUser";
  /**
   * Устанавливает текущего пользователя в
   * локальном хранилище.
   * */
  static setCurrent(user) {
    const userString = JSON.stringify(user);
    localStorage.setItem(this.STORAGE_KEY, userString);
  }

  /**
   * Удаляет информацию об авторизованном
   * пользователе из локального хранилища.
   * */
  static unsetCurrent() {
    localStorage.removeItem(this.STORAGE_KEY);
  }

  /**
   * Возвращает текущего авторизованного пользователя
   * из локального хранилища
   * */
  static current() {
    const str = localStorage.getItem(this.STORAGE_KEY);
    if (!str) return null;
    try {
      return JSON.parse(str);
    } catch {
      return null;
    }
  }

  /**
   * Получает информацию о текущем
   * авторизованном пользователе.
   * */
  static fetch(callback) {
    createRequest({
      url: `${this.URL}/current`,
      method: "GET",
      callback: (error, response) => {
        if (response && response.success && response.user) {
          this.setCurrent(response.user);
        } else {
          this.unsetCurrent();
        }
        callback(error, response);
      },
    });
  }

  /**
   * Производит попытку авторизации.
   * После успешной авторизации необходимо
   * сохранить пользователя через метод
   * User.setCurrent.
   * */
  static login(data, callback) {
    createRequest({
      url: this.URL + "/login",
      method: "POST",
      responseType: "json",
      data,
      callback: (error, response) => {
        if (response && response.user) {
          this.setCurrent(response.user);
        }
        callback(error, response);
      },
    });
  }

  /**
   * Производит попытку регистрации пользователя.
   * После успешной авторизации необходимо
   * сохранить пользователя через метод
   * User.setCurrent.
   * */
  static register(data, callback) {
    createRequest({
      url: `${this.URL}/register`,
      method: "POST",
      data,
      callback: (error, response) => {
        if (response && response.success && response.user) {
          this.setCurrent(response.user);
        }

        callback(error, response);
      },
    });
  }

  /**
   * Производит выход из приложения. После успешного
   * выхода необходимо вызвать метод User.unsetCurrent
   * */
  static logout(callback) {
    createRequest({
      url: `${this.URL}/logout`,
      method: "POST",
      callback: (error, response) => {
        if (response && response.success) {
          this.unsetCurrent();
        }

        callback(error, response);
      },
    });
  }
}
