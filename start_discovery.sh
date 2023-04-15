#!/bin/bash
LOGFILE=/tmp/ramdisk/myshelter_discover.log
cd /root/MyShelterAppliance/InceptiumDiscovery/
INCEPTIUM_ACTIVE=1
#LOGFILE=/root/BaseDati/myshelter_discover.log
SERIALNO=$(cat "/root/BaseDati/etc/serial.no") 
MSG=0
RESTARTCOUNT=0
ip=$(hostname -I | awk '{print $1}')
while [ $INCEPTIUM_ACTIVE -eq 1 ];
do
		ip=$(hostname -I | awk '{print $1}')
        java -Xms128m -Xmx256m -jar inceptiumdiscovery.jar $SERIALNO $ip >> $LOGFILE
	MSG=$?
        echo "Messaggio ricevuto: $MSG" >>  $LOGFILE
        echo "MSG: $MSG" >> $LOGFILE
        RESTARTCOUNT=`expr $RESTARTCOUNT + 1`
        echo "RESTARTCOUNT: $RESTARTCOUNT" >> $LOGFILE
        sleep 15
        echo "SLEPT" >> $LOGFILE
        if [ $MSG -eq 100 ];
        then
                INCEPTIUM_ACTIVE=1
                echo "[$MSG] InceptiumDiscovery stopped!!!" >> $LOGFILE
                RESTARTCOUNT=0
		#shutdown -hP now
        fi
        if [ $RESTARTCOUNT -ge 1000 ];
        then
                INCEPTIUM_ACTIVE=0
                echo "Inceptium Discovery e' stato bloccato in seguito a 1000 tentativi automatici di riavvio." >> $LOGFILE
		reboot
        fi
	echo "Inceptium Discovery Restart"
	#ssmtp cpmatrix@mac.com < mail-riavvio.txt
done
echo "Voluntary Kill at `date`" >> $LOGFILE
exit

