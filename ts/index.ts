import * as oauth2 from 'oauth2';
import * as $node from 'rest-node';
import * as FormData from 'form-data';

let $drv = $node.get();

export class TokenGrant implements oauth2.ITokenGrant {
	constructor(public tokenGrantOptions: oauth2.TokenGrantOptions, public clientAppSettings: oauth2.ClientAppSettings) {}
	get url():string {return (this.tokenGrantOptions && this.tokenGrantOptions.url ? this.tokenGrantOptions.url : '');}
	get client_id():string {return (this.clientAppSettings && this.clientAppSettings.client_id ? this.clientAppSettings.client_id : '');}
	get client_secret():string {return (this.clientAppSettings && this.clientAppSettings.client_secret ? this.clientAppSettings.client_secret : null);}
	get redirect_uri():string {return (this.clientAppSettings && this.clientAppSettings.redirect_uri ? this.clientAppSettings.redirect_uri : null);}
	get callOptions(): $node.ApiCallOptions {
		if (this.tokenGrantOptions && typeof this.tokenGrantOptions.rejectUnauthorized === 'boolean')
			return {rejectUnauthorized: this.tokenGrantOptions.rejectUnauthorized};
		else
			return null;
	}
	private getFormDataFromParams(params: oauth2.TokenGrantParams) : FormData {
		let formData = new FormData();
		for (let fld in params)
			if (params[fld]) formData.append(fld, params[fld]);
		return formData;
	}
	getAccessTokenFromAuthCode(code:string, done: oauth2.ITokenGrantCompletionHandler) : void {
		let params: oauth2.TokenGrantParams = {
			grant_type: 'authorization_code'
			,code: code
			,client_id: this.client_id
			,client_secret: this.client_secret
			,redirect_uri: this.redirect_uri
		};
		$drv.$F(this.url, this.getFormDataFromParams(params), done, this.callOptions);
	};
	getAccessTokenFromPassword(username:string, password:string, done: oauth2.ITokenGrantCompletionHandler) : void {
		let params: oauth2.TokenGrantParams = {
			grant_type: 'password'
			,client_id: this.client_id
			,client_secret: this.client_secret
			,username: username
			,password: password
		};
		$drv.$F(this.url, this.getFormDataFromParams(params), done, this.callOptions);	
	};
	refreshAccessToken(refresh_token:string, done: oauth2.ITokenGrantCompletionHandler) : void {
		let params: oauth2.TokenGrantParams = {
			grant_type: 'refresh_token'
			,client_id: this.client_id
			,client_secret: this.client_secret
			,refresh_token: refresh_token
		};
		$drv.$F(this.url, this.getFormDataFromParams(params), done, this.callOptions);
	};
}