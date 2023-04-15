#!/bin/bash
cd /root/BaseDati/etc/vpn/
INCEPTIUM_ACTIVE=1
LOGFILE=/root/BaseDati/etc/vpn/vpn.log
DATASTORAGE=/root/BaseDati/etc/vpn/
MSG=0
RESTARTCOUNT=0
VPN=0
LXC_STATE=""
rm $LOGFILE
PIDVPN=0
echo "Start VPN Script: " >>  $LOGFILE
while [ $INCEPTIUM_ACTIVE -eq 1 ];
do
	echo "1" > /sys/class/leds/apu2\:green\:1/brightness
	sleep 0.5
	echo "0" > /sys/class/leds/apu2\:green\:1/brightness
        sleep 0.5

done
exit

