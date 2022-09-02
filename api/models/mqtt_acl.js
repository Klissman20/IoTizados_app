import mongoose from 'mongoose';

const Schema = mongoose.Schema;
 
const mqttAclSchema = new Schema({
    userId: { type: String, required: [true] },
    dId: { type: String },
    username: { type: String, required: [true] },
    action: { type: String, required: [true] },
    permission: { type: String, required: [true] },
    topics: { type:Array , required:[true] },
    type: { type: String, required: [true] },
    time: { type: Number },
    updatedTime: { type: Number }
});

const MqttAclRule = mongoose.model('MqttAclRule', mqttAclSchema);

export default MqttAclRule;