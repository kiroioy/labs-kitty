import { ProductCardComponent } from "../../components/product-card/index.js";
import { ProductPage } from "../product/index.js";
import { characters } from "../../mocks/characters.js";

// главная страница 
export class MainPage {
    constructor(parent, existingData = null) {
        this.parent = parent; 
        // состояние: берем либо переданные обновленные данные, либо исходные моки
        this.data = existingData ? existingData : [...characters];
        this.currentCategory = "all"; // текущий выбранный фильтр
    }

    // переход на детальную карточки
    clickCard(id) {
        const productPage = new ProductPage(this.parent, id, this.data);
        productPage.render();
    }

    // удаление: filter оставляет всех, кроме персонажа с данным id
    deleteCard(id) {
        this.data = this.data.filter(item => item.id !== id);
        this.render();
    }

    // добавление: копирует первого персонажа с уникальным id
    addCard() {
        const firstCard = this.data[0] || characters[0];
        const newCard = {
            ...firstCard,
            id: Date.now(), 
            name: `${firstCard.name} (Копия)`
        };
        this.data.push(newCard);
        this.render();
    }

    // смена категории фильтра
    onFilter(category) {
        this.currentCategory = category;
        this.render();
    }

    // кнопка Домой: сброс фильтра на "all"
    clickHome() {
        this.currentCategory = "all";
        this.render();
    }

    getHTML() {
        return `
            <!-- шапка: кнопка на сайт, заголовок и кнопка Домой -->
            <header class="d-flex justify-content-between align-items-center py-3 px-4 mb-4">
                <div class="d-flex align-items-center gap-3">
                    <a href="../index.html" class="btn-sanrio-blue">На сайт</a>
                    <span class="fs-5 fw-bold" style="color: #ff3366; letter-spacing: 0.5px;">Sanrio Characters</span>
                </div>
                <button id="home-btn" class="btn btn-sm btn-outline-sanrio">Домой</button>
            </header>

            <div class="container pb-5">
                <!-- панель управления: кнопки фильтрации и кнопка добавления -->
                <div class="d-flex justify-content-between align-items-center mb-4">
                    <div class="d-flex gap-2">
                        <button class="btn btn-sm ${this.currentCategory === 'all' ? 'btn-sanrio' : 'btn-outline-sanrio'} filter-btn" data-category="all">Все</button>
                        <button class="btn btn-sm ${this.currentCategory === 'кошечка' ? 'btn-sanrio' : 'btn-outline-sanrio'} filter-btn" data-category="кошечка">Кошечки</button>
                        <button class="btn btn-sm ${this.currentCategory === 'зайка' ? 'btn-sanrio' : 'btn-outline-sanrio'} filter-btn" data-category="зайка">Зайки</button>
                        <button class="btn btn-sm ${this.currentCategory === 'собачка' ? 'btn-sanrio' : 'btn-outline-sanrio'} filter-btn" data-category="собачка">Собачки</button>
                    </div>

                    <button id="add-btn" class="btn btn-sm btn-sanrio">Добавить карточку</button>
                </div>

                <!-- контейнер для сетки карточек -->
                <div id="cards-container" class="row"></div>
            </div>
        `;
    }

    // навешивание слушателей событий (оживление кнопок)
    addListeners() {
        document.getElementById("home-btn").addEventListener("click", () => this.clickHome());
        document.getElementById("add-btn").addEventListener("click", () => this.addCard());

        // на все кнопки фильтра вешаем клик
        document.querySelectorAll(".filter-btn").forEach(btn => {
            btn.addEventListener("click", (e) => {
                // e.target.dataset.category читает атрибут data-category кнопки
                this.onFilter(e.target.dataset.category);
            });
        });
    }

    // метод сборки и отображения страницы
    render() {
        this.parent.innerHTML = this.getHTML();
        this.addListeners();

        // фильтрация карточек по текущей категории
        const filteredData = this.currentCategory === "all"
            ? this.data
            : this.data.filter(item => item.category === this.currentCategory);

        const container = document.getElementById("cards-container");
        if (filteredData.length === 0) {
            container.innerHTML = `<div class="col-12 text-center py-5 text-muted">В этой категории пока нет персонажей</div>`;
        } else {
            filteredData.forEach(item => {
                const card = new ProductCardComponent(container);
                card.render(
                    item,
                    (id) => this.clickCard(id),
                    (id) => this.deleteCard(id)
                );
            });
        }
    }
}

