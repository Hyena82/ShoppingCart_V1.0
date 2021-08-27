import {API_CART } from "../main.js"
const $: Function = document.querySelector.bind(document);
const $$: Function = document.querySelectorAll.bind(document);
const quantityCartIcon = $('.header__cart-notice');
const pushData = $('.cart__menu');
const load = $('.modal__overlay');
const displayEmptyCart = $('.emptyProduct');
const payList = $('.pay__plist');
const payBtn = $('.menu-pay');
const payinvoice = $('.invoice-pay');
const modalPay = $('.modal__overlay--invoice');
const btnX = $('.btnX');
var html: string[];
var htmlList: string[] | number[];
interface typeInforCart {
    id: number,
    image: string,
    name: string,
    soluong: number,
    gia: number
}
export {typeInforCart}
function PUTDATA(data: typeInforCart, id: number) {
    let options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }
    fetch(API_CART + '/' + id, options)
    .then(()=>{load.style.display = 'none';})
}
btnX.onclick = () => {
    modalPay.style.display = 'none'
}
var totalPay = (myDataCart: Array<typeInforCart>) => {
    let total = myDataCart.reduce((total, product) => {
        return total += (product.gia * product.soluong)
    }, 0)
    $$('.Total')[0].textContent = Intl.NumberFormat('vn-JP', { style: 'currency', currency: 'VND' }).format(total)
    $$('.Total')[1].textContent = Intl.NumberFormat('vn-JP', { style: 'currency', currency: 'VND' }).format(total)
}
function plusAndMinus(myDataCart: Array<typeInforCart>) {
    let plus = $$('.plus')
    plus.forEach((btn: HTMLElement) => {
        btn.addEventListener('click', () => {
            myDataCart.forEach(element => {
                if (Number(btn.parentElement?.parentElement?.dataset.id) == element.id) {
                    ++element.soluong
                }
            });
            let total = myDataCart.reduce((total, product) => {
                return total += (product.gia * product.soluong)
            }, 0)
            totalPay(myDataCart)
        })
    })
    let minus = $$('.minus')
    minus.forEach((btn: HTMLElement) => {
        btn.addEventListener('click', () => {
            myDataCart.forEach(element => {
                if (Number(btn.parentElement?.parentElement?.dataset.id) == element.id) {
                    if (element.soluong > 1) {
                        --element.soluong
                    }
                }
            });
            let total = myDataCart.reduce((total, product) => {
                return total += (product.gia * product.soluong)
            }, 0)
            totalPay(myDataCart)
        })
    })
}
function Paybtn(myDataCart: Array<typeInforCart>) {
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
            `
        })
        payList.innerHTML = htmlList.join('')
        modalPay.style.display = 'flex'
        payinvoice.addEventListener('click', () => {
            load.style.display = 'block';
            myDataCart.forEach((element) => {
                let data = {
                    id: element.id,
                    image: element.image,
                    name: element.name,
                    gia: element.gia,
                    soluong: element.soluong
                }
                PUTDATA(data, element.id)
            })
            
        })
        modalPay.onclick = (e: Event & { target: HTMLInputElement }) => {
            if (e.target.className == "modal__overlay--invoice")
                modalPay.style.display = 'none'
        }
        load.style.display = 'none';
        
    })
}
function getData(callback: (a:Array<typeInforCart>) => Array<typeInforCart>) {
    fetch(API_CART)
        .then((respond) => respond.json())
        .then(callback)
        .then((myDataCart: Array<typeInforCart>) => {
            console.log(myDataCart);

            quantityCartIcon.innerText = myDataCart.length
            plusAndMinus(myDataCart)
            totalPay(myDataCart)
            Paybtn(myDataCart)
        })
        .then(() => {
            let deletebtns = $$('.delete-btn-cart')
            deletebtns.forEach((btn: HTMLElement) => {
                btn.addEventListener('click', () => {
                    load.style.display = 'block';
                    deleteData(Number(btn.parentElement?.dataset.id))
                })
            })
        })
}
function renderData(result: Array<typeInforCart>) {
    if (result.length == 0) {
        displayEmptyCart.style.display = 'block'
    }
    html = result.map((value: typeInforCart): string => {
        return `
        <div class="cart__menu-item"  data-id="${value?.id}">
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
        `
    })
    pushData.innerHTML = html.join('')
    load.style.display = 'none';
    return result
}
getData(renderData)

//-------------------xoa---------------
function deleteData(id : number) {

    let options = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
    }
    fetch(API_CART + '/' + id, options)
        .then(() => {
            getData(renderData) //the same to do to fix Async
        })
}


