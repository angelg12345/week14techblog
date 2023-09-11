document.addEventListener('DOMContentLoaded', () => {
    document.addEventListener('DOMContentLoaded', () => {
        const loginForm = document.getElementById('login-form');
      
        loginForm.addEventListener('submit', async (e) => {
          e.preventDefault();
      
          const username = document.getElementById('username').value;
          const password = document.getElementById('password').value;
      
          try {
            const response = await fetch('/login', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ username, password }),
            });
      
            if (response.ok) {
              // Login successful, you can redirect or display a success message
              const data = await response.json();
              console.log('Login successful:', data);
            } else {
              // Error handling for failed login
              const errorMessage = await response.text();
              console.error('Login failed:', errorMessage);
            }
          } catch (error) {
            console.error('Error:', error);
          }
        });
      });
      
  });
  