cd ./models
tsc -t ES2015 propulsor.ts
tsc -t ES2015 cohet.ts
cd ./../controllers
tsc -t ES2015 index.ts
cd ./..
webpack