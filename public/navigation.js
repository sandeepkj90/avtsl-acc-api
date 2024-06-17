
    function navigateTo(pageName) {
        switch (pageName) {
          case 'DASHBOARD': {
            window.location.href ='/dashboard'
            break;
          }
          case 'CLIENT': {
            window.location.href ='/client'
            
          }
        }
      }
      function logout() {
        localStorage.removeItem('token');
        window.location.href = '/';
      }