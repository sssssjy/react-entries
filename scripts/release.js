const fs = require('fs');
const path = require("path");
const child_process = require('child_process');

const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

//需要打包的列表
const buildPackageList = process.argv.slice(2);
//所有包列表
const allPackageList = fs.readdirSync(resolveApp('src/pages')).filter(packageName => packageName !== '.DS_Store');

//判定存在
buildPackageList.forEach(item => {
   allPackageList.indexOf(item) === - 1 && process.exit(1);
});

//若不输入包名 默认打包全部
const buildList = buildPackageList.length ? buildPackageList : allPackageList;

const runBuild = () => {
    const length = buildList.length;
    const startTime = new Date().getTime();
    for (let i = 0; i < length; i++) {
        // const proStartTime = new Date().getTime();
        console.log(`${buildList[i]} start build`);
        const progress = child_process.spawnSync('node',['scripts/build.js'],{
            env:{
                ...process.env,
                BUILD_PROJECT: buildList[i],
                encoding: 'utf-8',
                stdio: 'inherit'
            }
        });

        if (progress.error) {
            console.log(Error(progress.error));
            process.exit(1);
        }

        progress.output && console.log(progress.output.toString());
    }

    const endTime = new Date().getTime();
    console.log('all projects are built. It costs ' + (endTime - startTime));
};

runBuild();
