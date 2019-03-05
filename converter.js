const fs = require('fs')
const chroma = require('chroma-js')

/**
 * Include the background colors here to replace them with whitespaces
 */
const backgroundColors = ['#2c2733', '#201b28']

/**
 * Read in orginal.txt and replace all spans with ASCII encodings
 */
fs.readFile('./original.txt', 'utf-8', (err, txt) => {
  // Strip pre tags
  let encodedAscii = txt.replace(/<pre.+?>/, '')
  encodedAscii = encodedAscii.replace(/<\/pre>/, '')

  encodedAscii = encodedAscii.replace(
    /<span style="color: (#[a-zA-Z0-9]+);">(#*)(\s)?<\/span>/gm,
    (match, p1, p2, p3) => {
      // p1 - hex color
      // p2 - content # characters
      // p3 - newline
      if (!p2) return ''

      // If match ends in newline preserve it
      const newline = p3 && p3.length ? '\n' : ''

      if (backgroundColors.includes(p1)) {
        return new Array(p2.length).fill(' ').join('') + newline
      } else {
        const [red, green, blue] = chroma(p1).rgb()
        return (
          `\\x1b[38;2;${red};${green};${blue}m${new Array(p2.length)
            .fill('#')
            .join('')}\\x1b[0m` + newline
        )
      }
    }
  )

  fs.writeFile('./ascii.txt', encodedAscii, err => {
    if (err) console.warn(err)
  })
})
