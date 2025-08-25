document.addEventListener("DOMContentLoaded", function() {

  const registerBtn = document.getElementById("registerBtn");
  if (registerBtn) {
    registerBtn.addEventListener("click", function() {
      const studentId = document.getElementById("studentId").value.trim();
      const fullName = document.getElementById("fullName").value.trim();
      const email = document.getElementById("email").value.trim();
      const course = document.getElementById("course").value.trim();
      const password = document.getElementById("password").value;
      const confirmPassword = document.getElementById("confirmPassword").value;
      const notification = document.getElementById("notification");

      if (!studentId || !fullName || !email || !course || !password || !confirmPassword) {
        notification.style.color = "red";
        notification.textContent = "⚠️ Please fill in all fields.";
        return;
      }

      if (password !== confirmPassword) {
        notification.style.color = "red";
        notification.textContent = "⚠️ Passwords do not match.";
        return;
      }

      let users = JSON.parse(localStorage.getItem("users")) || [];

      let existingUser = users.find(u => u.studentId === studentId || u.email === email);
      if (existingUser) {
        notification.style.color = "orange";
        notification.textContent = "⚠️ You are already registered with this Student ID or Email.";
        return;
      }

      let newUser = { studentId, fullName, email, course, password };
      users.push(newUser);
      localStorage.setItem("users", JSON.stringify(users));

      notification.style.color = "green";
      notification.textContent = "✅ Registration successful! Redirecting to login...";

      setTimeout(() => {
        window.location.href = "index.html";
      }, 2000);
    });
  }


  const loginForm = document.getElementById("loginForm");
  if (loginForm) {
    loginForm.addEventListener("submit", function(e) {
      e.preventDefault();
      const loginId = document.getElementById("loginId").value.trim();
      const loginPassword = document.getElementById("loginPassword").value;
      const loginNotification = document.getElementById("loginNotification");

      let users = JSON.parse(localStorage.getItem("users")) || [];

      let validUser = users.find(u =>
        (u.studentId === loginId || u.email === loginId) && u.password === loginPassword
      );

      if (validUser) {
        loginNotification.style.color = "green";
        loginNotification.textContent = "✅ Login successful! Welcome " + validUser.fullName;
        localStorage.setItem("currentUser", JSON.stringify(validUser));

        setTimeout(() => {
          window.location.href = "login.html";
        }, 2000);
      } else {
        loginNotification.style.color = "red";
        loginNotification.textContent = "⚠️ Invalid Student ID/Email or Password.";
      }
    });
  }
});
