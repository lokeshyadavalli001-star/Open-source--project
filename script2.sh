#!/bin/bash

# ==========================================
# Script 2: FOSS Package Inspector
# Author: Yadavalli Lokesh
# Description:
# Checks if a package is installed in Kali Linux
# Displays version, license, and summary
# Uses case statement to show philosophy note
# ==========================================

PACKAGE="nmap"

echo "Checking package: $PACKAGE"
echo "--------------------------------"

# Check if package installed
if dpkg -l | grep -qw $PACKAGE
then
    echo "$PACKAGE is installed ✔"
    echo ""
    echo "Package Details:"
    # show version and description
    apt show $PACKAGE 2>/dev/null | grep -E 'Version|Maintainer|Description'

else
    echo "$PACKAGE is NOT installed ✖"
    echo "Install using: sudo apt install $PACKAGE"
fi

echo ""
echo "Open Source Philosophy Note:"
echo "--------------------------------"

# case statement description
case $PACKAGE in

nmap)
echo "Nmap: open-source tool used for network discovery and security auditing."
;;

wireshark)
echo "Wireshark: open-source packet analyzer for network troubleshooting."
;;

metasploit-framework)
echo "Metasploit: open-source penetration testing framework."
;;

burpsuite)
echo "Burp Suite Community: web vulnerability testing tool."
;;

*)
echo "Open-source software promotes transparency and innovation."
;;

esac
