const Context: AudioContext = new(window.AudioContext || window.webkitAudioContext)();
export default Context;