"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var $node = require("rest-node");
var FormData = require("form-data");
var $drv = $node.get();
var TokenGrant = (function () {
    function TokenGrant(tokenGrantOptions, clientAppSettings) {
        this.tokenGrantOptions = tokenGrantOptions;
        this.clientAppSettings = clientAppSettings;
    }
    Object.defineProperty(TokenGrant.prototype, "url", {
        get: function () { return (this.tokenGrantOptions && this.tokenGrantOptions.url ? this.tokenGrantOptions.url : ''); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TokenGrant.prototype, "client_id", {
        get: function () { return (this.clientAppSettings && this.clientAppSettings.client_id ? this.clientAppSettings.client_id : ''); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TokenGrant.prototype, "client_secret", {
        get: function () { return (this.clientAppSettings && this.clientAppSettings.client_secret ? this.clientAppSettings.client_secret : null); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TokenGrant.prototype, "redirect_uri", {
        get: function () { return (this.clientAppSettings && this.clientAppSettings.redirect_uri ? this.clientAppSettings.redirect_uri : null); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TokenGrant.prototype, "callOptions", {
        get: function () {
            if (this.tokenGrantOptions && typeof this.tokenGrantOptions.rejectUnauthorized === 'boolean')
                return { rejectUnauthorized: this.tokenGrantOptions.rejectUnauthorized };
            else
                return null;
        },
        enumerable: true,
        configurable: true
    });
    TokenGrant.prototype.getFormDataFromParams = function (params) {
        var formData = new FormData();
        for (var fld in params)
            if (params[fld])
                formData.append(fld, params[fld]);
        return formData;
    };
    TokenGrant.prototype.getAccessTokenFromAuthCode = function (code, done) {
        var params = {
            grant_type: 'authorization_code',
            code: code,
            client_id: this.client_id,
            client_secret: this.client_secret,
            redirect_uri: this.redirect_uri
        };
        $drv.$F(this.url, this.getFormDataFromParams(params), done, this.callOptions);
    };
    ;
    TokenGrant.prototype.getAccessTokenFromPassword = function (username, password, done) {
        var params = {
            grant_type: 'password',
            client_id: this.client_id,
            client_secret: this.client_secret,
            username: username,
            password: password
        };
        $drv.$F(this.url, this.getFormDataFromParams(params), done, this.callOptions);
    };
    ;
    TokenGrant.prototype.refreshAccessToken = function (refresh_token, done) {
        var params = {
            grant_type: 'refresh_token',
            client_id: this.client_id,
            client_secret: this.client_secret,
            refresh_token: refresh_token
        };
        $drv.$F(this.url, this.getFormDataFromParams(params), done, this.callOptions);
    };
    ;
    return TokenGrant;
}());
exports.TokenGrant = TokenGrant;
