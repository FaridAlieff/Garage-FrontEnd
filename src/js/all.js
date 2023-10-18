
if(localStorage.getItem("basket")==null){
    localStorage.setItem("basket","[]");
    localStorage.setItem("product",'0'); 
}

fetch("../src/json/db.json")
.then(res => res.json())
.then(data => {
    
    let sum=0;
        JSON.parse(localStorage.getItem("basket")).forEach(e=>{
            
        sum+=Number(e.count) * Math.floor(data.products[e.id].price-data.products[e.id].price/100*data.products[e.id].discount);
    })
    document.querySelector("#Cart").innerHTML = `(${sum})$`;

    let products = data.products;
    let basket = JSON.parse(localStorage.getItem("basket"));
    let html = '';
    basket.forEach(e => {
        html+=`
        <div class="card-product-area" style="padding: 10px 10px;">
            <a href=""><img src="${products[e.id].imgs[0]}" height="100" width="100" alt="">                            </a>
            <div class="cart-product-info">
                <a class="a-title-product">${products[e.id].title}</a>                                
                <span>${e.count} x $${e.price}</span>
            </div>
            <div class="close-icon">
                <i class="fa-solid fa-xmark" data-id="${e.id}" onclick="Delete(this)"></i>
            </div>
        </div>
       
        `;
    });
    html+=`
        <div class="total-price-viewcart" style="padding: 10px 10px;">
            <h5>TOTAL:</h5><span class="total-span">${sum}$</span>
        </div>
        <div class="btns-viewcart">
            <a href="./cart.html" class="btn-viewcart">VIEW CART</a>
            <a href="" class="btn-checkout">CHECKOUT</a>
        </div>
    `
    $(".navbar-right .submenu ul").html(html);
})

function Delete(e){
    let basket =[];
    JSON.parse(localStorage.getItem("basket")).forEach(p=>{
        if(p.id!=e.getAttribute("data-id")){
            basket.push(p);
        }

    })
    localStorage.setItem("basket",JSON.stringify(basket))
    e.parentElement.parentElement.remove();

}

//Sidebar slider menu
let sliderMenu = document.querySelector(".desktop-sidebar-slider-menu");

function openNav() {
    sliderMenu.style.width = "86vh";
    sliderMenu.style.right = "0"
}
  
function closeNav() {
    sliderMenu.style.right = "-86vh"
}

//scroll top

window.onscroll = function () {
    scrollFunction();
};

function scrollFunction() {
    const scrollUpButton = document.getElementById("scrollUpButton");
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        scrollUpButton.style.display = "block";
    } else {
        scrollUpButton.style.display = "none";
    }
}

function scrollToTop() {
    const scrollTopDuration = 500; // Duration in milliseconds

    const scrollStep = -window.scrollY / (scrollTopDuration / 15);

    const scrollInterval = setInterval(function () {
        if (window.scrollY !== 0) {
            window.scrollBy(0, scrollStep);
        } else {
            clearInterval(scrollInterval);
        }
    }, 0);
}

function changeContent(type) {
    var contentBox = document.getElementById("contentBox-about");
    switch(type) {
        case 'about':
            contentBox.innerHTML = "Vestibulum ultricies aliquam convallis. Maecenas ut tellus mi. Proin tincidunt, lectus eu volutpat mattis, ante metus lacinia tellus, vitae condimentum nulla enim bibendum nibh. Praesent turpis risus, interdum nec venenatis id, pretium sit amet purus. Interdum et malesuada fames ac ante ipsum primis in faucibus.  Aliquam eu lorem nibh. Mauris ex dolor, rutrum in odio vel, suscipit ultrices nunc. Cras ipsum dolor, eleifend et nisl vel, tempor molestie nibh.";
            break;
        case 'services':
            contentBox.innerHTML = "Cras ipsum dolor, eleifend et nisl vel, tempor molestie nibh. In hac habitasse platea dictumst. Proin nec blandit ligula. Donec volutpat leo turpis, vel accumsan nunc convallis id. Vestibulum ultricies aliquam convallis. Maecenas ut tellus mi. Proin tincidunt, lectus eu volutpat mattis, ante metus lacinia tellus, vitae condimentum nulla enim bibendum nibh. Praesent turpis risus, interdum nec venenatis id, pretium sit amet purus. Interdum et malesuada fames ac ante ipsum.";
            break;
        case 'history':
            contentBox.innerHTML = "Donec volutpat leo turpis, vel accumsan nunc convallis id. Vestibulum ultricies aliquam convallis. Maecenas ut tellus mi. Proin tincidunt, lectus eu volutpat mattis, ante metus lacinia tellus, vitae condimentum nulla enim bibendum nibh. Cras ipsum dolor, eleifend et nisl vel, tempor molestie nibh. In hac habitasse platea dictumst. Praesent turpis risus, interdum nec venenatis id, pretium sit amet purus. Interdum et malesuada fames ac ante ipsum primis. Proin nec. ";
            break;
    }
}

document.addEventListener('DOMContentLoaded', function() {
    let testimonials = [
        {
            text: "Cum sociis natoque penatibus magnis dis parturienmontes, nasceturridiculus musestibulum ultricies aliquam convallis. Lorem ipsum dolor sit amet, consectetur a elit. In ut ullamcorper leo, eget euismod orci aliquenenan penatibus dis parturienmontes ultricies. ",
            author: "John Doe",
            role: "CEO, Company A"
        },
        {
            text: "I've never seen anything like this before.",
            author: "Jane Smith",
            role: "Developer, Company B"
        },
    ];

    let currentTestimonialIndex = 0;

    function updateTestimonial() {
        document.querySelector('.testimonial-text').textContent = testimonials[currentTestimonialIndex].text;
        document.querySelector('.testimonial-author').textContent = testimonials[currentTestimonialIndex].author;
        document.querySelector('.testimonial-role').textContent = testimonials[currentTestimonialIndex].role;
    }

    document.querySelector('.testimonial-prev').addEventListener('click', function(event) {
        event.preventDefault();
        currentTestimonialIndex--;
        if (currentTestimonialIndex < 0) {
            currentTestimonialIndex = testimonials.length - 1;
        }
        updateTestimonial();
    });

    document.querySelector('.testimonial-next').addEventListener('click', function(event) {
        event.preventDefault();
        currentTestimonialIndex++;
        if (currentTestimonialIndex > testimonials.length - 1) {
            currentTestimonialIndex = 0;
        }
        updateTestimonial();
    });

    updateTestimonial();    
});
