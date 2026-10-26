import { ProductDetailComponent } from "../../components/product-detail/index.js";
import { MainPage } from "../main/index.js";

// страница подробностей персонажа 
export class ProductPage {
    constructor(parent, id, currentData) {
        this.parent = parent;
        this.id = id;             // id выбранного персонажа
        this.data = currentData;  // Сохраняем актуальный массив карточек
    }

    // возврат в каталог 
    clickBack() {
        const mainPage = new MainPage(this.parent, this.data);
        mainPage.render();
    }

    getHTML() {
        return `
            <header class="d-flex justify-content-between align-items-center py-3 px-4 mb-4">
                <span class="fs-5 fw-bold" style="color: #ff3366; letter-spacing: 0.5px;">Sanrio Characters</span>
                <button id="product-home-btn" class="btn btn-sm btn-outline-sanrio">Домой</button>
            </header>
            <div class="container pb-5">
                <div id="detail-container"></div>
            </div>
        `;
    }

    addListeners() {
        // клик на кнопку Домой возвращает в каталог
        document.getElementById("product-home-btn").addEventListener("click", () => this.clickBack());
    }

    render() {
        this.parent.innerHTML = this.getHTML();
        this.addListeners();

        // находим нужного персонажа в массиве по id
        const character = this.data.find(item => item.id === this.id);
        const container = document.getElementById("detail-container");

        // отрисовка компонент ProductDetailComponent
        const detail = new ProductDetailComponent(container);
        detail.render(character, () => this.clickBack());
    }
}
