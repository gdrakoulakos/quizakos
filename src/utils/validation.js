// Regex rules
const notEmpty = /^(?!\s*$).+/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{10,}$/;

// Field validators
export const validateNickname = (nickname) => {
  if (!notEmpty.test(nickname)) {
    return "Το ψευδώνυμο δεν μπορεί να είναι κενό";
  }
  return null;
};

export const validateEmail = (email) => {
  if (!notEmpty.test(email)) {
    return "Το email δεν μπορεί να είναι κενό";
  }
  if (!emailRegex.test(email)) {
    return "Μη έγκυρο email";
  }
  return null;
};

export const validatePassword = (password) => {
  if (!notEmpty.test(password)) {
    return "Ο κωδικός δεν μπορεί να είναι κενός";
  }
  if (!passwordRegex.test(password)) {
    return "Ο κωδικός πρέπει να έχει 10+ χαρακτήρες, κεφαλαίο, μικρό, αριθμό και σύμβολο";
  }
  return null;
};

// Full form validator
export const validateSignUp = ({ nickname, email, password }) => {
  const errors = {};

  const nicknameError = validateNickname(nickname);
  if (nicknameError) errors.nickname = nicknameError;

  const emailError = validateEmail(email);
  if (emailError) errors.email = emailError;

  const passwordError = validatePassword(password);
  if (passwordError) errors.password = passwordError;

  return errors;
};
