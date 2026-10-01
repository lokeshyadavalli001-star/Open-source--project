#!/bin/bash

# ==========================================
# Script 4: Log File Analyzer
# Author: Yadavalli Lokesh
# Description:
# Reads a log file and counts occurrences
# of a keyword such as "error"
# Shows last 5 matching lines
# ==========================================

LOGFILE=$1
KEYWORD=${2:-"error"}

COUNT=0

# check file exists
if [ ! -f "$LOGFILE" ]
then
 echo "Error: file not found"
 exit 1
fi

echo "Analyzing log file: $LOGFILE"
echo "Searching keyword: $KEYWORD"
echo "----------------------------------"

# read file line by line
while read LINE
do

 echo "$LINE" | grep -iq "$KEYWORD"

 if [ $? -eq 0 ]
 then

 ((COUNT++))

 fi

done < "$LOGFILE"

echo ""
echo "Total occurrences of '$KEYWORD': $COUNT"

echo ""
echo "Last 5 matching lines:"
echo "----------------------------------"

grep -i "$KEYWORD" "$LOGFILE" | tail -5
