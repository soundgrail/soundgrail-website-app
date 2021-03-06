/** @@@ RANGE **/

/**
 * A collection of functions to create note ranges.
 *
 * @example
 * const Range = require("tonal-range")
 * import * as Range from "tonal-range"
 *
 * @example
 * // ascending chromatic range
 * Range.chromatic(["C4", "E4"]) // => ["C4", "Db4", "D4", "Eb4", "E4"]
 * // descending chromatic range
 * Range.chromatic(["E4", "C4"]) // => ["E4", "Eb4", "D4", "Db4", "C4"]
 * // combining ascending and descending in complex ranges
 * Range.chromatic(["C2", "E2", "D2"]) // => ["C2", "Db2", "D2", "Eb2", "E2", "Eb2", "D2"]
 * // numeric (midi note numbers) range
 * Range.numeric(["C4", "E4", "Bb3"]) // => [60, 61, 62, 63, 64]
 * // complex numeric range
 * Range.numeric(["C4", "E4", "Bb3"]) // => [60, 61, 62, 63, 64, 63, 62, 61, 60, 59, 58]
 *
 * @module Range
 */
import { trFifths } from "tonal-distance";
import { midi, fromMidi } from "tonal-note";
import { range } from "tonal-array";
import { filter } from "tonal-pcset";

// convert notes to midi if needed
function asNum(n) {
  return typeof n === "number" ? n : midi(n);
}

/**
 * Create a numeric range. You supply a list of notes or numbers and it will
 * be conected to create complex ranges.
 *
 * @param {Array} array - the list of notes or numbers used
 * @return {Array} an array of numbers or empty array if not vald parameters
 *
 * @example
 * Range.numeric(["C5", "C4"]) // => [ 72, 71, 70, 69, 68, 67, 66, 65, 64, 63, 62, 61, 60 ]
 * // it works midi notes
 * Range.numeric([10, 5]) // => [ 10, 9, 8, 7, 6, 5 ]
 * // complex range
 * Range.numeric(["C4", "E4", "Bb3"]) // => [60, 61, 62, 63, 64, 63, 62, 61, 60, 59, 58]
 * // can be expressed with a string or array
 */
export function numeric(arr) {
  return arr.map(asNum).reduce(function(r, n, i) {
    if (i === 1) return range(r, n);
    const last = r[r.length - 1];
    return r.concat(range(last, n).slice(1));
  });
}

/**
 * Create a range of chromatic notes. The altered notes will use flats.
 *
 * @function
 * @param {String|Array} list - the list of notes or midi note numbers
 * @return {Array} an array of note names
 *
 * @example
 * Range.chromatic("C2 E2 D2") // => ["C2", "Db2", "D2", "Eb2", "E2", "Eb2", "D2"]
 * // with sharps
 * Range.chromatic("C2 C3", true) // => [ "C2", "C#2", "D2", "D#2", "E2", "F2", "F#2", "G2", "G#2", "A2", "A#2", "B2", "C3" ]
 */
export function chromatic(arr, sharps) {
  return numeric(arr).map(n => fromMidi(n, sharps));
}

/**
 * Create a range with a cycle of fifths
 * @function
 * @param {String|Pitch} tonic - the tonic note or pitch class
 * @param {Array|String} range - the range array
 * @return {Array} a range of cycle of fifths starting with the tonic
 * @example
 * Range.fifths("C", [0, 6]) // => [ "C", "G", "D", "A", "E", "B", "F#" ])
 */
export function fifths(tonic, range) {
  return numeric(range).map(trFifths(tonic));
}

/**
 * Create a scale (pitch class set) Range. Given a scale (a pitch class set)
 * and a range array, it returns a range in notes.
 *
 * Can be partially applied
 *
 * @function
 * @param {Array} scale - the scale to use or a function to
 * convert from midi numbers to note names
 * @param {Array} range - a list of notes or midi numbers
 * @return {Array} the scale range, an empty array if not valid source or
 * null if not valid start or end
 *
 * @example
 * Range.scale("C D E F G A B", ["C3", "C2"])
 * // => [ "C3", "B2", "A2", "G2", "F2", "E2", "D2", "C2" ]
 * const majorC = Range.scale("C D E F G A B")
 * majorC(["C3", "C2"]) * // => [ "C3", "B2", "A2", "G2", "F2", "E2", "D2", "C2" ]
 */
export function scale(set, range) {
  return arguments.length === 1
    ? r => scale(set, r)
    : filter(set, chromatic(range));
}


/** @@@ KEY **/


/**
 * [![npm version](https://img.shields.io/npm/v/tonal-Key.svg?style=flat-square)](https://www.npmjs.com/package/tonal-key)
 * [![tonal](https://img.shields.io/badge/tonal-key-yellow.svg?style=flat-square)](https://www.npmjs.com/browse/keyword/tonal)
 *
 * `tonal-key` is a collection of functions to query about tonal keys.
 *
 * This is part of [tonal](https://www.npmjs.com/package/tonal) music theory library.
 *
 * @example
 * // es6
 * import * as Key from "tonal-key"
 * // es5
 * const Key = require("tonal-key")
 *
 * @example
 * Key.scale("E mixolydian") // => [ "E", "F#", "G#", "A", "B", "C#", "D" ]
 * Key.relative("minor", "C major") // => "A minor"
 *
 * @module Key
 */
import { rotate, range } from "tonal-array";
import { tokenize as split, altToAcc } from "tonal-note";
import { trFifths, fifths, interval, transpose } from "tonal-distance";

const MODES = "major dorian phrygian lydian mixolydian minor locrian ionian aeolian".split(
  " "
);
const NUMS = [0, 1, 2, 3, 4, 5, 6, 0, 5];
const NOTES = "C D E F G A B".split(" ");
const CHORDS = "Maj7 m7 m7 Maj7 7 m7 m7b5".split(" ");
const DEGREES = "I II III IV V VI VII".split(" ");
const FIFTHS = [0, 2, 4, -1, 1, 3, 5, 0, 3];

const modenum = mode => NUMS[MODES.indexOf(mode)];

/**
 * Get a list of valid mode names. The list of modes will be always in
 * increasing order (ionian to locrian)
 *
 * @function
 * @param {Boolean} alias - true to get aliases names
 * @return {Array} an array of strings
 * @example
 * Key.modes() // => [ "ionian", "dorian", "phrygian", "lydian",
 * // "mixolydian", "aeolian", "locrian" ]
 * Key.modes(true) // => [ "ionian", "dorian", "phrygian", "lydian",
 * // "mixolydian", "aeolian", "locrian", "major", "minor" ]
 */
export const modeNames = aliases =>
  aliases === true ? MODES.slice() : MODES.slice(0, 7);

/**
 * Create a major key from alterations
 *
 * @function
 * @param {Integer} alt - the alteration number (positive sharps, negative flats)
 * @return {Key} the key object
 * @example
 * Key.fromAlter(2) // => "D major"
 */
export const fromAlter = i => trFifths("C", i) + " major";

export const names = (alt = 4) => {
  alt = Math.abs(alt);
  const result = [];
  for (let i = -alt; i <= alt; i++) result.push(fromAlter(i));
  return result;
};

const NO_KEY = Object.freeze({
  name: null,
  tonic: null,
  mode: null,
  modenum: null,
  intervals: [],
  scale: [],
  alt: null,
  acc: null
});

const properties = name => {
  const p = tokenize(name);
  if (p[0] === null) return NO_KEY;
  const k = { tonic: p[0], mode: p[1] };
  k.name = k.tonic + " " + k.mode;
  k.modenum = modenum(k.mode);
  const cs = rotate(k.modenum, NOTES);
  k.alt = fifths("C", k.tonic) - FIFTHS[MODES.indexOf(k.mode)];
  k.acc = altToAcc(k.alt);
  k.intervals = cs.map(interval(cs[0]));
  k.scale = k.intervals.map(transpose(k.tonic));
  return Object.freeze(k);
};

const memo = (fn, cache = {}) => str => cache[str] || (cache[str] = fn(str));

/**
 * Return the a key properties object with the following information:
 *
 * - name {String}: name
 * - tonic {String}: key tonic
 * - mode {String}: key mode
 * - modenum {Number}: mode number (0 major, 1 dorian, ...)
 * - intervals {Array}: the scale intervals
 * - scale {Array}: the scale notes
 * - acc {String}: accidentals of the key signature
 * - alt {Number}: alteration number (a numeric representation of accidentals)
 *
 * @function
 * @param {String} name - the key name
 * @return {Object} the key properties object or null if not a valid key
 *
 * @example
 * Key.props("C3 dorian") // => { tonic: "C", mode: "dorian", ... }
 */
export const props = memo(properties);

/**
 * Get scale of a key
 *
 * @function
 * @param {String|Object} key
 * @return {Array} the key scale
 *
 * @example
 * Key.scale("A major") // => [ "A", "B", "C#", "D", "E", "F#", "G#" ]
 * Key.scale("Bb minor") // => [ "Bb", "C", "Db", "Eb", "F", "Gb", "Ab" ]
 * Key.scale("C dorian") // => [ "C", "D", "Eb", "F", "G", "A", "Bb" ]
 * Key.scale("E mixolydian") // => [ "E", "F#", "G#", "A", "B", "C#", "D" ]
 */
export const scale = str => props(str).scale;

/**
 * Get a list of key scale degrees
 * @param {String} keyName
 * @return {Array}
 * @example
 * Key.degrees("C major") => ["I", "ii", "iii", "IV", "V", "vi", "vii"]
 */
export const degrees = str => {
  const p = props(str);
  if (p.name === null) return [];
  const chords = rotate(p.modenum, CHORDS);
  return chords.map((chord, i) => {
    const deg = DEGREES[i];
    return chord[0] === "m" ? deg.toLowerCase() : deg;
  });
};

/**
 * Get a list of the altered notes of a given Key. The notes will be in
 * the same order than in the key signature.
 *
 * @function
 * @param {String} key - the key name
 * @return {Array}
 *
 * @example
 * Key.alteredNotes("Eb major") // => [ "Bb", "Eb", "Ab" ]
 */
export const alteredNotes = name => {
  const alt = props(name).alt;
  if (alt === null) return null;
  return alt === 0
    ? []
    : alt > 0
      ? range(1, alt).map(trFifths("B"))
      : range(-1, alt).map(trFifths("F"));
};

/**
 * Get key chords
 *
 * @function
 * @param {String} name - the key name
 * @return {Array}
 *
 * @example
 * Key.chords("A major") // => ["AMaj7", "Bm7", "C#m7", "DMaj7", ..,]
 */
export const chords = str => {
  const p = props(str);
  if (!p.name) return [];
  const chords = rotate(p.modenum, CHORDS);
  return p.scale.map((tonic, i) => tonic + chords[i]);
};

/**
 * Get secondary dominant key chords
 *
 * @function
 * @param {String} name - the key name
 * @return {Array}
 *
 * @example
 * Key.secDomChords("A major") // => ["E7", "F#7", ...]
 */

export const secDomChords = name => {
  const p = props(name);
  if (!p.name) return [];
  return p.scale.map(t => transpose(t, "P5") + "7");
};

/**
 * Get relative of a key. Two keys are relative when the have the same
 * key signature (for example C major and A minor)
 *
 * It can be partially applied.
 *
 * @function
 * @param {String} mode - the relative destination
 * @param {String} key - the key source
 *
 * @example
 * Key.relative("dorian", "B major") // => "C# dorian"
 * // partial application
 * var minor = Key.relative("minor")
 * minor("C major") // => "A minor"
 * minor("E major") // => "C# minor"
 */
export const relative = (mode, key) => {
  if (arguments.length === 1) return key => relative(mode, key);
  const num = modenum(mode.toLowerCase());
  if (num === undefined) return null;
  const k = props(key);
  if (k.name === null) return null;
  return trFifths(k.tonic, FIFTHS[num] - FIFTHS[k.modenum]) + " " + mode;
};

/**
 * Split the key name into its components (pitch class tonic and mode name)
 *
 * @function
 * @param {String} name
 * @return {Array} an array in the form [tonic, key]
 *
 * @example
 * Key.tokenize("C major") // => ["C", "major"]
 */
export const tokenize = name => {
  const p = split(name);
  p[3] = p[3].toLowerCase();
  if (p[0] === "" || MODES.indexOf(p[3]) === -1) return [null, null];
  return [p[0] + p[1], p[3]];
};
