//USER

exports.validateUser = (req, res, next) => {

    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({
            success: false,
            message: "Name, Email and Password are required"
        });
    }

    if (password.length < 6) {
        return res.status(400).json({
            success: false,
            message: "Password must be at least 6 characters"
        });
    }

    next();
};


//COUNTRY

exports.validateCountry = (req, res, next) => {

    const {
        name,
        capital,
        region,
        population
    } = req.body;

    if (!name || !capital || !region || !population) {

        return res.status(400).json({
            success: false,
            message: "Name, Capital, Region and Population are required"
        });

    }

    if (population < 0) {

        return res.status(400).json({
            success: false,
            message: "Population cannot be negative"
        });

    }

    next();
};