export class ProductDetailComponent {
    constructor(parent) {
        this.parent = parent;
    }

    getHTML(data) {
        return `
            <div class="card card-sanrio mx-auto my-3 p-4" style="max-width: 650px;">
                <!-- слева колонка 5, справа колонка 7  -->
                <div class="row align-items-center">
                    <div class="col-5 text-center">
                        <img src="${data.src}" class="img-fluid" style="max-height: 200px; object-fit: contain;" alt="${data.name}">
                    </div>
                    
                    <!-- колонка с описанием -->
                    <div class="col-7">
                        <span class="small fw-bold d-block mb-1" style="color: #2098d1;">${data.category}</span>
                        <h3 class="fw-bold mb-2" style="color: #2d2a26;">${data.name}</h3>
                        <p class="text-muted small mb-3">${data.shortDesc}</p>
                        
                        <p class="mb-1 small"><strong>День рождения:</strong> ${data.birthday}</p>
                        <p class="mb-3 small"><strong>Увлечения:</strong> ${data.hobby}</p>

                        <!-- Bootstrap Alert -->
                        <div class="alert alert-sanrio small p-2 mb-3" role="alert">
                            <strong>Послание:</strong> ${data.quote}
                        </div>

                        <button id="back-btn" class="btn btn-sanrio btn-sm w-100">Назад к списку</button>
                    </div>
                </div>
            </div>
        `;
    }

    addListeners(onBack) {
        document.getElementById("back-btn").addEventListener("click", onBack);
    }

    render(data, onBack) {
        const html = this.getHTML(data);
        this.parent.insertAdjacentHTML("beforeend", html);
        this.addListeners(onBack);
    }
}

