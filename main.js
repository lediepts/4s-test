
document.addEventListener('contextmenu', stopEvent);
document.addEventListener("keydown", stopEvent)
const $ = document.querySelector.bind(document)
const PASS = "4s-mmsi4"
const dialog = $(".dialog")
const loginBtn = $(".login")
const pass = $("#pass")
const main = $("#main")

pass.addEventListener("keydown", (e) => {
  if (e.keyCode) {
    login()
  }
})

function stopEvent(event) {
  event.preventDefault()
}

function showDialog() {
  if (loginBtn.innerText === "ログイン") {
    loginBtn.style.opacity = 0
    dialog.style.display = "inherit"
    document.removeEventListener("keydown", stopEvent)
    pass.focus()
  } else {
    loginBtn.innerText = "ログイン"
    document.addEventListener("keydown", stopEvent)
    main.style["pointer-events"] = "none";
  }
}

function closeDialog() {
  document.addEventListener("keydown", stopEvent)
  loginBtn.style.opacity = 1
  dialog.style.display = "none"
}
function login() {
  if (pass.value === PASS) {
    loginBtn.innerText = "ログアウト"
    loginBtn.style.opacity = 1
    dialog.style.display = "none"
    main.style["pointer-events"] = "all";
  }

}
main.style["pointer-events"] = "none";
