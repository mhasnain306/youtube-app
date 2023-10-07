

const useOAuth2 = () => {
    const client_id = "597889139500-mjjuu39tcofqrqkgscmna3k40k3pq196.apps.googleusercontent.com";
    const redirect_uri = "http://localhost:5173/oauth2";
    const scope = "https://www.googleapis.com/auth/youtube.readonly"

    function oauthSignIn() {
        // Google's OAuth 2.0 endpoint for requesting an access token
        var oauth2Endpoint = 'https://accounts.google.com/o/oauth2/v2/auth';

        // Create <form> element to submit parameters to OAuth 2.0 endpoint.
        var form = document.createElement('form');
        form.setAttribute('method', 'GET'); // Send as a GET request.
        form.setAttribute('action', oauth2Endpoint);

        // Parameters to pass to OAuth 2.0 endpoint.
        var params: { [key: string]: string } = {
            client_id: client_id,
            redirect_uri: redirect_uri,
            response_type: 'token',
            scope: scope,
        };

        // Add form parameters as hidden input values.
        for (var p in params) {
            var input = document.createElement('input');
            input.setAttribute('type', 'hidden');
            input.setAttribute('name', p);
            input.setAttribute('value', params[p]);
            form.appendChild(input);
        }

        // Add form to page and submit it to open the OAuth 2.0 endpoint.
        document.body.appendChild(form);
        form.submit();
    }
    return { oauthSignIn };
}

export default useOAuth2