@echo off

echo Setting Env...

SET NODE_ENV=development
SET PG_HOSTNAME=localhost
SET PG_PORT=5432
SET PG_USERNAME=JC
SET PG_DB_NAME=weathermood
SET PG_PASSWORD=0000

echo Setting Success!
echo %NODE_ENV%
echo %PG_HOSTNAME%
echo %PG_PORT%
echo %PG_USERNAME%
echo %PG_DB_NAME%
echo %PG_PASSWORD%

pause