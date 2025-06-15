// Variables globales
let currentPage = 1;
const totalPages = 3; // 3 páginas
const pianoMusic = document.getElementById('pianoMusic');

// Notas del piano
const noteFrequencies = {
    'C': 261.63,
    'C#': 277.18,
    'D': 293.66,
    'D#': 311.13,
    'E': 329.63,
    'F': 349.23,
    'F#': 369.99,
    'G': 392.00,
    'G#': 415.30,
    'A': 440.00,
    'A#': 466.16,
    'B': 493.88
};

// Función para navegar entre páginas
function nextPage() {
    lanzarConfeti();
    const current = document.getElementById(`page${currentPage}`);
    const next = document.getElementById(`page${(currentPage % totalPages) + 1}`);
    if (next) {
        current.classList.remove('active');
        next.classList.add('active');
        currentPage = (currentPage % totalPages) + 1;
        
        // Si es la página del piano, pausar la música de fondo y reproducir la melodía
        if (currentPage === 2) {
            // Pausar la música de fondo
            if (pianoMusic && !pianoMusic.paused) {
                pianoMusic.pause();
            }
            
            // Reproducir una nota aleatoria primero
            setTimeout(() => {
                const notes = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];
                playNote(notes[Math.floor(Math.random() * notes.length)]);
                
                // Después de un segundo, reproducir automáticamente la melodía
                setTimeout(() => {
                    playSpecialMelody();
                }, 1500);
            }, 500);
        } else {
            // En otras páginas, reproducir la música de fondo si está pausada
            if (pianoMusic && pianoMusic.paused && currentPage !== 2) {
                pianoMusic.play();
            }
        }
    }
}

// Función para reproducir una nota en el piano
function playNote(note) {
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();
    
    oscillator.type = 'sine';
    oscillator.frequency.value = noteFrequencies[note];
    gainNode.gain.setValueAtTime(0.5, audioCtx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.8);
    
    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);
    
    oscillator.start();
    setTimeout(() => {
        oscillator.stop();
    }, 800);
    
    // Crear animación de nota
    const noteElement = document.createElement('div');
    noteElement.classList.add('notes-animation');
    noteElement.innerHTML = ['🎵', '🎶', '♪', '♫'][Math.floor(Math.random() * 4)];
    noteElement.style.left = `${Math.random() * 80 + 10}%`;
    noteElement.style.top = `${Math.random() * 50 + 20}%`;
    document.body.appendChild(noteElement);
    
    setTimeout(() => {
        document.body.removeChild(noteElement);
    }, 3000);
    
    // Destacar la tecla presionada
    const pianoKey = document.querySelector(`.piano-key[data-note="${note}"]`);
    if (pianoKey) {
        pianoKey.style.backgroundColor = note.includes('#') ? '#333' : '#f0f0f0';
        setTimeout(() => {
            pianoKey.style.backgroundColor = note.includes('#') ? 'black' : 'white';
        }, 500);
    }
}

// Función para reproducir la melodía especial
function playSpecialMelody() {
    // Pausar la música de fondo
    const pianoMusic = document.getElementById('pianoMusic');
    if (pianoMusic) {
        pianoMusic.pause();
    }
    
    // Melodía de cumpleaños feliz
    const melody = [
        { note: 'C', duration: 400 },
        { note: 'C', duration: 400 },
        { note: 'D', duration: 400 },
        { note: 'C', duration: 400 },
        { note: 'F', duration: 400 },
        { note: 'E', duration: 700 },
        
        { note: 'C', duration: 400 },
        { note: 'C', duration: 400 },
        { note: 'D', duration: 400 },
        { note: 'C', duration: 400 },
        { note: 'G', duration: 400 },
        { note: 'F', duration: 700 },
        
        { note: 'C', duration: 400 },
        { note: 'C', duration: 400 },
        { note: 'C', duration: 400 },
        { note: 'A', duration: 400 },
        { note: 'F', duration: 400 },
        { note: 'E', duration: 400 },
        { note: 'D', duration: 700 },
        
        { note: 'A#', duration: 400 },
        { note: 'A#', duration: 400 },
        { note: 'A', duration: 400 },
        { note: 'F', duration: 400 },
        { note: 'G', duration: 400 },
        { note: 'F', duration: 900 }
    ];
    
    let delay = 0;
    melody.forEach(note => {
        setTimeout(() => {
            playNote(note.note);
        }, delay);
        delay += note.duration;
    });
    
    // Lanzar confeti durante la melodía
    setTimeout(() => {
        lanzarConfeti();
    }, delay / 2);
    
    setTimeout(() => {
        lanzarConfeti();
    }, delay - 200);
}

// Función para lanzar confeti
function lanzarConfeti() {
    const duration = 4 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { 
        startVelocity: 25,
        spread: 240,
        ticks: 50,
        zIndex: 0 
    };
    
    function randomInRange(min, max) {
        return Math.random() * (max - min) + min;
    }
    
    const interval = setInterval(function() {
        const timeLeft = animationEnd - Date.now();
        
        if (timeLeft <= 0) {
            return clearInterval(interval);
        }
        
        const particleCount = 70 * (timeLeft / duration);
        confetti(Object.assign({}, defaults, {
            particleCount,
            origin: { x: randomInRange(0.2, 0.3), y: Math.random() - 0.2 },
            shapes: ['circle', 'square'],
            scalar: randomInRange(0.4, 1.0)
        }));
        confetti(Object.assign({}, defaults, {
            particleCount,
            origin: { x: randomInRange(0.7, 0.8), y: Math.random() - 0.2 },
            shapes: ['circle', 'square'],
            scalar: randomInRange(0.4, 1.0)
        }));
    }, 400);
}

// Inicializar al cargar la página
window.onload = function() {
    // Reproducir música a volumen suave
    pianoMusic.volume = 0.15;
    
    // Lanzar confeti al inicio
    lanzarConfeti();
};