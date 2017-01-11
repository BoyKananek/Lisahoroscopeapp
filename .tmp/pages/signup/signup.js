import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { NavController, AlertController, LoadingController } from 'ionic-angular';
export var SignupPage = (function () {
    function SignupPage(navCtrl, http, alertCtrl, loadingCtrl) {
        this.navCtrl = navCtrl;
        this.http = http;
        this.alertCtrl = alertCtrl;
        this.loadingCtrl = loadingCtrl;
        this.disableSubmit = false;
    }
    SignupPage.prototype.validateEmail = function (email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    };
    SignupPage.prototype.signUpEmail = function () {
        var _this = this;
        this.disableSubmit = true;
        var data = {
            name: this.name,
            email: this.email,
            password: this.password,
            repassword: this.repassword
        };
        if (!this.name || !this.email || !this.password || !this.repassword) {
            var alert = this.alertCtrl.create({
                title: "Sign up failed",
                subTitle: "Please fill in the information above!",
                buttons: ["Close"]
            });
            alert.present();
            this.disableSubmit = false;
        }
        else if (!this.validateEmail(this.email)) {
            var alert = this.alertCtrl.create({
                title: "Sign up failed",
                subTitle: "Please make sure that you type in your email address correctly.",
                buttons: ["Close"]
            });
            alert.present();
            this.disableSubmit = false;
        }
        else if (this.password != this.repassword) {
            var alert = this.alertCtrl.create({
                title: "Sign up failed",
                subTitle: "Password does not match. Please try again.",
                buttons: ["Close"]
            });
            alert.present();
            this.disableSubmit = false;
        }
        else if (this.password.length < 8) {
            var alert = this.alertCtrl.create({
                title: "Sign up failed",
                subTitle: "Password length must be at least 8 characters or more.",
                buttons: ["Close"]
            });
            alert.present();
            console.log('Password is too short');
            this.disableSubmit = false;
        }
        else {
            this.http.post("https://lisahoroscope.herokuapp.com/api/signup", data)
                .subscribe(function (data) {
                var alert = _this.alertCtrl.create({
                    title: data.json().title,
                    subTitle: data.json().message,
                    buttons: ["Close"]
                });
                alert.present();
                _this.disableSubmit = false;
                _this.navCtrl.pop();
            }, function (error) {
                var alert = _this.alertCtrl.create({
                    title: "Sign up failed",
                    subTitle: "This email is already taken",
                    buttons: ["Close"]
                });
                alert.present();
                _this.disableSubmit = false;
            });
        }
    };
    SignupPage.decorators = [
        { type: Component, args: [{
                    selector: 'page-signup',
                    templateUrl: 'signup.html'
                },] },
    ];
    /** @nocollapse */
    SignupPage.ctorParameters = [
        { type: NavController, },
        { type: Http, },
        { type: AlertController, },
        { type: LoadingController, },
    ];
    return SignupPage;
}());
//# sourceMappingURL=signup.js.map