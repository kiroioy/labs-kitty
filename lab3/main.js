// точка входа в приложение
// импорт класса главной страницы
import {MainPage} from "./pages/main/index.js";

// получаем ссылку на корневой элемент в HTML-документе
const root = document.getElementById("root");

// создаем экземпляр главной страницы, передавая ей корневой элемент
const mainPage = new MainPage(root);

// запускаем первичный рендеринг интерфейса
mainPage.render();
