// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiUri:'https://61ario58n4.execute-api.eu-west-1.amazonaws.com/api/v1',
  auth0:
  {
    domain: 'dev-yv5jum6b55awe8df.eu.auth0.com',
    clientId: 'CuWVaN9F7U1VN7FBCV5aywqT4iVt8Vg8',
    authorizationParams: {
      redirect_uri: window.location.origin,
    }
  }

};


/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
