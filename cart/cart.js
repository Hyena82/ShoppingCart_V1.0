import { API_CART } from "../main.js";
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const quantityCartIcon = $('.header__cart-notice');
const pushData = $('.cart__menu');
const load = $('.modal__overlay');
const displayEmptyCart = $('.emptyProduct');
const payList = $('.pay__plist');
const payBtn = $('.menu-pay');
const payinvoice = $('.invoice-pay');
const modalPay = $('.modal__overlay--invoice');
const btnX = $('.btnX');
var html;
var htmlList;
function PUTDATA(data, id) {
    let options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    };
    fetch(API_CART + '/' + id, options)
        .then(() => { load.style.display = 'none'; });
}
btnX.onclick = () => {
    modalPay.style.display = 'none';
};
var totalPay = (myDataCart) => {
    let total = myDataCart.reduce((total, product) => {
        return total += (product.gia * product.soluong);
    }, 0);
    $$('.Total')[0].textContent = Intl.NumberFormat('vn-JP', { style: 'currency', currency: 'VND' }).format(total);
    $$('.Total')[1].textContent = Intl.NumberFormat('vn-JP', { style: 'currency', currency: 'VND' }).format(total);
};
function plusAndMinus(myDataCart) {
    let plus = $$('.plus');
    plus.forEach((btn) => {
        btn.addEventListener('click', () => {
            myDataCart.forEach(element => {
                var _a, _b;
                if (Number((_b = (_a = btn.parentElement) === null || _a === void 0 ? void 0 : _a.parentElement) === null || _b === void 0 ? void 0 : _b.dataset.id) == element.id) {
                    ++element.soluong;
                }
            });
            let total = myDataCart.reduce((total, product) => {
                return total += (product.gia * product.soluong);
            }, 0);
            totalPay(myDataCart);
        });
    });
    let minus = $$('.minus');
    minus.forEach((btn) => {
        btn.addEventListener('click', () => {
            myDataCart.forEach(element => {
                var _a, _b;
                if (Number((_b = (_a = btn.parentElement) === null || _a === void 0 ? void 0 : _a.parentElement) === null || _b === void 0 ? void 0 : _b.dataset.id) == element.id) {
                    if (element.soluong > 1) {
                        --element.soluong;
                    }
                }
            });
            let total = myDataCart.reduce((total, product) => {
                return total += (product.gia * product.soluong);
            }, 0);
            totalPay(myDataCart);
        });
    });
}
function Paybtn(myDataCart) {
    payBtn.addEventListener('click', () => {
        load.style.display = 'block';
        console.log(myDataCart);
        htmlList = myDataCart.map((value) => {
            return `
            <tr class="pay__row">
                <td></td>
                <td class="nameproduct__row">${value.name}</td>
                <td>${Intl.NumberFormat('vn-JP', { style: 'currency', currency: 'VND' }).format(value.gia)}</td>
                <td>${value.soluong}</td>
                <td>${Intl.NumberFormat('vn-JP', { style: 'currency', currency: 'VND' }).format(value.gia * value.soluong)}</td>
            </tr>                                     
            `;
        });
        payList.innerHTML = htmlList.join('');
        modalPay.style.display = 'flex';
        payinvoice.addEventListener('click', () => {
            load.style.display = 'block';
            myDataCart.forEach((element) => {
                let data = {
                    id: element.id,
                    image: element.image,
                    name: element.name,
                    gia: element.gia,
                    soluong: element.soluong
                };
                PUTDATA(data, element.id);
            });
        });
        modalPay.onclick = (e) => {
            if (e.target.className == "modal__overlay--invoice")
                modalPay.style.display = 'none';
        };
        load.style.display = 'none';
    });
}
function getData(callback) {
    fetch(API_CART)
        .then((respond) => respond.json())
        .then(callback)
        .then((myDataCart) => {
        console.log(myDataCart);
        quantityCartIcon.innerText = myDataCart.length;
        plusAndMinus(myDataCart);
        totalPay(myDataCart);
        Paybtn(myDataCart);
    })
        .then(() => {
        let deletebtns = $$('.delete-btn-cart');
        deletebtns.forEach((btn) => {
            btn.addEventListener('click', () => {
                var _a;
                load.style.display = 'block';
                deleteData(Number((_a = btn.parentElement) === null || _a === void 0 ? void 0 : _a.dataset.id));
            });
        });
    });
}
function renderData(result) {
    if (result.length == 0) {
        displayEmptyCart.style.display = 'block';
    }
    html = result.map((value) => {
        return `
        <div class="cart__menu-item"  data-id="${value === null || value === void 0 ? void 0 : value.id}">
            <img class="cart__menu-img" src="${value.image}" alt="">
            <span class="cart__menu-name">${value.name}</span>
            <div class="counter">
                <span class="down minus" onClick='decreaseCount(event, this)'><i class="fas fa-minus"></i></span>
                <input type="text" value="${value.soluong}">
                <span class="up plus"  onClick='increaseCount(event, this)'><i class="fas fa-plus"></i></span>
            </div>
            <div class="price-product">${Intl.NumberFormat('vn-JP', { style: 'currency', currency: 'VND' }).format(value.gia)}</div>
            <span class="delete-btn-cart"">Xóa</span>
        </div>                                      
        `;
    });
    pushData.innerHTML = html.join('');
    load.style.display = 'none';
    return result;
}
getData(renderData);
//-------------------xoa---------------
function deleteData(id) {
    let options = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
    };
    fetch(API_CART + '/' + id, options)
        .then(() => {
        getData(renderData); //the same to do to fix Async
    });
}
