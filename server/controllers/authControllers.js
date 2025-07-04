const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');

const registerUser = async (req,res)=> {
    const {name,email,password} = req.body;

    try {
        let user = await User.findOne({email})
        if(user){
            return res.status(400).json({
                message:'User already exists'
            })
        }else{
            const hashedPassword = await bcrypt.hash(password,10)
            user = new User({name,email,password:hashedPassword})
            await user.save();

            return res.status(201).json({
                message:'User registered succesfully'
            })
        }
    }catch(error) {
        res.status(500).json({ message: 'Server error' });
        console.log(error);
        
    }
}

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, {
      expiresIn: '1d',
    });

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role 
      },
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};


module.exports = {registerUser,loginUser}