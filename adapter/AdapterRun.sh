#!/bin/sh

cd /var/www/test/adapter
for i in $(seq 1 30); do
  java -classpath mysql-connector-java-5.1.34.jar:json-simple-1.1.1.jar: AdapterEngine 192.168.1.104:3306 dagparus parus2014
  sleep 2
done
