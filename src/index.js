import "./style.css"

const form = document.querySelector("form")
const email = document.querySelector("#mail")
const confirmPasswordField = document.querySelector("#confirm-password")

window.onload = () => {
  document.querySelector("#country").onchange = checkZIP
  document.querySelector("#ZIP").oninput = checkZIP
  document.querySelector("#password").oninput = checkPassword
  email.oninput = checkEmail
  confirmPasswordField.oninput = checkPasswordMatch
}

form.addEventListener("submit", function (event) {
  event.preventDefault()

  if (checkPasswordMatch() && checkEmail() && checkZIP()) {
    console.log("Form is valid. Submitting...")
  } else {
    console.log("Form is invalid. Please correct the errors and try again.")
  }
})

function checkEmail() {
  const emailError = document.querySelector(".email-error")
  if (email.validity.typeMismatch || email.validity.valueMissing) {
    emailError.className = "email-error error"
    emailError.textContent = "Please enter a valid email address"
    return false
  } else {
    emailError.className = "email-error"
    emailError.textContent = ""
    return true
  }
}

function checkZIP() {
  const constraints = {
    ee: [
      "^(EE-)?\\d{5}$",
      "Estonia ZIPs must have exactly 5 digits: e.g. 12345",
    ],
    lv: [
      "^LV-\\d{5}$",
      "Latvia ZIPs must begin with LV- and have exactly 5 digits: e.g. LV-12345",
    ],
    lt: [
      "^^LT-\\d{5}$",
      "Lithuania ZIPs must begin with LT- and have exactly 5 digits: e.g. LT-12345",
    ],
  }

  const country = document.getElementById("country").value
  const ZIPField = document.getElementById("ZIP")
  const zipError = document.querySelector(".zip-error")

  const constraint = new RegExp(constraints[country][0], "")
  console.log(constraint)

  if (constraint.test(ZIPField.value)) {
    zipError.className = "zip-error"
    zipError.textContent = ""

    return true
  } else {
    zipError.className = "zip-error error"
    zipError.textContent = constraints[country][1]
    return false
  }
}

function checkPassword() {
  const patternRegex = new RegExp("^(?=.*[A-Z])(?=.*\\d).{8,}$")
  const uppercaseRegex = new RegExp("[A-Z]")
  const numberRegex = new RegExp("\\d")

  const passwordField = document.querySelector("#password")
  const password = passwordField.value

  const errorLength = document.querySelector(".password-error-length")
  const errorUppercase = document.querySelector(".password-error-uppercase")
  const errorNumber = document.querySelector(".password-error-number")

  errorLength.textContent = "Password must contain at least 8 characters"
  errorUppercase.textContent =
    "Password must contain at least one uppercase letter"
  errorNumber.textContent = "Password must contain at least one number"

  if (password.length < 8) {
    errorLength.className = "password-error-length error"
  } else {
    errorLength.className = "password-error-length valid"
  }

  if (uppercaseRegex.test(password)) {
    errorUppercase.className = "password-error-uppercase valid"
  } else {
    errorUppercase.className = "password-error-uppercase error"
  }

  if (numberRegex.test(password)) {
    errorNumber.className = "password-error-number valid"
  } else {
    errorNumber.className = "password-error-number error"
  }

  if (patternRegex.test(password)) {
    return true
  } else {
    return false
  }
}

function checkPasswordMatch() {
  const passwordError = document.querySelector(".confirm-password-error")
  const password = document.querySelector("#password").value
  const confirmPassword = confirmPasswordField.value

  if (checkPassword()) {
    if (password === confirmPassword) {
      passwordError.className = "confirm-password-error valid"
      passwordError.textContent = "Passwords match!"
      return true
    } else {
      passwordError.className = "confirm-password-error error"
      passwordError.textContent = "Passwords do not match!"
      return false
    }
  } else {
    return false
  }
}
