cd C:\www\ROOT\monitor\adapter
for /L %%B in (0 1 130) do (java -classpath mysql-connector-java-5.1.34.jar;json-simple-1.1.1.jar; AdapterEngine 192.168.1.104:3306 dagparus parus2014 && timeout /t 2)