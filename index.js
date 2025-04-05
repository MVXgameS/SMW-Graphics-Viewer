function checkPassword() {
    event.preventDefault();
    const correctPassword = "r5q312";
    const inputPassword = document.getElementById("bcPass").value;

    if (inputPassword === correctPassword) {
        alert("Access Granted!");
        window.location = ("AllGFXBowser'sCastle.html")
    } else {
        alert("Incorrect Password. Try Again.");
    }
}