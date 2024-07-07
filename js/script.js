document.addEventListener("DOMContentLoaded", function() {
    var chatIcon = document.querySelector(".chat-icon");
    var chatBubble = document.querySelector(".chat-bubble");
    var closeBtn = chatBubble.querySelector(".close-btn");
    var notificationDot = document.querySelector(".notification-dot");

    setTimeout(function() {
        chatIcon.classList.add("show-bubble");

        setTimeout(function() {
            chatIcon.classList.remove("show-bubble");
            chatIcon.classList.add("show-notification");
        }, 6000);
    }, 5000);

    closeBtn.addEventListener("click", function() {
        chatIcon.classList.remove("show-bubble");
        chatIcon.classList.add("show-notification");
    });
});

let currentSlide = 0;

function showSlide(index) {
    const slides = document.querySelectorAll('.carousel-item');
    const totalSlides = slides.length;
    if (index >= totalSlides) {
        currentSlide = 0;
    } else if (index < 0) {
        currentSlide = totalSlides - 1;
    } else {
        currentSlide = index;
    }
    const offset = -currentSlide * 100;
    document.querySelector('.carousel').style.transform = `translateX(${offset}%)`;
}

function nextSlide() {
    showSlide(currentSlide + 1);
}

function prevSlide() {
    showSlide(currentSlide - 1);
}

document.addEventListener('DOMContentLoaded', () => {
    showSlide(currentSlide);
    setInterval(nextSlide, 3000); // Avança automaticamente a cada 3 segundos
});

function updateLocation(location) {
    const locationElement = document.getElementById('cidade');
    locationElement.textContent = location;
}

function getIPLocation() {
    const request = new XMLHttpRequest();
    request.open('GET', 'https://wtfismyip.com/json', true);

    request.onload = function () {
        if (request.status >= 200 && request.status < 400) {
            const data = JSON.parse(request.responseText);
            const location = data.YourFuckingLocation.replace(/\,.+/g, "$'");
            updateLocation(location);
        } else {
            updateLocation("Cidade Desconhecida");
        }
    };

    request.onerror = function () {
        updateLocation("Erro na requisição");
    };

    request.send();
}

getIPLocation();


// Função para verificar se o ano é bissexto
function isLeapYear(year) {
    return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
}

// Função para atualizar a data na mensagem
function updateProgramDate() {
    const programDateElement = document.getElementById('data');

    // Obter a data atual no fuso horário do Brasil/SP
    const brazilTimeZone = 'America/Sao_Paulo';
    const now = luxon.DateTime.local().setZone(brazilTimeZone);

    // Obter o mês e ano atual
    const currentMonth = now.month;
    const currentYear = now.year;

    // Definir o número máximo de dias para o mês atual
    let maxDays = 30; // A maioria dos meses tem 30 dias

    if (currentMonth === 2) { // Fevereiro
        maxDays = isLeapYear(currentYear) ? 29 : 28;
    } else if ([4, 6, 9, 11].includes(currentMonth)) {
        maxDays = 30;
    } else {
        maxDays = 31;
    }

    const formattedStartDate = now.toFormat('dd/MM/yyyy');

    programDateElement.textContent = formattedStartDate;
}

window.addEventListener('load', updateProgramDate);
