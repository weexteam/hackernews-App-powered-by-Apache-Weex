(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(factory((global.weexVueRenderer = global.weexVueRenderer || {})));
}(this, (function (exports) { 'use strict';

function __$styleInject(css, returnValue) {
  if (typeof document === 'undefined') {
    return returnValue;
  }
  css = css || '';
  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.type = 'text/css';
  if (style.styleSheet){
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
  head.appendChild(style);
  return returnValue;
}
var commonjsGlobal = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};





function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var semver = createCommonjsModule(function (module, exports) {
exports = module.exports = SemVer;

// The debug function is excluded entirely from the minified version.
/* nomin */ var debug;
/* nomin */ if (typeof process === 'object' &&
    /* nomin */ process.env &&
    /* nomin */ false &&
    /* nomin */ /\bsemver\b/i.test(false))
  /* nomin */ { debug = function() {
    /* nomin */ var args = Array.prototype.slice.call(arguments, 0);
    /* nomin */ args.unshift('SEMVER');
    /* nomin */ console.log.apply(console, args);
    /* nomin */ }; }
/* nomin */ else
  /* nomin */ { debug = function() {}; }

// Note: this is the semver.org version of the spec that it implements
// Not necessarily the package version of this code.
exports.SEMVER_SPEC_VERSION = '2.0.0';

var MAX_LENGTH = 256;
var MAX_SAFE_INTEGER = Number.MAX_SAFE_INTEGER || 9007199254740991;

// The actual regexps go on exports.re
var re = exports.re = [];
var src = exports.src = [];
var R = 0;

// The following Regular Expressions can be used for tokenizing,
// validating, and parsing SemVer version strings.

// ## Numeric Identifier
// A single `0`, or a non-zero digit followed by zero or more digits.

var NUMERICIDENTIFIER = R++;
src[NUMERICIDENTIFIER] = '0|[1-9]\\d*';
var NUMERICIDENTIFIERLOOSE = R++;
src[NUMERICIDENTIFIERLOOSE] = '[0-9]+';


// ## Non-numeric Identifier
// Zero or more digits, followed by a letter or hyphen, and then zero or
// more letters, digits, or hyphens.

var NONNUMERICIDENTIFIER = R++;
src[NONNUMERICIDENTIFIER] = '\\d*[a-zA-Z-][a-zA-Z0-9-]*';


// ## Main Version
// Three dot-separated numeric identifiers.

var MAINVERSION = R++;
src[MAINVERSION] = '(' + src[NUMERICIDENTIFIER] + ')\\.' +
                   '(' + src[NUMERICIDENTIFIER] + ')\\.' +
                   '(' + src[NUMERICIDENTIFIER] + ')';

var MAINVERSIONLOOSE = R++;
src[MAINVERSIONLOOSE] = '(' + src[NUMERICIDENTIFIERLOOSE] + ')\\.' +
                        '(' + src[NUMERICIDENTIFIERLOOSE] + ')\\.' +
                        '(' + src[NUMERICIDENTIFIERLOOSE] + ')';

// ## Pre-release Version Identifier
// A numeric identifier, or a non-numeric identifier.

var PRERELEASEIDENTIFIER = R++;
src[PRERELEASEIDENTIFIER] = '(?:' + src[NUMERICIDENTIFIER] +
                            '|' + src[NONNUMERICIDENTIFIER] + ')';

var PRERELEASEIDENTIFIERLOOSE = R++;
src[PRERELEASEIDENTIFIERLOOSE] = '(?:' + src[NUMERICIDENTIFIERLOOSE] +
                                 '|' + src[NONNUMERICIDENTIFIER] + ')';


// ## Pre-release Version
// Hyphen, followed by one or more dot-separated pre-release version
// identifiers.

var PRERELEASE = R++;
src[PRERELEASE] = '(?:-(' + src[PRERELEASEIDENTIFIER] +
                  '(?:\\.' + src[PRERELEASEIDENTIFIER] + ')*))';

var PRERELEASELOOSE = R++;
src[PRERELEASELOOSE] = '(?:-?(' + src[PRERELEASEIDENTIFIERLOOSE] +
                       '(?:\\.' + src[PRERELEASEIDENTIFIERLOOSE] + ')*))';

// ## Build Metadata Identifier
// Any combination of digits, letters, or hyphens.

var BUILDIDENTIFIER = R++;
src[BUILDIDENTIFIER] = '[0-9A-Za-z-]+';

// ## Build Metadata
// Plus sign, followed by one or more period-separated build metadata
// identifiers.

var BUILD = R++;
src[BUILD] = '(?:\\+(' + src[BUILDIDENTIFIER] +
             '(?:\\.' + src[BUILDIDENTIFIER] + ')*))';


// ## Full Version String
// A main version, followed optionally by a pre-release version and
// build metadata.

// Note that the only major, minor, patch, and pre-release sections of
// the version string are capturing groups.  The build metadata is not a
// capturing group, because it should not ever be used in version
// comparison.

var FULL = R++;
var FULLPLAIN = 'v?' + src[MAINVERSION] +
                src[PRERELEASE] + '?' +
                src[BUILD] + '?';

src[FULL] = '^' + FULLPLAIN + '$';

// like full, but allows v1.2.3 and =1.2.3, which people do sometimes.
// also, 1.0.0alpha1 (prerelease without the hyphen) which is pretty
// common in the npm registry.
var LOOSEPLAIN = '[v=\\s]*' + src[MAINVERSIONLOOSE] +
                 src[PRERELEASELOOSE] + '?' +
                 src[BUILD] + '?';

var LOOSE = R++;
src[LOOSE] = '^' + LOOSEPLAIN + '$';

var GTLT = R++;
src[GTLT] = '((?:<|>)?=?)';

// Something like "2.*" or "1.2.x".
// Note that "x.x" is a valid xRange identifer, meaning "any version"
// Only the first item is strictly required.
var XRANGEIDENTIFIERLOOSE = R++;
src[XRANGEIDENTIFIERLOOSE] = src[NUMERICIDENTIFIERLOOSE] + '|x|X|\\*';
var XRANGEIDENTIFIER = R++;
src[XRANGEIDENTIFIER] = src[NUMERICIDENTIFIER] + '|x|X|\\*';

var XRANGEPLAIN = R++;
src[XRANGEPLAIN] = '[v=\\s]*(' + src[XRANGEIDENTIFIER] + ')' +
                   '(?:\\.(' + src[XRANGEIDENTIFIER] + ')' +
                   '(?:\\.(' + src[XRANGEIDENTIFIER] + ')' +
                   '(?:' + src[PRERELEASE] + ')?' +
                   src[BUILD] + '?' +
                   ')?)?';

var XRANGEPLAINLOOSE = R++;
src[XRANGEPLAINLOOSE] = '[v=\\s]*(' + src[XRANGEIDENTIFIERLOOSE] + ')' +
                        '(?:\\.(' + src[XRANGEIDENTIFIERLOOSE] + ')' +
                        '(?:\\.(' + src[XRANGEIDENTIFIERLOOSE] + ')' +
                        '(?:' + src[PRERELEASELOOSE] + ')?' +
                        src[BUILD] + '?' +
                        ')?)?';

var XRANGE = R++;
src[XRANGE] = '^' + src[GTLT] + '\\s*' + src[XRANGEPLAIN] + '$';
var XRANGELOOSE = R++;
src[XRANGELOOSE] = '^' + src[GTLT] + '\\s*' + src[XRANGEPLAINLOOSE] + '$';

// Tilde ranges.
// Meaning is "reasonably at or greater than"
var LONETILDE = R++;
src[LONETILDE] = '(?:~>?)';

var TILDETRIM = R++;
src[TILDETRIM] = '(\\s*)' + src[LONETILDE] + '\\s+';
re[TILDETRIM] = new RegExp(src[TILDETRIM], 'g');
var tildeTrimReplace = '$1~';

var TILDE = R++;
src[TILDE] = '^' + src[LONETILDE] + src[XRANGEPLAIN] + '$';
var TILDELOOSE = R++;
src[TILDELOOSE] = '^' + src[LONETILDE] + src[XRANGEPLAINLOOSE] + '$';

// Caret ranges.
// Meaning is "at least and backwards compatible with"
var LONECARET = R++;
src[LONECARET] = '(?:\\^)';

var CARETTRIM = R++;
src[CARETTRIM] = '(\\s*)' + src[LONECARET] + '\\s+';
re[CARETTRIM] = new RegExp(src[CARETTRIM], 'g');
var caretTrimReplace = '$1^';

var CARET = R++;
src[CARET] = '^' + src[LONECARET] + src[XRANGEPLAIN] + '$';
var CARETLOOSE = R++;
src[CARETLOOSE] = '^' + src[LONECARET] + src[XRANGEPLAINLOOSE] + '$';

// A simple gt/lt/eq thing, or just "" to indicate "any version"
var COMPARATORLOOSE = R++;
src[COMPARATORLOOSE] = '^' + src[GTLT] + '\\s*(' + LOOSEPLAIN + ')$|^$';
var COMPARATOR = R++;
src[COMPARATOR] = '^' + src[GTLT] + '\\s*(' + FULLPLAIN + ')$|^$';


// An expression to strip any whitespace between the gtlt and the thing
// it modifies, so that `> 1.2.3` ==> `>1.2.3`
var COMPARATORTRIM = R++;
src[COMPARATORTRIM] = '(\\s*)' + src[GTLT] +
                      '\\s*(' + LOOSEPLAIN + '|' + src[XRANGEPLAIN] + ')';

// this one has to use the /g flag
re[COMPARATORTRIM] = new RegExp(src[COMPARATORTRIM], 'g');
var comparatorTrimReplace = '$1$2$3';


// Something like `1.2.3 - 1.2.4`
// Note that these all use the loose form, because they'll be
// checked against either the strict or loose comparator form
// later.
var HYPHENRANGE = R++;
src[HYPHENRANGE] = '^\\s*(' + src[XRANGEPLAIN] + ')' +
                   '\\s+-\\s+' +
                   '(' + src[XRANGEPLAIN] + ')' +
                   '\\s*$';

var HYPHENRANGELOOSE = R++;
src[HYPHENRANGELOOSE] = '^\\s*(' + src[XRANGEPLAINLOOSE] + ')' +
                        '\\s+-\\s+' +
                        '(' + src[XRANGEPLAINLOOSE] + ')' +
                        '\\s*$';

// Star ranges basically just allow anything at all.
var STAR = R++;
src[STAR] = '(<|>)?=?\\s*\\*';

// Compile to actual regexp objects.
// All are flag-free, unless they were created above with a flag.
for (var i = 0; i < R; i++) {
  debug(i, src[i]);
  if (!re[i])
    { re[i] = new RegExp(src[i]); }
}

exports.parse = parse;
function parse(version, loose) {
  if (version instanceof SemVer)
    { return version; }

  if (typeof version !== 'string')
    { return null; }

  if (version.length > MAX_LENGTH)
    { return null; }

  var r = loose ? re[LOOSE] : re[FULL];
  if (!r.test(version))
    { return null; }

  try {
    return new SemVer(version, loose);
  } catch (er) {
    return null;
  }
}

exports.valid = valid;
function valid(version, loose) {
  var v = parse(version, loose);
  return v ? v.version : null;
}


exports.clean = clean;
function clean(version, loose) {
  var s = parse(version.trim().replace(/^[=v]+/, ''), loose);
  return s ? s.version : null;
}

exports.SemVer = SemVer;

function SemVer(version, loose) {
  if (version instanceof SemVer) {
    if (version.loose === loose)
      { return version; }
    else
      { version = version.version; }
  } else if (typeof version !== 'string') {
    throw new TypeError('Invalid Version: ' + version);
  }

  if (version.length > MAX_LENGTH)
    { throw new TypeError('version is longer than ' + MAX_LENGTH + ' characters') }

  if (!(this instanceof SemVer))
    { return new SemVer(version, loose); }

  debug('SemVer', version, loose);
  this.loose = loose;
  var m = version.trim().match(loose ? re[LOOSE] : re[FULL]);

  if (!m)
    { throw new TypeError('Invalid Version: ' + version); }

  this.raw = version;

  // these are actually numbers
  this.major = +m[1];
  this.minor = +m[2];
  this.patch = +m[3];

  if (this.major > MAX_SAFE_INTEGER || this.major < 0)
    { throw new TypeError('Invalid major version') }

  if (this.minor > MAX_SAFE_INTEGER || this.minor < 0)
    { throw new TypeError('Invalid minor version') }

  if (this.patch > MAX_SAFE_INTEGER || this.patch < 0)
    { throw new TypeError('Invalid patch version') }

  // numberify any prerelease numeric ids
  if (!m[4])
    { this.prerelease = []; }
  else
    { this.prerelease = m[4].split('.').map(function(id) {
      if (/^[0-9]+$/.test(id)) {
        var num = +id;
        if (num >= 0 && num < MAX_SAFE_INTEGER)
          { return num; }
      }
      return id;
    }); }

  this.build = m[5] ? m[5].split('.') : [];
  this.format();
}

SemVer.prototype.format = function() {
  this.version = this.major + '.' + this.minor + '.' + this.patch;
  if (this.prerelease.length)
    { this.version += '-' + this.prerelease.join('.'); }
  return this.version;
};

SemVer.prototype.toString = function() {
  return this.version;
};

SemVer.prototype.compare = function(other) {
  debug('SemVer.compare', this.version, this.loose, other);
  if (!(other instanceof SemVer))
    { other = new SemVer(other, this.loose); }

  return this.compareMain(other) || this.comparePre(other);
};

SemVer.prototype.compareMain = function(other) {
  if (!(other instanceof SemVer))
    { other = new SemVer(other, this.loose); }

  return compareIdentifiers(this.major, other.major) ||
         compareIdentifiers(this.minor, other.minor) ||
         compareIdentifiers(this.patch, other.patch);
};

SemVer.prototype.comparePre = function(other) {
  var this$1 = this;

  if (!(other instanceof SemVer))
    { other = new SemVer(other, this.loose); }

  // NOT having a prerelease is > having one
  if (this.prerelease.length && !other.prerelease.length)
    { return -1; }
  else if (!this.prerelease.length && other.prerelease.length)
    { return 1; }
  else if (!this.prerelease.length && !other.prerelease.length)
    { return 0; }

  var i = 0;
  do {
    var a = this$1.prerelease[i];
    var b = other.prerelease[i];
    debug('prerelease compare', i, a, b);
    if (a === undefined && b === undefined)
      { return 0; }
    else if (b === undefined)
      { return 1; }
    else if (a === undefined)
      { return -1; }
    else if (a === b)
      { continue; }
    else
      { return compareIdentifiers(a, b); }
  } while (++i);
};

// preminor will bump the version up to the next minor release, and immediately
// down to pre-release. premajor and prepatch work the same way.
SemVer.prototype.inc = function(release, identifier) {
  var this$1 = this;

  switch (release) {
    case 'premajor':
      this.prerelease.length = 0;
      this.patch = 0;
      this.minor = 0;
      this.major++;
      this.inc('pre', identifier);
      break;
    case 'preminor':
      this.prerelease.length = 0;
      this.patch = 0;
      this.minor++;
      this.inc('pre', identifier);
      break;
    case 'prepatch':
      // If this is already a prerelease, it will bump to the next version
      // drop any prereleases that might already exist, since they are not
      // relevant at this point.
      this.prerelease.length = 0;
      this.inc('patch', identifier);
      this.inc('pre', identifier);
      break;
    // If the input is a non-prerelease version, this acts the same as
    // prepatch.
    case 'prerelease':
      if (this.prerelease.length === 0)
        { this.inc('patch', identifier); }
      this.inc('pre', identifier);
      break;

    case 'major':
      // If this is a pre-major version, bump up to the same major version.
      // Otherwise increment major.
      // 1.0.0-5 bumps to 1.0.0
      // 1.1.0 bumps to 2.0.0
      if (this.minor !== 0 || this.patch !== 0 || this.prerelease.length === 0)
        { this.major++; }
      this.minor = 0;
      this.patch = 0;
      this.prerelease = [];
      break;
    case 'minor':
      // If this is a pre-minor version, bump up to the same minor version.
      // Otherwise increment minor.
      // 1.2.0-5 bumps to 1.2.0
      // 1.2.1 bumps to 1.3.0
      if (this.patch !== 0 || this.prerelease.length === 0)
        { this.minor++; }
      this.patch = 0;
      this.prerelease = [];
      break;
    case 'patch':
      // If this is not a pre-release version, it will increment the patch.
      // If it is a pre-release it will bump up to the same patch version.
      // 1.2.0-5 patches to 1.2.0
      // 1.2.0 patches to 1.2.1
      if (this.prerelease.length === 0)
        { this.patch++; }
      this.prerelease = [];
      break;
    // This probably shouldn't be used publicly.
    // 1.0.0 "pre" would become 1.0.0-0 which is the wrong direction.
    case 'pre':
      if (this.prerelease.length === 0)
        { this.prerelease = [0]; }
      else {
        var i = this.prerelease.length;
        while (--i >= 0) {
          if (typeof this$1.prerelease[i] === 'number') {
            this$1.prerelease[i]++;
            i = -2;
          }
        }
        if (i === -1) // didn't increment anything
          { this.prerelease.push(0); }
      }
      if (identifier) {
        // 1.2.0-beta.1 bumps to 1.2.0-beta.2,
        // 1.2.0-beta.fooblz or 1.2.0-beta bumps to 1.2.0-beta.0
        if (this.prerelease[0] === identifier) {
          if (isNaN(this.prerelease[1]))
            { this.prerelease = [identifier, 0]; }
        } else
          { this.prerelease = [identifier, 0]; }
      }
      break;

    default:
      throw new Error('invalid increment argument: ' + release);
  }
  this.format();
  this.raw = this.version;
  return this;
};

exports.inc = inc;
function inc(version, release, loose, identifier) {
  if (typeof(loose) === 'string') {
    identifier = loose;
    loose = undefined;
  }

  try {
    return new SemVer(version, loose).inc(release, identifier).version;
  } catch (er) {
    return null;
  }
}

exports.diff = diff;
function diff(version1, version2) {
  if (eq(version1, version2)) {
    return null;
  } else {
    var v1 = parse(version1);
    var v2 = parse(version2);
    if (v1.prerelease.length || v2.prerelease.length) {
      for (var key in v1) {
        if (key === 'major' || key === 'minor' || key === 'patch') {
          if (v1[key] !== v2[key]) {
            return 'pre'+key;
          }
        }
      }
      return 'prerelease';
    }
    for (var key in v1) {
      if (key === 'major' || key === 'minor' || key === 'patch') {
        if (v1[key] !== v2[key]) {
          return key;
        }
      }
    }
  }
}

exports.compareIdentifiers = compareIdentifiers;

var numeric = /^[0-9]+$/;
function compareIdentifiers(a, b) {
  var anum = numeric.test(a);
  var bnum = numeric.test(b);

  if (anum && bnum) {
    a = +a;
    b = +b;
  }

  return (anum && !bnum) ? -1 :
         (bnum && !anum) ? 1 :
         a < b ? -1 :
         a > b ? 1 :
         0;
}

exports.rcompareIdentifiers = rcompareIdentifiers;
function rcompareIdentifiers(a, b) {
  return compareIdentifiers(b, a);
}

exports.major = major;
function major(a, loose) {
  return new SemVer(a, loose).major;
}

exports.minor = minor;
function minor(a, loose) {
  return new SemVer(a, loose).minor;
}

exports.patch = patch;
function patch(a, loose) {
  return new SemVer(a, loose).patch;
}

exports.compare = compare;
function compare(a, b, loose) {
  return new SemVer(a, loose).compare(b);
}

exports.compareLoose = compareLoose;
function compareLoose(a, b) {
  return compare(a, b, true);
}

exports.rcompare = rcompare;
function rcompare(a, b, loose) {
  return compare(b, a, loose);
}

exports.sort = sort;
function sort(list, loose) {
  return list.sort(function(a, b) {
    return exports.compare(a, b, loose);
  });
}

exports.rsort = rsort;
function rsort(list, loose) {
  return list.sort(function(a, b) {
    return exports.rcompare(a, b, loose);
  });
}

exports.gt = gt;
function gt(a, b, loose) {
  return compare(a, b, loose) > 0;
}

exports.lt = lt;
function lt(a, b, loose) {
  return compare(a, b, loose) < 0;
}

exports.eq = eq;
function eq(a, b, loose) {
  return compare(a, b, loose) === 0;
}

exports.neq = neq;
function neq(a, b, loose) {
  return compare(a, b, loose) !== 0;
}

exports.gte = gte;
function gte(a, b, loose) {
  return compare(a, b, loose) >= 0;
}

exports.lte = lte;
function lte(a, b, loose) {
  return compare(a, b, loose) <= 0;
}

exports.cmp = cmp;
function cmp(a, op, b, loose) {
  var ret;
  switch (op) {
    case '===':
      if (typeof a === 'object') { a = a.version; }
      if (typeof b === 'object') { b = b.version; }
      ret = a === b;
      break;
    case '!==':
      if (typeof a === 'object') { a = a.version; }
      if (typeof b === 'object') { b = b.version; }
      ret = a !== b;
      break;
    case '': case '=': case '==': ret = eq(a, b, loose); break;
    case '!=': ret = neq(a, b, loose); break;
    case '>': ret = gt(a, b, loose); break;
    case '>=': ret = gte(a, b, loose); break;
    case '<': ret = lt(a, b, loose); break;
    case '<=': ret = lte(a, b, loose); break;
    default: throw new TypeError('Invalid operator: ' + op);
  }
  return ret;
}

exports.Comparator = Comparator;
function Comparator(comp, loose) {
  if (comp instanceof Comparator) {
    if (comp.loose === loose)
      { return comp; }
    else
      { comp = comp.value; }
  }

  if (!(this instanceof Comparator))
    { return new Comparator(comp, loose); }

  debug('comparator', comp, loose);
  this.loose = loose;
  this.parse(comp);

  if (this.semver === ANY)
    { this.value = ''; }
  else
    { this.value = this.operator + this.semver.version; }

  debug('comp', this);
}

var ANY = {};
Comparator.prototype.parse = function(comp) {
  var r = this.loose ? re[COMPARATORLOOSE] : re[COMPARATOR];
  var m = comp.match(r);

  if (!m)
    { throw new TypeError('Invalid comparator: ' + comp); }

  this.operator = m[1];
  if (this.operator === '=')
    { this.operator = ''; }

  // if it literally is just '>' or '' then allow anything.
  if (!m[2])
    { this.semver = ANY; }
  else
    { this.semver = new SemVer(m[2], this.loose); }
};

Comparator.prototype.toString = function() {
  return this.value;
};

Comparator.prototype.test = function(version) {
  debug('Comparator.test', version, this.loose);

  if (this.semver === ANY)
    { return true; }

  if (typeof version === 'string')
    { version = new SemVer(version, this.loose); }

  return cmp(version, this.operator, this.semver, this.loose);
};


exports.Range = Range;
function Range(range, loose) {
  if ((range instanceof Range) && range.loose === loose)
    { return range; }

  if (!(this instanceof Range))
    { return new Range(range, loose); }

  this.loose = loose;

  // First, split based on boolean or ||
  this.raw = range;
  this.set = range.split(/\s*\|\|\s*/).map(function(range) {
    return this.parseRange(range.trim());
  }, this).filter(function(c) {
    // throw out any that are not relevant for whatever reason
    return c.length;
  });

  if (!this.set.length) {
    throw new TypeError('Invalid SemVer Range: ' + range);
  }

  this.format();
}

Range.prototype.format = function() {
  this.range = this.set.map(function(comps) {
    return comps.join(' ').trim();
  }).join('||').trim();
  return this.range;
};

Range.prototype.toString = function() {
  return this.range;
};

Range.prototype.parseRange = function(range) {
  var loose = this.loose;
  range = range.trim();
  debug('range', range, loose);
  // `1.2.3 - 1.2.4` => `>=1.2.3 <=1.2.4`
  var hr = loose ? re[HYPHENRANGELOOSE] : re[HYPHENRANGE];
  range = range.replace(hr, hyphenReplace);
  debug('hyphen replace', range);
  // `> 1.2.3 < 1.2.5` => `>1.2.3 <1.2.5`
  range = range.replace(re[COMPARATORTRIM], comparatorTrimReplace);
  debug('comparator trim', range, re[COMPARATORTRIM]);

  // `~ 1.2.3` => `~1.2.3`
  range = range.replace(re[TILDETRIM], tildeTrimReplace);

  // `^ 1.2.3` => `^1.2.3`
  range = range.replace(re[CARETTRIM], caretTrimReplace);

  // normalize spaces
  range = range.split(/\s+/).join(' ');

  // At this point, the range is completely trimmed and
  // ready to be split into comparators.

  var compRe = loose ? re[COMPARATORLOOSE] : re[COMPARATOR];
  var set = range.split(' ').map(function(comp) {
    return parseComparator(comp, loose);
  }).join(' ').split(/\s+/);
  if (this.loose) {
    // in loose mode, throw out any that are not valid comparators
    set = set.filter(function(comp) {
      return !!comp.match(compRe);
    });
  }
  set = set.map(function(comp) {
    return new Comparator(comp, loose);
  });

  return set;
};

// Mostly just for testing and legacy API reasons
exports.toComparators = toComparators;
function toComparators(range, loose) {
  return new Range(range, loose).set.map(function(comp) {
    return comp.map(function(c) {
      return c.value;
    }).join(' ').trim().split(' ');
  });
}

// comprised of xranges, tildes, stars, and gtlt's at this point.
// already replaced the hyphen ranges
// turn into a set of JUST comparators.
function parseComparator(comp, loose) {
  debug('comp', comp);
  comp = replaceCarets(comp, loose);
  debug('caret', comp);
  comp = replaceTildes(comp, loose);
  debug('tildes', comp);
  comp = replaceXRanges(comp, loose);
  debug('xrange', comp);
  comp = replaceStars(comp, loose);
  debug('stars', comp);
  return comp;
}

function isX(id) {
  return !id || id.toLowerCase() === 'x' || id === '*';
}

// ~, ~> --> * (any, kinda silly)
// ~2, ~2.x, ~2.x.x, ~>2, ~>2.x ~>2.x.x --> >=2.0.0 <3.0.0
// ~2.0, ~2.0.x, ~>2.0, ~>2.0.x --> >=2.0.0 <2.1.0
// ~1.2, ~1.2.x, ~>1.2, ~>1.2.x --> >=1.2.0 <1.3.0
// ~1.2.3, ~>1.2.3 --> >=1.2.3 <1.3.0
// ~1.2.0, ~>1.2.0 --> >=1.2.0 <1.3.0
function replaceTildes(comp, loose) {
  return comp.trim().split(/\s+/).map(function(comp) {
    return replaceTilde(comp, loose);
  }).join(' ');
}

function replaceTilde(comp, loose) {
  var r = loose ? re[TILDELOOSE] : re[TILDE];
  return comp.replace(r, function(_, M, m, p, pr) {
    debug('tilde', comp, _, M, m, p, pr);
    var ret;

    if (isX(M))
      { ret = ''; }
    else if (isX(m))
      { ret = '>=' + M + '.0.0 <' + (+M + 1) + '.0.0'; }
    else if (isX(p))
      // ~1.2 == >=1.2.0 <1.3.0
      { ret = '>=' + M + '.' + m + '.0 <' + M + '.' + (+m + 1) + '.0'; }
    else if (pr) {
      debug('replaceTilde pr', pr);
      if (pr.charAt(0) !== '-')
        { pr = '-' + pr; }
      ret = '>=' + M + '.' + m + '.' + p + pr +
            ' <' + M + '.' + (+m + 1) + '.0';
    } else
      // ~1.2.3 == >=1.2.3 <1.3.0
      { ret = '>=' + M + '.' + m + '.' + p +
            ' <' + M + '.' + (+m + 1) + '.0'; }

    debug('tilde return', ret);
    return ret;
  });
}

// ^ --> * (any, kinda silly)
// ^2, ^2.x, ^2.x.x --> >=2.0.0 <3.0.0
// ^2.0, ^2.0.x --> >=2.0.0 <3.0.0
// ^1.2, ^1.2.x --> >=1.2.0 <2.0.0
// ^1.2.3 --> >=1.2.3 <2.0.0
// ^1.2.0 --> >=1.2.0 <2.0.0
function replaceCarets(comp, loose) {
  return comp.trim().split(/\s+/).map(function(comp) {
    return replaceCaret(comp, loose);
  }).join(' ');
}

function replaceCaret(comp, loose) {
  debug('caret', comp, loose);
  var r = loose ? re[CARETLOOSE] : re[CARET];
  return comp.replace(r, function(_, M, m, p, pr) {
    debug('caret', comp, _, M, m, p, pr);
    var ret;

    if (isX(M))
      { ret = ''; }
    else if (isX(m))
      { ret = '>=' + M + '.0.0 <' + (+M + 1) + '.0.0'; }
    else if (isX(p)) {
      if (M === '0')
        { ret = '>=' + M + '.' + m + '.0 <' + M + '.' + (+m + 1) + '.0'; }
      else
        { ret = '>=' + M + '.' + m + '.0 <' + (+M + 1) + '.0.0'; }
    } else if (pr) {
      debug('replaceCaret pr', pr);
      if (pr.charAt(0) !== '-')
        { pr = '-' + pr; }
      if (M === '0') {
        if (m === '0')
          { ret = '>=' + M + '.' + m + '.' + p + pr +
                ' <' + M + '.' + m + '.' + (+p + 1); }
        else
          { ret = '>=' + M + '.' + m + '.' + p + pr +
                ' <' + M + '.' + (+m + 1) + '.0'; }
      } else
        { ret = '>=' + M + '.' + m + '.' + p + pr +
              ' <' + (+M + 1) + '.0.0'; }
    } else {
      debug('no pr');
      if (M === '0') {
        if (m === '0')
          { ret = '>=' + M + '.' + m + '.' + p +
                ' <' + M + '.' + m + '.' + (+p + 1); }
        else
          { ret = '>=' + M + '.' + m + '.' + p +
                ' <' + M + '.' + (+m + 1) + '.0'; }
      } else
        { ret = '>=' + M + '.' + m + '.' + p +
              ' <' + (+M + 1) + '.0.0'; }
    }

    debug('caret return', ret);
    return ret;
  });
}

function replaceXRanges(comp, loose) {
  debug('replaceXRanges', comp, loose);
  return comp.split(/\s+/).map(function(comp) {
    return replaceXRange(comp, loose);
  }).join(' ');
}

function replaceXRange(comp, loose) {
  comp = comp.trim();
  var r = loose ? re[XRANGELOOSE] : re[XRANGE];
  return comp.replace(r, function(ret, gtlt, M, m, p, pr) {
    debug('xRange', comp, ret, gtlt, M, m, p, pr);
    var xM = isX(M);
    var xm = xM || isX(m);
    var xp = xm || isX(p);
    var anyX = xp;

    if (gtlt === '=' && anyX)
      { gtlt = ''; }

    if (xM) {
      if (gtlt === '>' || gtlt === '<') {
        // nothing is allowed
        ret = '<0.0.0';
      } else {
        // nothing is forbidden
        ret = '*';
      }
    } else if (gtlt && anyX) {
      // replace X with 0
      if (xm)
        { m = 0; }
      if (xp)
        { p = 0; }

      if (gtlt === '>') {
        // >1 => >=2.0.0
        // >1.2 => >=1.3.0
        // >1.2.3 => >= 1.2.4
        gtlt = '>=';
        if (xm) {
          M = +M + 1;
          m = 0;
          p = 0;
        } else if (xp) {
          m = +m + 1;
          p = 0;
        }
      } else if (gtlt === '<=') {
        // <=0.7.x is actually <0.8.0, since any 0.7.x should
        // pass.  Similarly, <=7.x is actually <8.0.0, etc.
        gtlt = '<';
        if (xm)
          { M = +M + 1; }
        else
          { m = +m + 1; }
      }

      ret = gtlt + M + '.' + m + '.' + p;
    } else if (xm) {
      ret = '>=' + M + '.0.0 <' + (+M + 1) + '.0.0';
    } else if (xp) {
      ret = '>=' + M + '.' + m + '.0 <' + M + '.' + (+m + 1) + '.0';
    }

    debug('xRange return', ret);

    return ret;
  });
}

// Because * is AND-ed with everything else in the comparator,
// and '' means "any version", just remove the *s entirely.
function replaceStars(comp, loose) {
  debug('replaceStars', comp, loose);
  // Looseness is ignored here.  star is always as loose as it gets!
  return comp.trim().replace(re[STAR], '');
}

// This function is passed to string.replace(re[HYPHENRANGE])
// M, m, patch, prerelease, build
// 1.2 - 3.4.5 => >=1.2.0 <=3.4.5
// 1.2.3 - 3.4 => >=1.2.0 <3.5.0 Any 3.4.x will do
// 1.2 - 3.4 => >=1.2.0 <3.5.0
function hyphenReplace($0,
                       from, fM, fm, fp, fpr, fb,
                       to, tM, tm, tp, tpr, tb) {

  if (isX(fM))
    { from = ''; }
  else if (isX(fm))
    { from = '>=' + fM + '.0.0'; }
  else if (isX(fp))
    { from = '>=' + fM + '.' + fm + '.0'; }
  else
    { from = '>=' + from; }

  if (isX(tM))
    { to = ''; }
  else if (isX(tm))
    { to = '<' + (+tM + 1) + '.0.0'; }
  else if (isX(tp))
    { to = '<' + tM + '.' + (+tm + 1) + '.0'; }
  else if (tpr)
    { to = '<=' + tM + '.' + tm + '.' + tp + '-' + tpr; }
  else
    { to = '<=' + to; }

  return (from + ' ' + to).trim();
}


// if ANY of the sets match ALL of its comparators, then pass
Range.prototype.test = function(version) {
  var this$1 = this;

  if (!version)
    { return false; }

  if (typeof version === 'string')
    { version = new SemVer(version, this.loose); }

  for (var i = 0; i < this.set.length; i++) {
    if (testSet(this$1.set[i], version))
      { return true; }
  }
  return false;
};

function testSet(set, version) {
  for (var i = 0; i < set.length; i++) {
    if (!set[i].test(version))
      { return false; }
  }

  if (version.prerelease.length) {
    // Find the set of versions that are allowed to have prereleases
    // For example, ^1.2.3-pr.1 desugars to >=1.2.3-pr.1 <2.0.0
    // That should allow `1.2.3-pr.2` to pass.
    // However, `1.2.4-alpha.notready` should NOT be allowed,
    // even though it's within the range set by the comparators.
    for (var i = 0; i < set.length; i++) {
      debug(set[i].semver);
      if (set[i].semver === ANY)
        { continue; }

      if (set[i].semver.prerelease.length > 0) {
        var allowed = set[i].semver;
        if (allowed.major === version.major &&
            allowed.minor === version.minor &&
            allowed.patch === version.patch)
          { return true; }
      }
    }

    // Version has a -pre, but it's not one of the ones we like.
    return false;
  }

  return true;
}

exports.satisfies = satisfies;
function satisfies(version, range, loose) {
  try {
    range = new Range(range, loose);
  } catch (er) {
    return false;
  }
  return range.test(version);
}

exports.maxSatisfying = maxSatisfying;
function maxSatisfying(versions, range, loose) {
  return versions.filter(function(version) {
    return satisfies(version, range, loose);
  }).sort(function(a, b) {
    return rcompare(a, b, loose);
  })[0] || null;
}

exports.minSatisfying = minSatisfying;
function minSatisfying(versions, range, loose) {
  return versions.filter(function(version) {
    return satisfies(version, range, loose);
  }).sort(function(a, b) {
    return compare(a, b, loose);
  })[0] || null;
}

exports.validRange = validRange;
function validRange(range, loose) {
  try {
    // Return '*' instead of '' so that truthiness works.
    // This will throw if it's invalid anyway
    return new Range(range, loose).range || '*';
  } catch (er) {
    return null;
  }
}

// Determine if version is less than all the versions possible in the range
exports.ltr = ltr;
function ltr(version, range, loose) {
  return outside(version, range, '<', loose);
}

// Determine if version is greater than all the versions possible in the range.
exports.gtr = gtr;
function gtr(version, range, loose) {
  return outside(version, range, '>', loose);
}

exports.outside = outside;
function outside(version, range, hilo, loose) {
  version = new SemVer(version, loose);
  range = new Range(range, loose);

  var gtfn, ltefn, ltfn, comp, ecomp;
  switch (hilo) {
    case '>':
      gtfn = gt;
      ltefn = lte;
      ltfn = lt;
      comp = '>';
      ecomp = '>=';
      break;
    case '<':
      gtfn = lt;
      ltefn = gte;
      ltfn = gt;
      comp = '<';
      ecomp = '<=';
      break;
    default:
      throw new TypeError('Must provide a hilo val of "<" or ">"');
  }

  // If it satisifes the range it is not outside
  if (satisfies(version, range, loose)) {
    return false;
  }

  // From now on, variable terms are as if we're in "gtr" mode.
  // but note that everything is flipped for the "ltr" function.

  for (var i = 0; i < range.set.length; ++i) {
    var comparators = range.set[i];

    var high = null;
    var low = null;

    comparators.forEach(function(comparator) {
      if (comparator.semver === ANY) {
        comparator = new Comparator('>=0.0.0');
      }
      high = high || comparator;
      low = low || comparator;
      if (gtfn(comparator.semver, high.semver, loose)) {
        high = comparator;
      } else if (ltfn(comparator.semver, low.semver, loose)) {
        low = comparator;
      }
    });

    // If the edge version comparator has a operator then our version
    // isn't outside it
    if (high.operator === comp || high.operator === ecomp) {
      return false;
    }

    // If the lowest version comparator has an operator and our version
    // is less than it then it isn't higher than the range
    if ((!low.operator || low.operator === comp) &&
        ltefn(version, low.semver)) {
      return false;
    } else if (low.operator === ecomp && ltfn(version, low.semver)) {
      return false;
    }
  }
  return true;
}

exports.prerelease = prerelease;
function prerelease(version, loose) {
  var parsed = parse(version, loose);
  return (parsed && parsed.prerelease.length) ? parsed.prerelease : null;
}
});

/**
 * Validate the CSS color value.
 */
function isCSSColor (value) {
  return /^[a-z]+$/i.test(value) // match color name
    || /^#([a-f0-9]{3}){1,2}$/i.test(value) // match #ABCDEF
    || /^rgb\s*\((\s*[0-9.]+\s*,){2}\s*[0-9.]+\s*\)/i.test(value) // match rgb(0,0,0)
    || /^rgba\s*\((\s*[0-9.]+\s*,){3}\s*[0-9.]+\s*\)/i.test(value) // match rgba(0,0,0,0)
}

function isCSSLength (value) {
  return /^[+-]?[0-9]+.?([0-9]+)?(px|%)?$/.test(String(value))
}

function position (value) {
  return ['absolute', 'relative', 'fixed', 'sticky'].indexOf(value) !== -1
}

function opacity (value) {
  var count = parseFloat(value);
  return count >= 0 && count <= 1
}

function display (value) {
  return ['block', 'flex'].indexOf(value) !== -1
}

function flexDirection (value) {
  return ['row', 'column'].indexOf(value) !== -1
}

function justifyContent (value) {
  return ['flex-start', 'flex-end', 'center', 'space-between'].indexOf(value) !== -1
}

function alignItems (value) {
  return ['stretch', 'flex-start', 'flex-end', 'center'].indexOf(value) !== -1
}

function flex (value) {
  return /^\d{1,3}$/.test(String(value))
}

function fontStyle (value) {
  return ['normal', 'italic', 'oblique'].indexOf(value) !== -1
}

function fontWeight (value) {
  return ['normal', 'bold', 'light', 'bolder', 'lighter'].indexOf(value) !== -1
}

function textDecoration (value) {
  return ['none', 'underline', 'line-through'].indexOf(value) !== -1
}

function textAlign (value) {
  return ['left', 'center', 'right'].indexOf(value) !== -1
}

function overflow (value) {
  return ['visible', 'hidden'].indexOf(value) !== -1
}

function textOverflow (value) {
  return ['clip', 'ellipsis'].indexOf(value) !== -1
}

/**
 * Common style validator.
 * @param {any} value
 * @param {String} key
 */
function common (value, key) {
  if (/^[\w-]*color$/.test(String(key))) {
    return isCSSColor(value)
  }

  if (/^(width|height)$/.test(String(key))) {
    return isCSSLength(value)
  }

  // checkout border-radius
  if (/^border-((top|right|bottom|left)-){0,2}(width|radius)$/.test(String(key))) {
    return isCSSLength(value)
  }

  // check border-style
  if (/border-((top|right|bottom|left)-)?style/.test(String(key))) {
    return ['solid', 'dashed', 'dotted'].indexOf(value) !== -1
  }

  if (/^((margin|padding)-)?(top|right|bottom|left)/.test(String(key))) {
    return isCSSLength(value)
  }

  switch (String(key)) {
    case 'font-size': return isCSSLength(value)
  }

  return true
}


var styleValidator = Object.freeze({
	isCSSColor: isCSSColor,
	isCSSLength: isCSSLength,
	position: position,
	opacity: opacity,
	display: display,
	flexDirection: flexDirection,
	justifyContent: justifyContent,
	alignItems: alignItems,
	flex: flex,
	fontStyle: fontStyle,
	fontWeight: fontWeight,
	textDecoration: textDecoration,
	textAlign: textAlign,
	overflow: overflow,
	textOverflow: textOverflow,
	common: common
});

function isString (value) {
  return Object.prototype.toString.call(value) === '[object String]'
}


var propValidator = Object.freeze({
	isString: isString
});

/**
 * Create a cached version of a pure function.
 */
function cached (fn) {
  var cache = Object.create(null);
  return function cachedFn (str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str))
  }
}

/**
 * Camelize a hyphen-delmited string.
 */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) { return c.toUpperCase(); })
});

/**
 * Capitalize a string.
 */
var capitalize = cached(function (str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
});

/**
 * Hyphenate a camelCase string.
 */
var hyphenateRE = /([^-])([A-Z])/g;
var hyphenate = cached(function (str) {
  return str
    .replace(hyphenateRE, '$1-$2')
    .replace(hyphenateRE, '$1-$2')
    .toLowerCase()
});

function camelToKebab (name) {
  if (!name) { return '' }
  return name.replace(/([A-Z])/g, function (g, g1) {
    return ("-" + (g1.toLowerCase()))
  })
}

/**
 * Mix properties into target object.
 */
function extend (to, _from) {
  for (var key in _from) {
    to[key] = _from[key];
  }
  return to
}

/**
 * Simple bind, faster than native
 *
 * @param {Function} fn
 * @param {Object} ctx
 * @return {Function}
 */
function bind (fn, ctx) {
  return function (a) {
    var l = arguments.length;
    return l
      ? l > 1
        ? fn.apply(ctx, arguments)
        : fn.call(ctx, a)
      : fn.call(ctx)
  }
}

function debounce (func, wait) {
  var timerId;
  function later () {
    timerId = null;
    func.apply(null);
  }
  return function () {
    clearTimeout(timerId);
    timerId = setTimeout(later, wait);
  }
}

function throttle (func, wait) {
  var last = 0;
  return function () {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    var context = this;
    var time = new Date().getTime();
    if (time - last > wait) {
      func.apply(context, args);
      last = time;
    }
  }
}

function createMixin () {
  var mixins = [], len = arguments.length;
  while ( len-- ) mixins[ len ] = arguments[ len ];

  var mixinMethods = {};
  mixins.forEach(function (methods) {
    var loop = function ( key ) {
      mixinMethods[key] = function () {
        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];

        return methods[key].apply(this, [this ].concat( args))
      };
    };

    for (var key in methods) loop( key );
  });
  return {
    methods: mixinMethods
  }
}

function appendStyle (css, styleId, replace) {
  var style = document.getElementById(styleId);
  if (style && replace) {
    style.parentNode.removeChild(style);
    style = null;
  }
  if (!style) {
    style = document.createElement('style');
    style.type = 'text/css';
    styleId && (style.id = styleId);
    document.getElementsByTagName('head')[0].appendChild(style);
  }
  style.appendChild(document.createTextNode(css));
}

/**
 * Strict object type check. Only returns true
 * for plain JavaScript objects.
 *
 * @param {*} obj
 * @return {Boolean}
 */

var toString$1 = Object.prototype.toString;
var OBJECT_STRING = '[object Object]';
function isPlainObject (obj) {
  return toString$1.call(obj) === OBJECT_STRING
}


var utils = Object.freeze({
	cached: cached,
	camelize: camelize,
	capitalize: capitalize,
	hyphenate: hyphenate,
	camelToKebab: camelToKebab,
	extend: extend,
	bind: bind,
	debounce: debounce,
	throttle: throttle,
	createMixin: createMixin,
	appendStyle: appendStyle,
	isPlainObject: isPlainObject
});

var supportedStyles = {
  '@box-model': [
    'width', 'height', 'position',
    'padding-top', 'padding-bottom', 'padding-left', 'padding-right',
    'margin-top', 'margin-bottom', 'margin-left', 'margin-right'
  ],
  '@border': [
    'border-style', 'border-width', 'border-color', 'border-radius',
    'border-top-style', 'border-right-style', 'border-bottom-style', 'border-left-style',
    'border-top-width', 'border-right-width', 'border-bottom-width', 'border-left-width',
    'border-top-color', 'border-right-color', 'border-bottom-color', 'border-left-color',
    'border-top-left-radius', 'border-top-right-radius', 'border-bottom-left-radius', 'border-bottom-right-radius'
  ],
  '@flexbox': [
    'display', 'flex', 'flex-direction', 'justify-content', 'align-items', 'flex-wrap'
  ],
  '@font': [
    'font-size', 'font-weight', 'font-style', 'font-family'
  ],
  '@colors': [
    'color', 'background-color', 'opacity'
  ],
  text: [
    '@box-model', '@border', '@flexbox', '@font', '@colors',
    'text-align', 'text-decoration', 'text-overflow'
  ]
};

/**
 * Flatten a multiple dimension array.
 */
function flatten (array) {
  return array.reduce(function (dist, item) {
    return dist.concat(Array.isArray(item) ? flatten(item) : item)
  }, [])
}

/**
 * Check if the value is in the list.
 * @param {String} type
 * @param {String} value
 * @param {Object} dict
 */
function checkSupported (type, value, dict) {
  if ( dict === void 0 ) dict = {};

  if (type && value && dict[type]) {
    return flatten(dict[type].map(function (k) { return dict[k] || k; })).indexOf(value) !== -1
  }
  return true
}

/**
 * Check if the style is supported for the component.
 * @param {String} type
 * @param {String} style
 */
function isSupportedStyle (type, style) {
  return checkSupported(type, style, supportedStyles)
}

/**
 * Check if the property is supported for the component.
 * @param {String} type
 * @param {String} property
 */

var onfail = function nope () {};
var showConsole = true;

function warn () {
  var args = [], len = arguments.length;
  while ( len-- ) args[ len ] = arguments[ len ];

  var message = args.join(' ');
  showConsole && console.log(message);
  onfail(message);
  return message
}

/**
 * Configure the validator.
 * @param {Object} configs
 */


/**
 * Validate the styles of the component.
 * @param {String} type
 * @param {Object} styles
 */
function validateStyles (type, styles) {
  if ( styles === void 0 ) styles = {};

  var isValid = true;
  for (var key in styles) {
    if (!isSupportedStyle(type, hyphenate(key))) {
      isValid = false;
      warn(("[Style Validator] <" + type + "> is not support to use the \"" + key + "\" style."));
    }
    else {
      var validator = styleValidator[camelize(key)] || common;
      if (!validator(styles[key], hyphenate(key))) {
        isValid = false;
        warn(("[Style Validator] The style \"" + key + "\" is not support the \"" + (styles[key]) + "\" value."));
      }
    }
  }
  return isValid
}

/**
 * Validate the properties of the component.
 * @param {String} type
 * @param {Object} props
 */

var _switch = {
  props: {
    checked: {
      type: [Boolean, String],
      default: false
    },
    disabled: {
      type: [Boolean, String],
      default: false
    }
  },
  data: function data () {
    return {
      isChecked: (this.checked !== 'false' && this.checked !== false),
      isDisabled: (this.disabled !== 'false' && this.disabled !== false)
    }
  },
  computed: {
    wrapperClass: function wrapperClass () {
      var classArray = ['weex-switch'];
      this.isChecked && classArray.push('weex-switch-checked');
      this.isDisabled && classArray.push('weex-switch-disabled');
      return classArray.join(' ')
    }
  },
  methods: {
    toggle: function toggle () {
      // TODO: handle the events
      if (!this.isDisabled) {
        this.isChecked = !this.isChecked;
        this.$emit('change', { value: this.isChecked });
      }
    }
  },

  render: function render (createElement) {
    /* istanbul ignore next */
    {
      validateStyles('switch', this.$vnode.data && this.$vnode.data.staticStyle);
    }

    return createElement('span', {
      attrs: { 'weex-type': 'switch' },
      staticClass: this.wrapperClass,
      on: { click: this.toggle }
    }, [createElement('small', { staticClass: 'weex-switch-inner' })])
  }
};

var image = {
  props: {
    src: String,
    resize: {
      validator: function validator (value) {
        /* istanbul ignore next */
        return ['cover', 'contain', 'stretch'].indexOf(value) !== -1
      }
    }
  },

  render: function render (createElement) {
    /* istanbul ignore next */
    {
      validateStyles('image', this.$vnode.data && this.$vnode.data.staticStyle);
    }

    /* istanbul ignore next */
    if (!this.src && "development" === 'development') {
      console.warn("[Vue Renderer] The <image> component must have the \"src\" attribute.");
    }

    var cssText = "background-image:url(\"" + (this.src) + "\");";

    // compatibility: http://caniuse.com/#search=background-size
    cssText += (this.resize && this.resize !== 'stretch')
      ? ("background-size: " + (this.resize) + ";")
      : "background-size: 100% 100%;";

    return createElement('figure', {
      attrs: { 'weex-type': 'image' },
      staticClass: 'weex-image',
      style: cssText
    })
  }
};

var indicator = {
  name: 'loading-indicator',
  render: function render (createElement) {
    return createElement('mark', {
      attrs: { 'weex-type': 'loading-indicator' },
      staticClass: 'weex-loading-indicator'
    })
  }
};

var refresh = {
  name: 'refresh',
  data: function data () {
    return {
      height: 0
    }
  },
  methods: {
    show: function show () {
      this.$emit('refresh', 'abc');
      // console.log('will emit refresh')
      this.height = '120px';
      this.visibility = 'visible';
    },
    reset: function reset () {
      this.height = 0;
      this.visibility = 'hidden';
      this.$emit('refreshfinish');
    }
  },
  render: function render (createElement) {
    return createElement('aside', {
      attrs: { 'weex-type': 'refresh' },
      style: { height: this.height, visibility: this.visibility },
      staticClass: 'weex-refresh'
    }, [createElement(indicator)])
  }
};

var loading = {
  name: 'loading',
  data: function data () {
    return {
      height: 0
    }
  },
  methods: {
    show: function show () {
      this.$emit('loading');
      console.log('will emit loading');
      this.height = '120px';
      this.visibility = 'visible';
      console.log(this, this.height);
    },
    reset: function reset () {
      this.height = 0;
      this.visibility = 'hidden';
      this.$emit('loadingfinish');
    }
  },
  render: function render (createElement) {
    return createElement('aside', {
      ref: 'indicator',
      attrs: { 'weex-type': 'loading' },
      style: { height: this.height, visibility: this.visibility },
      staticClass: 'weex-loading'
    }, [createElement(indicator)])
  }
};

function computeWrapperSize$1 (context) {
  var wrapper = context.$refs.wrapper;
  if (wrapper) {
    var rect = wrapper.getBoundingClientRect();
    context.wrapperWidth = rect.width;
    context.wrapperHeight = rect.height;
  }
}

function reachTop (context) {
  var wrapper = context.$refs.wrapper;
  return (!!wrapper) && (wrapper.scrollTop <= 0)
}

function reachBottom (context) {
  var wrapper = context.$refs.wrapper;
  var inner = context.$refs.inner;
  var offset = Number(context.loadmoreoffset) || 0;

  if (wrapper && inner) {
    var innerHeight = inner.getBoundingClientRect().height;
    var wrapperHeight = wrapper.getBoundingClientRect().height;
    return wrapper.scrollTop >= innerHeight - wrapperHeight - offset
  }
  return false
}


var rectMethods = Object.freeze({
	computeWrapperSize: computeWrapperSize$1,
	reachTop: reachTop,
	reachBottom: reachBottom
});

/**
 * Create Event.
 * @param {DOMString} type
 * @param {Object} props
 */
function createEvent (context, type, props) {
  var event = new Event(type, { bubbles: false });
  event.preventDefault();
  event.stopPropagation();

  extend(event, props);

  Object.defineProperty(event, 'target', {
    enumerable: true,
    value: context || null
  });

  return event
}

/**
 * Create Custom Event.
 * @param {DOMString} type
 * @param {Object} props
 */
function createCustomEvent (context, type, props) {
  // compatibility: http://caniuse.com/#search=customevent
  // const event = new CustomEvent(type)
  var event = document.createEvent('CustomEvent');
  event.initCustomEvent(type, false, true, {});
  event.preventDefault();
  event.stopPropagation();

  extend(event, props);

  Object.defineProperty(event, 'target', {
    enumerable: true,
    value: context || null
  });

  return event
}

/**
 * Check and emit longpress event.
 * @param {Object} event
 */
function handleLongPress (context, event) {
  // TODO: check the condition
  context.$emit('longpress', context.createCustomEvent('longpress'));
}

/**
 * Check and emit appear event.
 * @param {Object} event
 */
function handleAppear (context, event) {
  // TODO: check the condition
  context.$emit('appear', context.createCustomEvent('appear'));
}

/**
 * Check and emit disappear event.
 * @param {Object} event
 */
function handDisappear (context, event) {
  // TODO: check the condition
  context.$emit('disappear', context.createCustomEvent('disappear'));
}


var eventMethods = Object.freeze({
	createEvent: createEvent,
	createCustomEvent: createCustomEvent,
	handleLongPress: handleLongPress,
	handleAppear: handleAppear,
	handDisappear: handDisappear
});

var listMixin = {
  methods: {
    moveTo: function moveTo (offsetY, done) {
      if ( offsetY === void 0 ) offsetY = 0;

      var inner = this.$refs.inner;
      if (inner) {
        inner.style.willChange = "transform";
        inner.style.transition = "transform .2s ease-in-out";
        inner.style.transform = "translate3d(0, " + offsetY + ", 0)";
        setTimeout(function () {
          inner.style.transition = '';
          inner.style.willChange = '';
          done && done();
        }, 200);
      }
    },

    done: function done () {
      this.moveTo(0);
      this._refresh && this._refresh.reset();
      this._loading && this._loading.reset();
    },

    showRefresh: function showRefresh () {
      // console.log('show refresh')
      this.moveTo('120px');
      if (this._refresh && this._refresh.child) {
        // console.log(this._refresh)
        this._refresh.child.show();
        // this._refresh.child.$emit('refresh', this.createCustomEvent('refresh'))
      }
    },

    showLoading: function showLoading () {
      // console.log('show loading')
      this.moveTo('-120px');
      if (this._loading && this._loading.child) {
        // this._loading.height = '120px'
        this._loading.child.show();
        // this.$emit('loading', this.createCustomEvent('loading'))
      }
    },

    handleTouchStart: function handleTouchStart (event) {
      // TODO: only the list is at top & bottom will trigger the touch event
      event.preventDefault();
      event.stopPropagation();
      // console.log('touch start', event)
      // console.log('reachTop:', this.reachTop())
      // console.log('reachBottom:', this.reachBottom())
      var touch = event.changedTouches[0];
      // console.log('touch start', event.target, event.target.pageY)
      // console.log('touches', touch)
      this._touchParams = {
        reachTop: this.reachTop(),
        reachBottom: this.reachBottom(),
        startTouchEvent: touch,
        startX: touch.pageX,
        startY: touch.pageY,
        timeStamp: event.timeStamp
      };
    },

    handleTouchMove: function handleTouchMove (event) {
      event.preventDefault();
      event.stopPropagation();
      // console.log('touch move')
      if (this._touchParams) {
        var inner = this.$refs.inner;
        var ref = this._touchParams;
        var startY = ref.startY;
        var reachTop = ref.reachTop;
        var reachBottom = ref.reachBottom;
        if (inner && (reachTop || reachBottom)) {
          var touch = event.changedTouches[0];
          var offsetY = touch.pageY - startY;
          // console.log('offsetY', offsetY, 'startY', startY, 'pageY', touch.pageY)
          this._touchParams.offsetY = offsetY;
          if (offsetY) {
            inner.style.transform = "translate3d(0, " + offsetY + "px, 0)";
          }
        }
      }
    },

    handleTouchEnd: function handleTouchEnd (event) {
      event.preventDefault();
      event.stopPropagation();
      // console.log('touch end')
      if (this._touchParams) {
        var inner = this.$refs.inner;
        var ref = this._touchParams;
        var offsetY = ref.offsetY;
        var reachTop = ref.reachTop;
        var reachBottom = ref.reachBottom;
        // console.log('offsetY:', offsetY)
        if (inner && (reachTop || reachBottom)) {
          // this.moveTo(0)
          if (offsetY > 120) {
            this.showRefresh();
          }
          else if (offsetY < -120) {
            this.showLoading();
          }
          else {
            this.moveTo(0);
          }
        }
      }
      delete this._touchParams;
    }
  }
};

var index = {
  mixins: [createMixin(rectMethods, eventMethods), listMixin],
  props: {
    loadmoreoffset: {
      type: [String, Number],
      default: 0
    }
  },

  methods: {
    updateLayout: function updateLayout () {
      var this$1 = this;

      this.computeWrapperSize();
      if (this._cells && this._cells.length) {
        this._cells.forEach(function (vnode) {
          vnode._visible = this$1.isCellVisible(vnode.elm);
        });
      }
    },
    isCellVisible: function isCellVisible (elem) {
      if (!this.wrapperHeight) {
        this.computeWrapperSize();
      }
      var wrapper = this.$refs.wrapper;
      return wrapper.scrollTop <= elem.offsetTop
        && elem.offsetTop < wrapper.scrollTop + this.wrapperHeight
    },

    handleScroll: function handleScroll (event) {
      var this$1 = this;

      this._cells.forEach(function (vnode, index) {
        var visible = this$1.isCellVisible(vnode.elm);
        if (visible !== vnode._visible) {
          var type = visible ? 'appear' : 'disappear';
          vnode._visible = visible;

          // TODO: dispatch CustomEvent
          vnode.elm.dispatchEvent(new Event(type), {});
        }
      });
      if (this.reachBottom()) {
        this.$emit('loadmore', this.createCustomEvent('loadmore'));
      }
    },

    createChildren: function createChildren (createElement) {
      var this$1 = this;

      var slots = this.$slots.default || [];
      this._cells = slots.filter(function (vnode) {
        // console.log(vnode.tag)
        if (!vnode.tag || !vnode.componentOptions) { return false }
        var tagName = vnode.componentOptions.tag;
        if (tagName === 'loading') {
          this$1._loading = createElement(loading, {
            on: {
              loading: function () { return this$1.$emit('loading', this$1.createCustomEvent('loading')); }
            }
          });
          return false
        }
        if (tagName === 'refresh') {
          this$1._refresh = createElement(refresh, {
            on: {
              refresh: function () { return this$1.$emit('refresh', this$1.createCustomEvent('refresh')); }
            }
          });
          return false
        }
        return true
      });
      return [
        this._refresh,
        createElement('div', {
          ref: 'inner',
          staticClass: 'weex-list-inner'
        }, this._cells),
        this._loading
      ]
    }
  },

  render: function render (createElement) {
    var this$1 = this;

    /* istanbul ignore next */
    {
      validateStyles('list', this.$vnode.data && this.$vnode.data.staticStyle);
    }

    this.$nextTick(function () {
      this$1.updateLayout();
    });

    return createElement('main', {
      ref: 'wrapper',
      attrs: { 'weex-type': 'list' },
      staticClass: 'weex-list weex-list-wrapper',
      on: {
        scroll: debounce(bind(this.handleScroll, this), 30),
        touchstart: this.handleTouchStart,
        touchmove: throttle(bind(this.handleTouchMove, this), 25),
        touchend: this.handleTouchEnd
      }
    }, this.createChildren(createElement))
  }
};

var cell = {
  render: function render (createElement) {
    /* istanbul ignore next */
    {
      validateStyles('cell', this.$vnode.data && this.$vnode.data.staticStyle);
    }

    return createElement('section', {
      attrs: { 'weex-type': 'cell' },
      staticClass: 'weex-cell'
    }, this.$slots.default)
  }
};

var scroller = {
  mixins: [createMixin(rectMethods)],
  props: {
    scrollDirection: {
      type: [String],
      default: 'vertical',
      validator: function validator (value) {
        return ['horizontal', 'vertical'].indexOf(value) !== -1
      }
    },
    loadmoreoffset: {
      type: [String, Number],
      default: 0
    }
  },

  computed: {
    wrapperClass: function wrapperClass () {
      var classArray = ['weex-scroller', 'weex-scroller-wrapper'];
      if (this.scrollDirection === 'horizontal') {
        classArray.push('weex-scroller-horizontal');
      }
      return classArray.join(' ')
    }
  },

  methods: {
    updateLayout: function updateLayout () {
      var this$1 = this;

      this.computeWrapperSize();
      if (this._cells && this._cells.length) {
        this._cells.forEach(function (vnode) {
          vnode._visible = this$1.isCellVisible(vnode.elm);
        });
      }
    },
    isCellVisible: function isCellVisible (elem) {
      if (!this.wrapperHeight) {
        this.computeWrapperSize();
      }
      var wrapper = this.$refs.wrapper;
      return wrapper.scrollTop <= elem.offsetTop
        && elem.offsetTop < wrapper.scrollTop + this.wrapperHeight
    },
    handleScroll: function handleScroll (event) {
      var this$1 = this;

      this._cells.forEach(function (vnode, index) {
        var visible = this$1.isCellVisible(vnode.elm);
        if (visible !== vnode._visible) {
          var type = visible ? 'appear' : 'disappear';
          vnode._visible = visible;

          // TODO: dispatch CustomEvent
          vnode.elm.dispatchEvent(new Event(type), {});
        }
      });
      if (this.reachBottom()) {
        this.$emit('loadmore', event);
      }
    }
  },

  render: function render (createElement) {
    var this$1 = this;

    /* istanbul ignore next */
    {
      validateStyles('scroller', this.$vnode.data && this.$vnode.data.staticStyle);
    }

    this._cells = this.$slots.default || [];
    this.$nextTick(function () {
      this$1.updateLayout();
    });

    return createElement('main', {
      ref: 'wrapper',
      attrs: { 'weex-type': 'scroller' },
      staticClass: this.wrapperClass,
      on: {
        scroll: debounce(bind(this.handleScroll, this), 100)
      }
    }, [
      createElement('mark', { ref: 'topMark', staticClass: 'weex-scroller-top-mark' }),
      createElement('div', {
        ref: 'inner',
        staticClass: 'weex-scroller-inner'
      }, this._cells),
      createElement('mark', { ref: 'bottomMark', staticClass: 'weex-scroller-bottom-mark' })
    ])
  }
};

var indicator$1 = {
  name: 'indicator',
  props: {
    count: [Number, String],
    active: [Number, String]
  },
  render: function render (createElement) {
    var this$1 = this;

    var children = [];
    for (var i = 0; i < Number(this.count); ++i) {
      var classNames = ['weex-indicator-item'];
      if (i === Number(this$1.active)) {
        classNames.push('weex-indicator-item-active');
      }
      children.push(createElement('menuitem', {
        staticClass: classNames.join(' ')
      }));
    }
    return createElement('menu', {
      attrs: { 'weex-type': 'indicator' },
      staticClass: 'weex-indicator'
    }, children)
  }
};

var slideMixin = {
  methods: {
    slideTo: function slideTo (index) {
      // let newIndex = (index | 0) // % this.frameCount
      var newIndex = (index | 0) % this.frameCount; // scroll to left
      newIndex = Math.max(newIndex, 0);
      newIndex = Math.min(newIndex, this.frameCount - 1);

      var offset = -newIndex * this.wrapperWidth;
      var inner = this.$refs.inner;

      if (inner) {
        // TODO: will-change | set styles together
        inner.style.transition = "transform .2s ease-in-out";
        inner.style.transform = "translate3d(" + offset + "px, 0, 0)";
        setTimeout(function () {
          inner.style.transition = '';
        }, 200);
      }
      if (newIndex !== this.currentIndex) {
        this.currentIndex = newIndex;
        this.$emit('change', this.createEvent('change', {
          index: this.currentIndex
        }));
      }
    },

    next: function next () {
      this.slideTo(this.currentIndex + 1);
    },

    prev: function prev () {
      this.slideTo(this.currentIndex - 1);
    },

    handleTouchStart: function handleTouchStart (event) {
      event.preventDefault();
      event.stopPropagation();
      // console.log('touch start', event)
      var touch = event.changedTouches[0];
      // console.log('touch start', event.target, event.target.pageY)
      // console.log('touches', touch)
      this._touchParams = {
        originalTransform: this.$refs.inner.style.transform,
        startTouchEvent: touch,
        startX: touch.pageX,
        startY: touch.pageY,
        timeStamp: event.timeStamp
      };
    },

    handleTouchMove: function handleTouchMove (event) {
      event.preventDefault();
      event.stopPropagation();
      // console.log('touch move')
      if (this._touchParams) {
        var inner = this.$refs.inner;
        var ref = this._touchParams;
        var startX = ref.startX;
        var touch = event.changedTouches[0];
        var offsetX = touch.pageX - startX;
        // console.log('offsetX', offsetX, 'startX', startX, 'pageX', touch.pageX)
        this._touchParams.offsetX = offsetX;

        if (inner && offsetX) {
          // console.log('transform', `${offsetX - this.currentIndex * this.wrapperWidth}`)
          inner.style.transform = "translate3d(" + (offsetX - this.currentIndex * this.wrapperWidth) + "px, 0, 0)";
        }
      }
    },

    handleTouchEnd: function handleTouchEnd (event) {
      event.preventDefault();
      event.stopPropagation();
      // console.log('touch end')
      var inner = this.$refs.inner;
      if (this._touchParams) {
        var ref = this._touchParams;
        var offsetX = ref.offsetX;
        // console.log('touch pageX:', touch.pageX, ', offsetX:', offsetX)
        if (inner) {
          var reset = Math.abs(offsetX / this.wrapperWidth) < 0.2;
          var direction = offsetX > 0 ? 1 : -1;
          var newIndex = reset ? this.currentIndex : (this.currentIndex - direction);

          // console.log('reset:', reset, ', newIndex:', newIndex)
          this.slideTo(newIndex);
        }
      }
      delete this._touchParams;
    }
  }
};

var index$1 = {
  mixins: [createMixin(eventMethods), slideMixin],
  // components: { indicator },
  props: {
    'auto-play': {
      type: [String, Boolean],
      default: false
    },
    interval: {
      type: [String, Number],
      default: 3000
    }
  },

  data: function data () {
    return {
      currentIndex: 0,
      frameCount: 0
    }
  },

  methods: {
    computeWrapperSize: function computeWrapperSize () {
      var wrapper = this.$refs.wrapper;
      if (wrapper) {
        var rect = wrapper.getBoundingClientRect();
        this.wrapperWidth = rect.width;
        this.wrapperHeight = rect.height;
      }
    },

    updateLayout: function updateLayout () {
      this.computeWrapperSize();
      var inner = this.$refs.inner;
      if (inner) {
        inner.style.width = this.wrapperWidth * this.frameCount + 'px';
      }
    },

    formatChildren: function formatChildren (createElement) {
      var this$1 = this;

      var children = this.$slots.default || [];
      return children.filter(function (vnode) {
        // console.log(vnode)
        if (!vnode.tag) { return false }
        if (vnode.componentOptions && vnode.componentOptions.tag === 'indicator') {
          // console.log(vnode)
          // console.trace()
          this$1._indicator = createElement(indicator$1, {
            staticClass: vnode.data.staticClass,
            staticStyle: vnode.data.staticStyle,
            attrs: {
              count: this$1.frameCount,
              active: this$1.currentIndex
            }
          });
          return false
        }
        return true
      }).map(function (vnode) {
        return createElement('li', {
          staticClass: 'weex-slider-cell'
        }, [vnode])
      })
    }
  },

  created: function created () {
    var this$1 = this;

    this._indicator = null;
    this.$nextTick(function () {
      this$1.updateLayout();
    });
  },

  mounted: function mounted () {
    if (this.autoPlay) {
      var interval = Number(this.interval);
      this._lastSlideTime = Date.now();

      var autoPlayFn = bind(function () {
        clearTimeout(this._autoPlayTimer);
        var now = Date.now();
        var nextTick = interval - now + this._lastSlideTime;
        nextTick = nextTick > 100 ? nextTick : interval;

        this.next();
        this._lastSlideTime = now;
        this._autoPlayTimer = setTimeout(autoPlayFn, nextTick);
      }, this);

      this._autoPlayTimer = setTimeout(autoPlayFn, interval);
    }
  },

  render: function render (createElement) {
    /* istanbul ignore next */
    {
      validateStyles('slider', this.$vnode.data && this.$vnode.data.staticStyle);
    }

    var innerElements = this.formatChildren(createElement);
    this.frameCount = innerElements.length;

    return createElement(
      'nav',
      {
        ref: 'wrapper',
        attrs: { 'weex-type': 'slider' },
        staticClass: 'weex-slider weex-slider-wrapper',
        on: {
          touchstart: this.handleTouchStart,
          touchmove: throttle(bind(this.handleTouchMove, this), 25),
          touchend: this.handleTouchEnd
        }
      },
      [
        createElement('ul', {
          ref: 'inner',
          staticClass: 'weex-slider-inner'
        }, innerElements),
        this._indicator
      ]
    )
  }
};

var warning = {
  render: function render () {
    // TODO: add tag nesting validation
    {
      var tag = this.$options._componentTag;
      var parentTag = this.$parent.$options._componentTag;
      console.warn(("[Vue Renderer] The <" + tag + "> can't be the child of <" + parentTag + ">."));
    }
    return null
  }
};

/**
 * Get text styles
 */
function getTextStyle (props) {
  if ( props === void 0 ) props = {};

  var lines = parseInt(props.lines) || 0;
  if (lines > 0) {
    return {
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      webkitLineClamp: lines
    }
  }
}

var text = {
  props: {
    lines: [Number, String],
    value: [String]
  },

  render: function render (createElement) {
    /* istanbul ignore next */
    {
      validateStyles('text', this.$vnode.data && this.$vnode.data.staticStyle);
    }

    return createElement('p', {
      attrs: { 'weex-type': 'text' },
      staticClass: 'weex-text',
      staticStyle: getTextStyle(this)
    }, this.$slots.default || [this.value])
  }
};

var web = {
  props: {
    src: String
  },
  render: function render (createElement) {
    /* istanbul ignore next */
    {
      validateStyles('web', this.$vnode.data && this.$vnode.data.staticStyle);
    }

    return createElement('iframe', {
      attrs: {
        'weex-type': 'web',
        src: this.src
      },
      staticClass: 'weex-web'
    })
  }
};



var components = Object.freeze({
	switch: _switch,
	image: image,
	list: index,
	cell: cell,
	scroller: scroller,
	slider: index$1,
	indicator: warning,
	refresh: warning,
	loading: warning,
	text: text,
	web: web
});

__$styleInject("* {\n  color: initial;\n  cursor: initial;\n  direction: initial;\n  font: initial;\n  font-family: initial;\n  font-size: initial;\n  font-style: initial;\n  font-variant: initial;\n  font-weight: initial;\n  line-height: initial;\n  text-align: initial;\n  text-indent: initial;\n  visibility: initial;\n  white-space: initial;\n  word-spacing: initial;\n}\n\n*,\n*::before,\n*::after {\n  box-sizing: border-box;\n  -webkit-text-size-adjust: none;\n      -ms-text-size-adjust: none;\n          text-size-adjust: none;\n}\n\nhtml, body {\n  -ms-overflow-style: scrollbar;\n  -webkit-tap-highlight-color: transparent;\n  padding: 0;\n  margin: 0;\n  width: 100%;\n  height: 100%;\n}\n\na,\nbutton,\n[role=\"button\"],\ninput,\nlabel,\nselect,\ntextarea {\n  -ms-touch-action: manipulation;\n      touch-action: manipulation;\n}\n\np, ol, ul, dl {\n  margin: 0;\n  padding: 0;\n}\n\nli {\n  list-style: none;\n}\n\nfigure {\n  margin: 0;\n}\n\ntextarea {\n  resize: none;\n}\n",undefined);

__$styleInject("a, .weex-a {\n  display: block;\n  text-decoration: none;\n}\n\ndiv, .weex-div, .weex-container {\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n  -webkit-flex-direction: column;\n      -ms-flex-direction: column;\n          flex-direction: column;\n  -webkit-flex-shrink: 0;\n      -ms-flex-negative: 0;\n          flex-shrink: 0;\n  -webkit-box-align: stretch;\n  -webkit-align-items: stretch;\n      -ms-flex-align: stretch;\n          align-items: stretch;\n  box-align: stretch;\n  -webkit-align-content: flex-start;\n      -ms-flex-line-pack: start;\n          align-content: flex-start;\n}\n\nfigure, img, .weex-image, .weex-img {\n  display: block;\n  background-repeat: no-repeat;\n}\n\n.weex-list,\n.weex-list-wrapper {\n  position: relative;\n  background-color: #888888;\n  overflow: scroll;\n}\n\n.weex-list-inner {\n  background-color: #FFFFFF;\n}\n\n.weex-list-top-mark {\n  width: 100%;\n  height: 0;\n  visibility: hidden;\n}\n\n.weex-list-bottom-mark {\n  width: 100%;\n  height: 0;\n  visibility: hidden;\n}\n\n.weex-refresh,\n.weex-loading {\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: center;\n  -webkit-align-items: center;\n      -ms-flex-align: center;\n          align-items: center;\n  -webkit-box-pack: center;\n  -webkit-justify-content: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  width: 100%;\n  height: 0;\n  overflow: hidden;\n  position: absolute;\n  visibility: hidden;\n  z-index: 100;\n}\n\n.weex-refresh {\n  top: 0;\n}\n\n.weex-loading {\n  bottom: 0;\n  bottom: -212px;\n}\n\n.weex-scroller-wrapper {\n  overflow: scroll;\n}\n.weex-scroller-wrapper.weex-scroller-horizontal {\n  overflow: hidden;\n}\n\n.weex-scroller-horizontal .weex-scroller-inner {\n  width: auto;\n  display: block;\n  height: 100%;\n}\n.weex-scroller-horizontal .weex-scroller-inner > * {\n  display: block;\n  float: left;\n}\n\n.weex-scroller-top-mark {\n  width: 100%;\n  height: 0;\n  visibility: hidden;\n}\n\n.weex-scroller-bottom-mark {\n  width: 100%;\n  height: 0;\n  visibility: hidden;\n}\n\n.weex-slider-wrapper {\n  overflow: hidden;\n  position: relative;\n}\n\n.weex-slider-inner {\n  position: absolute;\n  height: 100%;\n  top: 0;\n  left: 0;\n}\n\n.weex-slider-cell {\n  display: block;\n  float: left;\n  margin: 0;\n  padding: 0;\n  height: 100%;\n  overflow: hidden;\n}\n\n.weex-indicator {\n  position: absolute;\n  right: 30px;\n  bottom: 10px;\n  margin: 0;\n  padding: 10px 20px;\n}\n\n.weex-indicator-item {\n  display: inline-block;\n  border-radius: 50%;\n  width: 20px;\n  height: 20px;\n  background-color: #BBBBBB;\n}\n.weex-indicator-item + .weex-indicator-item {\n  margin-left: 10px;\n}\n\n.weex-indicator-item-active {\n  background-color: blue;\n}\n\n.weex-refresh-indicator,\n.weex-loading-indicator {\n  width: 1.013333rem;\n  /* 76px */\n  height: 1.013333rem;\n  -webkit-box-align: center;\n  -webkit-align-items: center;\n      -ms-flex-align: center;\n          align-items: center;\n  -webkit-box-pack: center;\n  -webkit-justify-content: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  overflow: visible;\n  background: none;\n}\n.weex-refresh-indicator:before,\n.weex-loading-indicator:before {\n  display: block;\n  content: '';\n  font-size: 0.16rem;\n  /* 12px */\n  width: 1em;\n  height: 1em;\n  border-radius: 50%;\n  position: relative;\n  text-indent: -9999em;\n  -webkit-animation: weex-spinner 1.1s infinite ease;\n          animation: weex-spinner 1.1s infinite ease;\n  -webkit-transform: translateZ(0);\n          transform: translateZ(0);\n}\n\n@-webkit-keyframes weex-spinner {\n  0%,\n  100% {\n    box-shadow: 0em -2.6em 0em 0em #ffffff, 1.8em -1.8em 0 0em rgba(255, 255, 255, 0.2), 2.5em 0em 0 0em rgba(255, 255, 255, 0.2), 1.75em 1.75em 0 0em rgba(255, 255, 255, 0.2), 0em 2.5em 0 0em rgba(255, 255, 255, 0.2), -1.8em 1.8em 0 0em rgba(255, 255, 255, 0.2), -2.6em 0em 0 0em rgba(255, 255, 255, 0.5), -1.8em -1.8em 0 0em rgba(255, 255, 255, 0.7);\n  }\n  12.5% {\n    box-shadow: 0em -2.6em 0em 0em rgba(255, 255, 255, 0.7), 1.8em -1.8em 0 0em #ffffff, 2.5em 0em 0 0em rgba(255, 255, 255, 0.2), 1.75em 1.75em 0 0em rgba(255, 255, 255, 0.2), 0em 2.5em 0 0em rgba(255, 255, 255, 0.2), -1.8em 1.8em 0 0em rgba(255, 255, 255, 0.2), -2.6em 0em 0 0em rgba(255, 255, 255, 0.2), -1.8em -1.8em 0 0em rgba(255, 255, 255, 0.5);\n  }\n  25% {\n    box-shadow: 0em -2.6em 0em 0em rgba(255, 255, 255, 0.5), 1.8em -1.8em 0 0em rgba(255, 255, 255, 0.7), 2.5em 0em 0 0em #ffffff, 1.75em 1.75em 0 0em rgba(255, 255, 255, 0.2), 0em 2.5em 0 0em rgba(255, 255, 255, 0.2), -1.8em 1.8em 0 0em rgba(255, 255, 255, 0.2), -2.6em 0em 0 0em rgba(255, 255, 255, 0.2), -1.8em -1.8em 0 0em rgba(255, 255, 255, 0.2);\n  }\n  37.5% {\n    box-shadow: 0em -2.6em 0em 0em rgba(255, 255, 255, 0.2), 1.8em -1.8em 0 0em rgba(255, 255, 255, 0.5), 2.5em 0em 0 0em rgba(255, 255, 255, 0.7), 1.75em 1.75em 0 0em #ffffff, 0em 2.5em 0 0em rgba(255, 255, 255, 0.2), -1.8em 1.8em 0 0em rgba(255, 255, 255, 0.2), -2.6em 0em 0 0em rgba(255, 255, 255, 0.2), -1.8em -1.8em 0 0em rgba(255, 255, 255, 0.2);\n  }\n  50% {\n    box-shadow: 0em -2.6em 0em 0em rgba(255, 255, 255, 0.2), 1.8em -1.8em 0 0em rgba(255, 255, 255, 0.2), 2.5em 0em 0 0em rgba(255, 255, 255, 0.5), 1.75em 1.75em 0 0em rgba(255, 255, 255, 0.7), 0em 2.5em 0 0em #ffffff, -1.8em 1.8em 0 0em rgba(255, 255, 255, 0.2), -2.6em 0em 0 0em rgba(255, 255, 255, 0.2), -1.8em -1.8em 0 0em rgba(255, 255, 255, 0.2);\n  }\n  62.5% {\n    box-shadow: 0em -2.6em 0em 0em rgba(255, 255, 255, 0.2), 1.8em -1.8em 0 0em rgba(255, 255, 255, 0.2), 2.5em 0em 0 0em rgba(255, 255, 255, 0.2), 1.75em 1.75em 0 0em rgba(255, 255, 255, 0.5), 0em 2.5em 0 0em rgba(255, 255, 255, 0.7), -1.8em 1.8em 0 0em #ffffff, -2.6em 0em 0 0em rgba(255, 255, 255, 0.2), -1.8em -1.8em 0 0em rgba(255, 255, 255, 0.2);\n  }\n  75% {\n    box-shadow: 0em -2.6em 0em 0em rgba(255, 255, 255, 0.2), 1.8em -1.8em 0 0em rgba(255, 255, 255, 0.2), 2.5em 0em 0 0em rgba(255, 255, 255, 0.2), 1.75em 1.75em 0 0em rgba(255, 255, 255, 0.2), 0em 2.5em 0 0em rgba(255, 255, 255, 0.5), -1.8em 1.8em 0 0em rgba(255, 255, 255, 0.7), -2.6em 0em 0 0em #ffffff, -1.8em -1.8em 0 0em rgba(255, 255, 255, 0.2);\n  }\n  87.5% {\n    box-shadow: 0em -2.6em 0em 0em rgba(255, 255, 255, 0.2), 1.8em -1.8em 0 0em rgba(255, 255, 255, 0.2), 2.5em 0em 0 0em rgba(255, 255, 255, 0.2), 1.75em 1.75em 0 0em rgba(255, 255, 255, 0.2), 0em 2.5em 0 0em rgba(255, 255, 255, 0.2), -1.8em 1.8em 0 0em rgba(255, 255, 255, 0.5), -2.6em 0em 0 0em rgba(255, 255, 255, 0.7), -1.8em -1.8em 0 0em #ffffff;\n  }\n}\n@keyframes weex-spinner {\n  0%,\n  100% {\n    box-shadow: 0em -2.6em 0em 0em #ffffff, 1.8em -1.8em 0 0em rgba(255, 255, 255, 0.2), 2.5em 0em 0 0em rgba(255, 255, 255, 0.2), 1.75em 1.75em 0 0em rgba(255, 255, 255, 0.2), 0em 2.5em 0 0em rgba(255, 255, 255, 0.2), -1.8em 1.8em 0 0em rgba(255, 255, 255, 0.2), -2.6em 0em 0 0em rgba(255, 255, 255, 0.5), -1.8em -1.8em 0 0em rgba(255, 255, 255, 0.7);\n  }\n  12.5% {\n    box-shadow: 0em -2.6em 0em 0em rgba(255, 255, 255, 0.7), 1.8em -1.8em 0 0em #ffffff, 2.5em 0em 0 0em rgba(255, 255, 255, 0.2), 1.75em 1.75em 0 0em rgba(255, 255, 255, 0.2), 0em 2.5em 0 0em rgba(255, 255, 255, 0.2), -1.8em 1.8em 0 0em rgba(255, 255, 255, 0.2), -2.6em 0em 0 0em rgba(255, 255, 255, 0.2), -1.8em -1.8em 0 0em rgba(255, 255, 255, 0.5);\n  }\n  25% {\n    box-shadow: 0em -2.6em 0em 0em rgba(255, 255, 255, 0.5), 1.8em -1.8em 0 0em rgba(255, 255, 255, 0.7), 2.5em 0em 0 0em #ffffff, 1.75em 1.75em 0 0em rgba(255, 255, 255, 0.2), 0em 2.5em 0 0em rgba(255, 255, 255, 0.2), -1.8em 1.8em 0 0em rgba(255, 255, 255, 0.2), -2.6em 0em 0 0em rgba(255, 255, 255, 0.2), -1.8em -1.8em 0 0em rgba(255, 255, 255, 0.2);\n  }\n  37.5% {\n    box-shadow: 0em -2.6em 0em 0em rgba(255, 255, 255, 0.2), 1.8em -1.8em 0 0em rgba(255, 255, 255, 0.5), 2.5em 0em 0 0em rgba(255, 255, 255, 0.7), 1.75em 1.75em 0 0em #ffffff, 0em 2.5em 0 0em rgba(255, 255, 255, 0.2), -1.8em 1.8em 0 0em rgba(255, 255, 255, 0.2), -2.6em 0em 0 0em rgba(255, 255, 255, 0.2), -1.8em -1.8em 0 0em rgba(255, 255, 255, 0.2);\n  }\n  50% {\n    box-shadow: 0em -2.6em 0em 0em rgba(255, 255, 255, 0.2), 1.8em -1.8em 0 0em rgba(255, 255, 255, 0.2), 2.5em 0em 0 0em rgba(255, 255, 255, 0.5), 1.75em 1.75em 0 0em rgba(255, 255, 255, 0.7), 0em 2.5em 0 0em #ffffff, -1.8em 1.8em 0 0em rgba(255, 255, 255, 0.2), -2.6em 0em 0 0em rgba(255, 255, 255, 0.2), -1.8em -1.8em 0 0em rgba(255, 255, 255, 0.2);\n  }\n  62.5% {\n    box-shadow: 0em -2.6em 0em 0em rgba(255, 255, 255, 0.2), 1.8em -1.8em 0 0em rgba(255, 255, 255, 0.2), 2.5em 0em 0 0em rgba(255, 255, 255, 0.2), 1.75em 1.75em 0 0em rgba(255, 255, 255, 0.5), 0em 2.5em 0 0em rgba(255, 255, 255, 0.7), -1.8em 1.8em 0 0em #ffffff, -2.6em 0em 0 0em rgba(255, 255, 255, 0.2), -1.8em -1.8em 0 0em rgba(255, 255, 255, 0.2);\n  }\n  75% {\n    box-shadow: 0em -2.6em 0em 0em rgba(255, 255, 255, 0.2), 1.8em -1.8em 0 0em rgba(255, 255, 255, 0.2), 2.5em 0em 0 0em rgba(255, 255, 255, 0.2), 1.75em 1.75em 0 0em rgba(255, 255, 255, 0.2), 0em 2.5em 0 0em rgba(255, 255, 255, 0.5), -1.8em 1.8em 0 0em rgba(255, 255, 255, 0.7), -2.6em 0em 0 0em #ffffff, -1.8em -1.8em 0 0em rgba(255, 255, 255, 0.2);\n  }\n  87.5% {\n    box-shadow: 0em -2.6em 0em 0em rgba(255, 255, 255, 0.2), 1.8em -1.8em 0 0em rgba(255, 255, 255, 0.2), 2.5em 0em 0 0em rgba(255, 255, 255, 0.2), 1.75em 1.75em 0 0em rgba(255, 255, 255, 0.2), 0em 2.5em 0 0em rgba(255, 255, 255, 0.2), -1.8em 1.8em 0 0em rgba(255, 255, 255, 0.5), -2.6em 0em 0 0em rgba(255, 255, 255, 0.7), -1.8em -1.8em 0 0em #ffffff;\n  }\n}\n.weex-switch {\n  border: 1px solid #dfdfdf;\n  cursor: pointer;\n  display: inline-block;\n  position: relative;\n  vertical-align: middle;\n  -webkit-user-select: none;\n     -moz-user-select: none;\n      -ms-user-select: none;\n          user-select: none;\n  box-sizing: content-box;\n  background-clip: content-box;\n  color: #64bd63;\n  width: 100px;\n  height: 60px;\n  background-color: white;\n  border-color: #dfdfdf;\n  box-shadow: #dfdfdf 0px 0px 0px 0px inset;\n  border-radius: 60px;\n  -webkit-transition: border 0.4s, box-shadow 0.4s, background-color 1.2s;\n          transition: border 0.4s, box-shadow 0.4s, background-color 1.2s;\n}\n\n.weex-switch-checked {\n  background-color: #64bd63;\n  border-color: #64bd63;\n  box-shadow: #64bd63 0px 0px 0px 40px inset;\n}\n\n.weex-switch-disabled {\n  background-color: #EEEEEE;\n}\n\n.weex-switch-inner {\n  width: 60px;\n  height: 60px;\n  background: #fff;\n  border-radius: 100%;\n  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.4);\n  position: absolute;\n  top: 0;\n  left: 0;\n  -webkit-transition: background-color 0.4s, left 0.2s;\n          transition: background-color 0.4s, left 0.2s;\n}\n\n.weex-switch-checked > .weex-switch-inner {\n  left: 40px;\n}\n\np, .weex-text {\n  white-space: pre-wrap;\n  font-size: 32px;\n  word-wrap: break-word;\n  display: -webkit-box;\n  -webkit-box-orient: vertical;\n  overflow: visible;\n}\n\ntextarea, .weex-textarea {\n  font-size: 32px;\n}\n\n.weex-web {\n  width: 100%;\n  height: 100%;\n  border: none;\n  box-sizing: border-box;\n}\n",undefined);

/* eslint-disable */

// Production steps of ECMA-262, Edition 6, 22.1.2.1
// Reference: https://people.mozilla.org/~jorendorff/es6-draft.html#sec-array.from

/* istanbul ignore if */
if (!Array.from) {
  Array.from = (function() {
    var toStr = Object.prototype.toString;
    var isCallable = function(fn) {
      return typeof fn === 'function' || toStr.call(fn) === '[object Function]';
    };
    var toInteger = function(value) {
      var number = Number(value);
      if (isNaN(number)) {
        return 0;
      }
      if (number === 0 || !isFinite(number)) {
        return number;
      }
      return (number > 0 ? 1 : -1) * Math.floor(Math.abs(number));
    };
    var maxSafeInteger = Math.pow(2, 53) - 1;
    var toLength = function(value) {
      var len = toInteger(value);
      return Math.min(Math.max(len, 0), maxSafeInteger);
    };

    // The length property of the from method is 1.
    return function from(arrayLike/*, mapFn, thisArg */) {
      // 1. Let C be the this value.
      var C = this;

      // 2. Let items be ToObject(arrayLike).
      var items = Object(arrayLike);

      // 3. ReturnIfAbrupt(items).
      if (arrayLike == null) {
        throw new TypeError('Array.from requires an array-like object - not null or undefined');
      }

      // 4. If mapfn is undefined, then let mapping be false.
      var mapFn = arguments.length > 1 ? arguments[1] : void undefined;
      var T;
      if (typeof mapFn !== 'undefined') {
        // 5. else
        // 5. a If IsCallable(mapfn) is false, throw a TypeError exception.
        if (!isCallable(mapFn)) {
          throw new TypeError('Array.from: when provided, the second argument must be a function');
        }

        // 5. b. If thisArg was supplied, let T be thisArg; else let T be undefined.
        if (arguments.length > 2) {
          T = arguments[2];
        }
      }

      // 10. Let lenValue be Get(items, "length").
      // 11. Let len be ToLength(lenValue).
      var len = toLength(items.length);

      // 13. If IsConstructor(C) is true, then
      // 13. a. Let A be the result of calling the [[Construct]] internal method of C with an argument list containing the single item len.
      // 14. a. Else, Let A be ArrayCreate(len).
      var A = isCallable(C) ? Object(new C(len)) : new Array(len);

      // 16. Let k be 0.
      var k = 0;
      // 17. Repeat, while k < len… (also steps a - h)
      var kValue;
      while (k < len) {
        kValue = items[k];
        if (mapFn) {
          A[k] = typeof T === 'undefined' ? mapFn(kValue, k) : mapFn.call(T, kValue, k);
        } else {
          A[k] = kValue;
        }
        k += 1;
      }
      // 18. Let putStatus be Put(A, "length", len, true).
      A.length = len;
      // 20. Return A.
      return A;
    };
  }());
}

var _global = createCommonjsModule(function (module) {
// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
if(typeof __g == 'number'){ __g = global; } // eslint-disable-line no-undef
});

var _core = createCommonjsModule(function (module) {
var core = module.exports = {version: '2.4.0'};
if(typeof __e == 'number'){ __e = core; } // eslint-disable-line no-undef
});

var _isObject = function(it){
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};

var isObject = _isObject;
var _anObject = function(it){
  if(!isObject(it)){ throw TypeError(it + ' is not an object!'); }
  return it;
};

var _fails = function(exec){
  try {
    return !!exec();
  } catch(e){
    return true;
  }
};

// Thank's IE8 for his funny defineProperty
var _descriptors = !_fails(function(){
  return Object.defineProperty({}, 'a', {get: function(){ return 7; }}).a != 7;
});

var isObject$1 = _isObject;
var document$1 = _global.document;
var is = isObject$1(document$1) && isObject$1(document$1.createElement);
var _domCreate = function(it){
  return is ? document$1.createElement(it) : {};
};

var _ie8DomDefine = !_descriptors && !_fails(function(){
  return Object.defineProperty(_domCreate('div'), 'a', {get: function(){ return 7; }}).a != 7;
});

// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject$2 = _isObject;
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
var _toPrimitive = function(it, S){
  if(!isObject$2(it)){ return it; }
  var fn, val;
  if(S && typeof (fn = it.toString) == 'function' && !isObject$2(val = fn.call(it))){ return val; }
  if(typeof (fn = it.valueOf) == 'function' && !isObject$2(val = fn.call(it))){ return val; }
  if(!S && typeof (fn = it.toString) == 'function' && !isObject$2(val = fn.call(it))){ return val; }
  throw TypeError("Can't convert object to primitive value");
};

var anObject       = _anObject;
var IE8_DOM_DEFINE = _ie8DomDefine;
var toPrimitive    = _toPrimitive;
var dP$1             = Object.defineProperty;

var f = _descriptors ? Object.defineProperty : function defineProperty(O, P, Attributes){
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if(IE8_DOM_DEFINE){ try {
    return dP$1(O, P, Attributes);
  } catch(e){ /* empty */ } }
  if('get' in Attributes || 'set' in Attributes){ throw TypeError('Accessors not supported!'); }
  if('value' in Attributes){ O[P] = Attributes.value; }
  return O;
};

var _objectDp = {
	f: f
};

var _propertyDesc = function(bitmap, value){
  return {
    enumerable  : !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable    : !(bitmap & 4),
    value       : value
  };
};

var dP         = _objectDp;
var createDesc = _propertyDesc;
var _hide = _descriptors ? function(object, key, value){
  return dP.f(object, key, createDesc(1, value));
} : function(object, key, value){
  object[key] = value;
  return object;
};

var hasOwnProperty = {}.hasOwnProperty;
var _has = function(it, key){
  return hasOwnProperty.call(it, key);
};

var id = 0;
var px = Math.random();
var _uid = function(key){
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};

var _redefine = createCommonjsModule(function (module) {
var global    = _global
  , hide      = _hide
  , has       = _has
  , SRC       = _uid('src')
  , TO_STRING = 'toString'
  , $toString = Function[TO_STRING]
  , TPL       = ('' + $toString).split(TO_STRING);

_core.inspectSource = function(it){
  return $toString.call(it);
};

(module.exports = function(O, key, val, safe){
  var isFunction = typeof val == 'function';
  if(isFunction){ has(val, 'name') || hide(val, 'name', key); }
  if(O[key] === val){ return; }
  if(isFunction){ has(val, SRC) || hide(val, SRC, O[key] ? '' + O[key] : TPL.join(String(key))); }
  if(O === global){
    O[key] = val;
  } else {
    if(!safe){
      delete O[key];
      hide(O, key, val);
    } else {
      if(O[key]){ O[key] = val; }
      else { hide(O, key, val); }
    }
  }
// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
})(Function.prototype, TO_STRING, function toString(){
  return typeof this == 'function' && this[SRC] || $toString.call(this);
});
});

var _aFunction = function(it){
  if(typeof it != 'function'){ throw TypeError(it + ' is not a function!'); }
  return it;
};

// optional / simple context binding
var aFunction = _aFunction;
var _ctx = function(fn, that, length){
  aFunction(fn);
  if(that === undefined){ return fn; }
  switch(length){
    case 1: return function(a){
      return fn.call(that, a);
    };
    case 2: return function(a, b){
      return fn.call(that, a, b);
    };
    case 3: return function(a, b, c){
      return fn.call(that, a, b, c);
    };
  }
  return function(/* ...args */){
    return fn.apply(that, arguments);
  };
};

var global$1    = _global;
var core      = _core;
var hide      = _hide;
var redefine  = _redefine;
var ctx       = _ctx;
var PROTOTYPE = 'prototype';

var $export$1 = function(type, name, source){
  var IS_FORCED = type & $export$1.F
    , IS_GLOBAL = type & $export$1.G
    , IS_STATIC = type & $export$1.S
    , IS_PROTO  = type & $export$1.P
    , IS_BIND   = type & $export$1.B
    , target    = IS_GLOBAL ? global$1 : IS_STATIC ? global$1[name] || (global$1[name] = {}) : (global$1[name] || {})[PROTOTYPE]
    , exports   = IS_GLOBAL ? core : core[name] || (core[name] = {})
    , expProto  = exports[PROTOTYPE] || (exports[PROTOTYPE] = {})
    , key, own, out, exp;
  if(IS_GLOBAL){ source = name; }
  for(key in source){
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    // export native or passed
    out = (own ? target : source)[key];
    // bind timers to global for call from export context
    exp = IS_BIND && own ? ctx(out, global$1) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // extend global
    if(target){ redefine(target, key, out, type & $export$1.U); }
    // export
    if(exports[key] != out){ hide(exports, key, exp); }
    if(IS_PROTO && expProto[key] != out){ expProto[key] = out; }
  }
};
global$1.core = core;
// type bitmap
$export$1.F = 1;   // forced
$export$1.G = 2;   // global
$export$1.S = 4;   // static
$export$1.P = 8;   // proto
$export$1.B = 16;  // bind
$export$1.W = 32;  // wrap
$export$1.U = 64;  // safe
$export$1.R = 128; // real proto method for `library` 
var _export = $export$1;

var toString$2 = {}.toString;

var _cof = function(it){
  return toString$2.call(it).slice(8, -1);
};

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = _cof;
var _iobject = Object('z').propertyIsEnumerable(0) ? Object : function(it){
  return cof(it) == 'String' ? it.split('') : Object(it);
};

// 7.2.1 RequireObjectCoercible(argument)
var _defined = function(it){
  if(it == undefined){ throw TypeError("Can't call method on  " + it); }
  return it;
};

// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject$1 = _iobject;
var defined = _defined;
var _toIobject = function(it){
  return IObject$1(defined(it));
};

// 7.1.4 ToInteger
var ceil  = Math.ceil;
var floor = Math.floor;
var _toInteger = function(it){
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};

// 7.1.15 ToLength
var toInteger = _toInteger;
var min       = Math.min;
var _toLength = function(it){
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};

var toInteger$1 = _toInteger;
var max       = Math.max;
var min$1       = Math.min;
var _toIndex = function(index, length){
  index = toInteger$1(index);
  return index < 0 ? max(index + length, 0) : min$1(index, length);
};

// false -> Array#indexOf
// true  -> Array#includes
var toIObject$1 = _toIobject;
var toLength  = _toLength;
var toIndex   = _toIndex;
var _arrayIncludes = function(IS_INCLUDES){
  return function($this, el, fromIndex){
    var O      = toIObject$1($this)
      , length = toLength(O.length)
      , index  = toIndex(fromIndex, length)
      , value;
    // Array#includes uses SameValueZero equality algorithm
    if(IS_INCLUDES && el != el){ while(length > index){
      value = O[index++];
      if(value != value){ return true; }
    // Array#toIndex ignores holes, Array#includes - not
    } } else { for(;length > index; index++){ if(IS_INCLUDES || index in O){
      if(O[index] === el){ return IS_INCLUDES || index || 0; }
    } } } return !IS_INCLUDES && -1;
  };
};

var global$2 = _global;
var SHARED = '__core-js_shared__';
var store  = global$2[SHARED] || (global$2[SHARED] = {});
var _shared = function(key){
  return store[key] || (store[key] = {});
};

var shared = _shared('keys');
var uid    = _uid;
var _sharedKey = function(key){
  return shared[key] || (shared[key] = uid(key));
};

var has          = _has;
var toIObject    = _toIobject;
var arrayIndexOf = _arrayIncludes(false);
var IE_PROTO     = _sharedKey('IE_PROTO');

var _objectKeysInternal = function(object, names){
  var O      = toIObject(object)
    , i      = 0
    , result = []
    , key;
  for(key in O){ if(key != IE_PROTO){ has(O, key) && result.push(key); } }
  // Don't enum bug & hidden keys
  while(names.length > i){ if(has(O, key = names[i++])){
    ~arrayIndexOf(result, key) || result.push(key);
  } }
  return result;
};

// IE 8- don't enum bug keys
var _enumBugKeys = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');

// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys       = _objectKeysInternal;
var enumBugKeys = _enumBugKeys;

var _objectKeys = Object.keys || function keys(O){
  return $keys(O, enumBugKeys);
};

var f$1 = Object.getOwnPropertySymbols;

var _objectGops = {
	f: f$1
};

var f$2 = {}.propertyIsEnumerable;

var _objectPie = {
	f: f$2
};

// 7.1.13 ToObject(argument)
var defined$1 = _defined;
var _toObject = function(it){
  return Object(defined$1(it));
};

// 19.1.2.1 Object.assign(target, source, ...)
var getKeys  = _objectKeys;
var gOPS     = _objectGops;
var pIE      = _objectPie;
var toObject = _toObject;
var IObject  = _iobject;
var $assign  = Object.assign;

// should work with symbols and should have deterministic property order (V8 bug)
var _objectAssign = !$assign || _fails(function(){
  var A = {}
    , B = {}
    , S = Symbol()
    , K = 'abcdefghijklmnopqrst';
  A[S] = 7;
  K.split('').forEach(function(k){ B[k] = k; });
  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
}) ? function assign(target, source){
  var arguments$1 = arguments;
 // eslint-disable-line no-unused-vars
  var T     = toObject(target)
    , aLen  = arguments.length
    , index = 1
    , getSymbols = gOPS.f
    , isEnum     = pIE.f;
  while(aLen > index){
    var S      = IObject(arguments$1[index++])
      , keys   = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S)
      , length = keys.length
      , j      = 0
      , key;
    while(length > j){ if(isEnum.call(S, key = keys[j++])){ T[key] = S[key]; } }
  } return T;
} : $assign;

// 19.1.3.1 Object.assign(target, source)
var $export = _export;

$export($export.S + $export.F, 'Object', {assign: _objectAssign});

/* eslint-disable */

// https://gist.github.com/WebReflection/5593554

/* istanbul ignore if */
if (!Object.setPrototypeOf) {
  Object.setPrototypeOf = (function(Object, magic) {
    var set;
    function setPrototypeOf(O, proto) {
      set.call(O, proto);
      return O;
    }
    try {
      // this works already in Firefox and Safari
      set = Object.getOwnPropertyDescriptor(Object.prototype, magic).set;
      set.call({}, null);
    } catch (e) {
      if (
        // IE < 11 cannot be shimmed
        Object.prototype !== {}[magic] ||
        // neither can any browser that actually
        // implemented __proto__ correctly
        // (all but old V8 will return here)
        {__proto__: null}.__proto__ === void 0
        // this case means null objects cannot be passed
        // through setPrototypeOf in a reliable way
        // which means here a **Sham** is needed instead
      ) {
        return;
      }
      // nodejs 0.8 and 0.10 are (buggy and..) fine here
      // probably Chrome or some old Mobile stock browser
      set = function(proto) {
        this[magic] = proto;
      };
      // please note that this will **not** work
      // in those browsers that do not inherit
      // __proto__ by mistake from Object.prototype
      // in these cases we should probably throw an error
      // or at least be informed about the issue
      setPrototypeOf.polyfill = setPrototypeOf(
        setPrototypeOf({}, null),
        Object.prototype
      ) instanceof Object;
      // setPrototypeOf.polyfill === true means it works as meant
      // setPrototypeOf.polyfill === false means it's not 100% reliable
      // setPrototypeOf.polyfill === undefined
      // or
      // setPrototypeOf.polyfill ==  null means it's not a polyfill
      // which means it works as expected
      // we can even delete Object.prototype.__proto__;
    }
    return setPrototypeOf;
  }(Object, '__proto__'));
}

var _wks = createCommonjsModule(function (module) {
var store      = _shared('wks')
  , uid        = _uid
  , Symbol     = _global.Symbol
  , USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function(name){
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};

$exports.store = store;
});

// getting tag from 19.1.3.6 Object.prototype.toString()
var cof$1 = _cof;
var TAG = _wks('toStringTag');
var ARG = cof$1(function(){ return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function(it, key){
  try {
    return it[key];
  } catch(e){ /* empty */ }
};

var _classof = function(it){
  var O, T, B;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
    // builtinTag case
    : ARG ? cof$1(O)
    // ES3 arguments fallback
    : (B = cof$1(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
};

// 19.1.3.6 Object.prototype.toString()
var classof = _classof;
var test    = {};
test[_wks('toStringTag')] = 'z';
if(test + '' != '[object z]'){
  _redefine(Object.prototype, 'toString', function toString(){
    return '[object ' + classof(this) + ']';
  }, true);
}

var toInteger$2 = _toInteger;
var defined$2   = _defined;
// true  -> String#at
// false -> String#codePointAt
var _stringAt = function(TO_STRING){
  return function(that, pos){
    var s = String(defined$2(that))
      , i = toInteger$2(pos)
      , l = s.length
      , a, b;
    if(i < 0 || i >= l){ return TO_STRING ? '' : undefined; }
    a = s.charCodeAt(i);
    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
      ? TO_STRING ? s.charAt(i) : a
      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
  };
};

var _library = false;

var _iterators = {};

var dP$2       = _objectDp;
var anObject$2 = _anObject;
var getKeys$1  = _objectKeys;

var _objectDps = _descriptors ? Object.defineProperties : function defineProperties(O, Properties){
  anObject$2(O);
  var keys   = getKeys$1(Properties)
    , length = keys.length
    , i = 0
    , P;
  while(length > i){ dP$2.f(O, P = keys[i++], Properties[P]); }
  return O;
};

var _html = _global.document && document.documentElement;

// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
var anObject$1    = _anObject;
var dPs         = _objectDps;
var enumBugKeys$1 = _enumBugKeys;
var IE_PROTO$1    = _sharedKey('IE_PROTO');
var Empty       = function(){ /* empty */ };
var PROTOTYPE$1   = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function(){
  // Thrash, waste and sodomy: IE GC bug
  var iframe = _domCreate('iframe')
    , i      = enumBugKeys$1.length
    , lt     = '<'
    , gt     = '>'
    , iframeDocument;
  iframe.style.display = 'none';
  _html.appendChild(iframe);
  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;
  while(i--){ delete createDict[PROTOTYPE$1][enumBugKeys$1[i]]; }
  return createDict();
};

var _objectCreate = Object.create || function create(O, Properties){
  var result;
  if(O !== null){
    Empty[PROTOTYPE$1] = anObject$1(O);
    result = new Empty;
    Empty[PROTOTYPE$1] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO$1] = O;
  } else { result = createDict(); }
  return Properties === undefined ? result : dPs(result, Properties);
};

var def = _objectDp.f;
var has$2 = _has;
var TAG$1 = _wks('toStringTag');

var _setToStringTag = function(it, tag, stat){
  if(it && !has$2(it = stat ? it : it.prototype, TAG$1)){ def(it, TAG$1, {configurable: true, value: tag}); }
};

var create$1         = _objectCreate;
var descriptor     = _propertyDesc;
var setToStringTag$1 = _setToStringTag;
var IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
_hide(IteratorPrototype, _wks('iterator'), function(){ return this; });

var _iterCreate = function(Constructor, NAME, next){
  Constructor.prototype = create$1(IteratorPrototype, {next: descriptor(1, next)});
  setToStringTag$1(Constructor, NAME + ' Iterator');
};

// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
var has$3         = _has;
var toObject$1    = _toObject;
var IE_PROTO$2    = _sharedKey('IE_PROTO');
var ObjectProto = Object.prototype;

var _objectGpo = Object.getPrototypeOf || function(O){
  O = toObject$1(O);
  if(has$3(O, IE_PROTO$2)){ return O[IE_PROTO$2]; }
  if(typeof O.constructor == 'function' && O instanceof O.constructor){
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectProto : null;
};

var LIBRARY        = _library;
var $export$2        = _export;
var redefine$1       = _redefine;
var hide$1           = _hide;
var has$1            = _has;
var Iterators      = _iterators;
var $iterCreate    = _iterCreate;
var setToStringTag = _setToStringTag;
var getPrototypeOf = _objectGpo;
var ITERATOR       = _wks('iterator');
var BUGGY          = !([].keys && 'next' in [].keys());
var FF_ITERATOR    = '@@iterator';
var KEYS           = 'keys';
var VALUES         = 'values';

var returnThis = function(){ return this; };

var _iterDefine = function(Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED){
  $iterCreate(Constructor, NAME, next);
  var getMethod = function(kind){
    if(!BUGGY && kind in proto){ return proto[kind]; }
    switch(kind){
      case KEYS: return function keys(){ return new Constructor(this, kind); };
      case VALUES: return function values(){ return new Constructor(this, kind); };
    } return function entries(){ return new Constructor(this, kind); };
  };
  var TAG        = NAME + ' Iterator'
    , DEF_VALUES = DEFAULT == VALUES
    , VALUES_BUG = false
    , proto      = Base.prototype
    , $native    = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT]
    , $default   = $native || getMethod(DEFAULT)
    , $entries   = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined
    , $anyNative = NAME == 'Array' ? proto.entries || $native : $native
    , methods, key, IteratorPrototype;
  // Fix native
  if($anyNative){
    IteratorPrototype = getPrototypeOf($anyNative.call(new Base));
    if(IteratorPrototype !== Object.prototype){
      // Set @@toStringTag to native iterators
      setToStringTag(IteratorPrototype, TAG, true);
      // fix for some old engines
      if(!LIBRARY && !has$1(IteratorPrototype, ITERATOR)){ hide$1(IteratorPrototype, ITERATOR, returnThis); }
    }
  }
  // fix Array#{values, @@iterator}.name in V8 / FF
  if(DEF_VALUES && $native && $native.name !== VALUES){
    VALUES_BUG = true;
    $default = function values(){ return $native.call(this); };
  }
  // Define iterator
  if((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])){
    hide$1(proto, ITERATOR, $default);
  }
  // Plug for library
  Iterators[NAME] = $default;
  Iterators[TAG]  = returnThis;
  if(DEFAULT){
    methods = {
      values:  DEF_VALUES ? $default : getMethod(VALUES),
      keys:    IS_SET     ? $default : getMethod(KEYS),
      entries: $entries
    };
    if(FORCED){ for(key in methods){
      if(!(key in proto)){ redefine$1(proto, key, methods[key]); }
    } } else { $export$2($export$2.P + $export$2.F * (BUGGY || VALUES_BUG), NAME, methods); }
  }
  return methods;
};

var $at  = _stringAt(true);

// 21.1.3.27 String.prototype[@@iterator]()
_iterDefine(String, 'String', function(iterated){
  this._t = String(iterated); // target
  this._i = 0;                // next index
// 21.1.5.2.1 %StringIteratorPrototype%.next()
}, function(){
  var O     = this._t
    , index = this._i
    , point;
  if(index >= O.length){ return {value: undefined, done: true}; }
  point = $at(O, index);
  this._i += point.length;
  return {value: point, done: false};
});

// 22.1.3.31 Array.prototype[@@unscopables]
var UNSCOPABLES = _wks('unscopables');
var ArrayProto  = Array.prototype;
if(ArrayProto[UNSCOPABLES] == undefined){ _hide(ArrayProto, UNSCOPABLES, {}); }
var _addToUnscopables = function(key){
  ArrayProto[UNSCOPABLES][key] = true;
};

var _iterStep = function(done, value){
  return {value: value, done: !!done};
};

var addToUnscopables = _addToUnscopables;
var step             = _iterStep;
var Iterators$2        = _iterators;
var toIObject$2        = _toIobject;

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
var es6_array_iterator = _iterDefine(Array, 'Array', function(iterated, kind){
  this._t = toIObject$2(iterated); // target
  this._i = 0;                   // next index
  this._k = kind;                // kind
// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
}, function(){
  var O     = this._t
    , kind  = this._k
    , index = this._i++;
  if(!O || index >= O.length){
    this._t = undefined;
    return step(1);
  }
  if(kind == 'keys'  ){ return step(0, index); }
  if(kind == 'values'){ return step(0, O[index]); }
  return step(0, [index, O[index]]);
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
Iterators$2.Arguments = Iterators$2.Array;

addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');

var $iterators    = es6_array_iterator;
var redefine$2      = _redefine;
var global$3        = _global;
var hide$2          = _hide;
var Iterators$1     = _iterators;
var wks           = _wks;
var ITERATOR$1      = wks('iterator');
var TO_STRING_TAG = wks('toStringTag');
var ArrayValues   = Iterators$1.Array;

for(var collections = ['NodeList', 'DOMTokenList', 'MediaList', 'StyleSheetList', 'CSSRuleList'], i = 0; i < 5; i++){
  var NAME       = collections[i]
    , Collection = global$3[NAME]
    , proto      = Collection && Collection.prototype
    , key;
  if(proto){
    if(!proto[ITERATOR$1]){ hide$2(proto, ITERATOR$1, ArrayValues); }
    if(!proto[TO_STRING_TAG]){ hide$2(proto, TO_STRING_TAG, NAME); }
    Iterators$1[NAME] = ArrayValues;
    for(key in $iterators){ if(!proto[key]){ redefine$2(proto, key, $iterators[key], true); } }
  }
}

var _anInstance = function(it, Constructor, name, forbiddenField){
  if(!(it instanceof Constructor) || (forbiddenField !== undefined && forbiddenField in it)){
    throw TypeError(name + ': incorrect invocation!');
  } return it;
};

// call something on iterator step with safe closing on error
var anObject$3 = _anObject;
var _iterCall = function(iterator, fn, value, entries){
  try {
    return entries ? fn(anObject$3(value)[0], value[1]) : fn(value);
  // 7.4.6 IteratorClose(iterator, completion)
  } catch(e){
    var ret = iterator['return'];
    if(ret !== undefined){ anObject$3(ret.call(iterator)); }
    throw e;
  }
};

// check on default Array iterator
var Iterators$3  = _iterators;
var ITERATOR$2   = _wks('iterator');
var ArrayProto$1 = Array.prototype;

var _isArrayIter = function(it){
  return it !== undefined && (Iterators$3.Array === it || ArrayProto$1[ITERATOR$2] === it);
};

var classof$2   = _classof;
var ITERATOR$3  = _wks('iterator');
var Iterators$4 = _iterators;
var core_getIteratorMethod = _core.getIteratorMethod = function(it){
  if(it != undefined){ return it[ITERATOR$3]
    || it['@@iterator']
    || Iterators$4[classof$2(it)]; }
};

var _forOf = createCommonjsModule(function (module) {
var ctx         = _ctx
  , call        = _iterCall
  , isArrayIter = _isArrayIter
  , anObject    = _anObject
  , toLength    = _toLength
  , getIterFn   = core_getIteratorMethod
  , BREAK       = {}
  , RETURN      = {};
var exports = module.exports = function(iterable, entries, fn, that, ITERATOR){
  var iterFn = ITERATOR ? function(){ return iterable; } : getIterFn(iterable)
    , f      = ctx(fn, that, entries ? 2 : 1)
    , index  = 0
    , length, step, iterator, result;
  if(typeof iterFn != 'function'){ throw TypeError(iterable + ' is not iterable!'); }
  // fast case for arrays with default iterator
  if(isArrayIter(iterFn)){ for(length = toLength(iterable.length); length > index; index++){
    result = entries ? f(anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
    if(result === BREAK || result === RETURN){ return result; }
  } } else { for(iterator = iterFn.call(iterable); !(step = iterator.next()).done; ){
    result = call(iterator, f, step.value, entries);
    if(result === BREAK || result === RETURN){ return result; }
  } }
};
exports.BREAK  = BREAK;
exports.RETURN = RETURN;
});

// 7.3.20 SpeciesConstructor(O, defaultConstructor)
var anObject$4  = _anObject;
var aFunction$2 = _aFunction;
var SPECIES   = _wks('species');
var _speciesConstructor = function(O, D){
  var C = anObject$4(O).constructor, S;
  return C === undefined || (S = anObject$4(C)[SPECIES]) == undefined ? D : aFunction$2(S);
};

// fast apply, http://jsperf.lnkit.com/fast-apply/5
var _invoke = function(fn, args, that){
  var un = that === undefined;
  switch(args.length){
    case 0: return un ? fn()
                      : fn.call(that);
    case 1: return un ? fn(args[0])
                      : fn.call(that, args[0]);
    case 2: return un ? fn(args[0], args[1])
                      : fn.call(that, args[0], args[1]);
    case 3: return un ? fn(args[0], args[1], args[2])
                      : fn.call(that, args[0], args[1], args[2]);
    case 4: return un ? fn(args[0], args[1], args[2], args[3])
                      : fn.call(that, args[0], args[1], args[2], args[3]);
  } return              fn.apply(that, args);
};

var ctx$2                = _ctx;
var invoke             = _invoke;
var html               = _html;
var cel                = _domCreate;
var global$5             = _global;
var process$2            = global$5.process;
var setTask            = global$5.setImmediate;
var clearTask          = global$5.clearImmediate;
var MessageChannel     = global$5.MessageChannel;
var counter            = 0;
var queue              = {};
var ONREADYSTATECHANGE = 'onreadystatechange';
var defer;
var channel;
var port;
var run = function(){
  var id = +this;
  if(queue.hasOwnProperty(id)){
    var fn = queue[id];
    delete queue[id];
    fn();
  }
};
var listener = function(event){
  run.call(event.data);
};
// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
if(!setTask || !clearTask){
  setTask = function setImmediate(fn){
    var arguments$1 = arguments;

    var args = [], i = 1;
    while(arguments.length > i){ args.push(arguments$1[i++]); }
    queue[++counter] = function(){
      invoke(typeof fn == 'function' ? fn : Function(fn), args);
    };
    defer(counter);
    return counter;
  };
  clearTask = function clearImmediate(id){
    delete queue[id];
  };
  // Node.js 0.8-
  if(_cof(process$2) == 'process'){
    defer = function(id){
      process$2.nextTick(ctx$2(run, id, 1));
    };
  // Browsers with MessageChannel, includes WebWorkers
  } else if(MessageChannel){
    channel = new MessageChannel;
    port    = channel.port2;
    channel.port1.onmessage = listener;
    defer = ctx$2(port.postMessage, port, 1);
  // Browsers with postMessage, skip WebWorkers
  // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
  } else if(global$5.addEventListener && typeof postMessage == 'function' && !global$5.importScripts){
    defer = function(id){
      global$5.postMessage(id + '', '*');
    };
    global$5.addEventListener('message', listener, false);
  // IE8-
  } else if(ONREADYSTATECHANGE in cel('script')){
    defer = function(id){
      html.appendChild(cel('script'))[ONREADYSTATECHANGE] = function(){
        html.removeChild(this);
        run.call(id);
      };
    };
  // Rest old browsers
  } else {
    defer = function(id){
      setTimeout(ctx$2(run, id, 1), 0);
    };
  }
}
var _task = {
  set:   setTask,
  clear: clearTask
};

var global$6    = _global;
var macrotask = _task.set;
var Observer  = global$6.MutationObserver || global$6.WebKitMutationObserver;
var process$3   = global$6.process;
var Promise$1   = global$6.Promise;
var isNode$1    = _cof(process$3) == 'process';

var _microtask = function(){
  var head, last, notify;

  var flush = function(){
    var parent, fn;
    if(isNode$1 && (parent = process$3.domain)){ parent.exit(); }
    while(head){
      fn   = head.fn;
      head = head.next;
      try {
        fn();
      } catch(e){
        if(head){ notify(); }
        else { last = undefined; }
        throw e;
      }
    } last = undefined;
    if(parent){ parent.enter(); }
  };

  // Node.js
  if(isNode$1){
    notify = function(){
      process$3.nextTick(flush);
    };
  // browsers with MutationObserver
  } else if(Observer){
    var toggle = true
      , node   = document.createTextNode('');
    new Observer(flush).observe(node, {characterData: true}); // eslint-disable-line no-new
    notify = function(){
      node.data = toggle = !toggle;
    };
  // environments with maybe non-completely correct, but existent Promise
  } else if(Promise$1 && Promise$1.resolve){
    var promise = Promise$1.resolve();
    notify = function(){
      promise.then(flush);
    };
  // for other environments - macrotask based on:
  // - setImmediate
  // - MessageChannel
  // - window.postMessag
  // - onreadystatechange
  // - setTimeout
  } else {
    notify = function(){
      // strange IE + webpack dev server bug - use .call(global)
      macrotask.call(global$6, flush);
    };
  }

  return function(fn){
    var task = {fn: fn, next: undefined};
    if(last){ last.next = task; }
    if(!head){
      head = task;
      notify();
    } last = task;
  };
};

var redefine$3 = _redefine;
var _redefineAll = function(target, src, safe){
  for(var key in src){ redefine$3(target, key, src[key], safe); }
  return target;
};

var global$7      = _global;
var dP$3          = _objectDp;
var DESCRIPTORS = _descriptors;
var SPECIES$1     = _wks('species');

var _setSpecies = function(KEY){
  var C = global$7[KEY];
  if(DESCRIPTORS && C && !C[SPECIES$1]){ dP$3.f(C, SPECIES$1, {
    configurable: true,
    get: function(){ return this; }
  }); }
};

var ITERATOR$4     = _wks('iterator');
var SAFE_CLOSING = false;

try {
  var riter = [7][ITERATOR$4]();
  riter['return'] = function(){ SAFE_CLOSING = true; };
  Array.from(riter, function(){ throw 2; });
} catch(e){ /* empty */ }

var _iterDetect = function(exec, skipClosing){
  if(!skipClosing && !SAFE_CLOSING){ return false; }
  var safe = false;
  try {
    var arr  = [7]
      , iter = arr[ITERATOR$4]();
    iter.next = function(){ return {done: safe = true}; };
    arr[ITERATOR$4] = function(){ return iter; };
    exec(arr);
  } catch(e){ /* empty */ }
  return safe;
};

var LIBRARY$1            = _library;
var global$4             = _global;
var ctx$1                = _ctx;
var classof$1            = _classof;
var $export$3            = _export;
var isObject$3           = _isObject;
var aFunction$1          = _aFunction;
var anInstance         = _anInstance;
var forOf              = _forOf;
var speciesConstructor = _speciesConstructor;
var task               = _task.set;
var microtask          = _microtask();
var PROMISE            = 'Promise';
var TypeError$1          = global$4.TypeError;
var process$1            = global$4.process;
var $Promise           = global$4[PROMISE];
var process$1            = global$4.process;
var isNode             = classof$1(process$1) == 'process';
var empty              = function(){ /* empty */ };
var Internal;
var GenericPromiseCapability;
var Wrapper;

var USE_NATIVE = !!function(){
  try {
    // correct subclassing with @@species support
    var promise     = $Promise.resolve(1)
      , FakePromise = (promise.constructor = {})[_wks('species')] = function(exec){ exec(empty, empty); };
    // unhandled rejections tracking support, NodeJS Promise without it fails @@species test
    return (isNode || typeof PromiseRejectionEvent == 'function') && promise.then(empty) instanceof FakePromise;
  } catch(e){ /* empty */ }
}();

// helpers
var sameConstructor = function(a, b){
  // with library wrapper special case
  return a === b || a === $Promise && b === Wrapper;
};
var isThenable = function(it){
  var then;
  return isObject$3(it) && typeof (then = it.then) == 'function' ? then : false;
};
var newPromiseCapability = function(C){
  return sameConstructor($Promise, C)
    ? new PromiseCapability(C)
    : new GenericPromiseCapability(C);
};
var PromiseCapability = GenericPromiseCapability = function(C){
  var resolve, reject;
  this.promise = new C(function($$resolve, $$reject){
    if(resolve !== undefined || reject !== undefined){ throw TypeError$1('Bad Promise constructor'); }
    resolve = $$resolve;
    reject  = $$reject;
  });
  this.resolve = aFunction$1(resolve);
  this.reject  = aFunction$1(reject);
};
var perform = function(exec){
  try {
    exec();
  } catch(e){
    return {error: e};
  }
};
var notify = function(promise, isReject){
  if(promise._n){ return; }
  promise._n = true;
  var chain = promise._c;
  microtask(function(){
    var value = promise._v
      , ok    = promise._s == 1
      , i     = 0;
    var run = function(reaction){
      var handler = ok ? reaction.ok : reaction.fail
        , resolve = reaction.resolve
        , reject  = reaction.reject
        , domain  = reaction.domain
        , result, then;
      try {
        if(handler){
          if(!ok){
            if(promise._h == 2){ onHandleUnhandled(promise); }
            promise._h = 1;
          }
          if(handler === true){ result = value; }
          else {
            if(domain){ domain.enter(); }
            result = handler(value);
            if(domain){ domain.exit(); }
          }
          if(result === reaction.promise){
            reject(TypeError$1('Promise-chain cycle'));
          } else if(then = isThenable(result)){
            then.call(result, resolve, reject);
          } else { resolve(result); }
        } else { reject(value); }
      } catch(e){
        reject(e);
      }
    };
    while(chain.length > i){ run(chain[i++]); } // variable length - can't use forEach
    promise._c = [];
    promise._n = false;
    if(isReject && !promise._h){ onUnhandled(promise); }
  });
};
var onUnhandled = function(promise){
  task.call(global$4, function(){
    var value = promise._v
      , abrupt, handler, console;
    if(isUnhandled(promise)){
      abrupt = perform(function(){
        if(isNode){
          process$1.emit('unhandledRejection', value, promise);
        } else if(handler = global$4.onunhandledrejection){
          handler({promise: promise, reason: value});
        } else if((console = global$4.console) && console.error){
          console.error('Unhandled promise rejection', value);
        }
      });
      // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
      promise._h = isNode || isUnhandled(promise) ? 2 : 1;
    } promise._a = undefined;
    if(abrupt){ throw abrupt.error; }
  });
};
var isUnhandled = function(promise){
  if(promise._h == 1){ return false; }
  var chain = promise._a || promise._c
    , i     = 0
    , reaction;
  while(chain.length > i){
    reaction = chain[i++];
    if(reaction.fail || !isUnhandled(reaction.promise)){ return false; }
  } return true;
};
var onHandleUnhandled = function(promise){
  task.call(global$4, function(){
    var handler;
    if(isNode){
      process$1.emit('rejectionHandled', promise);
    } else if(handler = global$4.onrejectionhandled){
      handler({promise: promise, reason: promise._v});
    }
  });
};
var $reject = function(value){
  var promise = this;
  if(promise._d){ return; }
  promise._d = true;
  promise = promise._w || promise; // unwrap
  promise._v = value;
  promise._s = 2;
  if(!promise._a){ promise._a = promise._c.slice(); }
  notify(promise, true);
};
var $resolve = function(value){
  var promise = this
    , then;
  if(promise._d){ return; }
  promise._d = true;
  promise = promise._w || promise; // unwrap
  try {
    if(promise === value){ throw TypeError$1("Promise can't be resolved itself"); }
    if(then = isThenable(value)){
      microtask(function(){
        var wrapper = {_w: promise, _d: false}; // wrap
        try {
          then.call(value, ctx$1($resolve, wrapper, 1), ctx$1($reject, wrapper, 1));
        } catch(e){
          $reject.call(wrapper, e);
        }
      });
    } else {
      promise._v = value;
      promise._s = 1;
      notify(promise, false);
    }
  } catch(e){
    $reject.call({_w: promise, _d: false}, e); // wrap
  }
};

// constructor polyfill
if(!USE_NATIVE){
  // 25.4.3.1 Promise(executor)
  $Promise = function Promise(executor){
    anInstance(this, $Promise, PROMISE, '_h');
    aFunction$1(executor);
    Internal.call(this);
    try {
      executor(ctx$1($resolve, this, 1), ctx$1($reject, this, 1));
    } catch(err){
      $reject.call(this, err);
    }
  };
  Internal = function Promise(executor){
    this._c = [];             // <- awaiting reactions
    this._a = undefined;      // <- checked in isUnhandled reactions
    this._s = 0;              // <- state
    this._d = false;          // <- done
    this._v = undefined;      // <- value
    this._h = 0;              // <- rejection state, 0 - default, 1 - handled, 2 - unhandled
    this._n = false;          // <- notify
  };
  Internal.prototype = _redefineAll($Promise.prototype, {
    // 25.4.5.3 Promise.prototype.then(onFulfilled, onRejected)
    then: function then(onFulfilled, onRejected){
      var reaction    = newPromiseCapability(speciesConstructor(this, $Promise));
      reaction.ok     = typeof onFulfilled == 'function' ? onFulfilled : true;
      reaction.fail   = typeof onRejected == 'function' && onRejected;
      reaction.domain = isNode ? process$1.domain : undefined;
      this._c.push(reaction);
      if(this._a){ this._a.push(reaction); }
      if(this._s){ notify(this, false); }
      return reaction.promise;
    },
    // 25.4.5.1 Promise.prototype.catch(onRejected)
    'catch': function(onRejected){
      return this.then(undefined, onRejected);
    }
  });
  PromiseCapability = function(){
    var promise  = new Internal;
    this.promise = promise;
    this.resolve = ctx$1($resolve, promise, 1);
    this.reject  = ctx$1($reject, promise, 1);
  };
}

$export$3($export$3.G + $export$3.W + $export$3.F * !USE_NATIVE, {Promise: $Promise});
_setToStringTag($Promise, PROMISE);
_setSpecies(PROMISE);
Wrapper = _core[PROMISE];

// statics
$export$3($export$3.S + $export$3.F * !USE_NATIVE, PROMISE, {
  // 25.4.4.5 Promise.reject(r)
  reject: function reject(r){
    var capability = newPromiseCapability(this)
      , $$reject   = capability.reject;
    $$reject(r);
    return capability.promise;
  }
});
$export$3($export$3.S + $export$3.F * (LIBRARY$1 || !USE_NATIVE), PROMISE, {
  // 25.4.4.6 Promise.resolve(x)
  resolve: function resolve(x){
    // instanceof instead of internal slot check because we should fix it without replacement native Promise core
    if(x instanceof $Promise && sameConstructor(x.constructor, this)){ return x; }
    var capability = newPromiseCapability(this)
      , $$resolve  = capability.resolve;
    $$resolve(x);
    return capability.promise;
  }
});
$export$3($export$3.S + $export$3.F * !(USE_NATIVE && _iterDetect(function(iter){
  $Promise.all(iter)['catch'](empty);
})), PROMISE, {
  // 25.4.4.1 Promise.all(iterable)
  all: function all(iterable){
    var C          = this
      , capability = newPromiseCapability(C)
      , resolve    = capability.resolve
      , reject     = capability.reject;
    var abrupt = perform(function(){
      var values    = []
        , index     = 0
        , remaining = 1;
      forOf(iterable, false, function(promise){
        var $index        = index++
          , alreadyCalled = false;
        values.push(undefined);
        remaining++;
        C.resolve(promise).then(function(value){
          if(alreadyCalled){ return; }
          alreadyCalled  = true;
          values[$index] = value;
          --remaining || resolve(values);
        }, reject);
      });
      --remaining || resolve(values);
    });
    if(abrupt){ reject(abrupt.error); }
    return capability.promise;
  },
  // 25.4.4.4 Promise.race(iterable)
  race: function race(iterable){
    var C          = this
      , capability = newPromiseCapability(C)
      , reject     = capability.reject;
    var abrupt = perform(function(){
      forOf(iterable, false, function(promise){
        C.resolve(promise).then(capability.resolve, reject);
      });
    });
    if(abrupt){ reject(abrupt.error); }
    return capability.promise;
  }
});

var DEFAULT_VIEWPORT_WIDTH = 750;

function setViewport (configs) {
  if ( configs === void 0 ) configs = {};

  var doc = window.document;

  if (doc) {
    var screenWidth = window.screen.width;
    var scale = screenWidth / DEFAULT_VIEWPORT_WIDTH;

    var contents = [
      ("width=" + DEFAULT_VIEWPORT_WIDTH),
      ("initial-scale=" + scale),
      ("maximum-scale=" + scale),
      ("minimum-scale=" + scale),
      "user-scalable=no"
    ];

    var meta = doc.querySelector('meta[name="viewport"]');
    if (!meta) {
      meta = doc.createElement('meta');
      meta.setAttribute('name', 'viewport');
      document.querySelector('head').appendChild(meta);
    }

    meta.setAttribute('content', contents.join(','));
  }
}

/**
 * @author sole / http://soledadpenades.com
 * @author mrdoob / http://mrdoob.com
 * @author Robert Eisele / http://www.xarg.org
 * @author Philippe / http://philippe.elsass.me
 * @author Robert Penner / http://www.robertpenner.com/easing_terms_of_use.html
 * @author Paul Lewis / http://www.aerotwist.com/
 * @author lechecacharro
 * @author Josh Faul / http://jocafa.com/
 * @author egraether / http://egraether.com/
 */

if ( Date.now === undefined ) {

  Date.now = function () {

    return new Date().valueOf();

  };

}

var TWEEN = TWEEN || ( function () {

  var _tweens = [];

  return {

    REVISION: '8',

    getAll: function () {

      return _tweens;

    },

    removeAll: function () {

      _tweens = [];

    },

    add: function ( tween ) {

      _tweens.push( tween );

    },

    remove: function ( tween ) {

      var i = _tweens.indexOf( tween );

      if ( i !== -1 ) {

        _tweens.splice( i, 1 );

      }

    },

    update: function ( time ) {

      if ( _tweens.length === 0 ) { return false; }

      var i = 0, numTweens = _tweens.length;

      time = time !== undefined ? time : Date.now();

      while ( i < numTweens ) {

        if ( _tweens[ i ].update( time ) ) {

          i ++;

        } else {

          _tweens.splice( i, 1 );

          numTweens --;

        }

      }

      return true;

    }

  };

} )();

TWEEN.Tween = function ( object ) {

  var _object = object;
  var _valuesStart = {};
  var _valuesEnd = {};
  var _duration = 1000;
  var _delayTime = 0;
  var _startTime = null;
  var _easingFunction = TWEEN.Easing.Linear.None;
  var _interpolationFunction = TWEEN.Interpolation.Linear;
  var _chainedTweens = [];
  var _onStartCallback = null;
  var _onStartCallbackFired = false;
  var _onUpdateCallback = null;
  var _onCompleteCallback = null;

  this.to = function ( properties, duration ) {

    if ( duration !== undefined ) {

      _duration = duration;

    }

    _valuesEnd = properties;

    return this;

  };

  this.start = function ( time ) {

    TWEEN.add( this );

    _onStartCallbackFired = false;

    _startTime = time !== undefined ? time : Date.now();
    _startTime += _delayTime;

    for ( var property in _valuesEnd ) {

      // This prevents the interpolation of null values or of non-existing properties
      if( _object[ property ] === null || !(property in _object) ) {

        continue;

      }

      // check if an Array was provided as property value
      if ( _valuesEnd[ property ] instanceof Array ) {

        if ( _valuesEnd[ property ].length === 0 ) {

          continue;

        }

        // create a local copy of the Array with the start value at the front
        _valuesEnd[ property ] = [ _object[ property ] ].concat( _valuesEnd[ property ] );

      }

      _valuesStart[ property ] = _object[ property ];

    }

    return this;

  };

  this.stop = function () {

    TWEEN.remove( this );
    return this;

  };

  this.delay = function ( amount ) {

    _delayTime = amount;
    return this;

  };

  this.easing = function ( easing ) {

    _easingFunction = easing;
    return this;

  };

  this.interpolation = function ( interpolation ) {

    _interpolationFunction = interpolation;
    return this;

  };

  this.chain = function () {

    _chainedTweens = arguments;
    return this;

  };

  this.onStart = function ( callback ) {

    _onStartCallback = callback;
    return this;

  };

  this.onUpdate = function ( callback ) {

    _onUpdateCallback = callback;
    return this;

  };

  this.onComplete = function ( callback ) {

    _onCompleteCallback = callback;
    return this;

  };

  this.update = function ( time ) {

    if ( time < _startTime ) {

      return true;

    }

    if ( _onStartCallbackFired === false ) {

      if ( _onStartCallback !== null ) {

        _onStartCallback.call( _object );

      }

      _onStartCallbackFired = true;

    }

    var elapsed = ( time - _startTime ) / _duration;
    elapsed = elapsed > 1 ? 1 : elapsed;

    var value = _easingFunction( elapsed );

    for ( var property in _valuesStart ) {

      var start = _valuesStart[ property ];
      var end = _valuesEnd[ property ];

      if ( end instanceof Array ) {

        _object[ property ] = _interpolationFunction( end, value );

      } else {

        _object[ property ] = start + ( end - start ) * value;

      }

    }

    if ( _onUpdateCallback !== null ) {

      _onUpdateCallback.call( _object, value );

    }

    if ( elapsed == 1 ) {

      if ( _onCompleteCallback !== null ) {

        _onCompleteCallback.call( _object );

      }

      for ( var i = 0, numChainedTweens = _chainedTweens.length; i < numChainedTweens; i ++ ) {

        _chainedTweens[ i ].start( time );

      }

      return false;

    }

    return true;

  };

};

TWEEN.Easing = {

  Linear: {

    None: function ( k ) {

      return k;

    }

  },

  Quadratic: {

    In: function ( k ) {

      return k * k;

    },

    Out: function ( k ) {

      return k * ( 2 - k );

    },

    InOut: function ( k ) {

      if ( ( k *= 2 ) < 1 ) { return 0.5 * k * k; }
      return - 0.5 * ( --k * ( k - 2 ) - 1 );

    }

  },

  Cubic: {

    In: function ( k ) {

      return k * k * k;

    },

    Out: function ( k ) {

      return --k * k * k + 1;

    },

    InOut: function ( k ) {

      if ( ( k *= 2 ) < 1 ) { return 0.5 * k * k * k; }
      return 0.5 * ( ( k -= 2 ) * k * k + 2 );

    }

  },

  Quartic: {

    In: function ( k ) {

      return k * k * k * k;

    },

    Out: function ( k ) {

      return 1 - ( --k * k * k * k );

    },

    InOut: function ( k ) {

      if ( ( k *= 2 ) < 1) { return 0.5 * k * k * k * k; }
      return - 0.5 * ( ( k -= 2 ) * k * k * k - 2 );

    }

  },

  Quintic: {

    In: function ( k ) {

      return k * k * k * k * k;

    },

    Out: function ( k ) {

      return --k * k * k * k * k + 1;

    },

    InOut: function ( k ) {

      if ( ( k *= 2 ) < 1 ) { return 0.5 * k * k * k * k * k; }
      return 0.5 * ( ( k -= 2 ) * k * k * k * k + 2 );

    }

  },

  Sinusoidal: {

    In: function ( k ) {

      return 1 - Math.cos( k * Math.PI / 2 );

    },

    Out: function ( k ) {

      return Math.sin( k * Math.PI / 2 );

    },

    InOut: function ( k ) {

      return 0.5 * ( 1 - Math.cos( Math.PI * k ) );

    }

  },

  Exponential: {

    In: function ( k ) {

      return k === 0 ? 0 : Math.pow( 1024, k - 1 );

    },

    Out: function ( k ) {

      return k === 1 ? 1 : 1 - Math.pow( 2, - 10 * k );

    },

    InOut: function ( k ) {

      if ( k === 0 ) { return 0; }
      if ( k === 1 ) { return 1; }
      if ( ( k *= 2 ) < 1 ) { return 0.5 * Math.pow( 1024, k - 1 ); }
      return 0.5 * ( - Math.pow( 2, - 10 * ( k - 1 ) ) + 2 );

    }

  },

  Circular: {

    In: function ( k ) {

      return 1 - Math.sqrt( 1 - k * k );

    },

    Out: function ( k ) {

      return Math.sqrt( 1 - ( --k * k ) );

    },

    InOut: function ( k ) {

      if ( ( k *= 2 ) < 1) { return - 0.5 * ( Math.sqrt( 1 - k * k) - 1); }
      return 0.5 * ( Math.sqrt( 1 - ( k -= 2) * k) + 1);

    }

  },

  Elastic: {

    In: function ( k ) {

      var s, a = 0.1, p = 0.4;
      if ( k === 0 ) { return 0; }
      if ( k === 1 ) { return 1; }
      if ( !a || a < 1 ) { a = 1; s = p / 4; }
      else { s = p * Math.asin( 1 / a ) / ( 2 * Math.PI ); }
      return - ( a * Math.pow( 2, 10 * ( k -= 1 ) ) * Math.sin( ( k - s ) * ( 2 * Math.PI ) / p ) );

    },

    Out: function ( k ) {

      var s, a = 0.1, p = 0.4;
      if ( k === 0 ) { return 0; }
      if ( k === 1 ) { return 1; }
      if ( !a || a < 1 ) { a = 1; s = p / 4; }
      else { s = p * Math.asin( 1 / a ) / ( 2 * Math.PI ); }
      return ( a * Math.pow( 2, - 10 * k) * Math.sin( ( k - s ) * ( 2 * Math.PI ) / p ) + 1 );

    },

    InOut: function ( k ) {

      var s, a = 0.1, p = 0.4;
      if ( k === 0 ) { return 0; }
      if ( k === 1 ) { return 1; }
      if ( !a || a < 1 ) { a = 1; s = p / 4; }
      else { s = p * Math.asin( 1 / a ) / ( 2 * Math.PI ); }
      if ( ( k *= 2 ) < 1 ) { return - 0.5 * ( a * Math.pow( 2, 10 * ( k -= 1 ) ) * Math.sin( ( k - s ) * ( 2 * Math.PI ) / p ) ); }
      return a * Math.pow( 2, -10 * ( k -= 1 ) ) * Math.sin( ( k - s ) * ( 2 * Math.PI ) / p ) * 0.5 + 1;

    }

  },

  Back: {

    In: function ( k ) {

      var s = 1.70158;
      return k * k * ( ( s + 1 ) * k - s );

    },

    Out: function ( k ) {

      var s = 1.70158;
      return --k * k * ( ( s + 1 ) * k + s ) + 1;

    },

    InOut: function ( k ) {

      var s = 1.70158 * 1.525;
      if ( ( k *= 2 ) < 1 ) { return 0.5 * ( k * k * ( ( s + 1 ) * k - s ) ); }
      return 0.5 * ( ( k -= 2 ) * k * ( ( s + 1 ) * k + s ) + 2 );

    }

  },

  Bounce: {

    In: function ( k ) {

      return 1 - TWEEN.Easing.Bounce.Out( 1 - k );

    },

    Out: function ( k ) {

      if ( k < ( 1 / 2.75 ) ) {

        return 7.5625 * k * k;

      } else if ( k < ( 2 / 2.75 ) ) {

        return 7.5625 * ( k -= ( 1.5 / 2.75 ) ) * k + 0.75;

      } else if ( k < ( 2.5 / 2.75 ) ) {

        return 7.5625 * ( k -= ( 2.25 / 2.75 ) ) * k + 0.9375;

      } else {

        return 7.5625 * ( k -= ( 2.625 / 2.75 ) ) * k + 0.984375;

      }

    },

    InOut: function ( k ) {

      if ( k < 0.5 ) { return TWEEN.Easing.Bounce.In( k * 2 ) * 0.5; }
      return TWEEN.Easing.Bounce.Out( k * 2 - 1 ) * 0.5 + 0.5;

    }

  }

};

TWEEN.Interpolation = {

  Linear: function ( v, k ) {

    var m = v.length - 1, f = m * k, i = Math.floor( f ), fn = TWEEN.Interpolation.Utils.Linear;

    if ( k < 0 ) { return fn( v[ 0 ], v[ 1 ], f ); }
    if ( k > 1 ) { return fn( v[ m ], v[ m - 1 ], m - f ); }

    return fn( v[ i ], v[ i + 1 > m ? m : i + 1 ], f - i );

  },

  Bezier: function ( v, k ) {

    var b = 0, n = v.length - 1, pw = Math.pow, bn = TWEEN.Interpolation.Utils.Bernstein, i;

    for ( i = 0; i <= n; i++ ) {
      b += pw( 1 - k, n - i ) * pw( k, i ) * v[ i ] * bn( n, i );
    }

    return b;

  },

  CatmullRom: function ( v, k ) {

    var m = v.length - 1, f = m * k, i = Math.floor( f ), fn = TWEEN.Interpolation.Utils.CatmullRom;

    if ( v[ 0 ] === v[ m ] ) {

      if ( k < 0 ) { i = Math.floor( f = m * ( 1 + k ) ); }

      return fn( v[ ( i - 1 + m ) % m ], v[ i ], v[ ( i + 1 ) % m ], v[ ( i + 2 ) % m ], f - i );

    } else {

      if ( k < 0 ) { return v[ 0 ] - ( fn( v[ 0 ], v[ 0 ], v[ 1 ], v[ 1 ], -f ) - v[ 0 ] ); }
      if ( k > 1 ) { return v[ m ] - ( fn( v[ m ], v[ m ], v[ m - 1 ], v[ m - 1 ], f - m ) - v[ m ] ); }

      return fn( v[ i ? i - 1 : 0 ], v[ i ], v[ m < i + 1 ? m : i + 1 ], v[ m < i + 2 ? m : i + 2 ], f - i );

    }

  },

  Utils: {

    Linear: function ( p0, p1, t ) {

      return ( p1 - p0 ) * t + p0;

    },

    Bernstein: function ( n , i ) {

      var fc = TWEEN.Interpolation.Utils.Factorial;
      return fc( n ) / fc( i ) / fc( n - i );

    },

    Factorial: ( function () {

      var a = [ 1 ];

      return function ( n ) {

        var s = 1, i;
        if ( a[ n ] ) { return a[ n ]; }
        for ( i = n; i > 1; i-- ) { s *= i; }
        return a[ n ] = s;

      };

    } )(),

    CatmullRom: function ( p0, p1, p2, p3, t ) {

      var v0 = ( p2 - p0 ) * 0.5, v1 = ( p3 - p1 ) * 0.5, t2 = t * t, t3 = t * t2;
      return ( 2 * p1 - 2 * p2 + v0 + v1 ) * t3 + ( - 3 * p1 + 3 * p2 - 2 * v0 - v1 ) * t2 + v0 * t + p1;

    }

  }

};

var tween = TWEEN;

var performanceNow = createCommonjsModule(function (module) {
// Generated by CoffeeScript 1.7.1
(function() {
  var getNanoSeconds, hrtime, loadTime;

  if ((typeof performance !== "undefined" && performance !== null) && performance.now) {
    module.exports = function() {
      return performance.now();
    };
  } else if ((typeof process !== "undefined" && process !== null) && process.hrtime) {
    module.exports = function() {
      return (getNanoSeconds() - loadTime) / 1e6;
    };
    hrtime = process.hrtime;
    getNanoSeconds = function() {
      var hr;
      hr = hrtime();
      return hr[0] * 1e9 + hr[1];
    };
    loadTime = getNanoSeconds();
  } else if (Date.now) {
    module.exports = function() {
      return Date.now() - loadTime;
    };
    loadTime = Date.now();
  } else {
    module.exports = function() {
      return new Date().getTime() - loadTime;
    };
    loadTime = new Date().getTime();
  }

}).call(commonjsGlobal);
});

var now = performanceNow;
var root = typeof window === 'undefined' ? commonjsGlobal : window;
var vendors = ['moz', 'webkit'];
var suffix = 'AnimationFrame';
var raf$1 = root['request' + suffix];
var caf = root['cancel' + suffix] || root['cancelRequest' + suffix];

for(var i$1 = 0; !raf$1 && i$1 < vendors.length; i$1++) {
  raf$1 = root[vendors[i$1] + 'Request' + suffix];
  caf = root[vendors[i$1] + 'Cancel' + suffix]
      || root[vendors[i$1] + 'CancelRequest' + suffix];
}

// Some versions of FF have rAF but not cAF
if(!raf$1 || !caf) {
  var last = 0
    , id$1 = 0
    , queue$1 = []
    , frameDuration = 1000 / 60;

  raf$1 = function(callback) {
    if(queue$1.length === 0) {
      var _now = now()
        , next = Math.max(0, frameDuration - (_now - last));
      last = next + _now;
      setTimeout(function() {
        var cp = queue$1.slice(0);
        // Clear queue here to prevent
        // callbacks from appending listeners
        // to the current frame's queue
        queue$1.length = 0;
        for(var i = 0; i < cp.length; i++) {
          if(!cp[i].cancelled) {
            try{
              cp[i].callback(last);
            } catch(e) {
              setTimeout(function() { throw e }, 0);
            }
          }
        }
      }, Math.round(next));
    }
    queue$1.push({
      handle: ++id$1,
      callback: callback,
      cancelled: false
    });
    return id$1
  };

  caf = function(handle) {
    for(var i = 0; i < queue$1.length; i++) {
      if(queue$1[i].handle === handle) {
        queue$1[i].cancelled = true;
      }
    }
  };
}

var index$3 = function(fn) {
  // Wrap in a new function to prevent
  // `cancel` potentially being assigned
  // to the native rAF function
  return raf$1.call(root, fn)
};
var cancel = function() {
  caf.apply(root, arguments);
};
var polyfill = function() {
  root.requestAnimationFrame = raf$1;
  root.cancelAnimationFrame = caf;
};

index$3.cancel = cancel;
index$3.polyfill = polyfill;

/**
 * Module dependencies.
 */

var Tween = tween;
var raf = index$3;

/**
 * Expose `scrollTo`.
 */

var index$2 = scrollTo;

/**
 * Scroll to `(x, y)`.
 *
 * @param {Number} x
 * @param {Number} y
 * @api public
 */

function scrollTo(x, y, options) {
  options = options || {};

  // start position
  var start = scroll();

  // setup tween
  var tween$$1 = Tween(start)
    .ease(options.ease || 'out-circ')
    .to({ top: y, left: x })
    .duration(options.duration || 1000);

  // scroll
  tween$$1.update(function(o){
    window.scrollTo(o.left | 0, o.top | 0);
  });

  // handle end
  tween$$1.on('end', function(){
    animate = function(){};
  });

  // animate
  function animate() {
    raf(animate);
    tween$$1.update();
  }

  animate();
  
  return tween$$1;
}

/**
 * Return scroll position.
 *
 * @return {Object}
 * @api private
 */

function scroll() {
  var y = window.pageYOffset || document.documentElement.scrollTop;
  var x = window.pageXOffset || document.documentElement.scrollLeft;
  return { top: y, left: x };
}

var camelToKebab$1;
var appendStyle$1;

var dom = {
  /**
   * scrollToElement
   * @param  {string} ref
   * @param  {obj} options {offset:Number}
   *   ps: scroll-to has 'ease' and 'duration'(ms) as options.
   */
  scrollToElement: function (ref, options) {
    !options && (options = {});
    var offset = (Number(options.offset) || 0) * this.scale;
    var elem = this.getComponentManager().getComponent(ref);
    if (!elem) {
      return console.error(("[h5-render] component of ref " + ref + " doesn't exist."))
    }
    var parentScroller = elem.getParentScroller();
    if (parentScroller) {
      parentScroller.scroller.scrollToElement(elem.node, true, offset);
    }
    else {
      var offsetTop = elem.node.getBoundingClientRect().top
          + document.body.scrollTop;
      var tween = index$2(0, offsetTop + offset, options);
      tween.on('end', function () {
        console.log('scroll end.');
      });
    }
  },

  /**
   * getComponentRect
   * @param {string} ref
   * @param {function} callbackId
   */
  getComponentRect: function (ref, callbackId) {
    var info = { result: false };

    if (ref && ref === 'viewport') {
      info.result = true;
      info.size = {
        width: document.documentElement.clientWidth,
        height: document.documentElement.clientHeight,
        top: 0,
        left: 0,
        right: document.documentElement.clientWidth,
        bottom: document.documentElement.clientHeight
      };
    }
    else {
      var elem = this.getComponentManager().getComponent(ref);
      if (elem && elem.node) {
        info.result = true;
        info.size = elem.node.getBoundingClientRect();
      }
    }

    var message = info.result ? info : {
      result: false,
      errMsg: 'Illegal parameter'
    };
    this.sender.performCallback(callbackId, message);
    return message
  },

  /**
   * for adding fontFace
   * @param {string} key fontFace
   * @param {object} styles rules
   */
  addRule: function (key, styles) {
    key = camelToKebab$1(key);
    var stylesText = '';
    for (var k in styles) {
      if (styles.hasOwnProperty(k)) {
        stylesText += camelToKebab$1(k) + ':' + styles[k] + ';';
      }
    }
    var styleText = "@" + key + "{" + stylesText + "}";
    appendStyle$1(styleText, 'dom-added-rules');
  }
};

var meta = {
  dom: [{
    name: 'scrollToElement',
    args: ['string', 'object']
  }, {
    name: 'getComponentRect',
    args: ['string', 'function']
  }, {
    name: 'addRule',
    args: ['string', 'object']
  }]
};

var dom$1 = {
  init: function (Weex) {
    camelToKebab$1 = Weex.utils.camelToKebab;
    appendStyle$1 = Weex.utils.appendStyle;
    Weex.registerApiModule('dom', dom, meta);
  }
};

var event = {
  /**
   * openUrl
   * @param  {string} url
   */
  openURL: function (url) {
    location.href = url;
  }

};

var meta$1 = {
  event: [{
    name: 'openURL',
    args: ['string']
  }]
};

var event$1 = {
  init: function (Weex) {
    Weex.registerApiModule('event', event, meta$1);
  }
};

var pageInfo = {

  setTitle: function (title) {
    title = title || 'Weex HTML5';
    try {
      title = decodeURIComponent(title);
    }
    catch (e) {}
    document.title = title;
  }
};

var meta$2 = {
  pageInfo: [{
    name: 'setTitle',
    args: ['string']
  }]
};

var pageInfo$1 = {
  init: function (Weex) {
    Weex.registerApiModule('pageInfo', pageInfo, meta$2);
  }
};

(typeof window === 'undefined') && (window = {ctrl: {}, lib: {}});!window.ctrl && (window.ctrl = {});!window.lib && (window.lib = {});!function(a,b){function c(a){var b={};Object.defineProperty(this,"params",{set:function(a){if("object"==typeof a){for(var c in b){ delete b[c]; }for(var c in a){ b[c]=a[c]; }}},get:function(){return b},enumerable:!0}),Object.defineProperty(this,"search",{set:function(a){if("string"==typeof a){0===a.indexOf("?")&&(a=a.substr(1));var c=a.split("&");for(var d in b){ delete b[d]; }for(var e=0;e<c.length;e++){var f=c[e].split("=");if(void 0!==f[1]&&(f[1]=f[1].toString()),f[0]){ try{b[decodeURIComponent(f[0])]=decodeURIComponent(f[1]);}catch(g){b[f[0]]=f[1];} }}}},get:function(){var a=[];for(var c in b){ if(void 0!==b[c]){ if(""!==b[c]){ try{a.push(encodeURIComponent(c)+"="+encodeURIComponent(b[c]));}catch(d){a.push(c+"="+b[c]);} }else { try{a.push(encodeURIComponent(c));}catch(d){a.push(c);} } } }return a.length?"?"+a.join("&"):""},enumerable:!0});var c;Object.defineProperty(this,"hash",{set:function(a){"string"==typeof a&&(a&&a.indexOf("#")<0&&(a="#"+a),c=a||"");},get:function(){return c},enumerable:!0}),this.set=function(a){a=a||"";var b;if(!(b=a.match(new RegExp("^([a-z0-9-]+:)?[/]{2}(?:([^@/:?]+)(?::([^@/:]+))?@)?([^:/?#]+)(?:[:]([0-9]+))?([/][^?#;]*)?(?:[?]([^#]*))?([#][^?]*)?$","i")))){ throw new Error("Wrong uri scheme."); }this.protocol=b[1]||("object"==typeof location?location.protocol:""),this.username=b[2]||"",this.password=b[3]||"",this.hostname=this.host=b[4],this.port=b[5]||"",this.pathname=b[6]||"/",this.search=b[7]||"",this.hash=b[8]||"",this.origin=this.protocol+"//"+this.hostname;},this.toString=function(){var a=this.protocol+"//";return this.username&&(a+=this.username,this.password&&(a+=":"+this.password),a+="@"),a+=this.host,this.port&&"80"!==this.port&&(a+=":"+this.port),this.pathname&&(a+=this.pathname),this.search&&(a+=this.search),this.hash&&(a+=this.hash),a},a&&this.set(a.toString());}b.httpurl=function(a){return new c(a)};}(window,window.lib||(window.lib={}));

/* global lib, XMLHttpRequest */
/* deps: httpurl */

var utils$1;

var jsonpCnt = 0;
var ERROR_STATE = -1;

var TYPE_JSON = 'application/json;charset=UTF-8';
var TYPE_FORM = 'application/x-www-form-urlencoded';

var REG_FORM = /^(?:[^&=]+=[^&=]+)(?:&[^&=]+=[^&=]+)*$/;

function _jsonp (config, callback, progressCallback) {
  var cbName = 'jsonp_' + (++jsonpCnt);
  var url;

  if (!config.url) {
    console.error('[h5-render] config.url should be set in _jsonp for \'fetch\' API.');
  }

  global[cbName] = (function (cb) {
    return function (response) {
      callback({
        status: 200,
        ok: true,
        statusText: 'OK',
        data: response
      });
      delete global[cb];
    }
  })(cbName);

  var script = document.createElement('script');
  try {
    url = lib.httpurl(config.url);
  }
  catch (err) {
    console.error('[h5-render] invalid config.url in _jsonp for \'fetch\' API: '
      + config.url);
  }
  url.params.callback = cbName;
  script.type = 'text/javascript';
  script.src = url.toString();
  // script.onerror is not working on IE or safari.
  // but they are not considered here.
  script.onerror = (function (cb) {
    return function (err) {
      console.error('[h5-render] unexpected error in _jsonp for \'fetch\' API', err);
      callback({
        status: ERROR_STATE,
        ok: false,
        statusText: '',
        data: ''
      });
      delete global[cb];
    }
  })(cbName);
  var head = document.getElementsByTagName('head')[0];
  head.insertBefore(script, null);
}

function _xhr (config, callback, progressCallback) {
  var xhr = new XMLHttpRequest();
  xhr.responseType = config.type;
  xhr.open(config.method, config.url, true);

  // cors cookie support
  if (config.withCredentials === true) {
    xhr.withCredentials = true;
  }

  var headers = config.headers || {};
  for (var k in headers) {
    xhr.setRequestHeader(k, headers[k]);
  }

  xhr.onload = function (res) {
    callback({
      status: xhr.status,
      ok: xhr.status >= 200 && xhr.status < 300,
      statusText: xhr.statusText,
      data: xhr.response,
      headers: xhr.getAllResponseHeaders().split('\n')
        .reduce(function (obj, headerStr) {
          var headerArr = headerStr.match(/(.+): (.+)/);
          if (headerArr) {
            obj[headerArr[1]] = headerArr[2];
          }
          return obj
        }, {})
    });
  };

  if (progressCallback) {
    xhr.onprogress = function (e) {
      progressCallback({
        readyState: xhr.readyState,
        status: xhr.status,
        length: e.loaded,
        total: e.total,
        statusText: xhr.statusText,
        headers: xhr.getAllResponseHeaders().split('\n')
          .reduce(function (obj, headerStr) {
            var headerArr = headerStr.match(/(.+): (.+)/);
            if (headerArr) {
              obj[headerArr[1]] = headerArr[2];
            }
            return obj
          }, {})
      });
    };
  }

  xhr.onerror = function (err) {
    console.error('[h5-render] unexpected error in _xhr for \'fetch\' API', err);
    callback({
      status: ERROR_STATE,
      ok: false,
      statusText: '',
      data: ''
    });
  };

  xhr.send(config.body);
}

var stream = {

  /**
   * sendHttp
   * @deprecated
   * Note: This API is deprecated. Please use stream.fetch instead.
   * send a http request through XHR.
   * @param  {obj} params
   *  - method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'HEAD' | 'PATCH',
   *  - url: url requested
   * @param  {string} callbackId
   */
  sendHttp: function (param, callbackId) {
    if (typeof param === 'string') {
      try {
        param = JSON.parse(param);
      }
      catch (e) {
        return
      }
    }
    if (typeof param !== 'object' || !param.url) {
      return console.error(
        '[h5-render] invalid config or invalid config.url for sendHttp API')
    }

    var sender = this.sender;
    var method = param.method || 'GET';
    var xhr = new XMLHttpRequest();
    xhr.open(method, param.url, true);
    xhr.onload = function () {
      sender.performCallback(callbackId, this.responseText);
    };
    xhr.onerror = function (error) {
      return console.error('[h5-render] unexpected error in sendHttp API', error)
      // sender.performCallback(
      //   callbackId,
      //   new Error('unexpected error in sendHttp API')
      // )
    };
    xhr.send();
  },

  /**
   * fetch
   * use stream.fetch to request for a json file, a plain text file or
   * a arraybuffer for a file stream. (You can use Blob and FileReader
   * API implemented by most modern browsers to read a arraybuffer.)
   * @param  {object} options config options
   *   - method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'HEAD' | 'PATCH'
   *   - headers {obj}
   *   - url {string}
   *   - mode {string} 'cors' | 'no-cors' | 'same-origin' | 'navigate'
   *   - withCredentials {boolean}
   *   - body
   *   - type {string} 'json' | 'jsonp' | 'text'
   * @param  {string} callbackId
   * @param  {string} progressCallbackId
   */
  fetch: function (options, callbackId, progressCallbackId) {
    var DEFAULT_METHOD = 'GET';
    var DEFAULT_MODE = 'cors';
    var DEFAULT_TYPE = 'text';

    var methodOptions = ['GET', 'POST', 'PUT', 'DELETE', 'HEAD', 'PATCH'];
    var modeOptions = ['cors', 'no-cors', 'same-origin', 'navigate'];
    var typeOptions = ['text', 'json', 'jsonp', 'arraybuffer'];

    // const fallback = false  // fallback from 'fetch' API to XHR.
    var sender = this.sender;

    var config = utils$1.extend({}, options);

    // validate options.method
    if (typeof config.method === 'undefined') {
      config.method = DEFAULT_METHOD;
      console.warn('[h5-render] options.method for \'fetch\' API has been set to '
        + 'default value \'' + config.method + '\'');
    }
    else if (methodOptions.indexOf((config.method + '')
        .toUpperCase()) === -1) {
      return console.error('[h5-render] options.method \''
        + config.method
        + '\' for \'fetch\' API should be one of '
        + methodOptions + '.')
    }

    // validate options.url
    if (!config.url) {
      return console.error('[h5-render] options.url should be set for \'fetch\' API.')
    }

    // validate options.mode
    if (typeof config.mode === 'undefined') {
      config.mode = DEFAULT_MODE;
    }
    else if (modeOptions.indexOf((config.mode + '').toLowerCase()) === -1) {
      return console.error('[h5-render] options.mode \''
        + config.mode
        + '\' for \'fetch\' API should be one of '
        + modeOptions + '.')
    }

    // validate options.type
    if (typeof config.type === 'undefined') {
      config.type = DEFAULT_TYPE;
      console.warn('[h5-render] options.type for \'fetch\' API has been set to '
        + 'default value \'' + config.type + '\'.');
    }
    else if (typeOptions.indexOf((config.type + '').toLowerCase()) === -1) {
      return console.error('[h5-render] options.type \''
          + config.type
          + '\' for \'fetch\' API should be one of '
          + typeOptions + '.')
    }

    // validate options.headers
    config.headers = config.headers || {};
    if (!utils$1.isPlainObject(config.headers)) {
      return console.error('[h5-render] options.headers should be a plain object')
    }

    // validate options.body
    var body = config.body;
    if (!config.headers['Content-Type'] && body) {
      if (utils$1.isPlainObject(body)) {
        // is a json data
        try {
          config.body = JSON.stringify(body);
          config.headers['Content-Type'] = TYPE_JSON;
        }
        catch (e) {}
      }
      else if (utils$1.getType(body) === 'string' && body.match(REG_FORM)) {
        // is form-data
        config.body = encodeURI(body);
        config.headers['Content-Type'] = TYPE_FORM;
      }
    }

    // validate options.timeout
    config.timeout = parseInt(config.timeout, 10) || 2500;

    var _callArgs = [config, function (res) {
      sender.performCallback(callbackId, res);
    }];
    if (progressCallbackId) {
      _callArgs.push(function (res) {
        // Set 'keepAlive' to true for sending continuous callbacks
        sender.performCallback(progressCallbackId, res, true);
      });
    }

    if (config.type === 'jsonp') {
      _jsonp.apply(this, _callArgs);
    }
    else {
      _xhr.apply(this, _callArgs);
    }
  }

};

var meta$3 = {
  stream: [{
    name: 'sendHttp',
    args: ['object', 'function']
  }, {
    name: 'fetch',
    args: ['object', 'function', 'function']
  }]
};

var stream$1 = {
  init: function (Weex) {
    utils$1 = Weex.utils;
    Weex.registerApiModule('stream', stream, meta$3);
  }
};

__$styleInject(".amfe-modal-wrap {\n  display: none;\n  position: fixed;\n  z-index: 999999999;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  background-color: #000;\n  opacity: 0.5;\n}\n\n.amfe-modal-node {\n  position: fixed;\n  z-index: 9999999999;\n  top: 50%;\n  left: 50%;\n  width: 6.666667rem;\n  min-height: 2.666667rem;\n  border-radius: 0.066667rem;\n  -webkit-transform: translate(-50%, -50%);\n  transform: translate(-50%, -50%);\n  background-color: #fff;\n}\n.amfe-modal-node.hide {\n  display: none;\n}\n.amfe-modal-node .content {\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: flex;\n  -webkit-box-orient: vertical;\n  -webkit-flex-direction: column;\n  flex-direction: column;\n  -webkit-box-align: center;\n  -webkit-align-items: center;\n  align-items: center;\n  -webkit-box-pack: center;\n  -webkit-justify-content: center;\n  justify-content: center;\n  width: 100%;\n  min-height: 1.866667rem;\n  box-sizing: border-box;\n  font-size: 0.32rem;\n  line-height: 0.426667rem;\n  padding: 0.213333rem;\n  border-bottom: 1px solid #ddd;\n}\n.amfe-modal-node .btn-group {\n  width: 100%;\n  height: 0.8rem;\n  font-size: 0.373333rem;\n  text-align: center;\n  margin: 0;\n  padding: 0;\n  border: none;\n}\n.amfe-modal-node .btn-group .btn {\n  box-sizing: border-box;\n  height: 0.8rem;\n  line-height: 0.8rem;\n  margin: 0;\n  padding: 0;\n  border: none;\n  background: none;\n}\n",undefined);

// there will be only one instance of modal.
var MODAL_WRAP_CLASS = 'amfe-modal-wrap';
var MODAL_NODE_CLASS = 'amfe-modal-node';

function Modal$1() {
  this.wrap = document.querySelector(MODAL_WRAP_CLASS);
  this.node = document.querySelector(MODAL_NODE_CLASS);
  if (!this.wrap) {
    this.createWrap();
  }
  if (!this.node) {
    this.createNode();
  }
  this.clearNode();
  this.createNodeContent();
  this.bindEvents();
}

Modal$1.prototype = {

  show: function () {
    this.wrap.style.display = 'block';
    this.node.classList.remove('hide');
  },

  destroy: function () {
    document.body.removeChild(this.wrap);
    document.body.removeChild(this.node);
    this.wrap = null;
    this.node = null;
  },

  createWrap: function () {
    this.wrap = document.createElement('div');
    this.wrap.className = MODAL_WRAP_CLASS;
    document.body.appendChild(this.wrap);
  },

  createNode: function () {
    this.node = document.createElement('div');
    this.node.classList.add(MODAL_NODE_CLASS, 'hide');
    document.body.appendChild(this.node);
  },

  clearNode: function () {
    this.node.innerHTML = '';
  },

  createNodeContent: function () {

    // do nothing.
    // child classes can override this method.
  },

  bindEvents: function () {
    this.wrap.addEventListener('click', function (e) {
      e.preventDefault();
      e.stopPropagation();
    });
  }
};

var modal$3 = Modal$1;

__$styleInject(".amfe-alert .amfe-alert-ok {\n  width: 100%;\n}\n",undefined);

var Modal = modal$3;


var CONTENT_CLASS = 'content';
var MSG_CLASS = 'content-msg';
var BUTTON_GROUP_CLASS = 'btn-group';
var BUTTON_CLASS = 'btn';

function Alert$1(config) {
  this.msg = config.message || '';
  this.callback = config.callback;
  this.okTitle = config.okTitle || 'OK';
  Modal.call(this);
  this.node.classList.add('amfe-alert');
}

Alert$1.prototype = Object.create(Modal.prototype);

Alert$1.prototype.createNodeContent = function () {
  var content = document.createElement('div');
  content.classList.add(CONTENT_CLASS);
  this.node.appendChild(content);

  var msg = document.createElement('div');
  msg.classList.add(MSG_CLASS);
  msg.appendChild(document.createTextNode(this.msg));
  content.appendChild(msg);

  var buttonGroup = document.createElement('div');
  buttonGroup.classList.add(BUTTON_GROUP_CLASS);
  this.node.appendChild(buttonGroup);
  var button = document.createElement('div');
  button.classList.add(BUTTON_CLASS, 'alert-ok');
  button.appendChild(document.createTextNode(this.okTitle));
  buttonGroup.appendChild(button);
};

Alert$1.prototype.bindEvents = function () {
  Modal.prototype.bindEvents.call(this);
  var button = this.node.querySelector('.' + BUTTON_CLASS);
  button.addEventListener('click', function () {
    this.destroy();
    this.callback && this.callback();
  }.bind(this));
};

var alert = Alert$1;

__$styleInject(".amfe-confirm .btn-group .btn {\n  float: left;\n  width: 50%;\n}\n.amfe-confirm .btn-group .btn.btn-ok {\n  border-right: 1px solid #ddd;\n}\n",undefined);

var Modal$2 = modal$3;


var CONTENT_CLASS$1 = 'content';
var MSG_CLASS$1 = 'content-msg';
var BUTTON_GROUP_CLASS$1 = 'btn-group';
var BUTTON_CLASS$1 = 'btn';

function Confirm$1(config) {
  this.msg = config.message || '';
  this.callback = config.callback;
  this.okTitle = config.okTitle || 'OK';
  this.cancelTitle = config.cancelTitle || 'Cancel';
  Modal$2.call(this);
  this.node.classList.add('amfe-confirm');
}

Confirm$1.prototype = Object.create(Modal$2.prototype);

Confirm$1.prototype.createNodeContent = function () {
  var content = document.createElement('div');
  content.classList.add(CONTENT_CLASS$1);
  this.node.appendChild(content);

  var msg = document.createElement('div');
  msg.classList.add(MSG_CLASS$1);
  msg.appendChild(document.createTextNode(this.msg));
  content.appendChild(msg);

  var buttonGroup = document.createElement('div');
  buttonGroup.classList.add(BUTTON_GROUP_CLASS$1);
  this.node.appendChild(buttonGroup);
  var btnOk = document.createElement('div');
  btnOk.appendChild(document.createTextNode(this.okTitle));
  btnOk.classList.add('btn-ok', BUTTON_CLASS$1);
  var btnCancel = document.createElement('div');
  btnCancel.appendChild(document.createTextNode(this.cancelTitle));
  btnCancel.classList.add('btn-cancel', BUTTON_CLASS$1);
  buttonGroup.appendChild(btnOk);
  buttonGroup.appendChild(btnCancel);
  this.node.appendChild(buttonGroup);
};

Confirm$1.prototype.bindEvents = function () {
  Modal$2.prototype.bindEvents.call(this);
  var btnOk = this.node.querySelector('.' + BUTTON_CLASS$1 + '.btn-ok');
  var btnCancel = this.node.querySelector('.' + BUTTON_CLASS$1 + '.btn-cancel');
  btnOk.addEventListener('click', function () {
    this.destroy();
    this.callback && this.callback(this.okTitle);
  }.bind(this));
  btnCancel.addEventListener('click', function () {
    this.destroy();
    this.callback && this.callback(this.cancelTitle);
  }.bind(this));
};

var confirm = Confirm$1;

__$styleInject(".amfe-prompt .input-wrap {\n  box-sizing: border-box;\n  width: 100%;\n  margin-top: 0.133333rem;\n  // padding: 0.24rem 0.213333rem 0.213333rem;\n  height: 0.96rem;\n}\n.amfe-prompt .input-wrap .input {\n  box-sizing: border-box;\n  width: 100%;\n  height: 0.56rem;\n  line-height: 0.56rem;\n  font-size: 0.32rem;\n  border: 1px solid #999;\n}\n.amfe-prompt .btn-group .btn {\n  float: left;\n  width: 50%;\n}\n.amfe-prompt .btn-group .btn.btn-ok {\n  border-right: 1px solid #ddd;\n}\n",undefined);

var Modal$3 = modal$3;


var CONTENT_CLASS$2 = 'content';
var MSG_CLASS$2 = 'content-msg';
var BUTTON_GROUP_CLASS$2 = 'btn-group';
var BUTTON_CLASS$2 = 'btn';
var INPUT_WRAP_CLASS = 'input-wrap';
var INPUT_CLASS = 'input';

function Prompt$1(config) {
  this.msg = config.message || '';
  this.defaultMsg = config.default || '';
  this.callback = config.callback;
  this.okTitle = config.okTitle || 'OK';
  this.cancelTitle = config.cancelTitle || 'Cancel';
  Modal$3.call(this);
  this.node.classList.add('amfe-prompt');
}

Prompt$1.prototype = Object.create(Modal$3.prototype);

Prompt$1.prototype.createNodeContent = function () {

  var content = document.createElement('div');
  content.classList.add(CONTENT_CLASS$2);
  this.node.appendChild(content);

  var msg = document.createElement('div');
  msg.classList.add(MSG_CLASS$2);
  msg.appendChild(document.createTextNode(this.msg));
  content.appendChild(msg);

  var inputWrap = document.createElement('div');
  inputWrap.classList.add(INPUT_WRAP_CLASS);
  content.appendChild(inputWrap);
  var input = document.createElement('input');
  input.classList.add(INPUT_CLASS);
  input.type = 'text';
  input.autofocus = true;
  input.placeholder = this.defaultMsg;
  inputWrap.appendChild(input);

  var buttonGroup = document.createElement('div');
  buttonGroup.classList.add(BUTTON_GROUP_CLASS$2);
  var btnOk = document.createElement('div');
  btnOk.appendChild(document.createTextNode(this.okTitle));
  btnOk.classList.add('btn-ok', BUTTON_CLASS$2);
  var btnCancel = document.createElement('div');
  btnCancel.appendChild(document.createTextNode(this.cancelTitle));
  btnCancel.classList.add('btn-cancel', BUTTON_CLASS$2);
  buttonGroup.appendChild(btnOk);
  buttonGroup.appendChild(btnCancel);
  this.node.appendChild(buttonGroup);
};

Prompt$1.prototype.bindEvents = function () {
  Modal$3.prototype.bindEvents.call(this);
  var btnOk = this.node.querySelector('.' + BUTTON_CLASS$2 + '.btn-ok');
  var btnCancel = this.node.querySelector('.' + BUTTON_CLASS$2 + '.btn-cancel');
  var that = this;
  btnOk.addEventListener('click', function () {
    var val = document.querySelector('input').value;
    this.destroy();
    this.callback && this.callback({
      result: that.okTitle,
      data: val
    });
  }.bind(this));
  btnCancel.addEventListener('click', function () {
    var val = document.querySelector('input').value;
    this.destroy();
    this.callback && this.callback({
      result: that.cancelTitle,
      data: val
    });
  }.bind(this));
};

var prompt = Prompt$1;

__$styleInject(".amfe-toast {\n  font-size: 0.32rem;\n  line-height: 0.426667rem;\n  position: fixed;\n  box-sizing: border-box;\n  max-width: 80%;\n  bottom: 2.666667rem;\n  left: 50%;\n  padding: 0.213333rem;\n  background-color: #000;\n  color: #fff;\n  text-align: center;\n  opacity: 0.6;\n  transition: all 0.4s ease-in-out;\n  border-radius: 0.066667rem;\n  -webkit-transform: translateX(-50%);\n  transform: translateX(-50%);\n}\n\n.amfe-toast.hide {\n  opacity: 0;\n}\n",undefined);

var queue$2 = [];
var timer;
var isProcessing = false;
var toastWin;
var TOAST_WIN_CLASS_NAME = 'amfe-toast';

var DEFAULT_DURATION = 0.8;
var TRANSITION_TIME = 0.4;

function showToastWindow(msg, callback) {
  var handleTransitionEnd = function () {
    toastWin.removeEventListener('transitionend', handleTransitionEnd);
    toastWin.removeEventListener('webkitTransitionEnd', handleTransitionEnd);
    callback && callback();
  };
  if (!toastWin) {
    toastWin = document.createElement('div');
    toastWin.classList.add(TOAST_WIN_CLASS_NAME, 'hide');
    document.body.appendChild(toastWin);
  }
  toastWin.innerHTML = msg;
  toastWin.addEventListener('transitionend', handleTransitionEnd);
  toastWin.addEventListener('webkitTransitionEnd', handleTransitionEnd);
  setTimeout(function () {
    toastWin.classList.remove('hide');
  }, 0);
  setTimeout(function () {
    callback && callback();
  }, TRANSITION_TIME * 1000);
}

function hideToastWindow(callback) {
  var handleTransitionEnd = function () {
    toastWin.removeEventListener('transitionend', handleTransitionEnd);
    toastWin.removeEventListener('webkitTransitionEnd', handleTransitionEnd);
    callback && callback();
  };
  if (!toastWin) {
    return
  }
  toastWin.addEventListener('transitionend', handleTransitionEnd);
  toastWin.addEventListener('webkitTransitionEnd', handleTransitionEnd);
  toastWin.classList.add('hide');
  setTimeout(function () {
    callback && callback();
  }, TRANSITION_TIME * 1000);
}

var toast$1 = {

  push: function (msg, duration) {
    queue$2.push({
      msg: msg,
      duration: duration || DEFAULT_DURATION
    });
    this.show();
  },

  show: function () {
    var that = this;

    // All messages had been toasted already, so remove the toast window,
    if (!queue$2.length) {
      toastWin && toastWin.parentNode.removeChild(toastWin);
      toastWin = null;
      return
    }

    // the previous toast is not ended yet.
    if (isProcessing) {
      return
    }
    isProcessing = true;

    var toastInfo = queue$2.shift();
    showToastWindow(toastInfo.msg, function () {
      timer = setTimeout(function () {
        timer = null;
        hideToastWindow(function () {
          isProcessing = false;
          that.show();
        });
      }, toastInfo.duration * 1000);
    });
  }

};

var toast_1 = {
  push: toast$1.push.bind(toast$1)
};

var Alert = alert;
var Confirm = confirm;
var Prompt = prompt;
var toast = toast_1;

var modal$1 = {

  toast: function (msg, duration) {
    toast.push(msg, duration);
  },

  alert: function (config) {
    new Alert(config).show();
  },

  prompt: function (config) {
    new Prompt(config).show();
  },

  confirm: function (config) {
    new Confirm(config).show();
  }

};

!window.lib && (window.lib = {});
window.lib.modal = modal$1;

var index$5 = modal$1;

var msg = {

  // duration: default is 0.8 seconds.
  toast: function (config) {
    index$5.toast(config.message, config.duration);
  },

  // config:
  //  - message: string
  //  - okTitle: title of ok button
  //  - callback
  alert: function (config, callbackId) {
    var sender = this.sender;
    config.callback = function () {
      sender.performCallback(callbackId);
    };
    index$5.alert(config);
  },

  // config:
  //  - message: string
  //  - okTitle: title of ok button
  //  - cancelTitle: title of cancel button
  //  - callback
  confirm: function (config, callbackId) {
    var sender = this.sender;
    config.callback = function (val) {
      sender.performCallback(callbackId, val);
    };
    index$5.confirm(config);
  },

  // config:
  //  - message: string
  //  - okTitle: title of ok button
  //  - cancelTitle: title of cancel button
  //  - callback
  prompt: function (config, callbackId) {
    var sender = this.sender;
    config.callback = function (val) {
      sender.performCallback(callbackId, val);
    };
    index$5.prompt(config);
  }
};

var meta$4 = {
  modal: [{
    name: 'toast',
    args: ['object']
  }, {
    name: 'alert',
    args: ['object', 'function']
  }, {
    name: 'confirm',
    args: ['object', 'function']
  }, {
    name: 'prompt',
    args: ['object', 'function']
  }]
};

var modal = {
  init: function (Weex) {
    Weex.registerApiModule('modal', msg, meta$4);
  }
};

/**
 * config:
 *   - styles
 *   - duration [Number] milliseconds(ms)
 *   - timingFunction [string]
 *   - dealy [Number] milliseconds(ms)
 */
function transitionOnce (comp, config, callback) {
  var styles = config.styles || {};
  var duration = config.duration || 1000; // ms
  var timingFunction = config.timingFunction || 'ease';
  var delay = config.delay || 0;  // ms
  var transitionValue = 'all ' + duration + 'ms '
      + timingFunction + ' ' + delay + 'ms';
  var dom = comp.node;
  var transitionEndHandler = function (e) {
    e.stopPropagation();
    dom.removeEventListener('webkitTransitionEnd', transitionEndHandler);
    dom.removeEventListener('transitionend', transitionEndHandler);
    dom.style.transition = '';
    dom.style.webkitTransition = '';
    callback();
  };
  dom.style.transition = transitionValue;
  dom.style.webkitTransition = transitionValue;
  dom.addEventListener('webkitTransitionEnd', transitionEndHandler);
  dom.addEventListener('transitionend', transitionEndHandler);
  comp.updateStyle(styles);
}

var _data = {};

var animation = {

  /**
   * transition
   * @param  {string} ref        [description]
   * @param  {obj} config     [description]
   * @param  {string} callbackId [description]
   */
  transition: function (ref, config, callbackId) {
    var refData = _data[ref];
    var stylesKey = JSON.stringify(config.styles);
    var weexInstance = this;
    // If the same component perform a animation with exactly the same
    // styles in a sequence with so short interval that the prev animation
    // is still in playing, then the next animation should be ignored.
    if (refData && refData[stylesKey]) {
      return
    }
    if (!refData) {
      refData = _data[ref] = {};
    }
    refData[stylesKey] = true;

    var component = this.getComponentManager().getComponent(ref);
    return transitionOnce(component, config, function () {
      // Remove the stylesKey in refData so that the same animation
      // can be played again after current animation is already finished.
      delete refData[stylesKey];
      weexInstance.sender.performCallback(callbackId);
    })
  }
};

var meta$5 = {
  animation: [{
    name: 'transition',
    args: ['string', 'object', 'function']
  }]
};

var animation$1 = {
  init: function (Weex) {
    Weex.registerApiModule('animation', animation, meta$5);
  }
};

var webview = {

  // ref: ref of the web component.
  goBack: function (ref) {
    var webComp = this.getComponentManager().getComponent(ref);
    if (!webComp.goBack) {
      console.error('error: the specified component has no method of'
          + ' goBack. Please make sure it is a webview component.');
      return
    }
    webComp.goBack();
  },

  // ref: ref of the web component.
  goForward: function (ref) {
    var webComp = this.getComponentManager().getComponent(ref);
    if (!webComp.goForward) {
      console.error('error: the specified component has no method of'
          + ' goForward. Please make sure it is a webview component.');
      return
    }
    webComp.goForward();
  },

  // ref: ref of the web component.
  reload: function (ref) {
    var webComp = this.getComponentManager().getComponent(ref);
    if (!webComp.reload) {
      console.error('error: the specified component has no method of'
          + ' reload. Please make sure it is a webview component.');
      return
    }
    webComp.reload();
  }

};

var meta$6 = {
  webview: [{
    name: 'goBack',
    args: ['string']
  }, {
    name: 'goForward',
    args: ['string']
  }, {
    name: 'reload',
    args: ['string']
  }]
};

var webview$1 = {
  init: function (Weex) {
    Weex.registerApiModule('webview', webview, meta$6);
  }
};

var navigator$1 = {

  // config
  //  - url: the url to push
  //  - animated: this configuration item is native only
  //  callback is not currently supported
  push: function (config, callbackId) {
    window.location.href = config.url;
    this.sender.performCallback(callbackId);
  },

  // config
  //  - animated: this configuration item is native only
  //  callback is note currently supported
  pop: function (config, callbackId) {
    window.history.back();
    this.sender.performCallback(callbackId);
  }

};

var meta$7 = {
  navigator: [{
    name: 'push',
    args: ['object', 'function']
  }, {
    name: 'pop',
    args: ['object', 'function']
  }]
};

var navigator$2 = {
  init: function (Weex) {
    Weex.registerApiModule('navigator', navigator$1, meta$7);
  }
};

/* global localStorage */
var supportLocalStorage = typeof localStorage !== 'undefined';
var SUCCESS = 'success';
var FAILED = 'failed';
var INVALID_PARAM = 'invalid_param';
var UNDEFINED = 'undefined';

var storage = {

  /**
   * When passed a key name and value, will add that key to the storage,
   * or update that key's value if it already exists.
   * @param {string} key
   * @param {string} value
   * @param {function} callbackId
   */
  setItem: function (key, value, callbackId) {
    if (!supportLocalStorage) {
      console.error('your browser is not support localStorage yet.');
      return
    }
    var sender = this.sender;
    if (!key || !value) {
      sender.performCallback(callbackId, {
        result: 'failed',
        data: INVALID_PARAM
      });
      return
    }
    try {
      localStorage.setItem(key, value);
      sender.performCallback(callbackId, {
        result: SUCCESS,
        data: UNDEFINED
      });
    }
    catch (e) {
      // accept any exception thrown during a storage attempt as a quota error
      sender.performCallback(callbackId, {
        result: FAILED,
        data: UNDEFINED
      });
    }
  },

  /**
   * When passed a key name, will return that key's value.
   * @param {string} key
   * @param {function} callbackId
   */
  getItem: function (key, callbackId) {
    if (!supportLocalStorage) {
      console.error('your browser is not support localStorage yet.');
      return
    }
    var sender = this.sender;
    if (!key) {
      sender.performCallback(callbackId, {
        result: FAILED,
        data: INVALID_PARAM
      });
      return
    }
    var val = localStorage.getItem(key);
    sender.performCallback(callbackId, {
      result: val ? SUCCESS : FAILED,
      data: val || UNDEFINED
    });
  },

  /**
   *When passed a key name, will remove that key from the storage.
   * @param {string} key
   * @param {function} callbackId
   */
  removeItem: function (key, callbackId) {
    if (!supportLocalStorage) {
      console.error('your browser is not support localStorage yet.');
      return
    }
    var sender = this.sender;
    if (!key) {
      sender.performCallback(callbackId, {
        result: FAILED,
        data: INVALID_PARAM
      });
      return
    }
    localStorage.removeItem(key);
    sender.performCallback(callbackId, {
      result: SUCCESS,
      data: UNDEFINED
    });
  },

  /**
   * Returns an integer representing the number of data items stored in the Storage object.
   * @param {function} callbackId
   */
  length: function (callbackId) {
    if (!supportLocalStorage) {
      console.error('your browser is not support localStorage yet.');
      return
    }
    var sender = this.sender;
    var len = localStorage.length;
    sender.performCallback(callbackId, {
      result: SUCCESS,
      data: len
    });
  },

  /**
   * Returns an array that contains all keys stored in Storage object.
   * @param {function} callbackId
   */
  getAllKeys: function (callbackId) {
    if (!supportLocalStorage) {
      console.error('your browser is not support localStorage yet.');
      return
    }
    var sender = this.sender;
    var _arr = [];
    for (var i = 0; i < localStorage.length; i++) {
      _arr.push(localStorage.key(i));
    }
    sender.performCallback(callbackId, {
      result: SUCCESS,
      data: _arr
    });
  }
};

var meta$8 = {
  storage: [{
    name: 'setItem',
    args: ['string', 'string', 'function']
  }, {
    name: 'getItem',
    args: ['string', 'function']
  }, {
    name: 'removeItem',
    args: ['string', 'function']
  }, {
    name: 'length',
    args: ['function']
  }, {
    name: 'getAllKeys',
    args: ['function']
  }]
};

var storage$1 = {
  init: function (Weex) {
    Weex.registerApiModule('storage', storage, meta$8);
  }
};

/**

AUCTION:
taskQueue
Clipboard.setString()  NOW not works, facing to user-act lose of taskQueue.

works in Chrome Firefox Opera. but not in Safari.
@see https://developer.mozilla.org/en-US/docs/Web/API/Document/execCommand#Browser_compatibility

Clipboard.getString() unimplemented. There is no easy way to do paste from clipboard to js variable.

So look out your app behavior, when downgrade to html5 render.
Any idea is welcome.
**/

var WEEX_CLIPBOARD_ID = '__weex_clipboard_id__';

var clipboard = {

  getString: function (callbackId) {
    // not supported in html5
    console.log('clipboard.getString() is not supported now.');
  },

  setString: function (text) {
    // not support safari
    if (typeof text === 'string' && text !== '' && document.execCommand) {
      var tempInput = element();
      tempInput.value = text;

      tempInput.select();
      document.execCommand('copy');
      // var out = document.execCommand('copy');
      // console.log("execCommand out is " + out);
      tempInput.value = '';
      tempInput.blur();
    }
    else {
      console.log('only support string input now');
    }
  }

};

function element () {
  var tempInput = document.getElementById(WEEX_CLIPBOARD_ID);
  if (tempInput === undefined) {
    tempInput = document.createElement('input');
    tempInput.setAttribute('id', WEEX_CLIPBOARD_ID);
    tempInput.style.cssText = 'height:1px;width:1px;border:none;';
    // tempInput.style.cssText = "height:40px;width:300px;border:solid;"
    document.body.appendChild(tempInput);
  }
  return tempInput
}

var meta$9 = {
  clipboard: [{
    name: 'getString',
    args: ['function']
  }, {
    name: 'setString',
    args: ['string']
  }]
};

var clipboard$1 = {
  init: function (Weex) {
    Weex.registerApiModule('clipboard', clipboard, meta$9);
  }
};

// import timer from './timer'
var api = {
  init: function (Weex) {
    Weex.install(dom$1);
    Weex.install(event$1);
    Weex.install(pageInfo$1);
    Weex.install(stream$1);
    Weex.install(modal);
    Weex.install(animation$1);
    Weex.install(webview$1);
    // Weex.install(timer)
    Weex.install(navigator$2);
    Weex.install(storage$1);
    Weex.install(clipboard$1);
  }
};

var weexModules = {};

function require (moduleName) {
  return weexModules[moduleName]
}

function registerApiModule (name, module, meta) {
  var this$1 = this;

  if (!weexModules[name]) {
    weexModules[name] = {};
  }
  for (var key in module) {
    if (module.hasOwnProperty(key)) {
      weexModules[name][key] = bind(module[key], this$1);
    }
  }
}

var sender = {
  performCallback: function performCallback (callback, data, keepAlive) {
    if (typeof callback === 'function') {
      return callback(data)
    }
    return null
  }
};

function getRoot () {
}

function install$1 (module) {
  module.init(this);
}


var weex = Object.freeze({
	utils: utils,
	require: require,
	registerApiModule: registerApiModule,
	sender: sender,
	getRoot: getRoot,
	install: install$1
});

// TODO: parse UA
var ua = navigator.userAgent;

var WXEnvironment = {
  platform: 'Web',
  userAgent: ua,
  appName: navigator.appName,
  appVersion: navigator.appVersion, // maybe too long
  weexVersion: '',
  osName: '',
  osVersion: '',
  deviceWidth: window.innerWidth,
  deviceHeight: window.innerHeight
};

api.init(weex);

Object.freeze(weex);
Object.freeze(WXEnvironment);

window.weex = weex;
window.WXEnvironment = WXEnvironment;

// import Vue from 'vue'
function install (Vue) {
  var htmlRegex = /^html:/i;
  Vue.config.isReservedTag = function (tag) { return htmlRegex.test(tag); };
  Vue.config.parsePlatformTagName = function (tag) { return tag.replace(htmlRegex, ''); };

  for (var name in components) {
    Vue.component(name, components[name]);
  }

  /* istanbul ignore next */
  {
    console.log("[Vue Renderer] Registered components: "
      + "[" + (Object.keys(components).join(', ')) + "].");
  }
}

/* eslint-disable no-undef */
if (typeof Vue === 'undefined') {
  console.error('[Vue Renderer] `Vue` is not defined!');
}
else {
  /* istanbul ignore next */
  if ("development" === 'development'
    && semver.lt(Vue.version, '2.1.5')) {
    console.warn("[Vue Renderer] The version of Vue should be " +
      "greater than 2.1.5, current is " + (Vue.version) + ".");
  }

  setViewport();

  Vue.use({ install: install });
}

exports.install = install;

Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjpudWxsLCJzb3VyY2VzIjpbIi4uL25vZGVfbW9kdWxlcy9zZW12ZXIvc2VtdmVyLmpzIiwiLi4vaHRtbDUvcmVuZGVyL3Z1ZS92YWxpZGF0b3Ivc3R5bGUuanMiLCIuLi9odG1sNS9yZW5kZXIvdnVlL3ZhbGlkYXRvci9wcm9wLmpzIiwiLi4vaHRtbDUvcmVuZGVyL3Z1ZS91dGlscy5qcyIsIi4uL2h0bWw1L3JlbmRlci92dWUvdmFsaWRhdG9yL2NoZWNrLmpzIiwiLi4vaHRtbDUvcmVuZGVyL3Z1ZS92YWxpZGF0b3IvaW5kZXguanMiLCIuLi9odG1sNS9yZW5kZXIvdnVlL2NvbXBvbmVudHMvc3dpdGNoLmpzIiwiLi4vaHRtbDUvcmVuZGVyL3Z1ZS9jb21wb25lbnRzL2ltYWdlLmpzIiwiLi4vaHRtbDUvcmVuZGVyL3Z1ZS9jb21wb25lbnRzL2xpc3QvbG9hZGluZy1pbmRpY2F0b3IuanMiLCIuLi9odG1sNS9yZW5kZXIvdnVlL2NvbXBvbmVudHMvbGlzdC9yZWZyZXNoLmpzIiwiLi4vaHRtbDUvcmVuZGVyL3Z1ZS9jb21wb25lbnRzL2xpc3QvbG9hZGluZy5qcyIsIi4uL2h0bWw1L3JlbmRlci92dWUvbWV0aG9kcy9yZWN0LmpzIiwiLi4vaHRtbDUvcmVuZGVyL3Z1ZS9tZXRob2RzL2V2ZW50LmpzIiwiLi4vaHRtbDUvcmVuZGVyL3Z1ZS9jb21wb25lbnRzL2xpc3QvbGlzdE1peGluLmpzIiwiLi4vaHRtbDUvcmVuZGVyL3Z1ZS9jb21wb25lbnRzL2xpc3QvaW5kZXguanMiLCIuLi9odG1sNS9yZW5kZXIvdnVlL2NvbXBvbmVudHMvbGlzdC9jZWxsLmpzIiwiLi4vaHRtbDUvcmVuZGVyL3Z1ZS9jb21wb25lbnRzL3Njcm9sbGVyLmpzIiwiLi4vaHRtbDUvcmVuZGVyL3Z1ZS9jb21wb25lbnRzL3NsaWRlci9pbmRpY2F0b3IuanMiLCIuLi9odG1sNS9yZW5kZXIvdnVlL2NvbXBvbmVudHMvc2xpZGVyL3NsaWRlTWl4aW4uanMiLCIuLi9odG1sNS9yZW5kZXIvdnVlL2NvbXBvbmVudHMvc2xpZGVyL2luZGV4LmpzIiwiLi4vaHRtbDUvcmVuZGVyL3Z1ZS9jb21wb25lbnRzL3dhcm5pbmcuanMiLCIuLi9odG1sNS9yZW5kZXIvdnVlL2NvbXBvbmVudHMvdGV4dC5qcyIsIi4uL2h0bWw1L3JlbmRlci92dWUvY29tcG9uZW50cy93ZWIuanMiLCIuLi9odG1sNS9zaGFyZWQvYXJyYXlGcm9tLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fZ2xvYmFsLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fY29yZS5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX2lzLW9iamVjdC5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX2FuLW9iamVjdC5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX2ZhaWxzLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fZGVzY3JpcHRvcnMuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19kb20tY3JlYXRlLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9faWU4LWRvbS1kZWZpbmUuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL190by1wcmltaXRpdmUuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19vYmplY3QtZHAuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19wcm9wZXJ0eS1kZXNjLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9faGlkZS5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX2hhcy5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX3VpZC5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX3JlZGVmaW5lLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fYS1mdW5jdGlvbi5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX2N0eC5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX2V4cG9ydC5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX2NvZi5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX2lvYmplY3QuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19kZWZpbmVkLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fdG8taW9iamVjdC5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX3RvLWludGVnZXIuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL190by1sZW5ndGguanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL190by1pbmRleC5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX2FycmF5LWluY2x1ZGVzLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fc2hhcmVkLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fc2hhcmVkLWtleS5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX29iamVjdC1rZXlzLWludGVybmFsLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fZW51bS1idWcta2V5cy5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX29iamVjdC1rZXlzLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fb2JqZWN0LWdvcHMuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19vYmplY3QtcGllLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fdG8tb2JqZWN0LmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fb2JqZWN0LWFzc2lnbi5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM2Lm9iamVjdC5hc3NpZ24uanMiLCIuLi9odG1sNS9zaGFyZWQvb2JqZWN0U2V0UHJvdG90eXBlT2YuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL193a3MuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19jbGFzc29mLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczYub2JqZWN0LnRvLXN0cmluZy5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX3N0cmluZy1hdC5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX2xpYnJhcnkuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19pdGVyYXRvcnMuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19vYmplY3QtZHBzLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9faHRtbC5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX29iamVjdC1jcmVhdGUuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19zZXQtdG8tc3RyaW5nLXRhZy5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX2l0ZXItY3JlYXRlLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fb2JqZWN0LWdwby5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX2l0ZXItZGVmaW5lLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczYuc3RyaW5nLml0ZXJhdG9yLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fYWRkLXRvLXVuc2NvcGFibGVzLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9faXRlci1zdGVwLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczYuYXJyYXkuaXRlcmF0b3IuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL3dlYi5kb20uaXRlcmFibGUuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19hbi1pbnN0YW5jZS5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX2l0ZXItY2FsbC5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX2lzLWFycmF5LWl0ZXIuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2NvcmUuZ2V0LWl0ZXJhdG9yLW1ldGhvZC5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX2Zvci1vZi5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX3NwZWNpZXMtY29uc3RydWN0b3IuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19pbnZva2UuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL190YXNrLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fbWljcm90YXNrLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fcmVkZWZpbmUtYWxsLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fc2V0LXNwZWNpZXMuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19pdGVyLWRldGVjdC5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM2LnByb21pc2UuanMiLCIuLi9odG1sNS9yZW5kZXIvdnVlL2Vudi92aWV3cG9ydC5qcyIsIi4uL25vZGVfbW9kdWxlcy9zY3JvbGwtdG8vbm9kZV9tb2R1bGVzL3R3ZWVuL3R3ZWVuLmpzIiwiLi4vbm9kZV9tb2R1bGVzL3Njcm9sbC10by9ub2RlX21vZHVsZXMvcmFmL25vZGVfbW9kdWxlcy9wZXJmb3JtYW5jZS1ub3cvbGliL3BlcmZvcm1hbmNlLW5vdy5qcyIsIi4uL25vZGVfbW9kdWxlcy9zY3JvbGwtdG8vbm9kZV9tb2R1bGVzL3JhZi9pbmRleC5qcyIsIi4uL25vZGVfbW9kdWxlcy9zY3JvbGwtdG8vaW5kZXguanMiLCIuLi9odG1sNS9yZW5kZXIvYnJvd3Nlci9leHRlbmQvYXBpL2RvbS5qcyIsIi4uL2h0bWw1L3JlbmRlci9icm93c2VyL2V4dGVuZC9hcGkvZXZlbnQuanMiLCIuLi9odG1sNS9yZW5kZXIvYnJvd3Nlci9leHRlbmQvYXBpL3BhZ2VJbmZvLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2h0dHB1cmwvYnVpbGQvaHR0cHVybC5jb21tb24uanMiLCIuLi9odG1sNS9yZW5kZXIvYnJvd3Nlci9leHRlbmQvYXBpL3N0cmVhbS5qcyIsIi4uL25vZGVfbW9kdWxlcy9tb2RhbHMvc3JjL21vZGFsLmpzIiwiLi4vbm9kZV9tb2R1bGVzL21vZGFscy9zcmMvYWxlcnQuanMiLCIuLi9ub2RlX21vZHVsZXMvbW9kYWxzL3NyYy9jb25maXJtLmpzIiwiLi4vbm9kZV9tb2R1bGVzL21vZGFscy9zcmMvcHJvbXB0LmpzIiwiLi4vbm9kZV9tb2R1bGVzL21vZGFscy9zcmMvdG9hc3QuanMiLCIuLi9ub2RlX21vZHVsZXMvbW9kYWxzL3NyYy9pbmRleC5qcyIsIi4uL2h0bWw1L3JlbmRlci9icm93c2VyL2V4dGVuZC9hcGkvbW9kYWwuanMiLCIuLi9odG1sNS9yZW5kZXIvYnJvd3Nlci9leHRlbmQvYXBpL2FuaW1hdGlvbi9saWIuanMiLCIuLi9odG1sNS9yZW5kZXIvYnJvd3Nlci9leHRlbmQvYXBpL2FuaW1hdGlvbi9pbmRleC5qcyIsIi4uL2h0bWw1L3JlbmRlci9icm93c2VyL2V4dGVuZC9hcGkvd2Vidmlldy5qcyIsIi4uL2h0bWw1L3JlbmRlci9icm93c2VyL2V4dGVuZC9hcGkvbmF2aWdhdG9yLmpzIiwiLi4vaHRtbDUvcmVuZGVyL2Jyb3dzZXIvZXh0ZW5kL2FwaS9zdG9yYWdlLmpzIiwiLi4vaHRtbDUvcmVuZGVyL2Jyb3dzZXIvZXh0ZW5kL2FwaS9jbGlwYm9hcmQuanMiLCIuLi9odG1sNS9yZW5kZXIvYnJvd3Nlci9leHRlbmQvYXBpL2luZGV4LmpzIiwiLi4vaHRtbDUvcmVuZGVyL3Z1ZS9lbnYvd2VleC5qcyIsIi4uL2h0bWw1L3JlbmRlci92dWUvZW52L1dYRW52aXJvbm1lbnQuanMiLCIuLi9odG1sNS9yZW5kZXIvdnVlL2Vudi9pbmRleC5qcyIsIi4uL2h0bWw1L3JlbmRlci92dWUvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gU2VtVmVyO1xuXG4vLyBUaGUgZGVidWcgZnVuY3Rpb24gaXMgZXhjbHVkZWQgZW50aXJlbHkgZnJvbSB0aGUgbWluaWZpZWQgdmVyc2lvbi5cbi8qIG5vbWluICovIHZhciBkZWJ1Zztcbi8qIG5vbWluICovIGlmICh0eXBlb2YgcHJvY2VzcyA9PT0gJ29iamVjdCcgJiZcbiAgICAvKiBub21pbiAqLyBwcm9jZXNzLmVudiAmJlxuICAgIC8qIG5vbWluICovIHByb2Nlc3MuZW52Lk5PREVfREVCVUcgJiZcbiAgICAvKiBub21pbiAqLyAvXFxic2VtdmVyXFxiL2kudGVzdChwcm9jZXNzLmVudi5OT0RFX0RFQlVHKSlcbiAgLyogbm9taW4gKi8gZGVidWcgPSBmdW5jdGlvbigpIHtcbiAgICAvKiBub21pbiAqLyB2YXIgYXJncyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMCk7XG4gICAgLyogbm9taW4gKi8gYXJncy51bnNoaWZ0KCdTRU1WRVInKTtcbiAgICAvKiBub21pbiAqLyBjb25zb2xlLmxvZy5hcHBseShjb25zb2xlLCBhcmdzKTtcbiAgICAvKiBub21pbiAqLyB9O1xuLyogbm9taW4gKi8gZWxzZVxuICAvKiBub21pbiAqLyBkZWJ1ZyA9IGZ1bmN0aW9uKCkge307XG5cbi8vIE5vdGU6IHRoaXMgaXMgdGhlIHNlbXZlci5vcmcgdmVyc2lvbiBvZiB0aGUgc3BlYyB0aGF0IGl0IGltcGxlbWVudHNcbi8vIE5vdCBuZWNlc3NhcmlseSB0aGUgcGFja2FnZSB2ZXJzaW9uIG9mIHRoaXMgY29kZS5cbmV4cG9ydHMuU0VNVkVSX1NQRUNfVkVSU0lPTiA9ICcyLjAuMCc7XG5cbnZhciBNQVhfTEVOR1RIID0gMjU2O1xudmFyIE1BWF9TQUZFX0lOVEVHRVIgPSBOdW1iZXIuTUFYX1NBRkVfSU5URUdFUiB8fCA5MDA3MTk5MjU0NzQwOTkxO1xuXG4vLyBUaGUgYWN0dWFsIHJlZ2V4cHMgZ28gb24gZXhwb3J0cy5yZVxudmFyIHJlID0gZXhwb3J0cy5yZSA9IFtdO1xudmFyIHNyYyA9IGV4cG9ydHMuc3JjID0gW107XG52YXIgUiA9IDA7XG5cbi8vIFRoZSBmb2xsb3dpbmcgUmVndWxhciBFeHByZXNzaW9ucyBjYW4gYmUgdXNlZCBmb3IgdG9rZW5pemluZyxcbi8vIHZhbGlkYXRpbmcsIGFuZCBwYXJzaW5nIFNlbVZlciB2ZXJzaW9uIHN0cmluZ3MuXG5cbi8vICMjIE51bWVyaWMgSWRlbnRpZmllclxuLy8gQSBzaW5nbGUgYDBgLCBvciBhIG5vbi16ZXJvIGRpZ2l0IGZvbGxvd2VkIGJ5IHplcm8gb3IgbW9yZSBkaWdpdHMuXG5cbnZhciBOVU1FUklDSURFTlRJRklFUiA9IFIrKztcbnNyY1tOVU1FUklDSURFTlRJRklFUl0gPSAnMHxbMS05XVxcXFxkKic7XG52YXIgTlVNRVJJQ0lERU5USUZJRVJMT09TRSA9IFIrKztcbnNyY1tOVU1FUklDSURFTlRJRklFUkxPT1NFXSA9ICdbMC05XSsnO1xuXG5cbi8vICMjIE5vbi1udW1lcmljIElkZW50aWZpZXJcbi8vIFplcm8gb3IgbW9yZSBkaWdpdHMsIGZvbGxvd2VkIGJ5IGEgbGV0dGVyIG9yIGh5cGhlbiwgYW5kIHRoZW4gemVybyBvclxuLy8gbW9yZSBsZXR0ZXJzLCBkaWdpdHMsIG9yIGh5cGhlbnMuXG5cbnZhciBOT05OVU1FUklDSURFTlRJRklFUiA9IFIrKztcbnNyY1tOT05OVU1FUklDSURFTlRJRklFUl0gPSAnXFxcXGQqW2EtekEtWi1dW2EtekEtWjAtOS1dKic7XG5cblxuLy8gIyMgTWFpbiBWZXJzaW9uXG4vLyBUaHJlZSBkb3Qtc2VwYXJhdGVkIG51bWVyaWMgaWRlbnRpZmllcnMuXG5cbnZhciBNQUlOVkVSU0lPTiA9IFIrKztcbnNyY1tNQUlOVkVSU0lPTl0gPSAnKCcgKyBzcmNbTlVNRVJJQ0lERU5USUZJRVJdICsgJylcXFxcLicgK1xuICAgICAgICAgICAgICAgICAgICcoJyArIHNyY1tOVU1FUklDSURFTlRJRklFUl0gKyAnKVxcXFwuJyArXG4gICAgICAgICAgICAgICAgICAgJygnICsgc3JjW05VTUVSSUNJREVOVElGSUVSXSArICcpJztcblxudmFyIE1BSU5WRVJTSU9OTE9PU0UgPSBSKys7XG5zcmNbTUFJTlZFUlNJT05MT09TRV0gPSAnKCcgKyBzcmNbTlVNRVJJQ0lERU5USUZJRVJMT09TRV0gKyAnKVxcXFwuJyArXG4gICAgICAgICAgICAgICAgICAgICAgICAnKCcgKyBzcmNbTlVNRVJJQ0lERU5USUZJRVJMT09TRV0gKyAnKVxcXFwuJyArXG4gICAgICAgICAgICAgICAgICAgICAgICAnKCcgKyBzcmNbTlVNRVJJQ0lERU5USUZJRVJMT09TRV0gKyAnKSc7XG5cbi8vICMjIFByZS1yZWxlYXNlIFZlcnNpb24gSWRlbnRpZmllclxuLy8gQSBudW1lcmljIGlkZW50aWZpZXIsIG9yIGEgbm9uLW51bWVyaWMgaWRlbnRpZmllci5cblxudmFyIFBSRVJFTEVBU0VJREVOVElGSUVSID0gUisrO1xuc3JjW1BSRVJFTEVBU0VJREVOVElGSUVSXSA9ICcoPzonICsgc3JjW05VTUVSSUNJREVOVElGSUVSXSArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ3wnICsgc3JjW05PTk5VTUVSSUNJREVOVElGSUVSXSArICcpJztcblxudmFyIFBSRVJFTEVBU0VJREVOVElGSUVSTE9PU0UgPSBSKys7XG5zcmNbUFJFUkVMRUFTRUlERU5USUZJRVJMT09TRV0gPSAnKD86JyArIHNyY1tOVU1FUklDSURFTlRJRklFUkxPT1NFXSArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnfCcgKyBzcmNbTk9OTlVNRVJJQ0lERU5USUZJRVJdICsgJyknO1xuXG5cbi8vICMjIFByZS1yZWxlYXNlIFZlcnNpb25cbi8vIEh5cGhlbiwgZm9sbG93ZWQgYnkgb25lIG9yIG1vcmUgZG90LXNlcGFyYXRlZCBwcmUtcmVsZWFzZSB2ZXJzaW9uXG4vLyBpZGVudGlmaWVycy5cblxudmFyIFBSRVJFTEVBU0UgPSBSKys7XG5zcmNbUFJFUkVMRUFTRV0gPSAnKD86LSgnICsgc3JjW1BSRVJFTEVBU0VJREVOVElGSUVSXSArXG4gICAgICAgICAgICAgICAgICAnKD86XFxcXC4nICsgc3JjW1BSRVJFTEVBU0VJREVOVElGSUVSXSArICcpKikpJztcblxudmFyIFBSRVJFTEVBU0VMT09TRSA9IFIrKztcbnNyY1tQUkVSRUxFQVNFTE9PU0VdID0gJyg/Oi0/KCcgKyBzcmNbUFJFUkVMRUFTRUlERU5USUZJRVJMT09TRV0gK1xuICAgICAgICAgICAgICAgICAgICAgICAnKD86XFxcXC4nICsgc3JjW1BSRVJFTEVBU0VJREVOVElGSUVSTE9PU0VdICsgJykqKSknO1xuXG4vLyAjIyBCdWlsZCBNZXRhZGF0YSBJZGVudGlmaWVyXG4vLyBBbnkgY29tYmluYXRpb24gb2YgZGlnaXRzLCBsZXR0ZXJzLCBvciBoeXBoZW5zLlxuXG52YXIgQlVJTERJREVOVElGSUVSID0gUisrO1xuc3JjW0JVSUxESURFTlRJRklFUl0gPSAnWzAtOUEtWmEtei1dKyc7XG5cbi8vICMjIEJ1aWxkIE1ldGFkYXRhXG4vLyBQbHVzIHNpZ24sIGZvbGxvd2VkIGJ5IG9uZSBvciBtb3JlIHBlcmlvZC1zZXBhcmF0ZWQgYnVpbGQgbWV0YWRhdGFcbi8vIGlkZW50aWZpZXJzLlxuXG52YXIgQlVJTEQgPSBSKys7XG5zcmNbQlVJTERdID0gJyg/OlxcXFwrKCcgKyBzcmNbQlVJTERJREVOVElGSUVSXSArXG4gICAgICAgICAgICAgJyg/OlxcXFwuJyArIHNyY1tCVUlMRElERU5USUZJRVJdICsgJykqKSknO1xuXG5cbi8vICMjIEZ1bGwgVmVyc2lvbiBTdHJpbmdcbi8vIEEgbWFpbiB2ZXJzaW9uLCBmb2xsb3dlZCBvcHRpb25hbGx5IGJ5IGEgcHJlLXJlbGVhc2UgdmVyc2lvbiBhbmRcbi8vIGJ1aWxkIG1ldGFkYXRhLlxuXG4vLyBOb3RlIHRoYXQgdGhlIG9ubHkgbWFqb3IsIG1pbm9yLCBwYXRjaCwgYW5kIHByZS1yZWxlYXNlIHNlY3Rpb25zIG9mXG4vLyB0aGUgdmVyc2lvbiBzdHJpbmcgYXJlIGNhcHR1cmluZyBncm91cHMuICBUaGUgYnVpbGQgbWV0YWRhdGEgaXMgbm90IGFcbi8vIGNhcHR1cmluZyBncm91cCwgYmVjYXVzZSBpdCBzaG91bGQgbm90IGV2ZXIgYmUgdXNlZCBpbiB2ZXJzaW9uXG4vLyBjb21wYXJpc29uLlxuXG52YXIgRlVMTCA9IFIrKztcbnZhciBGVUxMUExBSU4gPSAndj8nICsgc3JjW01BSU5WRVJTSU9OXSArXG4gICAgICAgICAgICAgICAgc3JjW1BSRVJFTEVBU0VdICsgJz8nICtcbiAgICAgICAgICAgICAgICBzcmNbQlVJTERdICsgJz8nO1xuXG5zcmNbRlVMTF0gPSAnXicgKyBGVUxMUExBSU4gKyAnJCc7XG5cbi8vIGxpa2UgZnVsbCwgYnV0IGFsbG93cyB2MS4yLjMgYW5kID0xLjIuMywgd2hpY2ggcGVvcGxlIGRvIHNvbWV0aW1lcy5cbi8vIGFsc28sIDEuMC4wYWxwaGExIChwcmVyZWxlYXNlIHdpdGhvdXQgdGhlIGh5cGhlbikgd2hpY2ggaXMgcHJldHR5XG4vLyBjb21tb24gaW4gdGhlIG5wbSByZWdpc3RyeS5cbnZhciBMT09TRVBMQUlOID0gJ1t2PVxcXFxzXSonICsgc3JjW01BSU5WRVJTSU9OTE9PU0VdICtcbiAgICAgICAgICAgICAgICAgc3JjW1BSRVJFTEVBU0VMT09TRV0gKyAnPycgK1xuICAgICAgICAgICAgICAgICBzcmNbQlVJTERdICsgJz8nO1xuXG52YXIgTE9PU0UgPSBSKys7XG5zcmNbTE9PU0VdID0gJ14nICsgTE9PU0VQTEFJTiArICckJztcblxudmFyIEdUTFQgPSBSKys7XG5zcmNbR1RMVF0gPSAnKCg/Ojx8Pik/PT8pJztcblxuLy8gU29tZXRoaW5nIGxpa2UgXCIyLipcIiBvciBcIjEuMi54XCIuXG4vLyBOb3RlIHRoYXQgXCJ4LnhcIiBpcyBhIHZhbGlkIHhSYW5nZSBpZGVudGlmZXIsIG1lYW5pbmcgXCJhbnkgdmVyc2lvblwiXG4vLyBPbmx5IHRoZSBmaXJzdCBpdGVtIGlzIHN0cmljdGx5IHJlcXVpcmVkLlxudmFyIFhSQU5HRUlERU5USUZJRVJMT09TRSA9IFIrKztcbnNyY1tYUkFOR0VJREVOVElGSUVSTE9PU0VdID0gc3JjW05VTUVSSUNJREVOVElGSUVSTE9PU0VdICsgJ3x4fFh8XFxcXConO1xudmFyIFhSQU5HRUlERU5USUZJRVIgPSBSKys7XG5zcmNbWFJBTkdFSURFTlRJRklFUl0gPSBzcmNbTlVNRVJJQ0lERU5USUZJRVJdICsgJ3x4fFh8XFxcXConO1xuXG52YXIgWFJBTkdFUExBSU4gPSBSKys7XG5zcmNbWFJBTkdFUExBSU5dID0gJ1t2PVxcXFxzXSooJyArIHNyY1tYUkFOR0VJREVOVElGSUVSXSArICcpJyArXG4gICAgICAgICAgICAgICAgICAgJyg/OlxcXFwuKCcgKyBzcmNbWFJBTkdFSURFTlRJRklFUl0gKyAnKScgK1xuICAgICAgICAgICAgICAgICAgICcoPzpcXFxcLignICsgc3JjW1hSQU5HRUlERU5USUZJRVJdICsgJyknICtcbiAgICAgICAgICAgICAgICAgICAnKD86JyArIHNyY1tQUkVSRUxFQVNFXSArICcpPycgK1xuICAgICAgICAgICAgICAgICAgIHNyY1tCVUlMRF0gKyAnPycgK1xuICAgICAgICAgICAgICAgICAgICcpPyk/JztcblxudmFyIFhSQU5HRVBMQUlOTE9PU0UgPSBSKys7XG5zcmNbWFJBTkdFUExBSU5MT09TRV0gPSAnW3Y9XFxcXHNdKignICsgc3JjW1hSQU5HRUlERU5USUZJRVJMT09TRV0gKyAnKScgK1xuICAgICAgICAgICAgICAgICAgICAgICAgJyg/OlxcXFwuKCcgKyBzcmNbWFJBTkdFSURFTlRJRklFUkxPT1NFXSArICcpJyArXG4gICAgICAgICAgICAgICAgICAgICAgICAnKD86XFxcXC4oJyArIHNyY1tYUkFOR0VJREVOVElGSUVSTE9PU0VdICsgJyknICtcbiAgICAgICAgICAgICAgICAgICAgICAgICcoPzonICsgc3JjW1BSRVJFTEVBU0VMT09TRV0gKyAnKT8nICtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNyY1tCVUlMRF0gKyAnPycgK1xuICAgICAgICAgICAgICAgICAgICAgICAgJyk/KT8nO1xuXG52YXIgWFJBTkdFID0gUisrO1xuc3JjW1hSQU5HRV0gPSAnXicgKyBzcmNbR1RMVF0gKyAnXFxcXHMqJyArIHNyY1tYUkFOR0VQTEFJTl0gKyAnJCc7XG52YXIgWFJBTkdFTE9PU0UgPSBSKys7XG5zcmNbWFJBTkdFTE9PU0VdID0gJ14nICsgc3JjW0dUTFRdICsgJ1xcXFxzKicgKyBzcmNbWFJBTkdFUExBSU5MT09TRV0gKyAnJCc7XG5cbi8vIFRpbGRlIHJhbmdlcy5cbi8vIE1lYW5pbmcgaXMgXCJyZWFzb25hYmx5IGF0IG9yIGdyZWF0ZXIgdGhhblwiXG52YXIgTE9ORVRJTERFID0gUisrO1xuc3JjW0xPTkVUSUxERV0gPSAnKD86fj4/KSc7XG5cbnZhciBUSUxERVRSSU0gPSBSKys7XG5zcmNbVElMREVUUklNXSA9ICcoXFxcXHMqKScgKyBzcmNbTE9ORVRJTERFXSArICdcXFxccysnO1xucmVbVElMREVUUklNXSA9IG5ldyBSZWdFeHAoc3JjW1RJTERFVFJJTV0sICdnJyk7XG52YXIgdGlsZGVUcmltUmVwbGFjZSA9ICckMX4nO1xuXG52YXIgVElMREUgPSBSKys7XG5zcmNbVElMREVdID0gJ14nICsgc3JjW0xPTkVUSUxERV0gKyBzcmNbWFJBTkdFUExBSU5dICsgJyQnO1xudmFyIFRJTERFTE9PU0UgPSBSKys7XG5zcmNbVElMREVMT09TRV0gPSAnXicgKyBzcmNbTE9ORVRJTERFXSArIHNyY1tYUkFOR0VQTEFJTkxPT1NFXSArICckJztcblxuLy8gQ2FyZXQgcmFuZ2VzLlxuLy8gTWVhbmluZyBpcyBcImF0IGxlYXN0IGFuZCBiYWNrd2FyZHMgY29tcGF0aWJsZSB3aXRoXCJcbnZhciBMT05FQ0FSRVQgPSBSKys7XG5zcmNbTE9ORUNBUkVUXSA9ICcoPzpcXFxcXiknO1xuXG52YXIgQ0FSRVRUUklNID0gUisrO1xuc3JjW0NBUkVUVFJJTV0gPSAnKFxcXFxzKiknICsgc3JjW0xPTkVDQVJFVF0gKyAnXFxcXHMrJztcbnJlW0NBUkVUVFJJTV0gPSBuZXcgUmVnRXhwKHNyY1tDQVJFVFRSSU1dLCAnZycpO1xudmFyIGNhcmV0VHJpbVJlcGxhY2UgPSAnJDFeJztcblxudmFyIENBUkVUID0gUisrO1xuc3JjW0NBUkVUXSA9ICdeJyArIHNyY1tMT05FQ0FSRVRdICsgc3JjW1hSQU5HRVBMQUlOXSArICckJztcbnZhciBDQVJFVExPT1NFID0gUisrO1xuc3JjW0NBUkVUTE9PU0VdID0gJ14nICsgc3JjW0xPTkVDQVJFVF0gKyBzcmNbWFJBTkdFUExBSU5MT09TRV0gKyAnJCc7XG5cbi8vIEEgc2ltcGxlIGd0L2x0L2VxIHRoaW5nLCBvciBqdXN0IFwiXCIgdG8gaW5kaWNhdGUgXCJhbnkgdmVyc2lvblwiXG52YXIgQ09NUEFSQVRPUkxPT1NFID0gUisrO1xuc3JjW0NPTVBBUkFUT1JMT09TRV0gPSAnXicgKyBzcmNbR1RMVF0gKyAnXFxcXHMqKCcgKyBMT09TRVBMQUlOICsgJykkfF4kJztcbnZhciBDT01QQVJBVE9SID0gUisrO1xuc3JjW0NPTVBBUkFUT1JdID0gJ14nICsgc3JjW0dUTFRdICsgJ1xcXFxzKignICsgRlVMTFBMQUlOICsgJykkfF4kJztcblxuXG4vLyBBbiBleHByZXNzaW9uIHRvIHN0cmlwIGFueSB3aGl0ZXNwYWNlIGJldHdlZW4gdGhlIGd0bHQgYW5kIHRoZSB0aGluZ1xuLy8gaXQgbW9kaWZpZXMsIHNvIHRoYXQgYD4gMS4yLjNgID09PiBgPjEuMi4zYFxudmFyIENPTVBBUkFUT1JUUklNID0gUisrO1xuc3JjW0NPTVBBUkFUT1JUUklNXSA9ICcoXFxcXHMqKScgKyBzcmNbR1RMVF0gK1xuICAgICAgICAgICAgICAgICAgICAgICdcXFxccyooJyArIExPT1NFUExBSU4gKyAnfCcgKyBzcmNbWFJBTkdFUExBSU5dICsgJyknO1xuXG4vLyB0aGlzIG9uZSBoYXMgdG8gdXNlIHRoZSAvZyBmbGFnXG5yZVtDT01QQVJBVE9SVFJJTV0gPSBuZXcgUmVnRXhwKHNyY1tDT01QQVJBVE9SVFJJTV0sICdnJyk7XG52YXIgY29tcGFyYXRvclRyaW1SZXBsYWNlID0gJyQxJDIkMyc7XG5cblxuLy8gU29tZXRoaW5nIGxpa2UgYDEuMi4zIC0gMS4yLjRgXG4vLyBOb3RlIHRoYXQgdGhlc2UgYWxsIHVzZSB0aGUgbG9vc2UgZm9ybSwgYmVjYXVzZSB0aGV5J2xsIGJlXG4vLyBjaGVja2VkIGFnYWluc3QgZWl0aGVyIHRoZSBzdHJpY3Qgb3IgbG9vc2UgY29tcGFyYXRvciBmb3JtXG4vLyBsYXRlci5cbnZhciBIWVBIRU5SQU5HRSA9IFIrKztcbnNyY1tIWVBIRU5SQU5HRV0gPSAnXlxcXFxzKignICsgc3JjW1hSQU5HRVBMQUlOXSArICcpJyArXG4gICAgICAgICAgICAgICAgICAgJ1xcXFxzKy1cXFxccysnICtcbiAgICAgICAgICAgICAgICAgICAnKCcgKyBzcmNbWFJBTkdFUExBSU5dICsgJyknICtcbiAgICAgICAgICAgICAgICAgICAnXFxcXHMqJCc7XG5cbnZhciBIWVBIRU5SQU5HRUxPT1NFID0gUisrO1xuc3JjW0hZUEhFTlJBTkdFTE9PU0VdID0gJ15cXFxccyooJyArIHNyY1tYUkFOR0VQTEFJTkxPT1NFXSArICcpJyArXG4gICAgICAgICAgICAgICAgICAgICAgICAnXFxcXHMrLVxcXFxzKycgK1xuICAgICAgICAgICAgICAgICAgICAgICAgJygnICsgc3JjW1hSQU5HRVBMQUlOTE9PU0VdICsgJyknICtcbiAgICAgICAgICAgICAgICAgICAgICAgICdcXFxccyokJztcblxuLy8gU3RhciByYW5nZXMgYmFzaWNhbGx5IGp1c3QgYWxsb3cgYW55dGhpbmcgYXQgYWxsLlxudmFyIFNUQVIgPSBSKys7XG5zcmNbU1RBUl0gPSAnKDx8Pik/PT9cXFxccypcXFxcKic7XG5cbi8vIENvbXBpbGUgdG8gYWN0dWFsIHJlZ2V4cCBvYmplY3RzLlxuLy8gQWxsIGFyZSBmbGFnLWZyZWUsIHVubGVzcyB0aGV5IHdlcmUgY3JlYXRlZCBhYm92ZSB3aXRoIGEgZmxhZy5cbmZvciAodmFyIGkgPSAwOyBpIDwgUjsgaSsrKSB7XG4gIGRlYnVnKGksIHNyY1tpXSk7XG4gIGlmICghcmVbaV0pXG4gICAgcmVbaV0gPSBuZXcgUmVnRXhwKHNyY1tpXSk7XG59XG5cbmV4cG9ydHMucGFyc2UgPSBwYXJzZTtcbmZ1bmN0aW9uIHBhcnNlKHZlcnNpb24sIGxvb3NlKSB7XG4gIGlmICh2ZXJzaW9uIGluc3RhbmNlb2YgU2VtVmVyKVxuICAgIHJldHVybiB2ZXJzaW9uO1xuXG4gIGlmICh0eXBlb2YgdmVyc2lvbiAhPT0gJ3N0cmluZycpXG4gICAgcmV0dXJuIG51bGw7XG5cbiAgaWYgKHZlcnNpb24ubGVuZ3RoID4gTUFYX0xFTkdUSClcbiAgICByZXR1cm4gbnVsbDtcblxuICB2YXIgciA9IGxvb3NlID8gcmVbTE9PU0VdIDogcmVbRlVMTF07XG4gIGlmICghci50ZXN0KHZlcnNpb24pKVxuICAgIHJldHVybiBudWxsO1xuXG4gIHRyeSB7XG4gICAgcmV0dXJuIG5ldyBTZW1WZXIodmVyc2lvbiwgbG9vc2UpO1xuICB9IGNhdGNoIChlcikge1xuICAgIHJldHVybiBudWxsO1xuICB9XG59XG5cbmV4cG9ydHMudmFsaWQgPSB2YWxpZDtcbmZ1bmN0aW9uIHZhbGlkKHZlcnNpb24sIGxvb3NlKSB7XG4gIHZhciB2ID0gcGFyc2UodmVyc2lvbiwgbG9vc2UpO1xuICByZXR1cm4gdiA/IHYudmVyc2lvbiA6IG51bGw7XG59XG5cblxuZXhwb3J0cy5jbGVhbiA9IGNsZWFuO1xuZnVuY3Rpb24gY2xlYW4odmVyc2lvbiwgbG9vc2UpIHtcbiAgdmFyIHMgPSBwYXJzZSh2ZXJzaW9uLnRyaW0oKS5yZXBsYWNlKC9eWz12XSsvLCAnJyksIGxvb3NlKTtcbiAgcmV0dXJuIHMgPyBzLnZlcnNpb24gOiBudWxsO1xufVxuXG5leHBvcnRzLlNlbVZlciA9IFNlbVZlcjtcblxuZnVuY3Rpb24gU2VtVmVyKHZlcnNpb24sIGxvb3NlKSB7XG4gIGlmICh2ZXJzaW9uIGluc3RhbmNlb2YgU2VtVmVyKSB7XG4gICAgaWYgKHZlcnNpb24ubG9vc2UgPT09IGxvb3NlKVxuICAgICAgcmV0dXJuIHZlcnNpb247XG4gICAgZWxzZVxuICAgICAgdmVyc2lvbiA9IHZlcnNpb24udmVyc2lvbjtcbiAgfSBlbHNlIGlmICh0eXBlb2YgdmVyc2lvbiAhPT0gJ3N0cmluZycpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdJbnZhbGlkIFZlcnNpb246ICcgKyB2ZXJzaW9uKTtcbiAgfVxuXG4gIGlmICh2ZXJzaW9uLmxlbmd0aCA+IE1BWF9MRU5HVEgpXG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcigndmVyc2lvbiBpcyBsb25nZXIgdGhhbiAnICsgTUFYX0xFTkdUSCArICcgY2hhcmFjdGVycycpXG5cbiAgaWYgKCEodGhpcyBpbnN0YW5jZW9mIFNlbVZlcikpXG4gICAgcmV0dXJuIG5ldyBTZW1WZXIodmVyc2lvbiwgbG9vc2UpO1xuXG4gIGRlYnVnKCdTZW1WZXInLCB2ZXJzaW9uLCBsb29zZSk7XG4gIHRoaXMubG9vc2UgPSBsb29zZTtcbiAgdmFyIG0gPSB2ZXJzaW9uLnRyaW0oKS5tYXRjaChsb29zZSA/IHJlW0xPT1NFXSA6IHJlW0ZVTExdKTtcblxuICBpZiAoIW0pXG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignSW52YWxpZCBWZXJzaW9uOiAnICsgdmVyc2lvbik7XG5cbiAgdGhpcy5yYXcgPSB2ZXJzaW9uO1xuXG4gIC8vIHRoZXNlIGFyZSBhY3R1YWxseSBudW1iZXJzXG4gIHRoaXMubWFqb3IgPSArbVsxXTtcbiAgdGhpcy5taW5vciA9ICttWzJdO1xuICB0aGlzLnBhdGNoID0gK21bM107XG5cbiAgaWYgKHRoaXMubWFqb3IgPiBNQVhfU0FGRV9JTlRFR0VSIHx8IHRoaXMubWFqb3IgPCAwKVxuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0ludmFsaWQgbWFqb3IgdmVyc2lvbicpXG5cbiAgaWYgKHRoaXMubWlub3IgPiBNQVhfU0FGRV9JTlRFR0VSIHx8IHRoaXMubWlub3IgPCAwKVxuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0ludmFsaWQgbWlub3IgdmVyc2lvbicpXG5cbiAgaWYgKHRoaXMucGF0Y2ggPiBNQVhfU0FGRV9JTlRFR0VSIHx8IHRoaXMucGF0Y2ggPCAwKVxuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0ludmFsaWQgcGF0Y2ggdmVyc2lvbicpXG5cbiAgLy8gbnVtYmVyaWZ5IGFueSBwcmVyZWxlYXNlIG51bWVyaWMgaWRzXG4gIGlmICghbVs0XSlcbiAgICB0aGlzLnByZXJlbGVhc2UgPSBbXTtcbiAgZWxzZVxuICAgIHRoaXMucHJlcmVsZWFzZSA9IG1bNF0uc3BsaXQoJy4nKS5tYXAoZnVuY3Rpb24oaWQpIHtcbiAgICAgIGlmICgvXlswLTldKyQvLnRlc3QoaWQpKSB7XG4gICAgICAgIHZhciBudW0gPSAraWQ7XG4gICAgICAgIGlmIChudW0gPj0gMCAmJiBudW0gPCBNQVhfU0FGRV9JTlRFR0VSKVxuICAgICAgICAgIHJldHVybiBudW07XG4gICAgICB9XG4gICAgICByZXR1cm4gaWQ7XG4gICAgfSk7XG5cbiAgdGhpcy5idWlsZCA9IG1bNV0gPyBtWzVdLnNwbGl0KCcuJykgOiBbXTtcbiAgdGhpcy5mb3JtYXQoKTtcbn1cblxuU2VtVmVyLnByb3RvdHlwZS5mb3JtYXQgPSBmdW5jdGlvbigpIHtcbiAgdGhpcy52ZXJzaW9uID0gdGhpcy5tYWpvciArICcuJyArIHRoaXMubWlub3IgKyAnLicgKyB0aGlzLnBhdGNoO1xuICBpZiAodGhpcy5wcmVyZWxlYXNlLmxlbmd0aClcbiAgICB0aGlzLnZlcnNpb24gKz0gJy0nICsgdGhpcy5wcmVyZWxlYXNlLmpvaW4oJy4nKTtcbiAgcmV0dXJuIHRoaXMudmVyc2lvbjtcbn07XG5cblNlbVZlci5wcm90b3R5cGUudG9TdHJpbmcgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIHRoaXMudmVyc2lvbjtcbn07XG5cblNlbVZlci5wcm90b3R5cGUuY29tcGFyZSA9IGZ1bmN0aW9uKG90aGVyKSB7XG4gIGRlYnVnKCdTZW1WZXIuY29tcGFyZScsIHRoaXMudmVyc2lvbiwgdGhpcy5sb29zZSwgb3RoZXIpO1xuICBpZiAoIShvdGhlciBpbnN0YW5jZW9mIFNlbVZlcikpXG4gICAgb3RoZXIgPSBuZXcgU2VtVmVyKG90aGVyLCB0aGlzLmxvb3NlKTtcblxuICByZXR1cm4gdGhpcy5jb21wYXJlTWFpbihvdGhlcikgfHwgdGhpcy5jb21wYXJlUHJlKG90aGVyKTtcbn07XG5cblNlbVZlci5wcm90b3R5cGUuY29tcGFyZU1haW4gPSBmdW5jdGlvbihvdGhlcikge1xuICBpZiAoIShvdGhlciBpbnN0YW5jZW9mIFNlbVZlcikpXG4gICAgb3RoZXIgPSBuZXcgU2VtVmVyKG90aGVyLCB0aGlzLmxvb3NlKTtcblxuICByZXR1cm4gY29tcGFyZUlkZW50aWZpZXJzKHRoaXMubWFqb3IsIG90aGVyLm1ham9yKSB8fFxuICAgICAgICAgY29tcGFyZUlkZW50aWZpZXJzKHRoaXMubWlub3IsIG90aGVyLm1pbm9yKSB8fFxuICAgICAgICAgY29tcGFyZUlkZW50aWZpZXJzKHRoaXMucGF0Y2gsIG90aGVyLnBhdGNoKTtcbn07XG5cblNlbVZlci5wcm90b3R5cGUuY29tcGFyZVByZSA9IGZ1bmN0aW9uKG90aGVyKSB7XG4gIGlmICghKG90aGVyIGluc3RhbmNlb2YgU2VtVmVyKSlcbiAgICBvdGhlciA9IG5ldyBTZW1WZXIob3RoZXIsIHRoaXMubG9vc2UpO1xuXG4gIC8vIE5PVCBoYXZpbmcgYSBwcmVyZWxlYXNlIGlzID4gaGF2aW5nIG9uZVxuICBpZiAodGhpcy5wcmVyZWxlYXNlLmxlbmd0aCAmJiAhb3RoZXIucHJlcmVsZWFzZS5sZW5ndGgpXG4gICAgcmV0dXJuIC0xO1xuICBlbHNlIGlmICghdGhpcy5wcmVyZWxlYXNlLmxlbmd0aCAmJiBvdGhlci5wcmVyZWxlYXNlLmxlbmd0aClcbiAgICByZXR1cm4gMTtcbiAgZWxzZSBpZiAoIXRoaXMucHJlcmVsZWFzZS5sZW5ndGggJiYgIW90aGVyLnByZXJlbGVhc2UubGVuZ3RoKVxuICAgIHJldHVybiAwO1xuXG4gIHZhciBpID0gMDtcbiAgZG8ge1xuICAgIHZhciBhID0gdGhpcy5wcmVyZWxlYXNlW2ldO1xuICAgIHZhciBiID0gb3RoZXIucHJlcmVsZWFzZVtpXTtcbiAgICBkZWJ1ZygncHJlcmVsZWFzZSBjb21wYXJlJywgaSwgYSwgYik7XG4gICAgaWYgKGEgPT09IHVuZGVmaW5lZCAmJiBiID09PSB1bmRlZmluZWQpXG4gICAgICByZXR1cm4gMDtcbiAgICBlbHNlIGlmIChiID09PSB1bmRlZmluZWQpXG4gICAgICByZXR1cm4gMTtcbiAgICBlbHNlIGlmIChhID09PSB1bmRlZmluZWQpXG4gICAgICByZXR1cm4gLTE7XG4gICAgZWxzZSBpZiAoYSA9PT0gYilcbiAgICAgIGNvbnRpbnVlO1xuICAgIGVsc2VcbiAgICAgIHJldHVybiBjb21wYXJlSWRlbnRpZmllcnMoYSwgYik7XG4gIH0gd2hpbGUgKCsraSk7XG59O1xuXG4vLyBwcmVtaW5vciB3aWxsIGJ1bXAgdGhlIHZlcnNpb24gdXAgdG8gdGhlIG5leHQgbWlub3IgcmVsZWFzZSwgYW5kIGltbWVkaWF0ZWx5XG4vLyBkb3duIHRvIHByZS1yZWxlYXNlLiBwcmVtYWpvciBhbmQgcHJlcGF0Y2ggd29yayB0aGUgc2FtZSB3YXkuXG5TZW1WZXIucHJvdG90eXBlLmluYyA9IGZ1bmN0aW9uKHJlbGVhc2UsIGlkZW50aWZpZXIpIHtcbiAgc3dpdGNoIChyZWxlYXNlKSB7XG4gICAgY2FzZSAncHJlbWFqb3InOlxuICAgICAgdGhpcy5wcmVyZWxlYXNlLmxlbmd0aCA9IDA7XG4gICAgICB0aGlzLnBhdGNoID0gMDtcbiAgICAgIHRoaXMubWlub3IgPSAwO1xuICAgICAgdGhpcy5tYWpvcisrO1xuICAgICAgdGhpcy5pbmMoJ3ByZScsIGlkZW50aWZpZXIpO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSAncHJlbWlub3InOlxuICAgICAgdGhpcy5wcmVyZWxlYXNlLmxlbmd0aCA9IDA7XG4gICAgICB0aGlzLnBhdGNoID0gMDtcbiAgICAgIHRoaXMubWlub3IrKztcbiAgICAgIHRoaXMuaW5jKCdwcmUnLCBpZGVudGlmaWVyKTtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgJ3ByZXBhdGNoJzpcbiAgICAgIC8vIElmIHRoaXMgaXMgYWxyZWFkeSBhIHByZXJlbGVhc2UsIGl0IHdpbGwgYnVtcCB0byB0aGUgbmV4dCB2ZXJzaW9uXG4gICAgICAvLyBkcm9wIGFueSBwcmVyZWxlYXNlcyB0aGF0IG1pZ2h0IGFscmVhZHkgZXhpc3QsIHNpbmNlIHRoZXkgYXJlIG5vdFxuICAgICAgLy8gcmVsZXZhbnQgYXQgdGhpcyBwb2ludC5cbiAgICAgIHRoaXMucHJlcmVsZWFzZS5sZW5ndGggPSAwO1xuICAgICAgdGhpcy5pbmMoJ3BhdGNoJywgaWRlbnRpZmllcik7XG4gICAgICB0aGlzLmluYygncHJlJywgaWRlbnRpZmllcik7XG4gICAgICBicmVhaztcbiAgICAvLyBJZiB0aGUgaW5wdXQgaXMgYSBub24tcHJlcmVsZWFzZSB2ZXJzaW9uLCB0aGlzIGFjdHMgdGhlIHNhbWUgYXNcbiAgICAvLyBwcmVwYXRjaC5cbiAgICBjYXNlICdwcmVyZWxlYXNlJzpcbiAgICAgIGlmICh0aGlzLnByZXJlbGVhc2UubGVuZ3RoID09PSAwKVxuICAgICAgICB0aGlzLmluYygncGF0Y2gnLCBpZGVudGlmaWVyKTtcbiAgICAgIHRoaXMuaW5jKCdwcmUnLCBpZGVudGlmaWVyKTtcbiAgICAgIGJyZWFrO1xuXG4gICAgY2FzZSAnbWFqb3InOlxuICAgICAgLy8gSWYgdGhpcyBpcyBhIHByZS1tYWpvciB2ZXJzaW9uLCBidW1wIHVwIHRvIHRoZSBzYW1lIG1ham9yIHZlcnNpb24uXG4gICAgICAvLyBPdGhlcndpc2UgaW5jcmVtZW50IG1ham9yLlxuICAgICAgLy8gMS4wLjAtNSBidW1wcyB0byAxLjAuMFxuICAgICAgLy8gMS4xLjAgYnVtcHMgdG8gMi4wLjBcbiAgICAgIGlmICh0aGlzLm1pbm9yICE9PSAwIHx8IHRoaXMucGF0Y2ggIT09IDAgfHwgdGhpcy5wcmVyZWxlYXNlLmxlbmd0aCA9PT0gMClcbiAgICAgICAgdGhpcy5tYWpvcisrO1xuICAgICAgdGhpcy5taW5vciA9IDA7XG4gICAgICB0aGlzLnBhdGNoID0gMDtcbiAgICAgIHRoaXMucHJlcmVsZWFzZSA9IFtdO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSAnbWlub3InOlxuICAgICAgLy8gSWYgdGhpcyBpcyBhIHByZS1taW5vciB2ZXJzaW9uLCBidW1wIHVwIHRvIHRoZSBzYW1lIG1pbm9yIHZlcnNpb24uXG4gICAgICAvLyBPdGhlcndpc2UgaW5jcmVtZW50IG1pbm9yLlxuICAgICAgLy8gMS4yLjAtNSBidW1wcyB0byAxLjIuMFxuICAgICAgLy8gMS4yLjEgYnVtcHMgdG8gMS4zLjBcbiAgICAgIGlmICh0aGlzLnBhdGNoICE9PSAwIHx8IHRoaXMucHJlcmVsZWFzZS5sZW5ndGggPT09IDApXG4gICAgICAgIHRoaXMubWlub3IrKztcbiAgICAgIHRoaXMucGF0Y2ggPSAwO1xuICAgICAgdGhpcy5wcmVyZWxlYXNlID0gW107XG4gICAgICBicmVhaztcbiAgICBjYXNlICdwYXRjaCc6XG4gICAgICAvLyBJZiB0aGlzIGlzIG5vdCBhIHByZS1yZWxlYXNlIHZlcnNpb24sIGl0IHdpbGwgaW5jcmVtZW50IHRoZSBwYXRjaC5cbiAgICAgIC8vIElmIGl0IGlzIGEgcHJlLXJlbGVhc2UgaXQgd2lsbCBidW1wIHVwIHRvIHRoZSBzYW1lIHBhdGNoIHZlcnNpb24uXG4gICAgICAvLyAxLjIuMC01IHBhdGNoZXMgdG8gMS4yLjBcbiAgICAgIC8vIDEuMi4wIHBhdGNoZXMgdG8gMS4yLjFcbiAgICAgIGlmICh0aGlzLnByZXJlbGVhc2UubGVuZ3RoID09PSAwKVxuICAgICAgICB0aGlzLnBhdGNoKys7XG4gICAgICB0aGlzLnByZXJlbGVhc2UgPSBbXTtcbiAgICAgIGJyZWFrO1xuICAgIC8vIFRoaXMgcHJvYmFibHkgc2hvdWxkbid0IGJlIHVzZWQgcHVibGljbHkuXG4gICAgLy8gMS4wLjAgXCJwcmVcIiB3b3VsZCBiZWNvbWUgMS4wLjAtMCB3aGljaCBpcyB0aGUgd3JvbmcgZGlyZWN0aW9uLlxuICAgIGNhc2UgJ3ByZSc6XG4gICAgICBpZiAodGhpcy5wcmVyZWxlYXNlLmxlbmd0aCA9PT0gMClcbiAgICAgICAgdGhpcy5wcmVyZWxlYXNlID0gWzBdO1xuICAgICAgZWxzZSB7XG4gICAgICAgIHZhciBpID0gdGhpcy5wcmVyZWxlYXNlLmxlbmd0aDtcbiAgICAgICAgd2hpbGUgKC0taSA+PSAwKSB7XG4gICAgICAgICAgaWYgKHR5cGVvZiB0aGlzLnByZXJlbGVhc2VbaV0gPT09ICdudW1iZXInKSB7XG4gICAgICAgICAgICB0aGlzLnByZXJlbGVhc2VbaV0rKztcbiAgICAgICAgICAgIGkgPSAtMjtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGkgPT09IC0xKSAvLyBkaWRuJ3QgaW5jcmVtZW50IGFueXRoaW5nXG4gICAgICAgICAgdGhpcy5wcmVyZWxlYXNlLnB1c2goMCk7XG4gICAgICB9XG4gICAgICBpZiAoaWRlbnRpZmllcikge1xuICAgICAgICAvLyAxLjIuMC1iZXRhLjEgYnVtcHMgdG8gMS4yLjAtYmV0YS4yLFxuICAgICAgICAvLyAxLjIuMC1iZXRhLmZvb2JseiBvciAxLjIuMC1iZXRhIGJ1bXBzIHRvIDEuMi4wLWJldGEuMFxuICAgICAgICBpZiAodGhpcy5wcmVyZWxlYXNlWzBdID09PSBpZGVudGlmaWVyKSB7XG4gICAgICAgICAgaWYgKGlzTmFOKHRoaXMucHJlcmVsZWFzZVsxXSkpXG4gICAgICAgICAgICB0aGlzLnByZXJlbGVhc2UgPSBbaWRlbnRpZmllciwgMF07XG4gICAgICAgIH0gZWxzZVxuICAgICAgICAgIHRoaXMucHJlcmVsZWFzZSA9IFtpZGVudGlmaWVyLCAwXTtcbiAgICAgIH1cbiAgICAgIGJyZWFrO1xuXG4gICAgZGVmYXVsdDpcbiAgICAgIHRocm93IG5ldyBFcnJvcignaW52YWxpZCBpbmNyZW1lbnQgYXJndW1lbnQ6ICcgKyByZWxlYXNlKTtcbiAgfVxuICB0aGlzLmZvcm1hdCgpO1xuICB0aGlzLnJhdyA9IHRoaXMudmVyc2lvbjtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG5leHBvcnRzLmluYyA9IGluYztcbmZ1bmN0aW9uIGluYyh2ZXJzaW9uLCByZWxlYXNlLCBsb29zZSwgaWRlbnRpZmllcikge1xuICBpZiAodHlwZW9mKGxvb3NlKSA9PT0gJ3N0cmluZycpIHtcbiAgICBpZGVudGlmaWVyID0gbG9vc2U7XG4gICAgbG9vc2UgPSB1bmRlZmluZWQ7XG4gIH1cblxuICB0cnkge1xuICAgIHJldHVybiBuZXcgU2VtVmVyKHZlcnNpb24sIGxvb3NlKS5pbmMocmVsZWFzZSwgaWRlbnRpZmllcikudmVyc2lvbjtcbiAgfSBjYXRjaCAoZXIpIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxufVxuXG5leHBvcnRzLmRpZmYgPSBkaWZmO1xuZnVuY3Rpb24gZGlmZih2ZXJzaW9uMSwgdmVyc2lvbjIpIHtcbiAgaWYgKGVxKHZlcnNpb24xLCB2ZXJzaW9uMikpIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfSBlbHNlIHtcbiAgICB2YXIgdjEgPSBwYXJzZSh2ZXJzaW9uMSk7XG4gICAgdmFyIHYyID0gcGFyc2UodmVyc2lvbjIpO1xuICAgIGlmICh2MS5wcmVyZWxlYXNlLmxlbmd0aCB8fCB2Mi5wcmVyZWxlYXNlLmxlbmd0aCkge1xuICAgICAgZm9yICh2YXIga2V5IGluIHYxKSB7XG4gICAgICAgIGlmIChrZXkgPT09ICdtYWpvcicgfHwga2V5ID09PSAnbWlub3InIHx8IGtleSA9PT0gJ3BhdGNoJykge1xuICAgICAgICAgIGlmICh2MVtrZXldICE9PSB2MltrZXldKSB7XG4gICAgICAgICAgICByZXR1cm4gJ3ByZScra2V5O1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuICdwcmVyZWxlYXNlJztcbiAgICB9XG4gICAgZm9yICh2YXIga2V5IGluIHYxKSB7XG4gICAgICBpZiAoa2V5ID09PSAnbWFqb3InIHx8IGtleSA9PT0gJ21pbm9yJyB8fCBrZXkgPT09ICdwYXRjaCcpIHtcbiAgICAgICAgaWYgKHYxW2tleV0gIT09IHYyW2tleV0pIHtcbiAgICAgICAgICByZXR1cm4ga2V5O1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cbmV4cG9ydHMuY29tcGFyZUlkZW50aWZpZXJzID0gY29tcGFyZUlkZW50aWZpZXJzO1xuXG52YXIgbnVtZXJpYyA9IC9eWzAtOV0rJC87XG5mdW5jdGlvbiBjb21wYXJlSWRlbnRpZmllcnMoYSwgYikge1xuICB2YXIgYW51bSA9IG51bWVyaWMudGVzdChhKTtcbiAgdmFyIGJudW0gPSBudW1lcmljLnRlc3QoYik7XG5cbiAgaWYgKGFudW0gJiYgYm51bSkge1xuICAgIGEgPSArYTtcbiAgICBiID0gK2I7XG4gIH1cblxuICByZXR1cm4gKGFudW0gJiYgIWJudW0pID8gLTEgOlxuICAgICAgICAgKGJudW0gJiYgIWFudW0pID8gMSA6XG4gICAgICAgICBhIDwgYiA/IC0xIDpcbiAgICAgICAgIGEgPiBiID8gMSA6XG4gICAgICAgICAwO1xufVxuXG5leHBvcnRzLnJjb21wYXJlSWRlbnRpZmllcnMgPSByY29tcGFyZUlkZW50aWZpZXJzO1xuZnVuY3Rpb24gcmNvbXBhcmVJZGVudGlmaWVycyhhLCBiKSB7XG4gIHJldHVybiBjb21wYXJlSWRlbnRpZmllcnMoYiwgYSk7XG59XG5cbmV4cG9ydHMubWFqb3IgPSBtYWpvcjtcbmZ1bmN0aW9uIG1ham9yKGEsIGxvb3NlKSB7XG4gIHJldHVybiBuZXcgU2VtVmVyKGEsIGxvb3NlKS5tYWpvcjtcbn1cblxuZXhwb3J0cy5taW5vciA9IG1pbm9yO1xuZnVuY3Rpb24gbWlub3IoYSwgbG9vc2UpIHtcbiAgcmV0dXJuIG5ldyBTZW1WZXIoYSwgbG9vc2UpLm1pbm9yO1xufVxuXG5leHBvcnRzLnBhdGNoID0gcGF0Y2g7XG5mdW5jdGlvbiBwYXRjaChhLCBsb29zZSkge1xuICByZXR1cm4gbmV3IFNlbVZlcihhLCBsb29zZSkucGF0Y2g7XG59XG5cbmV4cG9ydHMuY29tcGFyZSA9IGNvbXBhcmU7XG5mdW5jdGlvbiBjb21wYXJlKGEsIGIsIGxvb3NlKSB7XG4gIHJldHVybiBuZXcgU2VtVmVyKGEsIGxvb3NlKS5jb21wYXJlKGIpO1xufVxuXG5leHBvcnRzLmNvbXBhcmVMb29zZSA9IGNvbXBhcmVMb29zZTtcbmZ1bmN0aW9uIGNvbXBhcmVMb29zZShhLCBiKSB7XG4gIHJldHVybiBjb21wYXJlKGEsIGIsIHRydWUpO1xufVxuXG5leHBvcnRzLnJjb21wYXJlID0gcmNvbXBhcmU7XG5mdW5jdGlvbiByY29tcGFyZShhLCBiLCBsb29zZSkge1xuICByZXR1cm4gY29tcGFyZShiLCBhLCBsb29zZSk7XG59XG5cbmV4cG9ydHMuc29ydCA9IHNvcnQ7XG5mdW5jdGlvbiBzb3J0KGxpc3QsIGxvb3NlKSB7XG4gIHJldHVybiBsaXN0LnNvcnQoZnVuY3Rpb24oYSwgYikge1xuICAgIHJldHVybiBleHBvcnRzLmNvbXBhcmUoYSwgYiwgbG9vc2UpO1xuICB9KTtcbn1cblxuZXhwb3J0cy5yc29ydCA9IHJzb3J0O1xuZnVuY3Rpb24gcnNvcnQobGlzdCwgbG9vc2UpIHtcbiAgcmV0dXJuIGxpc3Quc29ydChmdW5jdGlvbihhLCBiKSB7XG4gICAgcmV0dXJuIGV4cG9ydHMucmNvbXBhcmUoYSwgYiwgbG9vc2UpO1xuICB9KTtcbn1cblxuZXhwb3J0cy5ndCA9IGd0O1xuZnVuY3Rpb24gZ3QoYSwgYiwgbG9vc2UpIHtcbiAgcmV0dXJuIGNvbXBhcmUoYSwgYiwgbG9vc2UpID4gMDtcbn1cblxuZXhwb3J0cy5sdCA9IGx0O1xuZnVuY3Rpb24gbHQoYSwgYiwgbG9vc2UpIHtcbiAgcmV0dXJuIGNvbXBhcmUoYSwgYiwgbG9vc2UpIDwgMDtcbn1cblxuZXhwb3J0cy5lcSA9IGVxO1xuZnVuY3Rpb24gZXEoYSwgYiwgbG9vc2UpIHtcbiAgcmV0dXJuIGNvbXBhcmUoYSwgYiwgbG9vc2UpID09PSAwO1xufVxuXG5leHBvcnRzLm5lcSA9IG5lcTtcbmZ1bmN0aW9uIG5lcShhLCBiLCBsb29zZSkge1xuICByZXR1cm4gY29tcGFyZShhLCBiLCBsb29zZSkgIT09IDA7XG59XG5cbmV4cG9ydHMuZ3RlID0gZ3RlO1xuZnVuY3Rpb24gZ3RlKGEsIGIsIGxvb3NlKSB7XG4gIHJldHVybiBjb21wYXJlKGEsIGIsIGxvb3NlKSA+PSAwO1xufVxuXG5leHBvcnRzLmx0ZSA9IGx0ZTtcbmZ1bmN0aW9uIGx0ZShhLCBiLCBsb29zZSkge1xuICByZXR1cm4gY29tcGFyZShhLCBiLCBsb29zZSkgPD0gMDtcbn1cblxuZXhwb3J0cy5jbXAgPSBjbXA7XG5mdW5jdGlvbiBjbXAoYSwgb3AsIGIsIGxvb3NlKSB7XG4gIHZhciByZXQ7XG4gIHN3aXRjaCAob3ApIHtcbiAgICBjYXNlICc9PT0nOlxuICAgICAgaWYgKHR5cGVvZiBhID09PSAnb2JqZWN0JykgYSA9IGEudmVyc2lvbjtcbiAgICAgIGlmICh0eXBlb2YgYiA9PT0gJ29iamVjdCcpIGIgPSBiLnZlcnNpb247XG4gICAgICByZXQgPSBhID09PSBiO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSAnIT09JzpcbiAgICAgIGlmICh0eXBlb2YgYSA9PT0gJ29iamVjdCcpIGEgPSBhLnZlcnNpb247XG4gICAgICBpZiAodHlwZW9mIGIgPT09ICdvYmplY3QnKSBiID0gYi52ZXJzaW9uO1xuICAgICAgcmV0ID0gYSAhPT0gYjtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgJyc6IGNhc2UgJz0nOiBjYXNlICc9PSc6IHJldCA9IGVxKGEsIGIsIGxvb3NlKTsgYnJlYWs7XG4gICAgY2FzZSAnIT0nOiByZXQgPSBuZXEoYSwgYiwgbG9vc2UpOyBicmVhaztcbiAgICBjYXNlICc+JzogcmV0ID0gZ3QoYSwgYiwgbG9vc2UpOyBicmVhaztcbiAgICBjYXNlICc+PSc6IHJldCA9IGd0ZShhLCBiLCBsb29zZSk7IGJyZWFrO1xuICAgIGNhc2UgJzwnOiByZXQgPSBsdChhLCBiLCBsb29zZSk7IGJyZWFrO1xuICAgIGNhc2UgJzw9JzogcmV0ID0gbHRlKGEsIGIsIGxvb3NlKTsgYnJlYWs7XG4gICAgZGVmYXVsdDogdGhyb3cgbmV3IFR5cGVFcnJvcignSW52YWxpZCBvcGVyYXRvcjogJyArIG9wKTtcbiAgfVxuICByZXR1cm4gcmV0O1xufVxuXG5leHBvcnRzLkNvbXBhcmF0b3IgPSBDb21wYXJhdG9yO1xuZnVuY3Rpb24gQ29tcGFyYXRvcihjb21wLCBsb29zZSkge1xuICBpZiAoY29tcCBpbnN0YW5jZW9mIENvbXBhcmF0b3IpIHtcbiAgICBpZiAoY29tcC5sb29zZSA9PT0gbG9vc2UpXG4gICAgICByZXR1cm4gY29tcDtcbiAgICBlbHNlXG4gICAgICBjb21wID0gY29tcC52YWx1ZTtcbiAgfVxuXG4gIGlmICghKHRoaXMgaW5zdGFuY2VvZiBDb21wYXJhdG9yKSlcbiAgICByZXR1cm4gbmV3IENvbXBhcmF0b3IoY29tcCwgbG9vc2UpO1xuXG4gIGRlYnVnKCdjb21wYXJhdG9yJywgY29tcCwgbG9vc2UpO1xuICB0aGlzLmxvb3NlID0gbG9vc2U7XG4gIHRoaXMucGFyc2UoY29tcCk7XG5cbiAgaWYgKHRoaXMuc2VtdmVyID09PSBBTlkpXG4gICAgdGhpcy52YWx1ZSA9ICcnO1xuICBlbHNlXG4gICAgdGhpcy52YWx1ZSA9IHRoaXMub3BlcmF0b3IgKyB0aGlzLnNlbXZlci52ZXJzaW9uO1xuXG4gIGRlYnVnKCdjb21wJywgdGhpcyk7XG59XG5cbnZhciBBTlkgPSB7fTtcbkNvbXBhcmF0b3IucHJvdG90eXBlLnBhcnNlID0gZnVuY3Rpb24oY29tcCkge1xuICB2YXIgciA9IHRoaXMubG9vc2UgPyByZVtDT01QQVJBVE9STE9PU0VdIDogcmVbQ09NUEFSQVRPUl07XG4gIHZhciBtID0gY29tcC5tYXRjaChyKTtcblxuICBpZiAoIW0pXG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignSW52YWxpZCBjb21wYXJhdG9yOiAnICsgY29tcCk7XG5cbiAgdGhpcy5vcGVyYXRvciA9IG1bMV07XG4gIGlmICh0aGlzLm9wZXJhdG9yID09PSAnPScpXG4gICAgdGhpcy5vcGVyYXRvciA9ICcnO1xuXG4gIC8vIGlmIGl0IGxpdGVyYWxseSBpcyBqdXN0ICc+JyBvciAnJyB0aGVuIGFsbG93IGFueXRoaW5nLlxuICBpZiAoIW1bMl0pXG4gICAgdGhpcy5zZW12ZXIgPSBBTlk7XG4gIGVsc2VcbiAgICB0aGlzLnNlbXZlciA9IG5ldyBTZW1WZXIobVsyXSwgdGhpcy5sb29zZSk7XG59O1xuXG5Db21wYXJhdG9yLnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gdGhpcy52YWx1ZTtcbn07XG5cbkNvbXBhcmF0b3IucHJvdG90eXBlLnRlc3QgPSBmdW5jdGlvbih2ZXJzaW9uKSB7XG4gIGRlYnVnKCdDb21wYXJhdG9yLnRlc3QnLCB2ZXJzaW9uLCB0aGlzLmxvb3NlKTtcblxuICBpZiAodGhpcy5zZW12ZXIgPT09IEFOWSlcbiAgICByZXR1cm4gdHJ1ZTtcblxuICBpZiAodHlwZW9mIHZlcnNpb24gPT09ICdzdHJpbmcnKVxuICAgIHZlcnNpb24gPSBuZXcgU2VtVmVyKHZlcnNpb24sIHRoaXMubG9vc2UpO1xuXG4gIHJldHVybiBjbXAodmVyc2lvbiwgdGhpcy5vcGVyYXRvciwgdGhpcy5zZW12ZXIsIHRoaXMubG9vc2UpO1xufTtcblxuXG5leHBvcnRzLlJhbmdlID0gUmFuZ2U7XG5mdW5jdGlvbiBSYW5nZShyYW5nZSwgbG9vc2UpIHtcbiAgaWYgKChyYW5nZSBpbnN0YW5jZW9mIFJhbmdlKSAmJiByYW5nZS5sb29zZSA9PT0gbG9vc2UpXG4gICAgcmV0dXJuIHJhbmdlO1xuXG4gIGlmICghKHRoaXMgaW5zdGFuY2VvZiBSYW5nZSkpXG4gICAgcmV0dXJuIG5ldyBSYW5nZShyYW5nZSwgbG9vc2UpO1xuXG4gIHRoaXMubG9vc2UgPSBsb29zZTtcblxuICAvLyBGaXJzdCwgc3BsaXQgYmFzZWQgb24gYm9vbGVhbiBvciB8fFxuICB0aGlzLnJhdyA9IHJhbmdlO1xuICB0aGlzLnNldCA9IHJhbmdlLnNwbGl0KC9cXHMqXFx8XFx8XFxzKi8pLm1hcChmdW5jdGlvbihyYW5nZSkge1xuICAgIHJldHVybiB0aGlzLnBhcnNlUmFuZ2UocmFuZ2UudHJpbSgpKTtcbiAgfSwgdGhpcykuZmlsdGVyKGZ1bmN0aW9uKGMpIHtcbiAgICAvLyB0aHJvdyBvdXQgYW55IHRoYXQgYXJlIG5vdCByZWxldmFudCBmb3Igd2hhdGV2ZXIgcmVhc29uXG4gICAgcmV0dXJuIGMubGVuZ3RoO1xuICB9KTtcblxuICBpZiAoIXRoaXMuc2V0Lmxlbmd0aCkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0ludmFsaWQgU2VtVmVyIFJhbmdlOiAnICsgcmFuZ2UpO1xuICB9XG5cbiAgdGhpcy5mb3JtYXQoKTtcbn1cblxuUmFuZ2UucHJvdG90eXBlLmZvcm1hdCA9IGZ1bmN0aW9uKCkge1xuICB0aGlzLnJhbmdlID0gdGhpcy5zZXQubWFwKGZ1bmN0aW9uKGNvbXBzKSB7XG4gICAgcmV0dXJuIGNvbXBzLmpvaW4oJyAnKS50cmltKCk7XG4gIH0pLmpvaW4oJ3x8JykudHJpbSgpO1xuICByZXR1cm4gdGhpcy5yYW5nZTtcbn07XG5cblJhbmdlLnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gdGhpcy5yYW5nZTtcbn07XG5cblJhbmdlLnByb3RvdHlwZS5wYXJzZVJhbmdlID0gZnVuY3Rpb24ocmFuZ2UpIHtcbiAgdmFyIGxvb3NlID0gdGhpcy5sb29zZTtcbiAgcmFuZ2UgPSByYW5nZS50cmltKCk7XG4gIGRlYnVnKCdyYW5nZScsIHJhbmdlLCBsb29zZSk7XG4gIC8vIGAxLjIuMyAtIDEuMi40YCA9PiBgPj0xLjIuMyA8PTEuMi40YFxuICB2YXIgaHIgPSBsb29zZSA/IHJlW0hZUEhFTlJBTkdFTE9PU0VdIDogcmVbSFlQSEVOUkFOR0VdO1xuICByYW5nZSA9IHJhbmdlLnJlcGxhY2UoaHIsIGh5cGhlblJlcGxhY2UpO1xuICBkZWJ1ZygnaHlwaGVuIHJlcGxhY2UnLCByYW5nZSk7XG4gIC8vIGA+IDEuMi4zIDwgMS4yLjVgID0+IGA+MS4yLjMgPDEuMi41YFxuICByYW5nZSA9IHJhbmdlLnJlcGxhY2UocmVbQ09NUEFSQVRPUlRSSU1dLCBjb21wYXJhdG9yVHJpbVJlcGxhY2UpO1xuICBkZWJ1ZygnY29tcGFyYXRvciB0cmltJywgcmFuZ2UsIHJlW0NPTVBBUkFUT1JUUklNXSk7XG5cbiAgLy8gYH4gMS4yLjNgID0+IGB+MS4yLjNgXG4gIHJhbmdlID0gcmFuZ2UucmVwbGFjZShyZVtUSUxERVRSSU1dLCB0aWxkZVRyaW1SZXBsYWNlKTtcblxuICAvLyBgXiAxLjIuM2AgPT4gYF4xLjIuM2BcbiAgcmFuZ2UgPSByYW5nZS5yZXBsYWNlKHJlW0NBUkVUVFJJTV0sIGNhcmV0VHJpbVJlcGxhY2UpO1xuXG4gIC8vIG5vcm1hbGl6ZSBzcGFjZXNcbiAgcmFuZ2UgPSByYW5nZS5zcGxpdCgvXFxzKy8pLmpvaW4oJyAnKTtcblxuICAvLyBBdCB0aGlzIHBvaW50LCB0aGUgcmFuZ2UgaXMgY29tcGxldGVseSB0cmltbWVkIGFuZFxuICAvLyByZWFkeSB0byBiZSBzcGxpdCBpbnRvIGNvbXBhcmF0b3JzLlxuXG4gIHZhciBjb21wUmUgPSBsb29zZSA/IHJlW0NPTVBBUkFUT1JMT09TRV0gOiByZVtDT01QQVJBVE9SXTtcbiAgdmFyIHNldCA9IHJhbmdlLnNwbGl0KCcgJykubWFwKGZ1bmN0aW9uKGNvbXApIHtcbiAgICByZXR1cm4gcGFyc2VDb21wYXJhdG9yKGNvbXAsIGxvb3NlKTtcbiAgfSkuam9pbignICcpLnNwbGl0KC9cXHMrLyk7XG4gIGlmICh0aGlzLmxvb3NlKSB7XG4gICAgLy8gaW4gbG9vc2UgbW9kZSwgdGhyb3cgb3V0IGFueSB0aGF0IGFyZSBub3QgdmFsaWQgY29tcGFyYXRvcnNcbiAgICBzZXQgPSBzZXQuZmlsdGVyKGZ1bmN0aW9uKGNvbXApIHtcbiAgICAgIHJldHVybiAhIWNvbXAubWF0Y2goY29tcFJlKTtcbiAgICB9KTtcbiAgfVxuICBzZXQgPSBzZXQubWFwKGZ1bmN0aW9uKGNvbXApIHtcbiAgICByZXR1cm4gbmV3IENvbXBhcmF0b3IoY29tcCwgbG9vc2UpO1xuICB9KTtcblxuICByZXR1cm4gc2V0O1xufTtcblxuLy8gTW9zdGx5IGp1c3QgZm9yIHRlc3RpbmcgYW5kIGxlZ2FjeSBBUEkgcmVhc29uc1xuZXhwb3J0cy50b0NvbXBhcmF0b3JzID0gdG9Db21wYXJhdG9ycztcbmZ1bmN0aW9uIHRvQ29tcGFyYXRvcnMocmFuZ2UsIGxvb3NlKSB7XG4gIHJldHVybiBuZXcgUmFuZ2UocmFuZ2UsIGxvb3NlKS5zZXQubWFwKGZ1bmN0aW9uKGNvbXApIHtcbiAgICByZXR1cm4gY29tcC5tYXAoZnVuY3Rpb24oYykge1xuICAgICAgcmV0dXJuIGMudmFsdWU7XG4gICAgfSkuam9pbignICcpLnRyaW0oKS5zcGxpdCgnICcpO1xuICB9KTtcbn1cblxuLy8gY29tcHJpc2VkIG9mIHhyYW5nZXMsIHRpbGRlcywgc3RhcnMsIGFuZCBndGx0J3MgYXQgdGhpcyBwb2ludC5cbi8vIGFscmVhZHkgcmVwbGFjZWQgdGhlIGh5cGhlbiByYW5nZXNcbi8vIHR1cm4gaW50byBhIHNldCBvZiBKVVNUIGNvbXBhcmF0b3JzLlxuZnVuY3Rpb24gcGFyc2VDb21wYXJhdG9yKGNvbXAsIGxvb3NlKSB7XG4gIGRlYnVnKCdjb21wJywgY29tcCk7XG4gIGNvbXAgPSByZXBsYWNlQ2FyZXRzKGNvbXAsIGxvb3NlKTtcbiAgZGVidWcoJ2NhcmV0JywgY29tcCk7XG4gIGNvbXAgPSByZXBsYWNlVGlsZGVzKGNvbXAsIGxvb3NlKTtcbiAgZGVidWcoJ3RpbGRlcycsIGNvbXApO1xuICBjb21wID0gcmVwbGFjZVhSYW5nZXMoY29tcCwgbG9vc2UpO1xuICBkZWJ1ZygneHJhbmdlJywgY29tcCk7XG4gIGNvbXAgPSByZXBsYWNlU3RhcnMoY29tcCwgbG9vc2UpO1xuICBkZWJ1Zygnc3RhcnMnLCBjb21wKTtcbiAgcmV0dXJuIGNvbXA7XG59XG5cbmZ1bmN0aW9uIGlzWChpZCkge1xuICByZXR1cm4gIWlkIHx8IGlkLnRvTG93ZXJDYXNlKCkgPT09ICd4JyB8fCBpZCA9PT0gJyonO1xufVxuXG4vLyB+LCB+PiAtLT4gKiAoYW55LCBraW5kYSBzaWxseSlcbi8vIH4yLCB+Mi54LCB+Mi54LngsIH4+Miwgfj4yLnggfj4yLngueCAtLT4gPj0yLjAuMCA8My4wLjBcbi8vIH4yLjAsIH4yLjAueCwgfj4yLjAsIH4+Mi4wLnggLS0+ID49Mi4wLjAgPDIuMS4wXG4vLyB+MS4yLCB+MS4yLngsIH4+MS4yLCB+PjEuMi54IC0tPiA+PTEuMi4wIDwxLjMuMFxuLy8gfjEuMi4zLCB+PjEuMi4zIC0tPiA+PTEuMi4zIDwxLjMuMFxuLy8gfjEuMi4wLCB+PjEuMi4wIC0tPiA+PTEuMi4wIDwxLjMuMFxuZnVuY3Rpb24gcmVwbGFjZVRpbGRlcyhjb21wLCBsb29zZSkge1xuICByZXR1cm4gY29tcC50cmltKCkuc3BsaXQoL1xccysvKS5tYXAoZnVuY3Rpb24oY29tcCkge1xuICAgIHJldHVybiByZXBsYWNlVGlsZGUoY29tcCwgbG9vc2UpO1xuICB9KS5qb2luKCcgJyk7XG59XG5cbmZ1bmN0aW9uIHJlcGxhY2VUaWxkZShjb21wLCBsb29zZSkge1xuICB2YXIgciA9IGxvb3NlID8gcmVbVElMREVMT09TRV0gOiByZVtUSUxERV07XG4gIHJldHVybiBjb21wLnJlcGxhY2UociwgZnVuY3Rpb24oXywgTSwgbSwgcCwgcHIpIHtcbiAgICBkZWJ1ZygndGlsZGUnLCBjb21wLCBfLCBNLCBtLCBwLCBwcik7XG4gICAgdmFyIHJldDtcblxuICAgIGlmIChpc1goTSkpXG4gICAgICByZXQgPSAnJztcbiAgICBlbHNlIGlmIChpc1gobSkpXG4gICAgICByZXQgPSAnPj0nICsgTSArICcuMC4wIDwnICsgKCtNICsgMSkgKyAnLjAuMCc7XG4gICAgZWxzZSBpZiAoaXNYKHApKVxuICAgICAgLy8gfjEuMiA9PSA+PTEuMi4wIDwxLjMuMFxuICAgICAgcmV0ID0gJz49JyArIE0gKyAnLicgKyBtICsgJy4wIDwnICsgTSArICcuJyArICgrbSArIDEpICsgJy4wJztcbiAgICBlbHNlIGlmIChwcikge1xuICAgICAgZGVidWcoJ3JlcGxhY2VUaWxkZSBwcicsIHByKTtcbiAgICAgIGlmIChwci5jaGFyQXQoMCkgIT09ICctJylcbiAgICAgICAgcHIgPSAnLScgKyBwcjtcbiAgICAgIHJldCA9ICc+PScgKyBNICsgJy4nICsgbSArICcuJyArIHAgKyBwciArXG4gICAgICAgICAgICAnIDwnICsgTSArICcuJyArICgrbSArIDEpICsgJy4wJztcbiAgICB9IGVsc2VcbiAgICAgIC8vIH4xLjIuMyA9PSA+PTEuMi4zIDwxLjMuMFxuICAgICAgcmV0ID0gJz49JyArIE0gKyAnLicgKyBtICsgJy4nICsgcCArXG4gICAgICAgICAgICAnIDwnICsgTSArICcuJyArICgrbSArIDEpICsgJy4wJztcblxuICAgIGRlYnVnKCd0aWxkZSByZXR1cm4nLCByZXQpO1xuICAgIHJldHVybiByZXQ7XG4gIH0pO1xufVxuXG4vLyBeIC0tPiAqIChhbnksIGtpbmRhIHNpbGx5KVxuLy8gXjIsIF4yLngsIF4yLngueCAtLT4gPj0yLjAuMCA8My4wLjBcbi8vIF4yLjAsIF4yLjAueCAtLT4gPj0yLjAuMCA8My4wLjBcbi8vIF4xLjIsIF4xLjIueCAtLT4gPj0xLjIuMCA8Mi4wLjBcbi8vIF4xLjIuMyAtLT4gPj0xLjIuMyA8Mi4wLjBcbi8vIF4xLjIuMCAtLT4gPj0xLjIuMCA8Mi4wLjBcbmZ1bmN0aW9uIHJlcGxhY2VDYXJldHMoY29tcCwgbG9vc2UpIHtcbiAgcmV0dXJuIGNvbXAudHJpbSgpLnNwbGl0KC9cXHMrLykubWFwKGZ1bmN0aW9uKGNvbXApIHtcbiAgICByZXR1cm4gcmVwbGFjZUNhcmV0KGNvbXAsIGxvb3NlKTtcbiAgfSkuam9pbignICcpO1xufVxuXG5mdW5jdGlvbiByZXBsYWNlQ2FyZXQoY29tcCwgbG9vc2UpIHtcbiAgZGVidWcoJ2NhcmV0JywgY29tcCwgbG9vc2UpO1xuICB2YXIgciA9IGxvb3NlID8gcmVbQ0FSRVRMT09TRV0gOiByZVtDQVJFVF07XG4gIHJldHVybiBjb21wLnJlcGxhY2UociwgZnVuY3Rpb24oXywgTSwgbSwgcCwgcHIpIHtcbiAgICBkZWJ1ZygnY2FyZXQnLCBjb21wLCBfLCBNLCBtLCBwLCBwcik7XG4gICAgdmFyIHJldDtcblxuICAgIGlmIChpc1goTSkpXG4gICAgICByZXQgPSAnJztcbiAgICBlbHNlIGlmIChpc1gobSkpXG4gICAgICByZXQgPSAnPj0nICsgTSArICcuMC4wIDwnICsgKCtNICsgMSkgKyAnLjAuMCc7XG4gICAgZWxzZSBpZiAoaXNYKHApKSB7XG4gICAgICBpZiAoTSA9PT0gJzAnKVxuICAgICAgICByZXQgPSAnPj0nICsgTSArICcuJyArIG0gKyAnLjAgPCcgKyBNICsgJy4nICsgKCttICsgMSkgKyAnLjAnO1xuICAgICAgZWxzZVxuICAgICAgICByZXQgPSAnPj0nICsgTSArICcuJyArIG0gKyAnLjAgPCcgKyAoK00gKyAxKSArICcuMC4wJztcbiAgICB9IGVsc2UgaWYgKHByKSB7XG4gICAgICBkZWJ1ZygncmVwbGFjZUNhcmV0IHByJywgcHIpO1xuICAgICAgaWYgKHByLmNoYXJBdCgwKSAhPT0gJy0nKVxuICAgICAgICBwciA9ICctJyArIHByO1xuICAgICAgaWYgKE0gPT09ICcwJykge1xuICAgICAgICBpZiAobSA9PT0gJzAnKVxuICAgICAgICAgIHJldCA9ICc+PScgKyBNICsgJy4nICsgbSArICcuJyArIHAgKyBwciArXG4gICAgICAgICAgICAgICAgJyA8JyArIE0gKyAnLicgKyBtICsgJy4nICsgKCtwICsgMSk7XG4gICAgICAgIGVsc2VcbiAgICAgICAgICByZXQgPSAnPj0nICsgTSArICcuJyArIG0gKyAnLicgKyBwICsgcHIgK1xuICAgICAgICAgICAgICAgICcgPCcgKyBNICsgJy4nICsgKCttICsgMSkgKyAnLjAnO1xuICAgICAgfSBlbHNlXG4gICAgICAgIHJldCA9ICc+PScgKyBNICsgJy4nICsgbSArICcuJyArIHAgKyBwciArXG4gICAgICAgICAgICAgICcgPCcgKyAoK00gKyAxKSArICcuMC4wJztcbiAgICB9IGVsc2Uge1xuICAgICAgZGVidWcoJ25vIHByJyk7XG4gICAgICBpZiAoTSA9PT0gJzAnKSB7XG4gICAgICAgIGlmIChtID09PSAnMCcpXG4gICAgICAgICAgcmV0ID0gJz49JyArIE0gKyAnLicgKyBtICsgJy4nICsgcCArXG4gICAgICAgICAgICAgICAgJyA8JyArIE0gKyAnLicgKyBtICsgJy4nICsgKCtwICsgMSk7XG4gICAgICAgIGVsc2VcbiAgICAgICAgICByZXQgPSAnPj0nICsgTSArICcuJyArIG0gKyAnLicgKyBwICtcbiAgICAgICAgICAgICAgICAnIDwnICsgTSArICcuJyArICgrbSArIDEpICsgJy4wJztcbiAgICAgIH0gZWxzZVxuICAgICAgICByZXQgPSAnPj0nICsgTSArICcuJyArIG0gKyAnLicgKyBwICtcbiAgICAgICAgICAgICAgJyA8JyArICgrTSArIDEpICsgJy4wLjAnO1xuICAgIH1cblxuICAgIGRlYnVnKCdjYXJldCByZXR1cm4nLCByZXQpO1xuICAgIHJldHVybiByZXQ7XG4gIH0pO1xufVxuXG5mdW5jdGlvbiByZXBsYWNlWFJhbmdlcyhjb21wLCBsb29zZSkge1xuICBkZWJ1ZygncmVwbGFjZVhSYW5nZXMnLCBjb21wLCBsb29zZSk7XG4gIHJldHVybiBjb21wLnNwbGl0KC9cXHMrLykubWFwKGZ1bmN0aW9uKGNvbXApIHtcbiAgICByZXR1cm4gcmVwbGFjZVhSYW5nZShjb21wLCBsb29zZSk7XG4gIH0pLmpvaW4oJyAnKTtcbn1cblxuZnVuY3Rpb24gcmVwbGFjZVhSYW5nZShjb21wLCBsb29zZSkge1xuICBjb21wID0gY29tcC50cmltKCk7XG4gIHZhciByID0gbG9vc2UgPyByZVtYUkFOR0VMT09TRV0gOiByZVtYUkFOR0VdO1xuICByZXR1cm4gY29tcC5yZXBsYWNlKHIsIGZ1bmN0aW9uKHJldCwgZ3RsdCwgTSwgbSwgcCwgcHIpIHtcbiAgICBkZWJ1ZygneFJhbmdlJywgY29tcCwgcmV0LCBndGx0LCBNLCBtLCBwLCBwcik7XG4gICAgdmFyIHhNID0gaXNYKE0pO1xuICAgIHZhciB4bSA9IHhNIHx8IGlzWChtKTtcbiAgICB2YXIgeHAgPSB4bSB8fCBpc1gocCk7XG4gICAgdmFyIGFueVggPSB4cDtcblxuICAgIGlmIChndGx0ID09PSAnPScgJiYgYW55WClcbiAgICAgIGd0bHQgPSAnJztcblxuICAgIGlmICh4TSkge1xuICAgICAgaWYgKGd0bHQgPT09ICc+JyB8fCBndGx0ID09PSAnPCcpIHtcbiAgICAgICAgLy8gbm90aGluZyBpcyBhbGxvd2VkXG4gICAgICAgIHJldCA9ICc8MC4wLjAnO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gbm90aGluZyBpcyBmb3JiaWRkZW5cbiAgICAgICAgcmV0ID0gJyonO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoZ3RsdCAmJiBhbnlYKSB7XG4gICAgICAvLyByZXBsYWNlIFggd2l0aCAwXG4gICAgICBpZiAoeG0pXG4gICAgICAgIG0gPSAwO1xuICAgICAgaWYgKHhwKVxuICAgICAgICBwID0gMDtcblxuICAgICAgaWYgKGd0bHQgPT09ICc+Jykge1xuICAgICAgICAvLyA+MSA9PiA+PTIuMC4wXG4gICAgICAgIC8vID4xLjIgPT4gPj0xLjMuMFxuICAgICAgICAvLyA+MS4yLjMgPT4gPj0gMS4yLjRcbiAgICAgICAgZ3RsdCA9ICc+PSc7XG4gICAgICAgIGlmICh4bSkge1xuICAgICAgICAgIE0gPSArTSArIDE7XG4gICAgICAgICAgbSA9IDA7XG4gICAgICAgICAgcCA9IDA7XG4gICAgICAgIH0gZWxzZSBpZiAoeHApIHtcbiAgICAgICAgICBtID0gK20gKyAxO1xuICAgICAgICAgIHAgPSAwO1xuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKGd0bHQgPT09ICc8PScpIHtcbiAgICAgICAgLy8gPD0wLjcueCBpcyBhY3R1YWxseSA8MC44LjAsIHNpbmNlIGFueSAwLjcueCBzaG91bGRcbiAgICAgICAgLy8gcGFzcy4gIFNpbWlsYXJseSwgPD03LnggaXMgYWN0dWFsbHkgPDguMC4wLCBldGMuXG4gICAgICAgIGd0bHQgPSAnPCc7XG4gICAgICAgIGlmICh4bSlcbiAgICAgICAgICBNID0gK00gKyAxO1xuICAgICAgICBlbHNlXG4gICAgICAgICAgbSA9ICttICsgMTtcbiAgICAgIH1cblxuICAgICAgcmV0ID0gZ3RsdCArIE0gKyAnLicgKyBtICsgJy4nICsgcDtcbiAgICB9IGVsc2UgaWYgKHhtKSB7XG4gICAgICByZXQgPSAnPj0nICsgTSArICcuMC4wIDwnICsgKCtNICsgMSkgKyAnLjAuMCc7XG4gICAgfSBlbHNlIGlmICh4cCkge1xuICAgICAgcmV0ID0gJz49JyArIE0gKyAnLicgKyBtICsgJy4wIDwnICsgTSArICcuJyArICgrbSArIDEpICsgJy4wJztcbiAgICB9XG5cbiAgICBkZWJ1ZygneFJhbmdlIHJldHVybicsIHJldCk7XG5cbiAgICByZXR1cm4gcmV0O1xuICB9KTtcbn1cblxuLy8gQmVjYXVzZSAqIGlzIEFORC1lZCB3aXRoIGV2ZXJ5dGhpbmcgZWxzZSBpbiB0aGUgY29tcGFyYXRvcixcbi8vIGFuZCAnJyBtZWFucyBcImFueSB2ZXJzaW9uXCIsIGp1c3QgcmVtb3ZlIHRoZSAqcyBlbnRpcmVseS5cbmZ1bmN0aW9uIHJlcGxhY2VTdGFycyhjb21wLCBsb29zZSkge1xuICBkZWJ1ZygncmVwbGFjZVN0YXJzJywgY29tcCwgbG9vc2UpO1xuICAvLyBMb29zZW5lc3MgaXMgaWdub3JlZCBoZXJlLiAgc3RhciBpcyBhbHdheXMgYXMgbG9vc2UgYXMgaXQgZ2V0cyFcbiAgcmV0dXJuIGNvbXAudHJpbSgpLnJlcGxhY2UocmVbU1RBUl0sICcnKTtcbn1cblxuLy8gVGhpcyBmdW5jdGlvbiBpcyBwYXNzZWQgdG8gc3RyaW5nLnJlcGxhY2UocmVbSFlQSEVOUkFOR0VdKVxuLy8gTSwgbSwgcGF0Y2gsIHByZXJlbGVhc2UsIGJ1aWxkXG4vLyAxLjIgLSAzLjQuNSA9PiA+PTEuMi4wIDw9My40LjVcbi8vIDEuMi4zIC0gMy40ID0+ID49MS4yLjAgPDMuNS4wIEFueSAzLjQueCB3aWxsIGRvXG4vLyAxLjIgLSAzLjQgPT4gPj0xLjIuMCA8My41LjBcbmZ1bmN0aW9uIGh5cGhlblJlcGxhY2UoJDAsXG4gICAgICAgICAgICAgICAgICAgICAgIGZyb20sIGZNLCBmbSwgZnAsIGZwciwgZmIsXG4gICAgICAgICAgICAgICAgICAgICAgIHRvLCB0TSwgdG0sIHRwLCB0cHIsIHRiKSB7XG5cbiAgaWYgKGlzWChmTSkpXG4gICAgZnJvbSA9ICcnO1xuICBlbHNlIGlmIChpc1goZm0pKVxuICAgIGZyb20gPSAnPj0nICsgZk0gKyAnLjAuMCc7XG4gIGVsc2UgaWYgKGlzWChmcCkpXG4gICAgZnJvbSA9ICc+PScgKyBmTSArICcuJyArIGZtICsgJy4wJztcbiAgZWxzZVxuICAgIGZyb20gPSAnPj0nICsgZnJvbTtcblxuICBpZiAoaXNYKHRNKSlcbiAgICB0byA9ICcnO1xuICBlbHNlIGlmIChpc1godG0pKVxuICAgIHRvID0gJzwnICsgKCt0TSArIDEpICsgJy4wLjAnO1xuICBlbHNlIGlmIChpc1godHApKVxuICAgIHRvID0gJzwnICsgdE0gKyAnLicgKyAoK3RtICsgMSkgKyAnLjAnO1xuICBlbHNlIGlmICh0cHIpXG4gICAgdG8gPSAnPD0nICsgdE0gKyAnLicgKyB0bSArICcuJyArIHRwICsgJy0nICsgdHByO1xuICBlbHNlXG4gICAgdG8gPSAnPD0nICsgdG87XG5cbiAgcmV0dXJuIChmcm9tICsgJyAnICsgdG8pLnRyaW0oKTtcbn1cblxuXG4vLyBpZiBBTlkgb2YgdGhlIHNldHMgbWF0Y2ggQUxMIG9mIGl0cyBjb21wYXJhdG9ycywgdGhlbiBwYXNzXG5SYW5nZS5wcm90b3R5cGUudGVzdCA9IGZ1bmN0aW9uKHZlcnNpb24pIHtcbiAgaWYgKCF2ZXJzaW9uKVxuICAgIHJldHVybiBmYWxzZTtcblxuICBpZiAodHlwZW9mIHZlcnNpb24gPT09ICdzdHJpbmcnKVxuICAgIHZlcnNpb24gPSBuZXcgU2VtVmVyKHZlcnNpb24sIHRoaXMubG9vc2UpO1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5zZXQubGVuZ3RoOyBpKyspIHtcbiAgICBpZiAodGVzdFNldCh0aGlzLnNldFtpXSwgdmVyc2lvbikpXG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuICByZXR1cm4gZmFsc2U7XG59O1xuXG5mdW5jdGlvbiB0ZXN0U2V0KHNldCwgdmVyc2lvbikge1xuICBmb3IgKHZhciBpID0gMDsgaSA8IHNldC5sZW5ndGg7IGkrKykge1xuICAgIGlmICghc2V0W2ldLnRlc3QodmVyc2lvbikpXG4gICAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBpZiAodmVyc2lvbi5wcmVyZWxlYXNlLmxlbmd0aCkge1xuICAgIC8vIEZpbmQgdGhlIHNldCBvZiB2ZXJzaW9ucyB0aGF0IGFyZSBhbGxvd2VkIHRvIGhhdmUgcHJlcmVsZWFzZXNcbiAgICAvLyBGb3IgZXhhbXBsZSwgXjEuMi4zLXByLjEgZGVzdWdhcnMgdG8gPj0xLjIuMy1wci4xIDwyLjAuMFxuICAgIC8vIFRoYXQgc2hvdWxkIGFsbG93IGAxLjIuMy1wci4yYCB0byBwYXNzLlxuICAgIC8vIEhvd2V2ZXIsIGAxLjIuNC1hbHBoYS5ub3RyZWFkeWAgc2hvdWxkIE5PVCBiZSBhbGxvd2VkLFxuICAgIC8vIGV2ZW4gdGhvdWdoIGl0J3Mgd2l0aGluIHRoZSByYW5nZSBzZXQgYnkgdGhlIGNvbXBhcmF0b3JzLlxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc2V0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICBkZWJ1ZyhzZXRbaV0uc2VtdmVyKTtcbiAgICAgIGlmIChzZXRbaV0uc2VtdmVyID09PSBBTlkpXG4gICAgICAgIGNvbnRpbnVlO1xuXG4gICAgICBpZiAoc2V0W2ldLnNlbXZlci5wcmVyZWxlYXNlLmxlbmd0aCA+IDApIHtcbiAgICAgICAgdmFyIGFsbG93ZWQgPSBzZXRbaV0uc2VtdmVyO1xuICAgICAgICBpZiAoYWxsb3dlZC5tYWpvciA9PT0gdmVyc2lvbi5tYWpvciAmJlxuICAgICAgICAgICAgYWxsb3dlZC5taW5vciA9PT0gdmVyc2lvbi5taW5vciAmJlxuICAgICAgICAgICAgYWxsb3dlZC5wYXRjaCA9PT0gdmVyc2lvbi5wYXRjaClcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBWZXJzaW9uIGhhcyBhIC1wcmUsIGJ1dCBpdCdzIG5vdCBvbmUgb2YgdGhlIG9uZXMgd2UgbGlrZS5cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICByZXR1cm4gdHJ1ZTtcbn1cblxuZXhwb3J0cy5zYXRpc2ZpZXMgPSBzYXRpc2ZpZXM7XG5mdW5jdGlvbiBzYXRpc2ZpZXModmVyc2lvbiwgcmFuZ2UsIGxvb3NlKSB7XG4gIHRyeSB7XG4gICAgcmFuZ2UgPSBuZXcgUmFuZ2UocmFuZ2UsIGxvb3NlKTtcbiAgfSBjYXRjaCAoZXIpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgcmV0dXJuIHJhbmdlLnRlc3QodmVyc2lvbik7XG59XG5cbmV4cG9ydHMubWF4U2F0aXNmeWluZyA9IG1heFNhdGlzZnlpbmc7XG5mdW5jdGlvbiBtYXhTYXRpc2Z5aW5nKHZlcnNpb25zLCByYW5nZSwgbG9vc2UpIHtcbiAgcmV0dXJuIHZlcnNpb25zLmZpbHRlcihmdW5jdGlvbih2ZXJzaW9uKSB7XG4gICAgcmV0dXJuIHNhdGlzZmllcyh2ZXJzaW9uLCByYW5nZSwgbG9vc2UpO1xuICB9KS5zb3J0KGZ1bmN0aW9uKGEsIGIpIHtcbiAgICByZXR1cm4gcmNvbXBhcmUoYSwgYiwgbG9vc2UpO1xuICB9KVswXSB8fCBudWxsO1xufVxuXG5leHBvcnRzLm1pblNhdGlzZnlpbmcgPSBtaW5TYXRpc2Z5aW5nO1xuZnVuY3Rpb24gbWluU2F0aXNmeWluZyh2ZXJzaW9ucywgcmFuZ2UsIGxvb3NlKSB7XG4gIHJldHVybiB2ZXJzaW9ucy5maWx0ZXIoZnVuY3Rpb24odmVyc2lvbikge1xuICAgIHJldHVybiBzYXRpc2ZpZXModmVyc2lvbiwgcmFuZ2UsIGxvb3NlKTtcbiAgfSkuc29ydChmdW5jdGlvbihhLCBiKSB7XG4gICAgcmV0dXJuIGNvbXBhcmUoYSwgYiwgbG9vc2UpO1xuICB9KVswXSB8fCBudWxsO1xufVxuXG5leHBvcnRzLnZhbGlkUmFuZ2UgPSB2YWxpZFJhbmdlO1xuZnVuY3Rpb24gdmFsaWRSYW5nZShyYW5nZSwgbG9vc2UpIHtcbiAgdHJ5IHtcbiAgICAvLyBSZXR1cm4gJyonIGluc3RlYWQgb2YgJycgc28gdGhhdCB0cnV0aGluZXNzIHdvcmtzLlxuICAgIC8vIFRoaXMgd2lsbCB0aHJvdyBpZiBpdCdzIGludmFsaWQgYW55d2F5XG4gICAgcmV0dXJuIG5ldyBSYW5nZShyYW5nZSwgbG9vc2UpLnJhbmdlIHx8ICcqJztcbiAgfSBjYXRjaCAoZXIpIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxufVxuXG4vLyBEZXRlcm1pbmUgaWYgdmVyc2lvbiBpcyBsZXNzIHRoYW4gYWxsIHRoZSB2ZXJzaW9ucyBwb3NzaWJsZSBpbiB0aGUgcmFuZ2VcbmV4cG9ydHMubHRyID0gbHRyO1xuZnVuY3Rpb24gbHRyKHZlcnNpb24sIHJhbmdlLCBsb29zZSkge1xuICByZXR1cm4gb3V0c2lkZSh2ZXJzaW9uLCByYW5nZSwgJzwnLCBsb29zZSk7XG59XG5cbi8vIERldGVybWluZSBpZiB2ZXJzaW9uIGlzIGdyZWF0ZXIgdGhhbiBhbGwgdGhlIHZlcnNpb25zIHBvc3NpYmxlIGluIHRoZSByYW5nZS5cbmV4cG9ydHMuZ3RyID0gZ3RyO1xuZnVuY3Rpb24gZ3RyKHZlcnNpb24sIHJhbmdlLCBsb29zZSkge1xuICByZXR1cm4gb3V0c2lkZSh2ZXJzaW9uLCByYW5nZSwgJz4nLCBsb29zZSk7XG59XG5cbmV4cG9ydHMub3V0c2lkZSA9IG91dHNpZGU7XG5mdW5jdGlvbiBvdXRzaWRlKHZlcnNpb24sIHJhbmdlLCBoaWxvLCBsb29zZSkge1xuICB2ZXJzaW9uID0gbmV3IFNlbVZlcih2ZXJzaW9uLCBsb29zZSk7XG4gIHJhbmdlID0gbmV3IFJhbmdlKHJhbmdlLCBsb29zZSk7XG5cbiAgdmFyIGd0Zm4sIGx0ZWZuLCBsdGZuLCBjb21wLCBlY29tcDtcbiAgc3dpdGNoIChoaWxvKSB7XG4gICAgY2FzZSAnPic6XG4gICAgICBndGZuID0gZ3Q7XG4gICAgICBsdGVmbiA9IGx0ZTtcbiAgICAgIGx0Zm4gPSBsdDtcbiAgICAgIGNvbXAgPSAnPic7XG4gICAgICBlY29tcCA9ICc+PSc7XG4gICAgICBicmVhaztcbiAgICBjYXNlICc8JzpcbiAgICAgIGd0Zm4gPSBsdDtcbiAgICAgIGx0ZWZuID0gZ3RlO1xuICAgICAgbHRmbiA9IGd0O1xuICAgICAgY29tcCA9ICc8JztcbiAgICAgIGVjb21wID0gJzw9JztcbiAgICAgIGJyZWFrO1xuICAgIGRlZmF1bHQ6XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdNdXN0IHByb3ZpZGUgYSBoaWxvIHZhbCBvZiBcIjxcIiBvciBcIj5cIicpO1xuICB9XG5cbiAgLy8gSWYgaXQgc2F0aXNpZmVzIHRoZSByYW5nZSBpdCBpcyBub3Qgb3V0c2lkZVxuICBpZiAoc2F0aXNmaWVzKHZlcnNpb24sIHJhbmdlLCBsb29zZSkpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICAvLyBGcm9tIG5vdyBvbiwgdmFyaWFibGUgdGVybXMgYXJlIGFzIGlmIHdlJ3JlIGluIFwiZ3RyXCIgbW9kZS5cbiAgLy8gYnV0IG5vdGUgdGhhdCBldmVyeXRoaW5nIGlzIGZsaXBwZWQgZm9yIHRoZSBcImx0clwiIGZ1bmN0aW9uLlxuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgcmFuZ2Uuc2V0Lmxlbmd0aDsgKytpKSB7XG4gICAgdmFyIGNvbXBhcmF0b3JzID0gcmFuZ2Uuc2V0W2ldO1xuXG4gICAgdmFyIGhpZ2ggPSBudWxsO1xuICAgIHZhciBsb3cgPSBudWxsO1xuXG4gICAgY29tcGFyYXRvcnMuZm9yRWFjaChmdW5jdGlvbihjb21wYXJhdG9yKSB7XG4gICAgICBpZiAoY29tcGFyYXRvci5zZW12ZXIgPT09IEFOWSkge1xuICAgICAgICBjb21wYXJhdG9yID0gbmV3IENvbXBhcmF0b3IoJz49MC4wLjAnKVxuICAgICAgfVxuICAgICAgaGlnaCA9IGhpZ2ggfHwgY29tcGFyYXRvcjtcbiAgICAgIGxvdyA9IGxvdyB8fCBjb21wYXJhdG9yO1xuICAgICAgaWYgKGd0Zm4oY29tcGFyYXRvci5zZW12ZXIsIGhpZ2guc2VtdmVyLCBsb29zZSkpIHtcbiAgICAgICAgaGlnaCA9IGNvbXBhcmF0b3I7XG4gICAgICB9IGVsc2UgaWYgKGx0Zm4oY29tcGFyYXRvci5zZW12ZXIsIGxvdy5zZW12ZXIsIGxvb3NlKSkge1xuICAgICAgICBsb3cgPSBjb21wYXJhdG9yO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgLy8gSWYgdGhlIGVkZ2UgdmVyc2lvbiBjb21wYXJhdG9yIGhhcyBhIG9wZXJhdG9yIHRoZW4gb3VyIHZlcnNpb25cbiAgICAvLyBpc24ndCBvdXRzaWRlIGl0XG4gICAgaWYgKGhpZ2gub3BlcmF0b3IgPT09IGNvbXAgfHwgaGlnaC5vcGVyYXRvciA9PT0gZWNvbXApIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICAvLyBJZiB0aGUgbG93ZXN0IHZlcnNpb24gY29tcGFyYXRvciBoYXMgYW4gb3BlcmF0b3IgYW5kIG91ciB2ZXJzaW9uXG4gICAgLy8gaXMgbGVzcyB0aGFuIGl0IHRoZW4gaXQgaXNuJ3QgaGlnaGVyIHRoYW4gdGhlIHJhbmdlXG4gICAgaWYgKCghbG93Lm9wZXJhdG9yIHx8IGxvdy5vcGVyYXRvciA9PT0gY29tcCkgJiZcbiAgICAgICAgbHRlZm4odmVyc2lvbiwgbG93LnNlbXZlcikpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9IGVsc2UgaWYgKGxvdy5vcGVyYXRvciA9PT0gZWNvbXAgJiYgbHRmbih2ZXJzaW9uLCBsb3cuc2VtdmVyKSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfVxuICByZXR1cm4gdHJ1ZTtcbn1cblxuZXhwb3J0cy5wcmVyZWxlYXNlID0gcHJlcmVsZWFzZTtcbmZ1bmN0aW9uIHByZXJlbGVhc2UodmVyc2lvbiwgbG9vc2UpIHtcbiAgdmFyIHBhcnNlZCA9IHBhcnNlKHZlcnNpb24sIGxvb3NlKTtcbiAgcmV0dXJuIChwYXJzZWQgJiYgcGFyc2VkLnByZXJlbGVhc2UubGVuZ3RoKSA/IHBhcnNlZC5wcmVyZWxlYXNlIDogbnVsbDtcbn1cbiIsIlxuLyoqXG4gKiBWYWxpZGF0ZSB0aGUgQ1NTIGNvbG9yIHZhbHVlLlxuICovXG5leHBvcnQgZnVuY3Rpb24gaXNDU1NDb2xvciAodmFsdWUpIHtcbiAgcmV0dXJuIC9eW2Etel0rJC9pLnRlc3QodmFsdWUpIC8vIG1hdGNoIGNvbG9yIG5hbWVcbiAgICB8fCAvXiMoW2EtZjAtOV17M30pezEsMn0kL2kudGVzdCh2YWx1ZSkgLy8gbWF0Y2ggI0FCQ0RFRlxuICAgIHx8IC9ecmdiXFxzKlxcKChcXHMqWzAtOS5dK1xccyosKXsyfVxccypbMC05Ll0rXFxzKlxcKS9pLnRlc3QodmFsdWUpIC8vIG1hdGNoIHJnYigwLDAsMClcbiAgICB8fCAvXnJnYmFcXHMqXFwoKFxccypbMC05Ll0rXFxzKiwpezN9XFxzKlswLTkuXStcXHMqXFwpL2kudGVzdCh2YWx1ZSkgLy8gbWF0Y2ggcmdiYSgwLDAsMCwwKVxufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNDU1NMZW5ndGggKHZhbHVlKSB7XG4gIHJldHVybiAvXlsrLV0/WzAtOV0rLj8oWzAtOV0rKT8ocHh8JSk/JC8udGVzdChTdHJpbmcodmFsdWUpKVxufVxuXG5leHBvcnQgZnVuY3Rpb24gcG9zaXRpb24gKHZhbHVlKSB7XG4gIHJldHVybiBbJ2Fic29sdXRlJywgJ3JlbGF0aXZlJywgJ2ZpeGVkJywgJ3N0aWNreSddLmluZGV4T2YodmFsdWUpICE9PSAtMVxufVxuXG5leHBvcnQgZnVuY3Rpb24gb3BhY2l0eSAodmFsdWUpIHtcbiAgY29uc3QgY291bnQgPSBwYXJzZUZsb2F0KHZhbHVlKVxuICByZXR1cm4gY291bnQgPj0gMCAmJiBjb3VudCA8PSAxXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBkaXNwbGF5ICh2YWx1ZSkge1xuICByZXR1cm4gWydibG9jaycsICdmbGV4J10uaW5kZXhPZih2YWx1ZSkgIT09IC0xXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBmbGV4RGlyZWN0aW9uICh2YWx1ZSkge1xuICByZXR1cm4gWydyb3cnLCAnY29sdW1uJ10uaW5kZXhPZih2YWx1ZSkgIT09IC0xXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBqdXN0aWZ5Q29udGVudCAodmFsdWUpIHtcbiAgcmV0dXJuIFsnZmxleC1zdGFydCcsICdmbGV4LWVuZCcsICdjZW50ZXInLCAnc3BhY2UtYmV0d2VlbiddLmluZGV4T2YodmFsdWUpICE9PSAtMVxufVxuXG5leHBvcnQgZnVuY3Rpb24gYWxpZ25JdGVtcyAodmFsdWUpIHtcbiAgcmV0dXJuIFsnc3RyZXRjaCcsICdmbGV4LXN0YXJ0JywgJ2ZsZXgtZW5kJywgJ2NlbnRlciddLmluZGV4T2YodmFsdWUpICE9PSAtMVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZmxleCAodmFsdWUpIHtcbiAgcmV0dXJuIC9eXFxkezEsM30kLy50ZXN0KFN0cmluZyh2YWx1ZSkpXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBmb250U3R5bGUgKHZhbHVlKSB7XG4gIHJldHVybiBbJ25vcm1hbCcsICdpdGFsaWMnLCAnb2JsaXF1ZSddLmluZGV4T2YodmFsdWUpICE9PSAtMVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZm9udFdlaWdodCAodmFsdWUpIHtcbiAgcmV0dXJuIFsnbm9ybWFsJywgJ2JvbGQnLCAnbGlnaHQnLCAnYm9sZGVyJywgJ2xpZ2h0ZXInXS5pbmRleE9mKHZhbHVlKSAhPT0gLTFcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHRleHREZWNvcmF0aW9uICh2YWx1ZSkge1xuICByZXR1cm4gWydub25lJywgJ3VuZGVybGluZScsICdsaW5lLXRocm91Z2gnXS5pbmRleE9mKHZhbHVlKSAhPT0gLTFcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHRleHRBbGlnbiAodmFsdWUpIHtcbiAgcmV0dXJuIFsnbGVmdCcsICdjZW50ZXInLCAncmlnaHQnXS5pbmRleE9mKHZhbHVlKSAhPT0gLTFcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG92ZXJmbG93ICh2YWx1ZSkge1xuICByZXR1cm4gWyd2aXNpYmxlJywgJ2hpZGRlbiddLmluZGV4T2YodmFsdWUpICE9PSAtMVxufVxuXG5leHBvcnQgZnVuY3Rpb24gdGV4dE92ZXJmbG93ICh2YWx1ZSkge1xuICByZXR1cm4gWydjbGlwJywgJ2VsbGlwc2lzJ10uaW5kZXhPZih2YWx1ZSkgIT09IC0xXG59XG5cbi8qKlxuICogQ29tbW9uIHN0eWxlIHZhbGlkYXRvci5cbiAqIEBwYXJhbSB7YW55fSB2YWx1ZVxuICogQHBhcmFtIHtTdHJpbmd9IGtleVxuICovXG5leHBvcnQgZnVuY3Rpb24gY29tbW9uICh2YWx1ZSwga2V5KSB7XG4gIGlmICgvXltcXHctXSpjb2xvciQvLnRlc3QoU3RyaW5nKGtleSkpKSB7XG4gICAgcmV0dXJuIGlzQ1NTQ29sb3IodmFsdWUpXG4gIH1cblxuICBpZiAoL14od2lkdGh8aGVpZ2h0KSQvLnRlc3QoU3RyaW5nKGtleSkpKSB7XG4gICAgcmV0dXJuIGlzQ1NTTGVuZ3RoKHZhbHVlKVxuICB9XG5cbiAgLy8gY2hlY2tvdXQgYm9yZGVyLXJhZGl1c1xuICBpZiAoL15ib3JkZXItKCh0b3B8cmlnaHR8Ym90dG9tfGxlZnQpLSl7MCwyfSh3aWR0aHxyYWRpdXMpJC8udGVzdChTdHJpbmcoa2V5KSkpIHtcbiAgICByZXR1cm4gaXNDU1NMZW5ndGgodmFsdWUpXG4gIH1cblxuICAvLyBjaGVjayBib3JkZXItc3R5bGVcbiAgaWYgKC9ib3JkZXItKCh0b3B8cmlnaHR8Ym90dG9tfGxlZnQpLSk/c3R5bGUvLnRlc3QoU3RyaW5nKGtleSkpKSB7XG4gICAgcmV0dXJuIFsnc29saWQnLCAnZGFzaGVkJywgJ2RvdHRlZCddLmluZGV4T2YodmFsdWUpICE9PSAtMVxuICB9XG5cbiAgaWYgKC9eKChtYXJnaW58cGFkZGluZyktKT8odG9wfHJpZ2h0fGJvdHRvbXxsZWZ0KS8udGVzdChTdHJpbmcoa2V5KSkpIHtcbiAgICByZXR1cm4gaXNDU1NMZW5ndGgodmFsdWUpXG4gIH1cblxuICBzd2l0Y2ggKFN0cmluZyhrZXkpKSB7XG4gICAgY2FzZSAnZm9udC1zaXplJzogcmV0dXJuIGlzQ1NTTGVuZ3RoKHZhbHVlKVxuICB9XG5cbiAgcmV0dXJuIHRydWVcbn1cbiIsIlxuZXhwb3J0IGZ1bmN0aW9uIGlzU3RyaW5nICh2YWx1ZSkge1xuICByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHZhbHVlKSA9PT0gJ1tvYmplY3QgU3RyaW5nXSdcbn1cbiIsIi8qKlxuICogQ3JlYXRlIGEgY2FjaGVkIHZlcnNpb24gb2YgYSBwdXJlIGZ1bmN0aW9uLlxuICovXG5leHBvcnQgZnVuY3Rpb24gY2FjaGVkIChmbikge1xuICBjb25zdCBjYWNoZSA9IE9iamVjdC5jcmVhdGUobnVsbClcbiAgcmV0dXJuIGZ1bmN0aW9uIGNhY2hlZEZuIChzdHIpIHtcbiAgICBjb25zdCBoaXQgPSBjYWNoZVtzdHJdXG4gICAgcmV0dXJuIGhpdCB8fCAoY2FjaGVbc3RyXSA9IGZuKHN0cikpXG4gIH1cbn1cblxuLyoqXG4gKiBDYW1lbGl6ZSBhIGh5cGhlbi1kZWxtaXRlZCBzdHJpbmcuXG4gKi9cbmNvbnN0IGNhbWVsaXplUkUgPSAvLShcXHcpL2dcbmV4cG9ydCBjb25zdCBjYW1lbGl6ZSA9IGNhY2hlZChzdHIgPT4ge1xuICByZXR1cm4gc3RyLnJlcGxhY2UoY2FtZWxpemVSRSwgKF8sIGMpID0+IGMudG9VcHBlckNhc2UoKSlcbn0pXG5cbi8qKlxuICogQ2FwaXRhbGl6ZSBhIHN0cmluZy5cbiAqL1xuZXhwb3J0IGNvbnN0IGNhcGl0YWxpemUgPSBjYWNoZWQoc3RyID0+IHtcbiAgcmV0dXJuIHN0ci5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIHN0ci5zbGljZSgxKVxufSlcblxuLyoqXG4gKiBIeXBoZW5hdGUgYSBjYW1lbENhc2Ugc3RyaW5nLlxuICovXG5jb25zdCBoeXBoZW5hdGVSRSA9IC8oW14tXSkoW0EtWl0pL2dcbmV4cG9ydCBjb25zdCBoeXBoZW5hdGUgPSBjYWNoZWQoc3RyID0+IHtcbiAgcmV0dXJuIHN0clxuICAgIC5yZXBsYWNlKGh5cGhlbmF0ZVJFLCAnJDEtJDInKVxuICAgIC5yZXBsYWNlKGh5cGhlbmF0ZVJFLCAnJDEtJDInKVxuICAgIC50b0xvd2VyQ2FzZSgpXG59KVxuXG5leHBvcnQgZnVuY3Rpb24gY2FtZWxUb0tlYmFiIChuYW1lKSB7XG4gIGlmICghbmFtZSkgeyByZXR1cm4gJycgfVxuICByZXR1cm4gbmFtZS5yZXBsYWNlKC8oW0EtWl0pL2csIGZ1bmN0aW9uIChnLCBnMSkge1xuICAgIHJldHVybiBgLSR7ZzEudG9Mb3dlckNhc2UoKX1gXG4gIH0pXG59XG5cbi8qKlxuICogTWl4IHByb3BlcnRpZXMgaW50byB0YXJnZXQgb2JqZWN0LlxuICovXG5leHBvcnQgZnVuY3Rpb24gZXh0ZW5kICh0bywgX2Zyb20pIHtcbiAgZm9yIChjb25zdCBrZXkgaW4gX2Zyb20pIHtcbiAgICB0b1trZXldID0gX2Zyb21ba2V5XVxuICB9XG4gIHJldHVybiB0b1xufVxuXG4vKipcbiAqIFNpbXBsZSBiaW5kLCBmYXN0ZXIgdGhhbiBuYXRpdmVcbiAqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmblxuICogQHBhcmFtIHtPYmplY3R9IGN0eFxuICogQHJldHVybiB7RnVuY3Rpb259XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBiaW5kIChmbiwgY3R4KSB7XG4gIHJldHVybiBmdW5jdGlvbiAoYSkge1xuICAgIGNvbnN0IGwgPSBhcmd1bWVudHMubGVuZ3RoXG4gICAgcmV0dXJuIGxcbiAgICAgID8gbCA+IDFcbiAgICAgICAgPyBmbi5hcHBseShjdHgsIGFyZ3VtZW50cylcbiAgICAgICAgOiBmbi5jYWxsKGN0eCwgYSlcbiAgICAgIDogZm4uY2FsbChjdHgpXG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGRlYm91bmNlIChmdW5jLCB3YWl0KSB7XG4gIGxldCB0aW1lcklkXG4gIGZ1bmN0aW9uIGxhdGVyICgpIHtcbiAgICB0aW1lcklkID0gbnVsbFxuICAgIGZ1bmMuYXBwbHkobnVsbClcbiAgfVxuICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgIGNsZWFyVGltZW91dCh0aW1lcklkKVxuICAgIHRpbWVySWQgPSBzZXRUaW1lb3V0KGxhdGVyLCB3YWl0KVxuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB0aHJvdHRsZSAoZnVuYywgd2FpdCkge1xuICBsZXQgbGFzdCA9IDBcbiAgcmV0dXJuIGZ1bmN0aW9uICguLi5hcmdzKSB7XG4gICAgY29uc3QgY29udGV4dCA9IHRoaXNcbiAgICBjb25zdCB0aW1lID0gbmV3IERhdGUoKS5nZXRUaW1lKClcbiAgICBpZiAodGltZSAtIGxhc3QgPiB3YWl0KSB7XG4gICAgICBmdW5jLmFwcGx5KGNvbnRleHQsIGFyZ3MpXG4gICAgICBsYXN0ID0gdGltZVxuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlTWl4aW4gKC4uLm1peGlucykge1xuICBjb25zdCBtaXhpbk1ldGhvZHMgPSB7fVxuICBtaXhpbnMuZm9yRWFjaChtZXRob2RzID0+IHtcbiAgICBmb3IgKGNvbnN0IGtleSBpbiBtZXRob2RzKSB7XG4gICAgICBtaXhpbk1ldGhvZHNba2V5XSA9IGZ1bmN0aW9uICguLi5hcmdzKSB7XG4gICAgICAgIHJldHVybiBtZXRob2RzW2tleV0uYXBwbHkodGhpcywgW3RoaXMsIC4uLmFyZ3NdKVxuICAgICAgfVxuICAgIH1cbiAgfSlcbiAgcmV0dXJuIHtcbiAgICBtZXRob2RzOiBtaXhpbk1ldGhvZHNcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gYXBwZW5kU3R5bGUgKGNzcywgc3R5bGVJZCwgcmVwbGFjZSkge1xuICBsZXQgc3R5bGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChzdHlsZUlkKVxuICBpZiAoc3R5bGUgJiYgcmVwbGFjZSkge1xuICAgIHN0eWxlLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoc3R5bGUpXG4gICAgc3R5bGUgPSBudWxsXG4gIH1cbiAgaWYgKCFzdHlsZSkge1xuICAgIHN0eWxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3R5bGUnKVxuICAgIHN0eWxlLnR5cGUgPSAndGV4dC9jc3MnXG4gICAgc3R5bGVJZCAmJiAoc3R5bGUuaWQgPSBzdHlsZUlkKVxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdoZWFkJylbMF0uYXBwZW5kQ2hpbGQoc3R5bGUpXG4gIH1cbiAgc3R5bGUuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY3NzKSlcbn1cblxuLyoqXG4gKiBTdHJpY3Qgb2JqZWN0IHR5cGUgY2hlY2suIE9ubHkgcmV0dXJucyB0cnVlXG4gKiBmb3IgcGxhaW4gSmF2YVNjcmlwdCBvYmplY3RzLlxuICpcbiAqIEBwYXJhbSB7Kn0gb2JqXG4gKiBAcmV0dXJuIHtCb29sZWFufVxuICovXG5cbmNvbnN0IHRvU3RyaW5nID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZ1xuY29uc3QgT0JKRUNUX1NUUklORyA9ICdbb2JqZWN0IE9iamVjdF0nXG5leHBvcnQgZnVuY3Rpb24gaXNQbGFpbk9iamVjdCAob2JqKSB7XG4gIHJldHVybiB0b1N0cmluZy5jYWxsKG9iaikgPT09IE9CSkVDVF9TVFJJTkdcbn1cbiIsImNvbnN0IHN1cHBvcnRlZFByb3BlcnRpZXMgPSB7XG4gICdAY29tbW9uJzogW1xuICAgICdpZCcsICdyZWYnLCAnc3R5bGUnLCAnY2xhc3MnLCAnYXBwZW5kJ1xuICBdXG59XG5cbmNvbnN0IHN1cHBvcnRlZFN0eWxlcyA9IHtcbiAgJ0Bib3gtbW9kZWwnOiBbXG4gICAgJ3dpZHRoJywgJ2hlaWdodCcsICdwb3NpdGlvbicsXG4gICAgJ3BhZGRpbmctdG9wJywgJ3BhZGRpbmctYm90dG9tJywgJ3BhZGRpbmctbGVmdCcsICdwYWRkaW5nLXJpZ2h0JyxcbiAgICAnbWFyZ2luLXRvcCcsICdtYXJnaW4tYm90dG9tJywgJ21hcmdpbi1sZWZ0JywgJ21hcmdpbi1yaWdodCdcbiAgXSxcbiAgJ0Bib3JkZXInOiBbXG4gICAgJ2JvcmRlci1zdHlsZScsICdib3JkZXItd2lkdGgnLCAnYm9yZGVyLWNvbG9yJywgJ2JvcmRlci1yYWRpdXMnLFxuICAgICdib3JkZXItdG9wLXN0eWxlJywgJ2JvcmRlci1yaWdodC1zdHlsZScsICdib3JkZXItYm90dG9tLXN0eWxlJywgJ2JvcmRlci1sZWZ0LXN0eWxlJyxcbiAgICAnYm9yZGVyLXRvcC13aWR0aCcsICdib3JkZXItcmlnaHQtd2lkdGgnLCAnYm9yZGVyLWJvdHRvbS13aWR0aCcsICdib3JkZXItbGVmdC13aWR0aCcsXG4gICAgJ2JvcmRlci10b3AtY29sb3InLCAnYm9yZGVyLXJpZ2h0LWNvbG9yJywgJ2JvcmRlci1ib3R0b20tY29sb3InLCAnYm9yZGVyLWxlZnQtY29sb3InLFxuICAgICdib3JkZXItdG9wLWxlZnQtcmFkaXVzJywgJ2JvcmRlci10b3AtcmlnaHQtcmFkaXVzJywgJ2JvcmRlci1ib3R0b20tbGVmdC1yYWRpdXMnLCAnYm9yZGVyLWJvdHRvbS1yaWdodC1yYWRpdXMnXG4gIF0sXG4gICdAZmxleGJveCc6IFtcbiAgICAnZGlzcGxheScsICdmbGV4JywgJ2ZsZXgtZGlyZWN0aW9uJywgJ2p1c3RpZnktY29udGVudCcsICdhbGlnbi1pdGVtcycsICdmbGV4LXdyYXAnXG4gIF0sXG4gICdAZm9udCc6IFtcbiAgICAnZm9udC1zaXplJywgJ2ZvbnQtd2VpZ2h0JywgJ2ZvbnQtc3R5bGUnLCAnZm9udC1mYW1pbHknXG4gIF0sXG4gICdAY29sb3JzJzogW1xuICAgICdjb2xvcicsICdiYWNrZ3JvdW5kLWNvbG9yJywgJ29wYWNpdHknXG4gIF0sXG4gIHRleHQ6IFtcbiAgICAnQGJveC1tb2RlbCcsICdAYm9yZGVyJywgJ0BmbGV4Ym94JywgJ0Bmb250JywgJ0Bjb2xvcnMnLFxuICAgICd0ZXh0LWFsaWduJywgJ3RleHQtZGVjb3JhdGlvbicsICd0ZXh0LW92ZXJmbG93J1xuICBdXG59XG5cbi8qKlxuICogRmxhdHRlbiBhIG11bHRpcGxlIGRpbWVuc2lvbiBhcnJheS5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGZsYXR0ZW4gKGFycmF5KSB7XG4gIHJldHVybiBhcnJheS5yZWR1Y2UoKGRpc3QsIGl0ZW0pID0+IHtcbiAgICByZXR1cm4gZGlzdC5jb25jYXQoQXJyYXkuaXNBcnJheShpdGVtKSA/IGZsYXR0ZW4oaXRlbSkgOiBpdGVtKVxuICB9LCBbXSlcbn1cblxuLyoqXG4gKiBDaGVjayBpZiB0aGUgdmFsdWUgaXMgaW4gdGhlIGxpc3QuXG4gKiBAcGFyYW0ge1N0cmluZ30gdHlwZVxuICogQHBhcmFtIHtTdHJpbmd9IHZhbHVlXG4gKiBAcGFyYW0ge09iamVjdH0gZGljdFxuICovXG5leHBvcnQgZnVuY3Rpb24gY2hlY2tTdXBwb3J0ZWQgKHR5cGUsIHZhbHVlLCBkaWN0ID0ge30pIHtcbiAgaWYgKHR5cGUgJiYgdmFsdWUgJiYgZGljdFt0eXBlXSkge1xuICAgIHJldHVybiBmbGF0dGVuKGRpY3RbdHlwZV0ubWFwKGsgPT4gZGljdFtrXSB8fCBrKSkuaW5kZXhPZih2YWx1ZSkgIT09IC0xXG4gIH1cbiAgcmV0dXJuIHRydWVcbn1cblxuLyoqXG4gKiBDaGVjayBpZiB0aGUgc3R5bGUgaXMgc3VwcG9ydGVkIGZvciB0aGUgY29tcG9uZW50LlxuICogQHBhcmFtIHtTdHJpbmd9IHR5cGVcbiAqIEBwYXJhbSB7U3RyaW5nfSBzdHlsZVxuICovXG5leHBvcnQgZnVuY3Rpb24gaXNTdXBwb3J0ZWRTdHlsZSAodHlwZSwgc3R5bGUpIHtcbiAgcmV0dXJuIGNoZWNrU3VwcG9ydGVkKHR5cGUsIHN0eWxlLCBzdXBwb3J0ZWRTdHlsZXMpXG59XG5cbi8qKlxuICogQ2hlY2sgaWYgdGhlIHByb3BlcnR5IGlzIHN1cHBvcnRlZCBmb3IgdGhlIGNvbXBvbmVudC5cbiAqIEBwYXJhbSB7U3RyaW5nfSB0eXBlXG4gKiBAcGFyYW0ge1N0cmluZ30gcHJvcGVydHlcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzU3VwcG9ydGVkUHJvcCAodHlwZSwgcHJvcCkge1xuICByZXR1cm4gY2hlY2tTdXBwb3J0ZWQodHlwZSwgcHJvcCwgc3VwcG9ydGVkUHJvcGVydGllcylcbn1cbiIsImltcG9ydCAqIGFzIHN0eWxlVmFsaWRhdG9yIGZyb20gJy4vc3R5bGUnXG5pbXBvcnQgKiBhcyBwcm9wVmFsaWRhdG9yIGZyb20gJy4vcHJvcCdcbmltcG9ydCB7IGh5cGhlbmF0ZSwgY2FtZWxpemUgfSBmcm9tICcuLi91dGlscydcbmltcG9ydCB7IGlzU3VwcG9ydGVkU3R5bGUgfSBmcm9tICcuL2NoZWNrJ1xuXG5sZXQgb25mYWlsID0gZnVuY3Rpb24gbm9wZSAoKSB7fVxubGV0IHNob3dDb25zb2xlID0gdHJ1ZVxuXG5mdW5jdGlvbiB3YXJuICguLi5hcmdzKSB7XG4gIGNvbnN0IG1lc3NhZ2UgPSBhcmdzLmpvaW4oJyAnKVxuICBzaG93Q29uc29sZSAmJiBjb25zb2xlLmxvZyhtZXNzYWdlKVxuICBvbmZhaWwobWVzc2FnZSlcbiAgcmV0dXJuIG1lc3NhZ2Vcbn1cblxuLyoqXG4gKiBDb25maWd1cmUgdGhlIHZhbGlkYXRvci5cbiAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWdzXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjb25maWd1cmUgKGNvbmZpZ3MgPSB7fSkge1xuICBzaG93Q29uc29sZSA9ICFjb25maWdzLnNpbGVudFxuICBpZiAodHlwZW9mIGNvbmZpZ3Mub25mYWlsID09PSAnZnVuY3Rpb24nKSB7XG4gICAgb25mYWlsID0gY29uZmlncy5vbmZhaWxcbiAgfVxufVxuXG4vKipcbiAqIFZhbGlkYXRlIHRoZSBzdHlsZXMgb2YgdGhlIGNvbXBvbmVudC5cbiAqIEBwYXJhbSB7U3RyaW5nfSB0eXBlXG4gKiBAcGFyYW0ge09iamVjdH0gc3R5bGVzXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB2YWxpZGF0ZVN0eWxlcyAodHlwZSwgc3R5bGVzID0ge30pIHtcbiAgbGV0IGlzVmFsaWQgPSB0cnVlXG4gIGZvciAoY29uc3Qga2V5IGluIHN0eWxlcykge1xuICAgIGlmICghaXNTdXBwb3J0ZWRTdHlsZSh0eXBlLCBoeXBoZW5hdGUoa2V5KSkpIHtcbiAgICAgIGlzVmFsaWQgPSBmYWxzZVxuICAgICAgd2FybihgW1N0eWxlIFZhbGlkYXRvcl0gPCR7dHlwZX0+IGlzIG5vdCBzdXBwb3J0IHRvIHVzZSB0aGUgXCIke2tleX1cIiBzdHlsZS5gKVxuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIGNvbnN0IHZhbGlkYXRvciA9IHN0eWxlVmFsaWRhdG9yW2NhbWVsaXplKGtleSldIHx8IHN0eWxlVmFsaWRhdG9yLmNvbW1vblxuICAgICAgaWYgKCF2YWxpZGF0b3Ioc3R5bGVzW2tleV0sIGh5cGhlbmF0ZShrZXkpKSkge1xuICAgICAgICBpc1ZhbGlkID0gZmFsc2VcbiAgICAgICAgd2FybihgW1N0eWxlIFZhbGlkYXRvcl0gVGhlIHN0eWxlIFwiJHtrZXl9XCIgaXMgbm90IHN1cHBvcnQgdGhlIFwiJHtzdHlsZXNba2V5XX1cIiB2YWx1ZS5gKVxuICAgICAgfVxuICAgIH1cbiAgfVxuICByZXR1cm4gaXNWYWxpZFxufVxuXG4vKipcbiAqIFZhbGlkYXRlIHRoZSBwcm9wZXJ0aWVzIG9mIHRoZSBjb21wb25lbnQuXG4gKiBAcGFyYW0ge1N0cmluZ30gdHlwZVxuICogQHBhcmFtIHtPYmplY3R9IHByb3BzXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB2YWxpZGF0ZVByb3BzICh0eXBlLCBwcm9wcyA9IHt9KSB7XG4gIGxldCBpc1ZhbGlkID0gdHJ1ZVxuICBmb3IgKGNvbnN0IGtleSBpbiBwcm9wcykge1xuICAgIGNvbnN0IHZhbGlkYXRvciA9IHByb3BWYWxpZGF0b3JbY2FtZWxpemUoa2V5KV1cbiAgICBpZiAodmFsaWRhdG9yICYmICF2YWxpZGF0b3IocHJvcHNba2V5XSkpIHtcbiAgICAgIGlzVmFsaWQgPSBmYWxzZVxuICAgICAgd2FybihgW1Byb3BlcnR5IFZhbGlkYXRvcl0gVGhlIHByb3BlcnR5IFwiJHtrZXl9XCIgaXMgbm90IHN1cHBvcnQgdGhlIFwiJHtwcm9wc1trZXldfVwiIHZhbHVlLmApXG4gICAgfVxuICB9XG4gIHJldHVybiBpc1ZhbGlkXG59XG4iLCJpbXBvcnQgeyB2YWxpZGF0ZVN0eWxlcyB9IGZyb20gJy4uL3ZhbGlkYXRvcidcblxuZXhwb3J0IGRlZmF1bHQge1xuICBwcm9wczoge1xuICAgIGNoZWNrZWQ6IHtcbiAgICAgIHR5cGU6IFtCb29sZWFuLCBTdHJpbmddLFxuICAgICAgZGVmYXVsdDogZmFsc2VcbiAgICB9LFxuICAgIGRpc2FibGVkOiB7XG4gICAgICB0eXBlOiBbQm9vbGVhbiwgU3RyaW5nXSxcbiAgICAgIGRlZmF1bHQ6IGZhbHNlXG4gICAgfVxuICB9LFxuICBkYXRhICgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgaXNDaGVja2VkOiAodGhpcy5jaGVja2VkICE9PSAnZmFsc2UnICYmIHRoaXMuY2hlY2tlZCAhPT0gZmFsc2UpLFxuICAgICAgaXNEaXNhYmxlZDogKHRoaXMuZGlzYWJsZWQgIT09ICdmYWxzZScgJiYgdGhpcy5kaXNhYmxlZCAhPT0gZmFsc2UpXG4gICAgfVxuICB9LFxuICBjb21wdXRlZDoge1xuICAgIHdyYXBwZXJDbGFzcyAoKSB7XG4gICAgICBjb25zdCBjbGFzc0FycmF5ID0gWyd3ZWV4LXN3aXRjaCddXG4gICAgICB0aGlzLmlzQ2hlY2tlZCAmJiBjbGFzc0FycmF5LnB1c2goJ3dlZXgtc3dpdGNoLWNoZWNrZWQnKVxuICAgICAgdGhpcy5pc0Rpc2FibGVkICYmIGNsYXNzQXJyYXkucHVzaCgnd2VleC1zd2l0Y2gtZGlzYWJsZWQnKVxuICAgICAgcmV0dXJuIGNsYXNzQXJyYXkuam9pbignICcpXG4gICAgfVxuICB9LFxuICBtZXRob2RzOiB7XG4gICAgdG9nZ2xlICgpIHtcbiAgICAgIC8vIFRPRE86IGhhbmRsZSB0aGUgZXZlbnRzXG4gICAgICBpZiAoIXRoaXMuaXNEaXNhYmxlZCkge1xuICAgICAgICB0aGlzLmlzQ2hlY2tlZCA9ICF0aGlzLmlzQ2hlY2tlZFxuICAgICAgICB0aGlzLiRlbWl0KCdjaGFuZ2UnLCB7IHZhbHVlOiB0aGlzLmlzQ2hlY2tlZCB9KVxuICAgICAgfVxuICAgIH1cbiAgfSxcblxuICByZW5kZXIgKGNyZWF0ZUVsZW1lbnQpIHtcbiAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViA9PT0gJ2RldmVsb3BtZW50Jykge1xuICAgICAgdmFsaWRhdGVTdHlsZXMoJ3N3aXRjaCcsIHRoaXMuJHZub2RlLmRhdGEgJiYgdGhpcy4kdm5vZGUuZGF0YS5zdGF0aWNTdHlsZSlcbiAgICB9XG5cbiAgICByZXR1cm4gY3JlYXRlRWxlbWVudCgnc3BhbicsIHtcbiAgICAgIGF0dHJzOiB7ICd3ZWV4LXR5cGUnOiAnc3dpdGNoJyB9LFxuICAgICAgc3RhdGljQ2xhc3M6IHRoaXMud3JhcHBlckNsYXNzLFxuICAgICAgb246IHsgY2xpY2s6IHRoaXMudG9nZ2xlIH1cbiAgICB9LCBbY3JlYXRlRWxlbWVudCgnc21hbGwnLCB7IHN0YXRpY0NsYXNzOiAnd2VleC1zd2l0Y2gtaW5uZXInIH0pXSlcbiAgfVxufVxuIiwiaW1wb3J0IHsgdmFsaWRhdGVTdHlsZXMgfSBmcm9tICcuLi92YWxpZGF0b3InXG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgcHJvcHM6IHtcbiAgICBzcmM6IFN0cmluZyxcbiAgICByZXNpemU6IHtcbiAgICAgIHZhbGlkYXRvciAodmFsdWUpIHtcbiAgICAgICAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgICAgICAgcmV0dXJuIFsnY292ZXInLCAnY29udGFpbicsICdzdHJldGNoJ10uaW5kZXhPZih2YWx1ZSkgIT09IC0xXG4gICAgICB9XG4gICAgfVxuICB9LFxuXG4gIHJlbmRlciAoY3JlYXRlRWxlbWVudCkge1xuICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WID09PSAnZGV2ZWxvcG1lbnQnKSB7XG4gICAgICB2YWxpZGF0ZVN0eWxlcygnaW1hZ2UnLCB0aGlzLiR2bm9kZS5kYXRhICYmIHRoaXMuJHZub2RlLmRhdGEuc3RhdGljU3R5bGUpXG4gICAgfVxuXG4gICAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgICBpZiAoIXRoaXMuc3JjICYmIHByb2Nlc3MuZW52Lk5PREVfRU5WID09PSAnZGV2ZWxvcG1lbnQnKSB7XG4gICAgICBjb25zb2xlLndhcm4oYFtWdWUgUmVuZGVyZXJdIFRoZSA8aW1hZ2U+IGNvbXBvbmVudCBtdXN0IGhhdmUgdGhlIFwic3JjXCIgYXR0cmlidXRlLmApXG4gICAgfVxuXG4gICAgbGV0IGNzc1RleHQgPSBgYmFja2dyb3VuZC1pbWFnZTp1cmwoXCIke3RoaXMuc3JjfVwiKTtgXG5cbiAgICAvLyBjb21wYXRpYmlsaXR5OiBodHRwOi8vY2FuaXVzZS5jb20vI3NlYXJjaD1iYWNrZ3JvdW5kLXNpemVcbiAgICBjc3NUZXh0ICs9ICh0aGlzLnJlc2l6ZSAmJiB0aGlzLnJlc2l6ZSAhPT0gJ3N0cmV0Y2gnKVxuICAgICAgPyBgYmFja2dyb3VuZC1zaXplOiAke3RoaXMucmVzaXplfTtgXG4gICAgICA6IGBiYWNrZ3JvdW5kLXNpemU6IDEwMCUgMTAwJTtgXG5cbiAgICByZXR1cm4gY3JlYXRlRWxlbWVudCgnZmlndXJlJywge1xuICAgICAgYXR0cnM6IHsgJ3dlZXgtdHlwZSc6ICdpbWFnZScgfSxcbiAgICAgIHN0YXRpY0NsYXNzOiAnd2VleC1pbWFnZScsXG4gICAgICBzdHlsZTogY3NzVGV4dFxuICAgIH0pXG4gIH1cbn1cbiIsImV4cG9ydCBkZWZhdWx0IHtcbiAgbmFtZTogJ2xvYWRpbmctaW5kaWNhdG9yJyxcbiAgcmVuZGVyIChjcmVhdGVFbGVtZW50KSB7XG4gICAgcmV0dXJuIGNyZWF0ZUVsZW1lbnQoJ21hcmsnLCB7XG4gICAgICBhdHRyczogeyAnd2VleC10eXBlJzogJ2xvYWRpbmctaW5kaWNhdG9yJyB9LFxuICAgICAgc3RhdGljQ2xhc3M6ICd3ZWV4LWxvYWRpbmctaW5kaWNhdG9yJ1xuICAgIH0pXG4gIH1cbn1cbiIsImltcG9ydCBpbmRpY2F0b3IgZnJvbSAnLi9sb2FkaW5nLWluZGljYXRvcidcblxuZXhwb3J0IGRlZmF1bHQge1xuICBuYW1lOiAncmVmcmVzaCcsXG4gIGRhdGEgKCkge1xuICAgIHJldHVybiB7XG4gICAgICBoZWlnaHQ6IDBcbiAgICB9XG4gIH0sXG4gIG1ldGhvZHM6IHtcbiAgICBzaG93ICgpIHtcbiAgICAgIHRoaXMuJGVtaXQoJ3JlZnJlc2gnLCAnYWJjJylcbiAgICAgIC8vIGNvbnNvbGUubG9nKCd3aWxsIGVtaXQgcmVmcmVzaCcpXG4gICAgICB0aGlzLmhlaWdodCA9ICcxMjBweCdcbiAgICAgIHRoaXMudmlzaWJpbGl0eSA9ICd2aXNpYmxlJ1xuICAgIH0sXG4gICAgcmVzZXQgKCkge1xuICAgICAgdGhpcy5oZWlnaHQgPSAwXG4gICAgICB0aGlzLnZpc2liaWxpdHkgPSAnaGlkZGVuJ1xuICAgICAgdGhpcy4kZW1pdCgncmVmcmVzaGZpbmlzaCcpXG4gICAgfVxuICB9LFxuICByZW5kZXIgKGNyZWF0ZUVsZW1lbnQpIHtcbiAgICByZXR1cm4gY3JlYXRlRWxlbWVudCgnYXNpZGUnLCB7XG4gICAgICBhdHRyczogeyAnd2VleC10eXBlJzogJ3JlZnJlc2gnIH0sXG4gICAgICBzdHlsZTogeyBoZWlnaHQ6IHRoaXMuaGVpZ2h0LCB2aXNpYmlsaXR5OiB0aGlzLnZpc2liaWxpdHkgfSxcbiAgICAgIHN0YXRpY0NsYXNzOiAnd2VleC1yZWZyZXNoJ1xuICAgIH0sIFtjcmVhdGVFbGVtZW50KGluZGljYXRvcildKVxuICB9XG59XG4iLCJpbXBvcnQgaW5kaWNhdG9yIGZyb20gJy4vbG9hZGluZy1pbmRpY2F0b3InXG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgbmFtZTogJ2xvYWRpbmcnLFxuICBkYXRhICgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgaGVpZ2h0OiAwXG4gICAgfVxuICB9LFxuICBtZXRob2RzOiB7XG4gICAgc2hvdyAoKSB7XG4gICAgICB0aGlzLiRlbWl0KCdsb2FkaW5nJylcbiAgICAgIGNvbnNvbGUubG9nKCd3aWxsIGVtaXQgbG9hZGluZycpXG4gICAgICB0aGlzLmhlaWdodCA9ICcxMjBweCdcbiAgICAgIHRoaXMudmlzaWJpbGl0eSA9ICd2aXNpYmxlJ1xuICAgICAgY29uc29sZS5sb2codGhpcywgdGhpcy5oZWlnaHQpXG4gICAgfSxcbiAgICByZXNldCAoKSB7XG4gICAgICB0aGlzLmhlaWdodCA9IDBcbiAgICAgIHRoaXMudmlzaWJpbGl0eSA9ICdoaWRkZW4nXG4gICAgICB0aGlzLiRlbWl0KCdsb2FkaW5nZmluaXNoJylcbiAgICB9XG4gIH0sXG4gIHJlbmRlciAoY3JlYXRlRWxlbWVudCkge1xuICAgIHJldHVybiBjcmVhdGVFbGVtZW50KCdhc2lkZScsIHtcbiAgICAgIHJlZjogJ2luZGljYXRvcicsXG4gICAgICBhdHRyczogeyAnd2VleC10eXBlJzogJ2xvYWRpbmcnIH0sXG4gICAgICBzdHlsZTogeyBoZWlnaHQ6IHRoaXMuaGVpZ2h0LCB2aXNpYmlsaXR5OiB0aGlzLnZpc2liaWxpdHkgfSxcbiAgICAgIHN0YXRpY0NsYXNzOiAnd2VleC1sb2FkaW5nJ1xuICAgIH0sIFtjcmVhdGVFbGVtZW50KGluZGljYXRvcildKVxuICB9XG59XG4iLCJcbmV4cG9ydCBmdW5jdGlvbiBjb21wdXRlV3JhcHBlclNpemUgKGNvbnRleHQpIHtcbiAgY29uc3Qgd3JhcHBlciA9IGNvbnRleHQuJHJlZnMud3JhcHBlclxuICBpZiAod3JhcHBlcikge1xuICAgIGNvbnN0IHJlY3QgPSB3cmFwcGVyLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpXG4gICAgY29udGV4dC53cmFwcGVyV2lkdGggPSByZWN0LndpZHRoXG4gICAgY29udGV4dC53cmFwcGVySGVpZ2h0ID0gcmVjdC5oZWlnaHRcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gcmVhY2hUb3AgKGNvbnRleHQpIHtcbiAgY29uc3Qgd3JhcHBlciA9IGNvbnRleHQuJHJlZnMud3JhcHBlclxuICByZXR1cm4gKCEhd3JhcHBlcikgJiYgKHdyYXBwZXIuc2Nyb2xsVG9wIDw9IDApXG59XG5cbmV4cG9ydCBmdW5jdGlvbiByZWFjaEJvdHRvbSAoY29udGV4dCkge1xuICBjb25zdCB3cmFwcGVyID0gY29udGV4dC4kcmVmcy53cmFwcGVyXG4gIGNvbnN0IGlubmVyID0gY29udGV4dC4kcmVmcy5pbm5lclxuICBjb25zdCBvZmZzZXQgPSBOdW1iZXIoY29udGV4dC5sb2FkbW9yZW9mZnNldCkgfHwgMFxuXG4gIGlmICh3cmFwcGVyICYmIGlubmVyKSB7XG4gICAgY29uc3QgaW5uZXJIZWlnaHQgPSBpbm5lci5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5oZWlnaHRcbiAgICBjb25zdCB3cmFwcGVySGVpZ2h0ID0gd3JhcHBlci5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5oZWlnaHRcbiAgICByZXR1cm4gd3JhcHBlci5zY3JvbGxUb3AgPj0gaW5uZXJIZWlnaHQgLSB3cmFwcGVySGVpZ2h0IC0gb2Zmc2V0XG4gIH1cbiAgcmV0dXJuIGZhbHNlXG59XG4iLCJpbXBvcnQgeyBleHRlbmQgfSBmcm9tICcuLi91dGlscydcblxuLyoqXG4gKiBDcmVhdGUgRXZlbnQuXG4gKiBAcGFyYW0ge0RPTVN0cmluZ30gdHlwZVxuICogQHBhcmFtIHtPYmplY3R9IHByb3BzXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVFdmVudCAoY29udGV4dCwgdHlwZSwgcHJvcHMpIHtcbiAgY29uc3QgZXZlbnQgPSBuZXcgRXZlbnQodHlwZSwgeyBidWJibGVzOiBmYWxzZSB9KVxuICBldmVudC5wcmV2ZW50RGVmYXVsdCgpXG4gIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpXG5cbiAgZXh0ZW5kKGV2ZW50LCBwcm9wcylcblxuICBPYmplY3QuZGVmaW5lUHJvcGVydHkoZXZlbnQsICd0YXJnZXQnLCB7XG4gICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICB2YWx1ZTogY29udGV4dCB8fCBudWxsXG4gIH0pXG5cbiAgcmV0dXJuIGV2ZW50XG59XG5cbi8qKlxuICogQ3JlYXRlIEN1c3RvbSBFdmVudC5cbiAqIEBwYXJhbSB7RE9NU3RyaW5nfSB0eXBlXG4gKiBAcGFyYW0ge09iamVjdH0gcHJvcHNcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUN1c3RvbUV2ZW50IChjb250ZXh0LCB0eXBlLCBwcm9wcykge1xuICAvLyBjb21wYXRpYmlsaXR5OiBodHRwOi8vY2FuaXVzZS5jb20vI3NlYXJjaD1jdXN0b21ldmVudFxuICAvLyBjb25zdCBldmVudCA9IG5ldyBDdXN0b21FdmVudCh0eXBlKVxuICBjb25zdCBldmVudCA9IGRvY3VtZW50LmNyZWF0ZUV2ZW50KCdDdXN0b21FdmVudCcpXG4gIGV2ZW50LmluaXRDdXN0b21FdmVudCh0eXBlLCBmYWxzZSwgdHJ1ZSwge30pXG4gIGV2ZW50LnByZXZlbnREZWZhdWx0KClcbiAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKClcblxuICBleHRlbmQoZXZlbnQsIHByb3BzKVxuXG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShldmVudCwgJ3RhcmdldCcsIHtcbiAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgIHZhbHVlOiBjb250ZXh0IHx8IG51bGxcbiAgfSlcblxuICByZXR1cm4gZXZlbnRcbn1cblxuLyoqXG4gKiBDaGVjayBhbmQgZW1pdCBsb25ncHJlc3MgZXZlbnQuXG4gKiBAcGFyYW0ge09iamVjdH0gZXZlbnRcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGhhbmRsZUxvbmdQcmVzcyAoY29udGV4dCwgZXZlbnQpIHtcbiAgLy8gVE9ETzogY2hlY2sgdGhlIGNvbmRpdGlvblxuICBjb250ZXh0LiRlbWl0KCdsb25ncHJlc3MnLCBjb250ZXh0LmNyZWF0ZUN1c3RvbUV2ZW50KCdsb25ncHJlc3MnKSlcbn1cblxuLyoqXG4gKiBDaGVjayBhbmQgZW1pdCBhcHBlYXIgZXZlbnQuXG4gKiBAcGFyYW0ge09iamVjdH0gZXZlbnRcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGhhbmRsZUFwcGVhciAoY29udGV4dCwgZXZlbnQpIHtcbiAgLy8gVE9ETzogY2hlY2sgdGhlIGNvbmRpdGlvblxuICBjb250ZXh0LiRlbWl0KCdhcHBlYXInLCBjb250ZXh0LmNyZWF0ZUN1c3RvbUV2ZW50KCdhcHBlYXInKSlcbn1cblxuLyoqXG4gKiBDaGVjayBhbmQgZW1pdCBkaXNhcHBlYXIgZXZlbnQuXG4gKiBAcGFyYW0ge09iamVjdH0gZXZlbnRcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGhhbmREaXNhcHBlYXIgKGNvbnRleHQsIGV2ZW50KSB7XG4gIC8vIFRPRE86IGNoZWNrIHRoZSBjb25kaXRpb25cbiAgY29udGV4dC4kZW1pdCgnZGlzYXBwZWFyJywgY29udGV4dC5jcmVhdGVDdXN0b21FdmVudCgnZGlzYXBwZWFyJykpXG59XG4iLCJleHBvcnQgZGVmYXVsdCB7XG4gIG1ldGhvZHM6IHtcbiAgICBtb3ZlVG8gKG9mZnNldFkgPSAwLCBkb25lKSB7XG4gICAgICBjb25zdCBpbm5lciA9IHRoaXMuJHJlZnMuaW5uZXJcbiAgICAgIGlmIChpbm5lcikge1xuICAgICAgICBpbm5lci5zdHlsZS53aWxsQ2hhbmdlID0gYHRyYW5zZm9ybWBcbiAgICAgICAgaW5uZXIuc3R5bGUudHJhbnNpdGlvbiA9IGB0cmFuc2Zvcm0gLjJzIGVhc2UtaW4tb3V0YFxuICAgICAgICBpbm5lci5zdHlsZS50cmFuc2Zvcm0gPSBgdHJhbnNsYXRlM2QoMCwgJHtvZmZzZXRZfSwgMClgXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgIGlubmVyLnN0eWxlLnRyYW5zaXRpb24gPSAnJ1xuICAgICAgICAgIGlubmVyLnN0eWxlLndpbGxDaGFuZ2UgPSAnJ1xuICAgICAgICAgIGRvbmUgJiYgZG9uZSgpXG4gICAgICAgIH0sIDIwMClcbiAgICAgIH1cbiAgICB9LFxuXG4gICAgZG9uZSAoKSB7XG4gICAgICB0aGlzLm1vdmVUbygwKVxuICAgICAgdGhpcy5fcmVmcmVzaCAmJiB0aGlzLl9yZWZyZXNoLnJlc2V0KClcbiAgICAgIHRoaXMuX2xvYWRpbmcgJiYgdGhpcy5fbG9hZGluZy5yZXNldCgpXG4gICAgfSxcblxuICAgIHNob3dSZWZyZXNoICgpIHtcbiAgICAgIC8vIGNvbnNvbGUubG9nKCdzaG93IHJlZnJlc2gnKVxuICAgICAgdGhpcy5tb3ZlVG8oJzEyMHB4JylcbiAgICAgIGlmICh0aGlzLl9yZWZyZXNoICYmIHRoaXMuX3JlZnJlc2guY2hpbGQpIHtcbiAgICAgICAgLy8gY29uc29sZS5sb2codGhpcy5fcmVmcmVzaClcbiAgICAgICAgdGhpcy5fcmVmcmVzaC5jaGlsZC5zaG93KClcbiAgICAgICAgLy8gdGhpcy5fcmVmcmVzaC5jaGlsZC4kZW1pdCgncmVmcmVzaCcsIHRoaXMuY3JlYXRlQ3VzdG9tRXZlbnQoJ3JlZnJlc2gnKSlcbiAgICAgIH1cbiAgICB9LFxuXG4gICAgc2hvd0xvYWRpbmcgKCkge1xuICAgICAgLy8gY29uc29sZS5sb2coJ3Nob3cgbG9hZGluZycpXG4gICAgICB0aGlzLm1vdmVUbygnLTEyMHB4JylcbiAgICAgIGlmICh0aGlzLl9sb2FkaW5nICYmIHRoaXMuX2xvYWRpbmcuY2hpbGQpIHtcbiAgICAgICAgLy8gdGhpcy5fbG9hZGluZy5oZWlnaHQgPSAnMTIwcHgnXG4gICAgICAgIHRoaXMuX2xvYWRpbmcuY2hpbGQuc2hvdygpXG4gICAgICAgIC8vIHRoaXMuJGVtaXQoJ2xvYWRpbmcnLCB0aGlzLmNyZWF0ZUN1c3RvbUV2ZW50KCdsb2FkaW5nJykpXG4gICAgICB9XG4gICAgfSxcblxuICAgIGhhbmRsZVRvdWNoU3RhcnQgKGV2ZW50KSB7XG4gICAgICAvLyBUT0RPOiBvbmx5IHRoZSBsaXN0IGlzIGF0IHRvcCAmIGJvdHRvbSB3aWxsIHRyaWdnZXIgdGhlIHRvdWNoIGV2ZW50XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpXG4gICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKVxuICAgICAgLy8gY29uc29sZS5sb2coJ3RvdWNoIHN0YXJ0JywgZXZlbnQpXG4gICAgICAvLyBjb25zb2xlLmxvZygncmVhY2hUb3A6JywgdGhpcy5yZWFjaFRvcCgpKVxuICAgICAgLy8gY29uc29sZS5sb2coJ3JlYWNoQm90dG9tOicsIHRoaXMucmVhY2hCb3R0b20oKSlcbiAgICAgIGNvbnN0IHRvdWNoID0gZXZlbnQuY2hhbmdlZFRvdWNoZXNbMF1cbiAgICAgIC8vIGNvbnNvbGUubG9nKCd0b3VjaCBzdGFydCcsIGV2ZW50LnRhcmdldCwgZXZlbnQudGFyZ2V0LnBhZ2VZKVxuICAgICAgLy8gY29uc29sZS5sb2coJ3RvdWNoZXMnLCB0b3VjaClcbiAgICAgIHRoaXMuX3RvdWNoUGFyYW1zID0ge1xuICAgICAgICByZWFjaFRvcDogdGhpcy5yZWFjaFRvcCgpLFxuICAgICAgICByZWFjaEJvdHRvbTogdGhpcy5yZWFjaEJvdHRvbSgpLFxuICAgICAgICBzdGFydFRvdWNoRXZlbnQ6IHRvdWNoLFxuICAgICAgICBzdGFydFg6IHRvdWNoLnBhZ2VYLFxuICAgICAgICBzdGFydFk6IHRvdWNoLnBhZ2VZLFxuICAgICAgICB0aW1lU3RhbXA6IGV2ZW50LnRpbWVTdGFtcFxuICAgICAgfVxuICAgIH0sXG5cbiAgICBoYW5kbGVUb3VjaE1vdmUgKGV2ZW50KSB7XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpXG4gICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKVxuICAgICAgLy8gY29uc29sZS5sb2coJ3RvdWNoIG1vdmUnKVxuICAgICAgaWYgKHRoaXMuX3RvdWNoUGFyYW1zKSB7XG4gICAgICAgIGNvbnN0IGlubmVyID0gdGhpcy4kcmVmcy5pbm5lclxuICAgICAgICBjb25zdCB7IHN0YXJ0WSwgcmVhY2hUb3AsIHJlYWNoQm90dG9tIH0gPSB0aGlzLl90b3VjaFBhcmFtc1xuICAgICAgICBpZiAoaW5uZXIgJiYgKHJlYWNoVG9wIHx8IHJlYWNoQm90dG9tKSkge1xuICAgICAgICAgIGNvbnN0IHRvdWNoID0gZXZlbnQuY2hhbmdlZFRvdWNoZXNbMF1cbiAgICAgICAgICBjb25zdCBvZmZzZXRZID0gdG91Y2gucGFnZVkgLSBzdGFydFlcbiAgICAgICAgICAvLyBjb25zb2xlLmxvZygnb2Zmc2V0WScsIG9mZnNldFksICdzdGFydFknLCBzdGFydFksICdwYWdlWScsIHRvdWNoLnBhZ2VZKVxuICAgICAgICAgIHRoaXMuX3RvdWNoUGFyYW1zLm9mZnNldFkgPSBvZmZzZXRZXG4gICAgICAgICAgaWYgKG9mZnNldFkpIHtcbiAgICAgICAgICAgIGlubmVyLnN0eWxlLnRyYW5zZm9ybSA9IGB0cmFuc2xhdGUzZCgwLCAke29mZnNldFl9cHgsIDApYFxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG5cbiAgICBoYW5kbGVUb3VjaEVuZCAoZXZlbnQpIHtcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KClcbiAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpXG4gICAgICAvLyBjb25zb2xlLmxvZygndG91Y2ggZW5kJylcbiAgICAgIGlmICh0aGlzLl90b3VjaFBhcmFtcykge1xuICAgICAgICBjb25zdCBpbm5lciA9IHRoaXMuJHJlZnMuaW5uZXJcbiAgICAgICAgY29uc3QgeyBvZmZzZXRZLCByZWFjaFRvcCwgcmVhY2hCb3R0b20gfSA9IHRoaXMuX3RvdWNoUGFyYW1zXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKCdvZmZzZXRZOicsIG9mZnNldFkpXG4gICAgICAgIGlmIChpbm5lciAmJiAocmVhY2hUb3AgfHwgcmVhY2hCb3R0b20pKSB7XG4gICAgICAgICAgLy8gdGhpcy5tb3ZlVG8oMClcbiAgICAgICAgICBpZiAob2Zmc2V0WSA+IDEyMCkge1xuICAgICAgICAgICAgdGhpcy5zaG93UmVmcmVzaCgpXG4gICAgICAgICAgfVxuICAgICAgICAgIGVsc2UgaWYgKG9mZnNldFkgPCAtMTIwKSB7XG4gICAgICAgICAgICB0aGlzLnNob3dMb2FkaW5nKClcbiAgICAgICAgICB9XG4gICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLm1vdmVUbygwKVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgZGVsZXRlIHRoaXMuX3RvdWNoUGFyYW1zXG4gICAgfVxuICB9XG59XG4iLCJpbXBvcnQgeyB2YWxpZGF0ZVN0eWxlcyB9IGZyb20gJy4uLy4uL3ZhbGlkYXRvcidcbmltcG9ydCB7IGRlYm91bmNlLCB0aHJvdHRsZSwgYmluZCwgY3JlYXRlTWl4aW4gfSBmcm9tICcuLi8uLi91dGlscydcbmltcG9ydCByZWZyZXNoIGZyb20gJy4vcmVmcmVzaCdcbmltcG9ydCBsb2FkaW5nIGZyb20gJy4vbG9hZGluZydcbmltcG9ydCAqIGFzIHJlY3RNZXRob2RzIGZyb20gJy4uLy4uL21ldGhvZHMvcmVjdCdcbmltcG9ydCAqIGFzIGV2ZW50TWV0aG9kcyBmcm9tICcuLi8uLi9tZXRob2RzL2V2ZW50J1xuaW1wb3J0IGxpc3RNaXhpbiBmcm9tICcuL2xpc3RNaXhpbidcblxuZXhwb3J0IGRlZmF1bHQge1xuICBtaXhpbnM6IFtjcmVhdGVNaXhpbihyZWN0TWV0aG9kcywgZXZlbnRNZXRob2RzKSwgbGlzdE1peGluXSxcbiAgcHJvcHM6IHtcbiAgICBsb2FkbW9yZW9mZnNldDoge1xuICAgICAgdHlwZTogW1N0cmluZywgTnVtYmVyXSxcbiAgICAgIGRlZmF1bHQ6IDBcbiAgICB9XG4gIH0sXG5cbiAgbWV0aG9kczoge1xuICAgIHVwZGF0ZUxheW91dCAoKSB7XG4gICAgICB0aGlzLmNvbXB1dGVXcmFwcGVyU2l6ZSgpXG4gICAgICBpZiAodGhpcy5fY2VsbHMgJiYgdGhpcy5fY2VsbHMubGVuZ3RoKSB7XG4gICAgICAgIHRoaXMuX2NlbGxzLmZvckVhY2godm5vZGUgPT4ge1xuICAgICAgICAgIHZub2RlLl92aXNpYmxlID0gdGhpcy5pc0NlbGxWaXNpYmxlKHZub2RlLmVsbSlcbiAgICAgICAgfSlcbiAgICAgIH1cbiAgICB9LFxuICAgIGlzQ2VsbFZpc2libGUgKGVsZW0pIHtcbiAgICAgIGlmICghdGhpcy53cmFwcGVySGVpZ2h0KSB7XG4gICAgICAgIHRoaXMuY29tcHV0ZVdyYXBwZXJTaXplKClcbiAgICAgIH1cbiAgICAgIGNvbnN0IHdyYXBwZXIgPSB0aGlzLiRyZWZzLndyYXBwZXJcbiAgICAgIHJldHVybiB3cmFwcGVyLnNjcm9sbFRvcCA8PSBlbGVtLm9mZnNldFRvcFxuICAgICAgICAmJiBlbGVtLm9mZnNldFRvcCA8IHdyYXBwZXIuc2Nyb2xsVG9wICsgdGhpcy53cmFwcGVySGVpZ2h0XG4gICAgfSxcblxuICAgIGhhbmRsZVNjcm9sbCAoZXZlbnQpIHtcbiAgICAgIHRoaXMuX2NlbGxzLmZvckVhY2goKHZub2RlLCBpbmRleCkgPT4ge1xuICAgICAgICBjb25zdCB2aXNpYmxlID0gdGhpcy5pc0NlbGxWaXNpYmxlKHZub2RlLmVsbSlcbiAgICAgICAgaWYgKHZpc2libGUgIT09IHZub2RlLl92aXNpYmxlKSB7XG4gICAgICAgICAgY29uc3QgdHlwZSA9IHZpc2libGUgPyAnYXBwZWFyJyA6ICdkaXNhcHBlYXInXG4gICAgICAgICAgdm5vZGUuX3Zpc2libGUgPSB2aXNpYmxlXG5cbiAgICAgICAgICAvLyBUT0RPOiBkaXNwYXRjaCBDdXN0b21FdmVudFxuICAgICAgICAgIHZub2RlLmVsbS5kaXNwYXRjaEV2ZW50KG5ldyBFdmVudCh0eXBlKSwge30pXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgICBpZiAodGhpcy5yZWFjaEJvdHRvbSgpKSB7XG4gICAgICAgIHRoaXMuJGVtaXQoJ2xvYWRtb3JlJywgdGhpcy5jcmVhdGVDdXN0b21FdmVudCgnbG9hZG1vcmUnKSlcbiAgICAgIH1cbiAgICB9LFxuXG4gICAgY3JlYXRlQ2hpbGRyZW4gKGNyZWF0ZUVsZW1lbnQpIHtcbiAgICAgIGNvbnN0IHNsb3RzID0gdGhpcy4kc2xvdHMuZGVmYXVsdCB8fCBbXVxuICAgICAgdGhpcy5fY2VsbHMgPSBzbG90cy5maWx0ZXIodm5vZGUgPT4ge1xuICAgICAgICAvLyBjb25zb2xlLmxvZyh2bm9kZS50YWcpXG4gICAgICAgIGlmICghdm5vZGUudGFnIHx8ICF2bm9kZS5jb21wb25lbnRPcHRpb25zKSByZXR1cm4gZmFsc2VcbiAgICAgICAgY29uc3QgdGFnTmFtZSA9IHZub2RlLmNvbXBvbmVudE9wdGlvbnMudGFnXG4gICAgICAgIGlmICh0YWdOYW1lID09PSAnbG9hZGluZycpIHtcbiAgICAgICAgICB0aGlzLl9sb2FkaW5nID0gY3JlYXRlRWxlbWVudChsb2FkaW5nLCB7XG4gICAgICAgICAgICBvbjoge1xuICAgICAgICAgICAgICBsb2FkaW5nOiAoKSA9PiB0aGlzLiRlbWl0KCdsb2FkaW5nJywgdGhpcy5jcmVhdGVDdXN0b21FdmVudCgnbG9hZGluZycpKVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pXG4gICAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRhZ05hbWUgPT09ICdyZWZyZXNoJykge1xuICAgICAgICAgIHRoaXMuX3JlZnJlc2ggPSBjcmVhdGVFbGVtZW50KHJlZnJlc2gsIHtcbiAgICAgICAgICAgIG9uOiB7XG4gICAgICAgICAgICAgIHJlZnJlc2g6ICgpID0+IHRoaXMuJGVtaXQoJ3JlZnJlc2gnLCB0aGlzLmNyZWF0ZUN1c3RvbUV2ZW50KCdyZWZyZXNoJykpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSlcbiAgICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgfSlcbiAgICAgIHJldHVybiBbXG4gICAgICAgIHRoaXMuX3JlZnJlc2gsXG4gICAgICAgIGNyZWF0ZUVsZW1lbnQoJ2RpdicsIHtcbiAgICAgICAgICByZWY6ICdpbm5lcicsXG4gICAgICAgICAgc3RhdGljQ2xhc3M6ICd3ZWV4LWxpc3QtaW5uZXInXG4gICAgICAgIH0sIHRoaXMuX2NlbGxzKSxcbiAgICAgICAgdGhpcy5fbG9hZGluZ1xuICAgICAgXVxuICAgIH1cbiAgfSxcblxuICByZW5kZXIgKGNyZWF0ZUVsZW1lbnQpIHtcbiAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViA9PT0gJ2RldmVsb3BtZW50Jykge1xuICAgICAgdmFsaWRhdGVTdHlsZXMoJ2xpc3QnLCB0aGlzLiR2bm9kZS5kYXRhICYmIHRoaXMuJHZub2RlLmRhdGEuc3RhdGljU3R5bGUpXG4gICAgfVxuXG4gICAgdGhpcy4kbmV4dFRpY2soKCkgPT4ge1xuICAgICAgdGhpcy51cGRhdGVMYXlvdXQoKVxuICAgIH0pXG5cbiAgICByZXR1cm4gY3JlYXRlRWxlbWVudCgnbWFpbicsIHtcbiAgICAgIHJlZjogJ3dyYXBwZXInLFxuICAgICAgYXR0cnM6IHsgJ3dlZXgtdHlwZSc6ICdsaXN0JyB9LFxuICAgICAgc3RhdGljQ2xhc3M6ICd3ZWV4LWxpc3Qgd2VleC1saXN0LXdyYXBwZXInLFxuICAgICAgb246IHtcbiAgICAgICAgc2Nyb2xsOiBkZWJvdW5jZShiaW5kKHRoaXMuaGFuZGxlU2Nyb2xsLCB0aGlzKSwgMzApLFxuICAgICAgICB0b3VjaHN0YXJ0OiB0aGlzLmhhbmRsZVRvdWNoU3RhcnQsXG4gICAgICAgIHRvdWNobW92ZTogdGhyb3R0bGUoYmluZCh0aGlzLmhhbmRsZVRvdWNoTW92ZSwgdGhpcyksIDI1KSxcbiAgICAgICAgdG91Y2hlbmQ6IHRoaXMuaGFuZGxlVG91Y2hFbmRcbiAgICAgIH1cbiAgICB9LCB0aGlzLmNyZWF0ZUNoaWxkcmVuKGNyZWF0ZUVsZW1lbnQpKVxuICB9XG59XG4iLCJpbXBvcnQgeyB2YWxpZGF0ZVN0eWxlcyB9IGZyb20gJy4uLy4uL3ZhbGlkYXRvcidcblxuZXhwb3J0IGRlZmF1bHQge1xuICByZW5kZXIgKGNyZWF0ZUVsZW1lbnQpIHtcbiAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViA9PT0gJ2RldmVsb3BtZW50Jykge1xuICAgICAgdmFsaWRhdGVTdHlsZXMoJ2NlbGwnLCB0aGlzLiR2bm9kZS5kYXRhICYmIHRoaXMuJHZub2RlLmRhdGEuc3RhdGljU3R5bGUpXG4gICAgfVxuXG4gICAgcmV0dXJuIGNyZWF0ZUVsZW1lbnQoJ3NlY3Rpb24nLCB7XG4gICAgICBhdHRyczogeyAnd2VleC10eXBlJzogJ2NlbGwnIH0sXG4gICAgICBzdGF0aWNDbGFzczogJ3dlZXgtY2VsbCdcbiAgICB9LCB0aGlzLiRzbG90cy5kZWZhdWx0KVxuICB9XG59XG4iLCJpbXBvcnQgeyB2YWxpZGF0ZVN0eWxlcyB9IGZyb20gJy4uL3ZhbGlkYXRvcidcbmltcG9ydCB7IGRlYm91bmNlLCBiaW5kLCBjcmVhdGVNaXhpbiB9IGZyb20gJy4uL3V0aWxzJ1xuaW1wb3J0ICogYXMgcmVjdE1ldGhvZHMgZnJvbSAnLi4vbWV0aG9kcy9yZWN0J1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIG1peGluczogW2NyZWF0ZU1peGluKHJlY3RNZXRob2RzKV0sXG4gIHByb3BzOiB7XG4gICAgc2Nyb2xsRGlyZWN0aW9uOiB7XG4gICAgICB0eXBlOiBbU3RyaW5nXSxcbiAgICAgIGRlZmF1bHQ6ICd2ZXJ0aWNhbCcsXG4gICAgICB2YWxpZGF0b3IgKHZhbHVlKSB7XG4gICAgICAgIHJldHVybiBbJ2hvcml6b250YWwnLCAndmVydGljYWwnXS5pbmRleE9mKHZhbHVlKSAhPT0gLTFcbiAgICAgIH1cbiAgICB9LFxuICAgIGxvYWRtb3Jlb2Zmc2V0OiB7XG4gICAgICB0eXBlOiBbU3RyaW5nLCBOdW1iZXJdLFxuICAgICAgZGVmYXVsdDogMFxuICAgIH1cbiAgfSxcblxuICBjb21wdXRlZDoge1xuICAgIHdyYXBwZXJDbGFzcyAoKSB7XG4gICAgICBjb25zdCBjbGFzc0FycmF5ID0gWyd3ZWV4LXNjcm9sbGVyJywgJ3dlZXgtc2Nyb2xsZXItd3JhcHBlciddXG4gICAgICBpZiAodGhpcy5zY3JvbGxEaXJlY3Rpb24gPT09ICdob3Jpem9udGFsJykge1xuICAgICAgICBjbGFzc0FycmF5LnB1c2goJ3dlZXgtc2Nyb2xsZXItaG9yaXpvbnRhbCcpXG4gICAgICB9XG4gICAgICByZXR1cm4gY2xhc3NBcnJheS5qb2luKCcgJylcbiAgICB9XG4gIH0sXG5cbiAgbWV0aG9kczoge1xuICAgIHVwZGF0ZUxheW91dCAoKSB7XG4gICAgICB0aGlzLmNvbXB1dGVXcmFwcGVyU2l6ZSgpXG4gICAgICBpZiAodGhpcy5fY2VsbHMgJiYgdGhpcy5fY2VsbHMubGVuZ3RoKSB7XG4gICAgICAgIHRoaXMuX2NlbGxzLmZvckVhY2godm5vZGUgPT4ge1xuICAgICAgICAgIHZub2RlLl92aXNpYmxlID0gdGhpcy5pc0NlbGxWaXNpYmxlKHZub2RlLmVsbSlcbiAgICAgICAgfSlcbiAgICAgIH1cbiAgICB9LFxuICAgIGlzQ2VsbFZpc2libGUgKGVsZW0pIHtcbiAgICAgIGlmICghdGhpcy53cmFwcGVySGVpZ2h0KSB7XG4gICAgICAgIHRoaXMuY29tcHV0ZVdyYXBwZXJTaXplKClcbiAgICAgIH1cbiAgICAgIGNvbnN0IHdyYXBwZXIgPSB0aGlzLiRyZWZzLndyYXBwZXJcbiAgICAgIHJldHVybiB3cmFwcGVyLnNjcm9sbFRvcCA8PSBlbGVtLm9mZnNldFRvcFxuICAgICAgICAmJiBlbGVtLm9mZnNldFRvcCA8IHdyYXBwZXIuc2Nyb2xsVG9wICsgdGhpcy53cmFwcGVySGVpZ2h0XG4gICAgfSxcbiAgICBoYW5kbGVTY3JvbGwgKGV2ZW50KSB7XG4gICAgICB0aGlzLl9jZWxscy5mb3JFYWNoKCh2bm9kZSwgaW5kZXgpID0+IHtcbiAgICAgICAgY29uc3QgdmlzaWJsZSA9IHRoaXMuaXNDZWxsVmlzaWJsZSh2bm9kZS5lbG0pXG4gICAgICAgIGlmICh2aXNpYmxlICE9PSB2bm9kZS5fdmlzaWJsZSkge1xuICAgICAgICAgIGNvbnN0IHR5cGUgPSB2aXNpYmxlID8gJ2FwcGVhcicgOiAnZGlzYXBwZWFyJ1xuICAgICAgICAgIHZub2RlLl92aXNpYmxlID0gdmlzaWJsZVxuXG4gICAgICAgICAgLy8gVE9ETzogZGlzcGF0Y2ggQ3VzdG9tRXZlbnRcbiAgICAgICAgICB2bm9kZS5lbG0uZGlzcGF0Y2hFdmVudChuZXcgRXZlbnQodHlwZSksIHt9KVxuICAgICAgICB9XG4gICAgICB9KVxuICAgICAgaWYgKHRoaXMucmVhY2hCb3R0b20oKSkge1xuICAgICAgICB0aGlzLiRlbWl0KCdsb2FkbW9yZScsIGV2ZW50KVxuICAgICAgfVxuICAgIH1cbiAgfSxcblxuICByZW5kZXIgKGNyZWF0ZUVsZW1lbnQpIHtcbiAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViA9PT0gJ2RldmVsb3BtZW50Jykge1xuICAgICAgdmFsaWRhdGVTdHlsZXMoJ3Njcm9sbGVyJywgdGhpcy4kdm5vZGUuZGF0YSAmJiB0aGlzLiR2bm9kZS5kYXRhLnN0YXRpY1N0eWxlKVxuICAgIH1cblxuICAgIHRoaXMuX2NlbGxzID0gdGhpcy4kc2xvdHMuZGVmYXVsdCB8fCBbXVxuICAgIHRoaXMuJG5leHRUaWNrKCgpID0+IHtcbiAgICAgIHRoaXMudXBkYXRlTGF5b3V0KClcbiAgICB9KVxuXG4gICAgcmV0dXJuIGNyZWF0ZUVsZW1lbnQoJ21haW4nLCB7XG4gICAgICByZWY6ICd3cmFwcGVyJyxcbiAgICAgIGF0dHJzOiB7ICd3ZWV4LXR5cGUnOiAnc2Nyb2xsZXInIH0sXG4gICAgICBzdGF0aWNDbGFzczogdGhpcy53cmFwcGVyQ2xhc3MsXG4gICAgICBvbjoge1xuICAgICAgICBzY3JvbGw6IGRlYm91bmNlKGJpbmQodGhpcy5oYW5kbGVTY3JvbGwsIHRoaXMpLCAxMDApXG4gICAgICB9XG4gICAgfSwgW1xuICAgICAgY3JlYXRlRWxlbWVudCgnbWFyaycsIHsgcmVmOiAndG9wTWFyaycsIHN0YXRpY0NsYXNzOiAnd2VleC1zY3JvbGxlci10b3AtbWFyaycgfSksXG4gICAgICBjcmVhdGVFbGVtZW50KCdkaXYnLCB7XG4gICAgICAgIHJlZjogJ2lubmVyJyxcbiAgICAgICAgc3RhdGljQ2xhc3M6ICd3ZWV4LXNjcm9sbGVyLWlubmVyJ1xuICAgICAgfSwgdGhpcy5fY2VsbHMpLFxuICAgICAgY3JlYXRlRWxlbWVudCgnbWFyaycsIHsgcmVmOiAnYm90dG9tTWFyaycsIHN0YXRpY0NsYXNzOiAnd2VleC1zY3JvbGxlci1ib3R0b20tbWFyaycgfSlcbiAgICBdKVxuICB9XG59XG4iLCJleHBvcnQgZGVmYXVsdCB7XG4gIG5hbWU6ICdpbmRpY2F0b3InLFxuICBwcm9wczoge1xuICAgIGNvdW50OiBbTnVtYmVyLCBTdHJpbmddLFxuICAgIGFjdGl2ZTogW051bWJlciwgU3RyaW5nXVxuICB9LFxuICByZW5kZXIgKGNyZWF0ZUVsZW1lbnQpIHtcbiAgICBjb25zdCBjaGlsZHJlbiA9IFtdXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBOdW1iZXIodGhpcy5jb3VudCk7ICsraSkge1xuICAgICAgY29uc3QgY2xhc3NOYW1lcyA9IFsnd2VleC1pbmRpY2F0b3ItaXRlbSddXG4gICAgICBpZiAoaSA9PT0gTnVtYmVyKHRoaXMuYWN0aXZlKSkge1xuICAgICAgICBjbGFzc05hbWVzLnB1c2goJ3dlZXgtaW5kaWNhdG9yLWl0ZW0tYWN0aXZlJylcbiAgICAgIH1cbiAgICAgIGNoaWxkcmVuLnB1c2goY3JlYXRlRWxlbWVudCgnbWVudWl0ZW0nLCB7XG4gICAgICAgIHN0YXRpY0NsYXNzOiBjbGFzc05hbWVzLmpvaW4oJyAnKVxuICAgICAgfSkpXG4gICAgfVxuICAgIHJldHVybiBjcmVhdGVFbGVtZW50KCdtZW51Jywge1xuICAgICAgYXR0cnM6IHsgJ3dlZXgtdHlwZSc6ICdpbmRpY2F0b3InIH0sXG4gICAgICBzdGF0aWNDbGFzczogJ3dlZXgtaW5kaWNhdG9yJ1xuICAgIH0sIGNoaWxkcmVuKVxuICB9XG59XG4iLCJleHBvcnQgZGVmYXVsdCB7XG4gIG1ldGhvZHM6IHtcbiAgICBzbGlkZVRvIChpbmRleCkge1xuICAgICAgLy8gbGV0IG5ld0luZGV4ID0gKGluZGV4IHwgMCkgLy8gJSB0aGlzLmZyYW1lQ291bnRcbiAgICAgIGxldCBuZXdJbmRleCA9IChpbmRleCB8IDApICUgdGhpcy5mcmFtZUNvdW50IC8vIHNjcm9sbCB0byBsZWZ0XG4gICAgICBuZXdJbmRleCA9IE1hdGgubWF4KG5ld0luZGV4LCAwKVxuICAgICAgbmV3SW5kZXggPSBNYXRoLm1pbihuZXdJbmRleCwgdGhpcy5mcmFtZUNvdW50IC0gMSlcblxuICAgICAgY29uc3Qgb2Zmc2V0ID0gLW5ld0luZGV4ICogdGhpcy53cmFwcGVyV2lkdGhcbiAgICAgIGNvbnN0IGlubmVyID0gdGhpcy4kcmVmcy5pbm5lclxuXG4gICAgICBpZiAoaW5uZXIpIHtcbiAgICAgICAgLy8gVE9ETzogd2lsbC1jaGFuZ2UgfCBzZXQgc3R5bGVzIHRvZ2V0aGVyXG4gICAgICAgIGlubmVyLnN0eWxlLnRyYW5zaXRpb24gPSBgdHJhbnNmb3JtIC4ycyBlYXNlLWluLW91dGBcbiAgICAgICAgaW5uZXIuc3R5bGUudHJhbnNmb3JtID0gYHRyYW5zbGF0ZTNkKCR7b2Zmc2V0fXB4LCAwLCAwKWBcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgaW5uZXIuc3R5bGUudHJhbnNpdGlvbiA9ICcnXG4gICAgICAgIH0sIDIwMClcbiAgICAgIH1cbiAgICAgIGlmIChuZXdJbmRleCAhPT0gdGhpcy5jdXJyZW50SW5kZXgpIHtcbiAgICAgICAgdGhpcy5jdXJyZW50SW5kZXggPSBuZXdJbmRleFxuICAgICAgICB0aGlzLiRlbWl0KCdjaGFuZ2UnLCB0aGlzLmNyZWF0ZUV2ZW50KCdjaGFuZ2UnLCB7XG4gICAgICAgICAgaW5kZXg6IHRoaXMuY3VycmVudEluZGV4XG4gICAgICAgIH0pKVxuICAgICAgfVxuICAgIH0sXG5cbiAgICBuZXh0ICgpIHtcbiAgICAgIHRoaXMuc2xpZGVUbyh0aGlzLmN1cnJlbnRJbmRleCArIDEpXG4gICAgfSxcblxuICAgIHByZXYgKCkge1xuICAgICAgdGhpcy5zbGlkZVRvKHRoaXMuY3VycmVudEluZGV4IC0gMSlcbiAgICB9LFxuXG4gICAgaGFuZGxlVG91Y2hTdGFydCAoZXZlbnQpIHtcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KClcbiAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpXG4gICAgICAvLyBjb25zb2xlLmxvZygndG91Y2ggc3RhcnQnLCBldmVudClcbiAgICAgIGNvbnN0IHRvdWNoID0gZXZlbnQuY2hhbmdlZFRvdWNoZXNbMF1cbiAgICAgIC8vIGNvbnNvbGUubG9nKCd0b3VjaCBzdGFydCcsIGV2ZW50LnRhcmdldCwgZXZlbnQudGFyZ2V0LnBhZ2VZKVxuICAgICAgLy8gY29uc29sZS5sb2coJ3RvdWNoZXMnLCB0b3VjaClcbiAgICAgIHRoaXMuX3RvdWNoUGFyYW1zID0ge1xuICAgICAgICBvcmlnaW5hbFRyYW5zZm9ybTogdGhpcy4kcmVmcy5pbm5lci5zdHlsZS50cmFuc2Zvcm0sXG4gICAgICAgIHN0YXJ0VG91Y2hFdmVudDogdG91Y2gsXG4gICAgICAgIHN0YXJ0WDogdG91Y2gucGFnZVgsXG4gICAgICAgIHN0YXJ0WTogdG91Y2gucGFnZVksXG4gICAgICAgIHRpbWVTdGFtcDogZXZlbnQudGltZVN0YW1wXG4gICAgICB9XG4gICAgfSxcblxuICAgIGhhbmRsZVRvdWNoTW92ZSAoZXZlbnQpIHtcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KClcbiAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpXG4gICAgICAvLyBjb25zb2xlLmxvZygndG91Y2ggbW92ZScpXG4gICAgICBpZiAodGhpcy5fdG91Y2hQYXJhbXMpIHtcbiAgICAgICAgY29uc3QgaW5uZXIgPSB0aGlzLiRyZWZzLmlubmVyXG4gICAgICAgIGNvbnN0IHsgc3RhcnRYIH0gPSB0aGlzLl90b3VjaFBhcmFtc1xuICAgICAgICBjb25zdCB0b3VjaCA9IGV2ZW50LmNoYW5nZWRUb3VjaGVzWzBdXG4gICAgICAgIGNvbnN0IG9mZnNldFggPSB0b3VjaC5wYWdlWCAtIHN0YXJ0WFxuICAgICAgICAvLyBjb25zb2xlLmxvZygnb2Zmc2V0WCcsIG9mZnNldFgsICdzdGFydFgnLCBzdGFydFgsICdwYWdlWCcsIHRvdWNoLnBhZ2VYKVxuICAgICAgICB0aGlzLl90b3VjaFBhcmFtcy5vZmZzZXRYID0gb2Zmc2V0WFxuXG4gICAgICAgIGlmIChpbm5lciAmJiBvZmZzZXRYKSB7XG4gICAgICAgICAgLy8gY29uc29sZS5sb2coJ3RyYW5zZm9ybScsIGAke29mZnNldFggLSB0aGlzLmN1cnJlbnRJbmRleCAqIHRoaXMud3JhcHBlcldpZHRofWApXG4gICAgICAgICAgaW5uZXIuc3R5bGUudHJhbnNmb3JtID0gYHRyYW5zbGF0ZTNkKCR7b2Zmc2V0WCAtIHRoaXMuY3VycmVudEluZGV4ICogdGhpcy53cmFwcGVyV2lkdGh9cHgsIDAsIDApYFxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcblxuICAgIGhhbmRsZVRvdWNoRW5kIChldmVudCkge1xuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKVxuICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKClcbiAgICAgIC8vIGNvbnNvbGUubG9nKCd0b3VjaCBlbmQnKVxuICAgICAgY29uc3QgaW5uZXIgPSB0aGlzLiRyZWZzLmlubmVyXG4gICAgICBpZiAodGhpcy5fdG91Y2hQYXJhbXMpIHtcbiAgICAgICAgY29uc3QgeyBvZmZzZXRYIH0gPSB0aGlzLl90b3VjaFBhcmFtc1xuICAgICAgICAvLyBjb25zb2xlLmxvZygndG91Y2ggcGFnZVg6JywgdG91Y2gucGFnZVgsICcsIG9mZnNldFg6Jywgb2Zmc2V0WClcbiAgICAgICAgaWYgKGlubmVyKSB7XG4gICAgICAgICAgY29uc3QgcmVzZXQgPSBNYXRoLmFicyhvZmZzZXRYIC8gdGhpcy53cmFwcGVyV2lkdGgpIDwgMC4yXG4gICAgICAgICAgY29uc3QgZGlyZWN0aW9uID0gb2Zmc2V0WCA+IDAgPyAxIDogLTFcbiAgICAgICAgICBjb25zdCBuZXdJbmRleCA9IHJlc2V0ID8gdGhpcy5jdXJyZW50SW5kZXggOiAodGhpcy5jdXJyZW50SW5kZXggLSBkaXJlY3Rpb24pXG5cbiAgICAgICAgICAvLyBjb25zb2xlLmxvZygncmVzZXQ6JywgcmVzZXQsICcsIG5ld0luZGV4OicsIG5ld0luZGV4KVxuICAgICAgICAgIHRoaXMuc2xpZGVUbyhuZXdJbmRleClcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgZGVsZXRlIHRoaXMuX3RvdWNoUGFyYW1zXG4gICAgfVxuICB9XG59XG4iLCJpbXBvcnQgeyB2YWxpZGF0ZVN0eWxlcyB9IGZyb20gJy4uLy4uL3ZhbGlkYXRvcidcbmltcG9ydCB7IHRocm90dGxlLCBiaW5kLCBjcmVhdGVNaXhpbiB9IGZyb20gJy4uLy4uL3V0aWxzJ1xuaW1wb3J0IGluZGljYXRvciBmcm9tICcuL2luZGljYXRvcidcbmltcG9ydCAqIGFzIGV2ZW50TWV0aG9kcyBmcm9tICcuLi8uLi9tZXRob2RzL2V2ZW50J1xuaW1wb3J0IHNsaWRlTWl4aW4gZnJvbSAnLi9zbGlkZU1peGluJ1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIG1peGluczogW2NyZWF0ZU1peGluKGV2ZW50TWV0aG9kcyksIHNsaWRlTWl4aW5dLFxuICAvLyBjb21wb25lbnRzOiB7IGluZGljYXRvciB9LFxuICBwcm9wczoge1xuICAgICdhdXRvLXBsYXknOiB7XG4gICAgICB0eXBlOiBbU3RyaW5nLCBCb29sZWFuXSxcbiAgICAgIGRlZmF1bHQ6IGZhbHNlXG4gICAgfSxcbiAgICBpbnRlcnZhbDoge1xuICAgICAgdHlwZTogW1N0cmluZywgTnVtYmVyXSxcbiAgICAgIGRlZmF1bHQ6IDMwMDBcbiAgICB9XG4gIH0sXG5cbiAgZGF0YSAoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGN1cnJlbnRJbmRleDogMCxcbiAgICAgIGZyYW1lQ291bnQ6IDBcbiAgICB9XG4gIH0sXG5cbiAgbWV0aG9kczoge1xuICAgIGNvbXB1dGVXcmFwcGVyU2l6ZSAoKSB7XG4gICAgICBjb25zdCB3cmFwcGVyID0gdGhpcy4kcmVmcy53cmFwcGVyXG4gICAgICBpZiAod3JhcHBlcikge1xuICAgICAgICBjb25zdCByZWN0ID0gd3JhcHBlci5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKVxuICAgICAgICB0aGlzLndyYXBwZXJXaWR0aCA9IHJlY3Qud2lkdGhcbiAgICAgICAgdGhpcy53cmFwcGVySGVpZ2h0ID0gcmVjdC5oZWlnaHRcbiAgICAgIH1cbiAgICB9LFxuXG4gICAgdXBkYXRlTGF5b3V0ICgpIHtcbiAgICAgIHRoaXMuY29tcHV0ZVdyYXBwZXJTaXplKClcbiAgICAgIGNvbnN0IGlubmVyID0gdGhpcy4kcmVmcy5pbm5lclxuICAgICAgaWYgKGlubmVyKSB7XG4gICAgICAgIGlubmVyLnN0eWxlLndpZHRoID0gdGhpcy53cmFwcGVyV2lkdGggKiB0aGlzLmZyYW1lQ291bnQgKyAncHgnXG4gICAgICB9XG4gICAgfSxcblxuICAgIGZvcm1hdENoaWxkcmVuIChjcmVhdGVFbGVtZW50KSB7XG4gICAgICBjb25zdCBjaGlsZHJlbiA9IHRoaXMuJHNsb3RzLmRlZmF1bHQgfHwgW11cbiAgICAgIHJldHVybiBjaGlsZHJlbi5maWx0ZXIodm5vZGUgPT4ge1xuICAgICAgICAvLyBjb25zb2xlLmxvZyh2bm9kZSlcbiAgICAgICAgaWYgKCF2bm9kZS50YWcpIHJldHVybiBmYWxzZVxuICAgICAgICBpZiAodm5vZGUuY29tcG9uZW50T3B0aW9ucyAmJiB2bm9kZS5jb21wb25lbnRPcHRpb25zLnRhZyA9PT0gJ2luZGljYXRvcicpIHtcbiAgICAgICAgICAvLyBjb25zb2xlLmxvZyh2bm9kZSlcbiAgICAgICAgICAvLyBjb25zb2xlLnRyYWNlKClcbiAgICAgICAgICB0aGlzLl9pbmRpY2F0b3IgPSBjcmVhdGVFbGVtZW50KGluZGljYXRvciwge1xuICAgICAgICAgICAgc3RhdGljQ2xhc3M6IHZub2RlLmRhdGEuc3RhdGljQ2xhc3MsXG4gICAgICAgICAgICBzdGF0aWNTdHlsZTogdm5vZGUuZGF0YS5zdGF0aWNTdHlsZSxcbiAgICAgICAgICAgIGF0dHJzOiB7XG4gICAgICAgICAgICAgIGNvdW50OiB0aGlzLmZyYW1lQ291bnQsXG4gICAgICAgICAgICAgIGFjdGl2ZTogdGhpcy5jdXJyZW50SW5kZXhcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KVxuICAgICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0cnVlXG4gICAgICB9KS5tYXAodm5vZGUgPT4ge1xuICAgICAgICByZXR1cm4gY3JlYXRlRWxlbWVudCgnbGknLCB7XG4gICAgICAgICAgc3RhdGljQ2xhc3M6ICd3ZWV4LXNsaWRlci1jZWxsJ1xuICAgICAgICB9LCBbdm5vZGVdKVxuICAgICAgfSlcbiAgICB9XG4gIH0sXG5cbiAgY3JlYXRlZCAoKSB7XG4gICAgdGhpcy5faW5kaWNhdG9yID0gbnVsbFxuICAgIHRoaXMuJG5leHRUaWNrKCgpID0+IHtcbiAgICAgIHRoaXMudXBkYXRlTGF5b3V0KClcbiAgICB9KVxuICB9LFxuXG4gIG1vdW50ZWQgKCkge1xuICAgIGlmICh0aGlzLmF1dG9QbGF5KSB7XG4gICAgICBjb25zdCBpbnRlcnZhbCA9IE51bWJlcih0aGlzLmludGVydmFsKVxuICAgICAgdGhpcy5fbGFzdFNsaWRlVGltZSA9IERhdGUubm93KClcblxuICAgICAgY29uc3QgYXV0b1BsYXlGbiA9IGJpbmQoZnVuY3Rpb24gKCkge1xuICAgICAgICBjbGVhclRpbWVvdXQodGhpcy5fYXV0b1BsYXlUaW1lcilcbiAgICAgICAgY29uc3Qgbm93ID0gRGF0ZS5ub3coKVxuICAgICAgICBsZXQgbmV4dFRpY2sgPSBpbnRlcnZhbCAtIG5vdyArIHRoaXMuX2xhc3RTbGlkZVRpbWVcbiAgICAgICAgbmV4dFRpY2sgPSBuZXh0VGljayA+IDEwMCA/IG5leHRUaWNrIDogaW50ZXJ2YWxcblxuICAgICAgICB0aGlzLm5leHQoKVxuICAgICAgICB0aGlzLl9sYXN0U2xpZGVUaW1lID0gbm93XG4gICAgICAgIHRoaXMuX2F1dG9QbGF5VGltZXIgPSBzZXRUaW1lb3V0KGF1dG9QbGF5Rm4sIG5leHRUaWNrKVxuICAgICAgfSwgdGhpcylcblxuICAgICAgdGhpcy5fYXV0b1BsYXlUaW1lciA9IHNldFRpbWVvdXQoYXV0b1BsYXlGbiwgaW50ZXJ2YWwpXG4gICAgfVxuICB9LFxuXG4gIHJlbmRlciAoY3JlYXRlRWxlbWVudCkge1xuICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WID09PSAnZGV2ZWxvcG1lbnQnKSB7XG4gICAgICB2YWxpZGF0ZVN0eWxlcygnc2xpZGVyJywgdGhpcy4kdm5vZGUuZGF0YSAmJiB0aGlzLiR2bm9kZS5kYXRhLnN0YXRpY1N0eWxlKVxuICAgIH1cblxuICAgIGNvbnN0IGlubmVyRWxlbWVudHMgPSB0aGlzLmZvcm1hdENoaWxkcmVuKGNyZWF0ZUVsZW1lbnQpXG4gICAgdGhpcy5mcmFtZUNvdW50ID0gaW5uZXJFbGVtZW50cy5sZW5ndGhcblxuICAgIHJldHVybiBjcmVhdGVFbGVtZW50KFxuICAgICAgJ25hdicsXG4gICAgICB7XG4gICAgICAgIHJlZjogJ3dyYXBwZXInLFxuICAgICAgICBhdHRyczogeyAnd2VleC10eXBlJzogJ3NsaWRlcicgfSxcbiAgICAgICAgc3RhdGljQ2xhc3M6ICd3ZWV4LXNsaWRlciB3ZWV4LXNsaWRlci13cmFwcGVyJyxcbiAgICAgICAgb246IHtcbiAgICAgICAgICB0b3VjaHN0YXJ0OiB0aGlzLmhhbmRsZVRvdWNoU3RhcnQsXG4gICAgICAgICAgdG91Y2htb3ZlOiB0aHJvdHRsZShiaW5kKHRoaXMuaGFuZGxlVG91Y2hNb3ZlLCB0aGlzKSwgMjUpLFxuICAgICAgICAgIHRvdWNoZW5kOiB0aGlzLmhhbmRsZVRvdWNoRW5kXG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBbXG4gICAgICAgIGNyZWF0ZUVsZW1lbnQoJ3VsJywge1xuICAgICAgICAgIHJlZjogJ2lubmVyJyxcbiAgICAgICAgICBzdGF0aWNDbGFzczogJ3dlZXgtc2xpZGVyLWlubmVyJ1xuICAgICAgICB9LCBpbm5lckVsZW1lbnRzKSxcbiAgICAgICAgdGhpcy5faW5kaWNhdG9yXG4gICAgICBdXG4gICAgKVxuICB9XG59XG4iLCJleHBvcnQgZGVmYXVsdCB7XG4gIHJlbmRlciAoKSB7XG4gICAgLy8gVE9ETzogYWRkIHRhZyBuZXN0aW5nIHZhbGlkYXRpb25cbiAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgPT09ICdkZXZlbG9wbWVudCcpIHtcbiAgICAgIGNvbnN0IHRhZyA9IHRoaXMuJG9wdGlvbnMuX2NvbXBvbmVudFRhZ1xuICAgICAgY29uc3QgcGFyZW50VGFnID0gdGhpcy4kcGFyZW50LiRvcHRpb25zLl9jb21wb25lbnRUYWdcbiAgICAgIGNvbnNvbGUud2FybihgW1Z1ZSBSZW5kZXJlcl0gVGhlIDwke3RhZ30+IGNhbid0IGJlIHRoZSBjaGlsZCBvZiA8JHtwYXJlbnRUYWd9Pi5gKVxuICAgIH1cbiAgICByZXR1cm4gbnVsbFxuICB9XG59XG4iLCJpbXBvcnQgeyB2YWxpZGF0ZVN0eWxlcyB9IGZyb20gJy4uL3ZhbGlkYXRvcidcblxuLyoqXG4gKiBHZXQgdGV4dCBzdHlsZXNcbiAqL1xuZnVuY3Rpb24gZ2V0VGV4dFN0eWxlIChwcm9wcyA9IHt9KSB7XG4gIGNvbnN0IGxpbmVzID0gcGFyc2VJbnQocHJvcHMubGluZXMpIHx8IDBcbiAgaWYgKGxpbmVzID4gMCkge1xuICAgIHJldHVybiB7XG4gICAgICBvdmVyZmxvdzogJ2hpZGRlbicsXG4gICAgICB0ZXh0T3ZlcmZsb3c6ICdlbGxpcHNpcycsXG4gICAgICB3ZWJraXRMaW5lQ2xhbXA6IGxpbmVzXG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgcHJvcHM6IHtcbiAgICBsaW5lczogW051bWJlciwgU3RyaW5nXSxcbiAgICB2YWx1ZTogW1N0cmluZ11cbiAgfSxcblxuICByZW5kZXIgKGNyZWF0ZUVsZW1lbnQpIHtcbiAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViA9PT0gJ2RldmVsb3BtZW50Jykge1xuICAgICAgdmFsaWRhdGVTdHlsZXMoJ3RleHQnLCB0aGlzLiR2bm9kZS5kYXRhICYmIHRoaXMuJHZub2RlLmRhdGEuc3RhdGljU3R5bGUpXG4gICAgfVxuXG4gICAgcmV0dXJuIGNyZWF0ZUVsZW1lbnQoJ3AnLCB7XG4gICAgICBhdHRyczogeyAnd2VleC10eXBlJzogJ3RleHQnIH0sXG4gICAgICBzdGF0aWNDbGFzczogJ3dlZXgtdGV4dCcsXG4gICAgICBzdGF0aWNTdHlsZTogZ2V0VGV4dFN0eWxlKHRoaXMpXG4gICAgfSwgdGhpcy4kc2xvdHMuZGVmYXVsdCB8fCBbdGhpcy52YWx1ZV0pXG4gIH1cbn1cbiIsImltcG9ydCB7IHZhbGlkYXRlU3R5bGVzIH0gZnJvbSAnLi4vdmFsaWRhdG9yJ1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIHByb3BzOiB7XG4gICAgc3JjOiBTdHJpbmdcbiAgfSxcbiAgcmVuZGVyIChjcmVhdGVFbGVtZW50KSB7XG4gICAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgPT09ICdkZXZlbG9wbWVudCcpIHtcbiAgICAgIHZhbGlkYXRlU3R5bGVzKCd3ZWInLCB0aGlzLiR2bm9kZS5kYXRhICYmIHRoaXMuJHZub2RlLmRhdGEuc3RhdGljU3R5bGUpXG4gICAgfVxuXG4gICAgcmV0dXJuIGNyZWF0ZUVsZW1lbnQoJ2lmcmFtZScsIHtcbiAgICAgIGF0dHJzOiB7XG4gICAgICAgICd3ZWV4LXR5cGUnOiAnd2ViJyxcbiAgICAgICAgc3JjOiB0aGlzLnNyY1xuICAgICAgfSxcbiAgICAgIHN0YXRpY0NsYXNzOiAnd2VleC13ZWInXG4gICAgfSlcbiAgfVxufVxuIiwiLyogZXNsaW50LWRpc2FibGUgKi9cblxuLy8gUHJvZHVjdGlvbiBzdGVwcyBvZiBFQ01BLTI2MiwgRWRpdGlvbiA2LCAyMi4xLjIuMVxuLy8gUmVmZXJlbmNlOiBodHRwczovL3Blb3BsZS5tb3ppbGxhLm9yZy9+am9yZW5kb3JmZi9lczYtZHJhZnQuaHRtbCNzZWMtYXJyYXkuZnJvbVxuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgaWYgKi9cbmlmICghQXJyYXkuZnJvbSkge1xuICBBcnJheS5mcm9tID0gKGZ1bmN0aW9uKCkge1xuICAgIHZhciB0b1N0ciA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmc7XG4gICAgdmFyIGlzQ2FsbGFibGUgPSBmdW5jdGlvbihmbikge1xuICAgICAgcmV0dXJuIHR5cGVvZiBmbiA9PT0gJ2Z1bmN0aW9uJyB8fCB0b1N0ci5jYWxsKGZuKSA9PT0gJ1tvYmplY3QgRnVuY3Rpb25dJztcbiAgICB9O1xuICAgIHZhciB0b0ludGVnZXIgPSBmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgdmFyIG51bWJlciA9IE51bWJlcih2YWx1ZSk7XG4gICAgICBpZiAoaXNOYU4obnVtYmVyKSkge1xuICAgICAgICByZXR1cm4gMDtcbiAgICAgIH1cbiAgICAgIGlmIChudW1iZXIgPT09IDAgfHwgIWlzRmluaXRlKG51bWJlcikpIHtcbiAgICAgICAgcmV0dXJuIG51bWJlcjtcbiAgICAgIH1cbiAgICAgIHJldHVybiAobnVtYmVyID4gMCA/IDEgOiAtMSkgKiBNYXRoLmZsb29yKE1hdGguYWJzKG51bWJlcikpO1xuICAgIH07XG4gICAgdmFyIG1heFNhZmVJbnRlZ2VyID0gTWF0aC5wb3coMiwgNTMpIC0gMTtcbiAgICB2YXIgdG9MZW5ndGggPSBmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgdmFyIGxlbiA9IHRvSW50ZWdlcih2YWx1ZSk7XG4gICAgICByZXR1cm4gTWF0aC5taW4oTWF0aC5tYXgobGVuLCAwKSwgbWF4U2FmZUludGVnZXIpO1xuICAgIH07XG5cbiAgICAvLyBUaGUgbGVuZ3RoIHByb3BlcnR5IG9mIHRoZSBmcm9tIG1ldGhvZCBpcyAxLlxuICAgIHJldHVybiBmdW5jdGlvbiBmcm9tKGFycmF5TGlrZS8qLCBtYXBGbiwgdGhpc0FyZyAqLykge1xuICAgICAgLy8gMS4gTGV0IEMgYmUgdGhlIHRoaXMgdmFsdWUuXG4gICAgICB2YXIgQyA9IHRoaXM7XG5cbiAgICAgIC8vIDIuIExldCBpdGVtcyBiZSBUb09iamVjdChhcnJheUxpa2UpLlxuICAgICAgdmFyIGl0ZW1zID0gT2JqZWN0KGFycmF5TGlrZSk7XG5cbiAgICAgIC8vIDMuIFJldHVybklmQWJydXB0KGl0ZW1zKS5cbiAgICAgIGlmIChhcnJheUxpa2UgPT0gbnVsbCkge1xuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdBcnJheS5mcm9tIHJlcXVpcmVzIGFuIGFycmF5LWxpa2Ugb2JqZWN0IC0gbm90IG51bGwgb3IgdW5kZWZpbmVkJyk7XG4gICAgICB9XG5cbiAgICAgIC8vIDQuIElmIG1hcGZuIGlzIHVuZGVmaW5lZCwgdGhlbiBsZXQgbWFwcGluZyBiZSBmYWxzZS5cbiAgICAgIHZhciBtYXBGbiA9IGFyZ3VtZW50cy5sZW5ndGggPiAxID8gYXJndW1lbnRzWzFdIDogdm9pZCB1bmRlZmluZWQ7XG4gICAgICB2YXIgVDtcbiAgICAgIGlmICh0eXBlb2YgbWFwRm4gIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIC8vIDUuIGVsc2VcbiAgICAgICAgLy8gNS4gYSBJZiBJc0NhbGxhYmxlKG1hcGZuKSBpcyBmYWxzZSwgdGhyb3cgYSBUeXBlRXJyb3IgZXhjZXB0aW9uLlxuICAgICAgICBpZiAoIWlzQ2FsbGFibGUobWFwRm4pKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignQXJyYXkuZnJvbTogd2hlbiBwcm92aWRlZCwgdGhlIHNlY29uZCBhcmd1bWVudCBtdXN0IGJlIGEgZnVuY3Rpb24nKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIDUuIGIuIElmIHRoaXNBcmcgd2FzIHN1cHBsaWVkLCBsZXQgVCBiZSB0aGlzQXJnOyBlbHNlIGxldCBUIGJlIHVuZGVmaW5lZC5cbiAgICAgICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPiAyKSB7XG4gICAgICAgICAgVCA9IGFyZ3VtZW50c1syXTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvLyAxMC4gTGV0IGxlblZhbHVlIGJlIEdldChpdGVtcywgXCJsZW5ndGhcIikuXG4gICAgICAvLyAxMS4gTGV0IGxlbiBiZSBUb0xlbmd0aChsZW5WYWx1ZSkuXG4gICAgICB2YXIgbGVuID0gdG9MZW5ndGgoaXRlbXMubGVuZ3RoKTtcblxuICAgICAgLy8gMTMuIElmIElzQ29uc3RydWN0b3IoQykgaXMgdHJ1ZSwgdGhlblxuICAgICAgLy8gMTMuIGEuIExldCBBIGJlIHRoZSByZXN1bHQgb2YgY2FsbGluZyB0aGUgW1tDb25zdHJ1Y3RdXSBpbnRlcm5hbCBtZXRob2Qgb2YgQyB3aXRoIGFuIGFyZ3VtZW50IGxpc3QgY29udGFpbmluZyB0aGUgc2luZ2xlIGl0ZW0gbGVuLlxuICAgICAgLy8gMTQuIGEuIEVsc2UsIExldCBBIGJlIEFycmF5Q3JlYXRlKGxlbikuXG4gICAgICB2YXIgQSA9IGlzQ2FsbGFibGUoQykgPyBPYmplY3QobmV3IEMobGVuKSkgOiBuZXcgQXJyYXkobGVuKTtcblxuICAgICAgLy8gMTYuIExldCBrIGJlIDAuXG4gICAgICB2YXIgayA9IDA7XG4gICAgICAvLyAxNy4gUmVwZWF0LCB3aGlsZSBrIDwgbGVu4oCmIChhbHNvIHN0ZXBzIGEgLSBoKVxuICAgICAgdmFyIGtWYWx1ZTtcbiAgICAgIHdoaWxlIChrIDwgbGVuKSB7XG4gICAgICAgIGtWYWx1ZSA9IGl0ZW1zW2tdO1xuICAgICAgICBpZiAobWFwRm4pIHtcbiAgICAgICAgICBBW2tdID0gdHlwZW9mIFQgPT09ICd1bmRlZmluZWQnID8gbWFwRm4oa1ZhbHVlLCBrKSA6IG1hcEZuLmNhbGwoVCwga1ZhbHVlLCBrKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBBW2tdID0ga1ZhbHVlO1xuICAgICAgICB9XG4gICAgICAgIGsgKz0gMTtcbiAgICAgIH1cbiAgICAgIC8vIDE4LiBMZXQgcHV0U3RhdHVzIGJlIFB1dChBLCBcImxlbmd0aFwiLCBsZW4sIHRydWUpLlxuICAgICAgQS5sZW5ndGggPSBsZW47XG4gICAgICAvLyAyMC4gUmV0dXJuIEEuXG4gICAgICByZXR1cm4gQTtcbiAgICB9O1xuICB9KCkpO1xufVxuIiwiLy8gaHR0cHM6Ly9naXRodWIuY29tL3psb2lyb2NrL2NvcmUtanMvaXNzdWVzLzg2I2lzc3VlY29tbWVudC0xMTU3NTkwMjhcbnZhciBnbG9iYWwgPSBtb2R1bGUuZXhwb3J0cyA9IHR5cGVvZiB3aW5kb3cgIT0gJ3VuZGVmaW5lZCcgJiYgd2luZG93Lk1hdGggPT0gTWF0aFxuICA/IHdpbmRvdyA6IHR5cGVvZiBzZWxmICE9ICd1bmRlZmluZWQnICYmIHNlbGYuTWF0aCA9PSBNYXRoID8gc2VsZiA6IEZ1bmN0aW9uKCdyZXR1cm4gdGhpcycpKCk7XG5pZih0eXBlb2YgX19nID09ICdudW1iZXInKV9fZyA9IGdsb2JhbDsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bmRlZiIsInZhciBjb3JlID0gbW9kdWxlLmV4cG9ydHMgPSB7dmVyc2lvbjogJzIuNC4wJ307XG5pZih0eXBlb2YgX19lID09ICdudW1iZXInKV9fZSA9IGNvcmU7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW5kZWYiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0KXtcbiAgcmV0dXJuIHR5cGVvZiBpdCA9PT0gJ29iamVjdCcgPyBpdCAhPT0gbnVsbCA6IHR5cGVvZiBpdCA9PT0gJ2Z1bmN0aW9uJztcbn07IiwidmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi9faXMtb2JqZWN0Jyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0KXtcbiAgaWYoIWlzT2JqZWN0KGl0KSl0aHJvdyBUeXBlRXJyb3IoaXQgKyAnIGlzIG5vdCBhbiBvYmplY3QhJyk7XG4gIHJldHVybiBpdDtcbn07IiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihleGVjKXtcbiAgdHJ5IHtcbiAgICByZXR1cm4gISFleGVjKCk7XG4gIH0gY2F0Y2goZSl7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbn07IiwiLy8gVGhhbmsncyBJRTggZm9yIGhpcyBmdW5ueSBkZWZpbmVQcm9wZXJ0eVxubW9kdWxlLmV4cG9ydHMgPSAhcmVxdWlyZSgnLi9fZmFpbHMnKShmdW5jdGlvbigpe1xuICByZXR1cm4gT2JqZWN0LmRlZmluZVByb3BlcnR5KHt9LCAnYScsIHtnZXQ6IGZ1bmN0aW9uKCl7IHJldHVybiA3OyB9fSkuYSAhPSA3O1xufSk7IiwidmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi9faXMtb2JqZWN0JylcbiAgLCBkb2N1bWVudCA9IHJlcXVpcmUoJy4vX2dsb2JhbCcpLmRvY3VtZW50XG4gIC8vIGluIG9sZCBJRSB0eXBlb2YgZG9jdW1lbnQuY3JlYXRlRWxlbWVudCBpcyAnb2JqZWN0J1xuICAsIGlzID0gaXNPYmplY3QoZG9jdW1lbnQpICYmIGlzT2JqZWN0KGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCl7XG4gIHJldHVybiBpcyA/IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoaXQpIDoge307XG59OyIsIm1vZHVsZS5leHBvcnRzID0gIXJlcXVpcmUoJy4vX2Rlc2NyaXB0b3JzJykgJiYgIXJlcXVpcmUoJy4vX2ZhaWxzJykoZnVuY3Rpb24oKXtcbiAgcmV0dXJuIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShyZXF1aXJlKCcuL19kb20tY3JlYXRlJykoJ2RpdicpLCAnYScsIHtnZXQ6IGZ1bmN0aW9uKCl7IHJldHVybiA3OyB9fSkuYSAhPSA3O1xufSk7IiwiLy8gNy4xLjEgVG9QcmltaXRpdmUoaW5wdXQgWywgUHJlZmVycmVkVHlwZV0pXG52YXIgaXNPYmplY3QgPSByZXF1aXJlKCcuL19pcy1vYmplY3QnKTtcbi8vIGluc3RlYWQgb2YgdGhlIEVTNiBzcGVjIHZlcnNpb24sIHdlIGRpZG4ndCBpbXBsZW1lbnQgQEB0b1ByaW1pdGl2ZSBjYXNlXG4vLyBhbmQgdGhlIHNlY29uZCBhcmd1bWVudCAtIGZsYWcgLSBwcmVmZXJyZWQgdHlwZSBpcyBhIHN0cmluZ1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCwgUyl7XG4gIGlmKCFpc09iamVjdChpdCkpcmV0dXJuIGl0O1xuICB2YXIgZm4sIHZhbDtcbiAgaWYoUyAmJiB0eXBlb2YgKGZuID0gaXQudG9TdHJpbmcpID09ICdmdW5jdGlvbicgJiYgIWlzT2JqZWN0KHZhbCA9IGZuLmNhbGwoaXQpKSlyZXR1cm4gdmFsO1xuICBpZih0eXBlb2YgKGZuID0gaXQudmFsdWVPZikgPT0gJ2Z1bmN0aW9uJyAmJiAhaXNPYmplY3QodmFsID0gZm4uY2FsbChpdCkpKXJldHVybiB2YWw7XG4gIGlmKCFTICYmIHR5cGVvZiAoZm4gPSBpdC50b1N0cmluZykgPT0gJ2Z1bmN0aW9uJyAmJiAhaXNPYmplY3QodmFsID0gZm4uY2FsbChpdCkpKXJldHVybiB2YWw7XG4gIHRocm93IFR5cGVFcnJvcihcIkNhbid0IGNvbnZlcnQgb2JqZWN0IHRvIHByaW1pdGl2ZSB2YWx1ZVwiKTtcbn07IiwidmFyIGFuT2JqZWN0ICAgICAgID0gcmVxdWlyZSgnLi9fYW4tb2JqZWN0JylcbiAgLCBJRThfRE9NX0RFRklORSA9IHJlcXVpcmUoJy4vX2llOC1kb20tZGVmaW5lJylcbiAgLCB0b1ByaW1pdGl2ZSAgICA9IHJlcXVpcmUoJy4vX3RvLXByaW1pdGl2ZScpXG4gICwgZFAgICAgICAgICAgICAgPSBPYmplY3QuZGVmaW5lUHJvcGVydHk7XG5cbmV4cG9ydHMuZiA9IHJlcXVpcmUoJy4vX2Rlc2NyaXB0b3JzJykgPyBPYmplY3QuZGVmaW5lUHJvcGVydHkgOiBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0eShPLCBQLCBBdHRyaWJ1dGVzKXtcbiAgYW5PYmplY3QoTyk7XG4gIFAgPSB0b1ByaW1pdGl2ZShQLCB0cnVlKTtcbiAgYW5PYmplY3QoQXR0cmlidXRlcyk7XG4gIGlmKElFOF9ET01fREVGSU5FKXRyeSB7XG4gICAgcmV0dXJuIGRQKE8sIFAsIEF0dHJpYnV0ZXMpO1xuICB9IGNhdGNoKGUpeyAvKiBlbXB0eSAqLyB9XG4gIGlmKCdnZXQnIGluIEF0dHJpYnV0ZXMgfHwgJ3NldCcgaW4gQXR0cmlidXRlcyl0aHJvdyBUeXBlRXJyb3IoJ0FjY2Vzc29ycyBub3Qgc3VwcG9ydGVkIScpO1xuICBpZigndmFsdWUnIGluIEF0dHJpYnV0ZXMpT1tQXSA9IEF0dHJpYnV0ZXMudmFsdWU7XG4gIHJldHVybiBPO1xufTsiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGJpdG1hcCwgdmFsdWUpe1xuICByZXR1cm4ge1xuICAgIGVudW1lcmFibGUgIDogIShiaXRtYXAgJiAxKSxcbiAgICBjb25maWd1cmFibGU6ICEoYml0bWFwICYgMiksXG4gICAgd3JpdGFibGUgICAgOiAhKGJpdG1hcCAmIDQpLFxuICAgIHZhbHVlICAgICAgIDogdmFsdWVcbiAgfTtcbn07IiwidmFyIGRQICAgICAgICAgPSByZXF1aXJlKCcuL19vYmplY3QtZHAnKVxuICAsIGNyZWF0ZURlc2MgPSByZXF1aXJlKCcuL19wcm9wZXJ0eS1kZXNjJyk7XG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vX2Rlc2NyaXB0b3JzJykgPyBmdW5jdGlvbihvYmplY3QsIGtleSwgdmFsdWUpe1xuICByZXR1cm4gZFAuZihvYmplY3QsIGtleSwgY3JlYXRlRGVzYygxLCB2YWx1ZSkpO1xufSA6IGZ1bmN0aW9uKG9iamVjdCwga2V5LCB2YWx1ZSl7XG4gIG9iamVjdFtrZXldID0gdmFsdWU7XG4gIHJldHVybiBvYmplY3Q7XG59OyIsInZhciBoYXNPd25Qcm9wZXJ0eSA9IHt9Lmhhc093blByb3BlcnR5O1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCwga2V5KXtcbiAgcmV0dXJuIGhhc093blByb3BlcnR5LmNhbGwoaXQsIGtleSk7XG59OyIsInZhciBpZCA9IDBcbiAgLCBweCA9IE1hdGgucmFuZG9tKCk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGtleSl7XG4gIHJldHVybiAnU3ltYm9sKCcuY29uY2F0KGtleSA9PT0gdW5kZWZpbmVkID8gJycgOiBrZXksICcpXycsICgrK2lkICsgcHgpLnRvU3RyaW5nKDM2KSk7XG59OyIsInZhciBnbG9iYWwgICAgPSByZXF1aXJlKCcuL19nbG9iYWwnKVxuICAsIGhpZGUgICAgICA9IHJlcXVpcmUoJy4vX2hpZGUnKVxuICAsIGhhcyAgICAgICA9IHJlcXVpcmUoJy4vX2hhcycpXG4gICwgU1JDICAgICAgID0gcmVxdWlyZSgnLi9fdWlkJykoJ3NyYycpXG4gICwgVE9fU1RSSU5HID0gJ3RvU3RyaW5nJ1xuICAsICR0b1N0cmluZyA9IEZ1bmN0aW9uW1RPX1NUUklOR11cbiAgLCBUUEwgICAgICAgPSAoJycgKyAkdG9TdHJpbmcpLnNwbGl0KFRPX1NUUklORyk7XG5cbnJlcXVpcmUoJy4vX2NvcmUnKS5pbnNwZWN0U291cmNlID0gZnVuY3Rpb24oaXQpe1xuICByZXR1cm4gJHRvU3RyaW5nLmNhbGwoaXQpO1xufTtcblxuKG1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oTywga2V5LCB2YWwsIHNhZmUpe1xuICB2YXIgaXNGdW5jdGlvbiA9IHR5cGVvZiB2YWwgPT0gJ2Z1bmN0aW9uJztcbiAgaWYoaXNGdW5jdGlvbiloYXModmFsLCAnbmFtZScpIHx8IGhpZGUodmFsLCAnbmFtZScsIGtleSk7XG4gIGlmKE9ba2V5XSA9PT0gdmFsKXJldHVybjtcbiAgaWYoaXNGdW5jdGlvbiloYXModmFsLCBTUkMpIHx8IGhpZGUodmFsLCBTUkMsIE9ba2V5XSA/ICcnICsgT1trZXldIDogVFBMLmpvaW4oU3RyaW5nKGtleSkpKTtcbiAgaWYoTyA9PT0gZ2xvYmFsKXtcbiAgICBPW2tleV0gPSB2YWw7XG4gIH0gZWxzZSB7XG4gICAgaWYoIXNhZmUpe1xuICAgICAgZGVsZXRlIE9ba2V5XTtcbiAgICAgIGhpZGUoTywga2V5LCB2YWwpO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZihPW2tleV0pT1trZXldID0gdmFsO1xuICAgICAgZWxzZSBoaWRlKE8sIGtleSwgdmFsKTtcbiAgICB9XG4gIH1cbi8vIGFkZCBmYWtlIEZ1bmN0aW9uI3RvU3RyaW5nIGZvciBjb3JyZWN0IHdvcmsgd3JhcHBlZCBtZXRob2RzIC8gY29uc3RydWN0b3JzIHdpdGggbWV0aG9kcyBsaWtlIExvRGFzaCBpc05hdGl2ZVxufSkoRnVuY3Rpb24ucHJvdG90eXBlLCBUT19TVFJJTkcsIGZ1bmN0aW9uIHRvU3RyaW5nKCl7XG4gIHJldHVybiB0eXBlb2YgdGhpcyA9PSAnZnVuY3Rpb24nICYmIHRoaXNbU1JDXSB8fCAkdG9TdHJpbmcuY2FsbCh0aGlzKTtcbn0pOyIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXQpe1xuICBpZih0eXBlb2YgaXQgIT0gJ2Z1bmN0aW9uJyl0aHJvdyBUeXBlRXJyb3IoaXQgKyAnIGlzIG5vdCBhIGZ1bmN0aW9uIScpO1xuICByZXR1cm4gaXQ7XG59OyIsIi8vIG9wdGlvbmFsIC8gc2ltcGxlIGNvbnRleHQgYmluZGluZ1xudmFyIGFGdW5jdGlvbiA9IHJlcXVpcmUoJy4vX2EtZnVuY3Rpb24nKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oZm4sIHRoYXQsIGxlbmd0aCl7XG4gIGFGdW5jdGlvbihmbik7XG4gIGlmKHRoYXQgPT09IHVuZGVmaW5lZClyZXR1cm4gZm47XG4gIHN3aXRjaChsZW5ndGgpe1xuICAgIGNhc2UgMTogcmV0dXJuIGZ1bmN0aW9uKGEpe1xuICAgICAgcmV0dXJuIGZuLmNhbGwodGhhdCwgYSk7XG4gICAgfTtcbiAgICBjYXNlIDI6IHJldHVybiBmdW5jdGlvbihhLCBiKXtcbiAgICAgIHJldHVybiBmbi5jYWxsKHRoYXQsIGEsIGIpO1xuICAgIH07XG4gICAgY2FzZSAzOiByZXR1cm4gZnVuY3Rpb24oYSwgYiwgYyl7XG4gICAgICByZXR1cm4gZm4uY2FsbCh0aGF0LCBhLCBiLCBjKTtcbiAgICB9O1xuICB9XG4gIHJldHVybiBmdW5jdGlvbigvKiAuLi5hcmdzICovKXtcbiAgICByZXR1cm4gZm4uYXBwbHkodGhhdCwgYXJndW1lbnRzKTtcbiAgfTtcbn07IiwidmFyIGdsb2JhbCAgICA9IHJlcXVpcmUoJy4vX2dsb2JhbCcpXG4gICwgY29yZSAgICAgID0gcmVxdWlyZSgnLi9fY29yZScpXG4gICwgaGlkZSAgICAgID0gcmVxdWlyZSgnLi9faGlkZScpXG4gICwgcmVkZWZpbmUgID0gcmVxdWlyZSgnLi9fcmVkZWZpbmUnKVxuICAsIGN0eCAgICAgICA9IHJlcXVpcmUoJy4vX2N0eCcpXG4gICwgUFJPVE9UWVBFID0gJ3Byb3RvdHlwZSc7XG5cbnZhciAkZXhwb3J0ID0gZnVuY3Rpb24odHlwZSwgbmFtZSwgc291cmNlKXtcbiAgdmFyIElTX0ZPUkNFRCA9IHR5cGUgJiAkZXhwb3J0LkZcbiAgICAsIElTX0dMT0JBTCA9IHR5cGUgJiAkZXhwb3J0LkdcbiAgICAsIElTX1NUQVRJQyA9IHR5cGUgJiAkZXhwb3J0LlNcbiAgICAsIElTX1BST1RPICA9IHR5cGUgJiAkZXhwb3J0LlBcbiAgICAsIElTX0JJTkQgICA9IHR5cGUgJiAkZXhwb3J0LkJcbiAgICAsIHRhcmdldCAgICA9IElTX0dMT0JBTCA/IGdsb2JhbCA6IElTX1NUQVRJQyA/IGdsb2JhbFtuYW1lXSB8fCAoZ2xvYmFsW25hbWVdID0ge30pIDogKGdsb2JhbFtuYW1lXSB8fCB7fSlbUFJPVE9UWVBFXVxuICAgICwgZXhwb3J0cyAgID0gSVNfR0xPQkFMID8gY29yZSA6IGNvcmVbbmFtZV0gfHwgKGNvcmVbbmFtZV0gPSB7fSlcbiAgICAsIGV4cFByb3RvICA9IGV4cG9ydHNbUFJPVE9UWVBFXSB8fCAoZXhwb3J0c1tQUk9UT1RZUEVdID0ge30pXG4gICAgLCBrZXksIG93biwgb3V0LCBleHA7XG4gIGlmKElTX0dMT0JBTClzb3VyY2UgPSBuYW1lO1xuICBmb3Ioa2V5IGluIHNvdXJjZSl7XG4gICAgLy8gY29udGFpbnMgaW4gbmF0aXZlXG4gICAgb3duID0gIUlTX0ZPUkNFRCAmJiB0YXJnZXQgJiYgdGFyZ2V0W2tleV0gIT09IHVuZGVmaW5lZDtcbiAgICAvLyBleHBvcnQgbmF0aXZlIG9yIHBhc3NlZFxuICAgIG91dCA9IChvd24gPyB0YXJnZXQgOiBzb3VyY2UpW2tleV07XG4gICAgLy8gYmluZCB0aW1lcnMgdG8gZ2xvYmFsIGZvciBjYWxsIGZyb20gZXhwb3J0IGNvbnRleHRcbiAgICBleHAgPSBJU19CSU5EICYmIG93biA/IGN0eChvdXQsIGdsb2JhbCkgOiBJU19QUk9UTyAmJiB0eXBlb2Ygb3V0ID09ICdmdW5jdGlvbicgPyBjdHgoRnVuY3Rpb24uY2FsbCwgb3V0KSA6IG91dDtcbiAgICAvLyBleHRlbmQgZ2xvYmFsXG4gICAgaWYodGFyZ2V0KXJlZGVmaW5lKHRhcmdldCwga2V5LCBvdXQsIHR5cGUgJiAkZXhwb3J0LlUpO1xuICAgIC8vIGV4cG9ydFxuICAgIGlmKGV4cG9ydHNba2V5XSAhPSBvdXQpaGlkZShleHBvcnRzLCBrZXksIGV4cCk7XG4gICAgaWYoSVNfUFJPVE8gJiYgZXhwUHJvdG9ba2V5XSAhPSBvdXQpZXhwUHJvdG9ba2V5XSA9IG91dDtcbiAgfVxufTtcbmdsb2JhbC5jb3JlID0gY29yZTtcbi8vIHR5cGUgYml0bWFwXG4kZXhwb3J0LkYgPSAxOyAgIC8vIGZvcmNlZFxuJGV4cG9ydC5HID0gMjsgICAvLyBnbG9iYWxcbiRleHBvcnQuUyA9IDQ7ICAgLy8gc3RhdGljXG4kZXhwb3J0LlAgPSA4OyAgIC8vIHByb3RvXG4kZXhwb3J0LkIgPSAxNjsgIC8vIGJpbmRcbiRleHBvcnQuVyA9IDMyOyAgLy8gd3JhcFxuJGV4cG9ydC5VID0gNjQ7ICAvLyBzYWZlXG4kZXhwb3J0LlIgPSAxMjg7IC8vIHJlYWwgcHJvdG8gbWV0aG9kIGZvciBgbGlicmFyeWAgXG5tb2R1bGUuZXhwb3J0cyA9ICRleHBvcnQ7IiwidmFyIHRvU3RyaW5nID0ge30udG9TdHJpbmc7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXQpe1xuICByZXR1cm4gdG9TdHJpbmcuY2FsbChpdCkuc2xpY2UoOCwgLTEpO1xufTsiLCIvLyBmYWxsYmFjayBmb3Igbm9uLWFycmF5LWxpa2UgRVMzIGFuZCBub24tZW51bWVyYWJsZSBvbGQgVjggc3RyaW5nc1xudmFyIGNvZiA9IHJlcXVpcmUoJy4vX2NvZicpO1xubW9kdWxlLmV4cG9ydHMgPSBPYmplY3QoJ3onKS5wcm9wZXJ0eUlzRW51bWVyYWJsZSgwKSA/IE9iamVjdCA6IGZ1bmN0aW9uKGl0KXtcbiAgcmV0dXJuIGNvZihpdCkgPT0gJ1N0cmluZycgPyBpdC5zcGxpdCgnJykgOiBPYmplY3QoaXQpO1xufTsiLCIvLyA3LjIuMSBSZXF1aXJlT2JqZWN0Q29lcmNpYmxlKGFyZ3VtZW50KVxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCl7XG4gIGlmKGl0ID09IHVuZGVmaW5lZCl0aHJvdyBUeXBlRXJyb3IoXCJDYW4ndCBjYWxsIG1ldGhvZCBvbiAgXCIgKyBpdCk7XG4gIHJldHVybiBpdDtcbn07IiwiLy8gdG8gaW5kZXhlZCBvYmplY3QsIHRvT2JqZWN0IHdpdGggZmFsbGJhY2sgZm9yIG5vbi1hcnJheS1saWtlIEVTMyBzdHJpbmdzXG52YXIgSU9iamVjdCA9IHJlcXVpcmUoJy4vX2lvYmplY3QnKVxuICAsIGRlZmluZWQgPSByZXF1aXJlKCcuL19kZWZpbmVkJyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0KXtcbiAgcmV0dXJuIElPYmplY3QoZGVmaW5lZChpdCkpO1xufTsiLCIvLyA3LjEuNCBUb0ludGVnZXJcbnZhciBjZWlsICA9IE1hdGguY2VpbFxuICAsIGZsb29yID0gTWF0aC5mbG9vcjtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXQpe1xuICByZXR1cm4gaXNOYU4oaXQgPSAraXQpID8gMCA6IChpdCA+IDAgPyBmbG9vciA6IGNlaWwpKGl0KTtcbn07IiwiLy8gNy4xLjE1IFRvTGVuZ3RoXG52YXIgdG9JbnRlZ2VyID0gcmVxdWlyZSgnLi9fdG8taW50ZWdlcicpXG4gICwgbWluICAgICAgID0gTWF0aC5taW47XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0KXtcbiAgcmV0dXJuIGl0ID4gMCA/IG1pbih0b0ludGVnZXIoaXQpLCAweDFmZmZmZmZmZmZmZmZmKSA6IDA7IC8vIHBvdygyLCA1MykgLSAxID09IDkwMDcxOTkyNTQ3NDA5OTFcbn07IiwidmFyIHRvSW50ZWdlciA9IHJlcXVpcmUoJy4vX3RvLWludGVnZXInKVxuICAsIG1heCAgICAgICA9IE1hdGgubWF4XG4gICwgbWluICAgICAgID0gTWF0aC5taW47XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGluZGV4LCBsZW5ndGgpe1xuICBpbmRleCA9IHRvSW50ZWdlcihpbmRleCk7XG4gIHJldHVybiBpbmRleCA8IDAgPyBtYXgoaW5kZXggKyBsZW5ndGgsIDApIDogbWluKGluZGV4LCBsZW5ndGgpO1xufTsiLCIvLyBmYWxzZSAtPiBBcnJheSNpbmRleE9mXG4vLyB0cnVlICAtPiBBcnJheSNpbmNsdWRlc1xudmFyIHRvSU9iamVjdCA9IHJlcXVpcmUoJy4vX3RvLWlvYmplY3QnKVxuICAsIHRvTGVuZ3RoICA9IHJlcXVpcmUoJy4vX3RvLWxlbmd0aCcpXG4gICwgdG9JbmRleCAgID0gcmVxdWlyZSgnLi9fdG8taW5kZXgnKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oSVNfSU5DTFVERVMpe1xuICByZXR1cm4gZnVuY3Rpb24oJHRoaXMsIGVsLCBmcm9tSW5kZXgpe1xuICAgIHZhciBPICAgICAgPSB0b0lPYmplY3QoJHRoaXMpXG4gICAgICAsIGxlbmd0aCA9IHRvTGVuZ3RoKE8ubGVuZ3RoKVxuICAgICAgLCBpbmRleCAgPSB0b0luZGV4KGZyb21JbmRleCwgbGVuZ3RoKVxuICAgICAgLCB2YWx1ZTtcbiAgICAvLyBBcnJheSNpbmNsdWRlcyB1c2VzIFNhbWVWYWx1ZVplcm8gZXF1YWxpdHkgYWxnb3JpdGhtXG4gICAgaWYoSVNfSU5DTFVERVMgJiYgZWwgIT0gZWwpd2hpbGUobGVuZ3RoID4gaW5kZXgpe1xuICAgICAgdmFsdWUgPSBPW2luZGV4KytdO1xuICAgICAgaWYodmFsdWUgIT0gdmFsdWUpcmV0dXJuIHRydWU7XG4gICAgLy8gQXJyYXkjdG9JbmRleCBpZ25vcmVzIGhvbGVzLCBBcnJheSNpbmNsdWRlcyAtIG5vdFxuICAgIH0gZWxzZSBmb3IoO2xlbmd0aCA+IGluZGV4OyBpbmRleCsrKWlmKElTX0lOQ0xVREVTIHx8IGluZGV4IGluIE8pe1xuICAgICAgaWYoT1tpbmRleF0gPT09IGVsKXJldHVybiBJU19JTkNMVURFUyB8fCBpbmRleCB8fCAwO1xuICAgIH0gcmV0dXJuICFJU19JTkNMVURFUyAmJiAtMTtcbiAgfTtcbn07IiwidmFyIGdsb2JhbCA9IHJlcXVpcmUoJy4vX2dsb2JhbCcpXG4gICwgU0hBUkVEID0gJ19fY29yZS1qc19zaGFyZWRfXydcbiAgLCBzdG9yZSAgPSBnbG9iYWxbU0hBUkVEXSB8fCAoZ2xvYmFsW1NIQVJFRF0gPSB7fSk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGtleSl7XG4gIHJldHVybiBzdG9yZVtrZXldIHx8IChzdG9yZVtrZXldID0ge30pO1xufTsiLCJ2YXIgc2hhcmVkID0gcmVxdWlyZSgnLi9fc2hhcmVkJykoJ2tleXMnKVxuICAsIHVpZCAgICA9IHJlcXVpcmUoJy4vX3VpZCcpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihrZXkpe1xuICByZXR1cm4gc2hhcmVkW2tleV0gfHwgKHNoYXJlZFtrZXldID0gdWlkKGtleSkpO1xufTsiLCJ2YXIgaGFzICAgICAgICAgID0gcmVxdWlyZSgnLi9faGFzJylcbiAgLCB0b0lPYmplY3QgICAgPSByZXF1aXJlKCcuL190by1pb2JqZWN0JylcbiAgLCBhcnJheUluZGV4T2YgPSByZXF1aXJlKCcuL19hcnJheS1pbmNsdWRlcycpKGZhbHNlKVxuICAsIElFX1BST1RPICAgICA9IHJlcXVpcmUoJy4vX3NoYXJlZC1rZXknKSgnSUVfUFJPVE8nKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihvYmplY3QsIG5hbWVzKXtcbiAgdmFyIE8gICAgICA9IHRvSU9iamVjdChvYmplY3QpXG4gICAgLCBpICAgICAgPSAwXG4gICAgLCByZXN1bHQgPSBbXVxuICAgICwga2V5O1xuICBmb3Ioa2V5IGluIE8paWYoa2V5ICE9IElFX1BST1RPKWhhcyhPLCBrZXkpICYmIHJlc3VsdC5wdXNoKGtleSk7XG4gIC8vIERvbid0IGVudW0gYnVnICYgaGlkZGVuIGtleXNcbiAgd2hpbGUobmFtZXMubGVuZ3RoID4gaSlpZihoYXMoTywga2V5ID0gbmFtZXNbaSsrXSkpe1xuICAgIH5hcnJheUluZGV4T2YocmVzdWx0LCBrZXkpIHx8IHJlc3VsdC5wdXNoKGtleSk7XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn07IiwiLy8gSUUgOC0gZG9uJ3QgZW51bSBidWcga2V5c1xubW9kdWxlLmV4cG9ydHMgPSAoXG4gICdjb25zdHJ1Y3RvcixoYXNPd25Qcm9wZXJ0eSxpc1Byb3RvdHlwZU9mLHByb3BlcnR5SXNFbnVtZXJhYmxlLHRvTG9jYWxlU3RyaW5nLHRvU3RyaW5nLHZhbHVlT2YnXG4pLnNwbGl0KCcsJyk7IiwiLy8gMTkuMS4yLjE0IC8gMTUuMi4zLjE0IE9iamVjdC5rZXlzKE8pXG52YXIgJGtleXMgICAgICAgPSByZXF1aXJlKCcuL19vYmplY3Qta2V5cy1pbnRlcm5hbCcpXG4gICwgZW51bUJ1Z0tleXMgPSByZXF1aXJlKCcuL19lbnVtLWJ1Zy1rZXlzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gT2JqZWN0LmtleXMgfHwgZnVuY3Rpb24ga2V5cyhPKXtcbiAgcmV0dXJuICRrZXlzKE8sIGVudW1CdWdLZXlzKTtcbn07IiwiZXhwb3J0cy5mID0gT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9sczsiLCJleHBvcnRzLmYgPSB7fS5wcm9wZXJ0eUlzRW51bWVyYWJsZTsiLCIvLyA3LjEuMTMgVG9PYmplY3QoYXJndW1lbnQpXG52YXIgZGVmaW5lZCA9IHJlcXVpcmUoJy4vX2RlZmluZWQnKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXQpe1xuICByZXR1cm4gT2JqZWN0KGRlZmluZWQoaXQpKTtcbn07IiwiJ3VzZSBzdHJpY3QnO1xuLy8gMTkuMS4yLjEgT2JqZWN0LmFzc2lnbih0YXJnZXQsIHNvdXJjZSwgLi4uKVxudmFyIGdldEtleXMgID0gcmVxdWlyZSgnLi9fb2JqZWN0LWtleXMnKVxuICAsIGdPUFMgICAgID0gcmVxdWlyZSgnLi9fb2JqZWN0LWdvcHMnKVxuICAsIHBJRSAgICAgID0gcmVxdWlyZSgnLi9fb2JqZWN0LXBpZScpXG4gICwgdG9PYmplY3QgPSByZXF1aXJlKCcuL190by1vYmplY3QnKVxuICAsIElPYmplY3QgID0gcmVxdWlyZSgnLi9faW9iamVjdCcpXG4gICwgJGFzc2lnbiAgPSBPYmplY3QuYXNzaWduO1xuXG4vLyBzaG91bGQgd29yayB3aXRoIHN5bWJvbHMgYW5kIHNob3VsZCBoYXZlIGRldGVybWluaXN0aWMgcHJvcGVydHkgb3JkZXIgKFY4IGJ1Zylcbm1vZHVsZS5leHBvcnRzID0gISRhc3NpZ24gfHwgcmVxdWlyZSgnLi9fZmFpbHMnKShmdW5jdGlvbigpe1xuICB2YXIgQSA9IHt9XG4gICAgLCBCID0ge31cbiAgICAsIFMgPSBTeW1ib2woKVxuICAgICwgSyA9ICdhYmNkZWZnaGlqa2xtbm9wcXJzdCc7XG4gIEFbU10gPSA3O1xuICBLLnNwbGl0KCcnKS5mb3JFYWNoKGZ1bmN0aW9uKGspeyBCW2tdID0gazsgfSk7XG4gIHJldHVybiAkYXNzaWduKHt9LCBBKVtTXSAhPSA3IHx8IE9iamVjdC5rZXlzKCRhc3NpZ24oe30sIEIpKS5qb2luKCcnKSAhPSBLO1xufSkgPyBmdW5jdGlvbiBhc3NpZ24odGFyZ2V0LCBzb3VyY2UpeyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVudXNlZC12YXJzXG4gIHZhciBUICAgICA9IHRvT2JqZWN0KHRhcmdldClcbiAgICAsIGFMZW4gID0gYXJndW1lbnRzLmxlbmd0aFxuICAgICwgaW5kZXggPSAxXG4gICAgLCBnZXRTeW1ib2xzID0gZ09QUy5mXG4gICAgLCBpc0VudW0gICAgID0gcElFLmY7XG4gIHdoaWxlKGFMZW4gPiBpbmRleCl7XG4gICAgdmFyIFMgICAgICA9IElPYmplY3QoYXJndW1lbnRzW2luZGV4KytdKVxuICAgICAgLCBrZXlzICAgPSBnZXRTeW1ib2xzID8gZ2V0S2V5cyhTKS5jb25jYXQoZ2V0U3ltYm9scyhTKSkgOiBnZXRLZXlzKFMpXG4gICAgICAsIGxlbmd0aCA9IGtleXMubGVuZ3RoXG4gICAgICAsIGogICAgICA9IDBcbiAgICAgICwga2V5O1xuICAgIHdoaWxlKGxlbmd0aCA+IGopaWYoaXNFbnVtLmNhbGwoUywga2V5ID0ga2V5c1tqKytdKSlUW2tleV0gPSBTW2tleV07XG4gIH0gcmV0dXJuIFQ7XG59IDogJGFzc2lnbjsiLCIvLyAxOS4xLjMuMSBPYmplY3QuYXNzaWduKHRhcmdldCwgc291cmNlKVxudmFyICRleHBvcnQgPSByZXF1aXJlKCcuL19leHBvcnQnKTtcblxuJGV4cG9ydCgkZXhwb3J0LlMgKyAkZXhwb3J0LkYsICdPYmplY3QnLCB7YXNzaWduOiByZXF1aXJlKCcuL19vYmplY3QtYXNzaWduJyl9KTsiLCIvKiBlc2xpbnQtZGlzYWJsZSAqL1xuXG4vLyBodHRwczovL2dpc3QuZ2l0aHViLmNvbS9XZWJSZWZsZWN0aW9uLzU1OTM1NTRcblxuLyogaXN0YW5idWwgaWdub3JlIGlmICovXG5pZiAoIU9iamVjdC5zZXRQcm90b3R5cGVPZikge1xuICBPYmplY3Quc2V0UHJvdG90eXBlT2YgPSAoZnVuY3Rpb24oT2JqZWN0LCBtYWdpYykge1xuICAgIHZhciBzZXQ7XG4gICAgZnVuY3Rpb24gc2V0UHJvdG90eXBlT2YoTywgcHJvdG8pIHtcbiAgICAgIHNldC5jYWxsKE8sIHByb3RvKTtcbiAgICAgIHJldHVybiBPO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgLy8gdGhpcyB3b3JrcyBhbHJlYWR5IGluIEZpcmVmb3ggYW5kIFNhZmFyaVxuICAgICAgc2V0ID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihPYmplY3QucHJvdG90eXBlLCBtYWdpYykuc2V0O1xuICAgICAgc2V0LmNhbGwoe30sIG51bGwpO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIGlmIChcbiAgICAgICAgLy8gSUUgPCAxMSBjYW5ub3QgYmUgc2hpbW1lZFxuICAgICAgICBPYmplY3QucHJvdG90eXBlICE9PSB7fVttYWdpY10gfHxcbiAgICAgICAgLy8gbmVpdGhlciBjYW4gYW55IGJyb3dzZXIgdGhhdCBhY3R1YWxseVxuICAgICAgICAvLyBpbXBsZW1lbnRlZCBfX3Byb3RvX18gY29ycmVjdGx5XG4gICAgICAgIC8vIChhbGwgYnV0IG9sZCBWOCB3aWxsIHJldHVybiBoZXJlKVxuICAgICAgICB7X19wcm90b19fOiBudWxsfS5fX3Byb3RvX18gPT09IHZvaWQgMFxuICAgICAgICAvLyB0aGlzIGNhc2UgbWVhbnMgbnVsbCBvYmplY3RzIGNhbm5vdCBiZSBwYXNzZWRcbiAgICAgICAgLy8gdGhyb3VnaCBzZXRQcm90b3R5cGVPZiBpbiBhIHJlbGlhYmxlIHdheVxuICAgICAgICAvLyB3aGljaCBtZWFucyBoZXJlIGEgKipTaGFtKiogaXMgbmVlZGVkIGluc3RlYWRcbiAgICAgICkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICAvLyBub2RlanMgMC44IGFuZCAwLjEwIGFyZSAoYnVnZ3kgYW5kLi4pIGZpbmUgaGVyZVxuICAgICAgLy8gcHJvYmFibHkgQ2hyb21lIG9yIHNvbWUgb2xkIE1vYmlsZSBzdG9jayBicm93c2VyXG4gICAgICBzZXQgPSBmdW5jdGlvbihwcm90bykge1xuICAgICAgICB0aGlzW21hZ2ljXSA9IHByb3RvO1xuICAgICAgfTtcbiAgICAgIC8vIHBsZWFzZSBub3RlIHRoYXQgdGhpcyB3aWxsICoqbm90Kiogd29ya1xuICAgICAgLy8gaW4gdGhvc2UgYnJvd3NlcnMgdGhhdCBkbyBub3QgaW5oZXJpdFxuICAgICAgLy8gX19wcm90b19fIGJ5IG1pc3Rha2UgZnJvbSBPYmplY3QucHJvdG90eXBlXG4gICAgICAvLyBpbiB0aGVzZSBjYXNlcyB3ZSBzaG91bGQgcHJvYmFibHkgdGhyb3cgYW4gZXJyb3JcbiAgICAgIC8vIG9yIGF0IGxlYXN0IGJlIGluZm9ybWVkIGFib3V0IHRoZSBpc3N1ZVxuICAgICAgc2V0UHJvdG90eXBlT2YucG9seWZpbGwgPSBzZXRQcm90b3R5cGVPZihcbiAgICAgICAgc2V0UHJvdG90eXBlT2Yoe30sIG51bGwpLFxuICAgICAgICBPYmplY3QucHJvdG90eXBlXG4gICAgICApIGluc3RhbmNlb2YgT2JqZWN0O1xuICAgICAgLy8gc2V0UHJvdG90eXBlT2YucG9seWZpbGwgPT09IHRydWUgbWVhbnMgaXQgd29ya3MgYXMgbWVhbnRcbiAgICAgIC8vIHNldFByb3RvdHlwZU9mLnBvbHlmaWxsID09PSBmYWxzZSBtZWFucyBpdCdzIG5vdCAxMDAlIHJlbGlhYmxlXG4gICAgICAvLyBzZXRQcm90b3R5cGVPZi5wb2x5ZmlsbCA9PT0gdW5kZWZpbmVkXG4gICAgICAvLyBvclxuICAgICAgLy8gc2V0UHJvdG90eXBlT2YucG9seWZpbGwgPT0gIG51bGwgbWVhbnMgaXQncyBub3QgYSBwb2x5ZmlsbFxuICAgICAgLy8gd2hpY2ggbWVhbnMgaXQgd29ya3MgYXMgZXhwZWN0ZWRcbiAgICAgIC8vIHdlIGNhbiBldmVuIGRlbGV0ZSBPYmplY3QucHJvdG90eXBlLl9fcHJvdG9fXztcbiAgICB9XG4gICAgcmV0dXJuIHNldFByb3RvdHlwZU9mO1xuICB9KE9iamVjdCwgJ19fcHJvdG9fXycpKTtcbn1cbiIsInZhciBzdG9yZSAgICAgID0gcmVxdWlyZSgnLi9fc2hhcmVkJykoJ3drcycpXG4gICwgdWlkICAgICAgICA9IHJlcXVpcmUoJy4vX3VpZCcpXG4gICwgU3ltYm9sICAgICA9IHJlcXVpcmUoJy4vX2dsb2JhbCcpLlN5bWJvbFxuICAsIFVTRV9TWU1CT0wgPSB0eXBlb2YgU3ltYm9sID09ICdmdW5jdGlvbic7XG5cbnZhciAkZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24obmFtZSl7XG4gIHJldHVybiBzdG9yZVtuYW1lXSB8fCAoc3RvcmVbbmFtZV0gPVxuICAgIFVTRV9TWU1CT0wgJiYgU3ltYm9sW25hbWVdIHx8IChVU0VfU1lNQk9MID8gU3ltYm9sIDogdWlkKSgnU3ltYm9sLicgKyBuYW1lKSk7XG59O1xuXG4kZXhwb3J0cy5zdG9yZSA9IHN0b3JlOyIsIi8vIGdldHRpbmcgdGFnIGZyb20gMTkuMS4zLjYgT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZygpXG52YXIgY29mID0gcmVxdWlyZSgnLi9fY29mJylcbiAgLCBUQUcgPSByZXF1aXJlKCcuL193a3MnKSgndG9TdHJpbmdUYWcnKVxuICAvLyBFUzMgd3JvbmcgaGVyZVxuICAsIEFSRyA9IGNvZihmdW5jdGlvbigpeyByZXR1cm4gYXJndW1lbnRzOyB9KCkpID09ICdBcmd1bWVudHMnO1xuXG4vLyBmYWxsYmFjayBmb3IgSUUxMSBTY3JpcHQgQWNjZXNzIERlbmllZCBlcnJvclxudmFyIHRyeUdldCA9IGZ1bmN0aW9uKGl0LCBrZXkpe1xuICB0cnkge1xuICAgIHJldHVybiBpdFtrZXldO1xuICB9IGNhdGNoKGUpeyAvKiBlbXB0eSAqLyB9XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0KXtcbiAgdmFyIE8sIFQsIEI7XG4gIHJldHVybiBpdCA9PT0gdW5kZWZpbmVkID8gJ1VuZGVmaW5lZCcgOiBpdCA9PT0gbnVsbCA/ICdOdWxsJ1xuICAgIC8vIEBAdG9TdHJpbmdUYWcgY2FzZVxuICAgIDogdHlwZW9mIChUID0gdHJ5R2V0KE8gPSBPYmplY3QoaXQpLCBUQUcpKSA9PSAnc3RyaW5nJyA/IFRcbiAgICAvLyBidWlsdGluVGFnIGNhc2VcbiAgICA6IEFSRyA/IGNvZihPKVxuICAgIC8vIEVTMyBhcmd1bWVudHMgZmFsbGJhY2tcbiAgICA6IChCID0gY29mKE8pKSA9PSAnT2JqZWN0JyAmJiB0eXBlb2YgTy5jYWxsZWUgPT0gJ2Z1bmN0aW9uJyA/ICdBcmd1bWVudHMnIDogQjtcbn07IiwiJ3VzZSBzdHJpY3QnO1xuLy8gMTkuMS4zLjYgT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZygpXG52YXIgY2xhc3NvZiA9IHJlcXVpcmUoJy4vX2NsYXNzb2YnKVxuICAsIHRlc3QgICAgPSB7fTtcbnRlc3RbcmVxdWlyZSgnLi9fd2tzJykoJ3RvU3RyaW5nVGFnJyldID0gJ3onO1xuaWYodGVzdCArICcnICE9ICdbb2JqZWN0IHpdJyl7XG4gIHJlcXVpcmUoJy4vX3JlZGVmaW5lJykoT2JqZWN0LnByb3RvdHlwZSwgJ3RvU3RyaW5nJywgZnVuY3Rpb24gdG9TdHJpbmcoKXtcbiAgICByZXR1cm4gJ1tvYmplY3QgJyArIGNsYXNzb2YodGhpcykgKyAnXSc7XG4gIH0sIHRydWUpO1xufSIsInZhciB0b0ludGVnZXIgPSByZXF1aXJlKCcuL190by1pbnRlZ2VyJylcbiAgLCBkZWZpbmVkICAgPSByZXF1aXJlKCcuL19kZWZpbmVkJyk7XG4vLyB0cnVlICAtPiBTdHJpbmcjYXRcbi8vIGZhbHNlIC0+IFN0cmluZyNjb2RlUG9pbnRBdFxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihUT19TVFJJTkcpe1xuICByZXR1cm4gZnVuY3Rpb24odGhhdCwgcG9zKXtcbiAgICB2YXIgcyA9IFN0cmluZyhkZWZpbmVkKHRoYXQpKVxuICAgICAgLCBpID0gdG9JbnRlZ2VyKHBvcylcbiAgICAgICwgbCA9IHMubGVuZ3RoXG4gICAgICAsIGEsIGI7XG4gICAgaWYoaSA8IDAgfHwgaSA+PSBsKXJldHVybiBUT19TVFJJTkcgPyAnJyA6IHVuZGVmaW5lZDtcbiAgICBhID0gcy5jaGFyQ29kZUF0KGkpO1xuICAgIHJldHVybiBhIDwgMHhkODAwIHx8IGEgPiAweGRiZmYgfHwgaSArIDEgPT09IGwgfHwgKGIgPSBzLmNoYXJDb2RlQXQoaSArIDEpKSA8IDB4ZGMwMCB8fCBiID4gMHhkZmZmXG4gICAgICA/IFRPX1NUUklORyA/IHMuY2hhckF0KGkpIDogYVxuICAgICAgOiBUT19TVFJJTkcgPyBzLnNsaWNlKGksIGkgKyAyKSA6IChhIC0gMHhkODAwIDw8IDEwKSArIChiIC0gMHhkYzAwKSArIDB4MTAwMDA7XG4gIH07XG59OyIsIm1vZHVsZS5leHBvcnRzID0gZmFsc2U7IiwibW9kdWxlLmV4cG9ydHMgPSB7fTsiLCJ2YXIgZFAgICAgICAgPSByZXF1aXJlKCcuL19vYmplY3QtZHAnKVxuICAsIGFuT2JqZWN0ID0gcmVxdWlyZSgnLi9fYW4tb2JqZWN0JylcbiAgLCBnZXRLZXlzICA9IHJlcXVpcmUoJy4vX29iamVjdC1rZXlzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9fZGVzY3JpcHRvcnMnKSA/IE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzIDogZnVuY3Rpb24gZGVmaW5lUHJvcGVydGllcyhPLCBQcm9wZXJ0aWVzKXtcbiAgYW5PYmplY3QoTyk7XG4gIHZhciBrZXlzICAgPSBnZXRLZXlzKFByb3BlcnRpZXMpXG4gICAgLCBsZW5ndGggPSBrZXlzLmxlbmd0aFxuICAgICwgaSA9IDBcbiAgICAsIFA7XG4gIHdoaWxlKGxlbmd0aCA+IGkpZFAuZihPLCBQID0ga2V5c1tpKytdLCBQcm9wZXJ0aWVzW1BdKTtcbiAgcmV0dXJuIE87XG59OyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9fZ2xvYmFsJykuZG9jdW1lbnQgJiYgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50OyIsIi8vIDE5LjEuMi4yIC8gMTUuMi4zLjUgT2JqZWN0LmNyZWF0ZShPIFssIFByb3BlcnRpZXNdKVxudmFyIGFuT2JqZWN0ICAgID0gcmVxdWlyZSgnLi9fYW4tb2JqZWN0JylcbiAgLCBkUHMgICAgICAgICA9IHJlcXVpcmUoJy4vX29iamVjdC1kcHMnKVxuICAsIGVudW1CdWdLZXlzID0gcmVxdWlyZSgnLi9fZW51bS1idWcta2V5cycpXG4gICwgSUVfUFJPVE8gICAgPSByZXF1aXJlKCcuL19zaGFyZWQta2V5JykoJ0lFX1BST1RPJylcbiAgLCBFbXB0eSAgICAgICA9IGZ1bmN0aW9uKCl7IC8qIGVtcHR5ICovIH1cbiAgLCBQUk9UT1RZUEUgICA9ICdwcm90b3R5cGUnO1xuXG4vLyBDcmVhdGUgb2JqZWN0IHdpdGggZmFrZSBgbnVsbGAgcHJvdG90eXBlOiB1c2UgaWZyYW1lIE9iamVjdCB3aXRoIGNsZWFyZWQgcHJvdG90eXBlXG52YXIgY3JlYXRlRGljdCA9IGZ1bmN0aW9uKCl7XG4gIC8vIFRocmFzaCwgd2FzdGUgYW5kIHNvZG9teTogSUUgR0MgYnVnXG4gIHZhciBpZnJhbWUgPSByZXF1aXJlKCcuL19kb20tY3JlYXRlJykoJ2lmcmFtZScpXG4gICAgLCBpICAgICAgPSBlbnVtQnVnS2V5cy5sZW5ndGhcbiAgICAsIGx0ICAgICA9ICc8J1xuICAgICwgZ3QgICAgID0gJz4nXG4gICAgLCBpZnJhbWVEb2N1bWVudDtcbiAgaWZyYW1lLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gIHJlcXVpcmUoJy4vX2h0bWwnKS5hcHBlbmRDaGlsZChpZnJhbWUpO1xuICBpZnJhbWUuc3JjID0gJ2phdmFzY3JpcHQ6JzsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1zY3JpcHQtdXJsXG4gIC8vIGNyZWF0ZURpY3QgPSBpZnJhbWUuY29udGVudFdpbmRvdy5PYmplY3Q7XG4gIC8vIGh0bWwucmVtb3ZlQ2hpbGQoaWZyYW1lKTtcbiAgaWZyYW1lRG9jdW1lbnQgPSBpZnJhbWUuY29udGVudFdpbmRvdy5kb2N1bWVudDtcbiAgaWZyYW1lRG9jdW1lbnQub3BlbigpO1xuICBpZnJhbWVEb2N1bWVudC53cml0ZShsdCArICdzY3JpcHQnICsgZ3QgKyAnZG9jdW1lbnQuRj1PYmplY3QnICsgbHQgKyAnL3NjcmlwdCcgKyBndCk7XG4gIGlmcmFtZURvY3VtZW50LmNsb3NlKCk7XG4gIGNyZWF0ZURpY3QgPSBpZnJhbWVEb2N1bWVudC5GO1xuICB3aGlsZShpLS0pZGVsZXRlIGNyZWF0ZURpY3RbUFJPVE9UWVBFXVtlbnVtQnVnS2V5c1tpXV07XG4gIHJldHVybiBjcmVhdGVEaWN0KCk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IE9iamVjdC5jcmVhdGUgfHwgZnVuY3Rpb24gY3JlYXRlKE8sIFByb3BlcnRpZXMpe1xuICB2YXIgcmVzdWx0O1xuICBpZihPICE9PSBudWxsKXtcbiAgICBFbXB0eVtQUk9UT1RZUEVdID0gYW5PYmplY3QoTyk7XG4gICAgcmVzdWx0ID0gbmV3IEVtcHR5O1xuICAgIEVtcHR5W1BST1RPVFlQRV0gPSBudWxsO1xuICAgIC8vIGFkZCBcIl9fcHJvdG9fX1wiIGZvciBPYmplY3QuZ2V0UHJvdG90eXBlT2YgcG9seWZpbGxcbiAgICByZXN1bHRbSUVfUFJPVE9dID0gTztcbiAgfSBlbHNlIHJlc3VsdCA9IGNyZWF0ZURpY3QoKTtcbiAgcmV0dXJuIFByb3BlcnRpZXMgPT09IHVuZGVmaW5lZCA/IHJlc3VsdCA6IGRQcyhyZXN1bHQsIFByb3BlcnRpZXMpO1xufTtcbiIsInZhciBkZWYgPSByZXF1aXJlKCcuL19vYmplY3QtZHAnKS5mXG4gICwgaGFzID0gcmVxdWlyZSgnLi9faGFzJylcbiAgLCBUQUcgPSByZXF1aXJlKCcuL193a3MnKSgndG9TdHJpbmdUYWcnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCwgdGFnLCBzdGF0KXtcbiAgaWYoaXQgJiYgIWhhcyhpdCA9IHN0YXQgPyBpdCA6IGl0LnByb3RvdHlwZSwgVEFHKSlkZWYoaXQsIFRBRywge2NvbmZpZ3VyYWJsZTogdHJ1ZSwgdmFsdWU6IHRhZ30pO1xufTsiLCIndXNlIHN0cmljdCc7XG52YXIgY3JlYXRlICAgICAgICAgPSByZXF1aXJlKCcuL19vYmplY3QtY3JlYXRlJylcbiAgLCBkZXNjcmlwdG9yICAgICA9IHJlcXVpcmUoJy4vX3Byb3BlcnR5LWRlc2MnKVxuICAsIHNldFRvU3RyaW5nVGFnID0gcmVxdWlyZSgnLi9fc2V0LXRvLXN0cmluZy10YWcnKVxuICAsIEl0ZXJhdG9yUHJvdG90eXBlID0ge307XG5cbi8vIDI1LjEuMi4xLjEgJUl0ZXJhdG9yUHJvdG90eXBlJVtAQGl0ZXJhdG9yXSgpXG5yZXF1aXJlKCcuL19oaWRlJykoSXRlcmF0b3JQcm90b3R5cGUsIHJlcXVpcmUoJy4vX3drcycpKCdpdGVyYXRvcicpLCBmdW5jdGlvbigpeyByZXR1cm4gdGhpczsgfSk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oQ29uc3RydWN0b3IsIE5BTUUsIG5leHQpe1xuICBDb25zdHJ1Y3Rvci5wcm90b3R5cGUgPSBjcmVhdGUoSXRlcmF0b3JQcm90b3R5cGUsIHtuZXh0OiBkZXNjcmlwdG9yKDEsIG5leHQpfSk7XG4gIHNldFRvU3RyaW5nVGFnKENvbnN0cnVjdG9yLCBOQU1FICsgJyBJdGVyYXRvcicpO1xufTsiLCIvLyAxOS4xLjIuOSAvIDE1LjIuMy4yIE9iamVjdC5nZXRQcm90b3R5cGVPZihPKVxudmFyIGhhcyAgICAgICAgID0gcmVxdWlyZSgnLi9faGFzJylcbiAgLCB0b09iamVjdCAgICA9IHJlcXVpcmUoJy4vX3RvLW9iamVjdCcpXG4gICwgSUVfUFJPVE8gICAgPSByZXF1aXJlKCcuL19zaGFyZWQta2V5JykoJ0lFX1BST1RPJylcbiAgLCBPYmplY3RQcm90byA9IE9iamVjdC5wcm90b3R5cGU7XG5cbm1vZHVsZS5leHBvcnRzID0gT2JqZWN0LmdldFByb3RvdHlwZU9mIHx8IGZ1bmN0aW9uKE8pe1xuICBPID0gdG9PYmplY3QoTyk7XG4gIGlmKGhhcyhPLCBJRV9QUk9UTykpcmV0dXJuIE9bSUVfUFJPVE9dO1xuICBpZih0eXBlb2YgTy5jb25zdHJ1Y3RvciA9PSAnZnVuY3Rpb24nICYmIE8gaW5zdGFuY2VvZiBPLmNvbnN0cnVjdG9yKXtcbiAgICByZXR1cm4gTy5jb25zdHJ1Y3Rvci5wcm90b3R5cGU7XG4gIH0gcmV0dXJuIE8gaW5zdGFuY2VvZiBPYmplY3QgPyBPYmplY3RQcm90byA6IG51bGw7XG59OyIsIid1c2Ugc3RyaWN0JztcbnZhciBMSUJSQVJZICAgICAgICA9IHJlcXVpcmUoJy4vX2xpYnJhcnknKVxuICAsICRleHBvcnQgICAgICAgID0gcmVxdWlyZSgnLi9fZXhwb3J0JylcbiAgLCByZWRlZmluZSAgICAgICA9IHJlcXVpcmUoJy4vX3JlZGVmaW5lJylcbiAgLCBoaWRlICAgICAgICAgICA9IHJlcXVpcmUoJy4vX2hpZGUnKVxuICAsIGhhcyAgICAgICAgICAgID0gcmVxdWlyZSgnLi9faGFzJylcbiAgLCBJdGVyYXRvcnMgICAgICA9IHJlcXVpcmUoJy4vX2l0ZXJhdG9ycycpXG4gICwgJGl0ZXJDcmVhdGUgICAgPSByZXF1aXJlKCcuL19pdGVyLWNyZWF0ZScpXG4gICwgc2V0VG9TdHJpbmdUYWcgPSByZXF1aXJlKCcuL19zZXQtdG8tc3RyaW5nLXRhZycpXG4gICwgZ2V0UHJvdG90eXBlT2YgPSByZXF1aXJlKCcuL19vYmplY3QtZ3BvJylcbiAgLCBJVEVSQVRPUiAgICAgICA9IHJlcXVpcmUoJy4vX3drcycpKCdpdGVyYXRvcicpXG4gICwgQlVHR1kgICAgICAgICAgPSAhKFtdLmtleXMgJiYgJ25leHQnIGluIFtdLmtleXMoKSkgLy8gU2FmYXJpIGhhcyBidWdneSBpdGVyYXRvcnMgdy9vIGBuZXh0YFxuICAsIEZGX0lURVJBVE9SICAgID0gJ0BAaXRlcmF0b3InXG4gICwgS0VZUyAgICAgICAgICAgPSAna2V5cydcbiAgLCBWQUxVRVMgICAgICAgICA9ICd2YWx1ZXMnO1xuXG52YXIgcmV0dXJuVGhpcyA9IGZ1bmN0aW9uKCl7IHJldHVybiB0aGlzOyB9O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKEJhc2UsIE5BTUUsIENvbnN0cnVjdG9yLCBuZXh0LCBERUZBVUxULCBJU19TRVQsIEZPUkNFRCl7XG4gICRpdGVyQ3JlYXRlKENvbnN0cnVjdG9yLCBOQU1FLCBuZXh0KTtcbiAgdmFyIGdldE1ldGhvZCA9IGZ1bmN0aW9uKGtpbmQpe1xuICAgIGlmKCFCVUdHWSAmJiBraW5kIGluIHByb3RvKXJldHVybiBwcm90b1traW5kXTtcbiAgICBzd2l0Y2goa2luZCl7XG4gICAgICBjYXNlIEtFWVM6IHJldHVybiBmdW5jdGlvbiBrZXlzKCl7IHJldHVybiBuZXcgQ29uc3RydWN0b3IodGhpcywga2luZCk7IH07XG4gICAgICBjYXNlIFZBTFVFUzogcmV0dXJuIGZ1bmN0aW9uIHZhbHVlcygpeyByZXR1cm4gbmV3IENvbnN0cnVjdG9yKHRoaXMsIGtpbmQpOyB9O1xuICAgIH0gcmV0dXJuIGZ1bmN0aW9uIGVudHJpZXMoKXsgcmV0dXJuIG5ldyBDb25zdHJ1Y3Rvcih0aGlzLCBraW5kKTsgfTtcbiAgfTtcbiAgdmFyIFRBRyAgICAgICAgPSBOQU1FICsgJyBJdGVyYXRvcidcbiAgICAsIERFRl9WQUxVRVMgPSBERUZBVUxUID09IFZBTFVFU1xuICAgICwgVkFMVUVTX0JVRyA9IGZhbHNlXG4gICAgLCBwcm90byAgICAgID0gQmFzZS5wcm90b3R5cGVcbiAgICAsICRuYXRpdmUgICAgPSBwcm90b1tJVEVSQVRPUl0gfHwgcHJvdG9bRkZfSVRFUkFUT1JdIHx8IERFRkFVTFQgJiYgcHJvdG9bREVGQVVMVF1cbiAgICAsICRkZWZhdWx0ICAgPSAkbmF0aXZlIHx8IGdldE1ldGhvZChERUZBVUxUKVxuICAgICwgJGVudHJpZXMgICA9IERFRkFVTFQgPyAhREVGX1ZBTFVFUyA/ICRkZWZhdWx0IDogZ2V0TWV0aG9kKCdlbnRyaWVzJykgOiB1bmRlZmluZWRcbiAgICAsICRhbnlOYXRpdmUgPSBOQU1FID09ICdBcnJheScgPyBwcm90by5lbnRyaWVzIHx8ICRuYXRpdmUgOiAkbmF0aXZlXG4gICAgLCBtZXRob2RzLCBrZXksIEl0ZXJhdG9yUHJvdG90eXBlO1xuICAvLyBGaXggbmF0aXZlXG4gIGlmKCRhbnlOYXRpdmUpe1xuICAgIEl0ZXJhdG9yUHJvdG90eXBlID0gZ2V0UHJvdG90eXBlT2YoJGFueU5hdGl2ZS5jYWxsKG5ldyBCYXNlKSk7XG4gICAgaWYoSXRlcmF0b3JQcm90b3R5cGUgIT09IE9iamVjdC5wcm90b3R5cGUpe1xuICAgICAgLy8gU2V0IEBAdG9TdHJpbmdUYWcgdG8gbmF0aXZlIGl0ZXJhdG9yc1xuICAgICAgc2V0VG9TdHJpbmdUYWcoSXRlcmF0b3JQcm90b3R5cGUsIFRBRywgdHJ1ZSk7XG4gICAgICAvLyBmaXggZm9yIHNvbWUgb2xkIGVuZ2luZXNcbiAgICAgIGlmKCFMSUJSQVJZICYmICFoYXMoSXRlcmF0b3JQcm90b3R5cGUsIElURVJBVE9SKSloaWRlKEl0ZXJhdG9yUHJvdG90eXBlLCBJVEVSQVRPUiwgcmV0dXJuVGhpcyk7XG4gICAgfVxuICB9XG4gIC8vIGZpeCBBcnJheSN7dmFsdWVzLCBAQGl0ZXJhdG9yfS5uYW1lIGluIFY4IC8gRkZcbiAgaWYoREVGX1ZBTFVFUyAmJiAkbmF0aXZlICYmICRuYXRpdmUubmFtZSAhPT0gVkFMVUVTKXtcbiAgICBWQUxVRVNfQlVHID0gdHJ1ZTtcbiAgICAkZGVmYXVsdCA9IGZ1bmN0aW9uIHZhbHVlcygpeyByZXR1cm4gJG5hdGl2ZS5jYWxsKHRoaXMpOyB9O1xuICB9XG4gIC8vIERlZmluZSBpdGVyYXRvclxuICBpZigoIUxJQlJBUlkgfHwgRk9SQ0VEKSAmJiAoQlVHR1kgfHwgVkFMVUVTX0JVRyB8fCAhcHJvdG9bSVRFUkFUT1JdKSl7XG4gICAgaGlkZShwcm90bywgSVRFUkFUT1IsICRkZWZhdWx0KTtcbiAgfVxuICAvLyBQbHVnIGZvciBsaWJyYXJ5XG4gIEl0ZXJhdG9yc1tOQU1FXSA9ICRkZWZhdWx0O1xuICBJdGVyYXRvcnNbVEFHXSAgPSByZXR1cm5UaGlzO1xuICBpZihERUZBVUxUKXtcbiAgICBtZXRob2RzID0ge1xuICAgICAgdmFsdWVzOiAgREVGX1ZBTFVFUyA/ICRkZWZhdWx0IDogZ2V0TWV0aG9kKFZBTFVFUyksXG4gICAgICBrZXlzOiAgICBJU19TRVQgICAgID8gJGRlZmF1bHQgOiBnZXRNZXRob2QoS0VZUyksXG4gICAgICBlbnRyaWVzOiAkZW50cmllc1xuICAgIH07XG4gICAgaWYoRk9SQ0VEKWZvcihrZXkgaW4gbWV0aG9kcyl7XG4gICAgICBpZighKGtleSBpbiBwcm90bykpcmVkZWZpbmUocHJvdG8sIGtleSwgbWV0aG9kc1trZXldKTtcbiAgICB9IGVsc2UgJGV4cG9ydCgkZXhwb3J0LlAgKyAkZXhwb3J0LkYgKiAoQlVHR1kgfHwgVkFMVUVTX0JVRyksIE5BTUUsIG1ldGhvZHMpO1xuICB9XG4gIHJldHVybiBtZXRob2RzO1xufTsiLCIndXNlIHN0cmljdCc7XG52YXIgJGF0ICA9IHJlcXVpcmUoJy4vX3N0cmluZy1hdCcpKHRydWUpO1xuXG4vLyAyMS4xLjMuMjcgU3RyaW5nLnByb3RvdHlwZVtAQGl0ZXJhdG9yXSgpXG5yZXF1aXJlKCcuL19pdGVyLWRlZmluZScpKFN0cmluZywgJ1N0cmluZycsIGZ1bmN0aW9uKGl0ZXJhdGVkKXtcbiAgdGhpcy5fdCA9IFN0cmluZyhpdGVyYXRlZCk7IC8vIHRhcmdldFxuICB0aGlzLl9pID0gMDsgICAgICAgICAgICAgICAgLy8gbmV4dCBpbmRleFxuLy8gMjEuMS41LjIuMSAlU3RyaW5nSXRlcmF0b3JQcm90b3R5cGUlLm5leHQoKVxufSwgZnVuY3Rpb24oKXtcbiAgdmFyIE8gICAgID0gdGhpcy5fdFxuICAgICwgaW5kZXggPSB0aGlzLl9pXG4gICAgLCBwb2ludDtcbiAgaWYoaW5kZXggPj0gTy5sZW5ndGgpcmV0dXJuIHt2YWx1ZTogdW5kZWZpbmVkLCBkb25lOiB0cnVlfTtcbiAgcG9pbnQgPSAkYXQoTywgaW5kZXgpO1xuICB0aGlzLl9pICs9IHBvaW50Lmxlbmd0aDtcbiAgcmV0dXJuIHt2YWx1ZTogcG9pbnQsIGRvbmU6IGZhbHNlfTtcbn0pOyIsIi8vIDIyLjEuMy4zMSBBcnJheS5wcm90b3R5cGVbQEB1bnNjb3BhYmxlc11cbnZhciBVTlNDT1BBQkxFUyA9IHJlcXVpcmUoJy4vX3drcycpKCd1bnNjb3BhYmxlcycpXG4gICwgQXJyYXlQcm90byAgPSBBcnJheS5wcm90b3R5cGU7XG5pZihBcnJheVByb3RvW1VOU0NPUEFCTEVTXSA9PSB1bmRlZmluZWQpcmVxdWlyZSgnLi9faGlkZScpKEFycmF5UHJvdG8sIFVOU0NPUEFCTEVTLCB7fSk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGtleSl7XG4gIEFycmF5UHJvdG9bVU5TQ09QQUJMRVNdW2tleV0gPSB0cnVlO1xufTsiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGRvbmUsIHZhbHVlKXtcbiAgcmV0dXJuIHt2YWx1ZTogdmFsdWUsIGRvbmU6ICEhZG9uZX07XG59OyIsIid1c2Ugc3RyaWN0JztcbnZhciBhZGRUb1Vuc2NvcGFibGVzID0gcmVxdWlyZSgnLi9fYWRkLXRvLXVuc2NvcGFibGVzJylcbiAgLCBzdGVwICAgICAgICAgICAgID0gcmVxdWlyZSgnLi9faXRlci1zdGVwJylcbiAgLCBJdGVyYXRvcnMgICAgICAgID0gcmVxdWlyZSgnLi9faXRlcmF0b3JzJylcbiAgLCB0b0lPYmplY3QgICAgICAgID0gcmVxdWlyZSgnLi9fdG8taW9iamVjdCcpO1xuXG4vLyAyMi4xLjMuNCBBcnJheS5wcm90b3R5cGUuZW50cmllcygpXG4vLyAyMi4xLjMuMTMgQXJyYXkucHJvdG90eXBlLmtleXMoKVxuLy8gMjIuMS4zLjI5IEFycmF5LnByb3RvdHlwZS52YWx1ZXMoKVxuLy8gMjIuMS4zLjMwIEFycmF5LnByb3RvdHlwZVtAQGl0ZXJhdG9yXSgpXG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vX2l0ZXItZGVmaW5lJykoQXJyYXksICdBcnJheScsIGZ1bmN0aW9uKGl0ZXJhdGVkLCBraW5kKXtcbiAgdGhpcy5fdCA9IHRvSU9iamVjdChpdGVyYXRlZCk7IC8vIHRhcmdldFxuICB0aGlzLl9pID0gMDsgICAgICAgICAgICAgICAgICAgLy8gbmV4dCBpbmRleFxuICB0aGlzLl9rID0ga2luZDsgICAgICAgICAgICAgICAgLy8ga2luZFxuLy8gMjIuMS41LjIuMSAlQXJyYXlJdGVyYXRvclByb3RvdHlwZSUubmV4dCgpXG59LCBmdW5jdGlvbigpe1xuICB2YXIgTyAgICAgPSB0aGlzLl90XG4gICAgLCBraW5kICA9IHRoaXMuX2tcbiAgICAsIGluZGV4ID0gdGhpcy5faSsrO1xuICBpZighTyB8fCBpbmRleCA+PSBPLmxlbmd0aCl7XG4gICAgdGhpcy5fdCA9IHVuZGVmaW5lZDtcbiAgICByZXR1cm4gc3RlcCgxKTtcbiAgfVxuICBpZihraW5kID09ICdrZXlzJyAgKXJldHVybiBzdGVwKDAsIGluZGV4KTtcbiAgaWYoa2luZCA9PSAndmFsdWVzJylyZXR1cm4gc3RlcCgwLCBPW2luZGV4XSk7XG4gIHJldHVybiBzdGVwKDAsIFtpbmRleCwgT1tpbmRleF1dKTtcbn0sICd2YWx1ZXMnKTtcblxuLy8gYXJndW1lbnRzTGlzdFtAQGl0ZXJhdG9yXSBpcyAlQXJyYXlQcm90b192YWx1ZXMlICg5LjQuNC42LCA5LjQuNC43KVxuSXRlcmF0b3JzLkFyZ3VtZW50cyA9IEl0ZXJhdG9ycy5BcnJheTtcblxuYWRkVG9VbnNjb3BhYmxlcygna2V5cycpO1xuYWRkVG9VbnNjb3BhYmxlcygndmFsdWVzJyk7XG5hZGRUb1Vuc2NvcGFibGVzKCdlbnRyaWVzJyk7IiwidmFyICRpdGVyYXRvcnMgICAgPSByZXF1aXJlKCcuL2VzNi5hcnJheS5pdGVyYXRvcicpXG4gICwgcmVkZWZpbmUgICAgICA9IHJlcXVpcmUoJy4vX3JlZGVmaW5lJylcbiAgLCBnbG9iYWwgICAgICAgID0gcmVxdWlyZSgnLi9fZ2xvYmFsJylcbiAgLCBoaWRlICAgICAgICAgID0gcmVxdWlyZSgnLi9faGlkZScpXG4gICwgSXRlcmF0b3JzICAgICA9IHJlcXVpcmUoJy4vX2l0ZXJhdG9ycycpXG4gICwgd2tzICAgICAgICAgICA9IHJlcXVpcmUoJy4vX3drcycpXG4gICwgSVRFUkFUT1IgICAgICA9IHdrcygnaXRlcmF0b3InKVxuICAsIFRPX1NUUklOR19UQUcgPSB3a3MoJ3RvU3RyaW5nVGFnJylcbiAgLCBBcnJheVZhbHVlcyAgID0gSXRlcmF0b3JzLkFycmF5O1xuXG5mb3IodmFyIGNvbGxlY3Rpb25zID0gWydOb2RlTGlzdCcsICdET01Ub2tlbkxpc3QnLCAnTWVkaWFMaXN0JywgJ1N0eWxlU2hlZXRMaXN0JywgJ0NTU1J1bGVMaXN0J10sIGkgPSAwOyBpIDwgNTsgaSsrKXtcbiAgdmFyIE5BTUUgICAgICAgPSBjb2xsZWN0aW9uc1tpXVxuICAgICwgQ29sbGVjdGlvbiA9IGdsb2JhbFtOQU1FXVxuICAgICwgcHJvdG8gICAgICA9IENvbGxlY3Rpb24gJiYgQ29sbGVjdGlvbi5wcm90b3R5cGVcbiAgICAsIGtleTtcbiAgaWYocHJvdG8pe1xuICAgIGlmKCFwcm90b1tJVEVSQVRPUl0paGlkZShwcm90bywgSVRFUkFUT1IsIEFycmF5VmFsdWVzKTtcbiAgICBpZighcHJvdG9bVE9fU1RSSU5HX1RBR10paGlkZShwcm90bywgVE9fU1RSSU5HX1RBRywgTkFNRSk7XG4gICAgSXRlcmF0b3JzW05BTUVdID0gQXJyYXlWYWx1ZXM7XG4gICAgZm9yKGtleSBpbiAkaXRlcmF0b3JzKWlmKCFwcm90b1trZXldKXJlZGVmaW5lKHByb3RvLCBrZXksICRpdGVyYXRvcnNba2V5XSwgdHJ1ZSk7XG4gIH1cbn0iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0LCBDb25zdHJ1Y3RvciwgbmFtZSwgZm9yYmlkZGVuRmllbGQpe1xuICBpZighKGl0IGluc3RhbmNlb2YgQ29uc3RydWN0b3IpIHx8IChmb3JiaWRkZW5GaWVsZCAhPT0gdW5kZWZpbmVkICYmIGZvcmJpZGRlbkZpZWxkIGluIGl0KSl7XG4gICAgdGhyb3cgVHlwZUVycm9yKG5hbWUgKyAnOiBpbmNvcnJlY3QgaW52b2NhdGlvbiEnKTtcbiAgfSByZXR1cm4gaXQ7XG59OyIsIi8vIGNhbGwgc29tZXRoaW5nIG9uIGl0ZXJhdG9yIHN0ZXAgd2l0aCBzYWZlIGNsb3Npbmcgb24gZXJyb3JcbnZhciBhbk9iamVjdCA9IHJlcXVpcmUoJy4vX2FuLW9iamVjdCcpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdGVyYXRvciwgZm4sIHZhbHVlLCBlbnRyaWVzKXtcbiAgdHJ5IHtcbiAgICByZXR1cm4gZW50cmllcyA/IGZuKGFuT2JqZWN0KHZhbHVlKVswXSwgdmFsdWVbMV0pIDogZm4odmFsdWUpO1xuICAvLyA3LjQuNiBJdGVyYXRvckNsb3NlKGl0ZXJhdG9yLCBjb21wbGV0aW9uKVxuICB9IGNhdGNoKGUpe1xuICAgIHZhciByZXQgPSBpdGVyYXRvclsncmV0dXJuJ107XG4gICAgaWYocmV0ICE9PSB1bmRlZmluZWQpYW5PYmplY3QocmV0LmNhbGwoaXRlcmF0b3IpKTtcbiAgICB0aHJvdyBlO1xuICB9XG59OyIsIi8vIGNoZWNrIG9uIGRlZmF1bHQgQXJyYXkgaXRlcmF0b3JcbnZhciBJdGVyYXRvcnMgID0gcmVxdWlyZSgnLi9faXRlcmF0b3JzJylcbiAgLCBJVEVSQVRPUiAgID0gcmVxdWlyZSgnLi9fd2tzJykoJ2l0ZXJhdG9yJylcbiAgLCBBcnJheVByb3RvID0gQXJyYXkucHJvdG90eXBlO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0KXtcbiAgcmV0dXJuIGl0ICE9PSB1bmRlZmluZWQgJiYgKEl0ZXJhdG9ycy5BcnJheSA9PT0gaXQgfHwgQXJyYXlQcm90b1tJVEVSQVRPUl0gPT09IGl0KTtcbn07IiwidmFyIGNsYXNzb2YgICA9IHJlcXVpcmUoJy4vX2NsYXNzb2YnKVxuICAsIElURVJBVE9SICA9IHJlcXVpcmUoJy4vX3drcycpKCdpdGVyYXRvcicpXG4gICwgSXRlcmF0b3JzID0gcmVxdWlyZSgnLi9faXRlcmF0b3JzJyk7XG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vX2NvcmUnKS5nZXRJdGVyYXRvck1ldGhvZCA9IGZ1bmN0aW9uKGl0KXtcbiAgaWYoaXQgIT0gdW5kZWZpbmVkKXJldHVybiBpdFtJVEVSQVRPUl1cbiAgICB8fCBpdFsnQEBpdGVyYXRvciddXG4gICAgfHwgSXRlcmF0b3JzW2NsYXNzb2YoaXQpXTtcbn07IiwidmFyIGN0eCAgICAgICAgID0gcmVxdWlyZSgnLi9fY3R4JylcbiAgLCBjYWxsICAgICAgICA9IHJlcXVpcmUoJy4vX2l0ZXItY2FsbCcpXG4gICwgaXNBcnJheUl0ZXIgPSByZXF1aXJlKCcuL19pcy1hcnJheS1pdGVyJylcbiAgLCBhbk9iamVjdCAgICA9IHJlcXVpcmUoJy4vX2FuLW9iamVjdCcpXG4gICwgdG9MZW5ndGggICAgPSByZXF1aXJlKCcuL190by1sZW5ndGgnKVxuICAsIGdldEl0ZXJGbiAgID0gcmVxdWlyZSgnLi9jb3JlLmdldC1pdGVyYXRvci1tZXRob2QnKVxuICAsIEJSRUFLICAgICAgID0ge31cbiAgLCBSRVRVUk4gICAgICA9IHt9O1xudmFyIGV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0ZXJhYmxlLCBlbnRyaWVzLCBmbiwgdGhhdCwgSVRFUkFUT1Ipe1xuICB2YXIgaXRlckZuID0gSVRFUkFUT1IgPyBmdW5jdGlvbigpeyByZXR1cm4gaXRlcmFibGU7IH0gOiBnZXRJdGVyRm4oaXRlcmFibGUpXG4gICAgLCBmICAgICAgPSBjdHgoZm4sIHRoYXQsIGVudHJpZXMgPyAyIDogMSlcbiAgICAsIGluZGV4ICA9IDBcbiAgICAsIGxlbmd0aCwgc3RlcCwgaXRlcmF0b3IsIHJlc3VsdDtcbiAgaWYodHlwZW9mIGl0ZXJGbiAhPSAnZnVuY3Rpb24nKXRocm93IFR5cGVFcnJvcihpdGVyYWJsZSArICcgaXMgbm90IGl0ZXJhYmxlIScpO1xuICAvLyBmYXN0IGNhc2UgZm9yIGFycmF5cyB3aXRoIGRlZmF1bHQgaXRlcmF0b3JcbiAgaWYoaXNBcnJheUl0ZXIoaXRlckZuKSlmb3IobGVuZ3RoID0gdG9MZW5ndGgoaXRlcmFibGUubGVuZ3RoKTsgbGVuZ3RoID4gaW5kZXg7IGluZGV4Kyspe1xuICAgIHJlc3VsdCA9IGVudHJpZXMgPyBmKGFuT2JqZWN0KHN0ZXAgPSBpdGVyYWJsZVtpbmRleF0pWzBdLCBzdGVwWzFdKSA6IGYoaXRlcmFibGVbaW5kZXhdKTtcbiAgICBpZihyZXN1bHQgPT09IEJSRUFLIHx8IHJlc3VsdCA9PT0gUkVUVVJOKXJldHVybiByZXN1bHQ7XG4gIH0gZWxzZSBmb3IoaXRlcmF0b3IgPSBpdGVyRm4uY2FsbChpdGVyYWJsZSk7ICEoc3RlcCA9IGl0ZXJhdG9yLm5leHQoKSkuZG9uZTsgKXtcbiAgICByZXN1bHQgPSBjYWxsKGl0ZXJhdG9yLCBmLCBzdGVwLnZhbHVlLCBlbnRyaWVzKTtcbiAgICBpZihyZXN1bHQgPT09IEJSRUFLIHx8IHJlc3VsdCA9PT0gUkVUVVJOKXJldHVybiByZXN1bHQ7XG4gIH1cbn07XG5leHBvcnRzLkJSRUFLICA9IEJSRUFLO1xuZXhwb3J0cy5SRVRVUk4gPSBSRVRVUk47IiwiLy8gNy4zLjIwIFNwZWNpZXNDb25zdHJ1Y3RvcihPLCBkZWZhdWx0Q29uc3RydWN0b3IpXG52YXIgYW5PYmplY3QgID0gcmVxdWlyZSgnLi9fYW4tb2JqZWN0JylcbiAgLCBhRnVuY3Rpb24gPSByZXF1aXJlKCcuL19hLWZ1bmN0aW9uJylcbiAgLCBTUEVDSUVTICAgPSByZXF1aXJlKCcuL193a3MnKSgnc3BlY2llcycpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihPLCBEKXtcbiAgdmFyIEMgPSBhbk9iamVjdChPKS5jb25zdHJ1Y3RvciwgUztcbiAgcmV0dXJuIEMgPT09IHVuZGVmaW5lZCB8fCAoUyA9IGFuT2JqZWN0KEMpW1NQRUNJRVNdKSA9PSB1bmRlZmluZWQgPyBEIDogYUZ1bmN0aW9uKFMpO1xufTsiLCIvLyBmYXN0IGFwcGx5LCBodHRwOi8vanNwZXJmLmxua2l0LmNvbS9mYXN0LWFwcGx5LzVcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oZm4sIGFyZ3MsIHRoYXQpe1xuICB2YXIgdW4gPSB0aGF0ID09PSB1bmRlZmluZWQ7XG4gIHN3aXRjaChhcmdzLmxlbmd0aCl7XG4gICAgY2FzZSAwOiByZXR1cm4gdW4gPyBmbigpXG4gICAgICAgICAgICAgICAgICAgICAgOiBmbi5jYWxsKHRoYXQpO1xuICAgIGNhc2UgMTogcmV0dXJuIHVuID8gZm4oYXJnc1swXSlcbiAgICAgICAgICAgICAgICAgICAgICA6IGZuLmNhbGwodGhhdCwgYXJnc1swXSk7XG4gICAgY2FzZSAyOiByZXR1cm4gdW4gPyBmbihhcmdzWzBdLCBhcmdzWzFdKVxuICAgICAgICAgICAgICAgICAgICAgIDogZm4uY2FsbCh0aGF0LCBhcmdzWzBdLCBhcmdzWzFdKTtcbiAgICBjYXNlIDM6IHJldHVybiB1biA/IGZuKGFyZ3NbMF0sIGFyZ3NbMV0sIGFyZ3NbMl0pXG4gICAgICAgICAgICAgICAgICAgICAgOiBmbi5jYWxsKHRoYXQsIGFyZ3NbMF0sIGFyZ3NbMV0sIGFyZ3NbMl0pO1xuICAgIGNhc2UgNDogcmV0dXJuIHVuID8gZm4oYXJnc1swXSwgYXJnc1sxXSwgYXJnc1syXSwgYXJnc1szXSlcbiAgICAgICAgICAgICAgICAgICAgICA6IGZuLmNhbGwodGhhdCwgYXJnc1swXSwgYXJnc1sxXSwgYXJnc1syXSwgYXJnc1szXSk7XG4gIH0gcmV0dXJuICAgICAgICAgICAgICBmbi5hcHBseSh0aGF0LCBhcmdzKTtcbn07IiwidmFyIGN0eCAgICAgICAgICAgICAgICA9IHJlcXVpcmUoJy4vX2N0eCcpXG4gICwgaW52b2tlICAgICAgICAgICAgID0gcmVxdWlyZSgnLi9faW52b2tlJylcbiAgLCBodG1sICAgICAgICAgICAgICAgPSByZXF1aXJlKCcuL19odG1sJylcbiAgLCBjZWwgICAgICAgICAgICAgICAgPSByZXF1aXJlKCcuL19kb20tY3JlYXRlJylcbiAgLCBnbG9iYWwgICAgICAgICAgICAgPSByZXF1aXJlKCcuL19nbG9iYWwnKVxuICAsIHByb2Nlc3MgICAgICAgICAgICA9IGdsb2JhbC5wcm9jZXNzXG4gICwgc2V0VGFzayAgICAgICAgICAgID0gZ2xvYmFsLnNldEltbWVkaWF0ZVxuICAsIGNsZWFyVGFzayAgICAgICAgICA9IGdsb2JhbC5jbGVhckltbWVkaWF0ZVxuICAsIE1lc3NhZ2VDaGFubmVsICAgICA9IGdsb2JhbC5NZXNzYWdlQ2hhbm5lbFxuICAsIGNvdW50ZXIgICAgICAgICAgICA9IDBcbiAgLCBxdWV1ZSAgICAgICAgICAgICAgPSB7fVxuICAsIE9OUkVBRFlTVEFURUNIQU5HRSA9ICdvbnJlYWR5c3RhdGVjaGFuZ2UnXG4gICwgZGVmZXIsIGNoYW5uZWwsIHBvcnQ7XG52YXIgcnVuID0gZnVuY3Rpb24oKXtcbiAgdmFyIGlkID0gK3RoaXM7XG4gIGlmKHF1ZXVlLmhhc093blByb3BlcnR5KGlkKSl7XG4gICAgdmFyIGZuID0gcXVldWVbaWRdO1xuICAgIGRlbGV0ZSBxdWV1ZVtpZF07XG4gICAgZm4oKTtcbiAgfVxufTtcbnZhciBsaXN0ZW5lciA9IGZ1bmN0aW9uKGV2ZW50KXtcbiAgcnVuLmNhbGwoZXZlbnQuZGF0YSk7XG59O1xuLy8gTm9kZS5qcyAwLjkrICYgSUUxMCsgaGFzIHNldEltbWVkaWF0ZSwgb3RoZXJ3aXNlOlxuaWYoIXNldFRhc2sgfHwgIWNsZWFyVGFzayl7XG4gIHNldFRhc2sgPSBmdW5jdGlvbiBzZXRJbW1lZGlhdGUoZm4pe1xuICAgIHZhciBhcmdzID0gW10sIGkgPSAxO1xuICAgIHdoaWxlKGFyZ3VtZW50cy5sZW5ndGggPiBpKWFyZ3MucHVzaChhcmd1bWVudHNbaSsrXSk7XG4gICAgcXVldWVbKytjb3VudGVyXSA9IGZ1bmN0aW9uKCl7XG4gICAgICBpbnZva2UodHlwZW9mIGZuID09ICdmdW5jdGlvbicgPyBmbiA6IEZ1bmN0aW9uKGZuKSwgYXJncyk7XG4gICAgfTtcbiAgICBkZWZlcihjb3VudGVyKTtcbiAgICByZXR1cm4gY291bnRlcjtcbiAgfTtcbiAgY2xlYXJUYXNrID0gZnVuY3Rpb24gY2xlYXJJbW1lZGlhdGUoaWQpe1xuICAgIGRlbGV0ZSBxdWV1ZVtpZF07XG4gIH07XG4gIC8vIE5vZGUuanMgMC44LVxuICBpZihyZXF1aXJlKCcuL19jb2YnKShwcm9jZXNzKSA9PSAncHJvY2Vzcycpe1xuICAgIGRlZmVyID0gZnVuY3Rpb24oaWQpe1xuICAgICAgcHJvY2Vzcy5uZXh0VGljayhjdHgocnVuLCBpZCwgMSkpO1xuICAgIH07XG4gIC8vIEJyb3dzZXJzIHdpdGggTWVzc2FnZUNoYW5uZWwsIGluY2x1ZGVzIFdlYldvcmtlcnNcbiAgfSBlbHNlIGlmKE1lc3NhZ2VDaGFubmVsKXtcbiAgICBjaGFubmVsID0gbmV3IE1lc3NhZ2VDaGFubmVsO1xuICAgIHBvcnQgICAgPSBjaGFubmVsLnBvcnQyO1xuICAgIGNoYW5uZWwucG9ydDEub25tZXNzYWdlID0gbGlzdGVuZXI7XG4gICAgZGVmZXIgPSBjdHgocG9ydC5wb3N0TWVzc2FnZSwgcG9ydCwgMSk7XG4gIC8vIEJyb3dzZXJzIHdpdGggcG9zdE1lc3NhZ2UsIHNraXAgV2ViV29ya2Vyc1xuICAvLyBJRTggaGFzIHBvc3RNZXNzYWdlLCBidXQgaXQncyBzeW5jICYgdHlwZW9mIGl0cyBwb3N0TWVzc2FnZSBpcyAnb2JqZWN0J1xuICB9IGVsc2UgaWYoZ2xvYmFsLmFkZEV2ZW50TGlzdGVuZXIgJiYgdHlwZW9mIHBvc3RNZXNzYWdlID09ICdmdW5jdGlvbicgJiYgIWdsb2JhbC5pbXBvcnRTY3JpcHRzKXtcbiAgICBkZWZlciA9IGZ1bmN0aW9uKGlkKXtcbiAgICAgIGdsb2JhbC5wb3N0TWVzc2FnZShpZCArICcnLCAnKicpO1xuICAgIH07XG4gICAgZ2xvYmFsLmFkZEV2ZW50TGlzdGVuZXIoJ21lc3NhZ2UnLCBsaXN0ZW5lciwgZmFsc2UpO1xuICAvLyBJRTgtXG4gIH0gZWxzZSBpZihPTlJFQURZU1RBVEVDSEFOR0UgaW4gY2VsKCdzY3JpcHQnKSl7XG4gICAgZGVmZXIgPSBmdW5jdGlvbihpZCl7XG4gICAgICBodG1sLmFwcGVuZENoaWxkKGNlbCgnc2NyaXB0JykpW09OUkVBRFlTVEFURUNIQU5HRV0gPSBmdW5jdGlvbigpe1xuICAgICAgICBodG1sLnJlbW92ZUNoaWxkKHRoaXMpO1xuICAgICAgICBydW4uY2FsbChpZCk7XG4gICAgICB9O1xuICAgIH07XG4gIC8vIFJlc3Qgb2xkIGJyb3dzZXJzXG4gIH0gZWxzZSB7XG4gICAgZGVmZXIgPSBmdW5jdGlvbihpZCl7XG4gICAgICBzZXRUaW1lb3V0KGN0eChydW4sIGlkLCAxKSwgMCk7XG4gICAgfTtcbiAgfVxufVxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIHNldDogICBzZXRUYXNrLFxuICBjbGVhcjogY2xlYXJUYXNrXG59OyIsInZhciBnbG9iYWwgICAgPSByZXF1aXJlKCcuL19nbG9iYWwnKVxuICAsIG1hY3JvdGFzayA9IHJlcXVpcmUoJy4vX3Rhc2snKS5zZXRcbiAgLCBPYnNlcnZlciAgPSBnbG9iYWwuTXV0YXRpb25PYnNlcnZlciB8fCBnbG9iYWwuV2ViS2l0TXV0YXRpb25PYnNlcnZlclxuICAsIHByb2Nlc3MgICA9IGdsb2JhbC5wcm9jZXNzXG4gICwgUHJvbWlzZSAgID0gZ2xvYmFsLlByb21pc2VcbiAgLCBpc05vZGUgICAgPSByZXF1aXJlKCcuL19jb2YnKShwcm9jZXNzKSA9PSAncHJvY2Vzcyc7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oKXtcbiAgdmFyIGhlYWQsIGxhc3QsIG5vdGlmeTtcblxuICB2YXIgZmx1c2ggPSBmdW5jdGlvbigpe1xuICAgIHZhciBwYXJlbnQsIGZuO1xuICAgIGlmKGlzTm9kZSAmJiAocGFyZW50ID0gcHJvY2Vzcy5kb21haW4pKXBhcmVudC5leGl0KCk7XG4gICAgd2hpbGUoaGVhZCl7XG4gICAgICBmbiAgID0gaGVhZC5mbjtcbiAgICAgIGhlYWQgPSBoZWFkLm5leHQ7XG4gICAgICB0cnkge1xuICAgICAgICBmbigpO1xuICAgICAgfSBjYXRjaChlKXtcbiAgICAgICAgaWYoaGVhZClub3RpZnkoKTtcbiAgICAgICAgZWxzZSBsYXN0ID0gdW5kZWZpbmVkO1xuICAgICAgICB0aHJvdyBlO1xuICAgICAgfVxuICAgIH0gbGFzdCA9IHVuZGVmaW5lZDtcbiAgICBpZihwYXJlbnQpcGFyZW50LmVudGVyKCk7XG4gIH07XG5cbiAgLy8gTm9kZS5qc1xuICBpZihpc05vZGUpe1xuICAgIG5vdGlmeSA9IGZ1bmN0aW9uKCl7XG4gICAgICBwcm9jZXNzLm5leHRUaWNrKGZsdXNoKTtcbiAgICB9O1xuICAvLyBicm93c2VycyB3aXRoIE11dGF0aW9uT2JzZXJ2ZXJcbiAgfSBlbHNlIGlmKE9ic2VydmVyKXtcbiAgICB2YXIgdG9nZ2xlID0gdHJ1ZVxuICAgICAgLCBub2RlICAgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZSgnJyk7XG4gICAgbmV3IE9ic2VydmVyKGZsdXNoKS5vYnNlcnZlKG5vZGUsIHtjaGFyYWN0ZXJEYXRhOiB0cnVlfSk7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tbmV3XG4gICAgbm90aWZ5ID0gZnVuY3Rpb24oKXtcbiAgICAgIG5vZGUuZGF0YSA9IHRvZ2dsZSA9ICF0b2dnbGU7XG4gICAgfTtcbiAgLy8gZW52aXJvbm1lbnRzIHdpdGggbWF5YmUgbm9uLWNvbXBsZXRlbHkgY29ycmVjdCwgYnV0IGV4aXN0ZW50IFByb21pc2VcbiAgfSBlbHNlIGlmKFByb21pc2UgJiYgUHJvbWlzZS5yZXNvbHZlKXtcbiAgICB2YXIgcHJvbWlzZSA9IFByb21pc2UucmVzb2x2ZSgpO1xuICAgIG5vdGlmeSA9IGZ1bmN0aW9uKCl7XG4gICAgICBwcm9taXNlLnRoZW4oZmx1c2gpO1xuICAgIH07XG4gIC8vIGZvciBvdGhlciBlbnZpcm9ubWVudHMgLSBtYWNyb3Rhc2sgYmFzZWQgb246XG4gIC8vIC0gc2V0SW1tZWRpYXRlXG4gIC8vIC0gTWVzc2FnZUNoYW5uZWxcbiAgLy8gLSB3aW5kb3cucG9zdE1lc3NhZ1xuICAvLyAtIG9ucmVhZHlzdGF0ZWNoYW5nZVxuICAvLyAtIHNldFRpbWVvdXRcbiAgfSBlbHNlIHtcbiAgICBub3RpZnkgPSBmdW5jdGlvbigpe1xuICAgICAgLy8gc3RyYW5nZSBJRSArIHdlYnBhY2sgZGV2IHNlcnZlciBidWcgLSB1c2UgLmNhbGwoZ2xvYmFsKVxuICAgICAgbWFjcm90YXNrLmNhbGwoZ2xvYmFsLCBmbHVzaCk7XG4gICAgfTtcbiAgfVxuXG4gIHJldHVybiBmdW5jdGlvbihmbil7XG4gICAgdmFyIHRhc2sgPSB7Zm46IGZuLCBuZXh0OiB1bmRlZmluZWR9O1xuICAgIGlmKGxhc3QpbGFzdC5uZXh0ID0gdGFzaztcbiAgICBpZighaGVhZCl7XG4gICAgICBoZWFkID0gdGFzaztcbiAgICAgIG5vdGlmeSgpO1xuICAgIH0gbGFzdCA9IHRhc2s7XG4gIH07XG59OyIsInZhciByZWRlZmluZSA9IHJlcXVpcmUoJy4vX3JlZGVmaW5lJyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKHRhcmdldCwgc3JjLCBzYWZlKXtcbiAgZm9yKHZhciBrZXkgaW4gc3JjKXJlZGVmaW5lKHRhcmdldCwga2V5LCBzcmNba2V5XSwgc2FmZSk7XG4gIHJldHVybiB0YXJnZXQ7XG59OyIsIid1c2Ugc3RyaWN0JztcbnZhciBnbG9iYWwgICAgICA9IHJlcXVpcmUoJy4vX2dsb2JhbCcpXG4gICwgZFAgICAgICAgICAgPSByZXF1aXJlKCcuL19vYmplY3QtZHAnKVxuICAsIERFU0NSSVBUT1JTID0gcmVxdWlyZSgnLi9fZGVzY3JpcHRvcnMnKVxuICAsIFNQRUNJRVMgICAgID0gcmVxdWlyZSgnLi9fd2tzJykoJ3NwZWNpZXMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihLRVkpe1xuICB2YXIgQyA9IGdsb2JhbFtLRVldO1xuICBpZihERVNDUklQVE9SUyAmJiBDICYmICFDW1NQRUNJRVNdKWRQLmYoQywgU1BFQ0lFUywge1xuICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICBnZXQ6IGZ1bmN0aW9uKCl7IHJldHVybiB0aGlzOyB9XG4gIH0pO1xufTsiLCJ2YXIgSVRFUkFUT1IgICAgID0gcmVxdWlyZSgnLi9fd2tzJykoJ2l0ZXJhdG9yJylcbiAgLCBTQUZFX0NMT1NJTkcgPSBmYWxzZTtcblxudHJ5IHtcbiAgdmFyIHJpdGVyID0gWzddW0lURVJBVE9SXSgpO1xuICByaXRlclsncmV0dXJuJ10gPSBmdW5jdGlvbigpeyBTQUZFX0NMT1NJTkcgPSB0cnVlOyB9O1xuICBBcnJheS5mcm9tKHJpdGVyLCBmdW5jdGlvbigpeyB0aHJvdyAyOyB9KTtcbn0gY2F0Y2goZSl7IC8qIGVtcHR5ICovIH1cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihleGVjLCBza2lwQ2xvc2luZyl7XG4gIGlmKCFza2lwQ2xvc2luZyAmJiAhU0FGRV9DTE9TSU5HKXJldHVybiBmYWxzZTtcbiAgdmFyIHNhZmUgPSBmYWxzZTtcbiAgdHJ5IHtcbiAgICB2YXIgYXJyICA9IFs3XVxuICAgICAgLCBpdGVyID0gYXJyW0lURVJBVE9SXSgpO1xuICAgIGl0ZXIubmV4dCA9IGZ1bmN0aW9uKCl7IHJldHVybiB7ZG9uZTogc2FmZSA9IHRydWV9OyB9O1xuICAgIGFycltJVEVSQVRPUl0gPSBmdW5jdGlvbigpeyByZXR1cm4gaXRlcjsgfTtcbiAgICBleGVjKGFycik7XG4gIH0gY2F0Y2goZSl7IC8qIGVtcHR5ICovIH1cbiAgcmV0dXJuIHNhZmU7XG59OyIsIid1c2Ugc3RyaWN0JztcbnZhciBMSUJSQVJZICAgICAgICAgICAgPSByZXF1aXJlKCcuL19saWJyYXJ5JylcbiAgLCBnbG9iYWwgICAgICAgICAgICAgPSByZXF1aXJlKCcuL19nbG9iYWwnKVxuICAsIGN0eCAgICAgICAgICAgICAgICA9IHJlcXVpcmUoJy4vX2N0eCcpXG4gICwgY2xhc3NvZiAgICAgICAgICAgID0gcmVxdWlyZSgnLi9fY2xhc3NvZicpXG4gICwgJGV4cG9ydCAgICAgICAgICAgID0gcmVxdWlyZSgnLi9fZXhwb3J0JylcbiAgLCBpc09iamVjdCAgICAgICAgICAgPSByZXF1aXJlKCcuL19pcy1vYmplY3QnKVxuICAsIGFGdW5jdGlvbiAgICAgICAgICA9IHJlcXVpcmUoJy4vX2EtZnVuY3Rpb24nKVxuICAsIGFuSW5zdGFuY2UgICAgICAgICA9IHJlcXVpcmUoJy4vX2FuLWluc3RhbmNlJylcbiAgLCBmb3JPZiAgICAgICAgICAgICAgPSByZXF1aXJlKCcuL19mb3Itb2YnKVxuICAsIHNwZWNpZXNDb25zdHJ1Y3RvciA9IHJlcXVpcmUoJy4vX3NwZWNpZXMtY29uc3RydWN0b3InKVxuICAsIHRhc2sgICAgICAgICAgICAgICA9IHJlcXVpcmUoJy4vX3Rhc2snKS5zZXRcbiAgLCBtaWNyb3Rhc2sgICAgICAgICAgPSByZXF1aXJlKCcuL19taWNyb3Rhc2snKSgpXG4gICwgUFJPTUlTRSAgICAgICAgICAgID0gJ1Byb21pc2UnXG4gICwgVHlwZUVycm9yICAgICAgICAgID0gZ2xvYmFsLlR5cGVFcnJvclxuICAsIHByb2Nlc3MgICAgICAgICAgICA9IGdsb2JhbC5wcm9jZXNzXG4gICwgJFByb21pc2UgICAgICAgICAgID0gZ2xvYmFsW1BST01JU0VdXG4gICwgcHJvY2VzcyAgICAgICAgICAgID0gZ2xvYmFsLnByb2Nlc3NcbiAgLCBpc05vZGUgICAgICAgICAgICAgPSBjbGFzc29mKHByb2Nlc3MpID09ICdwcm9jZXNzJ1xuICAsIGVtcHR5ICAgICAgICAgICAgICA9IGZ1bmN0aW9uKCl7IC8qIGVtcHR5ICovIH1cbiAgLCBJbnRlcm5hbCwgR2VuZXJpY1Byb21pc2VDYXBhYmlsaXR5LCBXcmFwcGVyO1xuXG52YXIgVVNFX05BVElWRSA9ICEhZnVuY3Rpb24oKXtcbiAgdHJ5IHtcbiAgICAvLyBjb3JyZWN0IHN1YmNsYXNzaW5nIHdpdGggQEBzcGVjaWVzIHN1cHBvcnRcbiAgICB2YXIgcHJvbWlzZSAgICAgPSAkUHJvbWlzZS5yZXNvbHZlKDEpXG4gICAgICAsIEZha2VQcm9taXNlID0gKHByb21pc2UuY29uc3RydWN0b3IgPSB7fSlbcmVxdWlyZSgnLi9fd2tzJykoJ3NwZWNpZXMnKV0gPSBmdW5jdGlvbihleGVjKXsgZXhlYyhlbXB0eSwgZW1wdHkpOyB9O1xuICAgIC8vIHVuaGFuZGxlZCByZWplY3Rpb25zIHRyYWNraW5nIHN1cHBvcnQsIE5vZGVKUyBQcm9taXNlIHdpdGhvdXQgaXQgZmFpbHMgQEBzcGVjaWVzIHRlc3RcbiAgICByZXR1cm4gKGlzTm9kZSB8fCB0eXBlb2YgUHJvbWlzZVJlamVjdGlvbkV2ZW50ID09ICdmdW5jdGlvbicpICYmIHByb21pc2UudGhlbihlbXB0eSkgaW5zdGFuY2VvZiBGYWtlUHJvbWlzZTtcbiAgfSBjYXRjaChlKXsgLyogZW1wdHkgKi8gfVxufSgpO1xuXG4vLyBoZWxwZXJzXG52YXIgc2FtZUNvbnN0cnVjdG9yID0gZnVuY3Rpb24oYSwgYil7XG4gIC8vIHdpdGggbGlicmFyeSB3cmFwcGVyIHNwZWNpYWwgY2FzZVxuICByZXR1cm4gYSA9PT0gYiB8fCBhID09PSAkUHJvbWlzZSAmJiBiID09PSBXcmFwcGVyO1xufTtcbnZhciBpc1RoZW5hYmxlID0gZnVuY3Rpb24oaXQpe1xuICB2YXIgdGhlbjtcbiAgcmV0dXJuIGlzT2JqZWN0KGl0KSAmJiB0eXBlb2YgKHRoZW4gPSBpdC50aGVuKSA9PSAnZnVuY3Rpb24nID8gdGhlbiA6IGZhbHNlO1xufTtcbnZhciBuZXdQcm9taXNlQ2FwYWJpbGl0eSA9IGZ1bmN0aW9uKEMpe1xuICByZXR1cm4gc2FtZUNvbnN0cnVjdG9yKCRQcm9taXNlLCBDKVxuICAgID8gbmV3IFByb21pc2VDYXBhYmlsaXR5KEMpXG4gICAgOiBuZXcgR2VuZXJpY1Byb21pc2VDYXBhYmlsaXR5KEMpO1xufTtcbnZhciBQcm9taXNlQ2FwYWJpbGl0eSA9IEdlbmVyaWNQcm9taXNlQ2FwYWJpbGl0eSA9IGZ1bmN0aW9uKEMpe1xuICB2YXIgcmVzb2x2ZSwgcmVqZWN0O1xuICB0aGlzLnByb21pc2UgPSBuZXcgQyhmdW5jdGlvbigkJHJlc29sdmUsICQkcmVqZWN0KXtcbiAgICBpZihyZXNvbHZlICE9PSB1bmRlZmluZWQgfHwgcmVqZWN0ICE9PSB1bmRlZmluZWQpdGhyb3cgVHlwZUVycm9yKCdCYWQgUHJvbWlzZSBjb25zdHJ1Y3RvcicpO1xuICAgIHJlc29sdmUgPSAkJHJlc29sdmU7XG4gICAgcmVqZWN0ICA9ICQkcmVqZWN0O1xuICB9KTtcbiAgdGhpcy5yZXNvbHZlID0gYUZ1bmN0aW9uKHJlc29sdmUpO1xuICB0aGlzLnJlamVjdCAgPSBhRnVuY3Rpb24ocmVqZWN0KTtcbn07XG52YXIgcGVyZm9ybSA9IGZ1bmN0aW9uKGV4ZWMpe1xuICB0cnkge1xuICAgIGV4ZWMoKTtcbiAgfSBjYXRjaChlKXtcbiAgICByZXR1cm4ge2Vycm9yOiBlfTtcbiAgfVxufTtcbnZhciBub3RpZnkgPSBmdW5jdGlvbihwcm9taXNlLCBpc1JlamVjdCl7XG4gIGlmKHByb21pc2UuX24pcmV0dXJuO1xuICBwcm9taXNlLl9uID0gdHJ1ZTtcbiAgdmFyIGNoYWluID0gcHJvbWlzZS5fYztcbiAgbWljcm90YXNrKGZ1bmN0aW9uKCl7XG4gICAgdmFyIHZhbHVlID0gcHJvbWlzZS5fdlxuICAgICAgLCBvayAgICA9IHByb21pc2UuX3MgPT0gMVxuICAgICAgLCBpICAgICA9IDA7XG4gICAgdmFyIHJ1biA9IGZ1bmN0aW9uKHJlYWN0aW9uKXtcbiAgICAgIHZhciBoYW5kbGVyID0gb2sgPyByZWFjdGlvbi5vayA6IHJlYWN0aW9uLmZhaWxcbiAgICAgICAgLCByZXNvbHZlID0gcmVhY3Rpb24ucmVzb2x2ZVxuICAgICAgICAsIHJlamVjdCAgPSByZWFjdGlvbi5yZWplY3RcbiAgICAgICAgLCBkb21haW4gID0gcmVhY3Rpb24uZG9tYWluXG4gICAgICAgICwgcmVzdWx0LCB0aGVuO1xuICAgICAgdHJ5IHtcbiAgICAgICAgaWYoaGFuZGxlcil7XG4gICAgICAgICAgaWYoIW9rKXtcbiAgICAgICAgICAgIGlmKHByb21pc2UuX2ggPT0gMilvbkhhbmRsZVVuaGFuZGxlZChwcm9taXNlKTtcbiAgICAgICAgICAgIHByb21pc2UuX2ggPSAxO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZihoYW5kbGVyID09PSB0cnVlKXJlc3VsdCA9IHZhbHVlO1xuICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgaWYoZG9tYWluKWRvbWFpbi5lbnRlcigpO1xuICAgICAgICAgICAgcmVzdWx0ID0gaGFuZGxlcih2YWx1ZSk7XG4gICAgICAgICAgICBpZihkb21haW4pZG9tYWluLmV4aXQoKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYocmVzdWx0ID09PSByZWFjdGlvbi5wcm9taXNlKXtcbiAgICAgICAgICAgIHJlamVjdChUeXBlRXJyb3IoJ1Byb21pc2UtY2hhaW4gY3ljbGUnKSk7XG4gICAgICAgICAgfSBlbHNlIGlmKHRoZW4gPSBpc1RoZW5hYmxlKHJlc3VsdCkpe1xuICAgICAgICAgICAgdGhlbi5jYWxsKHJlc3VsdCwgcmVzb2x2ZSwgcmVqZWN0KTtcbiAgICAgICAgICB9IGVsc2UgcmVzb2x2ZShyZXN1bHQpO1xuICAgICAgICB9IGVsc2UgcmVqZWN0KHZhbHVlKTtcbiAgICAgIH0gY2F0Y2goZSl7XG4gICAgICAgIHJlamVjdChlKTtcbiAgICAgIH1cbiAgICB9O1xuICAgIHdoaWxlKGNoYWluLmxlbmd0aCA+IGkpcnVuKGNoYWluW2krK10pOyAvLyB2YXJpYWJsZSBsZW5ndGggLSBjYW4ndCB1c2UgZm9yRWFjaFxuICAgIHByb21pc2UuX2MgPSBbXTtcbiAgICBwcm9taXNlLl9uID0gZmFsc2U7XG4gICAgaWYoaXNSZWplY3QgJiYgIXByb21pc2UuX2gpb25VbmhhbmRsZWQocHJvbWlzZSk7XG4gIH0pO1xufTtcbnZhciBvblVuaGFuZGxlZCA9IGZ1bmN0aW9uKHByb21pc2Upe1xuICB0YXNrLmNhbGwoZ2xvYmFsLCBmdW5jdGlvbigpe1xuICAgIHZhciB2YWx1ZSA9IHByb21pc2UuX3ZcbiAgICAgICwgYWJydXB0LCBoYW5kbGVyLCBjb25zb2xlO1xuICAgIGlmKGlzVW5oYW5kbGVkKHByb21pc2UpKXtcbiAgICAgIGFicnVwdCA9IHBlcmZvcm0oZnVuY3Rpb24oKXtcbiAgICAgICAgaWYoaXNOb2RlKXtcbiAgICAgICAgICBwcm9jZXNzLmVtaXQoJ3VuaGFuZGxlZFJlamVjdGlvbicsIHZhbHVlLCBwcm9taXNlKTtcbiAgICAgICAgfSBlbHNlIGlmKGhhbmRsZXIgPSBnbG9iYWwub251bmhhbmRsZWRyZWplY3Rpb24pe1xuICAgICAgICAgIGhhbmRsZXIoe3Byb21pc2U6IHByb21pc2UsIHJlYXNvbjogdmFsdWV9KTtcbiAgICAgICAgfSBlbHNlIGlmKChjb25zb2xlID0gZ2xvYmFsLmNvbnNvbGUpICYmIGNvbnNvbGUuZXJyb3Ipe1xuICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ1VuaGFuZGxlZCBwcm9taXNlIHJlamVjdGlvbicsIHZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICAvLyBCcm93c2VycyBzaG91bGQgbm90IHRyaWdnZXIgYHJlamVjdGlvbkhhbmRsZWRgIGV2ZW50IGlmIGl0IHdhcyBoYW5kbGVkIGhlcmUsIE5vZGVKUyAtIHNob3VsZFxuICAgICAgcHJvbWlzZS5faCA9IGlzTm9kZSB8fCBpc1VuaGFuZGxlZChwcm9taXNlKSA/IDIgOiAxO1xuICAgIH0gcHJvbWlzZS5fYSA9IHVuZGVmaW5lZDtcbiAgICBpZihhYnJ1cHQpdGhyb3cgYWJydXB0LmVycm9yO1xuICB9KTtcbn07XG52YXIgaXNVbmhhbmRsZWQgPSBmdW5jdGlvbihwcm9taXNlKXtcbiAgaWYocHJvbWlzZS5faCA9PSAxKXJldHVybiBmYWxzZTtcbiAgdmFyIGNoYWluID0gcHJvbWlzZS5fYSB8fCBwcm9taXNlLl9jXG4gICAgLCBpICAgICA9IDBcbiAgICAsIHJlYWN0aW9uO1xuICB3aGlsZShjaGFpbi5sZW5ndGggPiBpKXtcbiAgICByZWFjdGlvbiA9IGNoYWluW2krK107XG4gICAgaWYocmVhY3Rpb24uZmFpbCB8fCAhaXNVbmhhbmRsZWQocmVhY3Rpb24ucHJvbWlzZSkpcmV0dXJuIGZhbHNlO1xuICB9IHJldHVybiB0cnVlO1xufTtcbnZhciBvbkhhbmRsZVVuaGFuZGxlZCA9IGZ1bmN0aW9uKHByb21pc2Upe1xuICB0YXNrLmNhbGwoZ2xvYmFsLCBmdW5jdGlvbigpe1xuICAgIHZhciBoYW5kbGVyO1xuICAgIGlmKGlzTm9kZSl7XG4gICAgICBwcm9jZXNzLmVtaXQoJ3JlamVjdGlvbkhhbmRsZWQnLCBwcm9taXNlKTtcbiAgICB9IGVsc2UgaWYoaGFuZGxlciA9IGdsb2JhbC5vbnJlamVjdGlvbmhhbmRsZWQpe1xuICAgICAgaGFuZGxlcih7cHJvbWlzZTogcHJvbWlzZSwgcmVhc29uOiBwcm9taXNlLl92fSk7XG4gICAgfVxuICB9KTtcbn07XG52YXIgJHJlamVjdCA9IGZ1bmN0aW9uKHZhbHVlKXtcbiAgdmFyIHByb21pc2UgPSB0aGlzO1xuICBpZihwcm9taXNlLl9kKXJldHVybjtcbiAgcHJvbWlzZS5fZCA9IHRydWU7XG4gIHByb21pc2UgPSBwcm9taXNlLl93IHx8IHByb21pc2U7IC8vIHVud3JhcFxuICBwcm9taXNlLl92ID0gdmFsdWU7XG4gIHByb21pc2UuX3MgPSAyO1xuICBpZighcHJvbWlzZS5fYSlwcm9taXNlLl9hID0gcHJvbWlzZS5fYy5zbGljZSgpO1xuICBub3RpZnkocHJvbWlzZSwgdHJ1ZSk7XG59O1xudmFyICRyZXNvbHZlID0gZnVuY3Rpb24odmFsdWUpe1xuICB2YXIgcHJvbWlzZSA9IHRoaXNcbiAgICAsIHRoZW47XG4gIGlmKHByb21pc2UuX2QpcmV0dXJuO1xuICBwcm9taXNlLl9kID0gdHJ1ZTtcbiAgcHJvbWlzZSA9IHByb21pc2UuX3cgfHwgcHJvbWlzZTsgLy8gdW53cmFwXG4gIHRyeSB7XG4gICAgaWYocHJvbWlzZSA9PT0gdmFsdWUpdGhyb3cgVHlwZUVycm9yKFwiUHJvbWlzZSBjYW4ndCBiZSByZXNvbHZlZCBpdHNlbGZcIik7XG4gICAgaWYodGhlbiA9IGlzVGhlbmFibGUodmFsdWUpKXtcbiAgICAgIG1pY3JvdGFzayhmdW5jdGlvbigpe1xuICAgICAgICB2YXIgd3JhcHBlciA9IHtfdzogcHJvbWlzZSwgX2Q6IGZhbHNlfTsgLy8gd3JhcFxuICAgICAgICB0cnkge1xuICAgICAgICAgIHRoZW4uY2FsbCh2YWx1ZSwgY3R4KCRyZXNvbHZlLCB3cmFwcGVyLCAxKSwgY3R4KCRyZWplY3QsIHdyYXBwZXIsIDEpKTtcbiAgICAgICAgfSBjYXRjaChlKXtcbiAgICAgICAgICAkcmVqZWN0LmNhbGwod3JhcHBlciwgZSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICBwcm9taXNlLl92ID0gdmFsdWU7XG4gICAgICBwcm9taXNlLl9zID0gMTtcbiAgICAgIG5vdGlmeShwcm9taXNlLCBmYWxzZSk7XG4gICAgfVxuICB9IGNhdGNoKGUpe1xuICAgICRyZWplY3QuY2FsbCh7X3c6IHByb21pc2UsIF9kOiBmYWxzZX0sIGUpOyAvLyB3cmFwXG4gIH1cbn07XG5cbi8vIGNvbnN0cnVjdG9yIHBvbHlmaWxsXG5pZighVVNFX05BVElWRSl7XG4gIC8vIDI1LjQuMy4xIFByb21pc2UoZXhlY3V0b3IpXG4gICRQcm9taXNlID0gZnVuY3Rpb24gUHJvbWlzZShleGVjdXRvcil7XG4gICAgYW5JbnN0YW5jZSh0aGlzLCAkUHJvbWlzZSwgUFJPTUlTRSwgJ19oJyk7XG4gICAgYUZ1bmN0aW9uKGV4ZWN1dG9yKTtcbiAgICBJbnRlcm5hbC5jYWxsKHRoaXMpO1xuICAgIHRyeSB7XG4gICAgICBleGVjdXRvcihjdHgoJHJlc29sdmUsIHRoaXMsIDEpLCBjdHgoJHJlamVjdCwgdGhpcywgMSkpO1xuICAgIH0gY2F0Y2goZXJyKXtcbiAgICAgICRyZWplY3QuY2FsbCh0aGlzLCBlcnIpO1xuICAgIH1cbiAgfTtcbiAgSW50ZXJuYWwgPSBmdW5jdGlvbiBQcm9taXNlKGV4ZWN1dG9yKXtcbiAgICB0aGlzLl9jID0gW107ICAgICAgICAgICAgIC8vIDwtIGF3YWl0aW5nIHJlYWN0aW9uc1xuICAgIHRoaXMuX2EgPSB1bmRlZmluZWQ7ICAgICAgLy8gPC0gY2hlY2tlZCBpbiBpc1VuaGFuZGxlZCByZWFjdGlvbnNcbiAgICB0aGlzLl9zID0gMDsgICAgICAgICAgICAgIC8vIDwtIHN0YXRlXG4gICAgdGhpcy5fZCA9IGZhbHNlOyAgICAgICAgICAvLyA8LSBkb25lXG4gICAgdGhpcy5fdiA9IHVuZGVmaW5lZDsgICAgICAvLyA8LSB2YWx1ZVxuICAgIHRoaXMuX2ggPSAwOyAgICAgICAgICAgICAgLy8gPC0gcmVqZWN0aW9uIHN0YXRlLCAwIC0gZGVmYXVsdCwgMSAtIGhhbmRsZWQsIDIgLSB1bmhhbmRsZWRcbiAgICB0aGlzLl9uID0gZmFsc2U7ICAgICAgICAgIC8vIDwtIG5vdGlmeVxuICB9O1xuICBJbnRlcm5hbC5wcm90b3R5cGUgPSByZXF1aXJlKCcuL19yZWRlZmluZS1hbGwnKSgkUHJvbWlzZS5wcm90b3R5cGUsIHtcbiAgICAvLyAyNS40LjUuMyBQcm9taXNlLnByb3RvdHlwZS50aGVuKG9uRnVsZmlsbGVkLCBvblJlamVjdGVkKVxuICAgIHRoZW46IGZ1bmN0aW9uIHRoZW4ob25GdWxmaWxsZWQsIG9uUmVqZWN0ZWQpe1xuICAgICAgdmFyIHJlYWN0aW9uICAgID0gbmV3UHJvbWlzZUNhcGFiaWxpdHkoc3BlY2llc0NvbnN0cnVjdG9yKHRoaXMsICRQcm9taXNlKSk7XG4gICAgICByZWFjdGlvbi5vayAgICAgPSB0eXBlb2Ygb25GdWxmaWxsZWQgPT0gJ2Z1bmN0aW9uJyA/IG9uRnVsZmlsbGVkIDogdHJ1ZTtcbiAgICAgIHJlYWN0aW9uLmZhaWwgICA9IHR5cGVvZiBvblJlamVjdGVkID09ICdmdW5jdGlvbicgJiYgb25SZWplY3RlZDtcbiAgICAgIHJlYWN0aW9uLmRvbWFpbiA9IGlzTm9kZSA/IHByb2Nlc3MuZG9tYWluIDogdW5kZWZpbmVkO1xuICAgICAgdGhpcy5fYy5wdXNoKHJlYWN0aW9uKTtcbiAgICAgIGlmKHRoaXMuX2EpdGhpcy5fYS5wdXNoKHJlYWN0aW9uKTtcbiAgICAgIGlmKHRoaXMuX3Mpbm90aWZ5KHRoaXMsIGZhbHNlKTtcbiAgICAgIHJldHVybiByZWFjdGlvbi5wcm9taXNlO1xuICAgIH0sXG4gICAgLy8gMjUuNC41LjEgUHJvbWlzZS5wcm90b3R5cGUuY2F0Y2gob25SZWplY3RlZClcbiAgICAnY2F0Y2gnOiBmdW5jdGlvbihvblJlamVjdGVkKXtcbiAgICAgIHJldHVybiB0aGlzLnRoZW4odW5kZWZpbmVkLCBvblJlamVjdGVkKTtcbiAgICB9XG4gIH0pO1xuICBQcm9taXNlQ2FwYWJpbGl0eSA9IGZ1bmN0aW9uKCl7XG4gICAgdmFyIHByb21pc2UgID0gbmV3IEludGVybmFsO1xuICAgIHRoaXMucHJvbWlzZSA9IHByb21pc2U7XG4gICAgdGhpcy5yZXNvbHZlID0gY3R4KCRyZXNvbHZlLCBwcm9taXNlLCAxKTtcbiAgICB0aGlzLnJlamVjdCAgPSBjdHgoJHJlamVjdCwgcHJvbWlzZSwgMSk7XG4gIH07XG59XG5cbiRleHBvcnQoJGV4cG9ydC5HICsgJGV4cG9ydC5XICsgJGV4cG9ydC5GICogIVVTRV9OQVRJVkUsIHtQcm9taXNlOiAkUHJvbWlzZX0pO1xucmVxdWlyZSgnLi9fc2V0LXRvLXN0cmluZy10YWcnKSgkUHJvbWlzZSwgUFJPTUlTRSk7XG5yZXF1aXJlKCcuL19zZXQtc3BlY2llcycpKFBST01JU0UpO1xuV3JhcHBlciA9IHJlcXVpcmUoJy4vX2NvcmUnKVtQUk9NSVNFXTtcblxuLy8gc3RhdGljc1xuJGV4cG9ydCgkZXhwb3J0LlMgKyAkZXhwb3J0LkYgKiAhVVNFX05BVElWRSwgUFJPTUlTRSwge1xuICAvLyAyNS40LjQuNSBQcm9taXNlLnJlamVjdChyKVxuICByZWplY3Q6IGZ1bmN0aW9uIHJlamVjdChyKXtcbiAgICB2YXIgY2FwYWJpbGl0eSA9IG5ld1Byb21pc2VDYXBhYmlsaXR5KHRoaXMpXG4gICAgICAsICQkcmVqZWN0ICAgPSBjYXBhYmlsaXR5LnJlamVjdDtcbiAgICAkJHJlamVjdChyKTtcbiAgICByZXR1cm4gY2FwYWJpbGl0eS5wcm9taXNlO1xuICB9XG59KTtcbiRleHBvcnQoJGV4cG9ydC5TICsgJGV4cG9ydC5GICogKExJQlJBUlkgfHwgIVVTRV9OQVRJVkUpLCBQUk9NSVNFLCB7XG4gIC8vIDI1LjQuNC42IFByb21pc2UucmVzb2x2ZSh4KVxuICByZXNvbHZlOiBmdW5jdGlvbiByZXNvbHZlKHgpe1xuICAgIC8vIGluc3RhbmNlb2YgaW5zdGVhZCBvZiBpbnRlcm5hbCBzbG90IGNoZWNrIGJlY2F1c2Ugd2Ugc2hvdWxkIGZpeCBpdCB3aXRob3V0IHJlcGxhY2VtZW50IG5hdGl2ZSBQcm9taXNlIGNvcmVcbiAgICBpZih4IGluc3RhbmNlb2YgJFByb21pc2UgJiYgc2FtZUNvbnN0cnVjdG9yKHguY29uc3RydWN0b3IsIHRoaXMpKXJldHVybiB4O1xuICAgIHZhciBjYXBhYmlsaXR5ID0gbmV3UHJvbWlzZUNhcGFiaWxpdHkodGhpcylcbiAgICAgICwgJCRyZXNvbHZlICA9IGNhcGFiaWxpdHkucmVzb2x2ZTtcbiAgICAkJHJlc29sdmUoeCk7XG4gICAgcmV0dXJuIGNhcGFiaWxpdHkucHJvbWlzZTtcbiAgfVxufSk7XG4kZXhwb3J0KCRleHBvcnQuUyArICRleHBvcnQuRiAqICEoVVNFX05BVElWRSAmJiByZXF1aXJlKCcuL19pdGVyLWRldGVjdCcpKGZ1bmN0aW9uKGl0ZXIpe1xuICAkUHJvbWlzZS5hbGwoaXRlcilbJ2NhdGNoJ10oZW1wdHkpO1xufSkpLCBQUk9NSVNFLCB7XG4gIC8vIDI1LjQuNC4xIFByb21pc2UuYWxsKGl0ZXJhYmxlKVxuICBhbGw6IGZ1bmN0aW9uIGFsbChpdGVyYWJsZSl7XG4gICAgdmFyIEMgICAgICAgICAgPSB0aGlzXG4gICAgICAsIGNhcGFiaWxpdHkgPSBuZXdQcm9taXNlQ2FwYWJpbGl0eShDKVxuICAgICAgLCByZXNvbHZlICAgID0gY2FwYWJpbGl0eS5yZXNvbHZlXG4gICAgICAsIHJlamVjdCAgICAgPSBjYXBhYmlsaXR5LnJlamVjdDtcbiAgICB2YXIgYWJydXB0ID0gcGVyZm9ybShmdW5jdGlvbigpe1xuICAgICAgdmFyIHZhbHVlcyAgICA9IFtdXG4gICAgICAgICwgaW5kZXggICAgID0gMFxuICAgICAgICAsIHJlbWFpbmluZyA9IDE7XG4gICAgICBmb3JPZihpdGVyYWJsZSwgZmFsc2UsIGZ1bmN0aW9uKHByb21pc2Upe1xuICAgICAgICB2YXIgJGluZGV4ICAgICAgICA9IGluZGV4KytcbiAgICAgICAgICAsIGFscmVhZHlDYWxsZWQgPSBmYWxzZTtcbiAgICAgICAgdmFsdWVzLnB1c2godW5kZWZpbmVkKTtcbiAgICAgICAgcmVtYWluaW5nKys7XG4gICAgICAgIEMucmVzb2x2ZShwcm9taXNlKS50aGVuKGZ1bmN0aW9uKHZhbHVlKXtcbiAgICAgICAgICBpZihhbHJlYWR5Q2FsbGVkKXJldHVybjtcbiAgICAgICAgICBhbHJlYWR5Q2FsbGVkICA9IHRydWU7XG4gICAgICAgICAgdmFsdWVzWyRpbmRleF0gPSB2YWx1ZTtcbiAgICAgICAgICAtLXJlbWFpbmluZyB8fCByZXNvbHZlKHZhbHVlcyk7XG4gICAgICAgIH0sIHJlamVjdCk7XG4gICAgICB9KTtcbiAgICAgIC0tcmVtYWluaW5nIHx8IHJlc29sdmUodmFsdWVzKTtcbiAgICB9KTtcbiAgICBpZihhYnJ1cHQpcmVqZWN0KGFicnVwdC5lcnJvcik7XG4gICAgcmV0dXJuIGNhcGFiaWxpdHkucHJvbWlzZTtcbiAgfSxcbiAgLy8gMjUuNC40LjQgUHJvbWlzZS5yYWNlKGl0ZXJhYmxlKVxuICByYWNlOiBmdW5jdGlvbiByYWNlKGl0ZXJhYmxlKXtcbiAgICB2YXIgQyAgICAgICAgICA9IHRoaXNcbiAgICAgICwgY2FwYWJpbGl0eSA9IG5ld1Byb21pc2VDYXBhYmlsaXR5KEMpXG4gICAgICAsIHJlamVjdCAgICAgPSBjYXBhYmlsaXR5LnJlamVjdDtcbiAgICB2YXIgYWJydXB0ID0gcGVyZm9ybShmdW5jdGlvbigpe1xuICAgICAgZm9yT2YoaXRlcmFibGUsIGZhbHNlLCBmdW5jdGlvbihwcm9taXNlKXtcbiAgICAgICAgQy5yZXNvbHZlKHByb21pc2UpLnRoZW4oY2FwYWJpbGl0eS5yZXNvbHZlLCByZWplY3QpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gICAgaWYoYWJydXB0KXJlamVjdChhYnJ1cHQuZXJyb3IpO1xuICAgIHJldHVybiBjYXBhYmlsaXR5LnByb21pc2U7XG4gIH1cbn0pOyIsImNvbnN0IERFRkFVTFRfVklFV1BPUlRfV0lEVEggPSA3NTBcblxuZXhwb3J0IGZ1bmN0aW9uIHNldFZpZXdwb3J0IChjb25maWdzID0ge30pIHtcbiAgY29uc3QgZG9jID0gd2luZG93LmRvY3VtZW50XG5cbiAgaWYgKGRvYykge1xuICAgIGNvbnN0IHNjcmVlbldpZHRoID0gd2luZG93LnNjcmVlbi53aWR0aFxuICAgIGNvbnN0IHNjYWxlID0gc2NyZWVuV2lkdGggLyBERUZBVUxUX1ZJRVdQT1JUX1dJRFRIXG5cbiAgICBjb25zdCBjb250ZW50cyA9IFtcbiAgICAgIGB3aWR0aD0ke0RFRkFVTFRfVklFV1BPUlRfV0lEVEh9YCxcbiAgICAgIGBpbml0aWFsLXNjYWxlPSR7c2NhbGV9YCxcbiAgICAgIGBtYXhpbXVtLXNjYWxlPSR7c2NhbGV9YCxcbiAgICAgIGBtaW5pbXVtLXNjYWxlPSR7c2NhbGV9YCxcbiAgICAgIGB1c2VyLXNjYWxhYmxlPW5vYFxuICAgIF1cblxuICAgIGxldCBtZXRhID0gZG9jLnF1ZXJ5U2VsZWN0b3IoJ21ldGFbbmFtZT1cInZpZXdwb3J0XCJdJylcbiAgICBpZiAoIW1ldGEpIHtcbiAgICAgIG1ldGEgPSBkb2MuY3JlYXRlRWxlbWVudCgnbWV0YScpXG4gICAgICBtZXRhLnNldEF0dHJpYnV0ZSgnbmFtZScsICd2aWV3cG9ydCcpXG4gICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdoZWFkJykuYXBwZW5kQ2hpbGQobWV0YSlcbiAgICB9XG5cbiAgICBtZXRhLnNldEF0dHJpYnV0ZSgnY29udGVudCcsIGNvbnRlbnRzLmpvaW4oJywnKSlcbiAgfVxufVxuIiwiLyoqXG4gKiBAYXV0aG9yIHNvbGUgLyBodHRwOi8vc29sZWRhZHBlbmFkZXMuY29tXG4gKiBAYXV0aG9yIG1yZG9vYiAvIGh0dHA6Ly9tcmRvb2IuY29tXG4gKiBAYXV0aG9yIFJvYmVydCBFaXNlbGUgLyBodHRwOi8vd3d3Lnhhcmcub3JnXG4gKiBAYXV0aG9yIFBoaWxpcHBlIC8gaHR0cDovL3BoaWxpcHBlLmVsc2Fzcy5tZVxuICogQGF1dGhvciBSb2JlcnQgUGVubmVyIC8gaHR0cDovL3d3dy5yb2JlcnRwZW5uZXIuY29tL2Vhc2luZ190ZXJtc19vZl91c2UuaHRtbFxuICogQGF1dGhvciBQYXVsIExld2lzIC8gaHR0cDovL3d3dy5hZXJvdHdpc3QuY29tL1xuICogQGF1dGhvciBsZWNoZWNhY2hhcnJvXG4gKiBAYXV0aG9yIEpvc2ggRmF1bCAvIGh0dHA6Ly9qb2NhZmEuY29tL1xuICogQGF1dGhvciBlZ3JhZXRoZXIgLyBodHRwOi8vZWdyYWV0aGVyLmNvbS9cbiAqL1xuXG5pZiAoIERhdGUubm93ID09PSB1bmRlZmluZWQgKSB7XG5cbiAgRGF0ZS5ub3cgPSBmdW5jdGlvbiAoKSB7XG5cbiAgICByZXR1cm4gbmV3IERhdGUoKS52YWx1ZU9mKCk7XG5cbiAgfVxuXG59XG5cbnZhciBUV0VFTiA9IFRXRUVOIHx8ICggZnVuY3Rpb24gKCkge1xuXG4gIHZhciBfdHdlZW5zID0gW107XG5cbiAgcmV0dXJuIHtcblxuICAgIFJFVklTSU9OOiAnOCcsXG5cbiAgICBnZXRBbGw6IGZ1bmN0aW9uICgpIHtcblxuICAgICAgcmV0dXJuIF90d2VlbnM7XG5cbiAgICB9LFxuXG4gICAgcmVtb3ZlQWxsOiBmdW5jdGlvbiAoKSB7XG5cbiAgICAgIF90d2VlbnMgPSBbXTtcblxuICAgIH0sXG5cbiAgICBhZGQ6IGZ1bmN0aW9uICggdHdlZW4gKSB7XG5cbiAgICAgIF90d2VlbnMucHVzaCggdHdlZW4gKTtcblxuICAgIH0sXG5cbiAgICByZW1vdmU6IGZ1bmN0aW9uICggdHdlZW4gKSB7XG5cbiAgICAgIHZhciBpID0gX3R3ZWVucy5pbmRleE9mKCB0d2VlbiApO1xuXG4gICAgICBpZiAoIGkgIT09IC0xICkge1xuXG4gICAgICAgIF90d2VlbnMuc3BsaWNlKCBpLCAxICk7XG5cbiAgICAgIH1cblxuICAgIH0sXG5cbiAgICB1cGRhdGU6IGZ1bmN0aW9uICggdGltZSApIHtcblxuICAgICAgaWYgKCBfdHdlZW5zLmxlbmd0aCA9PT0gMCApIHJldHVybiBmYWxzZTtcblxuICAgICAgdmFyIGkgPSAwLCBudW1Ud2VlbnMgPSBfdHdlZW5zLmxlbmd0aDtcblxuICAgICAgdGltZSA9IHRpbWUgIT09IHVuZGVmaW5lZCA/IHRpbWUgOiBEYXRlLm5vdygpO1xuXG4gICAgICB3aGlsZSAoIGkgPCBudW1Ud2VlbnMgKSB7XG5cbiAgICAgICAgaWYgKCBfdHdlZW5zWyBpIF0udXBkYXRlKCB0aW1lICkgKSB7XG5cbiAgICAgICAgICBpICsrO1xuXG4gICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICBfdHdlZW5zLnNwbGljZSggaSwgMSApO1xuXG4gICAgICAgICAgbnVtVHdlZW5zIC0tO1xuXG4gICAgICAgIH1cblxuICAgICAgfVxuXG4gICAgICByZXR1cm4gdHJ1ZTtcblxuICAgIH1cblxuICB9O1xuXG59ICkoKTtcblxuVFdFRU4uVHdlZW4gPSBmdW5jdGlvbiAoIG9iamVjdCApIHtcblxuICB2YXIgX29iamVjdCA9IG9iamVjdDtcbiAgdmFyIF92YWx1ZXNTdGFydCA9IHt9O1xuICB2YXIgX3ZhbHVlc0VuZCA9IHt9O1xuICB2YXIgX2R1cmF0aW9uID0gMTAwMDtcbiAgdmFyIF9kZWxheVRpbWUgPSAwO1xuICB2YXIgX3N0YXJ0VGltZSA9IG51bGw7XG4gIHZhciBfZWFzaW5nRnVuY3Rpb24gPSBUV0VFTi5FYXNpbmcuTGluZWFyLk5vbmU7XG4gIHZhciBfaW50ZXJwb2xhdGlvbkZ1bmN0aW9uID0gVFdFRU4uSW50ZXJwb2xhdGlvbi5MaW5lYXI7XG4gIHZhciBfY2hhaW5lZFR3ZWVucyA9IFtdO1xuICB2YXIgX29uU3RhcnRDYWxsYmFjayA9IG51bGw7XG4gIHZhciBfb25TdGFydENhbGxiYWNrRmlyZWQgPSBmYWxzZTtcbiAgdmFyIF9vblVwZGF0ZUNhbGxiYWNrID0gbnVsbDtcbiAgdmFyIF9vbkNvbXBsZXRlQ2FsbGJhY2sgPSBudWxsO1xuXG4gIHRoaXMudG8gPSBmdW5jdGlvbiAoIHByb3BlcnRpZXMsIGR1cmF0aW9uICkge1xuXG4gICAgaWYgKCBkdXJhdGlvbiAhPT0gdW5kZWZpbmVkICkge1xuXG4gICAgICBfZHVyYXRpb24gPSBkdXJhdGlvbjtcblxuICAgIH1cblxuICAgIF92YWx1ZXNFbmQgPSBwcm9wZXJ0aWVzO1xuXG4gICAgcmV0dXJuIHRoaXM7XG5cbiAgfTtcblxuICB0aGlzLnN0YXJ0ID0gZnVuY3Rpb24gKCB0aW1lICkge1xuXG4gICAgVFdFRU4uYWRkKCB0aGlzICk7XG5cbiAgICBfb25TdGFydENhbGxiYWNrRmlyZWQgPSBmYWxzZTtcblxuICAgIF9zdGFydFRpbWUgPSB0aW1lICE9PSB1bmRlZmluZWQgPyB0aW1lIDogRGF0ZS5ub3coKTtcbiAgICBfc3RhcnRUaW1lICs9IF9kZWxheVRpbWU7XG5cbiAgICBmb3IgKCB2YXIgcHJvcGVydHkgaW4gX3ZhbHVlc0VuZCApIHtcblxuICAgICAgLy8gVGhpcyBwcmV2ZW50cyB0aGUgaW50ZXJwb2xhdGlvbiBvZiBudWxsIHZhbHVlcyBvciBvZiBub24tZXhpc3RpbmcgcHJvcGVydGllc1xuICAgICAgaWYoIF9vYmplY3RbIHByb3BlcnR5IF0gPT09IG51bGwgfHwgIShwcm9wZXJ0eSBpbiBfb2JqZWN0KSApIHtcblxuICAgICAgICBjb250aW51ZTtcblxuICAgICAgfVxuXG4gICAgICAvLyBjaGVjayBpZiBhbiBBcnJheSB3YXMgcHJvdmlkZWQgYXMgcHJvcGVydHkgdmFsdWVcbiAgICAgIGlmICggX3ZhbHVlc0VuZFsgcHJvcGVydHkgXSBpbnN0YW5jZW9mIEFycmF5ICkge1xuXG4gICAgICAgIGlmICggX3ZhbHVlc0VuZFsgcHJvcGVydHkgXS5sZW5ndGggPT09IDAgKSB7XG5cbiAgICAgICAgICBjb250aW51ZTtcblxuICAgICAgICB9XG5cbiAgICAgICAgLy8gY3JlYXRlIGEgbG9jYWwgY29weSBvZiB0aGUgQXJyYXkgd2l0aCB0aGUgc3RhcnQgdmFsdWUgYXQgdGhlIGZyb250XG4gICAgICAgIF92YWx1ZXNFbmRbIHByb3BlcnR5IF0gPSBbIF9vYmplY3RbIHByb3BlcnR5IF0gXS5jb25jYXQoIF92YWx1ZXNFbmRbIHByb3BlcnR5IF0gKTtcblxuICAgICAgfVxuXG4gICAgICBfdmFsdWVzU3RhcnRbIHByb3BlcnR5IF0gPSBfb2JqZWN0WyBwcm9wZXJ0eSBdO1xuXG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXM7XG5cbiAgfTtcblxuICB0aGlzLnN0b3AgPSBmdW5jdGlvbiAoKSB7XG5cbiAgICBUV0VFTi5yZW1vdmUoIHRoaXMgKTtcbiAgICByZXR1cm4gdGhpcztcblxuICB9O1xuXG4gIHRoaXMuZGVsYXkgPSBmdW5jdGlvbiAoIGFtb3VudCApIHtcblxuICAgIF9kZWxheVRpbWUgPSBhbW91bnQ7XG4gICAgcmV0dXJuIHRoaXM7XG5cbiAgfTtcblxuICB0aGlzLmVhc2luZyA9IGZ1bmN0aW9uICggZWFzaW5nICkge1xuXG4gICAgX2Vhc2luZ0Z1bmN0aW9uID0gZWFzaW5nO1xuICAgIHJldHVybiB0aGlzO1xuXG4gIH07XG5cbiAgdGhpcy5pbnRlcnBvbGF0aW9uID0gZnVuY3Rpb24gKCBpbnRlcnBvbGF0aW9uICkge1xuXG4gICAgX2ludGVycG9sYXRpb25GdW5jdGlvbiA9IGludGVycG9sYXRpb247XG4gICAgcmV0dXJuIHRoaXM7XG5cbiAgfTtcblxuICB0aGlzLmNoYWluID0gZnVuY3Rpb24gKCkge1xuXG4gICAgX2NoYWluZWRUd2VlbnMgPSBhcmd1bWVudHM7XG4gICAgcmV0dXJuIHRoaXM7XG5cbiAgfTtcblxuICB0aGlzLm9uU3RhcnQgPSBmdW5jdGlvbiAoIGNhbGxiYWNrICkge1xuXG4gICAgX29uU3RhcnRDYWxsYmFjayA9IGNhbGxiYWNrO1xuICAgIHJldHVybiB0aGlzO1xuXG4gIH07XG5cbiAgdGhpcy5vblVwZGF0ZSA9IGZ1bmN0aW9uICggY2FsbGJhY2sgKSB7XG5cbiAgICBfb25VcGRhdGVDYWxsYmFjayA9IGNhbGxiYWNrO1xuICAgIHJldHVybiB0aGlzO1xuXG4gIH07XG5cbiAgdGhpcy5vbkNvbXBsZXRlID0gZnVuY3Rpb24gKCBjYWxsYmFjayApIHtcblxuICAgIF9vbkNvbXBsZXRlQ2FsbGJhY2sgPSBjYWxsYmFjaztcbiAgICByZXR1cm4gdGhpcztcblxuICB9O1xuXG4gIHRoaXMudXBkYXRlID0gZnVuY3Rpb24gKCB0aW1lICkge1xuXG4gICAgaWYgKCB0aW1lIDwgX3N0YXJ0VGltZSApIHtcblxuICAgICAgcmV0dXJuIHRydWU7XG5cbiAgICB9XG5cbiAgICBpZiAoIF9vblN0YXJ0Q2FsbGJhY2tGaXJlZCA9PT0gZmFsc2UgKSB7XG5cbiAgICAgIGlmICggX29uU3RhcnRDYWxsYmFjayAhPT0gbnVsbCApIHtcblxuICAgICAgICBfb25TdGFydENhbGxiYWNrLmNhbGwoIF9vYmplY3QgKTtcblxuICAgICAgfVxuXG4gICAgICBfb25TdGFydENhbGxiYWNrRmlyZWQgPSB0cnVlO1xuXG4gICAgfVxuXG4gICAgdmFyIGVsYXBzZWQgPSAoIHRpbWUgLSBfc3RhcnRUaW1lICkgLyBfZHVyYXRpb247XG4gICAgZWxhcHNlZCA9IGVsYXBzZWQgPiAxID8gMSA6IGVsYXBzZWQ7XG5cbiAgICB2YXIgdmFsdWUgPSBfZWFzaW5nRnVuY3Rpb24oIGVsYXBzZWQgKTtcblxuICAgIGZvciAoIHZhciBwcm9wZXJ0eSBpbiBfdmFsdWVzU3RhcnQgKSB7XG5cbiAgICAgIHZhciBzdGFydCA9IF92YWx1ZXNTdGFydFsgcHJvcGVydHkgXTtcbiAgICAgIHZhciBlbmQgPSBfdmFsdWVzRW5kWyBwcm9wZXJ0eSBdO1xuXG4gICAgICBpZiAoIGVuZCBpbnN0YW5jZW9mIEFycmF5ICkge1xuXG4gICAgICAgIF9vYmplY3RbIHByb3BlcnR5IF0gPSBfaW50ZXJwb2xhdGlvbkZ1bmN0aW9uKCBlbmQsIHZhbHVlICk7XG5cbiAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgX29iamVjdFsgcHJvcGVydHkgXSA9IHN0YXJ0ICsgKCBlbmQgLSBzdGFydCApICogdmFsdWU7XG5cbiAgICAgIH1cblxuICAgIH1cblxuICAgIGlmICggX29uVXBkYXRlQ2FsbGJhY2sgIT09IG51bGwgKSB7XG5cbiAgICAgIF9vblVwZGF0ZUNhbGxiYWNrLmNhbGwoIF9vYmplY3QsIHZhbHVlICk7XG5cbiAgICB9XG5cbiAgICBpZiAoIGVsYXBzZWQgPT0gMSApIHtcblxuICAgICAgaWYgKCBfb25Db21wbGV0ZUNhbGxiYWNrICE9PSBudWxsICkge1xuXG4gICAgICAgIF9vbkNvbXBsZXRlQ2FsbGJhY2suY2FsbCggX29iamVjdCApO1xuXG4gICAgICB9XG5cbiAgICAgIGZvciAoIHZhciBpID0gMCwgbnVtQ2hhaW5lZFR3ZWVucyA9IF9jaGFpbmVkVHdlZW5zLmxlbmd0aDsgaSA8IG51bUNoYWluZWRUd2VlbnM7IGkgKysgKSB7XG5cbiAgICAgICAgX2NoYWluZWRUd2VlbnNbIGkgXS5zdGFydCggdGltZSApO1xuXG4gICAgICB9XG5cbiAgICAgIHJldHVybiBmYWxzZTtcblxuICAgIH1cblxuICAgIHJldHVybiB0cnVlO1xuXG4gIH07XG5cbn07XG5cblRXRUVOLkVhc2luZyA9IHtcblxuICBMaW5lYXI6IHtcblxuICAgIE5vbmU6IGZ1bmN0aW9uICggayApIHtcblxuICAgICAgcmV0dXJuIGs7XG5cbiAgICB9XG5cbiAgfSxcblxuICBRdWFkcmF0aWM6IHtcblxuICAgIEluOiBmdW5jdGlvbiAoIGsgKSB7XG5cbiAgICAgIHJldHVybiBrICogaztcblxuICAgIH0sXG5cbiAgICBPdXQ6IGZ1bmN0aW9uICggayApIHtcblxuICAgICAgcmV0dXJuIGsgKiAoIDIgLSBrICk7XG5cbiAgICB9LFxuXG4gICAgSW5PdXQ6IGZ1bmN0aW9uICggayApIHtcblxuICAgICAgaWYgKCAoIGsgKj0gMiApIDwgMSApIHJldHVybiAwLjUgKiBrICogaztcbiAgICAgIHJldHVybiAtIDAuNSAqICggLS1rICogKCBrIC0gMiApIC0gMSApO1xuXG4gICAgfVxuXG4gIH0sXG5cbiAgQ3ViaWM6IHtcblxuICAgIEluOiBmdW5jdGlvbiAoIGsgKSB7XG5cbiAgICAgIHJldHVybiBrICogayAqIGs7XG5cbiAgICB9LFxuXG4gICAgT3V0OiBmdW5jdGlvbiAoIGsgKSB7XG5cbiAgICAgIHJldHVybiAtLWsgKiBrICogayArIDE7XG5cbiAgICB9LFxuXG4gICAgSW5PdXQ6IGZ1bmN0aW9uICggayApIHtcblxuICAgICAgaWYgKCAoIGsgKj0gMiApIDwgMSApIHJldHVybiAwLjUgKiBrICogayAqIGs7XG4gICAgICByZXR1cm4gMC41ICogKCAoIGsgLT0gMiApICogayAqIGsgKyAyICk7XG5cbiAgICB9XG5cbiAgfSxcblxuICBRdWFydGljOiB7XG5cbiAgICBJbjogZnVuY3Rpb24gKCBrICkge1xuXG4gICAgICByZXR1cm4gayAqIGsgKiBrICogaztcblxuICAgIH0sXG5cbiAgICBPdXQ6IGZ1bmN0aW9uICggayApIHtcblxuICAgICAgcmV0dXJuIDEgLSAoIC0tayAqIGsgKiBrICogayApO1xuXG4gICAgfSxcblxuICAgIEluT3V0OiBmdW5jdGlvbiAoIGsgKSB7XG5cbiAgICAgIGlmICggKCBrICo9IDIgKSA8IDEpIHJldHVybiAwLjUgKiBrICogayAqIGsgKiBrO1xuICAgICAgcmV0dXJuIC0gMC41ICogKCAoIGsgLT0gMiApICogayAqIGsgKiBrIC0gMiApO1xuXG4gICAgfVxuXG4gIH0sXG5cbiAgUXVpbnRpYzoge1xuXG4gICAgSW46IGZ1bmN0aW9uICggayApIHtcblxuICAgICAgcmV0dXJuIGsgKiBrICogayAqIGsgKiBrO1xuXG4gICAgfSxcblxuICAgIE91dDogZnVuY3Rpb24gKCBrICkge1xuXG4gICAgICByZXR1cm4gLS1rICogayAqIGsgKiBrICogayArIDE7XG5cbiAgICB9LFxuXG4gICAgSW5PdXQ6IGZ1bmN0aW9uICggayApIHtcblxuICAgICAgaWYgKCAoIGsgKj0gMiApIDwgMSApIHJldHVybiAwLjUgKiBrICogayAqIGsgKiBrICogaztcbiAgICAgIHJldHVybiAwLjUgKiAoICggayAtPSAyICkgKiBrICogayAqIGsgKiBrICsgMiApO1xuXG4gICAgfVxuXG4gIH0sXG5cbiAgU2ludXNvaWRhbDoge1xuXG4gICAgSW46IGZ1bmN0aW9uICggayApIHtcblxuICAgICAgcmV0dXJuIDEgLSBNYXRoLmNvcyggayAqIE1hdGguUEkgLyAyICk7XG5cbiAgICB9LFxuXG4gICAgT3V0OiBmdW5jdGlvbiAoIGsgKSB7XG5cbiAgICAgIHJldHVybiBNYXRoLnNpbiggayAqIE1hdGguUEkgLyAyICk7XG5cbiAgICB9LFxuXG4gICAgSW5PdXQ6IGZ1bmN0aW9uICggayApIHtcblxuICAgICAgcmV0dXJuIDAuNSAqICggMSAtIE1hdGguY29zKCBNYXRoLlBJICogayApICk7XG5cbiAgICB9XG5cbiAgfSxcblxuICBFeHBvbmVudGlhbDoge1xuXG4gICAgSW46IGZ1bmN0aW9uICggayApIHtcblxuICAgICAgcmV0dXJuIGsgPT09IDAgPyAwIDogTWF0aC5wb3coIDEwMjQsIGsgLSAxICk7XG5cbiAgICB9LFxuXG4gICAgT3V0OiBmdW5jdGlvbiAoIGsgKSB7XG5cbiAgICAgIHJldHVybiBrID09PSAxID8gMSA6IDEgLSBNYXRoLnBvdyggMiwgLSAxMCAqIGsgKTtcblxuICAgIH0sXG5cbiAgICBJbk91dDogZnVuY3Rpb24gKCBrICkge1xuXG4gICAgICBpZiAoIGsgPT09IDAgKSByZXR1cm4gMDtcbiAgICAgIGlmICggayA9PT0gMSApIHJldHVybiAxO1xuICAgICAgaWYgKCAoIGsgKj0gMiApIDwgMSApIHJldHVybiAwLjUgKiBNYXRoLnBvdyggMTAyNCwgayAtIDEgKTtcbiAgICAgIHJldHVybiAwLjUgKiAoIC0gTWF0aC5wb3coIDIsIC0gMTAgKiAoIGsgLSAxICkgKSArIDIgKTtcblxuICAgIH1cblxuICB9LFxuXG4gIENpcmN1bGFyOiB7XG5cbiAgICBJbjogZnVuY3Rpb24gKCBrICkge1xuXG4gICAgICByZXR1cm4gMSAtIE1hdGguc3FydCggMSAtIGsgKiBrICk7XG5cbiAgICB9LFxuXG4gICAgT3V0OiBmdW5jdGlvbiAoIGsgKSB7XG5cbiAgICAgIHJldHVybiBNYXRoLnNxcnQoIDEgLSAoIC0tayAqIGsgKSApO1xuXG4gICAgfSxcblxuICAgIEluT3V0OiBmdW5jdGlvbiAoIGsgKSB7XG5cbiAgICAgIGlmICggKCBrICo9IDIgKSA8IDEpIHJldHVybiAtIDAuNSAqICggTWF0aC5zcXJ0KCAxIC0gayAqIGspIC0gMSk7XG4gICAgICByZXR1cm4gMC41ICogKCBNYXRoLnNxcnQoIDEgLSAoIGsgLT0gMikgKiBrKSArIDEpO1xuXG4gICAgfVxuXG4gIH0sXG5cbiAgRWxhc3RpYzoge1xuXG4gICAgSW46IGZ1bmN0aW9uICggayApIHtcblxuICAgICAgdmFyIHMsIGEgPSAwLjEsIHAgPSAwLjQ7XG4gICAgICBpZiAoIGsgPT09IDAgKSByZXR1cm4gMDtcbiAgICAgIGlmICggayA9PT0gMSApIHJldHVybiAxO1xuICAgICAgaWYgKCAhYSB8fCBhIDwgMSApIHsgYSA9IDE7IHMgPSBwIC8gNDsgfVxuICAgICAgZWxzZSBzID0gcCAqIE1hdGguYXNpbiggMSAvIGEgKSAvICggMiAqIE1hdGguUEkgKTtcbiAgICAgIHJldHVybiAtICggYSAqIE1hdGgucG93KCAyLCAxMCAqICggayAtPSAxICkgKSAqIE1hdGguc2luKCAoIGsgLSBzICkgKiAoIDIgKiBNYXRoLlBJICkgLyBwICkgKTtcblxuICAgIH0sXG5cbiAgICBPdXQ6IGZ1bmN0aW9uICggayApIHtcblxuICAgICAgdmFyIHMsIGEgPSAwLjEsIHAgPSAwLjQ7XG4gICAgICBpZiAoIGsgPT09IDAgKSByZXR1cm4gMDtcbiAgICAgIGlmICggayA9PT0gMSApIHJldHVybiAxO1xuICAgICAgaWYgKCAhYSB8fCBhIDwgMSApIHsgYSA9IDE7IHMgPSBwIC8gNDsgfVxuICAgICAgZWxzZSBzID0gcCAqIE1hdGguYXNpbiggMSAvIGEgKSAvICggMiAqIE1hdGguUEkgKTtcbiAgICAgIHJldHVybiAoIGEgKiBNYXRoLnBvdyggMiwgLSAxMCAqIGspICogTWF0aC5zaW4oICggayAtIHMgKSAqICggMiAqIE1hdGguUEkgKSAvIHAgKSArIDEgKTtcblxuICAgIH0sXG5cbiAgICBJbk91dDogZnVuY3Rpb24gKCBrICkge1xuXG4gICAgICB2YXIgcywgYSA9IDAuMSwgcCA9IDAuNDtcbiAgICAgIGlmICggayA9PT0gMCApIHJldHVybiAwO1xuICAgICAgaWYgKCBrID09PSAxICkgcmV0dXJuIDE7XG4gICAgICBpZiAoICFhIHx8IGEgPCAxICkgeyBhID0gMTsgcyA9IHAgLyA0OyB9XG4gICAgICBlbHNlIHMgPSBwICogTWF0aC5hc2luKCAxIC8gYSApIC8gKCAyICogTWF0aC5QSSApO1xuICAgICAgaWYgKCAoIGsgKj0gMiApIDwgMSApIHJldHVybiAtIDAuNSAqICggYSAqIE1hdGgucG93KCAyLCAxMCAqICggayAtPSAxICkgKSAqIE1hdGguc2luKCAoIGsgLSBzICkgKiAoIDIgKiBNYXRoLlBJICkgLyBwICkgKTtcbiAgICAgIHJldHVybiBhICogTWF0aC5wb3coIDIsIC0xMCAqICggayAtPSAxICkgKSAqIE1hdGguc2luKCAoIGsgLSBzICkgKiAoIDIgKiBNYXRoLlBJICkgLyBwICkgKiAwLjUgKyAxO1xuXG4gICAgfVxuXG4gIH0sXG5cbiAgQmFjazoge1xuXG4gICAgSW46IGZ1bmN0aW9uICggayApIHtcblxuICAgICAgdmFyIHMgPSAxLjcwMTU4O1xuICAgICAgcmV0dXJuIGsgKiBrICogKCAoIHMgKyAxICkgKiBrIC0gcyApO1xuXG4gICAgfSxcblxuICAgIE91dDogZnVuY3Rpb24gKCBrICkge1xuXG4gICAgICB2YXIgcyA9IDEuNzAxNTg7XG4gICAgICByZXR1cm4gLS1rICogayAqICggKCBzICsgMSApICogayArIHMgKSArIDE7XG5cbiAgICB9LFxuXG4gICAgSW5PdXQ6IGZ1bmN0aW9uICggayApIHtcblxuICAgICAgdmFyIHMgPSAxLjcwMTU4ICogMS41MjU7XG4gICAgICBpZiAoICggayAqPSAyICkgPCAxICkgcmV0dXJuIDAuNSAqICggayAqIGsgKiAoICggcyArIDEgKSAqIGsgLSBzICkgKTtcbiAgICAgIHJldHVybiAwLjUgKiAoICggayAtPSAyICkgKiBrICogKCAoIHMgKyAxICkgKiBrICsgcyApICsgMiApO1xuXG4gICAgfVxuXG4gIH0sXG5cbiAgQm91bmNlOiB7XG5cbiAgICBJbjogZnVuY3Rpb24gKCBrICkge1xuXG4gICAgICByZXR1cm4gMSAtIFRXRUVOLkVhc2luZy5Cb3VuY2UuT3V0KCAxIC0gayApO1xuXG4gICAgfSxcblxuICAgIE91dDogZnVuY3Rpb24gKCBrICkge1xuXG4gICAgICBpZiAoIGsgPCAoIDEgLyAyLjc1ICkgKSB7XG5cbiAgICAgICAgcmV0dXJuIDcuNTYyNSAqIGsgKiBrO1xuXG4gICAgICB9IGVsc2UgaWYgKCBrIDwgKCAyIC8gMi43NSApICkge1xuXG4gICAgICAgIHJldHVybiA3LjU2MjUgKiAoIGsgLT0gKCAxLjUgLyAyLjc1ICkgKSAqIGsgKyAwLjc1O1xuXG4gICAgICB9IGVsc2UgaWYgKCBrIDwgKCAyLjUgLyAyLjc1ICkgKSB7XG5cbiAgICAgICAgcmV0dXJuIDcuNTYyNSAqICggayAtPSAoIDIuMjUgLyAyLjc1ICkgKSAqIGsgKyAwLjkzNzU7XG5cbiAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgcmV0dXJuIDcuNTYyNSAqICggayAtPSAoIDIuNjI1IC8gMi43NSApICkgKiBrICsgMC45ODQzNzU7XG5cbiAgICAgIH1cblxuICAgIH0sXG5cbiAgICBJbk91dDogZnVuY3Rpb24gKCBrICkge1xuXG4gICAgICBpZiAoIGsgPCAwLjUgKSByZXR1cm4gVFdFRU4uRWFzaW5nLkJvdW5jZS5JbiggayAqIDIgKSAqIDAuNTtcbiAgICAgIHJldHVybiBUV0VFTi5FYXNpbmcuQm91bmNlLk91dCggayAqIDIgLSAxICkgKiAwLjUgKyAwLjU7XG5cbiAgICB9XG5cbiAgfVxuXG59O1xuXG5UV0VFTi5JbnRlcnBvbGF0aW9uID0ge1xuXG4gIExpbmVhcjogZnVuY3Rpb24gKCB2LCBrICkge1xuXG4gICAgdmFyIG0gPSB2Lmxlbmd0aCAtIDEsIGYgPSBtICogaywgaSA9IE1hdGguZmxvb3IoIGYgKSwgZm4gPSBUV0VFTi5JbnRlcnBvbGF0aW9uLlV0aWxzLkxpbmVhcjtcblxuICAgIGlmICggayA8IDAgKSByZXR1cm4gZm4oIHZbIDAgXSwgdlsgMSBdLCBmICk7XG4gICAgaWYgKCBrID4gMSApIHJldHVybiBmbiggdlsgbSBdLCB2WyBtIC0gMSBdLCBtIC0gZiApO1xuXG4gICAgcmV0dXJuIGZuKCB2WyBpIF0sIHZbIGkgKyAxID4gbSA/IG0gOiBpICsgMSBdLCBmIC0gaSApO1xuXG4gIH0sXG5cbiAgQmV6aWVyOiBmdW5jdGlvbiAoIHYsIGsgKSB7XG5cbiAgICB2YXIgYiA9IDAsIG4gPSB2Lmxlbmd0aCAtIDEsIHB3ID0gTWF0aC5wb3csIGJuID0gVFdFRU4uSW50ZXJwb2xhdGlvbi5VdGlscy5CZXJuc3RlaW4sIGk7XG5cbiAgICBmb3IgKCBpID0gMDsgaSA8PSBuOyBpKysgKSB7XG4gICAgICBiICs9IHB3KCAxIC0gaywgbiAtIGkgKSAqIHB3KCBrLCBpICkgKiB2WyBpIF0gKiBibiggbiwgaSApO1xuICAgIH1cblxuICAgIHJldHVybiBiO1xuXG4gIH0sXG5cbiAgQ2F0bXVsbFJvbTogZnVuY3Rpb24gKCB2LCBrICkge1xuXG4gICAgdmFyIG0gPSB2Lmxlbmd0aCAtIDEsIGYgPSBtICogaywgaSA9IE1hdGguZmxvb3IoIGYgKSwgZm4gPSBUV0VFTi5JbnRlcnBvbGF0aW9uLlV0aWxzLkNhdG11bGxSb207XG5cbiAgICBpZiAoIHZbIDAgXSA9PT0gdlsgbSBdICkge1xuXG4gICAgICBpZiAoIGsgPCAwICkgaSA9IE1hdGguZmxvb3IoIGYgPSBtICogKCAxICsgayApICk7XG5cbiAgICAgIHJldHVybiBmbiggdlsgKCBpIC0gMSArIG0gKSAlIG0gXSwgdlsgaSBdLCB2WyAoIGkgKyAxICkgJSBtIF0sIHZbICggaSArIDIgKSAlIG0gXSwgZiAtIGkgKTtcblxuICAgIH0gZWxzZSB7XG5cbiAgICAgIGlmICggayA8IDAgKSByZXR1cm4gdlsgMCBdIC0gKCBmbiggdlsgMCBdLCB2WyAwIF0sIHZbIDEgXSwgdlsgMSBdLCAtZiApIC0gdlsgMCBdICk7XG4gICAgICBpZiAoIGsgPiAxICkgcmV0dXJuIHZbIG0gXSAtICggZm4oIHZbIG0gXSwgdlsgbSBdLCB2WyBtIC0gMSBdLCB2WyBtIC0gMSBdLCBmIC0gbSApIC0gdlsgbSBdICk7XG5cbiAgICAgIHJldHVybiBmbiggdlsgaSA/IGkgLSAxIDogMCBdLCB2WyBpIF0sIHZbIG0gPCBpICsgMSA/IG0gOiBpICsgMSBdLCB2WyBtIDwgaSArIDIgPyBtIDogaSArIDIgXSwgZiAtIGkgKTtcblxuICAgIH1cblxuICB9LFxuXG4gIFV0aWxzOiB7XG5cbiAgICBMaW5lYXI6IGZ1bmN0aW9uICggcDAsIHAxLCB0ICkge1xuXG4gICAgICByZXR1cm4gKCBwMSAtIHAwICkgKiB0ICsgcDA7XG5cbiAgICB9LFxuXG4gICAgQmVybnN0ZWluOiBmdW5jdGlvbiAoIG4gLCBpICkge1xuXG4gICAgICB2YXIgZmMgPSBUV0VFTi5JbnRlcnBvbGF0aW9uLlV0aWxzLkZhY3RvcmlhbDtcbiAgICAgIHJldHVybiBmYyggbiApIC8gZmMoIGkgKSAvIGZjKCBuIC0gaSApO1xuXG4gICAgfSxcblxuICAgIEZhY3RvcmlhbDogKCBmdW5jdGlvbiAoKSB7XG5cbiAgICAgIHZhciBhID0gWyAxIF07XG5cbiAgICAgIHJldHVybiBmdW5jdGlvbiAoIG4gKSB7XG5cbiAgICAgICAgdmFyIHMgPSAxLCBpO1xuICAgICAgICBpZiAoIGFbIG4gXSApIHJldHVybiBhWyBuIF07XG4gICAgICAgIGZvciAoIGkgPSBuOyBpID4gMTsgaS0tICkgcyAqPSBpO1xuICAgICAgICByZXR1cm4gYVsgbiBdID0gcztcblxuICAgICAgfTtcblxuICAgIH0gKSgpLFxuXG4gICAgQ2F0bXVsbFJvbTogZnVuY3Rpb24gKCBwMCwgcDEsIHAyLCBwMywgdCApIHtcblxuICAgICAgdmFyIHYwID0gKCBwMiAtIHAwICkgKiAwLjUsIHYxID0gKCBwMyAtIHAxICkgKiAwLjUsIHQyID0gdCAqIHQsIHQzID0gdCAqIHQyO1xuICAgICAgcmV0dXJuICggMiAqIHAxIC0gMiAqIHAyICsgdjAgKyB2MSApICogdDMgKyAoIC0gMyAqIHAxICsgMyAqIHAyIC0gMiAqIHYwIC0gdjEgKSAqIHQyICsgdjAgKiB0ICsgcDE7XG5cbiAgICB9XG5cbiAgfVxuXG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IFRXRUVOOyIsIi8vIEdlbmVyYXRlZCBieSBDb2ZmZWVTY3JpcHQgMS43LjFcbihmdW5jdGlvbigpIHtcbiAgdmFyIGdldE5hbm9TZWNvbmRzLCBocnRpbWUsIGxvYWRUaW1lO1xuXG4gIGlmICgodHlwZW9mIHBlcmZvcm1hbmNlICE9PSBcInVuZGVmaW5lZFwiICYmIHBlcmZvcm1hbmNlICE9PSBudWxsKSAmJiBwZXJmb3JtYW5jZS5ub3cpIHtcbiAgICBtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIHBlcmZvcm1hbmNlLm5vdygpO1xuICAgIH07XG4gIH0gZWxzZSBpZiAoKHR5cGVvZiBwcm9jZXNzICE9PSBcInVuZGVmaW5lZFwiICYmIHByb2Nlc3MgIT09IG51bGwpICYmIHByb2Nlc3MuaHJ0aW1lKSB7XG4gICAgbW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiAoZ2V0TmFub1NlY29uZHMoKSAtIGxvYWRUaW1lKSAvIDFlNjtcbiAgICB9O1xuICAgIGhydGltZSA9IHByb2Nlc3MuaHJ0aW1lO1xuICAgIGdldE5hbm9TZWNvbmRzID0gZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgaHI7XG4gICAgICBociA9IGhydGltZSgpO1xuICAgICAgcmV0dXJuIGhyWzBdICogMWU5ICsgaHJbMV07XG4gICAgfTtcbiAgICBsb2FkVGltZSA9IGdldE5hbm9TZWNvbmRzKCk7XG4gIH0gZWxzZSBpZiAoRGF0ZS5ub3cpIHtcbiAgICBtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIERhdGUubm93KCkgLSBsb2FkVGltZTtcbiAgICB9O1xuICAgIGxvYWRUaW1lID0gRGF0ZS5ub3coKTtcbiAgfSBlbHNlIHtcbiAgICBtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIG5ldyBEYXRlKCkuZ2V0VGltZSgpIC0gbG9hZFRpbWU7XG4gICAgfTtcbiAgICBsb2FkVGltZSA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xuICB9XG5cbn0pLmNhbGwodGhpcyk7XG4iLCJ2YXIgbm93ID0gcmVxdWlyZSgncGVyZm9ybWFuY2Utbm93JylcbiAgLCByb290ID0gdHlwZW9mIHdpbmRvdyA9PT0gJ3VuZGVmaW5lZCcgPyBnbG9iYWwgOiB3aW5kb3dcbiAgLCB2ZW5kb3JzID0gWydtb3onLCAnd2Via2l0J11cbiAgLCBzdWZmaXggPSAnQW5pbWF0aW9uRnJhbWUnXG4gICwgcmFmID0gcm9vdFsncmVxdWVzdCcgKyBzdWZmaXhdXG4gICwgY2FmID0gcm9vdFsnY2FuY2VsJyArIHN1ZmZpeF0gfHwgcm9vdFsnY2FuY2VsUmVxdWVzdCcgKyBzdWZmaXhdXG5cbmZvcih2YXIgaSA9IDA7ICFyYWYgJiYgaSA8IHZlbmRvcnMubGVuZ3RoOyBpKyspIHtcbiAgcmFmID0gcm9vdFt2ZW5kb3JzW2ldICsgJ1JlcXVlc3QnICsgc3VmZml4XVxuICBjYWYgPSByb290W3ZlbmRvcnNbaV0gKyAnQ2FuY2VsJyArIHN1ZmZpeF1cbiAgICAgIHx8IHJvb3RbdmVuZG9yc1tpXSArICdDYW5jZWxSZXF1ZXN0JyArIHN1ZmZpeF1cbn1cblxuLy8gU29tZSB2ZXJzaW9ucyBvZiBGRiBoYXZlIHJBRiBidXQgbm90IGNBRlxuaWYoIXJhZiB8fCAhY2FmKSB7XG4gIHZhciBsYXN0ID0gMFxuICAgICwgaWQgPSAwXG4gICAgLCBxdWV1ZSA9IFtdXG4gICAgLCBmcmFtZUR1cmF0aW9uID0gMTAwMCAvIDYwXG5cbiAgcmFmID0gZnVuY3Rpb24oY2FsbGJhY2spIHtcbiAgICBpZihxdWV1ZS5sZW5ndGggPT09IDApIHtcbiAgICAgIHZhciBfbm93ID0gbm93KClcbiAgICAgICAgLCBuZXh0ID0gTWF0aC5tYXgoMCwgZnJhbWVEdXJhdGlvbiAtIChfbm93IC0gbGFzdCkpXG4gICAgICBsYXN0ID0gbmV4dCArIF9ub3dcbiAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBjcCA9IHF1ZXVlLnNsaWNlKDApXG4gICAgICAgIC8vIENsZWFyIHF1ZXVlIGhlcmUgdG8gcHJldmVudFxuICAgICAgICAvLyBjYWxsYmFja3MgZnJvbSBhcHBlbmRpbmcgbGlzdGVuZXJzXG4gICAgICAgIC8vIHRvIHRoZSBjdXJyZW50IGZyYW1lJ3MgcXVldWVcbiAgICAgICAgcXVldWUubGVuZ3RoID0gMFxuICAgICAgICBmb3IodmFyIGkgPSAwOyBpIDwgY3AubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICBpZighY3BbaV0uY2FuY2VsbGVkKSB7XG4gICAgICAgICAgICB0cnl7XG4gICAgICAgICAgICAgIGNwW2ldLmNhbGxiYWNrKGxhc3QpXG4gICAgICAgICAgICB9IGNhdGNoKGUpIHtcbiAgICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHsgdGhyb3cgZSB9LCAwKVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSwgTWF0aC5yb3VuZChuZXh0KSlcbiAgICB9XG4gICAgcXVldWUucHVzaCh7XG4gICAgICBoYW5kbGU6ICsraWQsXG4gICAgICBjYWxsYmFjazogY2FsbGJhY2ssXG4gICAgICBjYW5jZWxsZWQ6IGZhbHNlXG4gICAgfSlcbiAgICByZXR1cm4gaWRcbiAgfVxuXG4gIGNhZiA9IGZ1bmN0aW9uKGhhbmRsZSkge1xuICAgIGZvcih2YXIgaSA9IDA7IGkgPCBxdWV1ZS5sZW5ndGg7IGkrKykge1xuICAgICAgaWYocXVldWVbaV0uaGFuZGxlID09PSBoYW5kbGUpIHtcbiAgICAgICAgcXVldWVbaV0uY2FuY2VsbGVkID0gdHJ1ZVxuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGZuKSB7XG4gIC8vIFdyYXAgaW4gYSBuZXcgZnVuY3Rpb24gdG8gcHJldmVudFxuICAvLyBgY2FuY2VsYCBwb3RlbnRpYWxseSBiZWluZyBhc3NpZ25lZFxuICAvLyB0byB0aGUgbmF0aXZlIHJBRiBmdW5jdGlvblxuICByZXR1cm4gcmFmLmNhbGwocm9vdCwgZm4pXG59XG5tb2R1bGUuZXhwb3J0cy5jYW5jZWwgPSBmdW5jdGlvbigpIHtcbiAgY2FmLmFwcGx5KHJvb3QsIGFyZ3VtZW50cylcbn1cbm1vZHVsZS5leHBvcnRzLnBvbHlmaWxsID0gZnVuY3Rpb24oKSB7XG4gIHJvb3QucmVxdWVzdEFuaW1hdGlvbkZyYW1lID0gcmFmXG4gIHJvb3QuY2FuY2VsQW5pbWF0aW9uRnJhbWUgPSBjYWZcbn1cbiIsIi8qKlxuICogTW9kdWxlIGRlcGVuZGVuY2llcy5cbiAqL1xuXG52YXIgVHdlZW4gPSByZXF1aXJlKCd0d2VlbicpO1xudmFyIHJhZiA9IHJlcXVpcmUoJ3JhZicpO1xuXG4vKipcbiAqIEV4cG9zZSBgc2Nyb2xsVG9gLlxuICovXG5cbm1vZHVsZS5leHBvcnRzID0gc2Nyb2xsVG87XG5cbi8qKlxuICogU2Nyb2xsIHRvIGAoeCwgeSlgLlxuICpcbiAqIEBwYXJhbSB7TnVtYmVyfSB4XG4gKiBAcGFyYW0ge051bWJlcn0geVxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5mdW5jdGlvbiBzY3JvbGxUbyh4LCB5LCBvcHRpb25zKSB7XG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuXG4gIC8vIHN0YXJ0IHBvc2l0aW9uXG4gIHZhciBzdGFydCA9IHNjcm9sbCgpO1xuXG4gIC8vIHNldHVwIHR3ZWVuXG4gIHZhciB0d2VlbiA9IFR3ZWVuKHN0YXJ0KVxuICAgIC5lYXNlKG9wdGlvbnMuZWFzZSB8fCAnb3V0LWNpcmMnKVxuICAgIC50byh7IHRvcDogeSwgbGVmdDogeCB9KVxuICAgIC5kdXJhdGlvbihvcHRpb25zLmR1cmF0aW9uIHx8IDEwMDApO1xuXG4gIC8vIHNjcm9sbFxuICB0d2Vlbi51cGRhdGUoZnVuY3Rpb24obyl7XG4gICAgd2luZG93LnNjcm9sbFRvKG8ubGVmdCB8IDAsIG8udG9wIHwgMCk7XG4gIH0pO1xuXG4gIC8vIGhhbmRsZSBlbmRcbiAgdHdlZW4ub24oJ2VuZCcsIGZ1bmN0aW9uKCl7XG4gICAgYW5pbWF0ZSA9IGZ1bmN0aW9uKCl7fTtcbiAgfSk7XG5cbiAgLy8gYW5pbWF0ZVxuICBmdW5jdGlvbiBhbmltYXRlKCkge1xuICAgIHJhZihhbmltYXRlKTtcbiAgICB0d2Vlbi51cGRhdGUoKTtcbiAgfVxuXG4gIGFuaW1hdGUoKTtcbiAgXG4gIHJldHVybiB0d2Vlbjtcbn1cblxuLyoqXG4gKiBSZXR1cm4gc2Nyb2xsIHBvc2l0aW9uLlxuICpcbiAqIEByZXR1cm4ge09iamVjdH1cbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbmZ1bmN0aW9uIHNjcm9sbCgpIHtcbiAgdmFyIHkgPSB3aW5kb3cucGFnZVlPZmZzZXQgfHwgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnNjcm9sbFRvcDtcbiAgdmFyIHggPSB3aW5kb3cucGFnZVhPZmZzZXQgfHwgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnNjcm9sbExlZnQ7XG4gIHJldHVybiB7IHRvcDogeSwgbGVmdDogeCB9O1xufVxuIiwiJ3VzZSBzdHJpY3QnXG5cbmltcG9ydCBzY3JvbGwgZnJvbSAnc2Nyb2xsLXRvJ1xuXG5sZXQgY2FtZWxUb0tlYmFiLCBhcHBlbmRTdHlsZVxuXG5jb25zdCBkb20gPSB7XG4gIC8qKlxuICAgKiBzY3JvbGxUb0VsZW1lbnRcbiAgICogQHBhcmFtICB7c3RyaW5nfSByZWZcbiAgICogQHBhcmFtICB7b2JqfSBvcHRpb25zIHtvZmZzZXQ6TnVtYmVyfVxuICAgKiAgIHBzOiBzY3JvbGwtdG8gaGFzICdlYXNlJyBhbmQgJ2R1cmF0aW9uJyhtcykgYXMgb3B0aW9ucy5cbiAgICovXG4gIHNjcm9sbFRvRWxlbWVudDogZnVuY3Rpb24gKHJlZiwgb3B0aW9ucykge1xuICAgICFvcHRpb25zICYmIChvcHRpb25zID0ge30pXG4gICAgY29uc3Qgb2Zmc2V0ID0gKE51bWJlcihvcHRpb25zLm9mZnNldCkgfHwgMCkgKiB0aGlzLnNjYWxlXG4gICAgY29uc3QgZWxlbSA9IHRoaXMuZ2V0Q29tcG9uZW50TWFuYWdlcigpLmdldENvbXBvbmVudChyZWYpXG4gICAgaWYgKCFlbGVtKSB7XG4gICAgICByZXR1cm4gY29uc29sZS5lcnJvcihgW2g1LXJlbmRlcl0gY29tcG9uZW50IG9mIHJlZiAke3JlZn0gZG9lc24ndCBleGlzdC5gKVxuICAgIH1cbiAgICBjb25zdCBwYXJlbnRTY3JvbGxlciA9IGVsZW0uZ2V0UGFyZW50U2Nyb2xsZXIoKVxuICAgIGlmIChwYXJlbnRTY3JvbGxlcikge1xuICAgICAgcGFyZW50U2Nyb2xsZXIuc2Nyb2xsZXIuc2Nyb2xsVG9FbGVtZW50KGVsZW0ubm9kZSwgdHJ1ZSwgb2Zmc2V0KVxuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIGNvbnN0IG9mZnNldFRvcCA9IGVsZW0ubm9kZS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS50b3BcbiAgICAgICAgICArIGRvY3VtZW50LmJvZHkuc2Nyb2xsVG9wXG4gICAgICBjb25zdCB0d2VlbiA9IHNjcm9sbCgwLCBvZmZzZXRUb3AgKyBvZmZzZXQsIG9wdGlvbnMpXG4gICAgICB0d2Vlbi5vbignZW5kJywgZnVuY3Rpb24gKCkge1xuICAgICAgICBjb25zb2xlLmxvZygnc2Nyb2xsIGVuZC4nKVxuICAgICAgfSlcbiAgICB9XG4gIH0sXG5cbiAgLyoqXG4gICAqIGdldENvbXBvbmVudFJlY3RcbiAgICogQHBhcmFtIHtzdHJpbmd9IHJlZlxuICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBjYWxsYmFja0lkXG4gICAqL1xuICBnZXRDb21wb25lbnRSZWN0OiBmdW5jdGlvbiAocmVmLCBjYWxsYmFja0lkKSB7XG4gICAgY29uc3QgaW5mbyA9IHsgcmVzdWx0OiBmYWxzZSB9XG5cbiAgICBpZiAocmVmICYmIHJlZiA9PT0gJ3ZpZXdwb3J0Jykge1xuICAgICAgaW5mby5yZXN1bHQgPSB0cnVlXG4gICAgICBpbmZvLnNpemUgPSB7XG4gICAgICAgIHdpZHRoOiBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50V2lkdGgsXG4gICAgICAgIGhlaWdodDogZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudEhlaWdodCxcbiAgICAgICAgdG9wOiAwLFxuICAgICAgICBsZWZ0OiAwLFxuICAgICAgICByaWdodDogZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudFdpZHRoLFxuICAgICAgICBib3R0b206IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRIZWlnaHRcbiAgICAgIH1cbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICBjb25zdCBlbGVtID0gdGhpcy5nZXRDb21wb25lbnRNYW5hZ2VyKCkuZ2V0Q29tcG9uZW50KHJlZilcbiAgICAgIGlmIChlbGVtICYmIGVsZW0ubm9kZSkge1xuICAgICAgICBpbmZvLnJlc3VsdCA9IHRydWVcbiAgICAgICAgaW5mby5zaXplID0gZWxlbS5ub2RlLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpXG4gICAgICB9XG4gICAgfVxuXG4gICAgY29uc3QgbWVzc2FnZSA9IGluZm8ucmVzdWx0ID8gaW5mbyA6IHtcbiAgICAgIHJlc3VsdDogZmFsc2UsXG4gICAgICBlcnJNc2c6ICdJbGxlZ2FsIHBhcmFtZXRlcidcbiAgICB9XG4gICAgdGhpcy5zZW5kZXIucGVyZm9ybUNhbGxiYWNrKGNhbGxiYWNrSWQsIG1lc3NhZ2UpXG4gICAgcmV0dXJuIG1lc3NhZ2VcbiAgfSxcblxuICAvKipcbiAgICogZm9yIGFkZGluZyBmb250RmFjZVxuICAgKiBAcGFyYW0ge3N0cmluZ30ga2V5IGZvbnRGYWNlXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBzdHlsZXMgcnVsZXNcbiAgICovXG4gIGFkZFJ1bGU6IGZ1bmN0aW9uIChrZXksIHN0eWxlcykge1xuICAgIGtleSA9IGNhbWVsVG9LZWJhYihrZXkpXG4gICAgbGV0IHN0eWxlc1RleHQgPSAnJ1xuICAgIGZvciAoY29uc3QgayBpbiBzdHlsZXMpIHtcbiAgICAgIGlmIChzdHlsZXMuaGFzT3duUHJvcGVydHkoaykpIHtcbiAgICAgICAgc3R5bGVzVGV4dCArPSBjYW1lbFRvS2ViYWIoaykgKyAnOicgKyBzdHlsZXNba10gKyAnOydcbiAgICAgIH1cbiAgICB9XG4gICAgY29uc3Qgc3R5bGVUZXh0ID0gYEAke2tleX17JHtzdHlsZXNUZXh0fX1gXG4gICAgYXBwZW5kU3R5bGUoc3R5bGVUZXh0LCAnZG9tLWFkZGVkLXJ1bGVzJylcbiAgfVxufVxuXG5jb25zdCBtZXRhID0ge1xuICBkb206IFt7XG4gICAgbmFtZTogJ3Njcm9sbFRvRWxlbWVudCcsXG4gICAgYXJnczogWydzdHJpbmcnLCAnb2JqZWN0J11cbiAgfSwge1xuICAgIG5hbWU6ICdnZXRDb21wb25lbnRSZWN0JyxcbiAgICBhcmdzOiBbJ3N0cmluZycsICdmdW5jdGlvbiddXG4gIH0sIHtcbiAgICBuYW1lOiAnYWRkUnVsZScsXG4gICAgYXJnczogWydzdHJpbmcnLCAnb2JqZWN0J11cbiAgfV1cbn1cblxuZXhwb3J0IGRlZmF1bHQge1xuICBpbml0OiBmdW5jdGlvbiAoV2VleCkge1xuICAgIGNhbWVsVG9LZWJhYiA9IFdlZXgudXRpbHMuY2FtZWxUb0tlYmFiXG4gICAgYXBwZW5kU3R5bGUgPSBXZWV4LnV0aWxzLmFwcGVuZFN0eWxlXG4gICAgV2VleC5yZWdpc3RlckFwaU1vZHVsZSgnZG9tJywgZG9tLCBtZXRhKVxuICB9XG59XG4iLCIndXNlIHN0cmljdCdcblxuY29uc3QgZXZlbnQgPSB7XG4gIC8qKlxuICAgKiBvcGVuVXJsXG4gICAqIEBwYXJhbSAge3N0cmluZ30gdXJsXG4gICAqL1xuICBvcGVuVVJMOiBmdW5jdGlvbiAodXJsKSB7XG4gICAgbG9jYXRpb24uaHJlZiA9IHVybFxuICB9XG5cbn1cblxuY29uc3QgbWV0YSA9IHtcbiAgZXZlbnQ6IFt7XG4gICAgbmFtZTogJ29wZW5VUkwnLFxuICAgIGFyZ3M6IFsnc3RyaW5nJ11cbiAgfV1cbn1cblxuZXhwb3J0IGRlZmF1bHQge1xuICBpbml0OiBmdW5jdGlvbiAoV2VleCkge1xuICAgIFdlZXgucmVnaXN0ZXJBcGlNb2R1bGUoJ2V2ZW50JywgZXZlbnQsIG1ldGEpXG4gIH1cbn1cbiIsIid1c2Ugc3RyaWN0J1xuXG5jb25zdCBwYWdlSW5mbyA9IHtcblxuICBzZXRUaXRsZTogZnVuY3Rpb24gKHRpdGxlKSB7XG4gICAgdGl0bGUgPSB0aXRsZSB8fCAnV2VleCBIVE1MNSdcbiAgICB0cnkge1xuICAgICAgdGl0bGUgPSBkZWNvZGVVUklDb21wb25lbnQodGl0bGUpXG4gICAgfVxuICAgIGNhdGNoIChlKSB7fVxuICAgIGRvY3VtZW50LnRpdGxlID0gdGl0bGVcbiAgfVxufVxuXG5jb25zdCBtZXRhID0ge1xuICBwYWdlSW5mbzogW3tcbiAgICBuYW1lOiAnc2V0VGl0bGUnLFxuICAgIGFyZ3M6IFsnc3RyaW5nJ11cbiAgfV1cbn1cblxuZXhwb3J0IGRlZmF1bHQge1xuICBpbml0OiBmdW5jdGlvbiAoV2VleCkge1xuICAgIFdlZXgucmVnaXN0ZXJBcGlNb2R1bGUoJ3BhZ2VJbmZvJywgcGFnZUluZm8sIG1ldGEpXG4gIH1cbn1cbiIsIih0eXBlb2Ygd2luZG93ID09PSAndW5kZWZpbmVkJykgJiYgKHdpbmRvdyA9IHtjdHJsOiB7fSwgbGliOiB7fX0pOyF3aW5kb3cuY3RybCAmJiAod2luZG93LmN0cmwgPSB7fSk7IXdpbmRvdy5saWIgJiYgKHdpbmRvdy5saWIgPSB7fSk7IWZ1bmN0aW9uKGEsYil7ZnVuY3Rpb24gYyhhKXt2YXIgYj17fTtPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcyxcInBhcmFtc1wiLHtzZXQ6ZnVuY3Rpb24oYSl7aWYoXCJvYmplY3RcIj09dHlwZW9mIGEpe2Zvcih2YXIgYyBpbiBiKWRlbGV0ZSBiW2NdO2Zvcih2YXIgYyBpbiBhKWJbY109YVtjXX19LGdldDpmdW5jdGlvbigpe3JldHVybiBifSxlbnVtZXJhYmxlOiEwfSksT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMsXCJzZWFyY2hcIix7c2V0OmZ1bmN0aW9uKGEpe2lmKFwic3RyaW5nXCI9PXR5cGVvZiBhKXswPT09YS5pbmRleE9mKFwiP1wiKSYmKGE9YS5zdWJzdHIoMSkpO3ZhciBjPWEuc3BsaXQoXCImXCIpO2Zvcih2YXIgZCBpbiBiKWRlbGV0ZSBiW2RdO2Zvcih2YXIgZT0wO2U8Yy5sZW5ndGg7ZSsrKXt2YXIgZj1jW2VdLnNwbGl0KFwiPVwiKTtpZih2b2lkIDAhPT1mWzFdJiYoZlsxXT1mWzFdLnRvU3RyaW5nKCkpLGZbMF0pdHJ5e2JbZGVjb2RlVVJJQ29tcG9uZW50KGZbMF0pXT1kZWNvZGVVUklDb21wb25lbnQoZlsxXSl9Y2F0Y2goZyl7YltmWzBdXT1mWzFdfX19fSxnZXQ6ZnVuY3Rpb24oKXt2YXIgYT1bXTtmb3IodmFyIGMgaW4gYilpZih2b2lkIDAhPT1iW2NdKWlmKFwiXCIhPT1iW2NdKXRyeXthLnB1c2goZW5jb2RlVVJJQ29tcG9uZW50KGMpK1wiPVwiK2VuY29kZVVSSUNvbXBvbmVudChiW2NdKSl9Y2F0Y2goZCl7YS5wdXNoKGMrXCI9XCIrYltjXSl9ZWxzZSB0cnl7YS5wdXNoKGVuY29kZVVSSUNvbXBvbmVudChjKSl9Y2F0Y2goZCl7YS5wdXNoKGMpfXJldHVybiBhLmxlbmd0aD9cIj9cIithLmpvaW4oXCImXCIpOlwiXCJ9LGVudW1lcmFibGU6ITB9KTt2YXIgYztPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcyxcImhhc2hcIix7c2V0OmZ1bmN0aW9uKGEpe1wic3RyaW5nXCI9PXR5cGVvZiBhJiYoYSYmYS5pbmRleE9mKFwiI1wiKTwwJiYoYT1cIiNcIithKSxjPWF8fFwiXCIpfSxnZXQ6ZnVuY3Rpb24oKXtyZXR1cm4gY30sZW51bWVyYWJsZTohMH0pLHRoaXMuc2V0PWZ1bmN0aW9uKGEpe2E9YXx8XCJcIjt2YXIgYjtpZighKGI9YS5tYXRjaChuZXcgUmVnRXhwKFwiXihbYS16MC05LV0rOik/Wy9dezJ9KD86KFteQC86P10rKSg/OjooW15ALzpdKykpP0ApPyhbXjovPyNdKykoPzpbOl0oWzAtOV0rKSk/KFsvXVtePyM7XSopPyg/Ols/XShbXiNdKikpPyhbI11bXj9dKik/JFwiLFwiaVwiKSkpKXRocm93IG5ldyBFcnJvcihcIldyb25nIHVyaSBzY2hlbWUuXCIpO3RoaXMucHJvdG9jb2w9YlsxXXx8KFwib2JqZWN0XCI9PXR5cGVvZiBsb2NhdGlvbj9sb2NhdGlvbi5wcm90b2NvbDpcIlwiKSx0aGlzLnVzZXJuYW1lPWJbMl18fFwiXCIsdGhpcy5wYXNzd29yZD1iWzNdfHxcIlwiLHRoaXMuaG9zdG5hbWU9dGhpcy5ob3N0PWJbNF0sdGhpcy5wb3J0PWJbNV18fFwiXCIsdGhpcy5wYXRobmFtZT1iWzZdfHxcIi9cIix0aGlzLnNlYXJjaD1iWzddfHxcIlwiLHRoaXMuaGFzaD1iWzhdfHxcIlwiLHRoaXMub3JpZ2luPXRoaXMucHJvdG9jb2wrXCIvL1wiK3RoaXMuaG9zdG5hbWV9LHRoaXMudG9TdHJpbmc9ZnVuY3Rpb24oKXt2YXIgYT10aGlzLnByb3RvY29sK1wiLy9cIjtyZXR1cm4gdGhpcy51c2VybmFtZSYmKGErPXRoaXMudXNlcm5hbWUsdGhpcy5wYXNzd29yZCYmKGErPVwiOlwiK3RoaXMucGFzc3dvcmQpLGErPVwiQFwiKSxhKz10aGlzLmhvc3QsdGhpcy5wb3J0JiZcIjgwXCIhPT10aGlzLnBvcnQmJihhKz1cIjpcIit0aGlzLnBvcnQpLHRoaXMucGF0aG5hbWUmJihhKz10aGlzLnBhdGhuYW1lKSx0aGlzLnNlYXJjaCYmKGErPXRoaXMuc2VhcmNoKSx0aGlzLmhhc2gmJihhKz10aGlzLmhhc2gpLGF9LGEmJnRoaXMuc2V0KGEudG9TdHJpbmcoKSl9Yi5odHRwdXJsPWZ1bmN0aW9uKGEpe3JldHVybiBuZXcgYyhhKX19KHdpbmRvdyx3aW5kb3cubGlifHwod2luZG93LmxpYj17fSkpOzttb2R1bGUuZXhwb3J0cyA9IHdpbmRvdy5saWJbJ2h0dHB1cmwnXTsiLCIvKiBnbG9iYWwgbGliLCBYTUxIdHRwUmVxdWVzdCAqL1xuLyogZGVwczogaHR0cHVybCAqL1xuXG4ndXNlIHN0cmljdCdcblxubGV0IHV0aWxzXG5cbmltcG9ydCAnaHR0cHVybCdcblxubGV0IGpzb25wQ250ID0gMFxuY29uc3QgRVJST1JfU1RBVEUgPSAtMVxuXG5jb25zdCBUWVBFX0pTT04gPSAnYXBwbGljYXRpb24vanNvbjtjaGFyc2V0PVVURi04J1xuY29uc3QgVFlQRV9GT1JNID0gJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZCdcblxuY29uc3QgUkVHX0ZPUk0gPSAvXig/OlteJj1dKz1bXiY9XSspKD86JlteJj1dKz1bXiY9XSspKiQvXG5cbmZ1bmN0aW9uIF9qc29ucCAoY29uZmlnLCBjYWxsYmFjaywgcHJvZ3Jlc3NDYWxsYmFjaykge1xuICBjb25zdCBjYk5hbWUgPSAnanNvbnBfJyArICgrK2pzb25wQ250KVxuICBsZXQgdXJsXG5cbiAgaWYgKCFjb25maWcudXJsKSB7XG4gICAgY29uc29sZS5lcnJvcignW2g1LXJlbmRlcl0gY29uZmlnLnVybCBzaG91bGQgYmUgc2V0IGluIF9qc29ucCBmb3IgXFwnZmV0Y2hcXCcgQVBJLicpXG4gIH1cblxuICBnbG9iYWxbY2JOYW1lXSA9IChmdW5jdGlvbiAoY2IpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICBjYWxsYmFjayh7XG4gICAgICAgIHN0YXR1czogMjAwLFxuICAgICAgICBvazogdHJ1ZSxcbiAgICAgICAgc3RhdHVzVGV4dDogJ09LJyxcbiAgICAgICAgZGF0YTogcmVzcG9uc2VcbiAgICAgIH0pXG4gICAgICBkZWxldGUgZ2xvYmFsW2NiXVxuICAgIH1cbiAgfSkoY2JOYW1lKVxuXG4gIGNvbnN0IHNjcmlwdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NjcmlwdCcpXG4gIHRyeSB7XG4gICAgdXJsID0gbGliLmh0dHB1cmwoY29uZmlnLnVybClcbiAgfVxuICBjYXRjaCAoZXJyKSB7XG4gICAgY29uc29sZS5lcnJvcignW2g1LXJlbmRlcl0gaW52YWxpZCBjb25maWcudXJsIGluIF9qc29ucCBmb3IgXFwnZmV0Y2hcXCcgQVBJOiAnXG4gICAgICArIGNvbmZpZy51cmwpXG4gIH1cbiAgdXJsLnBhcmFtcy5jYWxsYmFjayA9IGNiTmFtZVxuICBzY3JpcHQudHlwZSA9ICd0ZXh0L2phdmFzY3JpcHQnXG4gIHNjcmlwdC5zcmMgPSB1cmwudG9TdHJpbmcoKVxuICAvLyBzY3JpcHQub25lcnJvciBpcyBub3Qgd29ya2luZyBvbiBJRSBvciBzYWZhcmkuXG4gIC8vIGJ1dCB0aGV5IGFyZSBub3QgY29uc2lkZXJlZCBoZXJlLlxuICBzY3JpcHQub25lcnJvciA9IChmdW5jdGlvbiAoY2IpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gKGVycikge1xuICAgICAgY29uc29sZS5lcnJvcignW2g1LXJlbmRlcl0gdW5leHBlY3RlZCBlcnJvciBpbiBfanNvbnAgZm9yIFxcJ2ZldGNoXFwnIEFQSScsIGVycilcbiAgICAgIGNhbGxiYWNrKHtcbiAgICAgICAgc3RhdHVzOiBFUlJPUl9TVEFURSxcbiAgICAgICAgb2s6IGZhbHNlLFxuICAgICAgICBzdGF0dXNUZXh0OiAnJyxcbiAgICAgICAgZGF0YTogJydcbiAgICAgIH0pXG4gICAgICBkZWxldGUgZ2xvYmFsW2NiXVxuICAgIH1cbiAgfSkoY2JOYW1lKVxuICBjb25zdCBoZWFkID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2hlYWQnKVswXVxuICBoZWFkLmluc2VydEJlZm9yZShzY3JpcHQsIG51bGwpXG59XG5cbmZ1bmN0aW9uIF94aHIgKGNvbmZpZywgY2FsbGJhY2ssIHByb2dyZXNzQ2FsbGJhY2spIHtcbiAgY29uc3QgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KClcbiAgeGhyLnJlc3BvbnNlVHlwZSA9IGNvbmZpZy50eXBlXG4gIHhoci5vcGVuKGNvbmZpZy5tZXRob2QsIGNvbmZpZy51cmwsIHRydWUpXG5cbiAgLy8gY29ycyBjb29raWUgc3VwcG9ydFxuICBpZiAoY29uZmlnLndpdGhDcmVkZW50aWFscyA9PT0gdHJ1ZSkge1xuICAgIHhoci53aXRoQ3JlZGVudGlhbHMgPSB0cnVlXG4gIH1cblxuICBjb25zdCBoZWFkZXJzID0gY29uZmlnLmhlYWRlcnMgfHwge31cbiAgZm9yIChjb25zdCBrIGluIGhlYWRlcnMpIHtcbiAgICB4aHIuc2V0UmVxdWVzdEhlYWRlcihrLCBoZWFkZXJzW2tdKVxuICB9XG5cbiAgeGhyLm9ubG9hZCA9IGZ1bmN0aW9uIChyZXMpIHtcbiAgICBjYWxsYmFjayh7XG4gICAgICBzdGF0dXM6IHhoci5zdGF0dXMsXG4gICAgICBvazogeGhyLnN0YXR1cyA+PSAyMDAgJiYgeGhyLnN0YXR1cyA8IDMwMCxcbiAgICAgIHN0YXR1c1RleHQ6IHhoci5zdGF0dXNUZXh0LFxuICAgICAgZGF0YTogeGhyLnJlc3BvbnNlLFxuICAgICAgaGVhZGVyczogeGhyLmdldEFsbFJlc3BvbnNlSGVhZGVycygpLnNwbGl0KCdcXG4nKVxuICAgICAgICAucmVkdWNlKGZ1bmN0aW9uIChvYmosIGhlYWRlclN0cikge1xuICAgICAgICAgIGNvbnN0IGhlYWRlckFyciA9IGhlYWRlclN0ci5tYXRjaCgvKC4rKTogKC4rKS8pXG4gICAgICAgICAgaWYgKGhlYWRlckFycikge1xuICAgICAgICAgICAgb2JqW2hlYWRlckFyclsxXV0gPSBoZWFkZXJBcnJbMl1cbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIG9ialxuICAgICAgICB9LCB7fSlcbiAgICB9KVxuICB9XG5cbiAgaWYgKHByb2dyZXNzQ2FsbGJhY2spIHtcbiAgICB4aHIub25wcm9ncmVzcyA9IGZ1bmN0aW9uIChlKSB7XG4gICAgICBwcm9ncmVzc0NhbGxiYWNrKHtcbiAgICAgICAgcmVhZHlTdGF0ZTogeGhyLnJlYWR5U3RhdGUsXG4gICAgICAgIHN0YXR1czogeGhyLnN0YXR1cyxcbiAgICAgICAgbGVuZ3RoOiBlLmxvYWRlZCxcbiAgICAgICAgdG90YWw6IGUudG90YWwsXG4gICAgICAgIHN0YXR1c1RleHQ6IHhoci5zdGF0dXNUZXh0LFxuICAgICAgICBoZWFkZXJzOiB4aHIuZ2V0QWxsUmVzcG9uc2VIZWFkZXJzKCkuc3BsaXQoJ1xcbicpXG4gICAgICAgICAgLnJlZHVjZShmdW5jdGlvbiAob2JqLCBoZWFkZXJTdHIpIHtcbiAgICAgICAgICAgIGNvbnN0IGhlYWRlckFyciA9IGhlYWRlclN0ci5tYXRjaCgvKC4rKTogKC4rKS8pXG4gICAgICAgICAgICBpZiAoaGVhZGVyQXJyKSB7XG4gICAgICAgICAgICAgIG9ialtoZWFkZXJBcnJbMV1dID0gaGVhZGVyQXJyWzJdXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gb2JqXG4gICAgICAgICAgfSwge30pXG4gICAgICB9KVxuICAgIH1cbiAgfVxuXG4gIHhoci5vbmVycm9yID0gZnVuY3Rpb24gKGVycikge1xuICAgIGNvbnNvbGUuZXJyb3IoJ1toNS1yZW5kZXJdIHVuZXhwZWN0ZWQgZXJyb3IgaW4gX3hociBmb3IgXFwnZmV0Y2hcXCcgQVBJJywgZXJyKVxuICAgIGNhbGxiYWNrKHtcbiAgICAgIHN0YXR1czogRVJST1JfU1RBVEUsXG4gICAgICBvazogZmFsc2UsXG4gICAgICBzdGF0dXNUZXh0OiAnJyxcbiAgICAgIGRhdGE6ICcnXG4gICAgfSlcbiAgfVxuXG4gIHhoci5zZW5kKGNvbmZpZy5ib2R5KVxufVxuXG5jb25zdCBzdHJlYW0gPSB7XG5cbiAgLyoqXG4gICAqIHNlbmRIdHRwXG4gICAqIEBkZXByZWNhdGVkXG4gICAqIE5vdGU6IFRoaXMgQVBJIGlzIGRlcHJlY2F0ZWQuIFBsZWFzZSB1c2Ugc3RyZWFtLmZldGNoIGluc3RlYWQuXG4gICAqIHNlbmQgYSBodHRwIHJlcXVlc3QgdGhyb3VnaCBYSFIuXG4gICAqIEBwYXJhbSAge29ian0gcGFyYW1zXG4gICAqICAtIG1ldGhvZDogJ0dFVCcgfCAnUE9TVCcgfCAnUFVUJyB8ICdERUxFVEUnIHwgJ0hFQUQnIHwgJ1BBVENIJyxcbiAgICogIC0gdXJsOiB1cmwgcmVxdWVzdGVkXG4gICAqIEBwYXJhbSAge3N0cmluZ30gY2FsbGJhY2tJZFxuICAgKi9cbiAgc2VuZEh0dHA6IGZ1bmN0aW9uIChwYXJhbSwgY2FsbGJhY2tJZCkge1xuICAgIGlmICh0eXBlb2YgcGFyYW0gPT09ICdzdHJpbmcnKSB7XG4gICAgICB0cnkge1xuICAgICAgICBwYXJhbSA9IEpTT04ucGFyc2UocGFyYW0pXG4gICAgICB9XG4gICAgICBjYXRjaCAoZSkge1xuICAgICAgICByZXR1cm5cbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKHR5cGVvZiBwYXJhbSAhPT0gJ29iamVjdCcgfHwgIXBhcmFtLnVybCkge1xuICAgICAgcmV0dXJuIGNvbnNvbGUuZXJyb3IoXG4gICAgICAgICdbaDUtcmVuZGVyXSBpbnZhbGlkIGNvbmZpZyBvciBpbnZhbGlkIGNvbmZpZy51cmwgZm9yIHNlbmRIdHRwIEFQSScpXG4gICAgfVxuXG4gICAgY29uc3Qgc2VuZGVyID0gdGhpcy5zZW5kZXJcbiAgICBjb25zdCBtZXRob2QgPSBwYXJhbS5tZXRob2QgfHwgJ0dFVCdcbiAgICBjb25zdCB4aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKVxuICAgIHhoci5vcGVuKG1ldGhvZCwgcGFyYW0udXJsLCB0cnVlKVxuICAgIHhoci5vbmxvYWQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICBzZW5kZXIucGVyZm9ybUNhbGxiYWNrKGNhbGxiYWNrSWQsIHRoaXMucmVzcG9uc2VUZXh0KVxuICAgIH1cbiAgICB4aHIub25lcnJvciA9IGZ1bmN0aW9uIChlcnJvcikge1xuICAgICAgcmV0dXJuIGNvbnNvbGUuZXJyb3IoJ1toNS1yZW5kZXJdIHVuZXhwZWN0ZWQgZXJyb3IgaW4gc2VuZEh0dHAgQVBJJywgZXJyb3IpXG4gICAgICAvLyBzZW5kZXIucGVyZm9ybUNhbGxiYWNrKFxuICAgICAgLy8gICBjYWxsYmFja0lkLFxuICAgICAgLy8gICBuZXcgRXJyb3IoJ3VuZXhwZWN0ZWQgZXJyb3IgaW4gc2VuZEh0dHAgQVBJJylcbiAgICAgIC8vIClcbiAgICB9XG4gICAgeGhyLnNlbmQoKVxuICB9LFxuXG4gIC8qKlxuICAgKiBmZXRjaFxuICAgKiB1c2Ugc3RyZWFtLmZldGNoIHRvIHJlcXVlc3QgZm9yIGEganNvbiBmaWxlLCBhIHBsYWluIHRleHQgZmlsZSBvclxuICAgKiBhIGFycmF5YnVmZmVyIGZvciBhIGZpbGUgc3RyZWFtLiAoWW91IGNhbiB1c2UgQmxvYiBhbmQgRmlsZVJlYWRlclxuICAgKiBBUEkgaW1wbGVtZW50ZWQgYnkgbW9zdCBtb2Rlcm4gYnJvd3NlcnMgdG8gcmVhZCBhIGFycmF5YnVmZmVyLilcbiAgICogQHBhcmFtICB7b2JqZWN0fSBvcHRpb25zIGNvbmZpZyBvcHRpb25zXG4gICAqICAgLSBtZXRob2Q6ICdHRVQnIHwgJ1BPU1QnIHwgJ1BVVCcgfCAnREVMRVRFJyB8ICdIRUFEJyB8ICdQQVRDSCdcbiAgICogICAtIGhlYWRlcnMge29ian1cbiAgICogICAtIHVybCB7c3RyaW5nfVxuICAgKiAgIC0gbW9kZSB7c3RyaW5nfSAnY29ycycgfCAnbm8tY29ycycgfCAnc2FtZS1vcmlnaW4nIHwgJ25hdmlnYXRlJ1xuICAgKiAgIC0gd2l0aENyZWRlbnRpYWxzIHtib29sZWFufVxuICAgKiAgIC0gYm9keVxuICAgKiAgIC0gdHlwZSB7c3RyaW5nfSAnanNvbicgfCAnanNvbnAnIHwgJ3RleHQnXG4gICAqIEBwYXJhbSAge3N0cmluZ30gY2FsbGJhY2tJZFxuICAgKiBAcGFyYW0gIHtzdHJpbmd9IHByb2dyZXNzQ2FsbGJhY2tJZFxuICAgKi9cbiAgZmV0Y2g6IGZ1bmN0aW9uIChvcHRpb25zLCBjYWxsYmFja0lkLCBwcm9ncmVzc0NhbGxiYWNrSWQpIHtcbiAgICBjb25zdCBERUZBVUxUX01FVEhPRCA9ICdHRVQnXG4gICAgY29uc3QgREVGQVVMVF9NT0RFID0gJ2NvcnMnXG4gICAgY29uc3QgREVGQVVMVF9UWVBFID0gJ3RleHQnXG5cbiAgICBjb25zdCBtZXRob2RPcHRpb25zID0gWydHRVQnLCAnUE9TVCcsICdQVVQnLCAnREVMRVRFJywgJ0hFQUQnLCAnUEFUQ0gnXVxuICAgIGNvbnN0IG1vZGVPcHRpb25zID0gWydjb3JzJywgJ25vLWNvcnMnLCAnc2FtZS1vcmlnaW4nLCAnbmF2aWdhdGUnXVxuICAgIGNvbnN0IHR5cGVPcHRpb25zID0gWyd0ZXh0JywgJ2pzb24nLCAnanNvbnAnLCAnYXJyYXlidWZmZXInXVxuXG4gICAgLy8gY29uc3QgZmFsbGJhY2sgPSBmYWxzZSAgLy8gZmFsbGJhY2sgZnJvbSAnZmV0Y2gnIEFQSSB0byBYSFIuXG4gICAgY29uc3Qgc2VuZGVyID0gdGhpcy5zZW5kZXJcblxuICAgIGNvbnN0IGNvbmZpZyA9IHV0aWxzLmV4dGVuZCh7fSwgb3B0aW9ucylcblxuICAgIC8vIHZhbGlkYXRlIG9wdGlvbnMubWV0aG9kXG4gICAgaWYgKHR5cGVvZiBjb25maWcubWV0aG9kID09PSAndW5kZWZpbmVkJykge1xuICAgICAgY29uZmlnLm1ldGhvZCA9IERFRkFVTFRfTUVUSE9EXG4gICAgICBjb25zb2xlLndhcm4oJ1toNS1yZW5kZXJdIG9wdGlvbnMubWV0aG9kIGZvciBcXCdmZXRjaFxcJyBBUEkgaGFzIGJlZW4gc2V0IHRvICdcbiAgICAgICAgKyAnZGVmYXVsdCB2YWx1ZSBcXCcnICsgY29uZmlnLm1ldGhvZCArICdcXCcnKVxuICAgIH1cbiAgICBlbHNlIGlmIChtZXRob2RPcHRpb25zLmluZGV4T2YoKGNvbmZpZy5tZXRob2QgKyAnJylcbiAgICAgICAgLnRvVXBwZXJDYXNlKCkpID09PSAtMSkge1xuICAgICAgcmV0dXJuIGNvbnNvbGUuZXJyb3IoJ1toNS1yZW5kZXJdIG9wdGlvbnMubWV0aG9kIFxcJydcbiAgICAgICAgKyBjb25maWcubWV0aG9kXG4gICAgICAgICsgJ1xcJyBmb3IgXFwnZmV0Y2hcXCcgQVBJIHNob3VsZCBiZSBvbmUgb2YgJ1xuICAgICAgICArIG1ldGhvZE9wdGlvbnMgKyAnLicpXG4gICAgfVxuXG4gICAgLy8gdmFsaWRhdGUgb3B0aW9ucy51cmxcbiAgICBpZiAoIWNvbmZpZy51cmwpIHtcbiAgICAgIHJldHVybiBjb25zb2xlLmVycm9yKCdbaDUtcmVuZGVyXSBvcHRpb25zLnVybCBzaG91bGQgYmUgc2V0IGZvciBcXCdmZXRjaFxcJyBBUEkuJylcbiAgICB9XG5cbiAgICAvLyB2YWxpZGF0ZSBvcHRpb25zLm1vZGVcbiAgICBpZiAodHlwZW9mIGNvbmZpZy5tb2RlID09PSAndW5kZWZpbmVkJykge1xuICAgICAgY29uZmlnLm1vZGUgPSBERUZBVUxUX01PREVcbiAgICB9XG4gICAgZWxzZSBpZiAobW9kZU9wdGlvbnMuaW5kZXhPZigoY29uZmlnLm1vZGUgKyAnJykudG9Mb3dlckNhc2UoKSkgPT09IC0xKSB7XG4gICAgICByZXR1cm4gY29uc29sZS5lcnJvcignW2g1LXJlbmRlcl0gb3B0aW9ucy5tb2RlIFxcJydcbiAgICAgICAgKyBjb25maWcubW9kZVxuICAgICAgICArICdcXCcgZm9yIFxcJ2ZldGNoXFwnIEFQSSBzaG91bGQgYmUgb25lIG9mICdcbiAgICAgICAgKyBtb2RlT3B0aW9ucyArICcuJylcbiAgICB9XG5cbiAgICAvLyB2YWxpZGF0ZSBvcHRpb25zLnR5cGVcbiAgICBpZiAodHlwZW9mIGNvbmZpZy50eXBlID09PSAndW5kZWZpbmVkJykge1xuICAgICAgY29uZmlnLnR5cGUgPSBERUZBVUxUX1RZUEVcbiAgICAgIGNvbnNvbGUud2FybignW2g1LXJlbmRlcl0gb3B0aW9ucy50eXBlIGZvciBcXCdmZXRjaFxcJyBBUEkgaGFzIGJlZW4gc2V0IHRvICdcbiAgICAgICAgKyAnZGVmYXVsdCB2YWx1ZSBcXCcnICsgY29uZmlnLnR5cGUgKyAnXFwnLicpXG4gICAgfVxuICAgIGVsc2UgaWYgKHR5cGVPcHRpb25zLmluZGV4T2YoKGNvbmZpZy50eXBlICsgJycpLnRvTG93ZXJDYXNlKCkpID09PSAtMSkge1xuICAgICAgcmV0dXJuIGNvbnNvbGUuZXJyb3IoJ1toNS1yZW5kZXJdIG9wdGlvbnMudHlwZSBcXCcnXG4gICAgICAgICAgKyBjb25maWcudHlwZVxuICAgICAgICAgICsgJ1xcJyBmb3IgXFwnZmV0Y2hcXCcgQVBJIHNob3VsZCBiZSBvbmUgb2YgJ1xuICAgICAgICAgICsgdHlwZU9wdGlvbnMgKyAnLicpXG4gICAgfVxuXG4gICAgLy8gdmFsaWRhdGUgb3B0aW9ucy5oZWFkZXJzXG4gICAgY29uZmlnLmhlYWRlcnMgPSBjb25maWcuaGVhZGVycyB8fCB7fVxuICAgIGlmICghdXRpbHMuaXNQbGFpbk9iamVjdChjb25maWcuaGVhZGVycykpIHtcbiAgICAgIHJldHVybiBjb25zb2xlLmVycm9yKCdbaDUtcmVuZGVyXSBvcHRpb25zLmhlYWRlcnMgc2hvdWxkIGJlIGEgcGxhaW4gb2JqZWN0JylcbiAgICB9XG5cbiAgICAvLyB2YWxpZGF0ZSBvcHRpb25zLmJvZHlcbiAgICBjb25zdCBib2R5ID0gY29uZmlnLmJvZHlcbiAgICBpZiAoIWNvbmZpZy5oZWFkZXJzWydDb250ZW50LVR5cGUnXSAmJiBib2R5KSB7XG4gICAgICBpZiAodXRpbHMuaXNQbGFpbk9iamVjdChib2R5KSkge1xuICAgICAgICAvLyBpcyBhIGpzb24gZGF0YVxuICAgICAgICB0cnkge1xuICAgICAgICAgIGNvbmZpZy5ib2R5ID0gSlNPTi5zdHJpbmdpZnkoYm9keSlcbiAgICAgICAgICBjb25maWcuaGVhZGVyc1snQ29udGVudC1UeXBlJ10gPSBUWVBFX0pTT05cbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZSkge31cbiAgICAgIH1cbiAgICAgIGVsc2UgaWYgKHV0aWxzLmdldFR5cGUoYm9keSkgPT09ICdzdHJpbmcnICYmIGJvZHkubWF0Y2goUkVHX0ZPUk0pKSB7XG4gICAgICAgIC8vIGlzIGZvcm0tZGF0YVxuICAgICAgICBjb25maWcuYm9keSA9IGVuY29kZVVSSShib2R5KVxuICAgICAgICBjb25maWcuaGVhZGVyc1snQ29udGVudC1UeXBlJ10gPSBUWVBFX0ZPUk1cbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyB2YWxpZGF0ZSBvcHRpb25zLnRpbWVvdXRcbiAgICBjb25maWcudGltZW91dCA9IHBhcnNlSW50KGNvbmZpZy50aW1lb3V0LCAxMCkgfHwgMjUwMFxuXG4gICAgY29uc3QgX2NhbGxBcmdzID0gW2NvbmZpZywgZnVuY3Rpb24gKHJlcykge1xuICAgICAgc2VuZGVyLnBlcmZvcm1DYWxsYmFjayhjYWxsYmFja0lkLCByZXMpXG4gICAgfV1cbiAgICBpZiAocHJvZ3Jlc3NDYWxsYmFja0lkKSB7XG4gICAgICBfY2FsbEFyZ3MucHVzaChmdW5jdGlvbiAocmVzKSB7XG4gICAgICAgIC8vIFNldCAna2VlcEFsaXZlJyB0byB0cnVlIGZvciBzZW5kaW5nIGNvbnRpbnVvdXMgY2FsbGJhY2tzXG4gICAgICAgIHNlbmRlci5wZXJmb3JtQ2FsbGJhY2socHJvZ3Jlc3NDYWxsYmFja0lkLCByZXMsIHRydWUpXG4gICAgICB9KVxuICAgIH1cblxuICAgIGlmIChjb25maWcudHlwZSA9PT0gJ2pzb25wJykge1xuICAgICAgX2pzb25wLmFwcGx5KHRoaXMsIF9jYWxsQXJncylcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICBfeGhyLmFwcGx5KHRoaXMsIF9jYWxsQXJncylcbiAgICB9XG4gIH1cblxufVxuXG5jb25zdCBtZXRhID0ge1xuICBzdHJlYW06IFt7XG4gICAgbmFtZTogJ3NlbmRIdHRwJyxcbiAgICBhcmdzOiBbJ29iamVjdCcsICdmdW5jdGlvbiddXG4gIH0sIHtcbiAgICBuYW1lOiAnZmV0Y2gnLFxuICAgIGFyZ3M6IFsnb2JqZWN0JywgJ2Z1bmN0aW9uJywgJ2Z1bmN0aW9uJ11cbiAgfV1cbn1cblxuZXhwb3J0IGRlZmF1bHQge1xuICBpbml0OiBmdW5jdGlvbiAoV2VleCkge1xuICAgIHV0aWxzID0gV2VleC51dGlsc1xuICAgIFdlZXgucmVnaXN0ZXJBcGlNb2R1bGUoJ3N0cmVhbScsIHN0cmVhbSwgbWV0YSlcbiAgfVxufVxuIiwiJ3VzZSBzdHJpY3QnXG5cbnJlcXVpcmUoJy4uL3N0eWxlcy9tb2RhbC5jc3MnKVxuXG4vLyB0aGVyZSB3aWxsIGJlIG9ubHkgb25lIGluc3RhbmNlIG9mIG1vZGFsLlxudmFyIE1PREFMX1dSQVBfQ0xBU1MgPSAnYW1mZS1tb2RhbC13cmFwJ1xudmFyIE1PREFMX05PREVfQ0xBU1MgPSAnYW1mZS1tb2RhbC1ub2RlJ1xuXG5mdW5jdGlvbiBNb2RhbCgpIHtcbiAgdGhpcy53cmFwID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihNT0RBTF9XUkFQX0NMQVNTKVxuICB0aGlzLm5vZGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKE1PREFMX05PREVfQ0xBU1MpXG4gIGlmICghdGhpcy53cmFwKSB7XG4gICAgdGhpcy5jcmVhdGVXcmFwKClcbiAgfVxuICBpZiAoIXRoaXMubm9kZSkge1xuICAgIHRoaXMuY3JlYXRlTm9kZSgpXG4gIH1cbiAgdGhpcy5jbGVhck5vZGUoKVxuICB0aGlzLmNyZWF0ZU5vZGVDb250ZW50KClcbiAgdGhpcy5iaW5kRXZlbnRzKClcbn1cblxuTW9kYWwucHJvdG90eXBlID0ge1xuXG4gIHNob3c6IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLndyYXAuc3R5bGUuZGlzcGxheSA9ICdibG9jaydcbiAgICB0aGlzLm5vZGUuY2xhc3NMaXN0LnJlbW92ZSgnaGlkZScpXG4gIH0sXG5cbiAgZGVzdHJveTogZnVuY3Rpb24gKCkge1xuICAgIGRvY3VtZW50LmJvZHkucmVtb3ZlQ2hpbGQodGhpcy53cmFwKVxuICAgIGRvY3VtZW50LmJvZHkucmVtb3ZlQ2hpbGQodGhpcy5ub2RlKVxuICAgIHRoaXMud3JhcCA9IG51bGxcbiAgICB0aGlzLm5vZGUgPSBudWxsXG4gIH0sXG5cbiAgY3JlYXRlV3JhcDogZnVuY3Rpb24gKCkge1xuICAgIHRoaXMud3JhcCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gICAgdGhpcy53cmFwLmNsYXNzTmFtZSA9IE1PREFMX1dSQVBfQ0xBU1NcbiAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHRoaXMud3JhcClcbiAgfSxcblxuICBjcmVhdGVOb2RlOiBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5ub2RlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgICB0aGlzLm5vZGUuY2xhc3NMaXN0LmFkZChNT0RBTF9OT0RFX0NMQVNTLCAnaGlkZScpXG4gICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZCh0aGlzLm5vZGUpXG4gIH0sXG5cbiAgY2xlYXJOb2RlOiBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5ub2RlLmlubmVySFRNTCA9ICcnXG4gIH0sXG5cbiAgY3JlYXRlTm9kZUNvbnRlbnQ6IGZ1bmN0aW9uICgpIHtcblxuICAgIC8vIGRvIG5vdGhpbmcuXG4gICAgLy8gY2hpbGQgY2xhc3NlcyBjYW4gb3ZlcnJpZGUgdGhpcyBtZXRob2QuXG4gIH0sXG5cbiAgYmluZEV2ZW50czogZnVuY3Rpb24gKCkge1xuICAgIHRoaXMud3JhcC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KClcbiAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKClcbiAgICB9KVxuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gTW9kYWxcbiIsIid1c2Ugc3RyaWN0J1xuXG52YXIgTW9kYWwgPSByZXF1aXJlKCcuL21vZGFsJylcbnJlcXVpcmUoJy4uL3N0eWxlcy9hbGVydC5jc3MnKVxuXG52YXIgQ09OVEVOVF9DTEFTUyA9ICdjb250ZW50J1xudmFyIE1TR19DTEFTUyA9ICdjb250ZW50LW1zZydcbnZhciBCVVRUT05fR1JPVVBfQ0xBU1MgPSAnYnRuLWdyb3VwJ1xudmFyIEJVVFRPTl9DTEFTUyA9ICdidG4nXG5cbmZ1bmN0aW9uIEFsZXJ0KGNvbmZpZykge1xuICB0aGlzLm1zZyA9IGNvbmZpZy5tZXNzYWdlIHx8ICcnXG4gIHRoaXMuY2FsbGJhY2sgPSBjb25maWcuY2FsbGJhY2tcbiAgdGhpcy5va1RpdGxlID0gY29uZmlnLm9rVGl0bGUgfHwgJ09LJ1xuICBNb2RhbC5jYWxsKHRoaXMpXG4gIHRoaXMubm9kZS5jbGFzc0xpc3QuYWRkKCdhbWZlLWFsZXJ0Jylcbn1cblxuQWxlcnQucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShNb2RhbC5wcm90b3R5cGUpXG5cbkFsZXJ0LnByb3RvdHlwZS5jcmVhdGVOb2RlQ29udGVudCA9IGZ1bmN0aW9uICgpIHtcbiAgdmFyIGNvbnRlbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuICBjb250ZW50LmNsYXNzTGlzdC5hZGQoQ09OVEVOVF9DTEFTUylcbiAgdGhpcy5ub2RlLmFwcGVuZENoaWxkKGNvbnRlbnQpXG5cbiAgdmFyIG1zZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gIG1zZy5jbGFzc0xpc3QuYWRkKE1TR19DTEFTUylcbiAgbXNnLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKHRoaXMubXNnKSlcbiAgY29udGVudC5hcHBlbmRDaGlsZChtc2cpXG5cbiAgdmFyIGJ1dHRvbkdyb3VwID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgYnV0dG9uR3JvdXAuY2xhc3NMaXN0LmFkZChCVVRUT05fR1JPVVBfQ0xBU1MpXG4gIHRoaXMubm9kZS5hcHBlbmRDaGlsZChidXR0b25Hcm91cClcbiAgdmFyIGJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gIGJ1dHRvbi5jbGFzc0xpc3QuYWRkKEJVVFRPTl9DTEFTUywgJ2FsZXJ0LW9rJylcbiAgYnV0dG9uLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKHRoaXMub2tUaXRsZSkpXG4gIGJ1dHRvbkdyb3VwLmFwcGVuZENoaWxkKGJ1dHRvbilcbn1cblxuQWxlcnQucHJvdG90eXBlLmJpbmRFdmVudHMgPSBmdW5jdGlvbiAoKSB7XG4gIE1vZGFsLnByb3RvdHlwZS5iaW5kRXZlbnRzLmNhbGwodGhpcylcbiAgdmFyIGJ1dHRvbiA9IHRoaXMubm9kZS5xdWVyeVNlbGVjdG9yKCcuJyArIEJVVFRPTl9DTEFTUylcbiAgYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuZGVzdHJveSgpXG4gICAgdGhpcy5jYWxsYmFjayAmJiB0aGlzLmNhbGxiYWNrKClcbiAgfS5iaW5kKHRoaXMpKVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IEFsZXJ0XG4iLCIndXNlIHN0cmljdCdcblxudmFyIE1vZGFsID0gcmVxdWlyZSgnLi9tb2RhbCcpXG5yZXF1aXJlKCcuLi9zdHlsZXMvY29uZmlybS5jc3MnKVxuXG52YXIgQ09OVEVOVF9DTEFTUyA9ICdjb250ZW50J1xudmFyIE1TR19DTEFTUyA9ICdjb250ZW50LW1zZydcbnZhciBCVVRUT05fR1JPVVBfQ0xBU1MgPSAnYnRuLWdyb3VwJ1xudmFyIEJVVFRPTl9DTEFTUyA9ICdidG4nXG5cbmZ1bmN0aW9uIENvbmZpcm0oY29uZmlnKSB7XG4gIHRoaXMubXNnID0gY29uZmlnLm1lc3NhZ2UgfHwgJydcbiAgdGhpcy5jYWxsYmFjayA9IGNvbmZpZy5jYWxsYmFja1xuICB0aGlzLm9rVGl0bGUgPSBjb25maWcub2tUaXRsZSB8fCAnT0snXG4gIHRoaXMuY2FuY2VsVGl0bGUgPSBjb25maWcuY2FuY2VsVGl0bGUgfHwgJ0NhbmNlbCdcbiAgTW9kYWwuY2FsbCh0aGlzKVxuICB0aGlzLm5vZGUuY2xhc3NMaXN0LmFkZCgnYW1mZS1jb25maXJtJylcbn1cblxuQ29uZmlybS5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKE1vZGFsLnByb3RvdHlwZSlcblxuQ29uZmlybS5wcm90b3R5cGUuY3JlYXRlTm9kZUNvbnRlbnQgPSBmdW5jdGlvbiAoKSB7XG4gIHZhciBjb250ZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgY29udGVudC5jbGFzc0xpc3QuYWRkKENPTlRFTlRfQ0xBU1MpXG4gIHRoaXMubm9kZS5hcHBlbmRDaGlsZChjb250ZW50KVxuXG4gIHZhciBtc2cgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuICBtc2cuY2xhc3NMaXN0LmFkZChNU0dfQ0xBU1MpXG4gIG1zZy5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZSh0aGlzLm1zZykpXG4gIGNvbnRlbnQuYXBwZW5kQ2hpbGQobXNnKVxuXG4gIHZhciBidXR0b25Hcm91cCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gIGJ1dHRvbkdyb3VwLmNsYXNzTGlzdC5hZGQoQlVUVE9OX0dST1VQX0NMQVNTKVxuICB0aGlzLm5vZGUuYXBwZW5kQ2hpbGQoYnV0dG9uR3JvdXApXG4gIHZhciBidG5PayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gIGJ0bk9rLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKHRoaXMub2tUaXRsZSkpXG4gIGJ0bk9rLmNsYXNzTGlzdC5hZGQoJ2J0bi1vaycsIEJVVFRPTl9DTEFTUylcbiAgdmFyIGJ0bkNhbmNlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gIGJ0bkNhbmNlbC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZSh0aGlzLmNhbmNlbFRpdGxlKSlcbiAgYnRuQ2FuY2VsLmNsYXNzTGlzdC5hZGQoJ2J0bi1jYW5jZWwnLCBCVVRUT05fQ0xBU1MpXG4gIGJ1dHRvbkdyb3VwLmFwcGVuZENoaWxkKGJ0bk9rKVxuICBidXR0b25Hcm91cC5hcHBlbmRDaGlsZChidG5DYW5jZWwpXG4gIHRoaXMubm9kZS5hcHBlbmRDaGlsZChidXR0b25Hcm91cClcbn1cblxuQ29uZmlybS5wcm90b3R5cGUuYmluZEV2ZW50cyA9IGZ1bmN0aW9uICgpIHtcbiAgTW9kYWwucHJvdG90eXBlLmJpbmRFdmVudHMuY2FsbCh0aGlzKVxuICB2YXIgYnRuT2sgPSB0aGlzLm5vZGUucXVlcnlTZWxlY3RvcignLicgKyBCVVRUT05fQ0xBU1MgKyAnLmJ0bi1vaycpXG4gIHZhciBidG5DYW5jZWwgPSB0aGlzLm5vZGUucXVlcnlTZWxlY3RvcignLicgKyBCVVRUT05fQ0xBU1MgKyAnLmJ0bi1jYW5jZWwnKVxuICBidG5Pay5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLmRlc3Ryb3koKVxuICAgIHRoaXMuY2FsbGJhY2sgJiYgdGhpcy5jYWxsYmFjayh0aGlzLm9rVGl0bGUpXG4gIH0uYmluZCh0aGlzKSlcbiAgYnRuQ2FuY2VsLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuZGVzdHJveSgpXG4gICAgdGhpcy5jYWxsYmFjayAmJiB0aGlzLmNhbGxiYWNrKHRoaXMuY2FuY2VsVGl0bGUpXG4gIH0uYmluZCh0aGlzKSlcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBDb25maXJtXG4iLCIndXNlIHN0cmljdCdcblxudmFyIE1vZGFsID0gcmVxdWlyZSgnLi9tb2RhbCcpXG5yZXF1aXJlKCcuLi9zdHlsZXMvcHJvbXB0LmNzcycpXG5cbnZhciBDT05URU5UX0NMQVNTID0gJ2NvbnRlbnQnXG52YXIgTVNHX0NMQVNTID0gJ2NvbnRlbnQtbXNnJ1xudmFyIEJVVFRPTl9HUk9VUF9DTEFTUyA9ICdidG4tZ3JvdXAnXG52YXIgQlVUVE9OX0NMQVNTID0gJ2J0bidcbnZhciBJTlBVVF9XUkFQX0NMQVNTID0gJ2lucHV0LXdyYXAnXG52YXIgSU5QVVRfQ0xBU1MgPSAnaW5wdXQnXG5cbmZ1bmN0aW9uIFByb21wdChjb25maWcpIHtcbiAgdGhpcy5tc2cgPSBjb25maWcubWVzc2FnZSB8fCAnJ1xuICB0aGlzLmRlZmF1bHRNc2cgPSBjb25maWcuZGVmYXVsdCB8fCAnJ1xuICB0aGlzLmNhbGxiYWNrID0gY29uZmlnLmNhbGxiYWNrXG4gIHRoaXMub2tUaXRsZSA9IGNvbmZpZy5va1RpdGxlIHx8ICdPSydcbiAgdGhpcy5jYW5jZWxUaXRsZSA9IGNvbmZpZy5jYW5jZWxUaXRsZSB8fCAnQ2FuY2VsJ1xuICBNb2RhbC5jYWxsKHRoaXMpXG4gIHRoaXMubm9kZS5jbGFzc0xpc3QuYWRkKCdhbWZlLXByb21wdCcpXG59XG5cblByb21wdC5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKE1vZGFsLnByb3RvdHlwZSlcblxuUHJvbXB0LnByb3RvdHlwZS5jcmVhdGVOb2RlQ29udGVudCA9IGZ1bmN0aW9uICgpIHtcblxuICB2YXIgY29udGVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gIGNvbnRlbnQuY2xhc3NMaXN0LmFkZChDT05URU5UX0NMQVNTKVxuICB0aGlzLm5vZGUuYXBwZW5kQ2hpbGQoY29udGVudClcblxuICB2YXIgbXNnID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgbXNnLmNsYXNzTGlzdC5hZGQoTVNHX0NMQVNTKVxuICBtc2cuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUodGhpcy5tc2cpKVxuICBjb250ZW50LmFwcGVuZENoaWxkKG1zZylcblxuICB2YXIgaW5wdXRXcmFwID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgaW5wdXRXcmFwLmNsYXNzTGlzdC5hZGQoSU5QVVRfV1JBUF9DTEFTUylcbiAgY29udGVudC5hcHBlbmRDaGlsZChpbnB1dFdyYXApXG4gIHZhciBpbnB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0JylcbiAgaW5wdXQuY2xhc3NMaXN0LmFkZChJTlBVVF9DTEFTUylcbiAgaW5wdXQudHlwZSA9ICd0ZXh0J1xuICBpbnB1dC5hdXRvZm9jdXMgPSB0cnVlXG4gIGlucHV0LnBsYWNlaG9sZGVyID0gdGhpcy5kZWZhdWx0TXNnXG4gIGlucHV0V3JhcC5hcHBlbmRDaGlsZChpbnB1dClcblxuICB2YXIgYnV0dG9uR3JvdXAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuICBidXR0b25Hcm91cC5jbGFzc0xpc3QuYWRkKEJVVFRPTl9HUk9VUF9DTEFTUylcbiAgdmFyIGJ0bk9rID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgYnRuT2suYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUodGhpcy5va1RpdGxlKSlcbiAgYnRuT2suY2xhc3NMaXN0LmFkZCgnYnRuLW9rJywgQlVUVE9OX0NMQVNTKVxuICB2YXIgYnRuQ2FuY2VsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgYnRuQ2FuY2VsLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKHRoaXMuY2FuY2VsVGl0bGUpKVxuICBidG5DYW5jZWwuY2xhc3NMaXN0LmFkZCgnYnRuLWNhbmNlbCcsIEJVVFRPTl9DTEFTUylcbiAgYnV0dG9uR3JvdXAuYXBwZW5kQ2hpbGQoYnRuT2spXG4gIGJ1dHRvbkdyb3VwLmFwcGVuZENoaWxkKGJ0bkNhbmNlbClcbiAgdGhpcy5ub2RlLmFwcGVuZENoaWxkKGJ1dHRvbkdyb3VwKVxufVxuXG5Qcm9tcHQucHJvdG90eXBlLmJpbmRFdmVudHMgPSBmdW5jdGlvbiAoKSB7XG4gIE1vZGFsLnByb3RvdHlwZS5iaW5kRXZlbnRzLmNhbGwodGhpcylcbiAgdmFyIGJ0bk9rID0gdGhpcy5ub2RlLnF1ZXJ5U2VsZWN0b3IoJy4nICsgQlVUVE9OX0NMQVNTICsgJy5idG4tb2snKVxuICB2YXIgYnRuQ2FuY2VsID0gdGhpcy5ub2RlLnF1ZXJ5U2VsZWN0b3IoJy4nICsgQlVUVE9OX0NMQVNTICsgJy5idG4tY2FuY2VsJylcbiAgdmFyIHRoYXQgPSB0aGlzXG4gIGJ0bk9rLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xuICAgIHZhciB2YWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdpbnB1dCcpLnZhbHVlXG4gICAgdGhpcy5kZXN0cm95KClcbiAgICB0aGlzLmNhbGxiYWNrICYmIHRoaXMuY2FsbGJhY2soe1xuICAgICAgcmVzdWx0OiB0aGF0Lm9rVGl0bGUsXG4gICAgICBkYXRhOiB2YWxcbiAgICB9KVxuICB9LmJpbmQodGhpcykpXG4gIGJ0bkNhbmNlbC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgdmFsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignaW5wdXQnKS52YWx1ZVxuICAgIHRoaXMuZGVzdHJveSgpXG4gICAgdGhpcy5jYWxsYmFjayAmJiB0aGlzLmNhbGxiYWNrKHtcbiAgICAgIHJlc3VsdDogdGhhdC5jYW5jZWxUaXRsZSxcbiAgICAgIGRhdGE6IHZhbFxuICAgIH0pXG4gIH0uYmluZCh0aGlzKSlcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBQcm9tcHRcbiIsIid1c2Ugc3RyaWN0J1xuXG5yZXF1aXJlKCcuLi9zdHlsZXMvdG9hc3QuY3NzJylcblxudmFyIHF1ZXVlID0gW11cbnZhciB0aW1lclxudmFyIGlzUHJvY2Vzc2luZyA9IGZhbHNlXG52YXIgdG9hc3RXaW5cbnZhciBUT0FTVF9XSU5fQ0xBU1NfTkFNRSA9ICdhbWZlLXRvYXN0J1xuXG52YXIgREVGQVVMVF9EVVJBVElPTiA9IDAuOFxudmFyIFRSQU5TSVRJT05fVElNRSA9IDAuNFxuXG5mdW5jdGlvbiBzaG93VG9hc3RXaW5kb3cobXNnLCBjYWxsYmFjaykge1xuICB2YXIgaGFuZGxlVHJhbnNpdGlvbkVuZCA9IGZ1bmN0aW9uICgpIHtcbiAgICB0b2FzdFdpbi5yZW1vdmVFdmVudExpc3RlbmVyKCd0cmFuc2l0aW9uZW5kJywgaGFuZGxlVHJhbnNpdGlvbkVuZClcbiAgICB0b2FzdFdpbi5yZW1vdmVFdmVudExpc3RlbmVyKCd3ZWJraXRUcmFuc2l0aW9uRW5kJywgaGFuZGxlVHJhbnNpdGlvbkVuZClcbiAgICBjYWxsYmFjayAmJiBjYWxsYmFjaygpXG4gIH1cbiAgaWYgKCF0b2FzdFdpbikge1xuICAgIHRvYXN0V2luID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgICB0b2FzdFdpbi5jbGFzc0xpc3QuYWRkKFRPQVNUX1dJTl9DTEFTU19OQU1FLCAnaGlkZScpXG4gICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZCh0b2FzdFdpbilcbiAgfVxuICB0b2FzdFdpbi5pbm5lckhUTUwgPSBtc2dcbiAgdG9hc3RXaW4uYWRkRXZlbnRMaXN0ZW5lcigndHJhbnNpdGlvbmVuZCcsIGhhbmRsZVRyYW5zaXRpb25FbmQpXG4gIHRvYXN0V2luLmFkZEV2ZW50TGlzdGVuZXIoJ3dlYmtpdFRyYW5zaXRpb25FbmQnLCBoYW5kbGVUcmFuc2l0aW9uRW5kKVxuICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICB0b2FzdFdpbi5jbGFzc0xpc3QucmVtb3ZlKCdoaWRlJylcbiAgfSwgMClcbiAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgY2FsbGJhY2sgJiYgY2FsbGJhY2soKVxuICB9LCBUUkFOU0lUSU9OX1RJTUUgKiAxMDAwKVxufVxuXG5mdW5jdGlvbiBoaWRlVG9hc3RXaW5kb3coY2FsbGJhY2spIHtcbiAgdmFyIGhhbmRsZVRyYW5zaXRpb25FbmQgPSBmdW5jdGlvbiAoKSB7XG4gICAgdG9hc3RXaW4ucmVtb3ZlRXZlbnRMaXN0ZW5lcigndHJhbnNpdGlvbmVuZCcsIGhhbmRsZVRyYW5zaXRpb25FbmQpXG4gICAgdG9hc3RXaW4ucmVtb3ZlRXZlbnRMaXN0ZW5lcignd2Via2l0VHJhbnNpdGlvbkVuZCcsIGhhbmRsZVRyYW5zaXRpb25FbmQpXG4gICAgY2FsbGJhY2sgJiYgY2FsbGJhY2soKVxuICB9XG4gIGlmICghdG9hc3RXaW4pIHtcbiAgICByZXR1cm5cbiAgfVxuICB0b2FzdFdpbi5hZGRFdmVudExpc3RlbmVyKCd0cmFuc2l0aW9uZW5kJywgaGFuZGxlVHJhbnNpdGlvbkVuZClcbiAgdG9hc3RXaW4uYWRkRXZlbnRMaXN0ZW5lcignd2Via2l0VHJhbnNpdGlvbkVuZCcsIGhhbmRsZVRyYW5zaXRpb25FbmQpXG4gIHRvYXN0V2luLmNsYXNzTGlzdC5hZGQoJ2hpZGUnKVxuICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICBjYWxsYmFjayAmJiBjYWxsYmFjaygpXG4gIH0sIFRSQU5TSVRJT05fVElNRSAqIDEwMDApXG59XG5cbnZhciB0b2FzdCA9IHtcblxuICBwdXNoOiBmdW5jdGlvbiAobXNnLCBkdXJhdGlvbikge1xuICAgIHF1ZXVlLnB1c2goe1xuICAgICAgbXNnOiBtc2csXG4gICAgICBkdXJhdGlvbjogZHVyYXRpb24gfHwgREVGQVVMVF9EVVJBVElPTlxuICAgIH0pXG4gICAgdGhpcy5zaG93KClcbiAgfSxcblxuICBzaG93OiBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIHRoYXQgPSB0aGlzXG5cbiAgICAvLyBBbGwgbWVzc2FnZXMgaGFkIGJlZW4gdG9hc3RlZCBhbHJlYWR5LCBzbyByZW1vdmUgdGhlIHRvYXN0IHdpbmRvdyxcbiAgICBpZiAoIXF1ZXVlLmxlbmd0aCkge1xuICAgICAgdG9hc3RXaW4gJiYgdG9hc3RXaW4ucGFyZW50Tm9kZS5yZW1vdmVDaGlsZCh0b2FzdFdpbilcbiAgICAgIHRvYXN0V2luID0gbnVsbFxuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgLy8gdGhlIHByZXZpb3VzIHRvYXN0IGlzIG5vdCBlbmRlZCB5ZXQuXG4gICAgaWYgKGlzUHJvY2Vzc2luZykge1xuICAgICAgcmV0dXJuXG4gICAgfVxuICAgIGlzUHJvY2Vzc2luZyA9IHRydWVcblxuICAgIHZhciB0b2FzdEluZm8gPSBxdWV1ZS5zaGlmdCgpXG4gICAgc2hvd1RvYXN0V2luZG93KHRvYXN0SW5mby5tc2csIGZ1bmN0aW9uICgpIHtcbiAgICAgIHRpbWVyID0gc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRpbWVyID0gbnVsbFxuICAgICAgICBoaWRlVG9hc3RXaW5kb3coZnVuY3Rpb24gKCkge1xuICAgICAgICAgIGlzUHJvY2Vzc2luZyA9IGZhbHNlXG4gICAgICAgICAgdGhhdC5zaG93KClcbiAgICAgICAgfSlcbiAgICAgIH0sIHRvYXN0SW5mby5kdXJhdGlvbiAqIDEwMDApXG4gICAgfSlcbiAgfVxuXG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBwdXNoOiB0b2FzdC5wdXNoLmJpbmQodG9hc3QpXG59XG4iLCIndXNlIHN0cmljdCdcblxudmFyIEFsZXJ0ID0gcmVxdWlyZSgnLi9hbGVydCcpXG52YXIgQ29uZmlybSA9IHJlcXVpcmUoJy4vY29uZmlybScpXG52YXIgUHJvbXB0ID0gcmVxdWlyZSgnLi9wcm9tcHQnKVxudmFyIHRvYXN0ID0gcmVxdWlyZSgnLi90b2FzdCcpXG5cbnZhciBtb2RhbCA9IHtcblxuICB0b2FzdDogZnVuY3Rpb24gKG1zZywgZHVyYXRpb24pIHtcbiAgICB0b2FzdC5wdXNoKG1zZywgZHVyYXRpb24pXG4gIH0sXG5cbiAgYWxlcnQ6IGZ1bmN0aW9uIChjb25maWcpIHtcbiAgICBuZXcgQWxlcnQoY29uZmlnKS5zaG93KClcbiAgfSxcblxuICBwcm9tcHQ6IGZ1bmN0aW9uIChjb25maWcpIHtcbiAgICBuZXcgUHJvbXB0KGNvbmZpZykuc2hvdygpXG4gIH0sXG5cbiAgY29uZmlybTogZnVuY3Rpb24gKGNvbmZpZykge1xuICAgIG5ldyBDb25maXJtKGNvbmZpZykuc2hvdygpXG4gIH1cblxufVxuXG4hd2luZG93LmxpYiAmJiAod2luZG93LmxpYiA9IHt9KVxud2luZG93LmxpYi5tb2RhbCA9IG1vZGFsXG5cbm1vZHVsZS5leHBvcnRzID0gbW9kYWwiLCIndXNlIHN0cmljdCdcblxuaW1wb3J0IG1vZGFsIGZyb20gJ21vZGFscydcblxuY29uc3QgbXNnID0ge1xuXG4gIC8vIGR1cmF0aW9uOiBkZWZhdWx0IGlzIDAuOCBzZWNvbmRzLlxuICB0b2FzdDogZnVuY3Rpb24gKGNvbmZpZykge1xuICAgIG1vZGFsLnRvYXN0KGNvbmZpZy5tZXNzYWdlLCBjb25maWcuZHVyYXRpb24pXG4gIH0sXG5cbiAgLy8gY29uZmlnOlxuICAvLyAgLSBtZXNzYWdlOiBzdHJpbmdcbiAgLy8gIC0gb2tUaXRsZTogdGl0bGUgb2Ygb2sgYnV0dG9uXG4gIC8vICAtIGNhbGxiYWNrXG4gIGFsZXJ0OiBmdW5jdGlvbiAoY29uZmlnLCBjYWxsYmFja0lkKSB7XG4gICAgY29uc3Qgc2VuZGVyID0gdGhpcy5zZW5kZXJcbiAgICBjb25maWcuY2FsbGJhY2sgPSBmdW5jdGlvbiAoKSB7XG4gICAgICBzZW5kZXIucGVyZm9ybUNhbGxiYWNrKGNhbGxiYWNrSWQpXG4gICAgfVxuICAgIG1vZGFsLmFsZXJ0KGNvbmZpZylcbiAgfSxcblxuICAvLyBjb25maWc6XG4gIC8vICAtIG1lc3NhZ2U6IHN0cmluZ1xuICAvLyAgLSBva1RpdGxlOiB0aXRsZSBvZiBvayBidXR0b25cbiAgLy8gIC0gY2FuY2VsVGl0bGU6IHRpdGxlIG9mIGNhbmNlbCBidXR0b25cbiAgLy8gIC0gY2FsbGJhY2tcbiAgY29uZmlybTogZnVuY3Rpb24gKGNvbmZpZywgY2FsbGJhY2tJZCkge1xuICAgIGNvbnN0IHNlbmRlciA9IHRoaXMuc2VuZGVyXG4gICAgY29uZmlnLmNhbGxiYWNrID0gZnVuY3Rpb24gKHZhbCkge1xuICAgICAgc2VuZGVyLnBlcmZvcm1DYWxsYmFjayhjYWxsYmFja0lkLCB2YWwpXG4gICAgfVxuICAgIG1vZGFsLmNvbmZpcm0oY29uZmlnKVxuICB9LFxuXG4gIC8vIGNvbmZpZzpcbiAgLy8gIC0gbWVzc2FnZTogc3RyaW5nXG4gIC8vICAtIG9rVGl0bGU6IHRpdGxlIG9mIG9rIGJ1dHRvblxuICAvLyAgLSBjYW5jZWxUaXRsZTogdGl0bGUgb2YgY2FuY2VsIGJ1dHRvblxuICAvLyAgLSBjYWxsYmFja1xuICBwcm9tcHQ6IGZ1bmN0aW9uIChjb25maWcsIGNhbGxiYWNrSWQpIHtcbiAgICBjb25zdCBzZW5kZXIgPSB0aGlzLnNlbmRlclxuICAgIGNvbmZpZy5jYWxsYmFjayA9IGZ1bmN0aW9uICh2YWwpIHtcbiAgICAgIHNlbmRlci5wZXJmb3JtQ2FsbGJhY2soY2FsbGJhY2tJZCwgdmFsKVxuICAgIH1cbiAgICBtb2RhbC5wcm9tcHQoY29uZmlnKVxuICB9XG59XG5cbmNvbnN0IG1ldGEgPSB7XG4gIG1vZGFsOiBbe1xuICAgIG5hbWU6ICd0b2FzdCcsXG4gICAgYXJnczogWydvYmplY3QnXVxuICB9LCB7XG4gICAgbmFtZTogJ2FsZXJ0JyxcbiAgICBhcmdzOiBbJ29iamVjdCcsICdmdW5jdGlvbiddXG4gIH0sIHtcbiAgICBuYW1lOiAnY29uZmlybScsXG4gICAgYXJnczogWydvYmplY3QnLCAnZnVuY3Rpb24nXVxuICB9LCB7XG4gICAgbmFtZTogJ3Byb21wdCcsXG4gICAgYXJnczogWydvYmplY3QnLCAnZnVuY3Rpb24nXVxuICB9XVxufVxuXG5leHBvcnQgZGVmYXVsdCB7XG4gIGluaXQ6IGZ1bmN0aW9uIChXZWV4KSB7XG4gICAgV2VleC5yZWdpc3RlckFwaU1vZHVsZSgnbW9kYWwnLCBtc2csIG1ldGEpXG4gIH1cbn1cbiIsIid1c2Ugc3RyaWN0J1xuXG4vKipcbiAqIGNvbmZpZzpcbiAqICAgLSBzdHlsZXNcbiAqICAgLSBkdXJhdGlvbiBbTnVtYmVyXSBtaWxsaXNlY29uZHMobXMpXG4gKiAgIC0gdGltaW5nRnVuY3Rpb24gW3N0cmluZ11cbiAqICAgLSBkZWFseSBbTnVtYmVyXSBtaWxsaXNlY29uZHMobXMpXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB0cmFuc2l0aW9uT25jZSAoY29tcCwgY29uZmlnLCBjYWxsYmFjaykge1xuICBjb25zdCBzdHlsZXMgPSBjb25maWcuc3R5bGVzIHx8IHt9XG4gIGNvbnN0IGR1cmF0aW9uID0gY29uZmlnLmR1cmF0aW9uIHx8IDEwMDAgLy8gbXNcbiAgY29uc3QgdGltaW5nRnVuY3Rpb24gPSBjb25maWcudGltaW5nRnVuY3Rpb24gfHwgJ2Vhc2UnXG4gIGNvbnN0IGRlbGF5ID0gY29uZmlnLmRlbGF5IHx8IDAgIC8vIG1zXG4gIGNvbnN0IHRyYW5zaXRpb25WYWx1ZSA9ICdhbGwgJyArIGR1cmF0aW9uICsgJ21zICdcbiAgICAgICsgdGltaW5nRnVuY3Rpb24gKyAnICcgKyBkZWxheSArICdtcydcbiAgY29uc3QgZG9tID0gY29tcC5ub2RlXG4gIGNvbnN0IHRyYW5zaXRpb25FbmRIYW5kbGVyID0gZnVuY3Rpb24gKGUpIHtcbiAgICBlLnN0b3BQcm9wYWdhdGlvbigpXG4gICAgZG9tLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3dlYmtpdFRyYW5zaXRpb25FbmQnLCB0cmFuc2l0aW9uRW5kSGFuZGxlcilcbiAgICBkb20ucmVtb3ZlRXZlbnRMaXN0ZW5lcigndHJhbnNpdGlvbmVuZCcsIHRyYW5zaXRpb25FbmRIYW5kbGVyKVxuICAgIGRvbS5zdHlsZS50cmFuc2l0aW9uID0gJydcbiAgICBkb20uc3R5bGUud2Via2l0VHJhbnNpdGlvbiA9ICcnXG4gICAgY2FsbGJhY2soKVxuICB9XG4gIGRvbS5zdHlsZS50cmFuc2l0aW9uID0gdHJhbnNpdGlvblZhbHVlXG4gIGRvbS5zdHlsZS53ZWJraXRUcmFuc2l0aW9uID0gdHJhbnNpdGlvblZhbHVlXG4gIGRvbS5hZGRFdmVudExpc3RlbmVyKCd3ZWJraXRUcmFuc2l0aW9uRW5kJywgdHJhbnNpdGlvbkVuZEhhbmRsZXIpXG4gIGRvbS5hZGRFdmVudExpc3RlbmVyKCd0cmFuc2l0aW9uZW5kJywgdHJhbnNpdGlvbkVuZEhhbmRsZXIpXG4gIGNvbXAudXBkYXRlU3R5bGUoc3R5bGVzKVxufVxuIiwiJ3VzZSBzdHJpY3QnXG5cbmltcG9ydCB7IHRyYW5zaXRpb25PbmNlIH0gZnJvbSAnLi9saWInXG5cbmNvbnN0IF9kYXRhID0ge31cblxuY29uc3QgYW5pbWF0aW9uID0ge1xuXG4gIC8qKlxuICAgKiB0cmFuc2l0aW9uXG4gICAqIEBwYXJhbSAge3N0cmluZ30gcmVmICAgICAgICBbZGVzY3JpcHRpb25dXG4gICAqIEBwYXJhbSAge29ian0gY29uZmlnICAgICBbZGVzY3JpcHRpb25dXG4gICAqIEBwYXJhbSAge3N0cmluZ30gY2FsbGJhY2tJZCBbZGVzY3JpcHRpb25dXG4gICAqL1xuICB0cmFuc2l0aW9uOiBmdW5jdGlvbiAocmVmLCBjb25maWcsIGNhbGxiYWNrSWQpIHtcbiAgICBsZXQgcmVmRGF0YSA9IF9kYXRhW3JlZl1cbiAgICBjb25zdCBzdHlsZXNLZXkgPSBKU09OLnN0cmluZ2lmeShjb25maWcuc3R5bGVzKVxuICAgIGNvbnN0IHdlZXhJbnN0YW5jZSA9IHRoaXNcbiAgICAvLyBJZiB0aGUgc2FtZSBjb21wb25lbnQgcGVyZm9ybSBhIGFuaW1hdGlvbiB3aXRoIGV4YWN0bHkgdGhlIHNhbWVcbiAgICAvLyBzdHlsZXMgaW4gYSBzZXF1ZW5jZSB3aXRoIHNvIHNob3J0IGludGVydmFsIHRoYXQgdGhlIHByZXYgYW5pbWF0aW9uXG4gICAgLy8gaXMgc3RpbGwgaW4gcGxheWluZywgdGhlbiB0aGUgbmV4dCBhbmltYXRpb24gc2hvdWxkIGJlIGlnbm9yZWQuXG4gICAgaWYgKHJlZkRhdGEgJiYgcmVmRGF0YVtzdHlsZXNLZXldKSB7XG4gICAgICByZXR1cm5cbiAgICB9XG4gICAgaWYgKCFyZWZEYXRhKSB7XG4gICAgICByZWZEYXRhID0gX2RhdGFbcmVmXSA9IHt9XG4gICAgfVxuICAgIHJlZkRhdGFbc3R5bGVzS2V5XSA9IHRydWVcblxuICAgIGNvbnN0IGNvbXBvbmVudCA9IHRoaXMuZ2V0Q29tcG9uZW50TWFuYWdlcigpLmdldENvbXBvbmVudChyZWYpXG4gICAgcmV0dXJuIHRyYW5zaXRpb25PbmNlKGNvbXBvbmVudCwgY29uZmlnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAvLyBSZW1vdmUgdGhlIHN0eWxlc0tleSBpbiByZWZEYXRhIHNvIHRoYXQgdGhlIHNhbWUgYW5pbWF0aW9uXG4gICAgICAvLyBjYW4gYmUgcGxheWVkIGFnYWluIGFmdGVyIGN1cnJlbnQgYW5pbWF0aW9uIGlzIGFscmVhZHkgZmluaXNoZWQuXG4gICAgICBkZWxldGUgcmVmRGF0YVtzdHlsZXNLZXldXG4gICAgICB3ZWV4SW5zdGFuY2Uuc2VuZGVyLnBlcmZvcm1DYWxsYmFjayhjYWxsYmFja0lkKVxuICAgIH0pXG4gIH1cbn1cblxuY29uc3QgbWV0YSA9IHtcbiAgYW5pbWF0aW9uOiBbe1xuICAgIG5hbWU6ICd0cmFuc2l0aW9uJyxcbiAgICBhcmdzOiBbJ3N0cmluZycsICdvYmplY3QnLCAnZnVuY3Rpb24nXVxuICB9XVxufVxuXG5leHBvcnQgZGVmYXVsdCB7XG4gIGluaXQ6IGZ1bmN0aW9uIChXZWV4KSB7XG4gICAgV2VleC5yZWdpc3RlckFwaU1vZHVsZSgnYW5pbWF0aW9uJywgYW5pbWF0aW9uLCBtZXRhKVxuICB9XG59XG4iLCIndXNlIHN0cmljdCdcblxuY29uc3Qgd2VidmlldyA9IHtcblxuICAvLyByZWY6IHJlZiBvZiB0aGUgd2ViIGNvbXBvbmVudC5cbiAgZ29CYWNrOiBmdW5jdGlvbiAocmVmKSB7XG4gICAgY29uc3Qgd2ViQ29tcCA9IHRoaXMuZ2V0Q29tcG9uZW50TWFuYWdlcigpLmdldENvbXBvbmVudChyZWYpXG4gICAgaWYgKCF3ZWJDb21wLmdvQmFjaykge1xuICAgICAgY29uc29sZS5lcnJvcignZXJyb3I6IHRoZSBzcGVjaWZpZWQgY29tcG9uZW50IGhhcyBubyBtZXRob2Qgb2YnXG4gICAgICAgICAgKyAnIGdvQmFjay4gUGxlYXNlIG1ha2Ugc3VyZSBpdCBpcyBhIHdlYnZpZXcgY29tcG9uZW50LicpXG4gICAgICByZXR1cm5cbiAgICB9XG4gICAgd2ViQ29tcC5nb0JhY2soKVxuICB9LFxuXG4gIC8vIHJlZjogcmVmIG9mIHRoZSB3ZWIgY29tcG9uZW50LlxuICBnb0ZvcndhcmQ6IGZ1bmN0aW9uIChyZWYpIHtcbiAgICBjb25zdCB3ZWJDb21wID0gdGhpcy5nZXRDb21wb25lbnRNYW5hZ2VyKCkuZ2V0Q29tcG9uZW50KHJlZilcbiAgICBpZiAoIXdlYkNvbXAuZ29Gb3J3YXJkKSB7XG4gICAgICBjb25zb2xlLmVycm9yKCdlcnJvcjogdGhlIHNwZWNpZmllZCBjb21wb25lbnQgaGFzIG5vIG1ldGhvZCBvZidcbiAgICAgICAgICArICcgZ29Gb3J3YXJkLiBQbGVhc2UgbWFrZSBzdXJlIGl0IGlzIGEgd2VidmlldyBjb21wb25lbnQuJylcbiAgICAgIHJldHVyblxuICAgIH1cbiAgICB3ZWJDb21wLmdvRm9yd2FyZCgpXG4gIH0sXG5cbiAgLy8gcmVmOiByZWYgb2YgdGhlIHdlYiBjb21wb25lbnQuXG4gIHJlbG9hZDogZnVuY3Rpb24gKHJlZikge1xuICAgIGNvbnN0IHdlYkNvbXAgPSB0aGlzLmdldENvbXBvbmVudE1hbmFnZXIoKS5nZXRDb21wb25lbnQocmVmKVxuICAgIGlmICghd2ViQ29tcC5yZWxvYWQpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoJ2Vycm9yOiB0aGUgc3BlY2lmaWVkIGNvbXBvbmVudCBoYXMgbm8gbWV0aG9kIG9mJ1xuICAgICAgICAgICsgJyByZWxvYWQuIFBsZWFzZSBtYWtlIHN1cmUgaXQgaXMgYSB3ZWJ2aWV3IGNvbXBvbmVudC4nKVxuICAgICAgcmV0dXJuXG4gICAgfVxuICAgIHdlYkNvbXAucmVsb2FkKClcbiAgfVxuXG59XG5cbmNvbnN0IG1ldGEgPSB7XG4gIHdlYnZpZXc6IFt7XG4gICAgbmFtZTogJ2dvQmFjaycsXG4gICAgYXJnczogWydzdHJpbmcnXVxuICB9LCB7XG4gICAgbmFtZTogJ2dvRm9yd2FyZCcsXG4gICAgYXJnczogWydzdHJpbmcnXVxuICB9LCB7XG4gICAgbmFtZTogJ3JlbG9hZCcsXG4gICAgYXJnczogWydzdHJpbmcnXVxuICB9XVxufVxuXG5leHBvcnQgZGVmYXVsdCB7XG4gIGluaXQ6IGZ1bmN0aW9uIChXZWV4KSB7XG4gICAgV2VleC5yZWdpc3RlckFwaU1vZHVsZSgnd2VidmlldycsIHdlYnZpZXcsIG1ldGEpXG4gIH1cbn1cbiIsIid1c2Ugc3RyaWN0J1xuXG5jb25zdCBuYXZpZ2F0b3IgPSB7XG5cbiAgLy8gY29uZmlnXG4gIC8vICAtIHVybDogdGhlIHVybCB0byBwdXNoXG4gIC8vICAtIGFuaW1hdGVkOiB0aGlzIGNvbmZpZ3VyYXRpb24gaXRlbSBpcyBuYXRpdmUgb25seVxuICAvLyAgY2FsbGJhY2sgaXMgbm90IGN1cnJlbnRseSBzdXBwb3J0ZWRcbiAgcHVzaDogZnVuY3Rpb24gKGNvbmZpZywgY2FsbGJhY2tJZCkge1xuICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gY29uZmlnLnVybFxuICAgIHRoaXMuc2VuZGVyLnBlcmZvcm1DYWxsYmFjayhjYWxsYmFja0lkKVxuICB9LFxuXG4gIC8vIGNvbmZpZ1xuICAvLyAgLSBhbmltYXRlZDogdGhpcyBjb25maWd1cmF0aW9uIGl0ZW0gaXMgbmF0aXZlIG9ubHlcbiAgLy8gIGNhbGxiYWNrIGlzIG5vdGUgY3VycmVudGx5IHN1cHBvcnRlZFxuICBwb3A6IGZ1bmN0aW9uIChjb25maWcsIGNhbGxiYWNrSWQpIHtcbiAgICB3aW5kb3cuaGlzdG9yeS5iYWNrKClcbiAgICB0aGlzLnNlbmRlci5wZXJmb3JtQ2FsbGJhY2soY2FsbGJhY2tJZClcbiAgfVxuXG59XG5cbmNvbnN0IG1ldGEgPSB7XG4gIG5hdmlnYXRvcjogW3tcbiAgICBuYW1lOiAncHVzaCcsXG4gICAgYXJnczogWydvYmplY3QnLCAnZnVuY3Rpb24nXVxuICB9LCB7XG4gICAgbmFtZTogJ3BvcCcsXG4gICAgYXJnczogWydvYmplY3QnLCAnZnVuY3Rpb24nXVxuICB9XVxufVxuXG5leHBvcnQgZGVmYXVsdCB7XG4gIGluaXQ6IGZ1bmN0aW9uIChXZWV4KSB7XG4gICAgV2VleC5yZWdpc3RlckFwaU1vZHVsZSgnbmF2aWdhdG9yJywgbmF2aWdhdG9yLCBtZXRhKVxuICB9XG59XG4iLCIvKiBnbG9iYWwgbG9jYWxTdG9yYWdlICovXG4ndXNlIHN0cmljdCdcblxuY29uc3Qgc3VwcG9ydExvY2FsU3RvcmFnZSA9IHR5cGVvZiBsb2NhbFN0b3JhZ2UgIT09ICd1bmRlZmluZWQnXG5jb25zdCBTVUNDRVNTID0gJ3N1Y2Nlc3MnXG5jb25zdCBGQUlMRUQgPSAnZmFpbGVkJ1xuY29uc3QgSU5WQUxJRF9QQVJBTSA9ICdpbnZhbGlkX3BhcmFtJ1xuY29uc3QgVU5ERUZJTkVEID0gJ3VuZGVmaW5lZCdcblxuY29uc3Qgc3RvcmFnZSA9IHtcblxuICAvKipcbiAgICogV2hlbiBwYXNzZWQgYSBrZXkgbmFtZSBhbmQgdmFsdWUsIHdpbGwgYWRkIHRoYXQga2V5IHRvIHRoZSBzdG9yYWdlLFxuICAgKiBvciB1cGRhdGUgdGhhdCBrZXkncyB2YWx1ZSBpZiBpdCBhbHJlYWR5IGV4aXN0cy5cbiAgICogQHBhcmFtIHtzdHJpbmd9IGtleVxuICAgKiBAcGFyYW0ge3N0cmluZ30gdmFsdWVcbiAgICogQHBhcmFtIHtmdW5jdGlvbn0gY2FsbGJhY2tJZFxuICAgKi9cbiAgc2V0SXRlbTogZnVuY3Rpb24gKGtleSwgdmFsdWUsIGNhbGxiYWNrSWQpIHtcbiAgICBpZiAoIXN1cHBvcnRMb2NhbFN0b3JhZ2UpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoJ3lvdXIgYnJvd3NlciBpcyBub3Qgc3VwcG9ydCBsb2NhbFN0b3JhZ2UgeWV0LicpXG4gICAgICByZXR1cm5cbiAgICB9XG4gICAgY29uc3Qgc2VuZGVyID0gdGhpcy5zZW5kZXJcbiAgICBpZiAoIWtleSB8fCAhdmFsdWUpIHtcbiAgICAgIHNlbmRlci5wZXJmb3JtQ2FsbGJhY2soY2FsbGJhY2tJZCwge1xuICAgICAgICByZXN1bHQ6ICdmYWlsZWQnLFxuICAgICAgICBkYXRhOiBJTlZBTElEX1BBUkFNXG4gICAgICB9KVxuICAgICAgcmV0dXJuXG4gICAgfVxuICAgIHRyeSB7XG4gICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShrZXksIHZhbHVlKVxuICAgICAgc2VuZGVyLnBlcmZvcm1DYWxsYmFjayhjYWxsYmFja0lkLCB7XG4gICAgICAgIHJlc3VsdDogU1VDQ0VTUyxcbiAgICAgICAgZGF0YTogVU5ERUZJTkVEXG4gICAgICB9KVxuICAgIH1cbiAgICBjYXRjaCAoZSkge1xuICAgICAgLy8gYWNjZXB0IGFueSBleGNlcHRpb24gdGhyb3duIGR1cmluZyBhIHN0b3JhZ2UgYXR0ZW1wdCBhcyBhIHF1b3RhIGVycm9yXG4gICAgICBzZW5kZXIucGVyZm9ybUNhbGxiYWNrKGNhbGxiYWNrSWQsIHtcbiAgICAgICAgcmVzdWx0OiBGQUlMRUQsXG4gICAgICAgIGRhdGE6IFVOREVGSU5FRFxuICAgICAgfSlcbiAgICB9XG4gIH0sXG5cbiAgLyoqXG4gICAqIFdoZW4gcGFzc2VkIGEga2V5IG5hbWUsIHdpbGwgcmV0dXJuIHRoYXQga2V5J3MgdmFsdWUuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBrZXlcbiAgICogQHBhcmFtIHtmdW5jdGlvbn0gY2FsbGJhY2tJZFxuICAgKi9cbiAgZ2V0SXRlbTogZnVuY3Rpb24gKGtleSwgY2FsbGJhY2tJZCkge1xuICAgIGlmICghc3VwcG9ydExvY2FsU3RvcmFnZSkge1xuICAgICAgY29uc29sZS5lcnJvcigneW91ciBicm93c2VyIGlzIG5vdCBzdXBwb3J0IGxvY2FsU3RvcmFnZSB5ZXQuJylcbiAgICAgIHJldHVyblxuICAgIH1cbiAgICBjb25zdCBzZW5kZXIgPSB0aGlzLnNlbmRlclxuICAgIGlmICgha2V5KSB7XG4gICAgICBzZW5kZXIucGVyZm9ybUNhbGxiYWNrKGNhbGxiYWNrSWQsIHtcbiAgICAgICAgcmVzdWx0OiBGQUlMRUQsXG4gICAgICAgIGRhdGE6IElOVkFMSURfUEFSQU1cbiAgICAgIH0pXG4gICAgICByZXR1cm5cbiAgICB9XG4gICAgY29uc3QgdmFsID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oa2V5KVxuICAgIHNlbmRlci5wZXJmb3JtQ2FsbGJhY2soY2FsbGJhY2tJZCwge1xuICAgICAgcmVzdWx0OiB2YWwgPyBTVUNDRVNTIDogRkFJTEVELFxuICAgICAgZGF0YTogdmFsIHx8IFVOREVGSU5FRFxuICAgIH0pXG4gIH0sXG5cbiAgLyoqXG4gICAqV2hlbiBwYXNzZWQgYSBrZXkgbmFtZSwgd2lsbCByZW1vdmUgdGhhdCBrZXkgZnJvbSB0aGUgc3RvcmFnZS5cbiAgICogQHBhcmFtIHtzdHJpbmd9IGtleVxuICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBjYWxsYmFja0lkXG4gICAqL1xuICByZW1vdmVJdGVtOiBmdW5jdGlvbiAoa2V5LCBjYWxsYmFja0lkKSB7XG4gICAgaWYgKCFzdXBwb3J0TG9jYWxTdG9yYWdlKSB7XG4gICAgICBjb25zb2xlLmVycm9yKCd5b3VyIGJyb3dzZXIgaXMgbm90IHN1cHBvcnQgbG9jYWxTdG9yYWdlIHlldC4nKVxuICAgICAgcmV0dXJuXG4gICAgfVxuICAgIGNvbnN0IHNlbmRlciA9IHRoaXMuc2VuZGVyXG4gICAgaWYgKCFrZXkpIHtcbiAgICAgIHNlbmRlci5wZXJmb3JtQ2FsbGJhY2soY2FsbGJhY2tJZCwge1xuICAgICAgICByZXN1bHQ6IEZBSUxFRCxcbiAgICAgICAgZGF0YTogSU5WQUxJRF9QQVJBTVxuICAgICAgfSlcbiAgICAgIHJldHVyblxuICAgIH1cbiAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbShrZXkpXG4gICAgc2VuZGVyLnBlcmZvcm1DYWxsYmFjayhjYWxsYmFja0lkLCB7XG4gICAgICByZXN1bHQ6IFNVQ0NFU1MsXG4gICAgICBkYXRhOiBVTkRFRklORURcbiAgICB9KVxuICB9LFxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIGFuIGludGVnZXIgcmVwcmVzZW50aW5nIHRoZSBudW1iZXIgb2YgZGF0YSBpdGVtcyBzdG9yZWQgaW4gdGhlIFN0b3JhZ2Ugb2JqZWN0LlxuICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBjYWxsYmFja0lkXG4gICAqL1xuICBsZW5ndGg6IGZ1bmN0aW9uIChjYWxsYmFja0lkKSB7XG4gICAgaWYgKCFzdXBwb3J0TG9jYWxTdG9yYWdlKSB7XG4gICAgICBjb25zb2xlLmVycm9yKCd5b3VyIGJyb3dzZXIgaXMgbm90IHN1cHBvcnQgbG9jYWxTdG9yYWdlIHlldC4nKVxuICAgICAgcmV0dXJuXG4gICAgfVxuICAgIGNvbnN0IHNlbmRlciA9IHRoaXMuc2VuZGVyXG4gICAgY29uc3QgbGVuID0gbG9jYWxTdG9yYWdlLmxlbmd0aFxuICAgIHNlbmRlci5wZXJmb3JtQ2FsbGJhY2soY2FsbGJhY2tJZCwge1xuICAgICAgcmVzdWx0OiBTVUNDRVNTLFxuICAgICAgZGF0YTogbGVuXG4gICAgfSlcbiAgfSxcblxuICAvKipcbiAgICogUmV0dXJucyBhbiBhcnJheSB0aGF0IGNvbnRhaW5zIGFsbCBrZXlzIHN0b3JlZCBpbiBTdG9yYWdlIG9iamVjdC5cbiAgICogQHBhcmFtIHtmdW5jdGlvbn0gY2FsbGJhY2tJZFxuICAgKi9cbiAgZ2V0QWxsS2V5czogZnVuY3Rpb24gKGNhbGxiYWNrSWQpIHtcbiAgICBpZiAoIXN1cHBvcnRMb2NhbFN0b3JhZ2UpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoJ3lvdXIgYnJvd3NlciBpcyBub3Qgc3VwcG9ydCBsb2NhbFN0b3JhZ2UgeWV0LicpXG4gICAgICByZXR1cm5cbiAgICB9XG4gICAgY29uc3Qgc2VuZGVyID0gdGhpcy5zZW5kZXJcbiAgICBjb25zdCBfYXJyID0gW11cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxvY2FsU3RvcmFnZS5sZW5ndGg7IGkrKykge1xuICAgICAgX2Fyci5wdXNoKGxvY2FsU3RvcmFnZS5rZXkoaSkpXG4gICAgfVxuICAgIHNlbmRlci5wZXJmb3JtQ2FsbGJhY2soY2FsbGJhY2tJZCwge1xuICAgICAgcmVzdWx0OiBTVUNDRVNTLFxuICAgICAgZGF0YTogX2FyclxuICAgIH0pXG4gIH1cbn1cblxuY29uc3QgbWV0YSA9IHtcbiAgc3RvcmFnZTogW3tcbiAgICBuYW1lOiAnc2V0SXRlbScsXG4gICAgYXJnczogWydzdHJpbmcnLCAnc3RyaW5nJywgJ2Z1bmN0aW9uJ11cbiAgfSwge1xuICAgIG5hbWU6ICdnZXRJdGVtJyxcbiAgICBhcmdzOiBbJ3N0cmluZycsICdmdW5jdGlvbiddXG4gIH0sIHtcbiAgICBuYW1lOiAncmVtb3ZlSXRlbScsXG4gICAgYXJnczogWydzdHJpbmcnLCAnZnVuY3Rpb24nXVxuICB9LCB7XG4gICAgbmFtZTogJ2xlbmd0aCcsXG4gICAgYXJnczogWydmdW5jdGlvbiddXG4gIH0sIHtcbiAgICBuYW1lOiAnZ2V0QWxsS2V5cycsXG4gICAgYXJnczogWydmdW5jdGlvbiddXG4gIH1dXG59XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgaW5pdDogZnVuY3Rpb24gKFdlZXgpIHtcbiAgICBXZWV4LnJlZ2lzdGVyQXBpTW9kdWxlKCdzdG9yYWdlJywgc3RvcmFnZSwgbWV0YSlcbiAgfVxufVxuIiwiJ3VzZSBzdHJpY3QnXG5cbi8qKlxuXG5BVUNUSU9OOlxudGFza1F1ZXVlXG5DbGlwYm9hcmQuc2V0U3RyaW5nKCkgIE5PVyBub3Qgd29ya3MsIGZhY2luZyB0byB1c2VyLWFjdCBsb3NlIG9mIHRhc2tRdWV1ZS5cblxud29ya3MgaW4gQ2hyb21lIEZpcmVmb3ggT3BlcmEuIGJ1dCBub3QgaW4gU2FmYXJpLlxuQHNlZSBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9BUEkvRG9jdW1lbnQvZXhlY0NvbW1hbmQjQnJvd3Nlcl9jb21wYXRpYmlsaXR5XG5cbkNsaXBib2FyZC5nZXRTdHJpbmcoKSB1bmltcGxlbWVudGVkLiBUaGVyZSBpcyBubyBlYXN5IHdheSB0byBkbyBwYXN0ZSBmcm9tIGNsaXBib2FyZCB0byBqcyB2YXJpYWJsZS5cblxuU28gbG9vayBvdXQgeW91ciBhcHAgYmVoYXZpb3IsIHdoZW4gZG93bmdyYWRlIHRvIGh0bWw1IHJlbmRlci5cbkFueSBpZGVhIGlzIHdlbGNvbWUuXG4qKi9cblxuY29uc3QgV0VFWF9DTElQQk9BUkRfSUQgPSAnX193ZWV4X2NsaXBib2FyZF9pZF9fJ1xuXG5jb25zdCBjbGlwYm9hcmQgPSB7XG5cbiAgZ2V0U3RyaW5nOiBmdW5jdGlvbiAoY2FsbGJhY2tJZCkge1xuICAgIC8vIG5vdCBzdXBwb3J0ZWQgaW4gaHRtbDVcbiAgICBjb25zb2xlLmxvZygnY2xpcGJvYXJkLmdldFN0cmluZygpIGlzIG5vdCBzdXBwb3J0ZWQgbm93LicpXG4gIH0sXG5cbiAgc2V0U3RyaW5nOiBmdW5jdGlvbiAodGV4dCkge1xuICAgIC8vIG5vdCBzdXBwb3J0IHNhZmFyaVxuICAgIGlmICh0eXBlb2YgdGV4dCA9PT0gJ3N0cmluZycgJiYgdGV4dCAhPT0gJycgJiYgZG9jdW1lbnQuZXhlY0NvbW1hbmQpIHtcbiAgICAgIGNvbnN0IHRlbXBJbnB1dCA9IGVsZW1lbnQoKVxuICAgICAgdGVtcElucHV0LnZhbHVlID0gdGV4dFxuXG4gICAgICB0ZW1wSW5wdXQuc2VsZWN0KClcbiAgICAgIGRvY3VtZW50LmV4ZWNDb21tYW5kKCdjb3B5JylcbiAgICAgIC8vIHZhciBvdXQgPSBkb2N1bWVudC5leGVjQ29tbWFuZCgnY29weScpO1xuICAgICAgLy8gY29uc29sZS5sb2coXCJleGVjQ29tbWFuZCBvdXQgaXMgXCIgKyBvdXQpO1xuICAgICAgdGVtcElucHV0LnZhbHVlID0gJydcbiAgICAgIHRlbXBJbnB1dC5ibHVyKClcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICBjb25zb2xlLmxvZygnb25seSBzdXBwb3J0IHN0cmluZyBpbnB1dCBub3cnKVxuICAgIH1cbiAgfVxuXG59XG5cbmZ1bmN0aW9uIGVsZW1lbnQgKCkge1xuICBsZXQgdGVtcElucHV0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoV0VFWF9DTElQQk9BUkRfSUQpXG4gIGlmICh0ZW1wSW5wdXQgPT09IHVuZGVmaW5lZCkge1xuICAgIHRlbXBJbnB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0JylcbiAgICB0ZW1wSW5wdXQuc2V0QXR0cmlidXRlKCdpZCcsIFdFRVhfQ0xJUEJPQVJEX0lEKVxuICAgIHRlbXBJbnB1dC5zdHlsZS5jc3NUZXh0ID0gJ2hlaWdodDoxcHg7d2lkdGg6MXB4O2JvcmRlcjpub25lOydcbiAgICAvLyB0ZW1wSW5wdXQuc3R5bGUuY3NzVGV4dCA9IFwiaGVpZ2h0OjQwcHg7d2lkdGg6MzAwcHg7Ym9yZGVyOnNvbGlkO1wiXG4gICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZCh0ZW1wSW5wdXQpXG4gIH1cbiAgcmV0dXJuIHRlbXBJbnB1dFxufVxuXG5jb25zdCBtZXRhID0ge1xuICBjbGlwYm9hcmQ6IFt7XG4gICAgbmFtZTogJ2dldFN0cmluZycsXG4gICAgYXJnczogWydmdW5jdGlvbiddXG4gIH0sIHtcbiAgICBuYW1lOiAnc2V0U3RyaW5nJyxcbiAgICBhcmdzOiBbJ3N0cmluZyddXG4gIH1dXG59XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgaW5pdDogZnVuY3Rpb24gKFdlZXgpIHtcbiAgICBXZWV4LnJlZ2lzdGVyQXBpTW9kdWxlKCdjbGlwYm9hcmQnLCBjbGlwYm9hcmQsIG1ldGEpXG4gIH1cbn1cbiIsImltcG9ydCBkb20gZnJvbSAnLi9kb20nXG5pbXBvcnQgZXZlbnQgZnJvbSAnLi9ldmVudCdcbmltcG9ydCBwYWdlSW5mbyBmcm9tICcuL3BhZ2VJbmZvJ1xuaW1wb3J0IHN0cmVhbSBmcm9tICcuL3N0cmVhbSdcbmltcG9ydCBtb2RhbCBmcm9tICcuL21vZGFsJ1xuaW1wb3J0IGFuaW1hdGlvbiBmcm9tICcuL2FuaW1hdGlvbidcbmltcG9ydCB3ZWJ2aWV3IGZyb20gJy4vd2Vidmlldydcbi8vIGltcG9ydCB0aW1lciBmcm9tICcuL3RpbWVyJ1xuaW1wb3J0IG5hdmlnYXRvciBmcm9tICcuL25hdmlnYXRvcidcbmltcG9ydCBzdG9yYWdlIGZyb20gJy4vc3RvcmFnZSdcbmltcG9ydCBjbGlwYm9hcmQgZnJvbSAnLi9jbGlwYm9hcmQnXG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgaW5pdDogZnVuY3Rpb24gKFdlZXgpIHtcbiAgICBXZWV4Lmluc3RhbGwoZG9tKVxuICAgIFdlZXguaW5zdGFsbChldmVudClcbiAgICBXZWV4Lmluc3RhbGwocGFnZUluZm8pXG4gICAgV2VleC5pbnN0YWxsKHN0cmVhbSlcbiAgICBXZWV4Lmluc3RhbGwobW9kYWwpXG4gICAgV2VleC5pbnN0YWxsKGFuaW1hdGlvbilcbiAgICBXZWV4Lmluc3RhbGwod2VidmlldylcbiAgICAvLyBXZWV4Lmluc3RhbGwodGltZXIpXG4gICAgV2VleC5pbnN0YWxsKG5hdmlnYXRvcilcbiAgICBXZWV4Lmluc3RhbGwoc3RvcmFnZSlcbiAgICBXZWV4Lmluc3RhbGwoY2xpcGJvYXJkKVxuICB9XG59XG4iLCJpbXBvcnQgKiBhcyB1dGlscyBmcm9tICcuLi91dGlscydcbmV4cG9ydCB7IHV0aWxzIH1cblxuY29uc3Qgd2VleE1vZHVsZXMgPSB7fVxuXG5leHBvcnQgZnVuY3Rpb24gcmVxdWlyZSAobW9kdWxlTmFtZSkge1xuICByZXR1cm4gd2VleE1vZHVsZXNbbW9kdWxlTmFtZV1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJlZ2lzdGVyQXBpTW9kdWxlIChuYW1lLCBtb2R1bGUsIG1ldGEpIHtcbiAgaWYgKCF3ZWV4TW9kdWxlc1tuYW1lXSkge1xuICAgIHdlZXhNb2R1bGVzW25hbWVdID0ge31cbiAgfVxuICBmb3IgKGNvbnN0IGtleSBpbiBtb2R1bGUpIHtcbiAgICBpZiAobW9kdWxlLmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgIHdlZXhNb2R1bGVzW25hbWVdW2tleV0gPSB1dGlscy5iaW5kKG1vZHVsZVtrZXldLCB0aGlzKVxuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgY29uc3Qgc2VuZGVyID0ge1xuICBwZXJmb3JtQ2FsbGJhY2sgKGNhbGxiYWNrLCBkYXRhLCBrZWVwQWxpdmUpIHtcbiAgICBpZiAodHlwZW9mIGNhbGxiYWNrID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICByZXR1cm4gY2FsbGJhY2soZGF0YSlcbiAgICB9XG4gICAgcmV0dXJuIG51bGxcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0Um9vdCAoKSB7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpbnN0YWxsIChtb2R1bGUpIHtcbiAgbW9kdWxlLmluaXQodGhpcylcbn1cbiIsIi8vIFRPRE86IHBhcnNlIFVBXG5jb25zdCB1YSA9IG5hdmlnYXRvci51c2VyQWdlbnRcblxuZXhwb3J0IGRlZmF1bHQge1xuICBwbGF0Zm9ybTogJ1dlYicsXG4gIHVzZXJBZ2VudDogdWEsXG4gIGFwcE5hbWU6IG5hdmlnYXRvci5hcHBOYW1lLFxuICBhcHBWZXJzaW9uOiBuYXZpZ2F0b3IuYXBwVmVyc2lvbiwgLy8gbWF5YmUgdG9vIGxvbmdcbiAgd2VleFZlcnNpb246ICcnLFxuICBvc05hbWU6ICcnLFxuICBvc1ZlcnNpb246ICcnLFxuICBkZXZpY2VXaWR0aDogd2luZG93LmlubmVyV2lkdGgsXG4gIGRldmljZUhlaWdodDogd2luZG93LmlubmVySGVpZ2h0XG59XG4iLCJpbXBvcnQgJy4uL3N0eWxlcy9yZXNldC5jc3MnXG5pbXBvcnQgJy4uL3N0eWxlcy9jb21wb25lbnRzLmNzcydcblxuaW1wb3J0ICcuLi8uLi8uLi9zaGFyZWQvYXJyYXlGcm9tJ1xuaW1wb3J0ICcuLi8uLi8uLi9zaGFyZWQvb2JqZWN0QXNzaWduJ1xuaW1wb3J0ICcuLi8uLi8uLi9zaGFyZWQvb2JqZWN0U2V0UHJvdG90eXBlT2YnXG5cbmltcG9ydCAnY29yZS1qcy9tb2R1bGVzL2VzNi5vYmplY3QudG8tc3RyaW5nJ1xuaW1wb3J0ICdjb3JlLWpzL21vZHVsZXMvZXM2LnN0cmluZy5pdGVyYXRvcidcbmltcG9ydCAnY29yZS1qcy9tb2R1bGVzL3dlYi5kb20uaXRlcmFibGUnXG5pbXBvcnQgJ2NvcmUtanMvbW9kdWxlcy9lczYucHJvbWlzZSdcblxuZXhwb3J0ICogZnJvbSAnLi92aWV3cG9ydCdcblxuaW1wb3J0IGFwaSBmcm9tICcuLi8uLi9icm93c2VyL2V4dGVuZC9hcGknXG5pbXBvcnQgKiBhcyB3ZWV4IGZyb20gJy4vd2VleCdcbmltcG9ydCBXWEVudmlyb25tZW50IGZyb20gJy4vV1hFbnZpcm9ubWVudCdcblxuYXBpLmluaXQod2VleClcblxuT2JqZWN0LmZyZWV6ZSh3ZWV4KVxuT2JqZWN0LmZyZWV6ZShXWEVudmlyb25tZW50KVxuXG53aW5kb3cud2VleCA9IHdlZXhcbndpbmRvdy5XWEVudmlyb25tZW50ID0gV1hFbnZpcm9ubWVudFxuIiwiLy8gaW1wb3J0IFZ1ZSBmcm9tICd2dWUnXG5pbXBvcnQgc2VtdmVyIGZyb20gJ3NlbXZlcidcbmltcG9ydCAqIGFzIGNvbXBvbmVudHMgZnJvbSAnLi9jb21wb25lbnRzJ1xuaW1wb3J0IHsgc2V0Vmlld3BvcnQgfSBmcm9tICcuL2VudidcblxuZXhwb3J0IGZ1bmN0aW9uIGluc3RhbGwgKFZ1ZSkge1xuICBjb25zdCBodG1sUmVnZXggPSAvXmh0bWw6L2lcbiAgVnVlLmNvbmZpZy5pc1Jlc2VydmVkVGFnID0gdGFnID0+IGh0bWxSZWdleC50ZXN0KHRhZylcbiAgVnVlLmNvbmZpZy5wYXJzZVBsYXRmb3JtVGFnTmFtZSA9IHRhZyA9PiB0YWcucmVwbGFjZShodG1sUmVnZXgsICcnKVxuXG4gIGZvciAoY29uc3QgbmFtZSBpbiBjb21wb25lbnRzKSB7XG4gICAgVnVlLmNvbXBvbmVudChuYW1lLCBjb21wb25lbnRzW25hbWVdKVxuICB9XG5cbiAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WID09PSAnZGV2ZWxvcG1lbnQnKSB7XG4gICAgY29uc29sZS5sb2coYFtWdWUgUmVuZGVyZXJdIFJlZ2lzdGVyZWQgY29tcG9uZW50czogYFxuICAgICAgKyBgWyR7T2JqZWN0LmtleXMoY29tcG9uZW50cykuam9pbignLCAnKX1dLmApXG4gIH1cbn1cblxuLyogZXNsaW50LWRpc2FibGUgbm8tdW5kZWYgKi9cbmlmICh0eXBlb2YgVnVlID09PSAndW5kZWZpbmVkJykge1xuICBjb25zb2xlLmVycm9yKCdbVnVlIFJlbmRlcmVyXSBgVnVlYCBpcyBub3QgZGVmaW5lZCEnKVxufVxuZWxzZSB7XG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViA9PT0gJ2RldmVsb3BtZW50J1xuICAgICYmIHNlbXZlci5sdChWdWUudmVyc2lvbiwgJzIuMS41JykpIHtcbiAgICBjb25zb2xlLndhcm4oYFtWdWUgUmVuZGVyZXJdIFRoZSB2ZXJzaW9uIG9mIFZ1ZSBzaG91bGQgYmUgYCArXG4gICAgICBgZ3JlYXRlciB0aGFuIDIuMS41LCBjdXJyZW50IGlzICR7VnVlLnZlcnNpb259LmApXG4gIH1cblxuICBzZXRWaWV3cG9ydCgpXG5cbiAgVnVlLnVzZSh7IGluc3RhbGwgfSlcbn1cbiJdLCJuYW1lcyI6WyJ0aGlzIiwiY29uc3QiLCJsZXQiLCJ0b1N0cmluZyIsInN0eWxlVmFsaWRhdG9yLmNvbW1vbiIsImNvbXB1dGVXcmFwcGVyU2l6ZSIsImluZGljYXRvciIsInJlcXVpcmUkJDAiLCJpc09iamVjdCIsInJlcXVpcmUkJDEiLCJkb2N1bWVudCIsInJlcXVpcmUkJDIiLCJyZXF1aXJlJCQzIiwiZFAiLCJyZXF1aXJlJCQ0IiwiZ2xvYmFsIiwiJGV4cG9ydCIsIklPYmplY3QiLCJ0b0ludGVnZXIiLCJtaW4iLCJ0b0lPYmplY3QiLCJkZWZpbmVkIiwicmVxdWlyZSQkNSIsImFyZ3VtZW50cyIsImNvZiIsImFuT2JqZWN0IiwiZ2V0S2V5cyIsImVudW1CdWdLZXlzIiwiSUVfUFJPVE8iLCJQUk9UT1RZUEUiLCJoYXMiLCJUQUciLCJjcmVhdGUiLCJzZXRUb1N0cmluZ1RhZyIsInRvT2JqZWN0IiwicmVxdWlyZSQkOSIsInJlcXVpcmUkJDgiLCJyZWRlZmluZSIsInJlcXVpcmUkJDciLCJoaWRlIiwicmVxdWlyZSQkNiIsIkl0ZXJhdG9ycyIsIklURVJBVE9SIiwiQXJyYXlQcm90byIsImNsYXNzb2YiLCJhRnVuY3Rpb24iLCJjdHgiLCJwcm9jZXNzIiwiUHJvbWlzZSIsImlzTm9kZSIsIlNQRUNJRVMiLCJMSUJSQVJZIiwicmVxdWlyZSQkMTciLCJyZXF1aXJlJCQxNiIsInJlcXVpcmUkJDE1IiwicmVxdWlyZSQkMTQiLCJyZXF1aXJlJCQxMyIsInJlcXVpcmUkJDEyIiwicmVxdWlyZSQkMTEiLCJyZXF1aXJlJCQxMCIsIlR5cGVFcnJvciIsInJhZiIsImkiLCJpZCIsInF1ZXVlIiwidHdlZW4iLCJjYW1lbFRvS2ViYWIiLCJhcHBlbmRTdHlsZSIsInNjcm9sbCIsIm1ldGEiLCJ1dGlscyIsIk1vZGFsIiwiQWxlcnQiLCJDT05URU5UX0NMQVNTIiwiTVNHX0NMQVNTIiwiQlVUVE9OX0dST1VQX0NMQVNTIiwiQlVUVE9OX0NMQVNTIiwiQ29uZmlybSIsIlByb21wdCIsInRvYXN0IiwibW9kYWwiLCJuYXZpZ2F0b3IiLCJkb20iLCJldmVudCIsInBhZ2VJbmZvIiwic3RyZWFtIiwiYW5pbWF0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LElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBQTs7VUFFMUMsRUFBQSxHQUFHLEdBQUcsSUFBSSxHQUFHLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDLEdBQUcsRUFBRTtnQkFDakMsSUFBSSxHQUFHLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLEVBQUE7T0FDMUM7UUFDQyxFQUFBLEdBQUcsR0FBRyxJQUFJLEdBQUcsQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUMsR0FBRyxFQUFFO2NBQ2pDLElBQUksSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxNQUFNLENBQUMsRUFBQTtLQUNsQyxNQUFNO01BQ0wsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO01BQ2YsSUFBSSxDQUFDLEtBQUssR0FBRyxFQUFFO1FBQ2IsSUFBSSxDQUFDLEtBQUssR0FBRztVQUNYLEVBQUEsR0FBRyxHQUFHLElBQUksR0FBRyxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQztnQkFDNUIsSUFBSSxHQUFHLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFBOztVQUUxQyxFQUFBLEdBQUcsR0FBRyxJQUFJLEdBQUcsQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUM7Z0JBQzVCLElBQUksR0FBRyxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxFQUFBO09BQzFDO1FBQ0MsRUFBQSxHQUFHLEdBQUcsSUFBSSxHQUFHLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDO2NBQzVCLElBQUksSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFD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RUFBRSxFQUFFLENBQUMsRUFBQTs7TUFFakQsT0FBTyxFQUFFLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxFQUFFLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEVBQUUsRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUM7O0tBRTVGLE1BQU07O01BRUwsS0FBSyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUEsT0FBTyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEtBQUssRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsRUFBRSxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDLEVBQUE7TUFDbkYsS0FBSyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUEsT0FBTyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEtBQUssRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxFQUFBOztNQUU5RixPQUFPLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdB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QUFDLENBQUMsTUFBTSxDQUFDLElBQUksS0FBSyxNQUFNLENBQUMsSUFBSSxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLEdBQUcsS0FBSyxNQUFNLENBQUMsR0FBRyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLEdBQUcsUUFBUSxFQUFFLE9BQU8sQ0FBQyxDQUFDLENBQUMsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBQSxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFBLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQSxFQUFBLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLEdBQUcsUUFBUSxFQUFFLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUEsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBQSxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFBLEdBQUcsQ0FBQyxDQUFDLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQSxDQUFDLEVBQUEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFBLEdBQUcsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUEsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUEsR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLGtCQUFrQixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQSxDQUFDLEVBQUEsS0FBSyxFQUFBLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUEsQ0FBQyxNQUFBLE9BQU8sQ0FBQyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLE1BQU0sQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLFFBQVEsRUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFBLENBQUMsQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLElBQUksTUFBTSxDQUFDLHdIQUF3SCxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFBLE1BQU0sSUFBSSxLQUFLLENBQUMsbUJBQW1CLENBQUMsQ0FBQyxFQUFBLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLFFBQVEsRUFBRSxPQUFPLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFBLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxPQUFPLElBQUksQ0FBQyxRQUFRLEdBQUcsQ0FBQyxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFFBQVEsR0FBRyxDQUFDLEVBQUUsR0FBRyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksR0FBRyxDQUFDLEVBQUUsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxHQUFHLENBQUMsRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLENB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
