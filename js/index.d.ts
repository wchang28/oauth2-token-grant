import * as oauth2 from 'oauth2';
import * as $node from 'rest-node';
export declare class TokenGrant implements oauth2.ITokenGrant {
    tokenGrantOptions: oauth2.TokenGrantOptions;
    clientAppSettings: oauth2.ClientAppSettings;
    constructor(tokenGrantOptions: oauth2.TokenGrantOptions, clientAppSettings: oauth2.ClientAppSettings);
    readonly url: string;
    readonly client_id: string;
    readonly client_secret: string;
    readonly redirect_uri: string;
    readonly callOptions: $node.ApiCallOptions;
    private getFormDataFromParams(params);
    getAccessTokenFromAuthCode(code: string): Promise<oauth2.Access>;
    getAccessTokenFromPassword(username: string, password: string): Promise<oauth2.Access>;
    refreshAccessToken(refresh_token: string): Promise<oauth2.Access>;
}
