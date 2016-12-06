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
                title: "Sign up fail",
                subTitle: "Please fill in the information above!",
                buttons: ["close"]
            });
            alert.present();
            this.disableSubmit = false;
        }
        else if (!this.validateEmail(this.email)) {
            var alert = this.alertCtrl.create({
                title: "Sign up fail",
                subTitle: "Please enter your email in email format",
                buttons: ["close"]
            });
            alert.present();
            this.disableSubmit = false;
        }
        else if (this.password != this.repassword) {
            var alert = this.alertCtrl.create({
                title: "Sign up fail",
                subTitle: "Password and Re password must be the same!",
                buttons: ["close"]
            });
            alert.present();
            this.disableSubmit = false;
        }
        else if (this.password.length < 8) {
            var alert = this.alertCtrl.create({
                title: "Sign up fail",
                subTitle: "Password length should equal to 8 character or more than",
                buttons: ["close"]
            });
            alert.present();
            console.log('Password is too short');
            this.disableSubmit = false;
        }
        else {
            this.http.post("https://lisahoroscope.herokuapp.com/sendEmail", data)
                .subscribe(function (data) {
                var alert = _this.alertCtrl.create({
                    title: "Sign up successful",
                    subTitle: "Please verify your email address",
                    buttons: ["close"]
                });
                alert.present();
                _this.disableSubmit = false;
                _this.navCtrl.pop();
            }, function (error) {
                var alert = _this.alertCtrl.create({
                    title: "Sign up fail",
                    subTitle: "The email are already existing",
                    buttons: ["close"]
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