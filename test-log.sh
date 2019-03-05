#! /bin/sh

cat ascii.txt | while IFS= read -r line
do
echo "$line"
done