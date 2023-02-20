// import { typeInforCart } from "./cart/cart.js";
// const $: Function = document.querySelector.bind(document);
// const $$: Function = document.querySelectorAll.bind(document);
// const pushDataHome = $('.product__home');
// const quantityCartIcon = $('.header__cart-notice');
// const load = $('.modal__overlay');
// const panigates = $$('.pagination-item')

// var htmlHome: string[];
// interface typeInforProduct {
//     id: number,
//     image: string,
//     name: string,
//     gia: number
// }
// let API: string = 'https://json-server-8822.herokuapp.com/product?_page=1&_limit=10';
// const API_CART: string = 'https://json-server-8822.herokuapp.com/cart';
// export { API_CART }


// const handlePostCart = (id: number) => {
//     const imgItem = $(`#item${id} .home-product-item__img`).getAttribute('data-product-img')
//     const nameItem = $(`#item${id} .home-product-item__name`).textContent
//     const priceItem = $(`#item${id} .home-product-item__price-current`).dataset.price
//     let data: typeInforCart = {
//         id: Number(id),
//         image: '.' + imgItem,
//         name: nameItem,
//         gia: Number(priceItem),
//         soluong: 1
//     }
//     POST(data)
// }
// const checkCart = () => {
//     fetch(API_CART)
//         .then((respond) => respond.json())
//         .then(
//             (myDataCart: Array<typeInforProduct>) => {
//                 quantityCartIcon.innerText = myDataCart.length
//                 load.style.display = 'none';
//                 const btnAddToCarts = $$('.add-to-cart')
//                 btnAddToCarts.forEach((btn: HTMLElement) => {
//                     btn.addEventListener('click', () => {
//                         let id: number = Number(btn.id)
//                         if (myDataCart.length == 0) {
//                             load.style.display = 'block';
//                             handlePostCart(id)
//                         } else {
//                             let alreadyInCart: boolean = myDataCart.some((element) => {
//                                 return (id == element.id)
//                             });
//                             if (alreadyInCart) {
//                                 alert('Sản phẩm đã có trong giỏ hàng')
//                             } else {
//                                 load.style.display = 'block';
//                                 handlePostCart(id)
//                             }

//                         }
//                     });
//                 });

//             }
//         )
// }

// //------------------------------PAGINATION------------------------------*

// const prebtns = $$('.first-page')
// const nextbtns = $$('.last-page')
// console.log(prebtns);
// console.log(nextbtns);

// const pageCurrent1 = $('.home-filter__pate-current')

// const restNextPreBtn = () => {
//     prebtns.forEach((element: HTMLElement) => {
//         element.classList.remove('disable')
//     })
//     nextbtns.forEach((element: HTMLElement) => {
//         element.classList.remove('disable')
//     })
// }
// const changePAGE = (page: number) => {
//     if (modeASC)
//         API = `https://json-server-8822.herokuapp.com/product?_sort=gia&_order=asc&_page=${page}&_limit=10`
//     else if (modeDES)
//         API = `https://json-server-8822.herokuapp.com/product?_sort=gia&_order=desc&_page=${page}&_limit=10`
//     else
//         API = `https://json-server-8822.herokuapp.com/product?_page=${page}&_limit=10`
//     console.log(API);
//     //https://json-server-8822.herokuapp.com/product?_sort=gia&order=asc
//     getData(renderData)
// }
// const addActiveBtn = (option: string, crbtn: any) => {
//     option += 'ElementSibling'
//     panigates.forEach((btnnumber: HTMLElement) => {
//         btnnumber.classList.remove('pagination-item--active')
//     });
//     crbtn[option].classList.add('pagination-item--active')
// }

// const avaiablebtnPage = (crpage: number) => {
//     if (crpage == 1) {
//         prebtns.forEach((element: HTMLElement) => {
//             element.classList.add('disable')
//         });
//     }
//     else {
//         nextbtns.forEach((element: HTMLElement) => {
//             element.classList.add('disable')
//         });
//     }
// }
// let currentpage = $('.pagination-item--active')
// if (Number(currentpage.innerText) == 1) avaiablebtnPage(Number(currentpage.innerText))

// //------------------------------PREVIOUS BUTTONS PAGE------------------------------

// prebtns.forEach((element: HTMLElement) => {
//     element.addEventListener('click', () => {

//         if (!element.classList.contains('disable')) {
//             load.style.display = 'block';
//             restNextPreBtn()
//             let crbtn = $('.pagination-item--active')
//             currentpage = crbtn.previousElementSibling.innerText
//             if (currentpage != '') {
//                 pageCurrent1.innerText = currentpage
//                 if (currentpage == 1) {
//                     avaiablebtnPage(currentpage)
//                 }
//                 addActiveBtn('previous', crbtn)
//             }
//             else {
//                 currentpage = 1
//                 avaiablebtnPage(currentpage)
//             }
//             changePAGE(currentpage)
//             console.log(currentpage);
//         }
//     })
// });
// //------------------------------NEXT BUTTONS PAGE------------------------------
// nextbtns.forEach((element: HTMLElement) => {
//     element.addEventListener('click', () => {
//         if (!element.classList.contains('disable')) {
//             load.style.display = 'block';
//             restNextPreBtn()
//             let crbtn = $('.pagination-item--active')
//             currentpage = crbtn.nextElementSibling.innerText
//             if (currentpage != '') {
//                 pageCurrent1.innerText = currentpage
//                 if (currentpage == 3) {
//                     avaiablebtnPage(currentpage)
//                 }
//                 addActiveBtn('next', crbtn)
//             }
//             else {
//                 currentpage = 3
//                 avaiablebtnPage(currentpage)
//             }
//             changePAGE(currentpage)
//             console.log(currentpage);

//         }
//     })
// });
// //------------------------------NUMBER BUTTONS PAGE------------------------------
// panigates.forEach((btnnumber: HTMLElement) => {
//     btnnumber.addEventListener('click', (e) => {
//         load.style.display = 'block';
//         currentpage = Number(btnnumber.innerText)
//         pageCurrent1.innerText = currentpage
//         restNextPreBtn()
//         panigates.forEach((btnnumber: HTMLElement) => {
//             btnnumber.classList.remove('pagination-item--active')
//         });
//         btnnumber.classList.add('pagination-item--active')
//         if (currentpage == 1 || currentpage == 3) avaiablebtnPage(currentpage)
//         changePAGE(currentpage)
//     })
// });
// //---------------------------------------------------------------------------------
// const getData = (callback: (result: typeInforProduct[]) => void) => {
//     fetch(API)
//         .then((respond) => respond.json())
//         .then(callback)
//         .then(checkCart)
// }
// const renderData = (result: typeInforProduct[]) => {
//     htmlHome = result.map((value) => {
//         return `
//         <div class="col l-2-4 m-3 c-6">
//             <div class="home-product-item" id="item${value.id}">
//                 <a href="">
//                     <div class="home-product-item__img"
//                         data-product-img = "${value.image}"
//                         style="background-image: url(${value.image});">
//                     </div>
//                     <h4 class="home-product-item__name">${value.name}</h4>
//                     <div class="home-product-item__price">
//                         <span class="home-product-item__price-current" data-price="${value.gia}">${Intl.NumberFormat('vn-JP', { style: 'currency', currency: 'VND' }).format(value.gia)}</span>
//                     </div>
//                     <div class="home-product-item__action">
//                         <span class="home-product-item__like"><i
//                                 class="far fa-heart"></i></span>

//                         <div class="home-product-item__rating">
//                             <i class="fas fa-star"></i>
//                             <i class="fas fa-star"></i>
//                             <i class="fas fa-star"></i>
//                             <i class="fas fa-star"></i>
//                             <i class="fas fa-star"></i>
//                         </div>
//                     </div>
//                     <div class="home-product-item__ogrigin">
//                         <span class="home-product-item__brand">ASUS</span>
//                         <span class="home-product-item__brand-from">Đài Loan</span>
//                     </div>
//                     <div class="home-product-item__favorite">
//                         <i class="fas fa-check"></i>
//                         yêu thích
//                     </div>
//                     <div class="home-product-item__sale-off">
//                         <span class="home-product-item__sale-off-percent">0%</span>
//                         <span class="home-product-item__sale-off-label">Giảm</span>
//                     </div>
//                 </a>
//                 <div class="add-to-cart" id = "${value.id}">Thêm vào giỏ hàng</div>
//             </div>
//         </div>
//         `
//     })
//     pushDataHome.innerHTML = htmlHome.join('')
//     console.log('done render');

//     return result
// }

// getData(renderData)
// const POST = (data: typeInforProduct) => {
//     let options = {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(data)
//     }
//     fetch(API_CART, options)
//         .then(() => {
//             getData(renderData)
//         })
// }

// //------------------------------ASC PRICE BUTTONS------------------------------

// const ascBtn = $('.sortBtn-asc')
// const desBtn = $('.sortBtn-des')
// let modeASC = false
// let modeDES = false
// const resPagination = () => {
//     let fpage = $('.fpage')
//     panigates.forEach((btnnumber: HTMLElement) => {
//         btnnumber.classList.remove('pagination-item--active')
//     });
//     fpage.classList.add('pagination-item--active')
//     pageCurrent1.innerText = 1
//     restNextPreBtn()
//     avaiablebtnPage(1)
//     getData(renderData)
// }
// ascBtn.addEventListener('click', () => {
//     load.style.display = 'block'
//     modeASC = true
//     modeDES = false
//     API = 'https://json-server-8822.herokuapp.com/product?_sort=gia&_order=asc&_page=1&_limit=10'
//     resPagination()
// })
// desBtn.addEventListener('click', () => {
//     console.log('clcik');
//     load.style.display = 'block'
//     API = 'https://json-server-8822.herokuapp.com/product?_sort=gia&_order=desc&_page=1&_limit=10'
//     modeDES = true
//     modeASC = false
//     resPagination()
// })
// //---------------------------------------------------
// let searchVL = $('.header__search-input')
// let btnSearch = $('.header__search-btn')

//         document.onkeydown = (e) => {
//             if (e.key == 'Enter' && searchVL.value) {
//                 load.style.display = 'block'
//                 API = `https://json-server-8822.herokuapp.com/product?q=${searchVL.value}`
//                 getData(renderData)
                
//             }
//         }
    
// btnSearch.onclick = () => {
//     load.style.display = 'block'
//     API = `https://json-server-8822.herokuapp.com/product?q=${searchVL.value}`
//     getData(renderData)
// }
// const catorgorys = $$('.category-item')
// catorgorys.forEach((element:HTMLElement) => {
//     element.addEventListener('click',()=>{
//         load.style.display = 'block'
//         catorgorys.forEach((elements:HTMLElement) => {
//             elements.classList.remove('category-item--active')
//         })
//         element.classList.add('category-item--active')
//         API = `https://json-server-8822.herokuapp.com/product?category=${element.id}`
//         getData(renderData)
//     })
// }); 