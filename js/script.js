const btnCart=document.querySelector("#icon1");
const cart=document.querySelector(".cart");
const btnClose=document.querySelector("#cart-close");
btnCart.addEventListener("click",()=>{
    cart.classList.add("cart-active");
});
btnClose.addEventListener("click",()=>{
    cart.classList.remove('cart-active');
});
document.addEventListener("DOMContentLoaded",loadFood)
function loadFood(){
    loadContent();
}
function loadContent(){
    //Remove Food item from cart
    let btnRemove=document.querySelectorAll(".fa-trash-can");
    console.log("btnremove:"+btnRemove)
    btnRemove.forEach((btn)=>{
        btn.addEventListener("click",removeItem)
    });
    //product item change Event
    let qtyElement=document.querySelectorAll(".cart-quantity");
    console.log("quality:"+qtyElement)
    qtyElement.forEach((input)=>{
        input.addEventListener("change",changeQty)
    });

        //product cart
        let cartBtns=document.querySelectorAll(".fa-cart-shopping");
        console.log(cartBtns);
        cartBtns.forEach((btn)=>{
            btn.addEventListener("click",addCart)
    });
    updateTotal();

}
//Remove item
function removeItem(){
    if(confirm("Are your sure to Remove")){
    this.parentElement.remove();
    let title=this.parentElement.querySelector(".cart-food-title").innerHTML;
    console.log(title);
    itemList=itemList.filter(el=>el.title!=title);
    this.parentElement.remove();
    loadContent();
    }
}

//change Qunatity
function changeQty(){
    if(isNaN(this.value) || this.value<1){
        this.value=1;
    }
    loadContent();
}
let itemList=[];
//add cart
function addCart(){
  //  console.log("check");
  let food=this.parentElement;
  let title=food.querySelector(".food-title").innerHTML;
  let price=food.querySelector(".food-price").innerHTML;
  let imgSrc=food.querySelector(".food-img").src;
  //console.log(title,price,imgSrc);

  let newProduct={title,price,imgSrc}
//check product already Exist in Cart
if(itemList.find((el)=>el.title==newProduct.title)){
    alert("Product Already added in Cart");
    return;
}
else{
    itemList.push(newProduct);
}


  
  let newProductElement= createCartProduct(title,price,imgSrc); 
  let element=document.createElement("div");
  element.innerHTML=newProductElement;
  let cartBasket=document.querySelector(".cart-content");
  cartBasket.append(element);
  loadContent();
}
function createCartProduct(title,price,imgSrc){
    return `<div class="cart-box">
    <img
      src="${imgSrc}"
      height="100px"
      width="100px"
      class="cart-img"
    />
    <div class="detail-box">
      <div class="cart-food-title">${title}</div>
      <div class="price-box">
        <div class="cart-price">${price}</div>
        <div class="cart-amt">${price}</div>
      </div>
      <input type="number" value="1" class="cart-quantity" />
    </div>
    <i class="fa-solid fa-trash-can" class="cart-remove"></i>
  </div>
</div>`;
}
function updateTotal()
{
    const cartItems=document.querySelectorAll(".cart-box");
    const totalValue=document.querySelector(".total-price");

    let total=0;
    cartItems.forEach(product=>{
        let priceElement=product.querySelector(".cart-price");
        let price=parseFloat(priceElement.innerHTML.replace("Rs.",""));
        let qty=product.querySelector(".cart-quanity").value;
        total+=(price*qty);
        product.querySelector(".cart-amt").innerText="Rs."+(price*qty);
    })
    totalValue.innerHTML="Rs."+total;
}

