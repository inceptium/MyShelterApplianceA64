#!/bin/bash
SERIALNO=$(</root/BaseDati/etc/serial.no)

scp "root@192.168.33.53:/etc/openvpn/easy-rsa/keys/${SERIALNO}.ovpn"  client.ovpn
