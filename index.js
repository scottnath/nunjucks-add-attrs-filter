
/**
 * Nunjucks filter that takes an object with formed attributes pairs and turns them into HTML attributes. Meant to mimic func of React's `<div {...props}></div>`
 * inspiration: https://github.com/LotusTM/Kotsu/blob/master/modules/nunjucks-extensions.coffee#L247
 *
 * @param {object} input - Object to be spread
 * @param {array|string} used - attributes which have already been used
 *
 * @return {string} attributes converted for use in html
 *
 * @example <div {{ { class: 'h-margin', hidden: 'hidden' }|attrs }}>Content</div> -> <div class='h-margin' hidden='hidden'>Content</div>
 */
const attrs = (input = {}, used = []) => {
  let attributes = ' ';
  let ignore = [];

  if (typeof input !== 'object' || Array.isArray(input)) {
    let itype = typeof input;
    if (Array.isArray(input)) {
      itype = 'array';
    }

    console.error(`attributes must be a non-array object, filter received ${itype} instead`); // eslint-disable-line no-console

    return '';
  }

  if (!Array.isArray(used)) {
    if (typeof used === 'string') {
      ignore = [used];
    }
    else {
      console.error(`used attributes must be a string or array, filter received ${typeof used} instead`); // eslint-disable-line no-console

      return '';
    }
  }
  else {
    ignore = used;
  }

  Object.keys(input).forEach(key => {
    if (ignore.indexOf(key) === -1) {
      attributes += `${key}=\"${input[key]}\" `;
    }
  });

  return attributes;
}

module.exports = attrs;