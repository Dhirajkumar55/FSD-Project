import mongoose from 'mongoose';
const {models,model,Schema} = mongoose;

const postSchema = new Schema(
    {
        title:{
            type: String,
            required: true
        },
        description:{
            type: String,
            required: true
        },
        goal:{
            type: String,
            required: true
        },
        membercount: Number,
        duration: Number,
        Weeklyhrs: Number,
        skills:[{
            type: String,
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

module.exports = models.Post || model('Post', postSchema);