// Connect to supabase
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://cppjvkpjjdnxaxbrwtnd.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNwcGp2a3BqamRueGF4YnJ3dG5kIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjIwODg3OTgsImV4cCI6MjA3NzY2NDc5OH0.dZGlERusWGWAmxmRP9yL526zmV3f9R-WnIqz7aWgdvg";

const supabase = createClient(supabaseUrl, supabaseKey);

// DOM elements
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const loginBtn = document.getElementById("login");
const signupBtn = document.getElementById("signup");
const message = document.getElementById("message");
const logoutBtn = document.getElementById("logout");
const userInfo = document.getElementById("user-info");

// Log in
if (loginBtn) {
  loginBtn.addEventListener("click", async () => {
    const { error } = await supabase.auth.signInWithPassword({
      email: emailInput.value,
      password: passwordInput.value,
    });
    if (error) message.textContent = error.message;
    else window.location.href = "dashboard.html";
  });
}

// Sign up
if (signupBtn) {
  signupBtn.addEventListener("click", async () => {
    const { error } = await supabase.auth.signUp({
      email: emailInput.value,
      password: passwordInput.value,
    });
    message.textContent = error ? error.message : "Check your email for confirmation.";
  });
}

// Dashboard logic
if (logoutBtn) {
  logoutBtn.addEventListener("click", async () => {
    await supabase.auth.signOut();
    window.location.href = "index.html";
  });
}

async function checkUser() {
  const { data } = await supabase.auth.getUser();
  if (data.user && userInfo) {
    userInfo.textContent = `Logged in as ${data.user.email}`;
  } else if (window.location.pathname.includes("dashboard.html")) {
    window.location.href = "index.html";
  }
}
checkUser();
