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
echo "0" > led/led2
./start_lxc_monitor.sh &
while [ $INCEPTIUM_ACTIVE -eq 1 ];
do
        VPN=$(<enable_vpn)
	echo $(<led/led2) > /sys/class/leds/apu2\:green\:2/brightness 

	if [ "$VPN" -eq "1" ];
        then

            PIDVPN=`pgrep -f "openvpn --config client.ovpn"`

            if [ $PIDVPN > 0 ];
            then

                echo "pid VPN: $PIDVPN" >> NULL

            else

                echo "Open VPN: $VPN" >>  $LOGFILE
                ./start_nat.sh
                openvpn --config client.ovpn >> $LOGFILE &
		echo "1" > /sys/class/leds/apu2\:green\:3/brightness 

            fi

        else

            if [ `pgrep -f "openvpn --config client.ovpn"` > 0 ];
            then

            kill -9 `pgrep -f "openvpn --config client.ovpn"`
            ./stop_nat.sh
	    echo "0" > /sys/class/leds/apu2\:green\:3/brightness 

            fi
        fi

        sleep 2

done
exit

