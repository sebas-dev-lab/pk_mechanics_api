echo "wait db server"
dockerize -wait tcp://db_mysql:3306 -timeout 20s

echo "start node server"
npm run dev