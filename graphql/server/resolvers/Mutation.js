import User from "../../../models/User";
import Post from "../../../models/Post";
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
            email,
            imageURL:newUser.imageURL,
            name:newUser.name,
            username:newUser.username
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

        //create a new token and attach it to the user
        const token = jwt.sign(
            {
                user_id: user._id,
                email,
                imageURL:user.imageURL,
                name:user.name,
                username:user.username
            }, 
            process.env.APP_SECRET_KEY,
            {expiresIn:"2h"}
        );
    
        user.token = token;

        return {
            token,
            user:user
        }
    }
    else{
        // if the password doesn't match
        throw new ApolloError("Password doesn't match", "INVALID_PASSWORD");
    }
}



async function createPost(parent, args, context, info){

    const user_id = context.user;
    
    if(!user_id){
        throw new ApolloError("Invalid Authorization", "NOT_AUTHORIZED")
    }

    const user = await User.findById(user_id);
    if(!user){
        throw new ApolloError("Invalid User", "USER_NOT_FOUND");
    }

    // create a new post and save it in the database
    const newPost = new Post({
        title: args.title,
        description: args.description,
        goal: args.goal,
        membercount: args.membercount,
        duration: args.duration,
        weeklyhrs: args.weeklyhrs,
        skills: args.skills,
        postedBy: user_id
    });

    const res = await newPost.save();

    // save the postid in the User's appliedTo field
    
    user.posts.push(newPost._id);
    await user.save();

    //return the post
    return res;
}


async function applyToPost(parent, args, context, info){
    const user_id = context.user;
    const postId = args.id;
   
    if(!user_id){
        throw new ApolloError("Invalid Authorization", "NOT_AUTHORIZED")
    }

    // store the post id in the User's appliedTo field
    const user = await User.findById(user_id);
    if(!user){
        throw new ApolloError("Invalid User", "USER_NOT_FOUND")
    }
    // check if the user has already applied to the post
    if(!user.appliedTo.includes(postId)){
        user.appliedTo.push(postId);
        await user.save();
    }

    // store the User id in the Post's appliedBy field
    const post = await Post.findById(postId);
    // check if the post has already been applied by the user
    if(!post.appliedBy.includes(user_id)){
        post.appliedBy.push(user_id);
    }
    
    const res = await post.save();
    
    // return the post
    return res;
}


async function updatePost(parent, args, context, info){
    const user_id  = context.user;
    
    const postId = args.id;
   
    const post = await Post.findById(postId).populate('postedBy').exec();

    // check whether the post is postedBy the same user who want's to update the post
    if(post.postedBy._id.valueOf()!==user_id){
        throw new ApolloError('Invalid Authorization','NOT_AUTHORIZED');
    }

    const {title,goal,description,duration,weeklyhrs,membercount,skills}=args;

    // field to filter from
    const filter = {_id:postId};
    // fields to update
    const update = {title,goal,description,duration,weeklyhrs,membercount,skills};

    const res = await Post.findOneAndUpdate(filter, update,{new: true}).populate('postedBy').exec();

    console.log(res);
    return res;
}


export {signup,login,createPost,applyToPost,updatePost};