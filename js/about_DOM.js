(() => {
  const m = matchMedia("(prefers-color-scheme: dark)");
  const link = document.head.appendChild(document.createElement("link"));
  link.rel = "shortcut icon";

  const set = () =>
    (link.href = m.matches ? "css/logoDark.svg" : "css/logo.svg");
  set();
  m.onchange = set;

  showAbout();
})();

function showGuide() {

  ShopkeeperOptionsBtns.innerHTML = `
    <div class="optBtn hover" onclick="showGuide()">
      <span class="material-symbols-outlined">book_ribbon</span>Guide
    </div>

    <div class="optBtn" onclick="showFaqs()">
      <span class="material-symbols-outlined">support_agent</span>FAQ's
    </div>

    <div class="optBtn" onclick="showAbout()">
      <span class="material-symbols-outlined">local_cafe</span>About VendoraX
    </div>
  `;

  ProductPage.innerHTML = `
  
  <fieldset style="border:none;padding:10px;">

    <div id="ProductOptionsBtns" style="margin-bottom:15px;">
      <div class="optBtn hover" id="customerGuideBtn">Customer Guide</div>
      <div class="optBtn" id="vendorGuideBtn">Vendor Guide</div>
    </div>

    <div id="guideContent"></div>

  </fieldset>
  `;

  function customerGuide() {

    document.getElementById("customerGuideBtn").classList = "optBtn hover";
    document.getElementById("vendorGuideBtn").classList = "optBtn";

    document.getElementById("guideContent").innerHTML = `

      <div id="orderdetailContainer"
        style="background:#fff;border-radius:10px;padding:15px;box-shadow:0px 5px 12px #00000010;">

        <div id="ProductEditInfo"
          style="display:flex;flex-direction:column;gap:15px;">

          <label style="font-size:1.4rem;font-weight:700;color:#4c6381;">
            Customer Guide
          </label>

          <div style="padding:12px;background:#f7f9fc;border-radius:8px;">
            <label style="font-size:1rem;font-weight:700;color:#4c6381;">
              Step 1
            </label>
            <label style="display:block;margin-top:5px;font-size:0.88rem;">
              Open VendoraX and explore products from nearby vendors.
            </label>
          </div>

          <div style="padding:12px;background:#f7f9fc;border-radius:8px;">
            <label style="font-size:1rem;font-weight:700;color:#4c6381;">
              Step 2
            </label>
            <label style="display:block;margin-top:5px;font-size:0.88rem;">
              Search products using categories or search bar.
            </label>
          </div>

          <div style="padding:12px;background:#f7f9fc;border-radius:8px;">
            <label style="font-size:1rem;font-weight:700;color:#4c6381;">
              Step 3
            </label>
            <label style="display:block;margin-top:5px;font-size:0.88rem;">
              Open product details and check warranty, seller and pricing.
            </label>
          </div>

          <div style="padding:12px;background:#f7f9fc;border-radius:8px;">
            <label style="font-size:1rem;font-weight:700;color:#4c6381;">
              Step 4
            </label>
            <label style="display:block;margin-top:5px;font-size:0.88rem;">
              Buy products instantly using Cash On Delivery.
            </label>
          </div>

          <div style="padding:12px;background:#f7f9fc;border-radius:8px;">
            <label style="font-size:1rem;font-weight:700;color:#4c6381;">
              Step 5
            </label>
            <label style="display:block;margin-top:5px;font-size:0.88rem;">
              Track Pending, Shipped and Delivered orders from My Orders section.
            </label>
          </div>

          <div style="padding:12px;background:#f7f9fc;border-radius:8px;">
            <label style="font-size:1rem;font-weight:700;color:#4c6381;">
              Step 6
            </label>
            <label style="display:block;margin-top:5px;font-size:0.88rem;">
              Find nearest electronics shops using live map system.
            </label>
          </div>

          <div style="padding:12px;background:#f7f9fc;border-radius:8px;">
            <label style="font-size:1rem;font-weight:700;color:#4c6381;">
              Step 7
            </label>
            <label style="display:block;margin-top:5px;font-size:0.88rem;">
              Raise complaints after delivery if any issue is found.
            </label>
          </div>

          <div style="padding:12px;background:#f7f9fc;border-radius:8px;">
            <label style="font-size:1rem;font-weight:700;color:#4c6381;">
              Step 8
            </label>
            <label style="display:block;margin-top:5px;font-size:0.88rem;">
              Download printable invoice after successful delivery.
            </label>
          </div>

        </div>

      </div>
    `;
  }

  function vendorGuide() {

    document.getElementById("customerGuideBtn").classList = "optBtn";
    document.getElementById("vendorGuideBtn").classList = "optBtn hover";

    document.getElementById("guideContent").innerHTML = `

      <div id="orderdetailContainer"
        style="background:#fff;border-radius:10px;padding:15px;box-shadow:0px 5px 12px #00000010;">

        <div id="ProductEditInfo"
          style="display:flex;flex-direction:column;gap:15px;">

          <label style="font-size:1.4rem;font-weight:700;color:#4c6381;">
            Vendor Guide
          </label>

          <div style="padding:12px;background:#f7f9fc;border-radius:8px;">
            <label style="font-size:1rem;font-weight:700;color:#4c6381;">
              Step 1
            </label>
            <label style="display:block;margin-top:5px;font-size:0.88rem;">
              Register your electronics shop on VendoraX.
            </label>
          </div>

          <div style="padding:12px;background:#f7f9fc;border-radius:8px;">
            <label style="font-size:1rem;font-weight:700;color:#4c6381;">
              Step 2
            </label>
            <label style="display:block;margin-top:5px;font-size:0.88rem;">
              Add live shop location for nearby customer discovery.
            </label>
          </div>

          <div style="padding:12px;background:#f7f9fc;border-radius:8px;">
            <label style="font-size:1rem;font-weight:700;color:#4c6381;">
              Step 3
            </label>
            <label style="display:block;margin-top:5px;font-size:0.88rem;">
              Upload products with image, stock, price and warranty.
            </label>
          </div>

          <div style="padding:12px;background:#f7f9fc;border-radius:8px;">
            <label style="font-size:1rem;font-weight:700;color:#4c6381;">
              Step 4
            </label>
            <label style="display:block;margin-top:5px;font-size:0.88rem;">
              Manage customer orders from dashboard.
            </label>
          </div>

          <div style="padding:12px;background:#f7f9fc;border-radius:8px;">
            <label style="font-size:1rem;font-weight:700;color:#4c6381;">
              Step 5
            </label>
            <label style="display:block;margin-top:5px;font-size:0.88rem;">
              Update delivery tracking status for customers.
            </label>
          </div>

          <div style="padding:12px;background:#f7f9fc;border-radius:8px;">
            <label style="font-size:1rem;font-weight:700;color:#4c6381;">
              Step 6
            </label>
            <label style="display:block;margin-top:5px;font-size:0.88rem;">
              Resolve complaints and customer warranty issues.
            </label>
          </div>

          <div style="padding:12px;background:#f7f9fc;border-radius:8px;">
            <label style="font-size:1rem;font-weight:700;color:#4c6381;">
              Step 7
            </label>
            <label style="display:block;margin-top:5px;font-size:0.88rem;">
              Analyze sales, revenue and low stock products.
            </label>
          </div>

          <div style="padding:12px;background:#f7f9fc;border-radius:8px;">
            <label style="font-size:1rem;font-weight:700;color:#4c6381;">
              Step 8
            </label>
            <label style="display:block;margin-top:5px;font-size:0.88rem;">
              Share your public shop link with customers.
            </label>
          </div>

        </div>

      </div>
    `;
  }

  customerGuide();

  document.getElementById("customerGuideBtn").onclick = customerGuide;
  document.getElementById("vendorGuideBtn").onclick = vendorGuide;
}

function showFaqs() {

  ShopkeeperOptionsBtns.innerHTML = `
    <div class="optBtn" onclick="showGuide()">
      <span class="material-symbols-outlined">book_ribbon</span>Guide
    </div>

    <div class="optBtn hover" onclick="showFaqs()">
      <span class="material-symbols-outlined">support_agent</span>FAQ's
    </div>

    <div class="optBtn" onclick="showAbout()">
      <span class="material-symbols-outlined">local_cafe</span>About VendoraX
    </div>
  `;

  ProductPage.innerHTML = `
  
  <fieldset style="border:none;padding:10px;">

    <div id="ProductOptionsBtns" style="margin-bottom:15px;">
      <div class="optBtn hover" id="customerFaqBtn">Customer FAQ</div>
      <div class="optBtn" id="vendorFaqBtn">Vendor FAQ</div>
    </div>

    <div id="faqContent"></div>

  </fieldset>
  `;

  function customerFaqs() {

    document.getElementById("customerFaqBtn").classList = "optBtn hover";
    document.getElementById("vendorFaqBtn").classList = "optBtn";

    document.getElementById("faqContent").innerHTML = `

      <div id="orderdetailContainer"
        style="margin-bottom:10px;background:#fff;border-radius:10px;padding:15px;box-shadow:0px 5px 12px #00000010;">

        <div id="ProductEditInfo"
          style="display:flex;flex-direction:column;gap:15px;">

          <div style="padding:10px;border-radius:8px;background:#f7f9fc;">
            <label style="font-size:1rem;font-weight:700;color:#4c6381;">
              Q. How to buy product?
            </label>
            <label style="display:block;margin-top:5px;font-size:0.88rem;">
              A. Open product and click Buy Now button.
            </label>
          </div>

          <div style="padding:10px;border-radius:8px;background:#f7f9fc;">
            <label style="font-size:1rem;font-weight:700;color:#4c6381;">
              Q. Can I cancel order?
            </label>
            <label style="display:block;margin-top:5px;font-size:0.88rem;">
              A. Yes, before order delivery.
            </label>
          </div>

          <div style="padding:10px;border-radius:8px;background:#f7f9fc;">
            <label style="font-size:1rem;font-weight:700;color:#4c6381;">
              Q. How to track delivery?
            </label>
            <label style="display:block;margin-top:5px;font-size:0.88rem;">
              A. Open My Orders section.
            </label>
          </div>

          <div style="padding:10px;border-radius:8px;background:#f7f9fc;">
            <label style="font-size:1rem;font-weight:700;color:#4c6381;">
              Q. How to raise issue?
            </label>
            <label style="display:block;margin-top:5px;font-size:0.88rem;">
              A. After delivery click Raise Issue button.
            </label>
          </div>

          <div style="padding:10px;border-radius:8px;background:#f7f9fc;">
            <label style="font-size:1rem;font-weight:700;color:#4c6381;">
              Q. How to download invoice?
            </label>
            <label style="display:block;margin-top:5px;font-size:0.88rem;">
              A. Delivered orders contain Download Invoice option.
            </label>
          </div>

          <div style="padding:10px;border-radius:8px;background:#f7f9fc;">
            <label style="font-size:1rem;font-weight:700;color:#4c6381;">
              Q. Can I find nearby shops?
            </label>
            <label style="display:block;margin-top:5px;font-size:0.88rem;">
              A. Yes, using nearest shops map feature.
            </label>
          </div>

        </div>

      </div>
    `;
  }

  function vendorFaqs() {

    document.getElementById("customerFaqBtn").classList = "optBtn";
    document.getElementById("vendorFaqBtn").classList = "optBtn hover";

    document.getElementById("faqContent").innerHTML = `

      <div id="orderdetailContainer"
        style="margin-bottom:10px;background:#fff;border-radius:10px;padding:15px;box-shadow:0px 5px 12px #00000010;">

        <div id="ProductEditInfo"
          style="display:flex;flex-direction:column;gap:15px;">

          <div style="padding:10px;border-radius:8px;background:#f7f9fc;">
            <label style="font-size:1rem;font-weight:700;color:#4c6381;">
              Q. How to add products?
            </label>
            <label style="display:block;margin-top:5px;font-size:0.88rem;">
              A. Open Products section and upload product details.
            </label>
          </div>

          <div style="padding:10px;border-radius:8px;background:#f7f9fc;">
            <label style="font-size:1rem;font-weight:700;color:#4c6381;">
              Q. How to update stock?
            </label>
            <label style="display:block;margin-top:5px;font-size:0.88rem;">
              A. Edit product and update stock quantity.
            </label>
          </div>

          <div style="padding:10px;border-radius:8px;background:#f7f9fc;">
            <label style="font-size:1rem;font-weight:700;color:#4c6381;">
              Q. How to manage orders?
            </label>
            <label style="display:block;margin-top:5px;font-size:0.88rem;">
              A. Open Orders section from dashboard.
            </label>
          </div>

          <div style="padding:10px;border-radius:8px;background:#f7f9fc;">
            <label style="font-size:1rem;font-weight:700;color:#4c6381;">
              Q. How to update delivery status?
            </label>
            <label style="display:block;margin-top:5px;font-size:0.88rem;">
              A. Change order status and click save.
            </label>
          </div>

          <div style="padding:10px;border-radius:8px;background:#f7f9fc;">
            <label style="font-size:1rem;font-weight:700;color:#4c6381;">
              Q. How to solve complaints?
            </label>
            <label style="display:block;margin-top:5px;font-size:0.88rem;">
              A. Open Complaints section and update issue status.
            </label>
          </div>

          <div style="padding:10px;border-radius:8px;background:#f7f9fc;">
            <label style="font-size:1rem;font-weight:700;color:#4c6381;">
              Q. Can customers share my shop?
            </label>
            <label style="display:block;margin-top:5px;font-size:0.88rem;">
              A. Yes, every shop has public share link.
            </label>
          </div>

        </div>

      </div>
    `;
  }

  customerFaqs();

  document.getElementById("customerFaqBtn").onclick = customerFaqs;
  document.getElementById("vendorFaqBtn").onclick = vendorFaqs;
}

function showAbout() {
  ProductPage.innerHTML = `
  <style>
  form{
  width:unset;
  min-width:unset;
  padding:20px;
  justify-self: start;
  }
  </style>
  <fieldset style="border:none;padding:10px;display:flex;flex-direction:column;gap:15px;">


    <div id="orderdetailContainer"
      style="margin-bottom:10px;border-radius:10px;background:#fff;box-shadow:0px 5px 12px #00000012;padding:10px;">

      <div id="ProductEditInfo">

        <form style="display:flex;flex-direction:column;gap:8px;">

          <label style="font-size:1.7rem;color:#4c6381;font-weight:700;font-family:'Montserrat Alternates',sans-serif;">
            VendoraX
          </label>

          <label style="font-size:0.9rem;color:#555;line-height:1.7;">
            VendoraX is a smart electronics marketplace platform that connects customers with nearby electronics vendors and repair shops.
          </label>

          <label style="font-size:0.9rem;color:#555;line-height:1.7;">
            Customers can discover nearby products, track orders, raise complaints, download invoices and explore public vendor shops.
          </label>

          <label style="font-size:0.9rem;color:#555;line-height:1.7;">
            Vendors can digitally manage products, orders, customers, complaints, revenue and shop analytics from a single dashboard.
          </label>

        </form>

      </div>

    </div>



    <div id="orderdetailContainer"
      style="margin-bottom:10px;border-radius:10px;background:#fff;box-shadow:0px 5px 12px #00000012;padding:10px;">

      <div id="ProductEditInfo">

        <form style="display:flex;flex-direction:column;gap:7px;">

          <label style="font-size:1.3rem;color:#4c6381;font-weight:700;">
            Customer Features
          </label>

          <label style="font-size:0.88rem;">🛒 Browse electronics products from multiple vendors.</label>

          <label style="font-size:0.88rem;">🔍 Search products using categories and keywords.</label>

          <label style="font-size:0.88rem;">📦 View full product specifications and warranty details.</label>

          <label style="font-size:0.88rem;">💵 Buy products using Cash On Delivery.</label>

          <label style="font-size:0.88rem;">📍 Find nearest electronics shops using live map system.</label>

          <label style="font-size:0.88rem;">📌 Filter nearby shops within 5km, 10km and 15km.</label>

          <label style="font-size:0.88rem;">📄 Download printable invoice after successful delivery.</label>

          <label style="font-size:0.88rem;">🚚 Track order status like Pending, Shipped and Delivered.</label>

          <label style="font-size:0.88rem;">⚠ Raise product complaints and warranty issues.</label>

          <label style="font-size:0.88rem;">📨 Receive automatic email notifications for delivery and issues.</label>

          <label style="font-size:0.88rem;">🔗 Open and share vendor public shop pages without login.</label>

        </form>

      </div>

    </div>



    <div id="orderdetailContainer"
      style="margin-bottom:10px;border-radius:10px;background:#fff;box-shadow:0px 5px 12px #00000012;padding:10px;">

      <div id="ProductEditInfo">

        <form style="display:flex;flex-direction:column;gap:7px;">

          <label style="font-size:1.3rem;color:#4c6381;font-weight:700;">
            Vendor Features
          </label>

          <label style="font-size:0.88rem;">🏪 Register electronics shop digitally.</label>

          <label style="font-size:0.88rem;">📍 Add live shop location on map.</label>

          <label style="font-size:0.88rem;">📤 Upload products with image, warranty and specifications.</label>

          <label style="font-size:0.88rem;">📦 Manage product stock and pricing easily.</label>

          <label style="font-size:0.88rem;">📑 Manage customer orders in real-time.</label>

          <label style="font-size:0.88rem;">🚚 Update delivery tracking status.</label>

          <label style="font-size:0.88rem;">⚠ Handle complaints and customer issues.</label>

          <label style="font-size:0.88rem;">📊 View smart sales analytics dashboard.</label>

          <label style="font-size:0.88rem;">💰 Analyze highest revenue generating products.</label>

          <label style="font-size:0.88rem;">🔥 Detect most selling products.</label>

          <label style="font-size:0.88rem;">📉 Detect low stock products quickly.</label>

          <label style="font-size:0.88rem;">📢 Share public shop links for marketing.</label>

        </form>

      </div>

    </div>



    <div id="orderdetailContainer"
      style="margin-bottom:10px;border-radius:10px;background:#fff;box-shadow:0px 5px 12px #00000012;padding:10px;">

      <div id="ProductEditInfo">

        <form style="display:flex;flex-direction:column;gap:7px;">

          <label style="font-size:1.3rem;color:#4c6381;font-weight:700;">
            Smart Systems Included
          </label>

          <label style="font-size:0.88rem;">✔ Nearby shop finder using customer location.</label>

          <label style="font-size:0.88rem;">✔ Complaint management system.</label>

          <label style="font-size:0.88rem;">✔ Product warranty tracking.</label>

          <label style="font-size:0.88rem;">✔ Automatic invoice generation.</label>

          <label style="font-size:0.88rem;">✔ Delivery date and warranty expiry tracking.</label>

          <label style="font-size:0.88rem;">✔ Public vendor storefront sharing.</label>

          <label style="font-size:0.88rem;">✔ Customer and vendor dashboard separation.</label>

          <label style="font-size:0.88rem;">✔ Real-time order tracking system.</label>

          <label style="font-size:0.88rem;">✔ Smart product analytics and reports.</label>

        </form>

      </div>

    </div>



    <div id="orderdetailContainer"
      style="margin-bottom:10px;border-radius:10px;background:#fff;color:#fff;box-shadow:0px 5px 12px #00000012;padding:15px;">

      <div id="ProductEditInfo">

        <form style="display:flex;flex-direction:column;gap:8px;">

          <label style="font-size:1.3rem;font-weight:700;">
            Why Choose VendoraX?
          </label>

          <label style="font-size:0.88rem;">
            ✔ Supports local electronics businesses digitally.
          </label>

          <label style="font-size:0.88rem;">
            ✔ Makes nearby electronics shopping easier and faster.
          </label>

          <label style="font-size:0.88rem;">
            ✔ Provides trust using invoices, tracking and complaint system.
          </label>

          <label style="font-size:0.88rem;">
            ✔ Helps vendors increase online visibility and sales.
          </label>

          <label style="font-size:0.88rem;">
            ✔ Creates a complete electronics marketplace ecosystem.
          </label>

        </form>

      </div>

    </div>

  </fieldset>
  `;
}
