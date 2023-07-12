class AppDiv extends CodBellElement {
    getContent() {
        return (`
        <style>
            label {
                color: #4a4a4a;
                margin: 12px;
            }

            input,
            textarea {
                padding: 1em;
                border-radius: 1em;
                width: 300px;
                border: 2px solid #2F8AB2;
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

            .button {
                display: -webkit-box;
                display: -webkit-flex;
                display: -ms-flexbox;
                display: flex;
                padding: 1.2em 2em;
                -webkit-box-orient: horizontal;
                -webkit-box-direction: normal;
                -webkit-flex-direction: row;
                -ms-flex-direction: row;
                flex-direction: row;
                -webkit-box-pack: center;
                -webkit-justify-content: center;
                -ms-flex-pack: center;
                justify-content: center;
                -webkit-box-align: center;
                -webkit-align-items: center;
                -ms-flex-align: center;
                align-items: center;
                grid-column-gap: 0.3em;
                border-radius: 10em;
                background-color: #161613;
                -webkit-transition: box-shadow 400ms cubic-bezier(0.165, 0.84, 0.44, 1), -webkit-transform 400ms cubic-bezier(0.165, 0.84, 0.44, 1);
                transition: box-shadow 400ms cubic-bezier(0.165, 0.84, 0.44, 1), -webkit-transform 400ms cubic-bezier(0.165, 0.84, 0.44, 1);
                transition: box-shadow 400ms cubic-bezier(0.165, 0.84, 0.44, 1), transform 400ms cubic-bezier(0.165, 0.84, 0.44, 1);
                transition: box-shadow 400ms cubic-bezier(0.165, 0.84, 0.44, 1), transform 400ms cubic-bezier(0.165, 0.84, 0.44, 1), -webkit-transform 400ms cubic-bezier(0.165, 0.84, 0.44, 1);
                text-decoration: none;
            }
            .payment_box{
                width: fit-content; 
                max-width:90vw; 
                display: flex; 
                flex-direction: row; 
                gap:1em; 
                flex-wrap: wrap; 
            }
            p, h5, h4{
                margin: 0.7em;
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

                .form_grid label {
                    line-height: 1em;
                    margin-bottom: 0;
                }
                .payment_box{
                    flex-direction: column
                }
            }
        </style>
        <div if="Show" class="orderPopUpOverlay" style="font-size: 16x;">
            <loading-view :value="loading">
                <form if="!Order || !Order.Reviewed" class="orderPopUp" @submit="checkout">
                    <div style="display: flex;flex-wrap: wrap; justify-content: space-between;">
                        <label style="font-weight: 400;font-size: 20px;line-height: 30px; margin-bottom: 1em;">
                            We need your details to continue
                        </label>
                    </div>
                    <div style="display: flex; flex-wrap: wrap; gap: 1em; justify-content: center; padding-bottom: 2em;">
                        <div class="form_grid">
                            <label for="name_input" :style="Order?'opacity: 37%;':''"> Name* </label>
                            <div :style="Order?'opacity: 37%;':''">
                                <input id="name_input" name="name_input" ref="name_input" :value="Name"
                                    @input="setValue('Name', event)" type="text" placeholder="Alex" :readonly="!!Order">
                                <span class="error" :text="name_error"></span>
                            </div>
                            <label for="mobile_input" :style="Order?'opacity: 37%;':''"> Mobile* </label>
                            <div :style="Order?'opacity: 37%;':''">
                                <input id="mobile_input" name="mobile_input" ref="mobile_input" :value="Mobile"
                                    @input="setValue('Mobile', event)" :readonly="!!Order" type="text" maxlength="10"
                                    placeholder="Your Mobile number">
                                <span class="error" :text="mobile_error"></span>
                            </div>
                            <label if="by_agent" style="width: 165px;"> Agent Code *</label>
                            <div if="by_agent">
                                <input id="agent_code_input" name="agent_code_input" ref="agent_code_input" :value="agent_code"
                                    @input="setValue('agent_code', event)" type="text" placeholder="Agent Code">
                                <span class="error" :text="agent_code_error"></span>
                            </div>
                            <label if="!(by_agent || (Order && Order.CodebellID))" for="address_input" style="width: 165px;">
                                Address*</label>
                            <div if="!(by_agent || (Order && Order.CodebellID))">
                                <textarea id="address_input" name="address_input" :text="Address"
                                    @input="setValue('Address', event)" placeholder="Your delivery address"
                                    style="height: 94px;"></textarea>
                                <span class="error" :text="address_error"></span>
                            </div>
                            <label if="!(by_agent || (Order && Order.CodebellID))" for="pincode_input"> Postal Pin Code* </label>
                            <div if="!(by_agent || (Order && Order.CodebellID))">
                                <input id="pincode_input" name="pincode_input" :value="Pin" @input="setValue('Pin', event)"
                                    type="text" placeholder="pin code / postal code / area code " />
                                <span class="error" :text="pincode_error"></span>
                            </div>
                            <label for="coupon_code_input" style="width: 165px;"> Coupon Code </label>
                            <div>
                                <input id="coupon_code_input" name="coupon_code_input" ref="coupon_code_input"
                                    :value="coupon_code" @input="setValue('coupon_code', event)" type="text"
                                    placeholder="Coupon Code is optional">
                                <span class="error" :text="coupon_code_error"></span>
                            </div>
                        </div>
                    </div>
                    <div
                        style="display: flex;justify-content: center;align-items: end;flex-direction: row;gap: 1em;">
                        <button class="button w-inline-block" style="width: 13em;" type="button" @click="Cancel">
                            <div class="text-button" style="color: #f8f8f8">Cancel</div>
                        </button>
                        <button class="button w-inline-block" style="width: 13em;align-self: flex-end;" type="submit">
                            <div class="text-button" style="color: #f8f8f8">Proceed to Pay</div>
                        </button>
                    </div>
                    <label for="by_agent_input" style="display: flex; align-items: center;">
                        <input type="checkbox" name="by_agent_input" id="by_agent_input" :checked="by_agent"
                            @input="toggle_by_agent" style="width: auto; margin: auto 0.5em !important;">
                        Sold by Agent
                    </label>
                </form>
                <div if="Order && Order.Reviewed" class="orderPopUp">
                    <div if="!Order.PaymentDoneOn" style="display: flex; flex-direction: column;">
                        <div class="payment_box">
                            <div style="display: flex; flex-direction: column; justify-content: center; align-items: center; width: 400px; max-width: 80vw; min-height: 40vh;">
                                <h4><span :text="Order.Name"></span> You are just 1 step away from geting codebell</h4>

                                <div style="width: -webkit-fill-available;">
                                    <h5>Price Details</h5>
                                    <div for-loop="Object.values(this.data.SelectedProducts).length" style="display: flex; align-items: center; gap: 0.5em;">
                                            <p style="width: 100%; height: 20px; align-items: center;">
                                                <span>
                                                    <span :text="Object.values(this.data.SelectedProducts)[index].Title"></span>
                                                    (<span :text="'₹'+Object.values(this.data.SelectedProducts)[index].Price"></span> *
                                                    <span :text="Object.values(this.data.SelectedProducts)[index].Count"></span>)
                                                </span>
                                                <span style="float: right;" :text="'₹'+Object.values(this.data.SelectedProducts)[index].Cost">-₹00.00</span>
                                            </p>
                                    </div>
                                    <div if="Order.Subtotal != Order.Total" style="height: 1px; background-color: black; margin: 1em 0;"></div>
                                    <div if="Order.Subtotal != Order.Total" style="margin: 1em 0;">
                                        <p if="Order.Subtotal" class="subtotal">
                                            <b>
                                                Sub total
                                                <span style="float: right;" :text="'₹'+Order.Subtotal">₹00.00</span>
                                            </b>
                                        </p>
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
                                    <div style="height: 1px; background-color: black; margin: 1em 0;"></div>
                                    <p class="finalAmount" style="font-weight: bold;">
                                        You Pay
                                        <strong style="float: right;" :text="'₹'+Order.Total">₹00.00</strong>
                                    </p>
                                </div>

                                <p>Scan the QRcode via any UPI app to make payment of
                                    <span :text="'₹'+ Order.Total"></span></span>
                                </p>
                                <p>Page will automatically get refreshed after payment got successful</p>
                            </div>
                            <div style="display: flex; flex-direction: column; justify-content: center; width: 400px; max-width: 80vw;">
                                <div style="color: #c8c8c8; flex: 1;">.</div>
                                <div if="showingQRCode" ref="qrcodejs" style="margin: auto;"></div>

                                <a if="Order.Total > 0 && !showingQRCode" class="button w-inline-block" type="button"
                                    :href="paymentLink">
                                    <span class="text-button" style="color: #f8f8f8">Make Payment from any upi app </span>
                                </a>

                                <a if="Order.Total > 0 && !Agent" class="w-inline-block" type="button" @click="showQRCode"
                                    style="text-align: center;">
                                    <span if="!showingQRCode" class="text-button">
                                        Show QR code to make payment
                                    </span>
                                    <span if="showingQRCode" class="text-button">Hide QR code</span>
                                </a>
                                <div style="color: #c8c8c8; flex: 1;">.</div>
                                <button if="!Order.Total" class="button w-inline-block" type="button" @click="PaidZero">
                                    <span class="text-button" style="color: #f8f8f8">Continue</span>
                                </button>
                                <button class="button w-inline-block" type="button" @click="Cancel">
                                    <span class="text-button" style="color: #f8f8f8">Cancel</span>
                                </button>
                                <!-- <p>QR code expire in 5:00 minutes</p> -->
                            </div>
                        </div>
                    </div>
                    <div if="Order.PaymentDoneOn" style="display: flex; flex-direction: row; flex-wrap: wrap; gap: 2em;">
                        <div style="display: flex;flex-direction: column;align-items: start;gap: 1em;">
                            <img src="/assets/img/image122.png" />
                            <h3>Order Placed Successfully</h3>
                            <p if="Order.CodebellID">Your order has been placed and you can scan your codebell again to activet it</p>
                            <p if="!Order.CodebellID">Your order has been placed and you will receive the tracking link over SMS</p>
                            <button class="button w-inline-block" style="width: 13em;" type="button" @click="Cancel">
                                <div class="text-button" style="color: #f8f8f8">Ok</div>
                            </button>
                        </div>
                        <div>
                            <img src="/assets/img/hero-ill.png" />
                        </div>
                    </div>
                </div>
            </loading-view>
        </div>
        <div if="Agent"
            style="display: flex;flex-direction: row;align-items: center;margin: 0.2em 1em;border: 1px solid currentColor;border-radius: 0.5em;position: fixed;right: 0;top: 0;z-index: 600; overflow: hidden;background: #f8f7f3;">
            <img :src="Agent.Photo" style="height: 45px; width: auto;" />
            <label :text="Agent.Name" style="margin-bottom: -2px;"></label>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="red" class="bi bi-x-circle" viewBox="0 0 16 16"
                @click="logoutAgent" style="margin: 1em;">
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                <path
                    d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
            </svg>
        </div>
`)
    }
    toggle_by_agent() {
        this.data.by_agent = !this.data.by_agent
        if (this.data.by_agent) {
            this.data.Address = ""
            this.data.Pin = ""
        } else if (this.data.Agent) {
            this.logoutAgent()
        }

    }
    Cancel() {
        this.data.Show = false
        this.data.urlOrderID = false
        this.data.Order = false
        this.data.urlProductID = 0
        window.history.replaceState({}, "", location.origin + location.pathname)
        if (this.data.Agent) {
            this.data.Name = ""
            this.data.Email = ""
            this.data.Mobile = ""
            this.data.coupon_code = ""
        }
    }
    logoutAgent() {
        localStorage.removeItem("Agent")
        this.data.Agent = false
        this.data.agent_code = ""
        this.data.by_agent = false
    }
    PaidZero(event) {
        event.preventDefault()
        event.stopPropagation()
        var request_data = {
            PaymentMethod: "Coupon",
            PaymentResult: "Done",
            PaymentStatus: "Received",
            AgentID: this.data.Agent.ID
        }
        this.UpdateOrderPayment(request_data)
    }
    PaidOnline(event) {
        event.preventDefault()
        event.stopPropagation()
        if (!this.data.Agent || !this.data.Agent.ID) {
            return
        }
        var request_data = {
            PaymentMethod: "UPI Code By Agent",
            PaymentResult: "Done",
            PaymentStatus: "Unverified",
            AgentID: this.data.Agent.ID
        }
        this.UpdateOrderPayment(request_data)
    }
    PaidInCash(event) {
        event.preventDefault()
        event.stopPropagation()
        if (!this.data.Agent || !this.data.Agent.ID) {
            return
        }
        var request_data = {
            PaymentMethod: "Paid In Cash",
            PaymentResult: "Done",
            PaymentStatus: "Unverified",
            AgentID: this.data.Agent.ID
        }
        this.UpdateOrderPayment(request_data)
    }
    UpdateOrderPayment(request_data) {
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
        if (event) {
            event.preventDefault()
            event.stopPropagation()
        }
        if (forced) {
            this.data.showingQRCode = true
        } else {
            this.data.showingQRCode = !this.data.showingQRCode
        }
        if (this.data.showingQRCode) {
            if (this.qrcode) {
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
        if (!this.data.Agent || !this.data.Agent.ID) {
            localStorage.setItem(prop, event.target.value)
        }
        this.data[prop] = event.target.value
    }
    getData() {
        const urlParams = new URLSearchParams(location.search);
        var orderID = urlParams.get('order')
        if (!orderID) {
            orderID = 0
        }
        var by_agent = false
        var agent_code = urlParams.get('agent')
        var Agent = false
        var agent_string = localStorage.getItem("Agent")
        if (agent_string) {
            try {
                Agent = JSON.parse(agent_string)
                agent_code = Agent.Code
                by_agent = true
            } catch (error) {
                console.log(error)
            }
        }

        var Name = ""
        Name = localStorage.getItem("Name")
        if (!Name || (Agent && Agent.ID > 0)) {
            Name = ""
        }

        var Email
        Email = localStorage.getItem("Email")
        if (!Email || (Agent && Agent.ID > 0)) {
            Email = ""
        }

        var Mobile
        Mobile = localStorage.getItem("Mobile")
        if (!Mobile || (Agent && Agent.ID > 0)) {
            Mobile = ""
        }

        var Address
        Address = localStorage.getItem("Address")
        if (!Address || (Agent && Agent.ID > 0)) {
            Address = ""
        }

        var Pin
        Pin = localStorage.getItem("Pin")
        if (!Pin || (Agent && Agent.ID > 0)) {
            Pin = ""
        }

        var City
        City = localStorage.getItem("City")
        if (!City || (Agent && Agent.ID > 0)) {
            City = ""
        }

        var Country
        Country = localStorage.getItem("Country")
        if (!Country || (Agent && Agent.ID > 0)) {
            Country = "India"
        }
        return {
            urlOrderID: orderID,
            agent_code: agent_code,
            Agent: Agent,
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
            coupon_code: "",
            coupon_code_error: "",
            by_agent: by_agent,

        }
    }
    add_to_cart() {

    }
    buyNow(id) {
        if (this.data.Products[id]) {
            this.data.Order = false
            if(!this.data.SelectedProducts[id]){
                this.data.SelectedProducts = {}
                this.data.SelectedProducts[id] = this.data.Products[id]
                this.data.SelectedProducts[id].Count = 1
                this.data.SelectedProducts[id].Cost = this.data.SelectedProducts[id].Price * this.data.SelectedProducts[id].Count
            }
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
        var request = {}
        if (this.data.agent_code) {
            request.agent_code = this.data.agent_code
        }
        if (this.data.urlOrderID) {
            request.uuid = this.data.urlOrderID
        }
        this.getProducts(request)
    }
    checkout(event) {
        event.preventDefault()
        event.stopPropagation()
        if (this.data.loading) {
            return
        }
        this.data.showingQRCode = false
        this.data.loading = true
        var request_data = {
            Name: this.data.Name,
            Email: this.data.Email,
            Mobile: this.data.Mobile,
            Reviewed: true,
            products: Object.values(this.data.SelectedProducts)
        }
        if (this.data.coupon_code) {
            request_data.coupon_code = this.data.coupon_code
        }
        if (this.data.agent_code) {
            request_data.agent_code = this.data.agent_code
        }
        if (this.data.Agent && this.data.Agent.ID > 0) {
            request_data.AgentID = this.data.Agent.ID
        } else {
            request_data.Address = this.data.Address
            request_data.Pin = this.data.Pin
            request_data.City = this.data.City
            request_data.Country = this.data.Country
        }
        window.call_api("place_order", request_data).then((data) => {
            if (data && data.Status == 2 && data.Result.Order) {
                this.data.Order = data.Result.Order
            }
            if (data.Result.Agent) {
                this.data.Agent = data.Result.Agent
                this.data.agent_code = this.data.Agent.Code
                this.data.by_agent = true
                localStorage.setItem("Agent", JSON.stringify(data.Result.Agent))
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
                if (data.Result.Agent) {
                    this.data.Agent = data.Result.Agent
                    this.data.agent_code = this.data.Agent.Code
                    this.data.by_agent = true
                    localStorage.setItem("Agent", JSON.stringify(data.Result.Agent))
                }
                if (data.Result.Order) {
                    this.data.Order = data.Result.Order
                    if (data.Result.OrderProducts) {
                        data.Result.OrderProducts.forEach(Product => {
                            this.data.SelectedProducts[Product.ProductID] = Product
                        })
                    }
                    this.data.Show = true
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
        if (this.socket) {
            return
        }
        var socketProtocol = "ws://"
        if (window.location.protocol == "https:") {
            socketProtocol = "wss://"
        }
        var url = "/api/"
        if (location.hostname == "localhost") {
            url = "api.localhost/api/ws_order/" + order_id
        } else {
            url = "api.codebell.io/api/ws_order/" + order_id
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
                if (event == "Order") {
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
                if (this.data.Order && this.data.Order.ID > 0) {
                    this.data.paymentLink = "upi://pay?pa=CODEBELL@icici&pn=Codebell&tr=EZY" + this.data.Order.ID + "&am=" +
                        this.data.Order.Total + "&cu=INR&mc=6012"
                    window.history.replaceState({}, "", location.origin + location.pathname + "?order=" + this.data.Order.UUID)
                    this.set_websocket(this.data.Order.ID)
                    if (this.data.Agent) {
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