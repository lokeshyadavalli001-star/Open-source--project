#!/bin/bash

# ==========================================
# Script 5: Open Source Manifesto Generator
# Author: Yadavalli Lokesh
# Description:
# Generates a personalized open source
# philosophy statement and saves to file
# ==========================================

echo "===================================="
echo " Open Source Manifesto Generator"
echo "===================================="
echo ""

# user input
read -p "1. Name one open-source tool you use daily: " TOOL

read -p "2. In one word, what does freedom mean to you? " FREEDOM

read -p "3. What would you build and share openly? " BUILD

# date
DATE=$(date)

# output file
OUTPUT="manifesto_$(whoami).txt"

# create manifesto
echo "Open Source Manifesto" > $OUTPUT
echo "Date: $DATE" >> $OUTPUT
echo "" >> $OUTPUT

echo "I believe open source represents $FREEDOM." >> $OUTPUT
echo "I regularly use $TOOL in my work." >> $OUTPUT
echo "In future, I want to build $BUILD and share it with the community." >> $OUTPUT

echo "" >> $OUTPUT
echo "Knowledge grows when shared openly." >> $OUTPUT

echo ""
echo "Manifesto saved to file: $OUTPUT"
echo ""

# show content
cat $OUTPUT
