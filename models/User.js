import mongoose from 'mongoose';
const {models,model,Schema} = mongoose;

const userSchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        username:{
            type: String, 
            required:true,
            unique: true
        },
        password:{
            type: String, 
            required:true
        },
        email: {
            type: String, 
            required:true,
            unique: true
        },
        token: {
            type: String,
            required:true
        },
        imageURL: String,
        posts:[{
            type: Schema.Types.ObjectId,
            ref: 'Post'
        }],
        appliedTo:[{
            type: Schema.Types.ObjectId,
            ref: 'Post'
        }]
    },
    {timestamps:true}
);

module.exports = models.User || model('User', userSchema);