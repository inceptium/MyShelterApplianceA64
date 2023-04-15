#!/bin/sh
cd /root
rm .git-credentials 
cd /root/MyShelterAppliance
git fetch --all
git reset --hard origin/master
cd /root/InceptiumLinuxAppliance/
git fetch --all
git reset --hard origin/master
cd /root/IncStorage/InceptiumAppStore/
git fetch --all
git reset --hard origin/master
/root/BaseDati/srv/LCServer/./sync_panel.sh
/root/BaseDati/temp/./update_logic.sh
/root/MyShelterAppliance/./start_appliance_fix.sh
cp /root/MyShelterAppliance/start_debian_base_fix.sh /root/BaseDati/etc/
cp -R /root/MyShelterAppliance/debian_base_fix /root/BaseDati/etc/
echo "Process Start" > /root/process.log
#/root/./start_all_services.sh
systemctl start inceptiumdiscovery.service
systemctl start myshelter.service
systemctl start inceptiumservice.service
echo "Process Complete" >> /root/process.log