/**
 * Класс Sidebar отвечает за работу боковой колонки:
 * кнопки скрытия/показа колонки в мобильной версии сайта
 * и за кнопки меню
 * */
class Sidebar {
  /**
   * Запускает initAuthLinks и initToggleButton
   * */
  static init() {
    this.initAuthLinks();
    this.initToggleButton();
  }

  /**
   * Отвечает за скрытие/показа боковой колонки:
   * переключает два класса для body: sidebar-open и sidebar-collapse
   * при нажатии на кнопку .sidebar-toggle
   * */
  static initToggleButton() {
    const toggleBtn = document.querySelector(".sidebar-toggle");
    if (!toggleBtn) return;

    toggleBtn.addEventListener("click", (event) => {
      event.preventDefault();
      document.body.classList.toggle("sidebar-open");
      document.body.classList.toggle("sidebar-collapse");
    });
  }

  /**
   * При нажатии на кнопку входа, показывает окно входа
   * (через найденное в App.getModal)
   * При нажатии на кнопку регастрации показывает окно регистрации
   * При нажатии на кнопку выхода вызывает User.logout и по успешному
   * выходу устанавливает App.setState( 'init' )
   * */
  static initAuthLinks() {
    const sidebar = document.querySelector(".sidebar");
    sidebar.addEventListener("click", (event) => {
      const menuItem = event.target.closest("li.menu-item");
      if (!menuItem) return;

      event.preventDefault();

      if (menuItem.matches(".menu-item_login")) {
        const loginModal = App.getModal("login");
        if (loginModal) {
          loginModal.open();
        }
      } else if (menuItem.matches(".menu-item_register")) {
        const registerModal = App.getModal("register");
        if (registerModal) {
          registerModal.open();
        }
      } else if (menuItem.matches(".menu-item_logout")) {
        User.logout((error, response) => {
          if (error) {
            console.error("Ошибка при выходе: " + error);
            return;
          }

          if (response && response.success === true) {
            App.setState("init");
          } else {
            console.warn("Выход не подтвержден: " + response);
          }
        });
      }
    });
  }
}
