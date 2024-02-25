class Testimonial {
    // properties
    constructor(image, desc, name) {
        this.image = image;
        this.name = name;
        this.desc = desc;
    }
    get cardsHtml() {
        return `
                <li class="cards_item">
                    <div class="card">
                        <div class="card_image"><img src="${this.image}"></div>
                            <div class="card_content">
                                <h2 class="card_title">${this.desc}</h2>
                                <p class="card_text">${this.name}</p>
                            </div>
                    </div>
                 </li>`;
    }
}

class TestimonialCard extends Testimonial {
    get cardsHtml() {
        return ` <li class="cards_item">
                    <div class="card">
                        <div class="card_image"><img src="${this.image}"></div>
                            <div class="card_content">
                                <h2 class="card_title">${this.desc}</h2>
                                <p class="card_text">${this.name}</p>
                            </div>
                    </div>
                </li>
            `;
    }
}

const testimonials = [
    new Testimonial(
        "/assets/image/foto.jpg",
        "Muhammad Fadhil",
        "FullStack Developer",
    ),
    new Testimonial(
        "/assets/image/foto.jpg",
        "Muhammad Fadhil",
        "FullStack Developer",
    ),
    new Testimonial(
        "/assets/image/foto.jpg",
        "Muhammad Fadhil",
        "FullStack Developer",
    ),
];

let htmlInner = "";

for (let i = 0; i < testimonials.length; i++) {
    htmlInner += testimonials[i].cardsHtml;
}

let Card = document.querySelector(".cards");
Card.innerHTML = htmlInner;