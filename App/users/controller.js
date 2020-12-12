const bcrypt = require('bcrypt');
const Users = require('./model');

// Create and Save a new user
exports.create = (req, res) => {
    if(!req.body) {
        return res.status(400).send({
            message: "user content can not be empty"
        });
    }
    req.body.password = bcrypt.hashSync(req.body.password , 8)
    // Create a user
    const user = new Users({
        email: req.body.email || "UnName user",
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        phone: req.body.phone,
        age: req.body.age,
        address: req.body.address,
        gender: req.body.gender,
        country: req.body.country,
        isActive: req.body.isActive
    });

    // Save user in the database
    user.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the user."
        });
    });
};

// Retrieve and return all users from the database.
exports.findAll = (req, res) => {
    Users.find({})
        .then(user => {
            res.send(user);
        }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving users."
        });
    });
};
exports.login = (req, res) => {
    Users.findOne({ email: req.body.email })
        .then(login => {
            const isMatch =  bcrypt.compareSync(req.body.password, login.password); // true
            if(isMatch){
                return  res.send(login);
            }else {
                return  res.status(500).send({message: "Password is not match"});
            }
        }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving login."
        });
    });
};
// Find a single user with a id
exports.findOne = (req, res) => {
    Users.findById(req.params.id)
        .then(user => {
            if(!user) {
                return res.status(404).send({
                    message: "user not found with id " + req.params.id
                });
            }
            res.send(user);
        }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "user not found with id " + req.params.id
            });
        }
        return res.status(500).send({
            message: "Error retrieving user with id " + req.params.id
        });
    });
};
exports.findUserId = (req, res) => {
    Users.findOne({_id : req.params.id})
        .then(users => {
            res.send(users);
        }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving users."
        });
    });
};
// Update a user identified by the id in the request
exports.update = (req, res) => {
    // Validate Request

    if(!req.body) {
        return res.status(400).send({
            message: "user content can not be empty"
        });
    }

    // Find user and update it with the request body
    Users.findByIdAndUpdate(req.params.id, {
        email: req.body.email || "UnName user",
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        phone: req.body.phone,
        age: req.body.age,
        address: req.body.address,
        gender: req.body.gender,
        country: req.body.country
    }, {new: true})
        // Users.updateOne(_id : req.params.id ,{ $set (isActive : req.body.isActive)})
        .then(user => {
            if(!user) {
                return res.status(404).send({
                    message: "user not found with id " + req.params.id
                });
            }
            res.send(user);
        }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "user not found with id " + req.params.id
            });
        }
        return res.status(500).send({
            message: "Error updating user with id " + req.params.id
        });
    });
};

// Delete a user with the specified id in the request
exports.delete = (req, res) => {
    if(!req.body) {
        return res.status(400).send({
            message: "User content can not be empty"
        });
    }
    Users.updateOne({_id: req.params.id},  { $set: { isActive: req.body.isActive}})
        .then(user => {
            console.log(user)
            if(!user) {
                return res.status(404).send({
                    message: "Users not found with id " + req.params.id
                });
            }
            res.send({message: "Users deleted successfully!"},user);
        }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Users not found with id " + req.params.id
            });
        }
        return res.status(500).send({
            message: "Could not delete Users with id " + req.params.id
        });
    });
};