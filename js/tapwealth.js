// js/tapwealth.js

// SIGN UP
async function signupUser() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    let { data, error } = await supabaseClient.auth.signUp({
        email: email,
        password: password
    });

    if (error) {
        alert("Signup failed: " + error.message);
        return;
    }

    alert("Account created! Check your email for confirmation.");
    window.location.href = "login.html";
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
