#!/bin/bash
cd /root/BaseDati/temp

UPDATE=$(<enable_update)
if [ "$UPDATE" -eq "0" ]
then
	exit
fi

wget https://myshelter.inceptium.it/logiche/LCimp_new.rsd /root/BaseDati/temp/
MSG=$?
echo $MSG
if [ "$MSG" -eq "1" ]
then
	mv LCimp_new.rsd.1 LCimp_new.rsd
fi
