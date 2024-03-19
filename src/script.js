function calculateAgeAndShare() {
    const nameInput = document.getElementById('name');
    const birthdateInput = document.getElementById('birthdate');

    const name = nameInput.value;
    const birthdate = new Date(birthdateInput.value);
    const birthMonth = birthdate.getMonth() + 1; // Add 1 to convert to 1-based month
    const birthMonthName = getMonthName(birthMonth);
    const currentDate = new Date();

    // Calculate age
    const ageInMilliseconds = currentDate - birthdate;
    let ageInYears = Math.floor(ageInMilliseconds / (1000 * 60 * 60 * 24 * 365.25));

    // Check if the birth month is in the current month
    if (birthdate.getMonth() + 1 === currentDate.getMonth() + 1) {
        // If the birth day hasn't arrived yet, consider the person's age as one year less
        if (birthdate.getDate() > currentDate.getDate()) {
            ageInYears--;
        }
    }

    // Display the result
    let resultText = `${name}, you are ${ageInYears} years old.`;

    // Check if it's the person's birthday
    if (
        birthdate.getDate() === currentDate.getDate() &&
        birthdate.getMonth() === currentDate.getMonth()
    ) {
        resultText += `\nHappy Birthday, ${name}! 🎉🎂`;
    } else {
        // If birth month is yet to come this year
        if (
            (birthdate.getMonth() + 1 > currentDate.getMonth() + 1) ||
            (
                birthdate.getMonth() + 1 === currentDate.getMonth() + 1 &&
                birthdate.getDate() > currentDate.getDate()
            )
        ) {
            const currentYear = currentDate.getFullYear();
            const nextBirthdayThisYear = new Date(currentYear, birthMonth - 1, birthdate.getDate()); // Next birthday in the current year
            const remainingTime = nextBirthdayThisYear - currentDate;
            const remainingDays = Math.floor(remainingTime / (1000 * 60 * 60 * 24));
            const remainingHours = Math.floor((remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const remainingMinutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
            const remainingSeconds = Math.floor((remainingTime % (1000 * 60)) / 1000);

            resultText += `\nYou will turn ${ageInYears + 1} in ${birthMonthName} ${currentYear}.`;
            resultText += `\nRemaining time until your next birthday: ${remainingDays} days, ${remainingHours} hours, ${remainingMinutes} minutes, and ${remainingSeconds} seconds.`;
        }
    }

    // Determine zodiac sign based on birthdate
    const zodiacSign = calculateZodiacSign(birthdate.getMonth() + 1, birthdate.getDate());
    resultText += `\nYour zodiac sign is ${zodiacSign}.`;

    // Display result
    const resultDiv = document.getElementById('result');
    resultDiv.textContent = resultText;

    // Share data
    const shareData = {
        title: 'Your Age and Zodiac Sign',
        text: resultText,
        url: 'https://developer.mozilla.org',
    };

    navigator.share(shareData)
        .then(() => {
            // Display success message
            resultPara.textContent = 'MDN shared successfully';
        })
        .catch((error) => {
            // Handle error
            resultPara.textContent = 'Error: ' + error;
        });
}

function getMonthName(monthNumber) {
    const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    return months[monthNumber - 1];
}

function calculateZodiacSign(month, day) {
    // Determine the zodiac sign based on the birth month and day
    if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) {
        return "Aquarius";
    } else if ((month === 2 && day >= 19) || (month === 3 && day <= 20)) {
        return "Pisces";
    } else if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) {
        return "Aries";
    } else if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) {
        return "Taurus";
    } else if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) {
        return "Gemini";
    } else if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) {
        return "Cancer";
    } else if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) {
        return "Leo";
    } else if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) {
        return "Virgo";
    } else if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) {
        return "Libra";
    } else if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) {
        return "Scorpio";
    } else if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) {
        return "Sagittarius";
    } else {
        return "Capricorn";
    }
}

// Share data
const btn = document.querySelector('button');
const resultPara = document.querySelector('.result');
btn.addEventListener('click', calculateAgeAndShare);
