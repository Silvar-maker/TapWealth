// js/tapwealth.js

// SIGN UP
async function signupUser(event) {
  event.preventDefault();

  const email = document.getElementById("signupEmail").value;
  const password = document.getElementById("signupPassword").value;

  // 1. Create user in Supabase Auth
  const { data, error } = await supabase.auth.signUp({
    email: email,
    password: password
  });

  if (error) {
    alert(error.message);
    return;
  }

  const user = data.user;

  // 2. Create user record in "users" table
  await supabase.from("users").insert([
    { id: user.id, email: email, password: password }
  ]);

  // 3. Create wallet for user
  await supabase.from("wallets").insert([
    { user_id: user.id, balance_usd: 0 }
  ]);

  alert("Account created! Redirecting to dashboard...");

  window.location.href = "../dashboard.html";
}

// LOGIN USER
async function loginUser(event) {
    event.preventDefault(); // Stop form from refreshing the page

    const email = document.getElementById("loginEmail").value.trim();
    const password = document.getElementById("loginPassword").value.trim();

    if (!email || !password) {
        alert("Please enter both email and password");
        return;
    }

    // Supabase Login Request
    const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password
    });

    if (error) {
        alert("Login failed: " + error.message);
        return;
    }

    // SUCCESS
    alert("Login successful!");
    window.location.href = "../dashboard/dashboard.html"; // Redirect to your dashboard
}

async function loadDashboard() {
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    window.location.href = "auth/login.html";
    return;
  }

  document.getElementById("userEmail").textContent = "Logged in as: " + user.email;

  const { data: wallet } = await supabase
    .from("wallets")
    .select("balance_usd")
    .eq("user_id", user.id)
    .single();

  document.getElementById("userBalance").textContent =
    "Balance: $" + wallet.balance_usd;
}

// Auto-load dashboard if on dashboard.html
if (window.location.pathname.includes("dashboard.html")) {
  loadDashboard();
}
