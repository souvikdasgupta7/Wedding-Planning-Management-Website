  // Wait until the DOM is fully loaded
document.addEventListener("DOMContentLoaded", function () {
  const logoutBtn = document.getElementsByClassName("logout-btn");

  if (logoutBtn) {
    logoutBtn.addEventListener("click", function (e) {
      e.preventDefault(); // Prevent link behavior

      // Clear session (adjust depending on how you store it)
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      // Show a success alert
      showAlert("Signout successful! Redirecting...", "success");

      // Redirect to signup page after short delay
      setTimeout(() => {
        redirectToSignup();
      }, 1500);
    });
  }
  function redirectToSignup() {
  window.location.href = 'signup.html'; // Adjust path if needed
}
});

// Show alert message
function showAlert(message, type = "success") {
  const alertBox = document.createElement("div");
  alertBox.textContent = message;
  alertBox.className = `alert alert-${type}`;
  alertBox.style.position = "fixed";
  alertBox.style.top = "20px";
  alertBox.style.right = "20px";
  alertBox.style.padding = "12px 20px";
  alertBox.style.backgroundColor = type === "success" ? "#4CAF50" : "#f44336";
  alertBox.style.color = "white";
}
