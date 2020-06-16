#!/bin/bash

pluginDir=./src/components/plugins
pluginName=$1

echo '正在将 $1 打包成库文件'
npx vue-cli-service build --target lib --name $pluginName --dest $pluginDir/$pluginName/dist $pluginDir/$pluginName/index.js

npm who am i
cd $pluginDir/$pluginName
npm version patch
npm publish

rm -rf ./dist