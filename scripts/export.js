const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const less = require('less');
const removeDir = (path) => {
  if (fs.existsSync(path)) {
    fs.readdirSync(path).forEach(function (file, index) {
      const curPath = path + '/' + file;
      if (fs.lstatSync(curPath).isDirectory()) { // recurse
        removeDir(curPath);
      } else { // delete file
        fs.unlinkSync(curPath);
      }
    });
    fs.rmdirSync(path);
  }
};

const rootDir = path.resolve(__dirname, '..');
const srcDir = path.resolve(rootDir, 'src/components/vue-cus-tabs');
const outputDir = path.resolve(rootDir, 'output');
const outputEs5Dir = path.resolve(outputDir, 'es5');
// const outputDistDir = path.resolve(outputDir, 'dist');
const outputSrcDir = path.resolve(outputDir, 'src');
const outputStyleDir = path.resolve(outputDir, 'style');
removeDir(outputDir);
if (!fs.existsSync(outputEs5Dir)) fs.mkdirSync(outputEs5Dir, { recursive: true });
if (!fs.existsSync(outputSrcDir)) fs.mkdirSync(outputSrcDir, { recursive: true });
// if (!fs.existsSync(outputDistDir)) fs.mkdirSync(outputDistDir, { recursive: true });
if (!fs.existsSync(outputStyleDir)) fs.mkdirSync(outputStyleDir, { recursive: true });

// execSync('npm run pack');
execSync('npm run compile');

const styles = fs.readdirSync(srcDir).filter(o => o.endsWith('.less'));
styles.forEach(o => {
  less.render(fs.readFileSync(path.resolve(srcDir, o), 'utf8'), { sourceMap: {} }).then(output => {
    fs.writeFileSync(path.resolve(outputStyleDir, `${o.match(/(.+)\.less$/)[1]}.css`), output.css, { encoding: 'utf8' });
    fs.writeFileSync(path.resolve(outputStyleDir, `${o.match(/(.+)\.less$/)[1]}.css.map`), output.map, { encoding: 'utf8' });
  });
});
const src = fs.readdirSync(srcDir);
src.forEach(o => {
  fs.copyFileSync(path.resolve(srcDir, o), path.resolve(outputSrcDir, o));
});
fs.copyFileSync(path.resolve(rootDir, 'package.json'), path.resolve(outputDir, 'package.json'));
fs.copyFileSync(path.resolve(rootDir, 'README.md'), path.resolve(outputDir, 'README.md'));

