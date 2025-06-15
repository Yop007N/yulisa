// Función para reproducir una melodía especial
function playSpecialMelody() {
    // Pausar la música de fondo cuando se reproduce el cumpleaños feliz
    const pianoMusic = document.getElementById('pianoMusic');
    if (pianoMusic) {
        pianoMusic.pause();
    }
    
    // Melodía "Que los cumplas feliz" para 21 años
    const melody = [
        // Que los cumplas feliz
        { note: 'C', duration: 400 },
        { note: 'C', duration: 400 },
        { note: 'D', duration: 400 },
        { note: 'C', duration: 400 },
        { note: 'F', duration: 400 },
        { note: 'E', duration: 700 },
        
        // En tu día dichoso
        { note: 'C', duration: 400 },
        { note: 'C', duration: 400 },
        { note: 'D', duration: 400 },
        { note: 'C', duration: 400 },
        { note: 'G', duration: 400 },
        { note: 'F', duration: 700 },
        
        // Que los cumplas feliz
        { note: 'C', duration: 400 },
        { note: 'C', duration: 400 },
        { note: 'C', duration: 400 },
        { note: 'A', duration: 400 },
        { note: 'F', duration: 400 },
        { note: 'E', duration: 400 },
        { note: 'D', duration: 700 },
        
        // Tus 21 años
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
            // Reproducción con volumen aumentado
            const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
            const oscillator = audioCtx.createOscillator();
            const gainNode = audioCtx.createGain();
            
            oscillator.type = 'sine';
            oscillator.frequency.value = noteFrequencies[note.note];
            gainNode.gain.setValueAtTime(0.8, audioCtx.currentTime); // Volumen aumentado a 0.8
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
            const pianoKey = document.querySelector(`.piano-key[data-note="${note.note}"]`);
            if (pianoKey) {
                pianoKey.style.backgroundColor = note.note.includes('#') ? '#333' : '#f0f0f0';
                setTimeout(() => {
                    pianoKey.style.backgroundColor = note.note.includes('#') ? 'black' : 'white';
                }, 500);
            }
        }, delay);
        delay += note.duration;
    });
    
    // Lanzar confeti a mitad y final de la melodía
    setTimeout(() => {
        lanzarConfeti();
    }, delay / 2);
    
    setTimeout(() => {
        lanzarConfeti();
    }, delay - 200);
}

// Función para reproducir notas del piano con volumen aumentado
function playNote(note) {
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();
    
    oscillator.type = 'sine';
    oscillator.frequency.value = noteFrequencies[note];
    gainNode.gain.setValueAtTime(0.8, audioCtx.currentTime); // Volumen aumentado a 0.8
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