import mongoose from 'mongoose';

const Schema = mongoose.Schema;
 
const emqxAuthRuleSchema = new Schema({
    userId: { type: String, required: [true] },
    dId: { type: String },
    username: { type: String, required: [true] },
    pass: { type: String, required: [true] },
    is: { type: String, required: [true] },
    action: { type: String, required: [true] },
    permission: { type: String, required: [true] },
    topics: { type:Array , required:[true] },
    //publish: { type: Array },
    //subscribe: { type: Array },
    type: { type: String, required: [true] },
    time: { type: Number },
    updatedTime: { type: Number }
});

const EmqxAuthRule = mongoose.model('EmqxAuthRule', emqxAuthRuleSchema);

export default EmqxAuthRule;