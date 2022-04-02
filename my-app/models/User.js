import mongoose from 'mongoose';
const {model,Schema} = mongoose;

const userSchema = new Schema(
    {
        name: {
            type: 'string',
            required: true
        },
        username:{
            type: 'string', 
            required:true,
        },
        password:{
            type: 'string', 
            required:true
        },
        email: {
            type: 'string', 
            required:true,
            unique: true
        },
        token: {
            type: 'string',
            required:true
        },
        imageURL: 'string',
        posts:[{
            type: Schema.Types.ObjectId,
            ref: 'Post'
        }],
        appliedTo:[{
            type: Schema.Types.ObjectId,
            ref: 'Post'
        }]
    },
    {timeStamps:true}
);

module.exports = model('User', userSchema);