// create audio context
const AudioContext = window.AudioContext || window.webkitAudioContext;
const context = new AudioContext();

// load sound file
const pianoNotes = {
    'C4': 'https://example.com/piano/C4.mp3',
    'D4': 'https://example.com/piano/D4.mp3',
    'E4': 'https://example.com/piano/E4.mp3',
    'F4': 'https://example.com/piano/F4.mp3',
    'G4': 'https://example.com/piano/G4.mp3',
    'A4': 'https://example.com/piano/A4.mp3',
    'B4': 'https://example.com/piano/B4.mp3',
    'C5': 'https://example.com/piano/C5.mp3',
  };
const pianoBuffers = {};
const loadPianoNotes = async () => {
for (const [note, url] of Object.entries(pianoNotes)) {
    const response = await fetch(url);
    const arrayBuffer = await response.arrayBuffer();
    const buffer = await context.decodeAudioData(arrayBuffer);
    pianoBuffers[note] = buffer;
    }
};
const playNote = (note, duration = 1) => {
    const bufferSource = context.createBufferSource();
    bufferSource.buffer = pianoBuffers[note];
    bufferSource.connect(context.destination);
    bufferSource.start();
    bufferSource.stop(context.currentTime + duration);
};

const keys = ['C4', 'D4', 'E4', 'F4', 'G4', 'A4', 'B4', 'C5'];
const piano = document.createElement('div');
piano.className = 'piano';

for (const key of keys) {
const pianoKey = document.createElement('div');
pianoKey.className = 'piano-key';
pianoKey.dataset.note = key;
pianoKey.addEventListener('mousedown', () => playNote(key));
piano.appendChild(pianoKey);
}
document.body.appendChild(piano);