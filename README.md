# Open Source Audit Project – Kali Linux

## Student Information
Name: Yadavalli Lokesh  
Course: Open Source Software  

---

## Project Overview

This project presents an audit of Kali Linux, an open-source operating system widely used for cybersecurity, penetration testing, and ethical hacking. The aim of the project is to understand the philosophy of open source software, analyze the licensing model, and explore how Kali Linux operates within a Linux environment.

The project also demonstrates practical knowledge of Linux through shell scripting. Five scripts were developed to show how automation and open-source tools can be used together to solve real-world problems.

Kali Linux is maintained by Offensive Security and is based on Debian Linux. It contains a large number of pre-installed security tools used for vulnerability assessment and security research.

---

## Objectives of the Project

• Understand the philosophy behind open source software  
• Analyze the GNU General Public License (GPL)  
• Study the Linux file system structure  
• Explore how open source tools support cybersecurity  
• Develop shell scripting skills  
• Compare open source software with proprietary software  

---

## Chosen Software

Kali Linux is an open-source Linux distribution specifically designed for penetration testing and security auditing. It provides tools such as Nmap, Wireshark, Metasploit, and Burp Suite which are commonly used in cybersecurity.

---

## Scripts Included in Repository

### Script 1 – System Identity Report
This script displays basic system information such as Linux distribution name, kernel version, current logged-in user, system uptime, date, and license information.

### Script 2 – FOSS Package Inspector
This script checks whether a selected open-source package (for example Nmap) is installed on the system. It displays version details and a short description of the package.

### Script 3 – Disk and Permission Auditor
This script checks important Linux directories such as /etc, /var/log, /home, /usr/bin, and /tmp. It displays directory size, owner, and permissions.

### Script 4 – Log File Analyzer
This script analyzes log files and counts the number of occurrences of a given keyword such as "error" or "failed". It also displays the last few matching lines from the log.

### Script 5 – Open Source Manifesto Generator
This script asks the user three questions and generates a short open-source philosophy statement. The output is saved to a text file automatically.

---

## Technologies Used

• Kali Linux  
• Bash Shell Scripting  
• GitHub  
• Linux command line tools  

---

## How to Run the Scripts

Step 1 – open terminal inside project folder

Step 2 – make scripts executable

```bash
chmod 755 script1_system_info.sh
chmod 755 script2.sh
chmod 755 script3.sh
chmod 755 script4.sh
chmod 755 script5.sh
```

Step 3 – run scripts

```bash
./script1_system_info.sh
./script2.sh
./script3.sh
./script4.sh /var/log/dpkg.log install
./script5.sh
```

---

## Learning Outcome

Through this project, I learned how open source software encourages collaboration and innovation. I also gained practical experience in Linux commands, shell scripting, and GitHub version control.

Open source tools play an important role in modern cybersecurity and software development.

---

## Repository Structure

```text
README.md
manifesto_kali.txt
script1_system_info.sh
script2.sh
script3.sh
script4.sh
script5.sh
```

---

## Conclusion

Kali Linux demonstrates the power of open source software in the field of cybersecurity. It allows professionals and students to access advanced tools without cost. The open-source model promotes transparency, knowledge sharing, and continuous improvement.

This project helped in understanding both theoretical concepts and practical implementation of open source software.
