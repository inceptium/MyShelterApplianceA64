#!/bin/bash
INCEPTIUM_ACTIVE=1
LOGFILE=/tmp/ramdisk/myshelter_srv.log
MEDIAPATH=/root/BaseDati/srv/LCServer
BASEDATI=/root/BaseDati
cd /root/BaseDati
#rm myshelter_srv.log
cd /root/MyShelterAppliance/MyShelter/
sleep 15
SERIALNO=$(cat "/root/BaseDati/etc/serial.no") 
MSG=0
RESTARTCOUNT=0
#wget https://myshelter.inceptium.it/logiche/LCimp_new.rsd /root/BaseDati/temp/

while [ $INCEPTIUM_ACTIVE -eq 1 ];
do
    cp /root/BaseDati/temp/LCimp_new.rsd /root/BaseDati/LCimp.rsd
    #java -Xms128m -Xmx256m  -XX:+UseLinuxPosixThreadCPUClocks -agentpath:/root/profiling/lib/deployed/jdk16/linux-amd64/libprofilerinterface.so=/root/profiling/lib,5140  -cp "InceptiumServices.jar:/root/InceptiumLinuxAppliance/InceptiumServices/lib/*:/root/IncStorage/InceptiumAppStore/*" inceptiumserver.core.server.IncServer noswing updatedatabase
        java -Xms128m -Xmx512m -cp "myshelter.jar:/root/MyShelterAppliance/MyShelter/lib/*" myshelter.Main noswing $MEDIAPATH $BASEDATI /root/MyShelterAppliance/MyShelter/CustomLib eth0 eth1 >> $LOGFILE 2>&1
        MSG=$?
        echo "0" > /root/BaseDati/etc/vpn/led/led2
        echo "Messaggio ricevuto: $MSG" >>  $LOGFILE
        echo "MSG: $MSG" >> $LOGFILE
        RESTARTCOUNT=`expr $RESTARTCOUNT + 1`
        echo "RESTARTCOUNT: $RESTARTCOUNT" >> $LOGFILE
        sleep 15
        echo "SLEPT" >> $LOGFILE
        if [ $MSG -eq 100 ];
        then
                INCEPTIUM_ACTIVE=1
                echo "[$MSG] InceptiumServices stopped!!!" >> $LOGFILE
                RESTARTCOUNT=0
		#shutdown -hP now
        fi
        if [ $RESTARTCOUNT -ge 1000 ];
        then
                INCEPTIUM_ACTIVE=0
                echo "MyShelter e' stato bloccato in seguito a 1000 tentativi automatici di riavvio." >> $LOGFILE
		echo "Send Mail service Stop!!!"
		#ssmtp cpmatrix@mac.com < mail-stop.txt
		reboot
        fi
	echo "Send Mail Service Restart"
	#ssmtp cpmatrix@mac.com < mail-riavvio.txt 
done
echo "Voluntary Kill at `date`" >> $LOGFILE
exit

