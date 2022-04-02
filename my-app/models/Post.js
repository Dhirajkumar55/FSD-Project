import mongoose from 'mongoose';
const {model,Schema} = mongoose;

const postSchema = new Schema(
    {
        title:{
            type: 'string',
            required: true
        },
        description:{
            type: 'string',
            required: true
        },
        goal:{
            type: 'string',
            required: true
        },
        membercount: Number,
        duration: Number,
        Weeklyhrs: Number,
        skills:[{
            type: 'string',
        }],
        postedBy:{
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        appliedBy:[{
            type: Schema.Types.ObjectId,
            ref: 'User'
        }],
    },
    {timeStamps:true}
)

module.exports = model('Post', postSchema);