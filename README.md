# ASCII ART

1.  Convert an image to an ascii here: http://picascii.com/
2.  Save the HTML version as `original.txt`
3.  Run `npm run convert`
4.  Save the generated `ascii.txt` somewhere you can access in your `.zshrc`
5.  Add the following to zshrc to log out contents

```
cat ascii.txt | while IFS= read -r line
do
echo "$line"
done
```

_Notes_

The command: `printf "\x1b[38;2;255;100;0mTRUECOLOR\x1b[0m"`

http://jafrog.com/2013/11/23/colors-in-terminal.html
https://en.wikipedia.org/wiki/ANSI_escape_code

\x1b[0m -> reset all attributes
