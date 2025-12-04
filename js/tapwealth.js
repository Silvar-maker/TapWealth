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

    alert("Account created! Check your email to confirm.");
}

// LOGIN
async function loginUser() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    let { data, error } = await supabaseClient.auth.signInWithPassword({
        email: email,
        password: password
    });

    if (error) {
        alert("Login failed: " + error.message);
        return;
    }

    // Redirect to dashboard
    window.location.href = "dashboard.html";
}

// CHECK LOGIN STATUS (Dashboard)
async function checkLogin() {
    const { data } = await supabaseClient.auth.getUser();

    if (!data.user) {
        // Not logged in — send user to login
        window.location.href = "login.html";
    }
}
