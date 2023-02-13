login()

function login() {
    const login_dom = document.createElement("div");
    login_dom.innerHTML = `
    <h1 id="login_register">LOGIN</h1>

    <div id="input_field">
        <label for="username">User Name:</label>
        <input type="text">
        <label for="password">Password:</label>
        <input type="text">
     </div>


    <div id="prompt">Let the magic start!</div>
    <button>Login</button>
    <a href="#">New to this? Register for free</a>
    `;
    document.querySelector("main").append(login_dom);
}