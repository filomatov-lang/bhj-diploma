/**
 * Класс Account наследуется от Entity.
 * Управляет счетами пользователя.
 * Имеет свойство URL со значением '/account'
 * */
class Account extends Entity {
  static URL = "/account";

  /**
   * Получает информацию о счёте
   * */
  static get(id = "", callback) {
    const url = id ? `${this.URL}/${id}` : this.URL;
    createRequest({
      url: url,
      method: "GET",
      data: {},
      callback: callback,
    });
  }
}
