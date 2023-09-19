import dbUtils from "../utils/db_utils.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import passport from "passport";

const userController = {

    GET: {
        protected: (req, res, next) => {
            passport.authenticate('jwt', { session: false }, (err, user, info) => {
                if (err) {
                    return next(err);
                }
                if (!user) {
                    return res.status(401).json({ message: 'Unauthorized' });
                }
                req.user = user; // Attach user to the request object
                res.json({ message: 'This is a protected route', user: req.user });
            })(req, res, next);
        }
    },

    POST: {
        login: async (req, res) => {
            const { email, password } = req.body;

            // Use dbUtils to find the user by email
            const user = await dbUtils.getUserByEmail(email);

            if (user) {
                // Use bcrypt to compare the hashed password with the plaintext password
                const match = await bcrypt.compare(password, user.password);

                if (match) {
                    // Passwords match, generate JWT
                    const token = jwt.sign({ id: user.id, username: user.username, email: user.email }, 'Chang3m3.', { expiresIn: '1h' });
                    res.json({ token });
                } else {
                    // Passwords do not match
                    res.status(401).json({ message: 'Invalid credentials' });
                }
            } else {
                // User not found
                res.status(401).json({ message: 'Invalid credentials' });
            }
        },
        register: async (req, res) => {
            const { username, email, password } = req.body;

            // Hash the password
            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(password, saltRounds);

            try {
                // Use dbUtils to insert the new user into the database
                const newUser = await dbUtils.createUser({ username, email, password: hashedPassword });

                // Respond with the newly created user
                res.status(201).json(newUser);
            } catch (err) {
                console.error('Error creating user:', err);
                res.status(500).json({ message: 'Internal Server Error' });
            }
        }
    },
};

export default userController