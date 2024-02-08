const userModel = require("../models/user");
const bcrypt = require("bcrypt");

async function testBcrypt(password, hashedPassword) {
  const passwordTest = String(password);
  const hashedPasswordString = String(hashedPassword);
  try {
    const match = await bcrypt.compare(passwordTest, hashedPasswordString.trim());
    return match;
  } catch (error) {
    console.error("Erreur de vérification:", error);
  }
}

function isAuthenticated(req, res, next) {
  if (!req.session.userId) {
    return res.redirect("/login");
  }
  next();
}

async function loginPage(req, res) {
  res.render("login");
};

async function login(req, res) {
  const { username, password } = req.body;

  try {
    const user = await userModel.findUserByUsername(username);
    if (!user) {
      return res.status(401).send("Utilisateur introuvable");
    }

    if (await testBcrypt(password, user[0].password)) {
      req.session.userId = user[0].id;
      req.session.username = user[0].username;
      res.redirect("/");
    } else {
      res.status(401).send("Mot de passe incorrect");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Erreur interne du serveur");
  }
};

async function logout(req, res) {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).send("Erreur lors de la déconnexion");
    }
    res.redirect("/login");
  });
};

module.exports = {
  isAuthenticated,
  loginPage,
  login,
  logout,
};
