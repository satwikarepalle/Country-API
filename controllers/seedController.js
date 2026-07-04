const Country = require("../models/Country");

exports.seedCountries = async (req, res) => {
  try {

const response = await fetch(
  "https://api.restcountries.com/countries/v5",
  {
    headers: {
      Authorization: "Bearer rc_live_09727bab890c4caaba5948ffd83e531c"
    }
  }
);
const result = await response.json();

const countries = result.data.objects;

    console.log("Status:", response.status);

   

    console.log("Is Array:", Array.isArray(countries));

    if (!Array.isArray(countries)) {
      return res.status(500).json({
        success: false,
        message: "REST Countries API did not return an array",
        data: countries
      });
    }

    let count = 0;

    for (const country of countries) {

      const existingCountry = await Country.findOne({
        name: country.names?.common
      });

      if (existingCountry) {
        continue;
      }

      await Country.create({

        name: country.names?.common || "",

        officialName: country.names?.official || "",

        capital: country.capital ?.name || "",

        region: country.region || "",

        subregion: country.subregion || "",

        population: country.population || 0,

        area: country.area ? country.area.kilometers : 0,

        currencies: country.currencies
          ? country.currencies.map(c => c.name)
          : [],

        languages: country.languages
          ? country.languages.map(lang=>lang.name)
          : [],

        timezones: country.timezones || [],

        flag: country.flag?.png || "",

        independent: country.independent || false

      });

      count++;
    }

    res.status(200).json({
      success: true,
      message: `${count} countries imported successfully`
    });

  } catch (err) {

    console.log(err);

    res.status(500).json({
      success: false,
      message: err.message
    });

  }
};