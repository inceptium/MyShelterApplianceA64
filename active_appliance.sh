#!/bin/bash

if [ $@ -ne 2 ]
then
	echo "ERROR arguments"
	exit 1
fi
USER=$(echo -n $1 | base64)
PASSWORD=$(echo -n $2 | base64)

wget -q --output-document - "http://localhost:8081/Ucommand=active_product?"$USER"::"$PASSWORD
