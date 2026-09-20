const products={
  01:{name:"VOID HOODIE",price:128,code:"NV / 001",meta:"450–480 GSM / WASHED BLACK",desc:"Oversized heavyweight hoodie with a double-layer hood, dropped shoulders, wide rib cuffs, heavy drawcords and tonal NOCTVRN branding."},
  02:{name:"AFTERIMAGE TEE",price:64,code:"NV / 002",meta:"240–260 GSM / FADED BLACK",desc:"Boxy, slightly cropped heavyweight tee with dropped shoulders, reinforced seams, vintage wash and a minimal tonal NOCTVRN mark."},
  03:{name:"UTILITY CARGO",price:148,code:"NV / 003",meta:"250–300 GSM / BLACK RIPSTOP",desc:"Relaxed straight-leg cargo with articulated knees, modular utility pockets, bartacks, matte hardware and adjustable hems."},
  04:{name:"NOCTVRN CAP",price:48,code:"NV / 004",meta:"COTTON TWILL / BLACK",desc:"Structured six-panel cap in washed black cotton twill with curved brim, tonal NOCTVRN embroidery and an adjustable metal clasp."}
};
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
document.getElementById("notifyCheckout")?.addEventListener("click",()=>{document.getElementById("formMessage").textContent="PRE-ORDER DETAILS WILL OPEN AFTER SAMPLE APPROVAL.";closeCart()});
document.getElementById("newsletterForm").addEventListener("submit",e=>{e.preventDefault();document.getElementById("formMessage").textContent="YOU'RE IN. WATCH THE DARK.";e.target.reset()});
const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting)entry.target.classList.add("visible")}),{threshold:.12});
document.querySelectorAll(".reveal").forEach(el=>observer.observe(el));
const glow=document.querySelector(".cursor-glow");
window.addEventListener("pointermove",e=>{glow.style.left=e.clientX+"px";glow.style.top=e.clientY+"px"},{passive:true});
window.addEventListener("scroll",()=>{const mark=document.querySelector(".hero-mark");if(mark&&window.scrollY<window.innerHeight)mark.style.transform="translateY("+window.scrollY*.08+"px)"},{passive:true});

const productModal=document.getElementById("productModal");
const modalPhoto=document.getElementById("modalPhoto");
const modalCode=document.getElementById("modalCode");
const modalTitle=document.getElementById("modalTitle");
const modalPrice=document.getElementById("modalPrice");
const modalDescription=document.getElementById("modalDescription");
const modalMeta=document.getElementById("modalMeta");
const modalReserve=document.getElementById("modalReserve");
const productModalClose=document.getElementById("productModalClose");

function openProduct(productId){
  const p=products[productId]; if(!p) return;
  modalPhoto.className="product-modal-photo photo image-"+String(productId).padStart(2,"0");
  modalCode.textContent=p.code; modalTitle.textContent=p.name; modalPrice.textContent="$"+p.price;
  modalDescription.textContent=p.desc; modalMeta.textContent=p.meta;
  modalReserve.onclick=()=>{cart.push(p);renderCart();closeProduct();openCart()};
  productModal.classList.add("open"); productModal.setAttribute("aria-hidden","false");
  document.body.style.overflow="hidden";
}
function closeProduct(){
  productModal.classList.remove("open"); productModal.setAttribute("aria-hidden","true");
  if(!cartEl.classList.contains("open")) document.body.style.overflow="";
}
document.querySelectorAll(".product-image.photo").forEach(el=>{
  const open=()=>openProduct(el.dataset.product);
  el.addEventListener("click",e=>{if(!e.target.closest(".quick-add")) open()});
  el.addEventListener("keydown",e=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();open()}});
});
productModalClose.addEventListener("click",closeProduct);
productModal.addEventListener("click",e=>{if(e.target===productModal)closeProduct()});
document.addEventListener("keydown",e=>{if(e.key==="Escape" && productModal.classList.contains("open")) closeProduct()});
