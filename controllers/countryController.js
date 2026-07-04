const Country = require("../models/Country");

// CREATE 

exports.createCountry = async (req, res) => {
    try {

        const country = await Country.create(req.body);

        res.status(201).json({
            success: true,
            message: "Country Created Successfully",
            data: country
        });

    } catch (err) {

        res.status(500).json({
            success: false,
            message: err.message
        });

    }
};

// GET 

exports.getCountries = async (req, res) => {

    try {

        let {
            search,
            region,
            sort,
            page = 1,
            limit = 10
        } = req.query;

        const query = {};

        // Search by country name
        if (search) {
            query.name = {
                $regex: search,
                $options: "i"
            };
        }

        // Filter by region
        if (region) {
            query.region = region;
        }

        // Sorting
        let sortOption = {};

        if (sort === "asc") {
            sortOption.name = 1;
        }

        if (sort === "desc") {
            sortOption.name = -1;
        }

        page = Number(page);
        limit = Number(limit);

        const countries = await Country.find(query)
            .sort(sortOption)
            .skip((page - 1) * limit)
            .limit(limit);

        const total = await Country.countDocuments(query);

        res.status(200).json({
            success: true,
            totalCountries: total,
            currentPage: page,
            totalPages: Math.ceil(total / limit),
            data: countries
        });

    } catch (err) {

        res.status(500).json({
            success: false,
            message: err.message
        });

    }

};

//GET COUNTRY BY ID 

exports.getCountryById = async (req, res) => {

    try {

        const country = await Country.findById(req.params.id);

        if (!country) {
            return res.status(404).json({
                success: false,
                message: "Country Not Found"
            });
        }

        res.status(200).json({
            success: true,
            data: country
        });

    } catch (err) {

        res.status(500).json({
            success: false,
            message: err.message
        });

    }

};

//UPDATE 

exports.updateCountry = async (req, res) => {

    try {

        const country = await Country.findByIdAndUpdate(

            req.params.id,

            req.body,

            {
                new: true,
                runValidators: true
            }

        );

        if (!country) {

            return res.status(404).json({
                success: false,
                message: "Country Not Found"
            });

        }

        res.status(200).json({
            success: true,
            message: "Country Updated Successfully",
            data: country
        });

    } catch (err) {

        res.status(500).json({
            success: false,
            message: err.message
        });

    }

};

//DELETE

exports.deleteCountry = async (req, res) => {

    try {

        const country = await Country.findByIdAndDelete(req.params.id);

        if (!country) {

            return res.status(404).json({
                success: false,
                message: "Country Not Found"
            });

        }

        res.status(200).json({
            success: true,
            message: "Country Deleted Successfully"
        });

    } catch (err) {

        res.status(500).json({
            success: false,
            message: err.message
        });

    }

};