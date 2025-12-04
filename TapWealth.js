async function signup() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const { error } = await supabase.auth.signUp({ email, password });
  if (error) alert(error.message);
  else window.location.href = "dashboard.html";
}

async function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) alert(error.message);
  else window.location.href = "dashboard.html";
}

async function logout() {
  await supabase.auth.signOut();
}

async function loadDashboard() {
  loadOfferwalls();
}

async function loadWallet() {
  let user = await supabase.auth.getUser();
  user = user.data.user;
  const { data } = await supabase.from("wallets").select().eq("user_id", user.id).single();
  document.getElementById("usdBalance").innerText = data.balance_usd;
  document.getElementById("ngnBalance").innerText = convertToNGN(data.balance_usd);
}

async function requestWithdraw() {
  let user = await supabase.auth.getUser();
  user = user.data.user;
  const amount = document.getElementById("amount").value;
  const method = document.getElementById("method").value;
  const details = document.getElementById("details").value;
  await supabase.from("withdrawals").insert({ user_id: user.id, amount_usd: amount, method, details });
  alert("Withdrawal request submitted.");
}

async function loadAdmin() {
  const { data } = await supabase.from("withdrawals").select();
  let html = "<tr><th>User</th><th>Amount</th><th>Method</th><th>Details</th></tr>";
  data.forEach(w => {
    html += `<tr><td>${w.user_id}</td><td>${w.amount_usd}</td><td>${w.method}</td><td>${w.details}</td></tr>`;
  });
  document.getElementById("withdrawTable").innerHTML = html;
}
