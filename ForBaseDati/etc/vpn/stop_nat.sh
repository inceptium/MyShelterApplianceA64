#!/bin/bash
iptables --table nat --delete POSTROUTING --out-interface enp1s0 -j MASQUERADE
iptables --delete FORWARD --in-interface enp2s0 -j ACCEPT
