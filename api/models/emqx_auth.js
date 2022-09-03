import mongoose from 'mongoose';

const Schema = mongoose.Schema;
 
const emqxAuthRuleSchema = new Schema({
    userId: { type: String, required: [true] },
    dId: { type: String },
    username: { type: String, required: [true] },
    pass: { type: String, required: [true] },
    is: { type: String, required: [true] },
    type: { type: String, required: [true] },
    time: { type: Number },
    updatedTime: { type: Number }
});

const EmqxAuthRule = mongoose.model('EmqxAuthRule', emqxAuthRuleSchema);

export default EmqxAuthRule;