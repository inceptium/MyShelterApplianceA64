#!/bin/bash
tail -n1000 /root/BaseDati/myshelter_srv.log > /root/BaseDati/myshelter_srv2.log
cat /root/BaseDati/myshelter_srv2.log > /root/BaseDati/myshelter_srv.log
rm /root/BaseDati/myshelter_srv2.log
tail -n1000 /root/IncStorage/log/inceptium_srv.log > /root/IncStorage/log/inceptium_srv2.log
cat /root/IncStorage/log/inceptium_srv2.log > /root/IncStorage/log/inceptium_srv.log
rm /root/IncStorage/log/inceptium_srv2.log