const mongoose=require('mongoose')

let employeeSchema = new mongoose.Schema({
    Name: {
        type: String,
        required: true
    },
    LastName: {
        type: String,
        required: true
    },
    Email: {
        type: String,
        required: true,
        unique: true
    },
    Password: {
        type: String,
        required: true
    },
    Department: {
        type: String,
        required: true
    },
    Role: {
        type: String,
        
        enum: ['admin', 'user'], // Define specific roles
        default: 'user'         // Default role
    }
});

module.exports = mongoose.model("Employee", employeeSchema);
