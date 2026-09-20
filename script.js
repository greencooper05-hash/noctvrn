const products={01:{name:"VOID HOODIE",price:128},02:{name:"AFTERIMAGE TEE",price:64},03:{name:"UTILITY CARGO",price:148},04:{name:"NOCTVRN CAP",price:48}};
let cart=[];
const cartEl=document.getElementById("cart"),overlay=document.getElementById("overlay"),bagCount=document.getElementById("bagCount"),cartCount=document.getElementById("cartCount"),cartItems=document.getElementById("cartItems"),cartTotal=document.getElementById("cartTotal");
function openCart(){cartEl.classList.add("open");overlay.classList.add("open");document.body.style.overflow="hidden"}
function closeCart(){cartEl.classList.remove("open");overlay.classList.remove("open");document.body.style.overflow=""}
function renderCart(){
 const count=cart.length;bagCount.textContent=count;cartCount.textContent=count;
 if(!count){cartItems.innerHTML='<p class="empty">Your bag is empty.</p>';cartTotal.textContent="$0";return}
 cartItems.innerHTML=cart.map((item,i)=>'<div class="cart-item"><span>'+item.name+'</span><span>$'+item.price+' <button class="remove" aria-label="Remove item" data-index="'+i+'">×</button></span></div>').join("");
 cartTotal.textContent="$"+cart.reduce((sum,item)=>sum+item.price,0);
 cartItems.querySelectorAll(".remove").forEach(btn=>btn.addEventListener("click",()=>{cart.splice(Number(btn.dataset.index),1);renderCart()}));
}
document.querySelectorAll(".quick-add").forEach(button=>button.addEventListener("click",()=>{cart.push(products[button.dataset.product]);renderCart();openCart()}));
document.getElementById("bagBtn").addEventListener("click",openCart);
document.getElementById("cartClose").addEventListener("click",closeCart);
overlay.addEventListener("click",closeCart);
document.addEventListener("keydown",e=>{if(e.key==="Escape")closeCart()});
document.getElementById("newsletterForm").addEventListener("submit",e=>{e.preventDefault();document.getElementById("formMessage").textContent="YOU'RE IN. WATCH THE DARK.";e.target.reset()});
const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting)entry.target.classList.add("visible")}),{threshold:.12});
document.querySelectorAll(".reveal").forEach(el=>observer.observe(el));
const glow=document.querySelector(".cursor-glow");
window.addEventListener("pointermove",e=>{glow.style.left=e.clientX+"px";glow.style.top=e.clientY+"px"},{passive:true});
window.addEventListener("scroll",()=>{const mark=document.querySelector(".hero-mark");if(mark&&window.scrollY<window.innerHeight)mark.style.transform="translateY("+window.scrollY*.08+"px)"},{passive:true});
