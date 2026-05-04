const ShopkeeperOptionsBtns = document.getElementById("ShopkeeperOptionsBtns");
const ShopkeeperProcessArea = document.getElementById("ShopkeeperProcessArea");
const ProductPage = document.getElementById("ProductPage");

function closeOptMenus(more, acc) {
  deactiveAll();
  AccountServicesBtns.style.display = "none";
  MoreServicesBtns.style.display = "none";

  isMoreOpen = more;
  isAccOpen = acc;
}

function defaultLoad___() {
  // Scroll enable

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

    productCards.style.padding = "15px 0px"

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
                        <div class="NavLink" id="searchBtn" style="color:#fff;background-color: #4c6381;">
                        <span class="material-symbols-outlined">search</span>
                    </div>
                </div>

                </div>

                <div id="productCards" style="padding: 5px 0;">
                </div>
            </fieldset>
        `;
}

function defaultLoad() {

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
      <div id="NavlinkContainer" style="display:flex;">
        <input type="search" id="navSearch" placeholder="Search">
      </div>

      <div id="productCards"></div>
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
    console.log(allProducts)
  }

  function renderProducts(list) {
    const container = document.getElementById("productCards");
    productCards.style.padding = "15px 0px"

    container.innerHTML = "";

    if (!list.length) {
      container.innerHTML = "<p>No products</p>";
      return;
    }

    list.forEach(p => {
      const card = document.createElement("div");
      card.className = "product";

      card.innerHTML = `
        <img id="productImage" src="./script/${p.image || 'noimage.png'}">
        <span style="position:absolute;font-size:0.7rem;background-color:white;padding:5px 8px;border-radius:5px;margin:5px;box-shadow:0px 0px 5px #e1e1e1;">${p.category}</span>

        <div style="display:flex;flex-direction:column;">
          <span id="productName"><b>${p.title}</b></span>
          <span id="productDescription">${p.description || ""}</span>
          <span id="productSeller">🏪 ${p.shop_name}</span>
          <span id="productWarranty">${p.warranty} <b style="font-size:0.55rem;"> Warranty</b></span>
          <span id="productPrice">₹${p.price}</span>
        </div>
      `;

      container.appendChild(card);
    });
  }

  // 🔍 SEARCH FILTER
  document.addEventListener("input", (e) => {
    if (e.target.id !== "navSearch") return;

    const val = e.target.value.toLowerCase();

    const filtered = allProducts.filter(p =>
      p.title.toLowerCase().includes(val) ||
      p.category.toLowerCase().includes(val) ||
      (p.description || "").toLowerCase().includes(val)
    );

    renderProducts(filtered);
  });

  // 📦 CATEGORY FILTER
  document.querySelectorAll("#ShopkeeperOptionsBtns .optBtn").forEach(btn => {
    btn.addEventListener("click", () => {

      // UI active
      document.querySelectorAll(".optBtn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      const cat = btn.dataset.cat;

      if (cat === "All") {
        renderProducts(allProducts);
      } else {
        const filtered = allProducts.filter(p => p.category === cat);
        renderProducts(filtered);
      }
    });
  });

  loadProducts();
}

defaultLoad();
// defaultLoad___();

function manageCustomerInfo() {
  ShopkeeperOptionsBtns.innerHTML = `
    <div class="optBtn" onclick="defaultLoad()"><span class="material-symbols-outlined" style="font-size:1rem;">arrow_back_ios</span>Back</div>
    <div class="optBtn hover">My Account</div>
    `;

  // let map = L.map('map').setView([23.0225, 72.5714], 13); // default Ahmedabad

  // L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  //     attribution: '© OpenStreetMap'
  // }).addTo(map);

  // let marker;

  // // click on map → set location
  // map.on('click', function (e) {
  //     let lat = e.latlng.lat;
  //     let lng = e.latlng.lng;

  //     if (marker) map.removeLayer(marker);

  //     marker = L.marker([lat, lng]).addTo(map);

  //     document.getElementById("lat").value = lat;
  //     document.getElementById("lng").value = lng;
  //     document.getElementById("address").value = lat + ", " + lng;
  // });

  // // get browser location
  // function getLocation() {
  //     if (navigator.geolocation) {
  //         navigator.geolocation.getCurrentPosition(function (pos) {
  //             let lat = pos.coords.latitude;
  //             let lng = pos.coords.longitude;

  //             map.setView([lat, lng], 15);

  //             if (marker) map.removeLayer(marker);
  //             marker = L.marker([lat, lng]).addTo(map);

  //             document.getElementById("lat").value = lat;
  //             document.getElementById("lng").value = lng;
  //             document.getElementById("address").value = lat + ", " + lng;
  //         });
  //     } else {
  //         alert("Geolocation not supported");
  //     }
  // }

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

                <label for="addresss">Address</label>
                <textarea type="text" id="addresss" name="addresss" rows="5" style="resize: vertical;" placeholder="1, Alpha city, Near RiverSide Hotel, Ahmedabad , 300026"></textarea>

                <button type="button" onclick="getLocation()">Use Current Location</button>

                <div id="map" style="height:400px;"></div>

                <input type="hidden" id="lat">
                <input type="hidden" id="lng">
                
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

function manageCart() {
  ShopkeeperOptionsBtns.innerHTML = `
    <div class="optBtn" onclick="defaultLoad()"><span class="material-symbols-outlined" style="font-size:1rem;">arrow_back_ios</span>Back</div>
    <div class="optBtn hover">My Cart</div>
    `;

  ProductPage.innerHTML = `
    <fieldset>


        <div id="ListingOrderItems">
            <div id="orderdetailContainer" >
                <div id="editImage"
                    style="position: absolute;margin: 5px;background-color: #dfebff; border-radius: 5px;padding: 5px 10px;font-size: 0.6rem;">
                    Laptop
                </div>
                <div id="productImage">
                    <img src="https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2" alt="" height="200px">
                </div>

                <div id="ProductEditInfo" >
                    <form id="AddingTaskForm">
                        <label style="font-size: 1rem;"><b>HP Pavilion i5</b></label>
                        <label style="font-size: 0.8rem;"><i>HP</i></label>

                        <label style="font-size: 0.8rem;font-weight: 400;">Intel i5, 16GB RAM, 512GB
                            SSD</label>

                        <label style="font-size: 0.7rem;"><span>Warranty</span> <b> 2 years</b></label>

                        <label style="font-size: 1.2rem;"><b>₹ 58000</b></label>

                        <div style="margin-top:5px ;">
                            <input type="radio" id="onlinePay" name="PayMode" disabled> <label for="onlinePay"
                                style="color: #797e84;">Pay Online - UPI</label>
                        </div>

                        <div style="margin-bottom:5px ;">
                            <input type="radio" id="cashOnDel" name="PayMode" checked> <label for="cashOnDel">Cash On
                                Delivery</label>
                        </div>
                    </form>

                    <div id="contentNbtn">
                    
                    <form id="AddingTaskForm">
                        <label style="display: flex;align-items: center;padding: 0;margin: 0;font-size: 0.9rem;">
                        <span class="material-symbols-outlined" style="padding:0px 5px 0px 0px;font-size: 1rem;">store</span>TechWorld</label>
                        <label
                        style="display: flex;align-items: center;padding: 0;margin: 5px 0 0 0;font-size: 0.9rem;">
                        <span class="material-symbols-outlined"
                        style="padding:0px 5px 0px 0px;font-size: 1rem;">call</span>9764645664
                        <label
                        style="font-size: 0.6rem;padding:5px 9px; background-color: #4c6381;border-radius: 5px; margin: 0 0 0 5px;color:#fff;">Ask
                        for help</label></label>
                        
                        <label style="font-size: 0.9rem;"><u>Check More Products</u></label>

                        <div style="font-size: 2rem;">
                            - <input type="number" placeholder="1" style="width: 35px;text-align: end;"> +
                        </div>
                        
                        </form>
                        <form id="CartDelBuy">
                        <button type="submit" id="BuyBtn" >Buy Now</button>
                        <button type="reset" id="DelBtn" >Remove</button>
                        </form>
                        </div>
                </div>
            </div>


            <div id="orderdetailContainer" >
                <div id="editImage"
                    style="position: absolute;margin: 5px;background-color: #dfebff; border-radius: 5px;padding: 5px 10px;font-size: 0.6rem;">
                    Mobiles
                </div>
                <div id="productImage">
                    <img src="https://images.unsplash.com/photo-1616348436168-de43ad0db179?auto=format&fit=crop&w=800&q=80"
                        alt="" >
                </div>

                <div id="ProductEditInfo" >
                    <form id="AddingTaskForm">
                        <label style="font-size: 1rem;"><b>iPhone 13</b></label>
                        <label style="font-size: 0.8rem;"><i>Apple</i></label>

                        <label style="font-size: 0.8rem;font-weight: 400;">128GB, A15 chip</label>

                        <label style="font-size: 0.7rem;"><span>Warranty</span> <b> 1 years</b></label>

                        <label style="font-size: 1.2rem;"><b>₹ 70000</b></label>

                        <div style="margin-top:5px ;">
                            <input type="radio" id="onlinePay" name="PayMode" disabled> <label for="onlinePay"
                                style="color: #797e84;">Pay Online - UPI</label>
                        </div>

                        <div style="margin-bottom:5px ;">
                            <input type="radio" id="cashOnDel" name="PayMode" checked> <label for="cashOnDel">Cash On
                                Delivery</label>
                        </div>
                    </form>

                    <div id="contentNbtn">


                    <form id="AddingTaskForm">
                        <label style="display: flex;align-items: center;padding: 0;margin: 0;font-size: 0.9rem;">
                            <span class="material-symbols-outlined"
                                style="padding:0px 5px 0px 0px;font-size: 1rem;">store</span>IStore</label>
                        <label
                            style="display: flex;align-items: center;padding: 0;margin: 5px 0 0 0;font-size: 0.9rem;">
                            <span class="material-symbols-outlined"
                                style="padding:0px 5px 0px 0px;font-size: 1rem;">call</span>9335445664
                            <label
                                style="font-size: 0.6rem;padding:5px 9px; background-color: #4c6381;border-radius: 5px; margin: 0 0 0 5px;color:#fff;">Ask
                                for help</label></label>

                        <label style="font-size: 0.9rem;"><u>Check More Products</u></label>

                        <div style="font-size: 2rem;">
                            - <input type="number" placeholder="1" style="width: 35px;text-align: end;"> + 
                        </div>
                        
                        </form>
                        <form id="CartDelBuy">
                            <button type="submit" id="BuyBtn" >Buy Now</button>
                            <button type="reset" id="DelBtn" >Remove</button>
                        </form>
                </div>
                </div>
            </div>

            <div id="orderdetailContainer" >
                <div id="editImage"
                    style="position: absolute;margin: 5px;background-color: #dfebff; border-radius: 5px;padding: 5px 10px;font-size: 0.6rem;">
                    Laptop
                </div>
                <div id="productImage">
                    <img src="https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2" alt="" height="200px">
                </div>

                <div id="ProductEditInfo" >
                    <form id="AddingTaskForm">
                        <label style="font-size: 1rem;"><b>HP Pavilion i5</b></label>
                        <label style="font-size: 0.8rem;"><i>HP</i></label>

                        <label style="font-size: 0.8rem;font-weight: 400;">Intel i5, 16GB RAM, 512GB
                            SSD</label>

                        <label style="font-size: 0.7rem;"><span>Warranty</span> <b> 2 years</b></label>

                        <label style="font-size: 1.2rem;"><b>₹ 58000</b></label>

                        <div style="margin-top:5px ;">
                            <input type="radio" id="onlinePay" name="PayMode" disabled> <label for="onlinePay"
                                style="color: #797e84;">Pay Online - UPI</label>
                        </div>

                        <div style="margin-bottom:5px ;">
                            <input type="radio" id="cashOnDel" name="PayMode" checked> <label for="cashOnDel">Cash On
                                Delivery</label>
                        </div>
                    </form>

                    <div id="contentNbtn">
                    
                    <form id="AddingTaskForm">
                        <label style="display: flex;align-items: center;padding: 0;margin: 0;font-size: 0.9rem;">
                        <span class="material-symbols-outlined" style="padding:0px 5px 0px 0px;font-size: 1rem;">store</span>TechWorld</label>
                        <label
                        style="display: flex;align-items: center;padding: 0;margin: 5px 0 0 0;font-size: 0.9rem;">
                        <span class="material-symbols-outlined"
                        style="padding:0px 5px 0px 0px;font-size: 1rem;">call</span>9764645664
                        <label
                        style="font-size: 0.6rem;padding:5px 9px; background-color: #4c6381;border-radius: 5px; margin: 0 0 0 5px;color:#fff;">Ask
                        for help</label></label>
                        
                        <label style="font-size: 0.9rem;"><u>Check More Products</u></label>

                        <div style="font-size: 2rem;">
                            - <input type="number" placeholder="1" style="width: 35px;text-align: end;"> +
                        </div>
                        
                        </form>
                        <form id="CartDelBuy">
                        <button type="submit" id="BuyBtn" >Buy Now</button>
                        <button type="reset" id="DelBtn" >Remove</button>
                        </form>
                        </div>
                </div>
            </div>



        </div>



        


    </fieldset>
    `;

  closeOptMenus(false, false);
}
// manageCart();
