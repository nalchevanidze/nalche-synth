const keys = [
    "C",
    "C#",
    "D",
    "D#",
    "E",
    "F",
    "F#",
    "G",
    "G#",
    "A",
    "A#",
    "B"
];

const list = [
    ...keys.map(note => note + "1"),
    ...keys.map(note => note + "2"),
    ...keys.map(note => note + "3")
];

export default {

    indexOf(note) {
        return list.indexOf(note.id) + 1;
    },
    idByIndex(index) {

        return list[index];

    }
};

