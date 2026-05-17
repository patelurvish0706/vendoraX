const ShopkeeperOptionsBtns = document.getElementById("ShopkeeperOptionsBtns");
const ShopkeeperProcessArea = document.getElementById("ShopkeeperProcessArea");
const ProductPage = document.getElementById("ProductPage");


    const params = new URLSearchParams(location.search);

    if(params.get("shop")){
      openVendorShop(params.get("shop"));
      console.log(params.get("shop"))
    }else{
      console.log(params.get("shop"))
      defaultLoad();
    }


function closeOptMenus(more, acc) {
  deactiveAll();
  AccountServicesBtns.style.display = "none";
  MoreServicesBtns.style.display = "none";

  isMoreOpen = more;
  isAccOpen = acc;
}

function defaultLoad___() {
  // Scroll enable

  // ShopkeeperOptionsBtns.addEventListener("mouseenter", () => {
  //   const scrollHandler = (e) => {
  //     // scroll 100px horizontally on wheel
  //     if (e.deltaY > 0) {
  //       ShopkeeperOptionsBtns.scrollLeft += 100;
  //     } else {
  //       ShopkeeperOptionsBtns.scrollLeft -= 100;
  //     }
  //   };

  //   ShopkeeperOptionsBtns.addEventListener("wheel", scrollHandler);

  //   // remove when mouse leaves (important)
  //   ShopkeeperOptionsBtns.addEventListener(
  //     "mouseleave",
  //     () => {
  //       ShopkeeperOptionsBtns.removeEventListener("wheel", scrollHandler);
  //     },
  //     { once: true }
  //   );
  // });

  // Button Container
  ShopkeeperOptionsBtns.innerHTML = `           
        <div class="optBtn" style="color:#fff;background-color: #4c6381;"><span class="material-symbols-outlined">shoppingmode</span>All Products</div>
        <div class="optBtn"><span class="material-symbols-outlined">laptop_mac</span>Laptops</div>
        <div class="optBtn"><span class="material-symbols-outlined">mobile</span>Mobiles</div>
        <div class="optBtn"><span class="material-symbols-outlined">aod_watch</span>Smart Watches</div>
        <div class="optBtn"><span class="material-symbols-outlined">earbuds_2</span>Headphones</div>
        <div class="optBtn"><span class="material-symbols-outlined">stadia_controller</span>Controllers</div>
        <div class="optBtn"><span class="material-symbols-outlined">cable</span>Cables</div>
        <div class="optBtn"><span class="material-symbols-outlined">charger</span>Chargers</div>
        <div class="optBtn"><span class="material-symbols-outlined">electric_bolt</span>Batteries</div>
        <div class="optBtn"><span class="material-symbols-outlined">hard_drive_2</span>Hard Drives</div>
        <div class="optBtn"><span class="material-symbols-outlined">memory</span>Processors</div>
        <div class="optBtn"><span class="material-symbols-outlined">memory_alt</span>RAM</div>
        <div class="optBtn"><span class="material-symbols-outlined">devices_other</span>Accessories</div>

        <div class="optBtn" style="background-color: transparent;box-shadow: none;"></div>
        <div class="optBtn" id="endBtnCover"></div>
        `;

  // Load all Products on Page
  async function loadProducts() {
    const res = await fetch("./js/data.json"); // load JSON file
    const data = await res.json();

    const productCards = document.getElementById("productCards");

    productCards.style.padding = "15px 0px";

    // clear existing
    productCards.innerHTML = "";

    // loop categories
    data.products.forEach((category) => {
      category.items.forEach((p) => {
        const card = document.createElement("div");
        card.className = "product";

        card.innerHTML = `
            <img id="productImage" src="${p.productImage}" alt="">
            <div style="display:flex;flex-direction:column;">
            <span id="productName"><b>${p.productName}</b></span>
            <span id="productCompany"><i>${p.productCompany}</i></span>
            <span id="productDescription">${p.productDescription}</span>
            <span id="productSeller"><span class="material-symbols-outlined" style="font-size:1rem;padding:5px 5px 5px 0;">store</span>${p.productSeller}</span>
            <span id="productWarranty">${p.productWarranty} <b style="font-size:0.55rem;"> Warranty</b></span>
            <span id="productPrice">₹${p.productPrice}</span>
            </div>
            <div >
                <div class="optBtn" style="margin-bottom:5px;border: 1px solid #4c6381;">Add to Cart</div>
                <div class="optBtn" style="border: 1px solid #4c6381;">Buy Now</div>
            </div>
        `;

        productCards.appendChild(card);
      });
    });
  }
  loadProducts();

  ProductPage.innerHTML = `
            <fieldset>
                <div id="ProductOptionsBtns" style="width:100%;justify-content: flex-end ;align-items: center;">        
                  <div id="NavlinkContainer" style="display: flex;justify-content: flex-end;width:100%;">
                      <input type="search" style="font-size: 1rem;margin-right: 5px;" name="search" id="navSearch" class="deactive" placeholder="Search">
                  </div>
                </div>

                </div>

                <div id="productCards" style="padding: 5px 0;">
                </div>
            </fieldset>
        `;
}

function openProductPopup(p) {
  console.log(p);

  const div = document.createElement("div");
  div.style =
    "position:fixed;top:0;left:0;width:100%;height:100%;background:#0008;display:flex;justify-content:center;align-items:center;z-index:999;";

  div.innerHTML = `
    <div style="color:#4c6381;background:#fff;padding:20px;border-radius:8px;width:400px;font-family: 'Montserrat Alternates', sans-serif;">
      
      <img src="./script/${
        p.image || "noimage.png"
      }" style="width:100%;height:300px;object-fit:cover;">
      
      <div style="width:max-content;padding:3px 5px;border-radius:5px;background-color:#4c6381;color:white;font-size:0.8rem;margin:10px 0 0 0 ;">${
        p.category
      }</div>
      
      <h3 style="margin:5px 0;">${p.title}</h3>
      <p style="margin:0;">${p.description || ""}</p>
      <p style="margin:7px 0 0 0;font-size:0.8rem;font-weight:700;">Warranty: ${
        p.warranty || ""
      } Months</p>
      <span id="productSeller" style="font-size:0.9rem;display: flex;align-items: center;"><span class="material-symbols-outlined" style="font-size:1rem;padding:5px 5px 5px 0;">store</span>${
        p.shop_name
      }</span>
      
      <p style="font-size:1.4rem;margin:5px 0;"><b>₹ ${p.price}</b></p>

      <label>Quantity: </label>
      <input type="button" value="+" onclick="qty.value<qty.max && qty.value++">
      <input type="number" id="qty" value="1" min="1" max="${p.stock}">
      <input type="button" value="-" onclick="qty.value>qty.min && qty.value--">
      
      <br>

      <button style="margin:4px 3px 0 0;" id="cartBtn">Add to Cart</button>
      <button style="margin:0 3px 0 0;" id="buyBtn">Buy Now</button>
      <button style="margin:0 3px 0 0;" onclick="this.closest('div').parentElement.remove()">Close</button>

    </div>
  `;

  document.body.appendChild(div);

  // 👉 Add to cart
  div.querySelector("#cartBtn").onclick = async () => {
    const qty = document.getElementById("qty").value;

    // console.log("STEP 2: Add to Cart Click", qty);

    sendOrder(p, qty, "cart");
  };

  // 👉 Buy now
  div.querySelector("#buyBtn").onclick = () => {
    const qty = document.getElementById("qty").value;

    // console.log("STEP 2: Buy Click", qty);

    const confirmBox = confirm("Proceed to place order?");

    // console.log("STEP 3: Confirm result", confirmBox);

    if (confirmBox) {
      sendOrder(p, qty, "buy");
    }
  };
}

async function sendOrder(p, qty, type) {
  // console.log("STEP 4: Sending Data", { id: p.id || p.product_id, qty, type });

  const data = new FormData();
  data.append("product_id", p.id || p.product_id);
  data.append("qty", qty);
  data.append("type", type);

  const res = await fetch("./script/order.php", {
    method: "POST",
    body: data,
  });

  const text = await res.text();

  // console.log("STEP 5: Server Response", text);

  alert(text);
}

function defaultLoad() {
  const token = getCookie("customer_token");

  // if (!token) {
  //   Login();
  //   return;
  // }

  ShopkeeperOptionsBtns.addEventListener("mouseenter", () => {
    const scrollHandler = (e) => {
      // scroll 100px horizontally on wheel
      if (e.deltaY > 0) {
        ShopkeeperOptionsBtns.scrollLeft += 100;
      } else {
        ShopkeeperOptionsBtns.scrollLeft -= 100;
      }
    };

    ShopkeeperOptionsBtns.addEventListener("wheel", scrollHandler);

    // remove when mouse leaves (important)
    ShopkeeperOptionsBtns.addEventListener(
      "mouseleave",
      () => {
        ShopkeeperOptionsBtns.removeEventListener("wheel", scrollHandler);
      },
      { once: true }
    );
  });

  ProductPage.innerHTML = `
            <fieldset>
                <div id="ProductOptionsBtns" style="width:100%;justify-content: flex-end ;align-items: center;">
        
                  <div id="NavlinkContainer" style="display: flex;justify-content: flex-end;width:100%;">
                    <input type="search" style="font-size: 1rem;margin-right: 5px;" name="search" id="navSearch" class="deactive" placeholder="Search">
                        
                  </div>
                </div>


                <div id="productCards" style="padding: 5px 0;">
                </div>
            </fieldset>
        `;

  ShopkeeperOptionsBtns.innerHTML = `
    
    <div class="optBtn hover" data-cat="All" style="color:#fff;background-color: #4c6381;"><span class="material-symbols-outlined">shoppingmode</span>All Products</div>
        <div class="optBtn" data-cat="Laptop"><span class="material-symbols-outlined">laptop_mac</span>Laptops</div>
        <div class="optBtn" data-cat="Mobile"><span class="material-symbols-outlined">mobile</span>Mobiles</div>
        <div class="optBtn" data-cat="Smart Watches"><span class="material-symbols-outlined">aod_watch</span>Smart Watches</div>
        <div class="optBtn" data-cat="HeadPhone"><span class="material-symbols-outlined">earbuds_2</span>Headphones</div>
        <div class="optBtn" data-cat="Controllers"><span class="material-symbols-outlined">stadia_controller</span>Controllers</div>
        <div class="optBtn" data-cat="Cables"><span class="material-symbols-outlined">cable</span>Cables</div>
        <div class="optBtn" data-cat="Chargers"><span class="material-symbols-outlined">charger</span>Chargers</div>
        <div class="optBtn" data-cat="Batteries"><span class="material-symbols-outlined">electric_bolt</span>Batteries</div>
        <div class="optBtn" data-cat="Hard Drives"><span class="material-symbols-outlined">hard_drive_2</span>Hard Drives</div>
        <div class="optBtn" data-cat="Processors"><span class="material-symbols-outlined">memory</span>Processors</div>
        <div class="optBtn" data-cat="RAM"><span class="material-symbols-outlined">memory_alt</span>RAM</div>
        <div class="optBtn" data-cat="Accessories"><span class="material-symbols-outlined">devices_other</span>Accessories</div>

        <div class="optBtn" style="background-color: transparent;box-shadow: none;"></div>
        <div class="optBtn" id="endBtnCover"></div>
    
    `;

  let allProducts = [];

  async function loadProducts() {
    const res = await fetch("./script/get_all_products.php");
    allProducts = await res.json();
    renderProducts(allProducts);
    console.log(allProducts);
  }

  function renderProducts(list) {
    const container = document.getElementById("productCards");
    productCards.style.padding = "15px 0px";

    container.innerHTML = "";

    if (!list.length) {
      container.innerHTML = "<p style='width:stretch;text-align: center;'>No Products</p>";
      return;
    }

    list.forEach((p) => {
      const card = document.createElement("div");
      card.className = "product";
      card.style.justifyContent = "unset";

      card.innerHTML = `
        <img id="productImage" style="padding: 0;" src="./script/${p.image || "noimage.png"}">
        <span style="position:absolute;font-size:0.7rem;background-color:white;padding:5px 8px;border-radius:5px;margin:5px;box-shadow:0px 0px 5px #e1e1e1;">${
          p.category
        }</span>

        <div style="display:flex;flex-direction:column;">
          <span id="productName" style="margin-bottom:5px;"><b>${
            p.title
          }</b></span>
          <span id="productDescription" style="font-size:0.8rem;height: 60px;overflow-y: scroll;">${
            p.description || ""
          }</span>
        </div>
        
        <div style="display:flex;flex-direction:column;margin-top:auto;">
          <span id="productSeller"><span class="material-symbols-outlined" style="font-size:1rem;padding:5px 5px 5px 0;">store</span>${
            p.shop_name
          }</span>
          <span id="productWarranty" style="font-size:0.85rem;font-weight:700;">${
            p.warranty
          } <b style="font-size:0.65rem;font-weight:400;"> Warranty</b></span>
          <span id="productPrice">₹${p.price}</span>
        </div>

        <div style="margin-top:10px;">
          <button style="margin:0;" onclick='openProductPopup(${JSON.stringify(
            p
          )})'>View Product</button>
        </div>
      `;

      container.appendChild(card);
    });
  }

  // 🔍 SEARCH FILTER
  document.addEventListener("input", (e) => {
    if (e.target.id !== "navSearch") return;

    const val = e.target.value.toLowerCase();

    const filtered = allProducts.filter(
      (p) =>
        p.title.toLowerCase().includes(val) ||
        p.category.toLowerCase().includes(val) ||
        (p.description || "").toLowerCase().includes(val)
    );

    renderProducts(filtered);
  });

  // 📦 CATEGORY FILTER
  document.querySelectorAll("#ShopkeeperOptionsBtns .optBtn").forEach((btn) => {
    btn.addEventListener("click", () => {
      // UI active
      document
        .querySelectorAll(".optBtn")
        .forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      const cat = btn.dataset.cat;

      if (cat === "All") {
        renderProducts(allProducts);
      } else {
        const filtered = allProducts.filter((p) => p.category === cat);
        renderProducts(filtered);
      }
    });
  });

  loadProducts();

  if (!token) {

    // const params = new URLSearchParams(location.search);

    // if(params.get("shop")){
    //   openVendorShop(params.get("shop"));
    // }else{
    //   defaultLoad();
    // }

    Login();
    return;
  }
}

// defaultLoad();
// defaultLoad___();

async function manageCustomerInfo() {
  ShopkeeperOptionsBtns.innerHTML = `
    <div class="optBtn" onclick="defaultLoad()"><span class="material-symbols-outlined" style="font-size:1rem;">arrow_back_ios</span>Back</div>
    <div class="optBtn hover">My Account</div>
  `;

  // ProductPage.innerHTML = `...your form HTML...`;
  ProductPage.innerHTML = `
        <fieldset style="margin:10px;background-color: #fff; border-radius:5px;box-shadow: 0px 7px 10px #0000000f;">
            <form id="AddingTaskForm" style="padding: 0;width: 95%;">

                <p id="addFormErr" style="color:red;margin-bottom:10px;"></p>

                <label for="title">Customer Name</label>
                <input type="text" id="title" name="title" placeholder="Alison Burgers" />

                <label for="mobile">Mobile no</label>
                <input type="number" id="mobile" name="stock" placeholder="998765432" />

                <label for="email">Email</label>
                <input type="email" id="email" name="email" placeholder="alisonb@gmail.com" />

                <label for="pincode" style="visibility:hidden;">Search Area using Pincode</label>
                <input type="text" id="pincode" name="pincode" placeholder="🔍 Enter Pincode here to find your place" />

                <div id="map" style="height:400px;"></div>

                <label for="addresss" style="margin-top:15px;">Address (Auto Generated): Please add Accurate Address 🗺️</label>
                <textarea type="text" id="addresss" name="addresss" rows="5" style="resize: vertical;" placeholder="1, Alpha city, Near RiverSide Hotel, Ahmedabad , 300026"></textarea>
                
                <input type="hidden" id="lat" name="lat">
                <input type="hidden" id="lng" name="lng">

                <div>
                    <button type="submit">Save</button>
                    <button type="reset">Cancel</button>
                </div>

                <button  class="hover" onclick="logout_customer()">Logout</button>
            </form>
        </fieldset>
        `;

  closeOptMenus(false, false);

  const err = document.getElementById("addFormErr");

  // load data
  const res = await fetch("./script/get_customer.php");
  const result = await res.json();

  if (result.status !== "valid") {
    showLogin();
    return;
  }

  const d = result.data;

  const title = document.getElementById("title");
  const mobile = document.getElementById("mobile");
  const email = document.getElementById("email");
  const pincode = document.getElementById("pincode");
  const address = document.getElementById("addresss");
  let latVal = d.latitude || 23.0225;
  let lngVal = d.longitude || 72.5714;

  // fill
  title.value = d.name || "";
  mobile.value = d.mobile || "";
  email.value = d.email || "";

  document.getElementById("map").innerHTML = "";
  
  
  let map = L.map("map").setView([latVal, lngVal], 15);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(map);
  
  console.log(map);
  
  let marker;


  document.getElementById("lat").value = latVal;
  document.getElementById("lng").value = lngVal;

  // if already saved → show marker
  if (d.latitude && d.longitude) {
      marker = L.marker([latVal, lngVal]).addTo(map);
  }

  // fix render if container dynamic
  setTimeout(() => map.invalidateSize(), 200);

  // split pincode from address
  if (d.address) {
    const match = d.address.match(/(.*) - (\d{6})$/);
    if (match) {
      address.value = match[1];
      pincode.value = match[2];
    } else {
      address.value = d.address;
    }
  }

  map.on("click", async function (e) {
    const { lat, lng } = e.latlng;

    if (marker) map.removeLayer(marker);
    marker = L.marker([lat, lng]).addTo(map);

    document.getElementById("lat").value = lat;
    document.getElementById("lng").value = lng;

    const res = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
    );
    const data = await res.json();

    address.value = data.display_name;
  });

  // pincode → map
  let lastPin = "";

  pincode.addEventListener("input", async () => {FindMapMark()});

  async function FindMapMark() {
    
    if (pincode.value.length !== 6 || pincode.value === lastPin) return;
    lastPin = pincode.value;

    const r = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${pincode.value}`
    );
    const data = await r.json();

    if (data.length) {
      setTimeout(() => {
        map.setView([data[0].lat, data[0].lon], 15);
        
      }, 100);
      if (marker) map.removeLayer(marker);
      marker = L.marker([data[0].lat, data[0].lon]).addTo(map);
    }
  }

  FindMapMark()

  // submit update
  document
    .getElementById("AddingTaskForm")
    .addEventListener("submit", async (e) => {
      e.preventDefault();

      const formData = new FormData();
      formData.append("title", title.value);
      formData.append("mobile", mobile.value);
      formData.append("email", email.value);
      formData.append("pincode", pincode.value);
      formData.append("addresss", address.value);
      formData.append("lat", document.getElementById("lat").value);
      formData.append("lng", document.getElementById("lng").value);

      const r = await fetch("./script/update_customer.php", {
        method: "POST",
        body: formData,
      });

      const msg = await r.text();

      if (msg === "success") {
        err.innerHTML = "<span style='color:green'>Updated</span>";
      } else {
        err.innerText = msg;
      }
    });
}

function manageCustomerInfo_____() {
  ShopkeeperOptionsBtns.innerHTML = `
    <div class="optBtn" onclick="defaultLoad()"><span class="material-symbols-outlined" style="font-size:1rem;">arrow_back_ios</span>Back</div>
    <div class="optBtn hover">My Account</div>
    `;

  ProductPage.innerHTML = ``;

  ProductPage.innerHTML = `
        <fieldset style="margin:10px;background-color: #fff; border-radius:5px;box-shadow: 0px 7px 10px #0000000f;">
            <form id="AddingTaskForm" style="padding: 0;width: 95%;">

                <p id="addFormErr" style="color:red;margin-bottom:10px;"></p>

                <label for="title">Customer Name</label>
                <input type="text" id="title" name="title" placeholder="Alison Burgers" />

                <label for="mobile">Mobile no</label>
                <input type="number" id="mobile" name="stock" placeholder="998765432" />

                <label for="email">Email</label>
                <input type="email" id="email" name="email" placeholder="alisonb@gmail.com" />

                <label for="pincode">Pincode</label>
                <input type="number" id="pincode" name="pincode" placeholder="380026" />

                <div id="map" style="height:400px;"></div>

                <label for="addresss">Address</label>
                <textarea type="text" id="addresss" name="addresss" rows="5" style="resize: vertical;" placeholder="1, Alpha city, Near RiverSide Hotel, Ahmedabad , 300026"></textarea>
                                
                <div>
                    <button type="submit">Save</button>
                    <button type="reset">Cancel</button>
                </div>
            </form>
        </fieldset>
        `;

  closeOptMenus(false, false);
}
// manageCustomerInfo()

// Manage Cart

async function removeCart(cart_id) {

  console.log("removeCart() called");
  console.log("Cart ID:", cart_id);

  try {

    const formData = new FormData();
    formData.append("cart_id", cart_id);

    console.log("Sending Request To remove_cart.php");

    const res = await fetch("./script/delete_cart.php", {
      method: "POST",
      body: formData
    });

    console.log("Response Received:", res);

    const result = await res.text();

    console.log("Server Response:", result);

    if (result.trim() === "removed") {

      console.log("Cart Item Removed Successfully");

      alert("Item Removed From Cart");

      // reload cart
      manageCart()

    } else {

      console.log("Failed To Remove Cart Item");

      alert(result);
    }

  } catch (error) {

    console.log("Error While Removing Cart Item");
    console.error(error);

    alert("Something went wrong");
  }
}

async function manageCart() {

  ShopkeeperOptionsBtns.innerHTML = `
    <div class="optBtn" onclick="defaultLoad()">Back</div>
    <div class="optBtn hover">My Cart</div>
  `;

  ProductPage.innerHTML = `
    <fieldset>
      <div id="ListingOrderItems"></div>
    </fieldset>
  `;

  closeOptMenus(false, false);

  const container = document.getElementById("ListingOrderItems");

  const res = await fetch("./script/get_cart.php");
  const result = await res.json();

  console.log("CART:", result);

  if (result.status !== "ok") {
    showLogin();
    return;
  }

  if (!result.data.length) {
    container.innerHTML = "<p style='width:stretch;text-align:center;'>Cart empty</p>";
    return;
  }

  result.data.forEach(p => {

    const div = document.createElement("div");

    div.innerHTML = `
    <div id="orderdetailContainer">

      <div id="editImage"
        style="position: absolute;margin: 5px;background-color: #dfebff; border-radius: 5px;padding: 5px 10px;font-size: 0.6rem;">
        ${p.category}
      </div>

      <div id="productImage" style="padding:0;">
        <img src="./script/${p.image || 'noimage.png'}" height="200px">
      </div>

      <div id="ProductEditInfo">

        <form>
          <label style="font-size: 1rem;"><b>${p.title}</b></label>
          <label style="font-size: 0.8rem;"><i>${p.brand || ""}</i></label>

          <label style="font-size: 0.8rem;font-weight: 400;">
            ${p.description || ""}
          </label>

          <label style="font-size: 0.7rem;">
            <span>Warranty</span> <b>${p.warranty} months</b>
          </label>

          <label style="font-size: 1.2rem;"><b>₹ ${p.price}</b></label>

          <div style="margin-top:5px;">
            <input type="radio" disabled> 
            <label style="color:#797e84;">Pay Online - UPI</label>
          </div>

          <div style="margin-bottom:5px;">
            <input type="radio" checked> 
            <label>Cash On Delivery</label>
          </div>
        </form>

        <div id="contentNbtn">

          <form>
            <label style="display:flex;align-items:center;font-size:0.9rem;">
              <span class="material-symbols-outlined" style="font-size:1rem;">store</span>
              ${p.shop_name}
            </label>

            <label style="display:flex;align-items:center;font-size:0.9rem;">
              <span class="material-symbols-outlined" style="font-size:1rem;">call</span>
              ${p.vendor_phone}
            </label>

            <label style="font-size:0.9rem;"><u>Check More Products</u></label>

            <div style="font-size:2rem;">
              <button type="button" onclick="changeQty(${p.cart_id}, -1)">-</button>
              <input id="qty_${p.cart_id}" value="${p.qty}" style="width:35px;text-align:end;">
              <button type="button" onclick="changeQty(${p.cart_id}, 1)">+</button>
            </div>

          </form>

          <form id="CartDelBuy">
            <button type="button" onclick="buyCartItem(${p.cart_id})">Buy Now</button>
            <button type="button" onclick="removeCart(${p.cart_id})">Remove</button>
          </form>

        </div>
      </div>

    </div>
    `;

    container.appendChild(div.firstElementChild);
  });
}

async function changeQty(cart_id, change) {

  let input = document.getElementById("qty_" + cart_id);
  let newQty = parseInt(input.value) + change;

  if (newQty < 1) return;

  input.value = newQty;

  console.log("Update Qty:", cart_id, newQty);

  const data = new FormData();
  data.append("cart_id", cart_id);
  data.append("qty", newQty);

  await fetch("./script/update_cart.php", {
    method: "POST",
    body: data
  });
}

async function buyCartItem(cart_id) {

  console.log("Buy cart item:", cart_id);

  if (!confirm("Place order?")) return;

  const data = new FormData();
  data.append("cart_id", cart_id);

  const res = await fetch("./script/buy_from_cart.php", {
    method: "POST",
    body: data
  });

  const r = await res.text();

  alert(r);
  manageCart();
}


function downloadInvoice(order_id){

  console.log("Downloading invoice:", order_id);

  window.open(
    "./script/download_invoice.php?order_id=" + order_id,
    "_blank"
  );

}

/*
async function manageOrders() {

  closeOptMenus(false, false);

  ShopkeeperOptionsBtns.innerHTML = `
    <div class="optBtn" onclick="defaultLoad()">Back</div>
    <div class="optBtn hover">My Orders</div>
  `;

  ProductPage.innerHTML = `
  <fieldset>
      <div id="ListingOrderItems"></div>
  </fieldset>
  `;

  const container = document.getElementById("ListingOrderItems");

  const res = await fetch("./script/get_orders.php");
  const result = await res.json();

  if (result.status !== "ok") {
    showLogin();
    return;
  }

  if (!result.data.length) {
    container.innerHTML = "<p style='text-align:center;'>No Orders</p>";
    return;
  }

  result.data.forEach(p => {

  let actionBtn = "";
  let paymentText = "";
  let dateInfo = "";

  if (p.status === "delivered") {
    actionBtn = `<button type="button" style="margin:0;" onclick="raiseIssue(${p.id})">Raise Issue</button>
                <button type="button" style="margin:0 0 10px ;"  onclick="downloadInvoice(${p.id})">Invoice</button>`;
    paymentText = `<label style="color:green;"><b>Paid</b></label>`;

    // ✅ show both dates
    dateInfo = `
      <label style="font-size:0.75rem;">
        Ordered: <b>${p.ordered_at || "-"}</b>
      </label>
      <label style="font-size:0.75rem;">
        Delivered: <b>${p.delivered_at || "-"}</b>
      </label>
    `;

  } else {
    actionBtn = `<button type="button" onclick="cancelOrder(${p.id})">Cancel Order</button>`;
    paymentText = `<label style="color:orange;"><b>Pay After Delivery</b></label>`;

    // only ordered date
    dateInfo = `
      <label style="font-size:0.75rem;">
        Ordered: <b>${p.ordered_at || "-"}</b>
      </label>
    `;
  }

  const div = document.createElement("div");

  div.innerHTML = `
  <div id="orderdetailContainer" style="margin:10px 0;border-radius:5px;">

    <div id="editImage"
      style="position:absolute;margin:5px;background:#dfebff;border-radius:5px;padding:5px 10px;font-size:0.6rem;">
      ${p.category}
    </div>

    <div id="productImage" style="padding: 0;">
      <img src="./script/${p.image || 'noimage.png'}">
    </div>

    <div id="ProductEditInfo" style="display:flex;justify-content:space-between;">

      <form style="margin-bottom:0;width:33.33%">
        <label style="font-size:1rem;"><b>${p.title}</b></label>
        <label style="font-size:0.8rem;"><i>${p.category}</i></label>

        <label style="font-size:0.8rem;">${p.description || ""}</label>

        <label style="font-size:0.9rem;font-weight:600;margin:4px 0;">
          ₹${p.price} x ${p.qty}
        </label>

        <label style="font-size:0.9rem;margin:3px 0;">
          <b style="font-size:1.4rem;">₹${p.price * p.qty}</b> Total
        </label>

        <label style="font-size:0.9rem;">${paymentText}</label>

      </form>

      <form style="margin-bottom:0;width:33.33%">
        <label style="font-size:1rem;"><b>${p.shop_name}</b></label>
        <label style="font-size:0.8rem;margin:2px 0;font-weight:400;">Seller: <b style="font-size:0.9rem;margin:2px 0;font-weight:500;">${p.vendor_name}</b></label>
        <label style="font-size:0.8rem;">Phone: <b>${p.vendor_phone}</b></label>

        <label style="font-size:0.8rem;">${p.address}</label>

        <label style="font-size:0.7rem;">
          <span>Quantity</span> <b>${p.qty}</b>
        </label>

        <label style="font-size:0.8rem;color:green;">
          <b>${p.status}</b>
        </label>

        <label style="font-size:0.9rem;">
          <span>Valid Warranty</span> <b><i>${p.warranty} Months</i></b>
        </label>

        </form>
        
        <form style="display:flex;align-items:flex-end;margin:0;">
        <div>${actionBtn}</div>
        ${dateInfo}
      </form>

    </div>
  </div>
  `;

  container.appendChild(div.firstElementChild);
});
}*/

async function manageOrders() {

  closeOptMenus(false, false);

  ShopkeeperOptionsBtns.innerHTML = `
    <div class="optBtn" onclick="defaultLoad()">Back</div>
    <div class="optBtn hover">My Orders</div>
  `;

  ProductPage.innerHTML = `
  <fieldset>
      <div id="ListingOrderItems"></div>
  </fieldset>
  `;

  const container = document.getElementById("ListingOrderItems");

  const res = await fetch("./script/get_orders.php");
  const result = await res.json();

  if (result.status !== "ok") {
    showLogin();
    return;
  }

  if (!result.data.length) {
    container.innerHTML = "<p style='text-align:center;'>No Orders</p>";
    return;
  }

  result.data.forEach(p => {

    let actionBtn = "";
    let paymentText = "";
    let dateInfo = "";
    let onsiteBadge = "";
    let cardBorder = "#dfe7f1";
    let cardBg = "#fff";

    // WARRANTY CHECK
    let warrantyValid = true;

    if (p.delivered_at && Number(p.warranty) > 0) {

      const start = new Date(p.delivered_at);

      const expiry = new Date(start);

      expiry.setMonth(expiry.getMonth() + Number(p.warranty));

      if (new Date() > expiry) {
        warrantyValid = false;
      }
    }

    // OFFLINE PURCHASE STYLE
    if (p.order_type === "offline") {

      cardBorder = "#4c6381";
      cardBg = "#f5f8fc";

      onsiteBadge = `
      <div style="
        position:absolute;
        top:10px;
        right:20px;
        background:#4c6381;
        color:#fff;
        padding:6px 12px;
        border-radius:30px;
        font-size:0.7rem;
        font-weight:600;
        z-index:0;
      ">
        On-Site Purchase
      </div>
      `;
    }

    // DELIVERED
    if (p.status === "delivered") {

      actionBtn = `
        <button 
          type="button"
          style="margin:0 0 5px;"
          onclick="downloadInvoice(${p.id})"
        >
          Invoice
        </button>
      `;

      // WARRANTY VALID
      if (warrantyValid) {

        actionBtn += `
          <button 
            type="button"
            style="margin:0;"
            onclick="raiseIssue(${p.id})"
          >
            Raise Issue
          </button>
        `;
      }

      paymentText = `
        <label style="color:green;">
          <b>Paid</b>
        </label>
      `;

      // OFFLINE DATE
      if (p.order_type === "offline") {

        dateInfo = `
          <label style="font-size:0.75rem;">
            Purchased At: <b>${p.ordered_at || "-"}</b>
          </label>
        `;

      } else {

        dateInfo = `
          <label style="font-size:0.75rem;">
            Ordered: <b>${p.ordered_at || "-"}</b>
          </label>

          <label style="font-size:0.75rem;">
            Delivered: <b>${p.delivered_at || "-"}</b>
          </label>
        `;
      }

    } else {

      actionBtn = `
        <button 
          type="button"
          style="margin:0;"
          onclick="cancelOrder(${p.id})"
        >
          Cancel Order
        </button>
      `;

      paymentText = `
        <label style="color:orange;">
          <b>Pay After Delivery</b>
        </label>
      `;

      dateInfo = `
        <label style="font-size:0.75rem;">
          Ordered: <b>${p.ordered_at || "-"}</b>
        </label>
      `;
    }

    const div = document.createElement("div");

    div.innerHTML = `
    <div id="orderdetailContainer" 
      style="
        margin:10px 0;
        border-radius:10px;
        position:relative;
        border:2px solid ${cardBorder};
        background:${cardBg};
        overflow:hidden;
      "
    >

      ${onsiteBadge}

      <div id="editImage"
        style="
          position:absolute;
          margin:5px;
          background:#dfebff;
          border-radius:5px;
          padding:5px 10px;
          font-size:0.6rem;
          z-index:1;
        "
      >
        ${p.category}
      </div>

      <div id="productImage" style="padding:0;">
        <img src="./script/${p.image || 'noimage.png'}">
      </div>

      <div id="ProductEditInfo" 
        style="
          display:flex;
          justify-content:space-between;
        "
      >

        <form style="margin-bottom:0;width:33.33%">

          <label style="font-size:1rem;">
            <b>${p.title}</b>
          </label>

          <label style="font-size:0.8rem;">
            <i>${p.category}</i>
          </label>

          <label style="font-size:0.8rem;">
            ${p.description || ""}
          </label>

          <label style="
            font-size:0.9rem;
            font-weight:600;
            margin:4px 0;
          ">
            ₹${p.price} x ${p.qty}
          </label>

          <label style="
            font-size:0.9rem;
            margin:3px 0;
          ">
            <b style="font-size:1.4rem;">
              ₹${p.price * p.qty}
            </b> Total
          </label>

          <label style="font-size:0.9rem;">
            ${paymentText}
          </label>

        </form>

        <form style="margin-bottom:0;width:33.33%">

          <label style="font-size:1rem;">
            <b>${p.shop_name}</b>
          </label>

          <label style="
            font-size:0.8rem;
            margin:2px 0;
            font-weight:400;
          ">
            Seller:
            <b style="
              font-size:0.9rem;
              margin:2px 0;
              font-weight:500;
            ">
              ${p.vendor_name}
            </b>
          </label>

          <label style="font-size:0.8rem;">
            Phone: <b>${p.vendor_phone}</b>
          </label>

          <label style="font-size:0.8rem;">
            ${p.address}
          </label>

          <label style="font-size:0.7rem;">
            <span>Quantity</span> <b>${p.qty}</b>
          </label>

          <label style="
            font-size:0.8rem;
            color:green;
          ">
            <b>${p.status}</b>
          </label>

          <label style="font-size:0.9rem;">
            <span>Warranty</span>
            <b>
              <i>
                ${p.warranty} Months
                ${!warrantyValid ? "(Expired)" : ""}
              </i>
            </b>
          </label>

        </form>

        <form style="
          display:flex;
          flex-direction: column;
          align-items:flex-end;
          justify-content: flex-end;
          margin:0;
        ">

          <div style="    display: flex;
    align-items: flex-end;
    flex-direction: column;">

            ${actionBtn}

            ${dateInfo}

          </div>

        </form>

      </div>
    </div>
    `;

    container.appendChild(div.firstElementChild);
  });
}

function raiseIssue(order_id) {

  const popup = document.createElement("div");
  popup.style = `
    position:fixed;top:0;left:0;width:100%;height:100%;
    background:#0005;display:flex;align-items:center;justify-content:center;z-index:999;
  `;

  popup.innerHTML = `
    <div style="color: #4c6381;background:#fff;padding:20px;border-radius:8px;width:400px;font-family: 'Montserrat Alternates', sans-serif;">
      <h3 style="margin:2px 0 10px 0;">Raise Issue</h3>

      <label>Issue Title</label><br>
      <input style="width:stretch"  id="issueTitle" placeholder="Short issue"><br>

      <label>Description</label><br>
      <textarea style="width:stretch" id="issueDesc" rows="5" placeholder="Explain issue"></textarea>

      <span style="margin-top:10px;">
        <button style="margin:0;" id="submitIssue">Submit</button>
        <button style="margin:0;" onclick="this.closest('div').parentElement.remove()">Cancel</button>
      </span>
    </div>
  `;

  document.body.appendChild(popup);

  document.getElementById("submitIssue").onclick = async () => {

    const title = document.getElementById("issueTitle").value.trim();
    const desc = document.getElementById("issueDesc").value.trim();

    if (!title) {
      alert("Issue required");
      return;
    }

    const data = new FormData();
    data.append("order_id", order_id);
    data.append("issue", title);
    data.append("description", desc);

    console.log("Sending issue:", [...data]);

    const res = await fetch("./script/raise_issue.php", {
      method: "POST",
      body: data
    });

    const r = await res.text();
    console.log("Response:", r);

    alert(r);
    popup.remove();
  };
}

async function cancelOrder(order_id) {

  if (!confirm("Cancel this order?")) return;

  console.log("Cancel:", order_id);

  const data = new FormData();
  data.append("order_id", order_id);

  const res = await fetch("./script/cancel_order.php", {
    method: "POST",
    body: data
  });

  const r = await res.text();
  console.log(r);

  alert(r);
  manageOrders();
}



// Manage Complains


async function manageComplains() {

    closeOptMenus(false, false);


  ShopkeeperOptionsBtns.innerHTML = `
    <div class="optBtn" onclick="defaultLoad()">Back</div>
    <div class="optBtn hover">My Complains</div>
  `;

  ProductPage.innerHTML = `
    <fieldset>
      <div id="ListingOrderItems"></div>
    </fieldset>
  `;

  const container = document.getElementById("ListingOrderItems");

  const res = await fetch("./script/get_issues_customer.php");
  const result = await res.json();

  console.log("CUSTOMER ISSUES:", result);

  if (result.status !== "ok") {
    showLogin();
    return;
  }

  if (!result.data.length) {
    container.innerHTML = "<p style='width:stretch;text-align:center;'>No Complains</p>";
    return;
  }

  result.data.forEach(p => {

    let statusText = "";
    if (p.status === "pending") statusText = "Request Pending";
    else if (p.status === "processing") statusText = "Request Under Process";
    else if (p.status === "approved") statusText = "Approved";
    else if (p.status === "resolved") statusText = "Resolved";

    const div = document.createElement("div");

    div.innerHTML = `
    <div id="orderdetailContainer" style="margin:10px 0;border-radius:5px;">

      <div id="editImage"
        style="position:absolute;margin:5px;background:#dfebff;border-radius:5px;padding:5px 10px;font-size:0.6rem;">
        ${p.category}
      </div>

      <div id="productImage" style="padding:0;">
        <img src="./script/${p.image || 'noimage.png'}">
      </div>

      <div id="ProductEditInfo" style="display: flex;justify-content: space-between;width:stretch;">

        <form style="margin-bottom: 0; max-width: 400px;">
          <label style="font-size:1rem;"><b>${p.title}</b></label>
          <label style="font-size:0.8rem;"><i>${p.category}</i></label>

          <label style="font-size:0.8rem;">${p.pdesc || ""}</label>

          <label style="font-size:0.7rem;">
            <span>Warranty</span> <b>${p.warranty} months</b>
          </label>

          <label style="font-size:1.2rem;"><b>₹ ${p.price}</b></label>

          <div style="margin-bottom:5px;">
            <label>Cash On Delivery</label>
          </div>
        </form>

        <form style="margin-bottom: 0; ">
          <label style="font-size:1rem;"><b>Problem</b></label>
          <input value="${p.issue}" readonly>

          <label style="font-size:0.8rem;"><b>Explain Issue</b></label>
          <textarea rows="3" readonly>${p.description || ""}</textarea>
        </form>

        <form style="display:flex;align-items:flex-end;margin:0;">
        
          <label style="font-size:0.8rem;color:orange;">
            <b>${statusText}</b>
          </label>

          <label style="font-size:0.7rem;">
            Raised: <b>${p.created_at}</b>
          </label>
        ${
          p.status !== "resolved"
          ? `<button style="margin:10px 0 0 0" type="button" onclick="cancelIssue(${p.id})">Cancel Complain</button>`
          : `<span style="color:green;font-size:1.15rem;font-weight:500;">Resolved</span>`
          }
        </form>

      </div>
    </div>
    `;

    container.appendChild(div.firstElementChild);
  });
}

async function cancelIssue(id) {

  if (!confirm("Cancel this complain?")) return;

  const fd = new FormData();
  fd.append("id", id);

  const res = await fetch("./script/cancel_issue.php", {
    method: "POST",
    body: fd
  });

  const r = await res.text();
  alert(r);

  manageComplains();
}



// nearest shop
async function nearestShop() {

  closeOptMenus(false, false);

  ShopkeeperOptionsBtns.innerHTML = `
    <div class="optBtn" onclick="defaultLoad()">Back</div>
    <div class="optBtn hover">Nearest Shops</div>
  `;

  ProductPage.innerHTML = `
  <fieldset style="background:#fff;border: 1px solid #fff;padding: 10px;margin: 10px;border-radius: 5px;box-shadow: 0px 0px 5px 1px #0000000a;">
    
  <div id="detailContainer" style="width:stretch;padding:5px;display:flex;align-items:center;">
             
      <span style="width:50%;margin:0 0 10px 0; display:flex; gap:5px; margin:auto;">
        <span style="margin: auto 5px;">Select shops within: </span>
        <div class="optBtn" style="box-shadow:inset 0px 0px 20px 0px #00000014;" onclick="loadShops(5)"> 5 km </div>
        <div class="optBtn" style="box-shadow:inset 0px 0px 20px 0px #00000014;" onclick="loadShops(10)"> 10 km </div>
        <div class="optBtn" style="box-shadow:inset 0px 0px 20px 0px #00000014;" onclick="loadShops(15)"> 15 km </div>
      </span>
      
      <span style="width:50%;display:flex;justify-content: end;">
        <div class="optBtn" id="totalCountOfShops" style="margin:0 5px; width:min-content;" id="recenterBtn"></div>
        <div class="optBtn hover" style="margin:0; width:min-content;" id="recenterBtn">📍 Recenter</div>
      </span>
    </div>

        
        <div id="map" style="height:500px;border-radius:5px;z-index:0;margin:10px"></div>
    </fieldset>
  `;


  console.log("Loading customer location...");

  // get customer lat lng
  const res = await fetch("./script/get_customer.php");
  const r = await res.json();

  if (r.status !== "valid") {
    alert("Login required");
    return;
  }

  let lat = parseFloat(r.data.latitude);
  let lng = parseFloat(r.data.longitude);

  // fallback (Ahmedabad)
  if (!lat || !lng) {
    console.log("No lat/lng found → using default");
    lat = 23.0225;
    lng = 72.5714;
  }

  console.log("Customer:", lat, lng);

  let map = L.map('map').setView([lat, lng], 14);
  // let map = L.map('map').setView([23.0225, 72.5714], 14);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

  // customer marker
  // L.marker([lat, lng]).addTo(map).bindPopup("You");

  // current location icon
const userIcon = L.divIcon({
  html: `<div style="
    width:18px;
    height:18px;
    background:#2196f3;
    border:3px solid white;
    border-radius:50%;
    box-shadow:0 0 10px #2196f3;
  "></div>`,
  className: "",
  iconSize: [18, 18]
});

L.marker([lat, lng], { icon: userIcon })
  .addTo(map)
  .bindPopup("📍 You");


// shop icon
const shopIcon = L.divIcon({
  html: `<div style="font-size:40px;text-shadow:0px 6px 7px #000000a6">🏪</div>`,
  className: "",
  iconSize: [30, 30],
  iconAnchor: [15, 30]
});

  // load shops function
  let markers = [];

window.loadShops = async function (km) {

  console.log("Radius:", km);

  // remove old markers
  markers.forEach(m => map.removeLayer(m));
  markers = [];

  const fd = new FormData();
  fd.append("km", km);

  const res = await fetch("./script/get_nearest_shops.php", {
    method: "POST",
    body: fd
  });

  const data = await res.json();

  console.log("Filtered Shops:", data);

  document.getElementById("totalCountOfShops").innerHTML = `${data.vendors.length} 🏪 Found` 

  if (data.status !== "ok") return;

  data.vendors.forEach(s => {

    let lat = parseFloat(s.shop_lati);
    let lng = parseFloat(s.shop_long);

    if (!lat || !lng) return;

    let m = L.marker([lat, lng], { icon: shopIcon })
      .addTo(map)
      .bindPopup(`
        <b style="color:orange;font-size:1rem;">🏪 ${s.shop_name}</b><br>
        <b style="color:#4c6381;padding:3px 0;margin:5px 0;">${s.shop_desc}</b> <br>
        <span>Vendor: ${s.vendor_name}<br></span>
        <a href="tel:${s.vendor_phone}"><span>Phone: ${s.vendor_phone}<br></span></a>
        <a href="http://localhost/VendoraX/?shop=${s.vendor_id}" style="text-decoration:none;" target="_blank"><button style="margin:5px 0;">View Shop</button></a>
        `);

    markers.push(m);
  });
};

  loadShops(5); // default


  // reusable recenter function
function recenterMap(lat, lng, zoom = 15) {

  map.setView([lat, lng], zoom, {
    animate: true
  });

}

// example button
document.getElementById("recenterBtn").onclick = () => {
  recenterMap(lat, lng);
};
}




async function openVendorShop(vendor_id) {

  history.pushState({}, "", `?shop=${vendor_id}`);

  ShopkeeperOptionsBtns.innerHTML = `
    <div class="optBtn hover" onclick="defaultLoad()">Explore More</div>
  `;

  ProductPage.innerHTML = `
    <fieldset>

      <div id="vendorInfo"></div>

      <div id="ProductOptionsBtns" style="width:100%;justify-content:flex-end;align-items:center;">
        <div id="NavlinkContainer" style="display:flex;justify-content:flex-start;width:100%;">
          <input type="search" style="min-width:30%;font-size:1rem;margin-right:5px;border-radius:50px;border:none;"
            id="shopSearch" placeholder="Search Product">
        </div>
      </div>

      <div id="productCards" style="padding:5px 0;"></div>

    </fieldset>
  `;

  // get vendor + products
  const res = await fetch(`./script/get_vendor_shop.php?vendor_id=${vendor_id}`);
  const data = await res.json();

  console.log("SHOP:", data);

  if (data.status !== "ok") {
    ProductPage.innerHTML = `<p style="text-align:center;">Shop not found</p>`;
    return;
  }

  // vendor details
  document.getElementById("vendorInfo").innerHTML = `
    <div style="
      background:transparent;
      border-radius:5px;
      padding:5px;
      margin-bottom:5px;
      box-shadow:none;
    ">

      <div style="display:flex;justify-content:space-between;align-items:center;">
        <div style="width:40%;">
          <h2 style="margin:0;">${data.vendor.shop_name}</h2>
          <p style="margin:5px 0;">${data.vendor.shop_desc || ""}</p>
          <p style="margin:5px 0;">Timming: ${data.vendor.shop_open_close || ""}</p>
        </div>

        <div style="width:60%;">
          <p style="margin:5px 0;"><b style="font-size:0.85rem;">Vendor: &nbsp;</b>${data.vendor.vendor_name || ""}</p>
          <p style="margin:5px 0;"><b style="font-size:0.85rem;">Contact: &nbsp;</b>${data.vendor.vendor_phone || ""}</p>
          <p style="margin:5px 0;"><b style="font-size:0.85rem;">Address: &nbsp;</b>${data.vendor.address || ""}</p>
        </div>

      </div>

    </div>
  `;

  let allProducts = data.products;

  renderShopProducts(allProducts);

  function renderShopProducts(list) {

    const container = document.getElementById("productCards");

    container.innerHTML = "";

    if (!list.length) {
      container.innerHTML = `<p style="width: stretch;text-align:center;">No Products</p>`;
      return;
    }

    list.forEach(p => {

      const card = document.createElement("div");
      card.className = "product";
      card.style.justifyContent = "unset";

      card.innerHTML = `
        <img id="productImage" style="padding:0;"
          src="./script/${p.image || 'noimage.png'}">

        <span style="
          position:absolute;
          font-size:0.7rem;
          background:white;
          padding:5px 8px;
          border-radius:5px;
          margin:5px;
          box-shadow:0 0 5px #e1e1e1;
        ">
          ${p.category}
        </span>

        <div style="display:flex;flex-direction:column;">
          <span id="productName" style="margin-bottom:5px;">
            <b>${p.title}</b>
          </span>

          <span id="productDescription"
            style="font-size:0.8rem;height:60px;overflow-y:scroll;">
            ${p.description || ""}
          </span>
        </div>

        <div style="display:flex;flex-direction:column;margin-top:auto;">
          <span id="productWarranty"
            style="font-size:0.85rem;font-weight:700;">
            ${p.warranty} Warranty
          </span>

          <span id="productPrice">₹${p.price}</span>
        </div>

        <div style="margin-top:10px;">
          <button style="margin:0;"
            onclick='handleProductAccess(${JSON.stringify(p)})'>
            View Product
          </button>
        </div>
      `;

      container.appendChild(card);
    });
  }

  // search
  document.getElementById("shopSearch")
    .addEventListener("input", (e) => {

      const val = e.target.value.toLowerCase();

      const filtered = allProducts.filter(p =>
        p.title.toLowerCase().includes(val) ||
        p.category.toLowerCase().includes(val) ||
        (p.description || "").toLowerCase().includes(val)
      );

      renderShopProducts(filtered);
    });
}

// product access checker
function handleProductAccess(product) {

  const token = getCookie("customer_token");

  // not logged in
  if (!token) {
    Login();
    return;
  }

  // logged in
  openProductPopup(product);
}