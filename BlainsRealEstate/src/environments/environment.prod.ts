export const environment = {
  production: true,
  apiUri:'http://localhost:3000/api/v1',
  auth0:
  {
    domain: 'dev-yv5jum6b55awe8df.eu.auth0.com',
    clientId: 'CuWVaN9F7U1VN7FBCV5aywqT4iVt8Vg8',
    authorizationParams: {
      redirect_uri: window.location.origin,
    }
  }

};
