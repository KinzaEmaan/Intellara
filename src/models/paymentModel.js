import mongoose from 'mongoose';

const PaymentSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, 
  intent_id: { type: String, required: true }, 
  amount: { type: Number, required: true },
  currency: { type: String, default: 'USD' },
  payment_method: { type: String }, 
  payment_method_type: { type: String }, 
  status: { type: String, default: 'pending' }, 
  payment_date: { type: Date }, 
  receipt_email: { type: String },
  created_at: { type: Date, default: Date.now }, 
});

const UserSubscriptionData = mongoose.models['User Subscription Data'] || mongoose.model('User Subscription Data', PaymentSchema, 'User Subscription Data');

export default UserSubscriptionData;
