import mongoose from 'mongoose';

// Define the Team schema
const teamSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: 'team',
  },
},
  {
  collection: 'Team Information'
});

// Create and export the Team model
const Team = mongoose.models.teams || mongoose.model('teams', teamSchema);
export default Team;
