const fs = require('fs');
const path = require('path');

// 读取原始数据
const constellationsPath = path.join(__dirname, '../data/twentyEightConstellations.js');
const fileContent = fs.readFileSync(constellationsPath, 'utf8');

// 将文件内容转换为数据对象（移除 export default）
const constellationsData = eval(fileContent.replace('export default', ''));

// 处理数据
const processedData = constellationsData.map(constellation => {
  // 处理 stars 中的坐标
  const processedStars = constellation.stars.map(star => ({
    ...star,
    x: (parseFloat(star.x) / 10).toFixed(3),
    y: (parseFloat(star.y) / 10).toFixed(3)
  }));

  // 处理 lines 中的坐标
  const processedLines = constellation.lines.map(line => ({
    start: {
      x: (parseFloat(line.start.x) / 10).toFixed(3),
      y: (parseFloat(line.start.y) / 10).toFixed(3)
    },
    end: {
      x: (parseFloat(line.end.x) / 10).toFixed(3),
      y: (parseFloat(line.end.y) / 10).toFixed(3)
    }
  }));

  return {
    ...constellation,
    stars: processedStars,
    lines: processedLines
  };
});

// 生成新的文件内容
const newFileContent = `export default ${JSON.stringify(processedData, null, 2)}`;

// 写入文件
fs.writeFileSync(constellationsPath, newFileContent, 'utf8');

console.log('数据处理完成！');