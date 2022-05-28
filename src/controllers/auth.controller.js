const loginController = (req, res) => {
  const {email, password} = req.body;
    if (!email || !password) {
        
    }
};

const registerController = (req, res) => {};

module.exports = { loginController, registerController };
