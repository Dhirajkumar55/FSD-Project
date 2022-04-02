import User from "../../models/User";
import Post from "../../models/Post";
import {ApolloError} from "apollo-server-errors";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';


async function signup(parent,args,context,info){
    const {name,email,username,password} = args;

    //see if an old user already exists
    const oldUser = await User.findOne({email});

    // Throw an error if the user already exists
    if(oldUser){
        throw new ApolloError('A user is already registered with the email address '+email, 'USER_ALREADY_EXISTS');
    }

    // Encrypt Password
    const encryptedPassword = await bcrypt.hash(password,10);

    // Build the mongoose model for the USER
    const newUser = new User({
        name:name,
        username: username,
        password: encryptedPassword,
        email: email.toLowerCase(),
    })

    // Create our JWT token and attach it to the newUser
    const token = jwt.sign(
        {
            user_id: newUser._id,
            email
        }, 
        process.env.APP_SECRET_KEY,
        {expiresIn:"24h"}
    );

    newUser.token = token;

    // Save the user in our MongoDB
    const res = await newUser.save();
    
    return {
        token,
        user:res
    }
}

async function login(parent, args, context, info){
    const {email,password} = args;

    // see if the user exists or not
    const user = await User.findOne({email});

    // Throw an Error if the user doesn't exist
    if(!user){
        throw new ApolloError('No user found with the email address '+email, "USER_NOT_FOUND");
    }

    // check if the entered password equals the encrypted password
    if(user && await bcrypt.compare(password, user.password)){

        //create a new token
        const token = jwt.sign(
            {
                user_id: user._id,
                email
            }, 
            process.env.APP_SECRET_KEY,
            {expiresIn:"24h"}
        );
    
        user.token = token;

        return {
            token,
            user:user

        }
    }
    else{
        throw new ApolloError("Password doesn't match", "INVALID_PASSWORD");
    }
}


export {signup,login};