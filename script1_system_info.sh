#!/bin/bash

# ==========================================
# Script 1: System Identity Report
# Author: Yadavalli Lokesh
# Course: Open Source Software
# Description:
# Displays important information about the
# Linux system such as OS version, kernel,
# user details, uptime, and license.
# ==========================================

echo "================================"
echo "   Open Source Audit – Kali Linux"
echo "================================"

# Get kernel version
KERNEL=$(uname -r)

# Get current logged in user
USER_NAME=$(whoami)

# Get system uptime
UPTIME=$(uptime -p)

# Get current date and time
DATE=$(date)

# Get Linux distribution name
DISTRO=$(grep PRETTY_NAME /etc/os-release | cut -d '"' -f2)

# Display results
echo "Distribution   : $DISTRO"
echo "Kernel Version : $KERNEL"
echo "Logged User    : $USER_NAME"
echo "System Uptime  : $UPTIME"
echo "Current Date   : $DATE"

# Open source license information
echo "License        : GNU General Public License (GPL)"

echo "================================"
