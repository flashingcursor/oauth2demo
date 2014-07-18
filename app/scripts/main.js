console.log('\'Allo \'Allo!');
var scopes = 'email profile';
var client_id = '378440231544-kb1iudc06p9vmbpq2dt4a1bemagrck3g.apps.googleusercontent.com';

function handleAuth() {
  var request = gapi.client.oauth2.userinfo.get().execute(function(resp) {
    if (!resp.code) {
		// User is signed in, so hide the button
		$('#userinfo').text('Welcome ' + resp.name + ' (' + resp.email + ')');
		$('#loginButton').addClass('hide');

		$('#logoutButton').removeClass('hide');
		var token = gapi.auth.getToken();
		$('#logoutButton').attr('href', 'https://accounts.google.com/o/oauth2/revoke?token=' + token.access_token);
	}
    else 
    {
      $('#loginButton').removeClass('hide');
    }
  });
}

function signin(mode, callback) {
	  gapi.auth.authorize({client_id: client_id,scope: scopes, immediate: mode},callback);
}

function init() {
	var apisToLoad;
	var callback = function() {
	   if (--apisToLoad == 0) {
	     signin(true, handleAuth);
	   }
	}
	  
	apisToLoad = 1;
	gapi.client.load('oauth2','v2',callback);
	
	document.getElementById('loginButton').onclick = function() {
		signin(false,handleAuth);
	}
}