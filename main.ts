import { typeInforCart } from "./cart/cart.js";
const $: Function = document.querySelector.bind(document);
const $$: Function = document.querySelectorAll.bind(document);
const pushDataHome = $('.product__home');
const quantityCartIcon = $('.header__cart-notice');
const load = $('.modal__overlay');
var htmlHome: string[];
interface typeInforProduct {
    id: number,
    image: string,
    name: string,
    gia: number
}
const API: string = 'https://json-server-8822.herokuapp.com/product';
const API_CART: string = 'https://json-server-8822.herokuapp.com/cart';
export { API_CART }
const handlePostCart = (id: number) => {
    const imgItem = $(`#item${id} .home-product-item__img`).getAttribute('data-product-img')
    const nameItem = $(`#item${id} .home-product-item__name`).textContent
    const priceItem = $(`#item${id} .home-product-item__price-current`).dataset.price
    let data: typeInforCart = {
        id: Number(id),
        image: '.'+imgItem,
        name: nameItem,
        gia: Number(priceItem),
        soluong: 1
    }
    POST(data)
}
const checkCart = () => {
    fetch(API_CART)
        .then((respond) => respond.json())
        .then(
            (myDataCart: Array<typeInforProduct>) => {
                quantityCartIcon.innerText = myDataCart.length
                load.style.display = 'none';
                const btnAddToCarts = $$('.add-to-cart')
                btnAddToCarts.forEach((btn: HTMLElement) => {
                    btn.addEventListener('click', () => {
                        let id:number = Number(btn.id)
                        if (myDataCart.length == 0) {
                            load.style.display = 'block';
                            handlePostCart(id)
                        } else {
                            let alreadyInCart: boolean = myDataCart.some((element) => {
                                return (id == element.id) 
                            });
                            if(alreadyInCart){
                                alert('Sản phẩm đã có trong giỏ hàng')
                            }else{
                                load.style.display = 'block';
                                handlePostCart(id)
                            }
                            
                        }
                    });
                });

            }
        )
}
const getData = (callback: (result: typeInforProduct[]) => void) => {
    fetch(API)
        .then((respond) => respond.json())
        .then(callback)
        .then(checkCart)
}
const renderData = (result: typeInforProduct[]) => {
    htmlHome = result.map((value) => {
        return `
        <div class="col l-2-4 m-3 c-6">
            <div class="home-product-item" id="item${value.id}">
                <a href="">
                    <div class="home-product-item__img"
                        data-product-img = "${value.image}"
                        style="background-image: url(${value.image});">
                    </div>
                    <h4 class="home-product-item__name">${value.name}</h4>
                    <div class="home-product-item__price">
                        <span class="home-product-item__price-current" data-price="${value.gia}">${Intl.NumberFormat('vn-JP', { style: 'currency', currency: 'VND' }).format(value.gia)}</span>
                    </div>
                    <div class="home-product-item__action">
                        <span class="home-product-item__like"><i
                                class="far fa-heart"></i></span>

                        <div class="home-product-item__rating">
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                        </div>
                    </div>
                    <div class="home-product-item__ogrigin">
                        <span class="home-product-item__brand">ASUS</span>
                        <span class="home-product-item__brand-from">Đài Loan</span>
                    </div>
                    <div class="home-product-item__favorite">
                        <i class="fas fa-check"></i>
                        yêu thích
                    </div>
                    <div class="home-product-item__sale-off">
                        <span class="home-product-item__sale-off-percent">0%</span>
                        <span class="home-product-item__sale-off-label">Giảm</span>
                    </div>
                </a>
                <div class="add-to-cart" id = "${value.id}">Thêm vào giỏ hàng</div>
            </div>
        </div>
        `
    })
    pushDataHome.innerHTML = htmlHome.join('')
    
    return result
}
getData(renderData)
//------POST-----
const POST = (data: typeInforProduct) => {
    let options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }
    fetch(API_CART, options)
        .then(()=>{
            getData(renderData)
        })
}