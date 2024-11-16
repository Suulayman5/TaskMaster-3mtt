import User from "../models/userModel.js";
import bcryptjs from "bcryptjs";
import { generateTokenAndSetCookies } from "../utils/generateTokenAndSetCookies.js";

const signUp = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    if (!username|| !password || !email) {
      throw new Error("All feilds requred");
      
    } 

    const userExist = await User.findOne({ email });
    if (userExist) return res.status(400).json({ message: "User already exists" });

    const user = new User({ username, email, password });
    await user.save();

    res.status(201).json({message: "account created successfully"});
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

const signIn = async (req, res) => {
  const {username, password} = req.body
    try{
        const user = await User.findOne({username})
        if (!user) {
            return res.status(400).json({
                message: 'Invalid Credentials'
            })
        }
        const isPasswordValid = await bcryptjs.compare(password, user.password)
        if (!isPasswordValid) {
            return res.status(400).json({
                message: 'Invalid credentials'
            })
        }
        generateTokenAndSetCookies(res, user._id)
        user.lastLogin = new Date()
        
        res.status(200).json({
            message: 'Logged in Successfully',
            user: {
                ...user._doc,
                password: undefined
            }
        })
    } catch (error){
        console.log('error logging in', error);
        res.status(400).json({
            message: error.message
        })
        
    }
};

export { signIn, signUp };
