const welcomeVendor = document.getElementById("welcomeVendor");
const ShopkeeperOptionsBtns = document.getElementById("ShopkeeperOptionsBtns");
const ShopkeeperProcessArea = document.getElementById("ShopkeeperProcessArea");
const ProductPage = document.getElementById("ProductPage");

async function checkAuth() {
  try {
    const res = await fetch("./script/verify.php");
    const data = await res.text();

    if (data === "valid") {
      // document.getElementById("AddingTaskForm").style.display = "block";
      manageShop();
    } else {
      // not logged → force login
      Login();
    }
  } catch (err) {
    showLogin();
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

function defaultLoad() {
  let isLoggedin = true;

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

    welcomeVendor.innerHTML = ` 
            <span id="ShopDets">Welcome, <b><i id="NameOfTheVendor">Vendor</i></b> <br />
                <span id="NameOfTheShop">Best Tech Shop</span>
            </span>
            <span id="theTime" style="display: flex;flex-direction: column;">            
            </span> 
        `;

    ShopkeeperOptionsBtns.innerHTML = ` <div class="optBtn hover" onclick="loadAllProds()">Products</div> 
                <div class="optBtn" onclick="manageOrders()" >Orders</div> 
                <div class="optBtn" onclick="manageSales()" >Sell</div>
                <div class="optBtn" onclick="manageComplains()" >Complains</div>
            `;

    loadAllProds();
    closeOptMenus(false, false);
  }
}
defaultLoad();

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
            <button style="margin:0 5px 0 0;" onclick="updateProduct(${
              p.id
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
        "<p style='text-align: center;'>No products found</p>";
      return;
    }

    data.forEach((p) => {
      // console.log(p)
      const card = document.createElement("div");
      card.className = "product";

      card.innerHTML = `
        <img src="./script/${p.image || "noimage.png"}" alt="">
        <span style="position:absolute;font-size:0.7rem;background-color:white;padding:5px 8px;border-radius:5px;margin:5px;box-shadow:0px 0px 5px #e1e1e1;">${
          p.category
        }</span>
        
        <div style="display:flex;flex-direction:column;">
          <span id="productName"><b>${p.title}</b></span>
          <span style="font-size:0.8rem;font-weight:400;margin:3px 0;">${p.description || ""}</span>
          <span style="font-size:1rem;font-weight:600;margin:3px 0;"><small>${p.warranty} Months Warranty</small></span>
          <span style="font-size:1.2rem;font-weight:700;margin:3px 0;">₹ ${p.price}</span>
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
                <div class="optBtn" onclick="loadAllProds()">All</div>
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
                                          <option value="Laptop" selected>Laptop</option>
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
    <input type="password" id="pass" name="pass">

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

function manageOrders___() {
  ShopkeeperOptionsBtns.innerHTML = `<div class="optBtn" onclick="loadAllProds()">Products</div> 
                <div class="optBtn hover" onclick="manageOrders()" >Orders</div> 
                <div class="optBtn" onclick="manageSales()" >Sell</div>
                <div class="optBtn" onclick="manageComplains()" >Complains</div>
    `;

  function pendingOrders() {
    document.getElementById("pendingOrders").classList = "optBtn hover";
    document.getElementById("shiftedOrders").classList = "optBtn";
    document.getElementById("completedOrders").classList = "optBtn";

    document.getElementById("addingTask").innerHTML = `
            <div id="ListingOrderItems" >
                <div id="orderdetailContainer" style="margin-bottom: 10px;">
                    <div id="editImage"
                        style="position: absolute;margin: 5px;background-color: #dfebff; border-radius: 5px;padding: 5px 10px;font-size: 0.6rem;">
                        Laptop
                    </div>
                    <div id="productImage">
                        <img src="https://images.unsplash.com/photo-1496181133206-80ce9b88a853" alt="">
                    </div>
                    <div id="ProductEditInfo">
                        <form id="AddingTaskForm">
                            <label style="font-size: 1rem;"><b>HP Pavilion i5</b></label>
                            <label style="font-size: 0.8rem;"><i>HP</i></label>
                            <label style="font-size: 0.8rem;font-weight: 400;">Intel i5, 16GB RAM, 512GB SSD</label>
                            <label style="font-size: 0.7rem;"><span>Warranty</span> <b> 2 years</b></label>
                            <label style="font-size: 1.2rem;"><b>₹ 58000</b></label>
                            <div style="margin-bottom:5px ;">
                                <label for="cashOnDel">Cash On Delivery</label>
                            </div>
                        </form>
                        <form id="AddingTaskForm">
                            <label style="font-size: 1rem;"><b>Alison Jonson</b></label>
                            <label style="font-size: 0.8rem;"><b>9864626362</b></label>
                            <label style="font-size: 0.8rem;font-weight: 400;">1, Alpha city, Near RiverSide Hotel, Ahmedabad - 360028</label>
                            <label style="font-size: 0.7rem;"><span>Quantity</span> <b> 1</b></label>
                            <label style="font-size: 0.8rem;color:green;"><b>8 Product Available</b></label>    
                        </form>
                        <form style="display:flex;align-items: flex-end;margin: 0;">
                            <div>
                                <label for="status"></label>
                                <select name="status" id="status">
                                    <option value="Packed" selected>Processing</option>
                                    <option value="Packed" >Shipped</option>
                                    <option value="Packed" >Out for Delivery</option>
                                    <option value="Packed" >Completed</option>
                                </select>
                            </div>
                            <span>
                                <button type="submit" style="margin: 0;">Accept</button>
                                <button type="reset" style="margin: 0;">Deny</button>
                            </span>
                        </form>
                    </div>
                    <div id="closeTable" style="display:none;border-radius:5px;background-color:#4c6381;color: #fff;height: max-content;cursor:pointer;">
                        <span class="material-symbols-outlined" style="font-size: 1rem;padding: 5px;">close</span>
                    </div>
                </div>
            </div>
        `;
  }

  function shiftedOrders() {
    document.getElementById("pendingOrders").classList = "optBtn";
    document.getElementById("shiftedOrders").classList = "optBtn hover";
    document.getElementById("completedOrders").classList = "optBtn";

    document.getElementById("addingTask").innerHTML = `
            <div id="ListingOrderItems" >
                <div id="orderdetailContainer" style="margin-bottom: 10px;">
                    <div id="editImage"
                        style="position: absolute;margin: 5px;background-color: #dfebff; border-radius: 5px;padding: 5px 10px;font-size: 0.6rem;">
                        Laptop
                    </div>
                    <div id="productImage">
                        <img src="https://images.unsplash.com/photo-1496181133206-80ce9b88a853" alt="">
                    </div>
                    <div id="ProductEditInfo">
                        <form id="AddingTaskForm">
                            <label style="font-size: 1rem;"><b>HP Pavilion i5</b></label>
                            <label style="font-size: 0.8rem;"><i>HP</i></label>
                            <label style="font-size: 0.8rem;font-weight: 400;">Intel i5, 16GB RAM, 512GB SSD</label>
                            <label style="font-size: 0.7rem;"><span>Warranty</span> <b> 2 years</b></label>
                            <label style="font-size: 1.2rem;"><b>₹ 58000</b></label>
                            <div style="margin-bottom:5px ;">
                                <label for="cashOnDel">Cash On Delivery</label>
                            </div>
                        </form>
                        <form id="AddingTaskForm">
                            <label style="font-size: 1rem;"><b>Alison Jonson</b></label>
                            <label style="font-size: 0.8rem;"><b>9864626362</b></label>
                            <label style="font-size: 0.8rem;font-weight: 400;">1, Alpha city, Near RiverSide Hotel, Ahmedabad - 360028</label>
                            <label style="font-size: 0.7rem;"><span>Quantity</span> <b> 1</b></label>
                            <label style="font-size: 0.8rem;color:green;"><b>8 Product Available</b></label>    
                        </form>
                        <form style="display:flex;align-items: flex-end;margin: 0;">
                            <div>
                                <label for="status"></label>
                                <select name="status" id="status">
                                    <option value="Packed" >Processing</option>
                                    <option value="Packed" selected >Shipped</option>
                                    <option value="Packed" >Out for Delivery</option>
                                    <option value="Packed" >Completed</option>
                                </select>
                            </div>
                            <div>
                                <button type="submit" style="margin: 0;">Save</button>
                                <button type="button" style="display:none;margin: 0;">Deny</button>
                            </div>
                        </form>
                    </div>
                    <div id="closeTable" style="display:none;border-radius:5px;background-color:#4c6381;color: #fff;height: max-content;cursor:pointer;">
                        <span class="material-symbols-outlined" style="font-size: 1rem;padding: 5px;">close</span>
                    </div>
                </div>
            </div>
        `;
  }

  function completedOrders() {
    document.getElementById("pendingOrders").classList = "optBtn";
    document.getElementById("shiftedOrders").classList = "optBtn";
    document.getElementById("completedOrders").classList = "optBtn hover";

    document.getElementById("addingTask").innerHTML = `
            <div id="ListingOrderItems" >
                <div id="orderdetailContainer" style="margin-bottom: 10px;">
                    <div id="editImage"
                        style="position: absolute;margin: 5px;background-color: #dfebff; border-radius: 5px;padding: 5px 10px;font-size: 0.6rem;">
                        Laptop
                    </div>
                    <div id="productImage">
                        <img src="https://images.unsplash.com/photo-1496181133206-80ce9b88a853" alt="">
                    </div>
                    <div id="ProductEditInfo">
                        <form id="AddingTaskForm">
                            <label style="font-size: 1rem;"><b>HP Pavilion i5</b></label>
                            <label style="font-size: 0.8rem;"><i>HP</i></label>
                            <label style="font-size: 0.8rem;font-weight: 400;">Intel i5, 16GB RAM, 512GB SSD</label>
                            <label style="font-size: 0.7rem;"><span>Warranty</span> <b> 2 years</b></label>
                            <label style="font-size: 1.2rem;"><b>₹ 58000</b></label>
                            <div style="margin-bottom:5px ;">
                                <label for="cashOnDel">Cash On Delivery</label>
                            </div>
                        </form>
                        <form id="AddingTaskForm">
                            <label style="font-size: 1rem;"><b>Alison Jonson</b></label>
                            <label style="font-size: 0.8rem;"><b>9864626362</b></label>
                            <label style="font-size: 0.8rem;font-weight: 400;">1, Alpha city, Near RiverSide Hotel, Ahmedabad - 360028</label>
                            <label style="font-size: 0.7rem;"><span>Quantity</span> <b> 1</b></label>
                            <label style="font-size: 0.8rem;color:green;"><b>Delivery Successfull</b></label>    
                        </form>
                        <form style="display:none;align-items: flex-end;margin: 0;">
                            <div>
                                <label for="status"></label>
                                <select name="status" id="status">
                                    <option value="Packed" >Processing</option>
                                    <option value="Packed" selected >Shipped</option>
                                    <option value="Packed" >Out for Delivery</option>
                                    <option value="Packed" >Completed</option>
                                </select>
                            </div>
                            <div style="display:none">
                                <button type="submit" style="margin: 0;">Save</button>
                                <button type="button" style="margin: 0;">Deny</button>
                            </div>

                        </form>
                            <div>
                                <span>Ordered On: <b>30/02/2026</b></span> <br>
                                <span>Delivered On: <b>04/03/2026</b></span>
                            </div>
                    </div>
                    <div id="closeTable" style="display:none;border-radius:5px;background-color:#4c6381;color: #fff;height: max-content;cursor:pointer;">
                        <span class="material-symbols-outlined" style="font-size: 1rem;padding: 5px;">close</span>
                    </div>
                </div>
            </div>
        `;
  }

  ProductPage.innerHTML = `
            <fieldset style="padding-bottom:0;">
            <div id="ProductOptionsBtns">
                <div class="optBtn" id="pendingOrders">Pending</div>
                <div class="optBtn" id="shiftedOrders">Shifted</div>
                <div class="optBtn" id="completedOrders">Completed</div>
            </div>
            </fieldset>

            <div id="addingTask" style="margin: 10px; background-color: #fff; border-radius: 5px; box-shadow: 0px 7px 10px #0000000f; ">
                    

                </div>
            </div>
        `;

  pendingOrders();

  document.getElementById("pendingOrders").addEventListener("click", () => {
    pendingOrders();
  });
  document.getElementById("shiftedOrders").addEventListener("click", () => {
    shiftedOrders();
  });
  document.getElementById("completedOrders").addEventListener("click", () => {
    completedOrders();
  });
}




async function changeStatus(order_id, el) {
  console.log("STATUS:", order_id, el.value);

  const fd = new FormData();
  fd.append("order_id", order_id);
  fd.append("status", el.value);

  console.log(fd.order_id);


  const r = await fetch("./script/update_order_status.php", {
    method: "POST",
    body: fd
  });

  console.log(await r.text());
}

async function acceptOrder(id) {
  console.log("ACCEPT:", id);
  changeStatus(id, {value:"shipped"});
}

async function denyOrder(id) {
  console.log("DENY:", id);

  if (!confirm("Deny order?")) return;

  const fd = new FormData();
  fd.append("order_id", id);

  const r = await fetch("./script/deny_order.php", {
    method: "POST",
    body: fd
  });

  alert(await r.text());
  manageVendorOrders();
}

function updateOrderStatus(order_id, select ) {

  const status = select.value;

  console.log("Update:", order_id, status);

  const data = new FormData();
  data.append("order_id", order_id);
  data.append("status", status);

  fetch("./script/update_order_status.php", {
    method: "POST",
    body: data
  })
  .then(r => r.text())
  .then(res => {
    console.log(res);
    alert(res);
  });
}

async function loadVendorOrders(type) {

  const container = document.getElementById("addingTask");

  const info = await fetch("./script/get_vendor_orders.php");
  const resultdata = await info.json();

  console.log("VENDOR:", resultdata);

  if (resultdata.status !== "ok") return;

  const list = resultdata.data.filter(o => o.status === type);

  if (!list.length) {
    container.innerHTML = "<p style='padding:10px'>No Orders</p>";
    return;
  }

  container.innerHTML = `<div id="ListingOrderItems"></div>`;
  const box = document.getElementById("ListingOrderItems");

  list.forEach(p => {

    let actionBtns = "";
    let selectBlock = "";

    // ✅ pending
    if (type === "pending") {
      selectBlock = `
        <select onchange="changeStatus(${p.id}, this)">
          <option value="pending" selected>Processing</option>
          <option value="shipped">Shipped</option>
          <option value="delivered">Completed</option>
        </select>`;

      actionBtns = `
        <button onclick="acceptOrder(${p.id})">Accept</button>
        <button onclick="denyOrder(${p.id})">Deny</button>`;
    }

    // ✅ shipped
    if (type === "shipped") {
      selectBlock = `
        <select onchange="updateOrderStatus(ORDER_ID, this)">
  <option value="pending">Pending</option>
  <option value="shipped">Shipped</option>
  <option value="delivered">Delivered</option>
</select>`;

      actionBtns = `<button onclick="changeStatus(${p.id}, {value:'delivered'})">Mark Delivered</button>`;
    }

    // ✅ delivered
    if (type === "delivered") {
      actionBtns = `
        <label style="color:green;"><b>Delivery Successful</b></label>
        <div>
          <span>Ordered On: <b>${p.created_at || "-"}</b></span><br>
        </div>`;
    }

    const div = document.createElement("div");

    div.innerHTML = `
    <div id="orderdetailContainer" style="margin-bottom:10px;">

      <div id="editImage"
        style="position:absolute;margin:5px;background:#dfebff;border-radius:5px;padding:5px 10px;font-size:0.6rem;">
        ${p.category}
      </div>

      <div id="productImage">
        <img src="./script/${p.image || 'noimage.png'}">
      </div>

      <div id="ProductEditInfo">

        <form>
          <label style="font-size:1rem;"><b>${p.title}</b></label>
          <label style="font-size:0.8rem;"><i>${p.category}</i></label>
          <label style="font-size:0.8rem;">${p.description}</label>
          <label style="font-size:0.7rem;"><span>Warranty</span> <b>${p.warranty} months</b></label>
          <label style="font-size:1.2rem;"><b>₹ ${p.price}</b></label>
          <div><label>Cash On Delivery</label></div>
        </form>

        <form>
          <label style="font-size:1rem;"><b>${p.name}</b></label>
          <label style="font-size:0.8rem;"><b>${p.mobile}</b></label>
          <label style="font-size:0.8rem;">${p.address}</label>
          <label style="font-size:0.7rem;"><span>Quantity</span> <b>${p.qty}</b></label>
          <label style="font-size:0.8rem;color:green;"><b>${p.stock} Product Available</b></label>
        </form>

        <form style="display:flex;align-items:flex-end;margin:0;">
          <div>${selectBlock}</div>
          <div>${actionBtns}</div>
        </form>

      </div>
    </div>
    `;

    box.appendChild(div.firstElementChild);
  });
}

function manageOrders() {

  ShopkeeperOptionsBtns.innerHTML = `
    <div class="optBtn" onclick="loadAllProds()">Products</div> 
    <div class="optBtn hover">Orders</div> 
    <div class="optBtn" onclick="manageSales()">Sell</div>
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

    <div id="addingTask" style="margin:10px;background:#fff;border-radius:5px;box-shadow:0px 7px 10px #0000000f;"></div>
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
  ["pendingOrders","shiftedOrders","completedOrders"].forEach(i=>{
    document.getElementById(i).classList = "optBtn";
  });
  document.getElementById(id).classList = "optBtn hover";
}
