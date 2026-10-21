/**
 * Класс CreateTransactionForm управляет формой
 * создания новой транзакции
 * */
class CreateTransactionForm extends AsyncForm {
  /**
   * Вызывает родительский конструктор и
   * метод renderAccountsList
   * */
  constructor(element) {
    super(element);
    this.renderAccountsList();
  }

  /**
   * Получает список счетов с помощью Account.list
   * Обновляет в форме всплывающего окна выпадающий список
   * */
  renderAccountsList() {
    Account.list((error, response) => {
      if (response && response.success) {
        const select = this.element.querySelector(".accounts-select");

        select.innerHTML = response.data
          .map(
            (account) => `
          <option value="${account.id}">${account.name}</option>
        `,
          )
          .join("");
      } else {
        alert(response.error);
      }
    }, null);
  }

  /**
   * Создаёт новую транзакцию (доход или расход)
   * с помощью Transaction.create. По успешному результату
   * вызывает App.update(), сбрасывает форму и закрывает окно,
   * в котором находится форма
   * */
  onSubmit(data) {
    Transaction.create(data, (error, response) => {
      if (response && response.success) {
        const modalElement = this.element.closest(".modal");
        App.getModal(modalElement.dataset.modalId).close();

        this.element.reset();
        App.update();
      } else {
        const errorMsg = error || response.error || 'Произошла ошибка при создании операции'
        alert(errorMsg);
      }
    });
  }
}
