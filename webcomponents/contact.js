class ContactView extends CodBellElement {
    constructor() {
        super();
    }
    on__load() {
        //this.style.display = "block"
    }
    getContent() {
        return `
        <loading-view :value="loading">
            <form if="Status != 2" id="email-form" name="email-form" data-name="Email Form" method="get" class="form" aria-label="Email Form" @submit="submit">
                <div if="Status == 1" class="error-message w-form-fail" style="display: block;" tabindex="-1" role="region" aria-label="Email Form failure">
                    <div class="text-error">Oops! Something went wrong while submitting the form.</div>
                </div>
                
                <input type="text" ref="name" class="text-field w-input" maxlength="256" name="name" data-name="Name" placeholder="Your Name" autocomplete="name"
                    id="name" required>
                <input type="email" ref="email" class="text-field w-input" maxlength="256" name="email" data-name="Email"
                    placeholder="Your Email" id="email" required autocomplete="email">
                <input type="tel" ref="mobile" class="text-field w-input" maxlength="256" name="mobile" data-name="Mobile" autocomplete="mobile"
                    placeholder="Your Mobile" id="mobile" required>
                <textarea  ref="msg" placeholder="Tell us how we can help" maxlength="5000" id="message" name="Message" data-name="field"
                    class="textarea w-input" required></textarea>
                <input type="submit" value="Submit" data-wait="Please wait..." class="submit-button w-button">
            </form>
            <div if="Status == 2" class="success-message w-form-done" style="display: block;"  tabindex="-1" role="region" aria-label="Email Form success">
                <div class="text-success">Thank you! Your submission has been received!</div>
            </div>
        </loading-view>
        `
    }
    getData() {
        return {
            loading: false,
            Status : 0,
            Message : false,

        }
    }
    submit(event) {
        event.preventDefault()
        event.stopPropagation()
        if (this.data.loading) {
            return
        }
        this.data.loading = true
        debugger
        var request_data = {
            Name: this.refs.name.value,
            Email: this.refs.email.value,
            Mobile: this.refs.mobile.value,
            Message: this.refs.msg.value
        }
        window.call_api("contact", request_data).then((data) => {
            if (data) {
                this.data.Status = data.Status
                this.data.Message = data.Message
            }
        }).catch((error) => {
            console.log(error)
        }).finally(() => {
            this.data.loading = false;
        });
    }
}
window.customElements.define('contact-view', ContactView);