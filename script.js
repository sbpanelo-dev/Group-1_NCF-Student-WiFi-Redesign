document.addEventListener("DOMContentLoaded", function () { 
  function showNotification(element, message, color) {
    element.style.color = color;
    element.textContent = message;
  }

  const registerBtn = document.getElementById("registerBtn");
  if (registerBtn) {
    registerBtn.addEventListener("click", function () {
      const studentId = document.getElementById("studentId").value.trim();
      const fullName = document.getElementById("fullName").value.trim();
      const email = document.getElementById("email").value.trim();
      const course = document.getElementById("course").value.trim();
      const password = document.getElementById("password").value;
      const confirmPassword = document.getElementById("confirmPassword").value;
      const notification = document.getElementById("notification");

      if (!studentId || !fullName || !email || !course || !password || !confirmPassword) {
        return showNotification(notification, "⚠️ Please fill in all fields.", "red");
      }

      if (password !== confirmPassword) {
        return showNotification(notification, "⚠️ Passwords do not match.", "red");
      }

      let users = JSON.parse(localStorage.getItem("users")) || [];
      let existingUser = users.find(u => u.studentId === studentId || u.email === email);

      if (existingUser) {
        return showNotification(notification, "⚠️ Already registered with this Student ID or Email.", "orange");
      }

      let hashedPassword = btoa(password);

      let newUser = { studentId, fullName, email, course, password: hashedPassword };
      users.push(newUser);
      localStorage.setItem("users", JSON.stringify(users));

      showNotification(notification, "✅ Registration successful! Redirecting to login...", "green");

      setTimeout(() => {
        window.location.href = "index.html"; 
      }, 2000);
    });
  }

  const loginForm = document.getElementById("loginForm");
  if (loginForm) {
    const loginIdInput = document.getElementById("loginId");
    const loginPasswordInput = document.getElementById("loginPassword");
    const rememberMeCheckbox = document.getElementById("rememberMe");
    const showPasswordCheckbox = document.getElementById("showPassword");

    const savedCredentials = JSON.parse(localStorage.getItem("rememberedUser"));
    if (savedCredentials) {
      loginIdInput.value = savedCredentials.loginId;
      loginPasswordInput.value = atob(savedCredentials.password);
      rememberMeCheckbox.checked = true;
    }

    if (showPasswordCheckbox) {
      showPasswordCheckbox.addEventListener("change", function () {
        loginPasswordInput.type = this.checked ? "text" : "password";
      });
    }

    loginForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const loginId = loginIdInput.value.trim();
      const loginPassword = loginPasswordInput.value;
      const loginNotification = document.getElementById("loginNotification");

      let users = JSON.parse(localStorage.getItem("users")) || [];
      let hashedPassword = btoa(loginPassword);

      let validUser = users.find(
        u => (u.studentId === loginId || u.email === loginId) && u.password === hashedPassword
      );

      if (validUser) {
        showNotification(loginNotification, "✅ Login successful! Welcome " + validUser.fullName, "green");
        localStorage.setItem("currentUser", JSON.stringify(validUser));

        if (rememberMeCheckbox.checked) {
          localStorage.setItem("rememberedUser", JSON.stringify({
            loginId: loginId,
            password: hashedPassword
          }));
        } else {
          localStorage.removeItem("rememberedUser"); 
        }

        setTimeout(() => {
          window.location.href = "login.html";
        }, 2000);
      } else {
        showNotification(loginNotification, "⚠️ Invalid Student ID/Email or Password.", "red");
      }
    });
  }
});
