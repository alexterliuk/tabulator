const signInForm = document.querySelector('#signInPanel form');

signInForm.addEventListener('submit', async event => {
  event.preventDefault();

  const name = pickElem('signInUsername').value;
  const password = pickElem('signInPassword').value;
  const errElem = querySel('#signInPanel .err-msg');

  if (!errElem.classList.value.includes('active-error')) {
    if (!name || !password) {
      const message = 'Name and password fields are required.';
      showError(message, errElem);

    } else {
      const response = await fetch('http:/sign-in', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, password }),
      });

      if (response.status === 400) {
        const message = 'Sign in to site failed. Make sure you haven\'t made a typo in your username or password.';
        showError(message, errElem);
      }

      if (response.status === 200) {
        $emit(response, signInForm, 'sign-in');
      }
    }
  }
});