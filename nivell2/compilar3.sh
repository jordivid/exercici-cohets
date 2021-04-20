cd ./models
tsc -t ES2015 cohet.ts
cd ./../controllers
tsc -t ES2015 classificacio.ts
cd ./..
webpack --config-name webpack3.config.js