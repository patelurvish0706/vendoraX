const welcomeVendor = document.getElementById("welcomeVendor");
const ShopkeeperOptionsBtns = document.getElementById("ShopkeeperOptionsBtns");
const ShopkeeperProcessArea = document.getElementById("ShopkeeperProcessArea");
const ProductPage = document.getElementById("ProductPage");

let VendorShopToken = null;

async function checkAuth() {
  try {
    const res = await fetch("./script/verify.php");
    const data = await res.json();

    // console.log(data);

    if (data.status === "valid") {
      // ✅ global vendor id
      VendorShopToken = data.vendor_id;

      // console.log("Vendor ID:", VendorShopToken);

      const res2 = await fetch("./script/get_vendor.php");
      const dataNew = await res2.json();

      // console.log(dataNew.data.shop_open_close);

      if (
        dataNew.data.shop_open_close == "undefined" ||
        dataNew.data.shop_open_close == null
      ) {
        // console.log("No Shop details, just Registered");
        manageShop();
      } else {
        // console.log("All Data Filled");
        defaultLoad();
      }
    } else {
      Login();
    }
  } catch (err) {
    console.log(err);
    Login();
  }
}

// run on load
window.onload = checkAuth;

function closeOptMenus(more, acc) {
  deactiveAll();
  AccountServicesBtns.style.display = "none";
  MoreServicesBtns.style.display = "none";

  isMoreOpen = more;
  isAccOpen = acc;
}

async function defaultLoad() {
  let isLoggedin = true;

  const token = getCookie("vendor_token");
  if (!token) {
    showLogin();
    return;
  }

  if (!isLoggedin) {
    // Show login Register
    Login();
  } else {
    setInterval(() => {
      let date = new Date();

      let time = date.toLocaleString("en-US", {
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        hour12: true,
      });

      let days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ];
      let dayName = days[date.getDay()];

      let todaysdate =
        date.getDate().toString().padStart(2, "0") +
        " / " +
        (date.getMonth() + 1).toString().padStart(2, "0") +
        " / " +
        date.getFullYear();

      theTime.innerHTML = `<p style="font-weight:600;">${dayName}</p><p>${todaysdate}</p><p>${time}</p>`;
    }, 1000);

    const res = await fetch("./script/get_vendor.php");
    const result = await res.json();

    if (result.status !== "valid") return;

    const d = result.data;

    welcomeVendor.innerHTML = ` 
            <span id="ShopDets">Welcome, <b><i id="NameOfTheVendor">${d.vendor_name || ""
      }</i></b> <br />
                <span id="NameOfTheShop">${d.shop_name || ""}</span>
            </span>
            <span id="theTime" style="display: flex;flex-direction: column;">            
            </span> 
        `;

    ShopkeeperOptionsBtns.innerHTML = ` <div class="optBtn hover" onclick="defaultLoad()">Products</div> 
                <div class="optBtn" onclick="manageOrders()" >Orders</div> 
                <div class="optBtn" onclick="manageSales()" >Sales</div>
                <div class="optBtn" onclick="manageComplains()" >Complains</div>
            `;

    loadAllProds();
    closeOptMenus(false, false);
  }
}
defaultLoad();

function ShowMyShop() {
  window.open(`http://localhost/VendoraX/?shop=${VendorShopToken}`, "_blank");
}

async function updateProduct(id, btn) {
  const box = btn.closest("div"); // adjust if needed

  const data = new FormData();

  data.append("id", id);
  data.append("title", box.querySelector("#ptitle").value);
  data.append("price", box.querySelector("#pprice").value);
  data.append("stock", box.querySelector("#pstock").value);
  data.append("warranty", box.querySelector("#pwarranty").value);
  data.append("category", box.querySelector("#pcategory").value);
  data.append("description", box.querySelector("#pdesc").value);

  const res = await fetch("./script/update_product.php", {
    method: "POST",
    body: data,
  });

  const r = await res.text();

  alert(r);

  loadAllProds();
}

async function deleteProduct(id) {
  if (!confirm("Delete product?")) return;

  const data = new FormData();
  data.append("id", id);

  console.log(data);

  const res = await fetch("./script/delete_product.php", {
    method: "POST",
    body: data,
  });

  const r = await res.text();

  if (r === "success") {
    alert("Deleted");
    loadAllProds();

    // location.reload();
  } else {
    alert(r);
  }
}

function loadAllProds() {
  ProductPage.innerHTML = `
    <fieldset>
      <div id="ProductOptionsBtns">
        <div class="optBtn hover">All</div>
        <div class="optBtn" onclick="addProduct()">Add Product</div>
      </div>
    </fieldset>

    <fieldset style="padding:0 10px 10px;">
      <div id="productCards"></div>
    </fieldset>
  `;

  async function loadProducts() {
    function openEditPopup(p) {
      const popup = document.createElement("div");
      popup.style = `
        position:fixed;top:0;left:0;width:100%;height:100%;
        background:#0005;display:flex;align-items:center;justify-content:center;z-index:999;
    `;

      popup.innerHTML = `
        <div style="display:flex;flex-direction:column;color:#4c6381;background:#fff;padding:20px 25px;border-radius:8px;width:400px;font-family: 'Montserrat Alternates', sans-serif;">
            <h3 style="margin:0 0 10px 0;">Edit Product</h3>
                       
            <label for="title">Product Name</label>
            <input id="ptitle" value="${p.title}" placeholder="Title">
            
            <label for="title">Price</label>
            <input id="pprice" value="${p.price}" placeholder="Price">

            <label for="title">Total Available Stock</label>
            <input id="pstock" value="${p.stock}" placeholder="Stock">
            
            <label for="title">Warranty (In Months)</label>
            <input id="pwarranty" value="${p.warranty}" placeholder="Warranty">

            <label for="title">Product Category</label>
            <select name="status" id="pcategory" style="width: 300px;color:#4c6381;">
                <option value="Laptop" >Laptop</option>
                <option value="Mobile" >Mobile</option>
                <option value="HeadPhone" >HeadPhone</option>
                <option value="Smart Watches" >Smart Watches</option> 
                <option value="Controllers" >Controllers</option>
                <option value="Cables" >Cables</option>
                <option value="Chargers" >Chargers</option>
                <option value="Batteries" >Batteries</option>
                <option value="Hard Drives" >Hard Drives</option>
                <option value="Processors" >Processors</option>
                <option value="RAM" >RAM</option>
                <option value="Accessories" >Accessories</option>
            </select>

            <label for="title">Description</label>
            <textarea id="pdesc" rows="4">${p.description || ""}</textarea>

            <span style="margin:5px 0 0 0;">
            <button style="margin:0 5px 0 0;" onclick="updateProduct(${p.id
        }, this)">Save</button>
            <button style="margin:0 5px 0 0;" onclick="this.closest('div').parentElement.remove()">Cancel</button>
            </span>
        </div>
    `;

      document.body.appendChild(popup);

      document.getElementById("pcategory").value = p.category;
    }

    const res = await fetch("./script/get_products.php");
    const data = await res.json();

    const productCards = document.getElementById("productCards");
    // productCards.innerHTML = "";

    if (!data.length) {
      productCards.innerHTML =
        "<p style='width:stretch;text-align: center;'>No products found</p>";
      return;
    }

    data.forEach((p) => {
      // console.log(p)
      const card = document.createElement("div");
      card.className = "product";
      card.style.height = "500px";

      card.innerHTML = `
        <img src="./script/${p.image || "noimage.png"}" alt="">
        <span style="position:absolute;font-size:0.7rem;background-color:white;padding:5px 8px;border-radius:5px;margin:5px;box-shadow:0px 0px 5px #e1e1e1;">${p.category
        }</span>
        
        <div style="display:flex;flex-direction:column;">
          <span id="productName"><b>${p.title}</b></span>
          <span style="font-size:0.8rem;font-weight:400;margin:3px 0;word-break: break-word; overflow: scroll; height: 100px;">${p.description || ""
        }</span>
          <span style="font-size:1rem;font-weight:600;margin:3px 0;"><small>${p.warranty
        } Months Warranty</small></span>
          <span style="font-size:1.2rem;font-weight:700;margin:3px 0;">₹ ${p.price
        }</span>
        </div>

        <span style="margin:10px 0;">
          <b>${p.stock} Pieces Available</b>
        </span>

        <div>
          <div class="optBtn" style="margin-bottom:5px;border: 1px solid #4c6381;">Edit</div>
          <div class="optBtn" style="border: 1px solid #4c6381;">Remove</div>
        </div>
      `;

      card.querySelectorAll(".optBtn")[0].onclick = () => openEditPopup(p);
      card.querySelectorAll(".optBtn")[1].onclick = () => deleteProduct(p.id);

      productCards.appendChild(card);
    });
  }

  loadProducts();
}

function addProduct() {
  ProductPage.innerHTML = `
            <fieldset style="padding-bottom:0;">
            <div id="ProductOptionsBtns" >
                <div class="optBtn" onclick="defaultLoad()">All</div>
                <div class="optBtn hover">Add Product</div>
            </div>
            </fieldset>

            <div id="addingTask" style="
                margin: 10px;
                background-color: #fff;
                border-radius: 5px;
                box-shadow: 0px 7px 10px #0000000f;
              ">
                        <fieldset>
                              <form id="AddingTaskForm" style="padding: 0; width: 95%">
                                <p id="addFormErr" style="color: red; margin-bottom: 10px"></p>

                                <label for="title">Product Name</label>
                                <input type="text" id="title" name="title" placeholder="Product Name" />

                                <label for="status" >Product Category</label>
                                      <select name="status" id="status" style="width: 300px;color:#4c6381;">
                                          <option value="">Select Category</option>
                                          <option value="Laptop" >Laptop</option>
                                          <option value="Mobile" >Mobile</option>
                                          <option value="HeadPhone" >HeadPhone</option>
                                          <option value="Smart Watches" >Smart Watches</option> 
                                          <option value="Controllers" >Controllers</option>
                                          <option value="Cables" >Cables</option>
                                          <option value="Chargers" >Chargers</option>
                                          <option value="Batteries" >Batteries</option>
                                          <option value="Hard Drives" >Hard Drives</option>
                                          <option value="Processors" >Processors</option>
                                          <option value="RAM" >RAM</option>
                                          <option value="Accessories" >Accessories</option>
                                          <option value="other">Other</option>
                                      </select>

                  
                                <label for="description">Description</label>
                                <textarea type="text" id="description" name="description" rows="5"
                                    style="resize: vertical" placeholder="Write Details about Product"></textarea>

                                <label for="stock">Total Stock</label>
                                <input type="number" id="stock" name="stock" placeholder="Number of product" />

                                <label for="price">Price of Product</label>
                                <input type="number" id="price" name="price" placeholder="Selling Price" />

                                <label for="warranty">Warranty (In Months)</label>
                                <input type="number" id="warranty" name="warranty"
                                    placeholder="Write duration of warranty." />

                                <label for="proImage">Product Image</label>
                                <input type="file" id="proImage" name="proImage" />

                                <div>
                                    <button type="submit">Add Product</button>
                                    <button type="reset">Cancel</button>
                                </div>
                              </form>
                        </fieldset>
                    </div>
        `;

  document
    .getElementById("AddingTaskForm")
    .addEventListener("submit", async (e) => {
      e.preventDefault();

      const form = e.target;
      const err = document.getElementById("addFormErr");

      const title = form.title.value.trim();
      const category = form.status.value;
      const stock = form.stock.value;
      const price = form.price.value;
      const warranty = form.warranty.value;
      const file = form.proImage.files[0];

      if (!title || !category || !stock || !price) {
        err.innerText = "All required fields missing";
        return;
      }

      if (stock < 0 || price <= 0) {
        err.innerText = "Invalid stock or price";
        return;
      }

      if (warranty < 0) {
        err.innerText = "Invalid warranty";
        return;
      }

      if (file && !file.type.startsWith("image/")) {
        err.innerText = "Only image allowed";
        return;
      }

      const data = new FormData(form);

      const res = await fetch("./script/add_product.php", {
        method: "POST",
        body: data,
      });

      const result = await res.text();

      if (result.trim() === "success") {
        err.innerHTML = "<span style='color:green'>Product Added</span>";
        form.reset();
      } else {
        err.innerText = result;
      }
    });
}

let map, marker;

function manageShop() {
  ProductPage.innerHTML = `
  <fieldset style="padding-bottom:0;">
            <div id="ProductOptionsBtns" >
                <div class="optBtn">Back</div>
                <div class="optBtn hover" >Add Shop Details</div>
            </div>
  </fieldset>
  <fieldset>
  
  <form id="AddingTaskForm" style="padding:10px 15px;width:80%;justify-self:flex-start;">
    <h3 style="margin:0 0 5px 0;font-size:1.4rem;">Shop Details</h3>
    <p id="addFormErr" style="color:red; font-weight:500;"></p>

    <label>Shop Name</label>
    <input type="text" id="sname" name="sname">

    <label>Vendor Name</label>
    <input type="text" id="vname" name="vname">

    <label>Email</label>
    <input type="email" id="vemail" name="vemail">

    <label>Mobile</label>
    <input type="number" id="vmobile" name="vmobile">

    <label>Password</label>
    <input type="text" id="pass" name="pass">

    <label>About Shop</label>
    <textarea id="description" name="description"></textarea>

    <label>Opening Time</label>
    <input type="time" id="open" name="open">

    <label>Closing Time</label>
    <input type="time" id="close" name="close">

    <input type="hidden" id="lat" name="lat">
    <input type="hidden" id="lng" name="lng">

    <label>Address</label>
    <textarea id="address" name="address"></textarea>

    <label>Pincode</label>
    <input type="text" id="pincode" name="pincode" maxlength="6">
    
    <label>Select Manual Location</label>
    <div id="map" style="height:300px"></div>

    <button type="submit">Save</button>
    <button onclick="logout()" class="hover">Logout</button>
  </form>
  </fieldset>

  `;

  const form = document.getElementById("AddingTaskForm");
  const err = document.getElementById("addFormErr");

  // ===== MAP INIT (FIXED) =====
  map = L.map("map").setView([23.0225, 72.5714], 13);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(map);

  function setMapLocation(lat, lng) {
    if (marker) map.removeLayer(marker);

    marker = L.marker([lat, lng]).addTo(map);
    map.setView([lat, lng], 15);

    form.lat.value = lat;
    form.lng.value = lng;
  }

  map.on("click", (e) => {
    setMapLocation(e.latlng.lat, e.latlng.lng);
  });

  //   console.log("map div:", document.getElementById("map"));
  // console.log("Leaflet:", typeof L);
  // ===== LOAD DATA =====
  async function loadVendorData() {
    const res = await fetch("./script/get_vendor.php");
    const result = await res.json();

    if (result.status !== "valid") return;

    const d = result.data;
    // console.log(d)

    form.sname.value = d.shop_name || "";
    form.vname.value = d.vendor_name || "";
    form.vemail.value = d.vendor_email || "";
    form.vmobile.value = d.vendor_phone || "";
    form.pass.value = d.vendor_password || "";
    form.description.value = d.Shop_desc || "";
    form.address.value = d.address || "";
    let addr = d.address || "";

    document.getElementById("NameOfTheVendor").innerText = d.vendor_name || "";
    document.getElementById("NameOfTheShop").innerText = d.shop_name || "";

    // extract pincode from end
    let match = addr.match(/(.*)\s-\s(\d{6})$/);

    if (match) {
      form.address.value = match[1]; // clean address
      form.pincode.value = match[2]; // set pincode input
    } else {
      form.address.value = addr;
    }

    if (d.Shop_lati && d.shop_long) {
      setMapLocation(d.Shop_lati, d.shop_long);
    }

    if (d.shop_open_close) {
      let [o, c] = d.shop_open_close.split(" - ");
      form.open.value = o;
      form.close.value = c;
    }
  }

  loadVendorData();

  // ===== PINCODE → LOCATION =====
  const pincodeInput = document.getElementById("pincode");

  let lastPin = "";

  document.getElementById("pincode").addEventListener("input", async () => {
    const pin = form.pincode.value.trim();

    if (!/^[0-9]{6}$/.test(pin)) return;

    if (pin === lastPin) return; // prevent repeat call
    lastPin = pin;

    err.innerText = "Fetching location...";

    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?postalcode=${pin}&country=India&format=json`
      );

      const data = await res.json();

      if (!data.length) {
        err.innerText = "Pincode not found";
        // window.location.href('#addFormErr');
        return;
      }

      const loc = data[0];

      baseAddress = loc.display_name; // ✅ store clean address

      form.address.value = baseAddress; // ❌ no pincode here

      setMapLocation(parseFloat(loc.lat), parseFloat(loc.lon));

      err.innerText = "";
    } catch {
      err.innerText = "Location fetch failed";
    }
  });

  // ===== SUBMIT =====
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    err.innerText = "";

    const pin = form.pincode.value.trim();

    if (!/^[0-9]{6}$/.test(pin)) {
      err.innerText = "Invalid pincode";
      return;
    }

    // 🔥 remove old pincode if already appended
    let addr = form.address.value.trim();

    addr = addr.replace(/\s*-\s*\d{6}$/, ""); // remove " - 380001" from end if exists

    // append new pincode
    const finalAddress = addr + " - " + pin;

    // create formdata manually to control address
    const data = new FormData(form);
    data.set("address", finalAddress);

    try {
      const res = await fetch("./script/add_shop.php", {
        method: "POST",
        body: data,
      });

      const result = await res.text();

      if (result.trim() === "success") {
        err.innerHTML = "<span style='color:green'>Saved</span>";
        window.location.href = "#ProductPage";

        defaultLoad();
      } else {
        err.innerText = result;
        window.location.href = "#ProductPage";
      }
    } catch {
      err.innerText = "Network error";
      window.location.href = "#ProductPage";
    }
  });

  closeOptMenus(false, false);
}

async function changeStatus(order_id, el) {
  const status = el.value;

  const fd = new FormData();
  fd.append("order_id", order_id);
  fd.append("status", status);

  try {
    const r = await fetch("./script/update_order_status.php", {
      method: "POST",
      body: fd,
    });

    const res = await r.text();

    console.log(res);

    // ✅ reload same tab automatically
    loadVendorOrders(
      document.querySelector("#pendingOrders.hover")
        ? "pending"
        : document.querySelector("#shiftedOrders.hover")
          ? "shipped"
          : "delivered"
    );
  } catch (err) {
    console.log(err);
  }
}

async function acceptOrder(id) {
  await changeStatus(id, { value: "shipped" });
}

async function denyOrder(id) {
  if (!confirm("Deny order?")) return;

  const fd = new FormData();
  fd.append("order_id", id);

  try {
    const r = await fetch("./script/deny_order.php", {
      method: "POST",
      body: fd,
    });

    const res = await r.text();

    console.log(res);

    // ✅ stay in pending section
    loadVendorOrders("pending");
  } catch (err) {
    console.log(err);
  }
}

async function updateOrderStatus(order_id, select) {
  await changeStatus(order_id, select);
}

async function loadVendorOrders(type) {
  const container = document.getElementById("addingTask");

  const info = await fetch("./script/get_vendor_orders.php");
  const resultdata = await info.json();

  console.log("VENDOR:", resultdata);

  if (resultdata.status !== "ok") return;

  // ✅ active buttons
  document.getElementById("pendingOrders").classList = "optBtn";
  document.getElementById("shiftedOrders").classList = "optBtn";
  document.getElementById("completedOrders").classList = "optBtn";

  if (type === "pending") {
    document.getElementById("pendingOrders").classList = "optBtn hover";
  }

  if (type === "shipped") {
    document.getElementById("shiftedOrders").classList = "optBtn hover";
  }

  if (type === "delivered") {
    document.getElementById("completedOrders").classList = "optBtn hover";
  }

  const list = resultdata.data.filter((o) => o.status === type);

  if (!list.length) {
    container.innerHTML = `
      <p style="text-align:center;padding:20px;">
        No Orders
      </p>
    `;
    return;
  }

  container.innerHTML = `<div id="ListingOrderItems"></div>`;

  const box = document.getElementById("ListingOrderItems");

  list.forEach((p) => {
    let actionBtns = "";

    // ✅ pending
    if (type === "pending") {
      actionBtns = `
        <button 
          type="button"
          onclick="acceptOrder(${p.id})"
          style="margin:0 5px;">
          Accept
        </button>

        <button 
          type="button"
          onclick="denyOrder(${p.id})"
          style="margin:0 5px;">
          Deny
        </button>
      `;
    }

    // ✅ shipped
    if (type === "shipped") {
      actionBtns = `
        <button 
          type="button"
          style="margin:0 5px;"
          onclick="changeStatus(${p.id}, {value:'pending'})">
          Mark Pending
        </button>

        <button 
          type="button"
          style="margin:0 5px;"
          onclick="changeStatus(${p.id}, {value:'delivered'})">
          Mark Delivered
        </button>
      `;
    }

    // ✅ delivered
    if (type === "delivered") {
      actionBtns = `
      <div style="margin-top:5px;">
        <label style="color:green;font-size:0.9rem;">
          <b>Delivery Successful</b>
        </label> <br>

          <label style="font-size:0.75rem;">
            Ordered On:
            <b>${p.ordered_at || "-"}</b>
          </label><br>

          <label style="font-size:0.75rem;">
            Delivered On:
            <b>${p.delivered_at || "-"}</b>
          </label>
        </div>
      `;
    }

    const div = document.createElement("div");

    div.innerHTML = `
    <div id="orderdetailContainer" style="margin-bottom:10px;">

      <div id="editImage"
        style="position:absolute;margin:5px;background:#dfebff;border-radius:5px;padding:5px 10px;font-size:0.6rem;">
        ${p.category}
      </div>

      <div id="productImage" style="padding:0;">
        <img src="./script/${p.image || "noimage.png"}">
      </div>

      <div id="ProductEditInfo" style="padding:10px 0 0 15px;display:flex;justify-content:space-between;">

        <div style="display:flex;flex-direction:column;margin-bottom:10px;max-width:300px;">

          <label style="font-size:1rem;margin:2px 0;">
            <b>${p.title}</b>
          </label>

          <label style="font-size:0.8rem;margin:2px 0;">
            <i>${p.category}</i>
          </label>

          <label style="font-size:0.8rem;margin:4px 0;">
            ${p.description || ""}
          </label>

          <label style="font-size:0.7rem;margin:2px 0;">
            Warranty:
            <b>${p.warranty} months</b>
          </label>

          <label style="font-size:0.95rem;margin:5px 0 2px 0;">
            <b>₹ ${p.price}</b> x <b>${p.qty}</b>
          </label>

          <label style="font-size:1.2rem;margin:2px 0;">
            <b>₹ ${p.price * p.qty}</b> Total
          </label>

        </div>

        <div style="display:flex;gap:5px;flex-direction:column;margin-bottom:10px;">

          <label style="font-size:1rem;">
            <b>${p.name}</b>
          </label>

          <label style="font-size:0.8rem;">
            <b>${p.mobile}</b>
          </label>

          <label style="font-size:0.8rem;">
            ${p.address}
          </label>

          <label style="font-size:0.7rem;">
            Quantity:
            <b>${p.qty}</b>
          </label>

          <label style="font-size:0.8rem;color:green;">
            <b>${p.stock} Product Available</b>
          </label>

        </div>

        <div style="display:flex;align-items: self-start;">
          ${actionBtns}
        </div>

      </div>

    </div>
    `;

    box.appendChild(div.firstElementChild);
  });
}

function manageOrders() {
  ShopkeeperOptionsBtns.innerHTML = `
    <div class="optBtn" onclick="defaultLoad()">Products</div> 
    <div class="optBtn hover" onclick="manageOrders()">Orders</div> 
    <div class="optBtn" onclick="manageSales()">Sales</div>
    <div class="optBtn" onclick="manageComplains()">Complains</div>
  `;

  ProductPage.innerHTML = `
    <fieldset style="padding-bottom:0;">
      <div id="ProductOptionsBtns">
        <div class="optBtn hover" id="pendingOrders">Pending</div>
        <div class="optBtn" id="shiftedOrders">Shipped</div>
        <div class="optBtn" id="completedOrders">Completed</div>
      </div>
    </fieldset>

    <div id="addingTask" style="margin:10px;background: transparent;border-radius:5px;"></div>
  `;

  // default
  loadVendorOrders("pending");

  document.getElementById("pendingOrders").onclick = () => {
    setActive("pendingOrders");
    loadVendorOrders("pending");
  };

  document.getElementById("shiftedOrders").onclick = () => {
    setActive("shiftedOrders");
    loadVendorOrders("shipped");
  };

  document.getElementById("completedOrders").onclick = () => {
    setActive("completedOrders");
    loadVendorOrders("delivered");
  };
}

function setActive(id) {
  ["pendingOrders", "shiftedOrders", "completedOrders"].forEach((i) => {
    document.getElementById(i).classList = "optBtn";
  });
  document.getElementById(id).classList = "optBtn hover";
}

//

async function manageSales() {
  closeOptMenus(false, false);

  ShopkeeperOptionsBtns.innerHTML = `
    <div class="optBtn" onclick="defaultLoad()">Products</div> 
    <div class="optBtn" onclick="manageOrders()">Orders</div> 
    <div class="optBtn hover" onclick="manageSales()">Sales</div>
    <div class="optBtn" onclick="manageComplains()">Complains</div>
  `;

  ProductPage.innerHTML = `
  
  <fieldset style="padding-bottom:0;">
  
    <div id="ProductOptionsBtns">
        <div class="optBtn hover" onclick="manageSales()">Dashboard</div>
        <div class="optBtn" id="onSite" onclick="onsiteSell()">On-Site Sell</div>
    </div>

  </fieldset>
 
  <style>
  .salesCard{
    background:#fff;
    padding:15px;
    border-radius:10px;
    box-shadow:0px 5px 10px #00000010;
    display:flex;
    flex-direction:column;
    gap:5px;
    color:#4c6381;
    font-family:"Montserrat Alternates",sans-serif;
}

.salesCard label{
    font-size:0.85rem;
}

.salesCard h2,
.salesCard h3{
    margin:0;
}
  </style>
  <fieldset>

    <div id="salesCards" 
      style="
      display:grid;
      grid-template-columns:repeat(auto-fit,minmax(220px,1fr));
      gap:10px;
      margin-bottom:15px;
      ">
    </div>

    <div id="topProducts"></div>

  </fieldset>
  `;

  console.log("Loading Sales Analytics...");

  const res = await fetch("./script/get_sales_analytics.php");
  const data = await res.json();

  console.log("SALES:", data);

  if (data.status !== "ok") {
    ProductPage.innerHTML = "<p>Failed Loading Sales</p>";
    return;
  }

  const cards = document.getElementById("salesCards");

  cards.innerHTML = `

    <div class="salesCard">
      <label>Total Revenue</label>
      <h2>₹${data.total_revenue}</h2>
    </div>

    <div class="salesCard">
      <label>Total Orders</label>
      <h2>${data.total_orders}</h2>
    </div>

    <div class="salesCard">
      <label>Total Complains</label>
      <h2>${data.total_issues}</h2>
    </div>

    <div class="salesCard">
      <label>Delivered Orders</label>
      <h2>${data.delivered_orders}</h2>
    </div>

    <div class="salesCard">
      <label>Pending Orders</label>
      <h2>${data.pending_orders}</h2>
    </div>

    <div class="salesCard" style="    background: #50c3ff;
    color: white;">
      <label>Most Selling Product</label>
      <h3>${data.top_product}</h3>
    </div>

    <div class="salesCard" style="background: #ff50a8;
    color: white;">
      <label>Highest Revenue Product</label>
      <h3>${data.high_revenue_product}</h3>
    </div>

    <div class="salesCard" style="background: #fc9541;
    color: white;">
      <label>Most Complained Product</label>
      <h3>${data.most_complained}</h3>
    </div>

    <div class="salesCard" style="    background: #ff5050;
    color: white;">
      <label>Low Stock Product</label>
      <h3>${data.low_stock}</h3>
    </div>

<div class="salesCard">
  <label>On-Site Best Seller</label>
  <h3>${data.onsite_best_seller}</h3>
</div>

  `;

  const top = document.getElementById("topProducts");

  top.innerHTML = `
    <div style="
      background:#fff;
      border-radius:10px;
      padding:15px;
      box-shadow:0px 5px 10px #00000010;
      ">

      <h3 style="margin:0 0 10px 0;color:#4c6381;">
        Product Performance
      </h3>

      <div id="productPerformance"></div>

    </div>
  `;

  let html = "";

  data.products.forEach((p) => {
    html += `
    
    <div style="
      display:flex;
      gap:10px;
      padding:10px 0;
      border-bottom:1px solid #eee;
      align-items:center;
    ">

      <img 
        src="./script/${p.image || "noimage.png"}"
        style="
          width:70px;
          height:70px;
          object-fit:cover;
          border-radius:8px;
        "
      >

      <div style="width:100%;">

        <label style="font-size:1rem;font-weight:600;">
          ${p.title}
        </label>

        <div style="
          display:flex;
          flex-wrap:wrap;
          gap:15px;
          margin-top:5px;
          font-size:0.85rem;
          color:#4c6381;
        ">

          <span>Sold: <b>${p.total_qty}</b></span>

          <span>Revenue: <b>₹${p.revenue}</b></span>

          <span>Stock: <b>${p.stock}</b></span>

          <span>Complains: <b>${p.complains}</b></span>

        </div>

      </div>

    </div>
    `;
  });

  document.getElementById("productPerformance").innerHTML = html;
}

// GLOBALS
let onsiteCart = [];
let onsiteProductsCache = [];
let onsiteSearchValue = "";

async function onsiteSell() {

  ProductPage.innerHTML = `

  <fieldset style="padding-bottom:0;">
  
    <div id="ProductOptionsBtns">
        <div class="optBtn" onclick="manageSales()">Dashboard</div>
        <div class="optBtn hover" id="onSite" onclick="onsiteSell()">On-Site Sell</div>
    </div>

  </fieldset>
  
  <fieldset>

    <div style="display:flex;justify-content:space-between;align-items:center;">
      <h2>On-Site Sell</h2>

      <button 
        onclick="showCustomerStep()"
        id="nextSellBtn"
        disabled
        style="
          background:#ccc;
          cursor:not-allowed;
        "
      >
        Next
      </button>
    </div>

    <div id="cartBox" style="margin:15px 0;"></div>

    <input 
      type="search"
      id="sellSearch"
      placeholder="Search Product"
      style="margin:10px 0;"
      value="${onsiteSearchValue}"
    >

    <div id="sellProducts"></div>

  </fieldset>
  `;

  // LOAD PRODUCTS
  if (!onsiteProductsCache.length) {

    const res = await fetch("./script/get_vendor_products.php");
    const result = await res.json();

    if (result.status !== "ok") return;

    onsiteProductsCache = result.data;
  }

  const all = onsiteProductsCache;

  const cart = onsiteCart;

  const cartBox = document.getElementById("cartBox");

  // CART RENDER
  function renderCart() {

    const nextBtn = document.getElementById("nextSellBtn");

    if (cart.length) {
      nextBtn.disabled = false;
      nextBtn.style.background = "#4c6381";
      nextBtn.style.color = "#fff";
      nextBtn.style.cursor = "pointer";
    } else {
      nextBtn.disabled = true;
      nextBtn.style.background = "#ccc";
      nextBtn.style.color = "#4c6381";
      nextBtn.style.cursor = "not-allowed";
    }

    if (!cart.length) {

      cartBox.innerHTML = `
      <div style="
        padding:20px;
        text-align:center;
        border:1px dashed #ccc;
        border-radius:10px;
        color:#4c6381;
        background:#fff;
      ">
        No Products Added
      </div>
      `;

      return;
    }

    let total = 0;

    cartBox.innerHTML = `
    
    <div style="
      background:#f5f8fc;
      padding:15px;
      border-radius:10px;
      margin-bottom:15px;
      border:1px solid #d9e2ec;
    ">

      <div style="
        display:flex;
        justify-content:space-between;
        align-items:center;
        margin-bottom:15px;
      ">
        <label style="
          font-size:1.1rem;
          font-weight:700;
          color:#4c6381;
        ">
          Selected Products
        </label>

        <label style="
          background:#4c6381;
          color:#fff;
          padding:5px 10px;
          border-radius:5px;
          font-size:0.8rem;
        ">
          ${cart.length} Items
        </label>
      </div>
    `;

    cart.forEach((p, i) => {

      const sub = p.price * p.qty;

      total += sub;

      cartBox.innerHTML += `
      
      <div style="
        display:flex;
        gap:10px;
        background:#fff;
        border-radius:10px;
        padding:10px;
        margin-bottom:10px;
        align-items:center;
        box-shadow:0 2px 8px #00000010;
      ">

        <img 
          src="./script/${p.image || "noimage.png"}"
          style="
            width:70px;
            height:70px;
            object-fit:cover;
            border-radius:8px;
            border:1px solid #ddd;
          "
        >

        <div style="flex:1;">

          <div style="
            font-size:1rem;
            font-weight:700;
            color:#4c6381;
          ">
            ${p.title}

            <span style="
              font-size:0.75rem;
              color:#777;
              font-weight:400;
            ">
              - ${p.category}
            </span>
          </div>

          <div style="font-size:0.9rem;">
            ₹${p.price} × ${p.qty}
          </div>

          <div style="
            font-size:1rem;
            font-weight:700;
            color:#4c6381;
          ">
            ₹${sub}
          </div>

        </div>

        <div style="
          display:flex;
          flex-direction:row;
          gap:5px;
        ">

          <button 
            onclick="changeQty(${i},1)"
            style="
              margin:0;
              background:#4c6381;
              color:#fff;
            "
          >+</button>

          <button 
            onclick="changeQty(${i},-1)"
            style="
              margin:0;
              background:#4c6381;
              color:#fff;
            "
          >-</button>

          <button 
            onclick="removeCartItem(${i})"
            style="
              margin:0;
              background:#ffebeb;
              color:red;
            "
          >
            Remove
          </button>

        </div>

      </div>
      `;
    });

    cartBox.innerHTML += `
    
    <div style="
      display:flex;
      justify-content:space-between;
      align-items:center;
      margin-top:10px;
      padding-top:10px;
      border-top:1px solid #ddd;
    ">

      <label style="
        font-size:1.1rem;
        font-weight:700;
        color:#4c6381;
      ">
        Total
      </label>

      <label style="
        font-size:1.5rem;
        font-weight:700;
        color:#4c6381;
      ">
        ₹${total}
      </label>

    </div>

    </div>
    `;
  }

  // PRODUCT RENDER
  function renderProducts(list) {

    const box = document.getElementById("sellProducts");

    box.innerHTML = "";

    list.forEach((p) => {

      const disabled = Number(p.stock) <= 0;

      const div = document.createElement("div");

      div.innerHTML = `
    
      <div id="orderdetailContainer" 
        style="
          margin-bottom:12px;
          border-radius:10px;
          overflow:hidden;
          background:#fff;
          box-shadow:0 2px 10px #00000010;
          display:flex;
        ">

        <div id="productImage" style="padding:10px;width:220px;height:150px;position:relative;">

          <img 
            src="./script/${p.image || "noimage.png"}"
            style="
              width:100%;
              height:100%;
              object-fit:cover;
            "
          >

          <div style="
            position:absolute;
            top:14px;
            left:14px;
            background:#fff;
            color:#4c6381;
            padding:5px 10px;
            border-radius:5px;
            font-size:0.7rem;
            font-weight:600;
          ">
            ${p.category}
          </div>

        </div>

        <div id="ProductEditInfo" 
          style="
            padding:15px;
            display:flex;
            flex-direction:column;
            justify-content:space-between;
            width:100%;
          ">

          <div>

            <label style="
              font-size:1.1rem;
              color:#4c6381;
              font-weight:700;
            ">
              ${p.title}
            </label>

            <br>

            <label style="
              font-size:0.85rem;
              margin:4px 0;
            ">
              ${p.description || ""}
            </label>

            <br>

            <label style="
              color:#4c6381;
              font-size:1.2rem;
              font-weight:700;
            ">
              ₹${p.price}
            </label>

            <br>

            <label style="
              font-size:0.8rem;
              color:${p.stock > 5 ? "green" : "#d97706"};
            ">
              ${p.stock} In Stock
            </label>

          </div>

          <div style="
            display:flex;
            justify-content:flex-end;
            margin-top:10px;
          ">

            ${disabled
          ?
          `
              <button 
                disabled
                style="
                  background:#ccc;
                  cursor:not-allowed;
                  margin:0;
                "
              >
                Out Of Stock
              </button>
              `
          :
          `
              <button 
                onclick='addToCart(${JSON.stringify(p)})'
                style="
                  margin:0;
                  background:#4c6381;
                  color:#fff;
                "
              >
                Add To Cart
              </button>
              `
        }

          </div>

        </div>

      </div>
      `;

      box.appendChild(div.firstElementChild);
    });
  }

  // ADD CART
  window.addToCart = function (p) {

    const exist = cart.find((x) => x.id == p.id);

    if (exist) {

      if (exist.qty >= Number(p.stock)) {
        alert("Stock Limit Reached");
        return;
      }

      exist.qty++;

    } else {

      if (Number(p.stock) <= 0) {
        alert("Out Of Stock");
        return;
      }

      cart.push({
        ...p,
        qty: 1,
      });
    }

    renderCart();
  };

  // CHANGE QTY
  window.changeQty = function (i, type) {

    if (type == 1) {

      if (cart[i].qty >= Number(cart[i].stock)) {
        alert("No More Stock");
        return;
      }

      cart[i].qty++;

    } else {

      cart[i].qty--;

      if (cart[i].qty <= 0) {
        cart.splice(i, 1);
      }
    }

    renderCart();
  };

  // REMOVE
  window.removeCartItem = function (i) {

    cart.splice(i, 1);

    renderCart();
  };

  // SEARCH
  document.getElementById("sellSearch").addEventListener("input", (e) => {

    onsiteSearchValue = e.target.value;

    const val = onsiteSearchValue.toLowerCase();

    const filtered = all.filter((p) =>
      p.title.toLowerCase().includes(val)
    );

    renderProducts(filtered);
  });

  // SELECT EXISTING CUSTOMER

  window.selectCustomer = async function (id) {

    if (!onsiteCart.length) {
      alert("Cart Empty");
      return;
    }

    try {

      const savePromises = onsiteCart.map(async (p) => {

        const fd = new FormData();

        fd.append("customer_id", id);
        fd.append("product_id", p.id);
        fd.append("qty", p.qty);
        fd.append("type", "offline_buy");

        return fetch("./script/order.php", {
          method: "POST",
          body: fd,
        });
      });

      const responses = await Promise.all(savePromises);

      const texts = await Promise.all(
        responses.map(r => r.text())
      );

      const failed = texts.find(t =>
        !t.toLowerCase().includes("order placed")
      );

      if (failed) {

        alert(failed || "Sale Failed");
        return;
      }

      alert("Offline Sale Saved");

      onsiteCart = [];
      onsiteSearchValue = "";

      onsiteSell();

    } catch (err) {

      console.log(err);

      alert("Sale Failed");
    }
  };

  // BACK
  window.backToSellProducts = function () {
    onsiteSell();
  };

  // CUSTOMER STEP 
  /*
  window.showCustomerStep = function () {

    if (!cart.length) {
      alert("Add products");
      return;
    }

    ProductPage.innerHTML = `

  <fieldset style="
    border:none;
    padding:15px;
    border-radius:12px;
  ">

    <div style="
      display:flex;
      justify-content:space-between;
      align-items:center;
      margin-bottom:15px;
    ">

      <h2 style="
        margin:0;
        color:#4c6381;
      ">
        Customer Details
      </h2>

      <button 
        onclick="backToSellProducts()"
        style="
          margin:0;
          background:#fff;
          color:#4c6381;
          border:1px solid #4c6381;
        "
      >
        ← Back
      </button>

    </div>

    <div style="
      background:#fff;
      padding:15px;
      border-radius:10px;
      margin-bottom:20px;
      box-shadow:0 2px 10px #00000010;
    ">

      <label style="
        font-size:0.9rem;
        color:#4c6381;
        font-weight:600;
        margin-bottom:8px;
        display:block;
      ">
        Search Existing Customer
      </label>

      <input 
        type="text"
        id="searchCustomer"
        placeholder="Enter Email or Mobile"
        style="
          width:100%;
          padding:12px;
          border-radius:8px;
          border:1px solid #ccd6e0;
          outline:none;
          font-size:0.9rem;
          margin-bottom:10px;
        "
      >

      <div 
        id="customerList"
        style="
          max-height:250px;
          overflow:auto;
        "
      ></div>

    </div>

    <div style="
      text-align:center;
      margin:20px 0;
      color:#4c6381;
      font-weight:700;
    ">
      OR CREATE NEW CUSTOMER
    </div>

    <form 
      id="offlineCustomerForm"
      style="
        width:55%;
        display:flex;
        flex-direction:column;
        gap:5px;
        background:#fff;
        padding:20px;
        border-radius:12px;
        box-shadow:0 2px 10px #00000010;
      "
    >

      <input 
        type="text" 
        id="name" 
        placeholder="Customer Name"
        style="
          padding:12px;
          border-radius:8px;
          border:1px solid #ccd6e0;
        "
      >

      <input 
        type="email" 
        id="email" 
        placeholder="Email"
        style="
          padding:12px;
          border-radius:8px;
          border:1px solid #ccd6e0;
        "
      >

      <input 
        type="number" 
        id="mobile" 
        placeholder="Mobile"
        style="
          padding:12px;
          border-radius:8px;
          border:1px solid #ccd6e0;
        "
      >

      <input 
        type="number" 
        id="pincode" 
        placeholder="Pincode"
        style="
          padding:12px;
          border-radius:8px;
          border:1px solid #ccd6e0;
        "
      >

      <textarea 
        id="address" 
        placeholder="Address"
        rows="4"
        style="
          padding:12px;
          border-radius:8px;
          border:1px solid #ccd6e0;
          resize:vertical;
        "
      ></textarea>

      <input type="hidden" id="lat">
      <input type="hidden" id="lng">

      <div 
        id="map" 
        style="
          height:320px;
          border-radius:12px;
          overflow:hidden;
          border:1px solid #ccd6e0;
        "
      ></div>

      <button 
        type="submit"
        style="
          margin-top:10px;
          background:#4c6381;
          color:#fff;
          padding:14px;
          border:none;
          border-radius:10px;
          font-size:1rem;
          font-weight:600;
        "
      >
        Proceed Sale
      </button>

    </form>

  </fieldset>
  `;

    // MAP
    let map = L.map("map").setView([23.0225, 72.5714], 13);

    setTimeout(() => {
      map.invalidateSize();
    }, 300);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png")
      .addTo(map);

    let marker;

    map.on("click", async function (e) {

      const { lat, lng } = e.latlng;

      document.getElementById("lat").value = lat;
      document.getElementById("lng").value = lng;

      if (marker) map.removeLayer(marker);

      marker = L.marker([lat, lng]).addTo(map);

      const res = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
      );

      const data = await res.json();

      document.getElementById("address").value =
        data.display_name || "";
    });

    // PINCODE
    const pincode = document.getElementById("pincode");

    let lastPin = "";

    pincode.addEventListener("input", async () => {

      if (pincode.value.length !== 6 || pincode.value === lastPin) return;

      lastPin = pincode.value;

      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${pincode.value}`
      );

      const data = await res.json();

      if (data.length) {

        const lat = data[0].lat;
        const lon = data[0].lon;

        map.setView([lat, lon], 15);

        if (marker) map.removeLayer(marker);

        marker = L.marker([lat, lon]).addTo(map);

        document.getElementById("lat").value = lat;
        document.getElementById("lng").value = lon;
      }
    });

    // SEARCH CUSTOMER
    document
      .getElementById("searchCustomer")
      .addEventListener("input", async (e) => {

        const val = e.target.value.trim();

        const box = document.getElementById("customerList");

        if (val.length < 3) {
          box.innerHTML = "";
          return;
        }

        const fd = new FormData();

        fd.append("search", val);

        const res = await fetch("./script/search_customer.php", {
          method: "POST",
          body: fd,
        });

        const result = await res.json();

        box.innerHTML = "";

        if (result.status !== "ok") return;

        result.data.forEach((c) => {

          box.innerHTML += `
          
          <div 
            onclick="selectCustomer(${c.customer_id})"
            style="
              padding:12px;
              border:1px solid #dde5ef;
              border-radius:10px;
              margin-bottom:10px;
              cursor:pointer;
              background:#fff;
            "
          >

            <div style="
              font-size:1rem;
              color:#4c6381;
              font-weight:700;
            ">
              ${c.name}
            </div>

            <div style="
              font-size:0.85rem;
              margin-top:4px;
            ">
              ${c.mobile}
            </div>

            <div style="
              font-size:0.8rem;
              color:#666;
            ">
              ${c.email}
            </div>

          </div>
          `;
        });
      });

    // CREATE CUSTOMER + SALE
    // CREATE CUSTOMER + SALE
    document
      .getElementById("offlineCustomerForm")
      .addEventListener("submit", async (e) => {

        e.preventDefault();

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const mobile = document.getElementById("mobile").value.trim();
        const pincode = document.getElementById("pincode").value.trim();
        const address = document.getElementById("address").value.trim();

        if (!name || !mobile || !address) {
          alert("Fill Required Fields");
          return;
        }

        // CHECK EXISTING CUSTOMER
        const checkFd = new FormData();

        checkFd.append("email", email);
        checkFd.append("mobile", mobile);

        const checkRes = await fetch("./script/check_customer_exists.php", {
          method: "POST",
          body: checkFd,
        });

        const checkResult = await checkRes.json();

        if (checkResult.status === "exists") {

          const useOld = confirm(
            `Customer Already Exists\n\n${checkResult.data.name}\n${checkResult.data.mobile}\n\nUse Existing Customer?`
          );

          if (useOld) {

            selectCustomer(checkResult.data.customer_id);

            return;
          }

          return;
        }

        // CREATE NEW CUSTOMER
        const fd = new FormData();

        fd.append("name", name);
        fd.append("email", email);
        fd.append("mobile", mobile);
        fd.append("pincode", pincode);
        fd.append("address", address);
        fd.append("lat", document.getElementById("lat").value);
        fd.append("lng", document.getElementById("lng").value);

        const res = await fetch("./script/create_customer_offline.php", {
          method: "POST",
          body: fd,
        });

        const result = await res.json();

        if (result.status !== "ok") {
          alert(result.message || "Customer Error");
          return;
        }

        // SAVE SALE
        const sale = new FormData();

        sale.append("customer_id", result.customer_id);

        sale.append(
          "products",
          JSON.stringify(
            onsiteCart.map((p) => ({
              product_id: p.id,
              qty: p.qty,
            }))
          )
        );

        const save = await fetch("./script/save_offline_sale.php", {
          method: "POST",
          body: sale,
        });

        const s = await save.json();

        if (s.status === "ok") {

          alert("Offline Sale Complete");

          onsiteCart = [];
          onsiteSearchValue = "";

          onsiteSell();

        } else {

          alert(s.message || "Sale Failed");
        }
      });
  }; */

  window.showCustomerStep = function () {

    if (!onsiteCart.length) {
      alert("Add products");
      return;
    }

    ProductPage.innerHTML = `

  <fieldset style="
    border:none;
    padding:15px;
    border-radius:12px;
  ">

    <div style="
      display:flex;
      justify-content:space-between;
      align-items:center;
      margin-bottom:15px;
    ">

      <h2 style="
        margin:0;
        color:#4c6381;
      ">
        Customer Details
      </h2>

      <button 
        onclick="backToSellProducts()"
        style="
          margin:0;
          background:#fff;
          color:#4c6381;
          border:1px solid #4c6381;
        "
      >
        ← Back
      </button>

    </div>

    <div style="
      background:#fff;
      padding:15px;
      border-radius:10px;
      margin-bottom:20px;
      box-shadow:0 2px 10px #00000010;
    ">

      <label style="
        font-size:0.9rem;
        color:#4c6381;
        font-weight:600;
        margin-bottom:8px;
        display:block;
      ">
        Search Existing Customer
      </label>

      <input 
        type="text"
        id="searchCustomer"
        placeholder="Enter Email or Mobile"
        style="
          width:100%;
          padding:12px;
          border-radius:8px;
          border:1px solid #ccd6e0;
          outline:none;
          font-size:0.9rem;
          margin-bottom:10px;
        "
      >

      <div 
        id="customerList"
        style="
          max-height:250px;
          overflow:auto;
        "
      ></div>

    </div>

    <div style="
      text-align:center;
      margin:20px 0;
      color:#4c6381;
      font-weight:700;
    ">
      OR CREATE NEW CUSTOMER
    </div>

    <form 
      id="offlineCustomerForm"
      style="
        width:55%;
        display:flex;
        flex-direction:column;
        gap:10px;
        background:#fff;
        padding:20px;
        border-radius:12px;
        box-shadow:0 2px 10px #00000010;
      "
    >

      <input 
        type="text" 
        id="name" 
        placeholder="Customer Name"
        style="
          padding:12px;
          border-radius:8px;
          border:1px solid #ccd6e0;
        "
      >

      <input 
        type="email" 
        id="email" 
        placeholder="Email"
        style="
          padding:12px;
          border-radius:8px;
          border:1px solid #ccd6e0;
        "
      >

      <input 
        type="number" 
        id="mobile" 
        placeholder="Mobile"
        style="
          padding:12px;
          border-radius:8px;
          border:1px solid #ccd6e0;
        "
      >

      <input 
        type="number" 
        id="pincode" 
        placeholder="Pincode"
        style="
          padding:12px;
          border-radius:8px;
          border:1px solid #ccd6e0;
        "
      >

      <textarea 
        id="address" 
        placeholder="Address"
        rows="4"
        style="
          padding:12px;
          border-radius:8px;
          border:1px solid #ccd6e0;
          resize:vertical;
        "
      ></textarea>

      <input type="hidden" id="lat">
      <input type="hidden" id="lng">

      <div 
        id="map" 
        style="
          height:320px;
          border-radius:12px;
          overflow:hidden;
          border:1px solid #ccd6e0;
        "
      ></div>

      <button 
        type="submit"
        style="
          margin-top:10px;
          background:#4c6381;
          color:#fff;
          padding:14px;
          border:none;
          border-radius:10px;
          font-size:1rem;
          font-weight:600;
          cursor:pointer;
        "
      >
        Proceed Sale
      </button>

    </form>

  </fieldset>
  `;

    // MAP
    let map = L.map("map").setView([23.0225, 72.5714], 13);

    setTimeout(() => {
      map.invalidateSize();
    }, 300);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png")
      .addTo(map);

    let marker;

    map.on("click", async function (e) {

      const { lat, lng } = e.latlng;

      document.getElementById("lat").value = lat;
      document.getElementById("lng").value = lng;

      if (marker) map.removeLayer(marker);

      marker = L.marker([lat, lng]).addTo(map);

      const res = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
      );

      const data = await res.json();

      document.getElementById("address").value =
        data.display_name || "";
    });

    // PINCODE
    const pincode = document.getElementById("pincode");

    let lastPin = "";

    pincode.addEventListener("input", async () => {

      if (pincode.value.length !== 6 || pincode.value === lastPin) return;

      lastPin = pincode.value;

      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${pincode.value}`
      );

      const data = await res.json();

      if (data.length) {

        const lat = data[0].lat;
        const lon = data[0].lon;

        map.setView([lat, lon], 15);

        if (marker) map.removeLayer(marker);

        marker = L.marker([lat, lon]).addTo(map);

        document.getElementById("lat").value = lat;
        document.getElementById("lng").value = lon;
      }
    });

    // SEARCH CUSTOMER
    document
      .getElementById("searchCustomer")
      .addEventListener("input", async (e) => {

        const val = e.target.value.trim();

        const box = document.getElementById("customerList");

        if (val.length < 3) {
          box.innerHTML = "";
          return;
        }

        const fd = new FormData();

        fd.append("search", val);

        const res = await fetch("./script/search_customer.php", {
          method: "POST",
          body: fd,
        });

        const result = await res.json();

        box.innerHTML = "";

        if (result.status !== "ok") return;

        result.data.forEach((c) => {

          box.innerHTML += `
        
        <div 
          onclick="selectCustomer(${c.customer_id})"
          style="
            padding:12px;
            border:1px solid #dde5ef;
            border-radius:10px;
            margin-bottom:10px;
            cursor:pointer;
            background:#fff;
          "
        >

          <div style="
            font-size:1rem;
            color:#4c6381;
            font-weight:700;
          ">
            ${c.name}
          </div>

          <div style="
            font-size:0.85rem;
            margin-top:4px;
          ">
            ${c.mobile}
          </div>

          <div style="
            font-size:0.8rem;
            color:#666;
          ">
            ${c.email}
          </div>

        </div>
        `;
        });
      });

    // CREATE CUSTOMER + OFFLINE ORDER
    document
      .getElementById("offlineCustomerForm")
      .addEventListener("submit", async (e) => {

        e.preventDefault();

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const mobile = document.getElementById("mobile").value.trim();
        const pincode = document.getElementById("pincode").value.trim();
        const address = document.getElementById("address").value.trim();

        if (!name || !mobile || !address) {
          alert("Fill Required Fields");
          return;
        }

        // CHECK EXISTING CUSTOMER
        const checkFd = new FormData();

        checkFd.append("email", email);
        checkFd.append("mobile", mobile);

        const checkRes = await fetch("./script/check_customer_exists.php", {
          method: "POST",
          body: checkFd,
        });

        const checkResult = await checkRes.json();

        if (checkResult.status === "exists") {

          const useOld = confirm(
            `Customer Already Exists\n\n${checkResult.data.name}\n${checkResult.data.mobile}\n\nUse Existing Customer?`
          );

          if (useOld) {

            selectCustomer(checkResult.data.customer_id);

            return;
          }

          return;
        }

        // CREATE CUSTOMER
        const fd = new FormData();

        fd.append("name", name);
        fd.append("email", email);
        fd.append("mobile", mobile);
        fd.append("pincode", pincode);
        fd.append("address", address);
        fd.append("lat", document.getElementById("lat").value);
        fd.append("lng", document.getElementById("lng").value);

        const res = await fetch("./script/create_customer_offline.php", {
          method: "POST",
          body: fd,
        });

        const result = await res.json();

        if (result.status !== "ok") {
          alert(result.message || "Customer Error");
          return;
        }

        // SAVE OFFLINE ORDERS
        const savePromises = onsiteCart.map(async (p) => {

          const sale = new FormData();

          sale.append("customer_id", result.customer_id);
          sale.append("product_id", p.id);
          sale.append("qty", p.qty);
          sale.append("type", "offline_buy");

          return fetch("./script/order.php", {
            method: "POST",
            body: sale,
          });
        });

        await Promise.all(savePromises);

        alert("Offline Sale Complete");

        onsiteCart = [];
        onsiteSearchValue = "";

        onsiteSell();
      });
  };

  renderProducts(all);
  renderCart();
}

async function manageComplains() {
  ShopkeeperOptionsBtns.innerHTML = `
    <div class="optBtn" onclick="defaultLoad()">Products</div> 
    <div class="optBtn" onclick="manageOrders()">Orders</div> 
    <div class="optBtn" onclick="manageSales()">Sales</div>
    <div class="optBtn hover" onclick="manageComplains()">Complains</div>
  `;

  ProductPage.innerHTML = `
    <fieldset style="padding-bottom:0;">

      <div id="ProductOptionsBtns">
        <div class="optBtn hover" id="allC">Pending</div>
        <div class="optBtn" id="procC">Processing</div>
        <div class="optBtn" id="apprC">Approved</div>
        <div class="optBtn" id="resC">Resolved</div>
      </div>

    </fieldset>

    <div id="addingTask"
      style="margin:10px;background:transparent;border-radius:5px;box-shadow:none;">
    </div>
  `;

  const container = document.getElementById("addingTask");

  let currentTab = "all";

  async function loadIssues() {
    const res = await fetch("./script/get_issues_vendor.php");
    const result = await res.json();

    console.log("ISSUES:", result);

    if (result.status !== "ok") {
      container.innerHTML = `
        <p style="text-align:center;">
          Error loading complaints
        </p>
      `;
      return;
    }

    render(result.data);
  }

  function setActive(tab) {
    currentTab = tab;

    document.getElementById("allC").classList = "optBtn";
    document.getElementById("procC").classList = "optBtn";
    document.getElementById("apprC").classList = "optBtn";
    document.getElementById("resC").classList = "optBtn";

    if (tab === "pending") {
      document.getElementById("allC").classList = "optBtn hover";
    }

    if (tab === "processing") {
      document.getElementById("procC").classList = "optBtn hover";
    }

    if (tab === "approved") {
      document.getElementById("apprC").classList = "optBtn hover";
    }

    if (tab === "resolved") {
      document.getElementById("resC").classList = "optBtn hover";
    }
  }

  function render(allData) {
    container.innerHTML = "";

    let data = allData;

    if (currentTab === "pending") {
      data = allData.filter((i) => i.status === "pending");
    }

    if (currentTab === "processing") {
      data = allData.filter((i) => i.status === "processing");
    }

    if (currentTab === "approved") {
      data = allData.filter((i) => i.status === "approved");
    }

    if (currentTab === "resolved") {
      data = allData.filter((i) => i.status === "resolved");
    }

    if (!data.length) {
      container.innerHTML = `
        <p style="text-align:center;padding:20px;">
          No Complains
        </p>
      `;
      return;
    }

    data.forEach((p) => {
      const div = document.createElement("div");

      div.innerHTML = `
      <div id="orderdetailContainer"
        style="background:#fff;margin-bottom:10px;display:flex;border-radius:5px;">

        <div id="productImage">

          <div id="editImage"
            style="position:absolute;margin:5px;background:#dfebff;border-radius:5px;padding:5px 10px;font-size:0.6rem;">
            ${p.category}
          </div>

          <img src="./script/${p.image || "noimage.png"}">

        </div>

        <div id="ProductEditInfo"
          style="display:flex;justify-content:space-between;padding:0 10px 0 0;width:stretch;">

          <div style="margin:0;padding:10px 0 0 10px;display:flex;flex-direction:column;width:30%;">

            <label style="font-size:1rem;">
              <b>${p.title}</b>
            </label>

            <label style="font-size:0.8rem;">
              <i>${p.category}</i>
            </label>

            <label style="font-size:0.8rem;">
              ${p.pdesc || ""}
            </label>

            <label style="font-size:0.7rem;">
              Warranty <b>${p.warranty} months</b>
            </label>

            <label style="font-size:1.2rem;">
              <b>₹ ${p.price}</b>
            </label>

          </div>

          <div style="margin:0;padding:10px 0 0 10px;display:flex;flex-direction:column;">

            <label style="font-size:0.8rem;margin:3px 0;">
              <b>Problem</b>
            </label>

            <input value="${p.issue}" readonly>

            <label style="font-size:0.8rem;margin:3px 0;">
              <b>Explain Issue</b>
            </label>

            <textarea rows="3" readonly>${p.description || ""}</textarea>

          </div>

          <div style="margin:0;padding:10px 0 0 10px;display:flex;gap:5px;flex-direction:column;width:30%;">

            <label style="font-size:1rem;">
              <b>${p.name}</b>
            </label>

            <label style="font-size:0.8rem;">
              <b>${p.mobile}</b>
            </label>

            <label style="font-size:0.8rem;">
              ${p.address}
            </label>

            <label style="font-size:0.7rem;">
              Qty <b>${p.qty}</b>
            </label>

            <label style="font-size:0.7rem;">
              Raised: <b>${p.created_at}</b>
            </label>

          </div>

          
          <div style="display:flex;flex-direction: column;align-items:end;margin:0;padding:10px 0 10px 10px;">

            <div>

              <select id="issue_status_${p.id}">

                <option value="pending"
                  ${p.status == "pending" ? "selected" : ""}>
                  Pending
                </option>

                <option value="processing"
                  ${p.status == "processing" ? "selected" : ""}>
                  Processing
                </option>

                <option value="approved"
                  ${p.status == "approved" ? "selected" : ""}>
                  Approved
                </option>

                <option value="resolved"
                  ${p.status == "resolved" ? "selected" : ""}>
                  Resolved
                </option>

              </select>

            </div>

            <div>

              <button
                type="button"
                style="margin:0;"
                onclick="updateIssueStatus(${p.id})">

                Save

              </button>

            </div>

          </div>

        </div>

      </div>
      `;

      container.appendChild(div.firstElementChild);
    });
  }

  window.updateIssueStatus = async function (id) {
    const status = document.getElementById(`issue_status_${id}`).value;

    console.log("Update:", id, status);

    const fd = new FormData();
    fd.append("id", id);
    fd.append("status", status);

    try {
      const res = await fetch("./script/update_issue.php", {
        method: "POST",
        body: fd,
      });

      const r = await res.text();

      console.log(r);

      // ✅ auto refresh current tab
      loadIssues();
    } catch (err) {
      console.log(err);
    }
  };

  document.getElementById("allC").onclick = () => {
    setActive("pending");
    loadIssues();
  };

  document.getElementById("procC").onclick = () => {
    setActive("processing");
    loadIssues();
  };

  document.getElementById("apprC").onclick = () => {
    setActive("approved");
    loadIssues();
  };

  document.getElementById("resC").onclick = () => {
    setActive("resolved");
    loadIssues();
  };

  setActive("pending");

  loadIssues();
}
