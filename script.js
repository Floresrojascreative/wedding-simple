/* ==========================================
   FLORES ROJA DESIGN
   WEDDING ELEGANCE
========================================== */


/* ==========================================
   CONFIGURACIÓN PRINCIPAL
========================================== */

const weddingConfig = {

    bride: "Isabella",

    groom: "Alexander",

    // Fecha del evento en horario de Chicago.
    weddingDate: "2027-06-20T16:00:00-05:00",

    displayDate: "20 DE JUNIO DE 2027",

    ceremonyTime: "4:00 PM",

    receptionTime: "6:00 PM",

    // Número de demostración.
    // Reemplazar por un WhatsApp real.
    whatsappNumber: "",

    ceremonyMap:
        "https://www.google.com/maps/search/?api=1&query=Chicago+Illinois",

    receptionMap:
        "https://www.google.com/maps/search/?api=1&query=Chicago+Illinois",

    // Archivo de música opcional.
    musicFile: ""

};


/* ==========================================
   ELEMENTOS
========================================== */

const welcomeScreen =
    document.getElementById("welcomeScreen");

const invitation =
    document.getElementById("invitation");

const openButton =
    document.getElementById("openInvitation");

const musicButton =
    document.getElementById("musicButton");

const backgroundMusic =
    document.getElementById("backgroundMusic");


/* ==========================================
   PERSONALIZAR NOMBRES
========================================== */

function loadWeddingData() {

    const names =
        `${weddingConfig.bride} & ${weddingConfig.groom}`;

    document.getElementById("welcomeNames")
        .textContent = names;

    document.getElementById("heroNames")
        .innerHTML = `
            ${weddingConfig.bride}
            <span>&</span>
            ${weddingConfig.groom}
        `;

    document.getElementById("finalNames")
        .textContent = names;

    document.getElementById("heroDate")
        .textContent = weddingConfig.displayDate;

    document.getElementById("ceremonyMap")
        .href = weddingConfig.ceremonyMap;

    document.getElementById("receptionMap")
        .href = weddingConfig.receptionMap;

}

loadWeddingData();


/* ==========================================
   ABRIR INVITACIÓN
========================================== */

openButton.addEventListener("click", () => {

    welcomeScreen.style.opacity = "0";

    welcomeScreen.style.transition =
        "opacity 0.8s ease";

    setTimeout(() => {

        welcomeScreen.classList.add("hidden");

        invitation.classList.remove("hidden");

        musicButton.classList.remove("hidden");

        window.scrollTo(0, 0);

        initializeReveal();

        // Reproducir música solamente si
        // se configuró un archivo válido.
        if (weddingConfig.musicFile) {
            playMusic();
        }

    }, 800);

});


/* ==========================================
   CUENTA REGRESIVA
========================================== */

function updateCountdown() {

    const weddingDate =
        new Date(weddingConfig.weddingDate).getTime();

    const now =
        new Date().getTime();

    const difference =
        weddingDate - now;

    if (difference <= 0) {

        document.getElementById("days")
            .textContent = "00";

        document.getElementById("hours")
            .textContent = "00";

        document.getElementById("minutes")
            .textContent = "00";

        document.getElementById("seconds")
            .textContent = "00";

        document.getElementById("countdownMessage")
            .textContent = "¡Llegó nuestro gran día!";

        return;

    }

    const days =
        Math.floor(difference / (1000 * 60 * 60 * 24));

    const hours =
        Math.floor(
            (difference / (1000 * 60 * 60)) % 24
        );

    const minutes =
        Math.floor(
            (difference / (1000 * 60)) % 60
        );

    const seconds =
        Math.floor(
            (difference / 1000) % 60
        );

    document.getElementById("days")
        .textContent = String(days).padStart(2, "0");

    document.getElementById("hours")
        .textContent = String(hours).padStart(2, "0");

    document.getElementById("minutes")
        .textContent = String(minutes).padStart(2, "0");

    document.getElementById("seconds")
        .textContent = String(seconds).padStart(2, "0");

}

updateCountdown();

setInterval(updateCountdown, 1000);


/* ==========================================
   ANIMACIONES AL DESLIZAR
========================================== */

function initializeReveal() {

    const elements =
        document.querySelectorAll(".reveal");

    if (!("IntersectionObserver" in window)) {

        elements.forEach(element => {
            element.classList.add("active");
        });

        return;

    }

    const observer = new IntersectionObserver(
        (entries) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("active");

                    observer.unobserve(entry.target);

                }

            });

        },
        {
            threshold: 0.1
        }
    );

    elements.forEach(element => {
        observer.observe(element);
    });

}


/* ==========================================
   CONFIRMAR ASISTENCIA
========================================== */

const rsvpForm =
    document.getElementById("rsvpForm");

rsvpForm.addEventListener("submit", (event) => {

    event.preventDefault();

    const guestName =
        document.getElementById("guestName")
            .value.trim();

    const guestCount =
        document.getElementById("guestCount")
            .value;

    const attendance =
        document.getElementById("attendance")
            .value;

    if (!guestName) {

        alert("Por favor, escribe tu nombre.");

        return;

    }

    if (!weddingConfig.whatsappNumber) {

        alert(
            "Esta es una plantilla de demostración. " +
            "Configura el número de WhatsApp para activar las confirmaciones."
        );

        return;

    }

    const message = `💍 CONFIRMACIÓN DE BODA

Novios:
${weddingConfig.bride} & ${weddingConfig.groom}

Nombre:
${guestName}

Asistencia:
${attendance}

Número de invitados:
${guestCount}

¡Muchas gracias!`;

    const encodedMessage =
        encodeURIComponent(message);

    const whatsappURL =
        `https://wa.me/${weddingConfig.whatsappNumber}?text=${encodedMessage}`;

    window.open(
        whatsappURL,
        "_blank",
        "noopener,noreferrer"
    );

});


/* ==========================================
   AGREGAR AL CALENDARIO
========================================== */

document.getElementById("calendarButton")
    .addEventListener("click", () => {

        const title =
            `Boda de ${weddingConfig.bride} y ${weddingConfig.groom}`;

        const details =
            "Te esperamos para celebrar nuestro gran día.";

        // Fechas UTC para Google Calendar.
        const start = "20270620T210000Z";

        const end = "20270621T020000Z";

        const calendarURL =
            "https://calendar.google.com/calendar/render?action=TEMPLATE" +
            "&text=" + encodeURIComponent(title) +
            "&dates=" + start + "/" + end +
            "&details=" + encodeURIComponent(details) +
            "&location=" + encodeURIComponent("Chicago, Illinois");

        window.open(
            calendarURL,
            "_blank",
            "noopener,noreferrer"
        );

    });


/* ==========================================
   MÚSICA
========================================== */

function playMusic() {

    if (!weddingConfig.musicFile) {
        return;
    }

    if (!backgroundMusic.src) {
        backgroundMusic.src = weddingConfig.musicFile;
    }

    backgroundMusic.volume = 0.35;

    backgroundMusic.play()
        .then(() => {

            musicButton.classList.add("playing");

            musicButton.textContent = "♫";

        })
        .catch(() => {

            musicButton.classList.remove("playing");

            musicButton.textContent = "♪";

        });

}

function pauseMusic() {

    backgroundMusic.pause();

    musicButton.classList.remove("playing");

    musicButton.textContent = "♪";

}

musicButton.addEventListener("click", () => {

    if (!weddingConfig.musicFile) {

        alert(
            "Todavía no hemos agregado la música de esta invitación."
        );

        return;

    }

    if (backgroundMusic.paused) {

        playMusic();

    } else {

        pauseMusic();

    }

});


/* ==========================================
   FINAL
========================================== */

console.log(
    "Flores Roja Design | Wedding Elegance"
);