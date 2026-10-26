// export разрешает экспортировать класс в другие файлы
export class ProductCardComponent {
    constructor(parent) {
        this.parent = parent;
    }

    getHTML(data) {
        return `
            <!-- Просто col-3: всегда ровно 4 карточки в ряд, без подстроек под мобилки -->
            <div class="col-3 mb-4">
                <div class="card card-sanrio h-100 text-center">
                    <div class="card-img-wrapper">
                        <img src="${data.src}" class="img-fluid" style="max-height: 140px; object-fit: contain;" alt="${data.name}">
                    </div>
                    
                    <div class="card-body p-3">
                        <span class="fw-bold small d-block mb-1" style="color: #ff3366;">${data.category}</span>
                        <h5 class="card-title fw-bold mb-2">${data.name}</h5>
                        <p class="card-text text-muted small mb-3">${data.shortDesc}</p>
                        
                        <div class="d-flex gap-2">
                            <button id="click-card-${data.id}" class="btn btn-outline-sanrio btn-sm flex-grow-1">Подробнее</button>
                            <button id="delete-card-${data.id}" class="btn btn-outline-secondary btn-sm" style="border-radius: 10px;">Удалить</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    // метод навешивания событий 
    addListeners(data, onDetails, onDelete) {
        // подробнее
        document
            .getElementById(`click-card-${data.id}`)
            .addEventListener("click", () => onDetails(data.id));

        // удалить
        document
            .getElementById(`delete-card-${data.id}`)
            .addEventListener("click", () => onDelete(data.id));
    }

    render(data, onDetails, onDelete) {
        // генерация строки с версткой
        const html = this.getHTML(data);
        this.parent.insertAdjacentHTML("beforeend", html);
        this.addListeners(data, onDetails, onDelete);
    }
}

