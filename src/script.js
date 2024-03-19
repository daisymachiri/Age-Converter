document.addEventListener('DOMContentLoaded', function() {
    const calculateButton = document.getElementById('calculate');
    const shareButton = document.getElementById('share');

    calculateButton.addEventListener('click', calculateAge);
    shareButton.addEventListener('click', shareResult);

    function calculateAge() {
        const nameInput = document.getElementById('name');
        const birthdateInput = document.getElementById('birthdate');
        const resultDiv = document.getElementById('result');

        const name = nameInput.value;
        const birthdate = new Date(birthdateInput.value);
        const birthMonth = birthdate.getMonth() + 1;
        const birthMonthName = getMonthName(birthMonth);
        const currentDate = new Date();

        const ageInMilliseconds = currentDate - birthdate;
        let ageInYears = Math.floor(ageInMilliseconds / (1000 * 60 * 60 * 24 * 365.25));

        if (birthdate.getMonth() + 1 === currentDate.getMonth() + 1) {
            if (birthdate.getDate() > currentDate.getDate()) {
                ageInYears--;
            }
        }

        let resultText = `${name}, you are ${ageInYears} years old.`;

        if (
            birthdate.getDate() === currentDate.getDate() &&
            birthdate.getMonth() === currentDate.getMonth()
        ) {
            resultText += `\nWishing you a very happy birthday, ${name}! 🎉🎂 May you enjoy your day to the fullest!`;
        } else {
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

        const zodiacSign = calculateZodiacSign(birthdate.getMonth() + 1, birthdate.getDate());
        resultText += `\nYour zodiac sign is ${zodiacSign}.`;

        resultDiv.textContent = resultText;
    }

    function shareResult() {
        const resultPara = document.querySelector('.result');
        const shareData = {
            title: 'Check out my age and zodiac sign!',
            text: resultPara.textContent,
            url: 'https://main--ageconverterbydaisy.netlify.app/',
        };

        if (navigator.share) {
            navigator.share(shareData)
            .then(() => {
                resultPara.textContent = 'Shared successfully';
            })
            .catch((error) => {
                resultPara.textContent = 'Error: ' + error;
            });
        }
        else {
            resultPara.textContent ='Your browser does not support sharing. Please copy the link manually.';
        }
    }

    function getMonthName(monthNumber) {
        const months = [
            "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];
        return months[monthNumber - 1];
    }

    function calculateZodiacSign(month, day) {
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
});