cd ./models
tsc -t ES2015 cohet.ts
tsc -t ES2015 competicio.ts
cd ./../controllers
tsc -t ES2015 cursa.ts
cd ./..
webpack --config-name webpack2.config.js