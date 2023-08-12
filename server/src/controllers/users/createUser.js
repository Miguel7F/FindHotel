const { handlerSuccess, handlerError } = require('../../services')
const User = require('../../models/User');

const createUser = async (req, res) => {
    const { nit, firstName, lastName, image, email, password, phone, address, age, gender } = req.body
    const userData = { ...req.body }
    userData.firstName = firstName.trim()
    userData.lastName = lastName.trim()
    userData.email = email.trim()
    //? $or $and $set
    try {
        const user = await User.findOne({ $or: [{ nit: userData.nit }, { email: userData.email }] });
        if (user) {
            if (user.nit === userData.nit)
                handlerError('assigned', `The NIT ${userData.nit}`, res)
            else
                handlerError('register', `The email ${userData.email}`, res)
        } else {
            const newUser = new User(userData);
            const createdUser = await newUser.save();
            handlerSuccess('create', `User ${createdUser.firstName}`, res)
        }
    } catch (error) {
        // handlerError(error,null,res)
        return res.status(500).json({ state: false, message: 'An error occurred', error });
    }
}


module.exports = createUser;