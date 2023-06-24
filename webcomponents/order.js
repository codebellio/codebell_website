class AppDiv extends CodBellElement {
    getContent() {
        return (`
        <style>
            label {
                color: #4a4a4a;
                line-height: 45px;
            }
        
            input,
            textarea {
                padding: 1em;
                border-radius: 1em;
                width: 300px;
                border: 2px solid #2F8AB2;
                margin-bottom: 1em !important;
                line-height: 1.2em !important;
            }
        
            .error {
                margin-top: -1em;
                color: red;
                font-size: small;
            }
        
            .orderPopUpOverlay {
                display: flex;
                z-index: 9999;
                position: fixed;
                top: 0px;
                bottom: 0px;
                left: 0px;
                width: 100%;
                margin: auto;
                background: rgb(164 164 164 / 84%);
                background: linear-gradient(132deg, #cacacad4, #c8c8c8);
                align-items: center;
                justify-content: center;
            }
        
            .orderPopUp {
                width: fit-content;
                margin: auto;
                max-width: 95vw;
                max-height: 80vh;
                overflow: auto;
                background-color: rgb(204 204 204 / 65%);
                background: linear-gradient(180deg, #f8f7f3, #f8f7f3);
                backdrop-filter: blur(5px);
                padding: 3em;
                border-radius: 1.63em;
                display: flex;
                flex-direction: column;
                position: relative;
            }
        
            .form_grid {
                display: grid;
                grid-template-columns: auto auto;
                gap: 1em;
            }
        
            @media (max-width: 740px) {
                .orderPopUp {
                    padding: 2em 1em;
                    max-width: 90vw;
                    max-height: 97vh;
                }
        
                .form_grid {
                    display: flex;
                    flex-direction: column;
                }
                .form_grid  label{
                    line-height: 1em;
                    margin-bottom: 0;
                }
            }
        </style>
        <div if="Show" class="orderPopUpOverlay">
            <loading-view :value="loading">
                <form if="!Order" class="orderPopUp" @submit="checkout">
                    <label style="font-weight: 400;font-size: 20px;line-height: 30px; margin-bottom: 1em;">We need your details
                        to continue</label>
                    <div style="display: flex; flex-wrap: wrap; gap: 1em; justify-content: center; padding-bottom: 2em;">
                        <div class="form_grid">
                            <label for="name_input"> Name* </label>
                            <div>
                                <input id="name_input" name="name_input" ref="name_input" :value="Name" @input="setValue('Name', event)"
                                    type="text" placeholder="Alex">
                                <span class="error" :text="name_error"></span>
                            </div>

                            <label for="email_input"> Email </label>
                            <div>
                                <input id="email_input" name="email_input" ref="email_input" :value="Email" @input="setValue('Email', event)"
                                    type="text" placeholder="Alex@test.com">
                                <span class="error" :text="email_error"></span>
                            </div>
                            
                            <label for="mobile_input"> Mobile* </label>
                            <div>
                                <input id="mobile_input" name="mobile_input" ref="mobile_input" :value="Mobile" @input="setValue('Mobile', event)"
                                    type="text" maxlength="10" placeholder="Your Mobile number">
                                <span class="error" :text="mobile_error"></span>
                            </div>
                            <label for="coupon_code_input" style="width: 165px;"> Coupon Code (optional) </label>
                            <div>
                                <input id="coupon_code_input" name="coupon_code_input" ref="coupon_code_input" :value="coupon_code" @input="setValue('coupon_code', event)"
                                    type="text" placeholder="Coupon Code">
                                <span class="error" :text="coupon_code_error"></span>
                            </div>
                        </div>
                        <div if="!Agent && !urlProductID" class="form_grid">
                            <label for="address_input" style="width: 165px;"> Address*</label>
                            <div>
                                <textarea id="address_input" name="address_input" :text="Address"
                                    @input="setValue('Address', event)" placeholder="Your delivery address"
                                    style="height: 94px;"></textarea>
                                <span class="error" :text="address_error"></span>
                            </div>
        
                            <label for="pincode_input"> Postal Pin Code* </label>
                            <div>
                                <input id="pincode_input" name="pincode_input" :value="Pin" @input="setValue('Pin', event)"
                                    type="text" placeholder="pin code / postal code / area code " />
                                <span class="error" :text="pincode_error"></span>
                            </div>
        
                            <label for="city_input"> City* </label>
                            <div>
                                <input id="city_input" name="city_input" :value="City" @input="setValue('City', event)"
                                    type="text" placeholder="Delhi" />
                                <span class="error" :text="city_error"></span>
                            </div>
        
                            <label for="country_input"> Country* </label>
                            <div>
                                <input id="country_input" name="country_input" :value="Country"
                                    @input="setValue('Country', event)" type="text" placeholder="India" />
                                <span class="error" :text="country_error"></span>
                            </div>
                        </div>
                    </div>
                    <div style="display: flex;flex-wrap: wrap;justify-content: center;align-items: end;flex-direction: row;gap: 1em;">
                        <a if="Agent" href="#" @click="logoutAgent"
                            style="text-decoration: none;color: inherit;font-weight: 500;">Want to fill delivery address, click
                            here ?</a>
                        <button class="button w-inline-block" style="width: 13em;align-self: flex-end;" type="submit">
                            <div class="text-button" style="color: #f8f8f8">Continue</div>
                        </button>
                        <button class="button w-inline-block" style="width: 13em;" type="button" @click="Cancel">
                            <div class="text-button" style="color: #f8f8f8">Cancel</div>
                        </button>
                    </div>
                </form>
                <div if="Order" class="orderPopUp">
                    <div if="!Order.PaymentDoneOn" style="display: flex; flex-direction: column; gap: 1em;">
                        <div style="width: fit-content; max-width:90vw; display: flex; flex-direction: row; gap:1em; flex-wrap: wrap; ">
                            <div
                                style="display: flex; flex-direction: column; justify-content: center; align-items: center; gap: 1em; width: 400px; max-width: 80vw; min-height: 40vh;">
                                <h4><span :text="Order.Name"></span> You are just 1 step away from geting codebell</h4>
        
                                <div style="margin-top: 2em; width: -webkit-fill-available;">
                                    <h5>Price Details</h5>
                                    <div if="Order.Subtotal != Order.Total" style="margin: 1em 0;">
                                        <b>
                                            <p if="Order.Subtotal" class="subtotal" style="width: 100%;">
                                                Sub total
                                                <span style="float: right;" :text="'₹'+Order.Subtotal">₹00.00</span>
                                            </p>
                                        </b>
                                        <b if="Order.Discount" style="display: flex; align-items: center; gap: 0.5em;">
                                            <p id="appliedCouponDetails"
                                                style="width: 100%; height: 20px; align-items: center;">
                                                Discount
                                                <span style="float: right;" :text="'-₹'+Order.Discount">-₹00.00</span>
                                            </p>
                                        </b>
                                        <b>
                                            <p if="Order.Delivery" class="deliveryCharges" style="width: 100%;">
                                                Delivery Charges
                                                <span style="float: right;" :text="'₹'+Order.Delivery">₹00.00</span>
                                            </p>
                                        </b>
                                    </div>
                                    <div style="height: 1px; background-color: black; margin: 1.5em 0;"></div>
                                    <h6 class="finalAmount" style="width: 100%;">
                                        You Pay
                                        <strong style="float: right;" :text="'₹'+Order.Total">₹00.00</strong>
                                    </h6>
                                </div>
        
                                <p>Scan the QRcode via any UPI app to make payment of
                                    <span :text="'₹'+ Order.Total"></span></span>
                                </p>
                                <p>Page will automatically get refreshed after payment got successful</p>
                            </div>
                            <div style="display: flex; flex-direction: column; justify-content: center; gap: 1em; width: 400px; max-width: 80vw;">
                                <div style="color: #c8c8c8; flex: 1;">.</div>
                                <div if="showingQRCode" ref="qrcodejs" style="margin: auto;"></div>
                                <button if="Order.Total > 0 && !Agent" class="button w-inline-block" type="button" @click="showQRCode">
                                    <div if="!showingQRCode" class="text-button" style="color: #f8f8f8">Show QR code to make
                                        payment
                                    </div>
                                    <div if="showingQRCode" class="text-button" style="color: #f8f8f8">Hide QR code</div>
                                </button>
                                <a if="Order.Total > 0" class="button w-inline-block" type="button" :href="paymentLink">
                                    <div class="text-button" style="color: #f8f8f8">Make Payment from any upi app </div>
                                </a>
                                <div style="color: #c8c8c8; flex: 1;">.</div>
                                <button if="!Order.Total" class="button w-inline-block" type="button" @click="PaidZero">
                                    <div class="text-button" style="color: #f8f8f8">Continue</div>
                                </button>
                                <button class="button w-inline-block" type="button" @click="Cancel">
                                    <div class="text-button" style="color: #f8f8f8">Cancel</div>
                                </button>
                                <!-- <p>QR code expire in 5:00 minutes</p> -->
                            </div>
                        </div>
                    </div>
                    <div if="Order.PaymentDoneOn" style="display: flex; flex-direction: row; flex-wrap: wrap; gap: 2em;">
                        <div style="display: flex;flex-direction: column;align-items: start;gap: 1em;">
                            <img src="/assets/img/image122.png"/>
                            <h3 if="!urlProductID">Order Placed Successfully</h3>
                            <p if="!urlProductID">Your order has been placed and you will receive the tracking link over SMS</p>
                            
                            <h3 if="urlProductID">Order Placed Successfully</h3>
                            <p if="urlProductID">Your order has been placed and you can scan your codebell again to activet it</p>

                            <button class="button w-inline-block" style="width: 13em;" type="button" @click="Cancel">
                                <div class="text-button" style="color: #f8f8f8">Ok</div>
                            </button>
                        </div>
                        <div>
                            <img src="/assets/img/hero-ill.png"/>
                        </div>
                    </div>
                </div>
            </loading-view>
        </div>
        <div if="Agent"
            style="display: flex;flex-direction: row;align-items: center;margin: 0.2em 1em;border: 1px solid currentColor;border-radius: 0.5em;position: fixed;right: 0;top: 0;z-index: 600; overflow: hidden;background: #f8f7f3;">
            <img :src="Agent.Photo" style="height: 45px; width: auto;" />
            <label :text="Agent.Name" style="margin-bottom: -2px;"></label>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="red" class="bi bi-x-circle" viewBox="0 0 16 16" @click="logoutAgent" style="margin: 1em;">
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
            </svg>
        </div>
    `)
    }
    Cancel(){
        this.data.Show = false
        this.data.urlOrderID = false
        this.data.Order = false
        this.data.urlProductID = 0
        window.history.replaceState({}, "", location.origin + location.pathname)
        if(this.data.Agent){
            this.data.Name = ""
            this.data.Email = ""
            this.data.Mobile = ""
            this.data.coupon_code = ""
        }
    }
    logoutAgent(){
        
        localStorage.removeItem("Agent")
        this.data.Agent = false
    }
    PaidZero(event){
        event.preventDefault()
        event.stopPropagation()
        var request_data = {
            PaymentMethod : "Coupon",
            PaymentResult : "Done",
            PaymentStatus : "Received",
            AgentID : this.data.Agent.ID
        }
        this.UpdateOrderPayment(request_data)
    }
    PaidOnline(event){
        event.preventDefault()
        event.stopPropagation()
        if (!this.data.Agent || !this.data.Agent.ID) {
            return
        }
        var request_data = {
            PaymentMethod : "UPI Code By Agent",
            PaymentResult : "Done",
            PaymentStatus : "Unverified",
            AgentID : this.data.Agent.ID
        }
        this.UpdateOrderPayment(request_data)
    }
    PaidInCash(event){
        event.preventDefault()
        event.stopPropagation()
        if (!this.data.Agent || !this.data.Agent.ID) {
            return
        }
        var request_data = {
            PaymentMethod : "Paid In Cash",
            PaymentResult : "Done",
            PaymentStatus : "Unverified",
            AgentID : this.data.Agent.ID
        }
        this.UpdateOrderPayment(request_data)
    }
    UpdateOrderPayment(request_data){
        if (!this.data.Order || !this.data.Order.ID || this.data.loading) {
            return
        }
        request_data.OrderID = this.data.Order.ID
        this.data.loading = true        
        window.call_api("update_order_payment", request_data).then((data) => {
            if (data && data.Status == 2 && data.Result.Order) {
                this.data.Order = data.Result.Order
            }
        }).catch((error) => {
            console.log(error)
        }).finally(() => {
            this.data.loading = false;
        });
    }
    showQRCode(event, forced) {
        if(forced){
            this.data.showingQRCode =  true
        }else{
            this.data.showingQRCode = !this.data.showingQRCode
        }
        if (this.data.showingQRCode) {
            if(this.qrcode){
                this.qrcode.clear()
                delete this.qrcode
                this.refs.qrcodejs.innerHTML = ""
            }
            this.qrcode = new QRCode(this.refs.qrcodejs, {
                width: 259,
                height: 259,
                colorDark: "#042638",
                text: this.data.paymentLink,
            });
        }
    }
    setValue(prop, event) {
        if(!this.data.Agent || !this.data.Agent.ID ){
            localStorage.setItem(prop, event.target.value)
        }        
        this.data[prop] = event.target.value
    }
    getData() {
        var Agent = false
        var agent_string = localStorage.getItem("Agent")
        if(agent_string){
            try {
                Agent = JSON.parse(agent_string)
            } catch (error) {
                console.log(error)
            }
        }

        var Name
        Name = localStorage.getItem("Name")
        if(!Name || (Agent && Agent.ID > 0)){
            Name = ""
        }

        var Email
        Email = localStorage.getItem("Email")
        if(!Email || (Agent && Agent.ID > 0)){
            Email = ""
        }

        var Mobile
        Mobile = localStorage.getItem("Mobile")
        if(!Mobile || (Agent && Agent.ID > 0)){
            Mobile = ""
        }

        var Address
        Address = localStorage.getItem("Address")
        if(!Address || (Agent && Agent.ID > 0)){
            Address = ""
        }

        var Pin
        Pin = localStorage.getItem("Pin")
        if(!Pin || (Agent && Agent.ID > 0)){
            Pin = ""
        }

        var City
        City = localStorage.getItem("City")
        if(!City || (Agent && Agent.ID > 0)){
            City = ""
        }

        var Country
        Country = localStorage.getItem("Country")
        if(!Country || (Agent && Agent.ID > 0)){
            Country = "India"
        }

        const urlParams = new URLSearchParams(location.search); 

        var agent_code = urlParams.get('agent')
        var buyNowID = urlParams.get('buyNow')
        var codebellID = urlParams.get('codebell')

        var _Name = urlParams.get('name')
        if(_Name){
            Name = _Name
        }
        var _Email = urlParams.get('email')
        if(_Email){
            Email = _Email
        }
        var _Mobile = urlParams.get('mobile')
        if(_Mobile){
            Mobile = _Mobile
        }
        var orderID = urlParams.get('order')
        if(!orderID){
            orderID = 0
        }
        var codebell_id = urlParams.get('codebell_id')
        if(!codebell_id){
            codebell_id = 0
        }
        return {
            codebell_id : codebell_id,
            urlOrderID : orderID,
            urlProductID : buyNowID,
            agent_code: agent_code,
            Agent : Agent,
            Name: Name,
            Email: Email,
            Mobile: Mobile,
            Address: Address,
            Pin: Pin,
            City: City,
            Country: Country,
            Show: false,
            Order: false,
            loading: false,
            name_error: "",
            email_error: "",
            mobile_error: "",
            agent_code_error: "",
            address_error: "",
            pincode_error: "",
            city_error: "",
            country_error: "",
            Products: {},
            SelectedProducts: {},
            paymentLink: "",
            showingQRCode: false,
            coupon_code : "",
            coupon_code_error : "",
        }
    }
    add_to_cart() {

    }
    buyNow(id) {
        if (this.data.Products[id]) {
            this.data.Order = false
            this.data.SelectedProducts = {}
            this.data.SelectedProducts[id] = this.data.Products[id]
            this.data.SelectedProducts[id].Count = 1
            this.data.Show = true
        } else {
            window.show_error("Invalid Product")
        }
    }
    on__load() {
        window.app = this
        window.buyNow = (product_id) => {
            this.buyNow(product_id)
        }
        if(this.data.agent_code){
            this.getProducts({
                agent_code : this.data.agent_code
            })
        }else if(this.data.urlOrderID){
            this.getProducts({
                uuid : this.data.urlOrderID
            })
        }else{            
            this.getProducts({})
        }
    }
    checkout(event) {
        event.preventDefault()
        event.stopPropagation()
        if (this.data.loading) {
            return
        }
        this.data.loading = true
        var request_data = {
            Name: this.data.Name,
            Email: this.data.Email,
            Mobile: this.data.Mobile,
            products: Object.values(this.data.SelectedProducts)
        }
        if(this.data.codebell_id){
            request_data.codebell_id = this.data.codebell_id
        }
        if(this.data.coupon_code){
            request_data.coupon_code = this.data.coupon_code
        }
        if(this.data.Agent && this.data.Agent.ID > 0 ){
            request_data.AgentID = this.data.Agent.ID
        }else{
            request_data.Address = this.data.Address
            request_data.Pin = this.data.Pin
            request_data.City = this.data.City
            request_data.Country = this.data.Country
        } 
        window.call_api("place_order", request_data).then((data) => {
            if (data && data.Status == 2 && data.Result.Order) {
                this.data.Order = data.Result.Order
            }
        }).catch((error) => {
            console.log(error)
        }).finally(() => {
            this.data.loading = false;
        });
    }
    getProducts(request_data) {
        this.data.loading = true
        window.call_api("products", request_data).then((data) => {
            if (data && data.Status == 2 && data.data) {
                this.data.Products = {}
                data.data.forEach(Product => {
                    this.data.Products[Product.ProductID] = Product
                })
                if(data.Result.Agent){
                    this.data.Agent = data.Result.Agent
                    localStorage.setItem("Agent" , JSON.stringify(data.Result.Agent))
                }
                if (data.Result.Order) {
                    this.data.Order = data.Result.Order
                    this.data.Show = true
                }else if (this.data.Products[this.data.urlProductID]) {
                    this.buyNow(this.data.urlProductID)
                }
            }
        }).catch((error) => {
            console.log(error)
        }).finally(() => {
            this.data.loading = false;
        });
    }
    async startPayment(methods) {
        // Initialization of PaymentRequest arguments are excerpted for the sake of
        // brevity.
        // supportedMethods: ['https://tez.google.com/pay'],
        const details = {
            total: {
                label: "Total",
                amount: { value: this.data.Order.Total, currency: "INR" },
            },
        };
        const payment = new PaymentRequest(methods, details, {});
        try {
            const response = await payment.show();
            // Process response here, including sending payment instrument
            // (e.g., credit card) information to the server.
            // paymentResponse.methodName contains the selected payment method
            // paymentResponse.details contains a payment method specific response
            await response.complete("success");
        } catch (err) {
            console.error("Uh oh, something bad happened", err.message);
        }
    };
    set_websocket(order_id) {
        if(this.socket){
            return
        }
        var socketProtocol = "ws://"
        if (window.location.protocol == "https:") {
            socketProtocol = "wss://"
        }
        var url = "/api/"
        if (location.hostname == "localhost") {
            url = "api.localhost/api/ws_order/"+order_id
        } else {
            url = "api.codebell.io/api/ws_order/"+order_id
        }
        url = new URL(socketProtocol + url);
        try {
            this.socket = new WebSocket(url.href);
        } catch (error) {
            console.log(error)
            return
        }
        this.socket.onopen = () => {
            this.online = true
        };

        this.socket.onclose = event => {
            this.socket = null
            this.online = false
        };

        this.socket.onmessage = event => {
            var events = JSON.parse(event.data);
            Object.keys(events).forEach(event => {
                console.log("Received socket event")
                console.log(event)
                if(event == "Order"){
                    this.data.Order = events.Order
                }
            });
        }

        this.socket.onerror = error => {
            this.error = true
            console.log("Socket Error: ", error);
            this.message = "Socket Error: " + error.currentTarget.readyState
        };
    }
    propertyChangedCallback(prop, old_value, new_value) {
        switch (prop) {
            case "Order":
                if (this.data.Order && this.data.Order.Total > 0) {
                    this.data.paymentLink = "upi://pay?pa=CODEBELL@icici&pn=Codebell&tr=EZY"+this.data.Order.ID+"&am=" + this.data.Order.Total + "&cu=INR&mc=6012"
                    window.history.replaceState({}, "", location.origin + location.pathname+ "?order="+this.data.Order.UUID)
                    this.set_websocket(this.data.Order.ID)
                    if(this.data.Agent){
                        this.data.Name = ""
                        this.data.Email = ""
                        this.data.Mobile = ""
                        this.data.coupon_code = ""
                        this.showQRCode(null, true)
                    }
                }
                break;
            default:
                break;
        }
    }
}
window.customElements.define('app-div', AppDiv);