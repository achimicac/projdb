import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/petsDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define a MongoDB schema for Pet
const petSchema = new mongoose.Schema({
  petName: String,
  petType: String,
  petDoB: Date,
  petPfp: Buffer,
  petGender: String,
  ownerId: mongoose.Schema.Types.ObjectId,
});

// Define a MongoDB model for Pet
const Pet = mongoose.model('Pet', petSchema);

export const petregister = async (req, res) => {
  const userRegisteredCookie = req.cookies.userRegistered;
  const decodedToken = jwt.decode(userRegisteredCookie, process.env.JWT_SECRET);

  const { petName, petType, petDoB, petGender, petPfp } = req.body;
  const binaryData = Buffer.from(petPfp.dataUrl.split(',')[1], 'base64');

  try {
    if (!petName || !petType || !petDoB || !petPfp || !petGender || !petPfp) {
      return res.json({
        status: 'error',
        error: 'Please enter all your pet information',
      });
    } else {
      const existingPet = await Pet.findOne({ ownerId: decodedToken.id, petName: petName });
      if (existingPet) {
        return res.json({ status: 'error', error: `${petName} has already been registered.` });
      } else {
        const newPet = new Pet({
          petName: petName,
          petType: petType,
          petDoB: petDoB,
          petPfp: binaryData,
          petGender: petGender,
          ownerId: decodedToken.id,
        });

        await newPet.save();

        const petResult = await Pet.findOne({ ownerId: decodedToken.id, petName: petName });

        // Example logic for appointments and procedures (you need to adapt this)
        // Appointment and Procedure logic need to be redesigned for MongoDB
        // The following code is just a placeholder to demonstrate the flow, adjust accordingly

        // Handling Appointments
        const proceduralData = await Procedural.find({ petType: petType, procName: 'core vaccination' });
        if (proceduralData && proceduralData.length > 0) {
          for (let i = 0; i < proceduralData.length; i++) {
            const appointment = new Appointment({
              petID: petResult._id,
              procID: proceduralData[i]._id,
              status: 'info',
            });
            await appointment.save();
            const reapp = await Appointment.find({ petID: petResult._id });
            // Additional logic for manipulating dates can be implemented here
            console.log(reapp);
          }
        }

        // Return success response
        return res.json({ status: 'success', success: 'Your pet is ready!' });
      }
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ status: 'error', error: 'Something went wrong' });
  }
};

// Define a MongoDB schema for Procedures
const proceduralSchema = new mongoose.Schema({
  petType: String,
  procName: String,
});

// Define a MongoDB model for Procedures
const Procedural = mongoose.model('Procedural', proceduralSchema);

// Define a MongoDB schema for Appointments
const appointmentSchema = new mongoose.Schema({
  petID: mongoose.Schema.Types.ObjectId,
  procID: mongoose.Schema.Types.ObjectId,
  status: String,
});

// Define a MongoDB model for Appointments
const Appointment = mongoose.model('Appointment', appointmentSchema);

//module.exports = petregister;