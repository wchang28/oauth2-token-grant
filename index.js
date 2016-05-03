(function(global, factory) {
	module.exports = factory();
})(this, function() {
	function OAuth2TokenGrant(jQuery, tokenGrantUrl, client_id, client_secret, redirect_uri) {
		this.getAccessTokenFromAuthCode = function(code, done) {
			var data = {
				grant_type: 'authorization_code'
				,code: code
				,client_id: client_id
				,client_secret: client_secret
				,redirect_uri: redirect_uri
			};
			jQuery.post(tokenGrantUrl, data)
			.done(function(data) {
				var access = JSON.parse(data);
				if (typeof done === 'function') done(null, access);
			}).fail(function(err) {
				if (typeof done === 'function') done(err, null);
			});		
		};
		this.getAccessTokenFromPassword = function (username, password, done) {
			var data = {
				grant_type: 'password'
				,client_id: client_id
				,client_secret: client_secret
				,username: username
				,password: password
			};
			jQuery.post(tokenGrantUrl, data)
			.done(function(data) {
				var access = JSON.parse(data);
				if (typeof done === 'function') done(null, access);
			}).fail(function(err) {
				if (typeof done === 'function') done(err, null);
			});			
		};
		this.refreshAccessToken = function (refresh_token, done) {
			var data = {
				grant_type: 'refresh_token'
				,client_id: client_id
				,client_secret: client_secret
				,refresh_token: refresh_token
			};
			jQuery.post(tokenGrantUrl, data)
			.done(function(data) {
				var access = JSON.parse(data);
				if (typeof done === 'function') done(null, access);
			}).fail(function(err){
				if (typeof done === 'function') done(err, null);
			});		
		};
	}
	return OAuth2TokenGrant;
});
