// controllers/authController.js
const pool = require('../db'); 

const register = async (req, res) => {
    // We pull the same data from the frontend, but map it to the right DB columns
    const { username, email, password, full_name } = req.body;
    
    try {
        const result = await pool.query(
            `INSERT INTO users (username, email, password_hash, full_name, role) 
             VALUES ($1, $2, $3, $4, $5) 
             RETURNING id, username, email, full_name, role`,
            [username, email, password, full_name, 'user'] // Setting 'user' as default role
        );
        
        res.status(201).json({ 
            success: true, 
            user: result.rows[0] 
        });
    } catch (err) {
        console.error("Registration Error:", err.message);
        // Providing the specific DB error helps you debug (e.g., duplicate email)
        res.status(500).json({ error: err.message });
    }
};

// Update login to also use password_hash
const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const result = await pool.query(
            'SELECT * FROM users WHERE email = $1', 
            [email]
        );
        
        if (result.rows.length === 0) {
            return res.status(401).json({ error: "Invalid credentials" });
        }

        const user = result.rows[0];
        // Checking against password_hash column
        if (user.password_hash !== password) {
            return res.status(401).json({ error: "Invalid credentials" });
        }

        res.json({ 
            success: true, 
            user: { id: user.id, username: user.username, role: user.role } 
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = { register, login };