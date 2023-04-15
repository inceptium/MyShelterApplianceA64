#!/bin/bash

echo "Hello word" > /root/ciao.txt
chmod -R 777 /root/BaseDati/etc/debian_base_fix
ip -4 addr | grep -oP '(?<=inet\s)\d+(\.\d+){3}' > /root/BaseDati/etc/debian_address