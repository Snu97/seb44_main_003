#!/usr/bin/env bash
cd /home/ubuntu/build
nohup java -jar -Dspring.profiles.active=server /home/ubuntu/build/server-0.0.1-SNAPSHOT.jar > /dev/null &