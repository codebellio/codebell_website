
var token = localStorage.getItem("token")
window.call_api = async (api, request_data) => {
    if (!api) {
        return
    }
    if (!request_data) {
        request_data = {}
    }
    var url = "/api/" + api
    if (location.hostname == "localhost") {
        url = "http://api.localhost/api/" + api
    } else {
        url = "https://api.codebell.io/api/" + api
    }
    return fetch(url, {
        method: 'post',
        headers: {
            "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
        },
        body: JSON.stringify(request_data)
    }).then(response => response.json()).then((data) => {
        console.log(data);
        if (data.Message && data.Message != this.last_message) {
            this.last_message = data.Message
            setTimeout(() => {
                this.last_message = ""
            }, 1000);
            if (data.Status == 2) {
                window.show_success(data.Message)
            } else {
                window.show_error(data.Message)
            }
        }
        return data
    }).catch((error) => {
        window.show_error("Unable to complete current action. " + error.message)
    })
}

window.show_error = (message) => {
    Snackbar.show({
        text: message, pos: 'top-center', actionText: 'Ok', backgroundColor: "#dc3545", actionTextColor: "#FFF"
    });
}

window.show_success = (message) => {
    Snackbar.show({
        text: message, pos: 'top-center', actionText: 'Ok', backgroundColor: "#198754", actionTextColor: "#FFF"
    });
}

window.show_warning = (message) => {
    Snackbar.show({
        text: message, pos: 'top-center', actionText: 'Ok', backgroundColor: "#ffff00", textColor: "#000", actionTextColor: "#000"
    });
}