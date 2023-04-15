#!/bin/bash
iptables --table nat --append POSTROUTING --out-interface enp1s0 -j MASQUERADE
iptables --append FORWARD --in-interface enp2s0 -j ACCEPT
