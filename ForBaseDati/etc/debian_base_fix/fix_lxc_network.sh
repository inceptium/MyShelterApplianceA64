#!/bin/bash
printf 'config: {}\ndevices: {}' | lxc profile edit default
lxc network delete lxdbr0
lxc network delete lxdbr1

