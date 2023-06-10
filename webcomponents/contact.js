class ContactView extends CodBellElement {
    constructor() {
        super();
    }
    on__load() {
        //this.style.display = "block"
    }
    getContent() {
        return `
        <form id="email-form" name="email-form" data-name="Email Form" method="get" class="form" aria-label="Email Form" @submit="submit">
            <input type="text" ref="name" class="text-field w-input" maxlength="256" name="name" data-name="Name" placeholder="Your Name"
                id="name" required>
            <input type="email" ref="email" class="text-field w-input" maxlength="256" name="email" data-name="Email"
                placeholder="Your Email" id="email" required>
            <input type="tel" ref="mobile" class="text-field w-input" maxlength="256" name="mobile" data-name="Mobile"
                placeholder="Your Mobile" id="mobile" required>
            <textarea  ref="msg" placeholder="Tell us how we can help" maxlength="5000" id="message" name="Message" data-name="field"
                class="textarea w-input" required></textarea>
            <input type="submit" value="Submit" data-wait="Please wait..." class="submit-button w-button">
        </form>
        <div class="success-message w-form-done" tabindex="-1" role="region" aria-label="Email Form success">
            <div class="text-success">Thank you! Your submission has been received!</div>
        </div>
        <div class="error-message w-form-fail" tabindex="-1" role="region" aria-label="Email Form failure">
            <div class="text-error">Oops! Something went wrong while submitting the form.</div>
        </div>
        `
    }
    getData() {
        return {
            loading: false,
            full_screen : false,
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
            if (data && data.Status == 2 && data.Result.Order) {
                
            }
        }).catch((error) => {
            console.log(error)
        }).finally(() => {
            this.data.loading = false;
        });
    }
}
window.customElements.define('contact-view', ContactView);