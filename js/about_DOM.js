(() => {
    const m = matchMedia('(prefers-color-scheme: dark)');
    const link = document.head.appendChild(document.createElement('link'));
    link.rel = 'shortcut icon';

    const set = () => link.href = m.matches ? 'css/logoDark.svg' : 'css/logo.svg';
    set();
    m.onchange = set;

    showAbout()

})();


function showGuide() {

    ShopkeeperOptionsBtns.innerHTML =
        `   <div class="optBtn hover" onclick="showGuide()"><span class="material-symbols-outlined">book_ribbon</span>Guide</div>
        <div class="optBtn" onclick="showFaqs()"><span class="material-symbols-outlined">support_agent</span>FAQ's</div>
        <div class="optBtn" onclick="showAbout()"><span class="material-symbols-outlined">local_cafe</span>About VendoraX</div>
    `

    ProductPage.innerHTML = `
  
  <fieldset>

    <div id="ProductOptionsBtns" style="margin-bottom:10px;">
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

    <div id="orderdetailContainer">

      <div id="ProductEditInfo">

        <form>
          <label style="font-size:1.2rem;"><b>Customer Guide</b></label>

          <label><b>1.</b> Open VendoraX and explore products.</label>

          <label><b>2.</b> Search products using categories or search bar.</label>

          <label><b>3.</b> Open product details and check warranty, seller and price.</label>

          <label><b>4.</b> Add products to cart or buy instantly.</label>

          <label><b>5.</b> Track orders from My Orders section.</label>

          <label><b>6.</b> View nearby repair and electronics shops on map.</label>

          <label><b>7.</b> Raise complaint after delivery if issue found.</label>

          <label><b>8.</b> Download invoice after delivery.</label>

          <label><b>9.</b> Share shops and products with others.</label>

          <label><b>10.</b> Manage complaints and warranty records easily.</label>

        </form>

      </div>

    </div>
    `;
    }

    function vendorGuide() {

        document.getElementById("customerGuideBtn").classList = "optBtn";
        document.getElementById("vendorGuideBtn").classList = "optBtn hover";

        document.getElementById("guideContent").innerHTML = `

    <div id="orderdetailContainer">

      <div id="ProductEditInfo">

        <form>

          <label style="font-size:1.2rem;"><b>Vendor Guide</b></label>

          <label><b>1.</b> Register your shop on VendoraX.</label>

          <label><b>2.</b> Add shop location for nearby customer visibility.</label>

          <label><b>3.</b> Upload products with image, stock and warranty.</label>

          <label><b>4.</b> Manage orders from Pending, Shifted and Delivered.</label>

          <label><b>5.</b> Update delivery status for live customer tracking.</label>

          <label><b>6.</b> Receive complaints and resolve customer issues.</label>

          <label><b>7.</b> Monitor sales analytics and revenue reports.</label>

          <label><b>8.</b> Track low stock and most selling products.</label>

          <label><b>9.</b> Share your shop publicly using share shop option.</label>

          <label><b>10.</b> Build trust using invoice and warranty system.</label>

        </form>

      </div>

    </div>
    `;
    }

    customerGuide();

    document.getElementById("customerGuideBtn").onclick = customerGuide;
    document.getElementById("vendorGuideBtn").onclick = vendorGuide;
}

function showFaqs() {

    ShopkeeperOptionsBtns.innerHTML =
        `   <div class="optBtn" onclick="showGuide()"><span class="material-symbols-outlined">book_ribbon</span>Guide</div>
        <div class="optBtn hover" onclick="showFaqs()"><span class="material-symbols-outlined">support_agent</span>FAQ's</div>
        <div class="optBtn" onclick="showAbout()"><span class="material-symbols-outlined">local_cafe</span>About VendoraX</div>
    `

    ProductPage.innerHTML = `
  
  <fieldset>

    <div id="ProductOptionsBtns" style="margin-bottom:10px;">
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

    <div id="ProductEditInfo">

      <form>

        <label><b>Q.</b> How to buy product?</label>
        <label>A. Open product and click Buy Now.</label>

        <label><b>Q.</b> Can I cancel order?</label>
        <label>A. Yes, before delivery.</label>

        <label><b>Q.</b> How to track delivery?</label>
        <label>A. Open My Orders section.</label>

        <label><b>Q.</b> How to raise issue?</label>
        <label>A. After delivery click Raise Issue.</label>

        <label><b>Q.</b> How to download invoice?</label>
        <label>A. Delivered orders contain invoice button.</label>

        <label><b>Q.</b> Can I find nearby shops?</label>
        <label>A. Yes, from nearest shops map feature.</label>

      </form>

    </div>
    `;
    }

    function vendorFaqs() {

        document.getElementById("customerFaqBtn").classList = "optBtn";
        document.getElementById("vendorFaqBtn").classList = "optBtn hover";

        document.getElementById("faqContent").innerHTML = `

    <div id="ProductEditInfo">

      <form>

        <label><b>Q.</b> How to add products?</label>
        <label>A. Open Products section and upload details.</label>

        <label><b>Q.</b> How to update stock?</label>
        <label>A. Edit product and update stock value.</label>

        <label><b>Q.</b> How to manage orders?</label>
        <label>A. Use Manage Orders section.</label>

        <label><b>Q.</b> How to update delivery status?</label>
        <label>A. Change order status and save.</label>

        <label><b>Q.</b> How to solve complaints?</label>
        <label>A. Open Complaints section and update issue status.</label>

        <label><b>Q.</b> Can customers share my shop?</label>
        <label>A. Yes, public shop links are available.</label>

      </form>

    </div>
    `;
    }

    customerFaqs();

    document.getElementById("customerFaqBtn").onclick = customerFaqs;
    document.getElementById("vendorFaqBtn").onclick = vendorFaqs;
}

function showAbout() {

    ShopkeeperOptionsBtns.innerHTML =
        `   <div class="optBtn" onclick="showGuide()"><span class="material-symbols-outlined">book_ribbon</span>Guide</div>
        <div class="optBtn" onclick="showFaqs()"><span class="material-symbols-outlined">support_agent</span>FAQ's</div>
        <div class="optBtn hover" onclick="showAbout()"><span class="material-symbols-outlined">local_cafe</span>About VendoraX</div>
    `

    ProductPage.innerHTML = `

  <fieldset style="width:100%;">

    <div id="orderdetailContainer" style="margin-bottom:10px;">

      <div id="ProductEditInfo">

        <form >

          <label style="font-size:1.5rem;color:#4c6381;">
            <b>About VendoraX</b>
          </label>

          <label style="font-size:0.9rem;">
            VendoraX is a smart electronics marketplace platform that connects customers with nearby electronics shops and vendors.
          </label>

          <label style="font-size:0.9rem;">
            The platform helps local shops grow digitally while giving customers fast access to nearby products and repair services.
          </label>

        </form>

      </div>

    </div>


    <div id="orderdetailContainer" style="margin-bottom:10px;">

      <div id="ProductEditInfo">

        <form>

          <label style="font-size:1.2rem;">
            <b>Customer Features</b>
          </label>

          <label>• Browse electronics products from multiple vendors.</label>

          <label>• Search products using categories and keywords.</label>

          <label>• View full product details with warranty info.</label>

          <label>• Buy products using Cash On Delivery.</label>

          <label>• Track order status live.</label>

          <label>• View Pending, Shifted and Delivered orders.</label>

          <label>• Download printable invoice after delivery.</label>

          <label>• Raise product complaints and warranty issues.</label>

          <label>• View complaint processing status.</label>

          <label>• Find nearest electronics shops using map.</label>

          <label>• Filter nearby shops within 5km, 10km and 15km.</label>

          <label>• Share shops publicly using direct links.</label>

          <label>• Explore vendor public shop pages without login.</label>

          <label>• Receive email updates for deliveries and complaints.</label>

        </form>

      </div>

    </div>


    <div id="orderdetailContainer" style="margin-bottom:10px;">

      <div id="ProductEditInfo">

        <form>

          <label style="font-size:1.2rem;">
            <b>Vendor Features</b>
          </label>

          <label>• Register electronics shop online.</label>

          <label>• Add shop address and live map location.</label>

          <label>• Upload products with image and details.</label>

          <label>• Manage product stock and pricing.</label>

          <label>• Add warranty information.</label>

          <label>• Manage customer orders easily.</label>

          <label>• Update order delivery status.</label>

          <label>• Handle customer complaints and issues.</label>

          <label>• Approve or resolve raised complaints.</label>

          <label>• Monitor sales analytics dashboard.</label>

          <label>• View total revenue and total orders.</label>

          <label>• Detect low stock products quickly.</label>

          <label>• Find highest revenue products.</label>

          <label>• Analyze most selling products.</label>

          <label>• Analyze most complained products.</label>

          <label>• Share shop publicly with customers.</label>

        </form>

      </div>

    </div>


    <div id="orderdetailContainer" style="margin-bottom:10px;">

      <div id="ProductEditInfo">

        <form>

          <label style="font-size:1.2rem;">
            <b>Why VendoraX?</b>
          </label>

          <label>• Supports local electronics businesses.</label>

          <label>• Easy to use modern UI.</label>

          <label>• Live product and order management.</label>

          <label>• Digital invoice and warranty system.</label>

          <label>• Faster communication between customer and vendor.</label>

          <label>• Smart complaint handling process.</label>

          <label>• Public shop sharing system for marketing.</label>

          <label>• Nearby store discovery using maps.</label>

          <label>• Better trust through tracking and invoices.</label>

          <label>• Complete electronics shopping ecosystem.</label>

        </form>

      </div>

    </div>

  </fieldset>
  `;
}