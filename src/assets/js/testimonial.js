class Testimonial {
    constructor(image, desc, name) {
        this.image = image;
        this.desc = desc;
        this.name = name;
    }
}

class TestimonialCard extends Testimonial {
    get cardHtml() {
        return `<div class="card">
        <img src="${this.image}">
        <div class="content-testi">
            <div class="desc-testi">
                <i>"${this.desc}"</i>
            </div>
            <div class="name-testi">
                <p> ${this.name}</p>
            </div>
        </div>
    </div>`
    }
}

const testimonials = [
    new TestimonialCard(
        "/assets/img/foto.jpg",
        "FullStack Developer",
        "Muhammad Fadhil"
    ),
    new TestimonialCard(
        "/assets/img/foto.jpg",
        "FullStack Developer",
        "Muhammad Fadhil"
    ),
    new TestimonialCard(
        "/assets/img/foto.jpg",
        "FullStack Developer",
        "Muhammad Fadhil"
    ),
];

let htmlInner = ""

for (let index = 0; index < testimonials.length; index++) {
    htmlInner += testimonials[index].cardHtml;
}

let containerCard = document.querySelector(".container-card");
containerCard.innerHTML = htmlInner;