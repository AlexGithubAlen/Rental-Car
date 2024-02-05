function price(pickup, dropoff, pickupDate, dropoffDate, type, age, licensRealizationDate) {
    const vihicleType = getVihicleType(type);
    const days = get_days(pickupDate, dropoffDate);
    const licensCheck = checkLicens(licensRealizationDate);
    console.log(licensCheck);
    const monthType = getMonthType(pickupDate, dropoffDate);
    const season = getSeason(monthType);

    const ageCheckResult = checkAge(age, vihicleType);

    if (ageCheckResult !== null) {
        return ageCheckResult;
    }

    if (licensCheck != true) {
        return licensCheck;
    }

    let rentalprice = age * days;

    if (vihicleType === "Racer" && age <= 25 && season === "High") {
        rentalprice *= 1.5;
    }

    if (season === "High") {
        rentalprice *= 1.15;
    }

    if (days > 10 && season === "Low") {
        rentalprice *= 0.9;
    }

    return '$' + rentalprice;
}

function checkLicens(date) {
    const licensDate = new Date(date);
    const licenseReleaseYear = licensDate.getFullYear();
    const currentYear = new Date().getFullYear();

    if (currentYear - 1 <= licenseReleaseYear) {
        return "Individuals holding a driver's license for less than a year are ineligible to rent";
    }

    // if (currentYear - 2 <= licenseReleaseYear) {
    //     // increase rentalprice by 30%
        
    // }

    else return true;

}

function checkAge(age, vihicleType) {
    if (age < 18) {
        return "Driver too young - cannot quote the price";
    }

    if (age <= 21 && vihicleType !== "Compact") {
        return "Drivers 21 y/o or less can only rent Compact vehicles";
    }

    return null; // No age-related issues
}

function getVihicleType(type) {
    switch (type) {
        case "Compact":
            return "Compact";
        case "Electric":
            return "Electric";
        case "Cabrio":
            return "Cabrio";
        case "Racer":
            return "Racer";
        default:
            return "Unknown";
    }
}

function get_days(pickupDate, dropoffDate) {
    const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
    const firstDate = new Date(pickupDate);
    const secondDate = new Date(dropoffDate);

    return Math.round(Math.abs((firstDate - secondDate) / oneDay)) + 1;
}

function getMonthType(pickupDate, dropoffDate) {
    const pickup = new Date(pickupDate);
    const dropoff = new Date(dropoffDate);

    const April = 4;
    const October = 10;

    const pickupMonth = pickup.getMonth();
    const dropoffMonth = dropoff.getMonth();

    if (
        (pickupMonth >= April && pickupMonth <= October) ||
        (dropoffMonth >= April && dropoffMonth <= October) ||
        (pickupMonth < April && dropoffMonth > October)
    ) {
        return "High";
    } else {
        return "Low";
    }
}

function getSeason(monthType) {
    return monthType === "High" ? "High" : "Low";
}

exports.price = price;
