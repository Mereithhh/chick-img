const fs = require('fs');
const path = require('path');

// 读取 images 目录
const imagesDir = path.join(__dirname, 'images');

// 读取所有文件
fs.readdir(imagesDir, (err, files) => {
  if (err) {
    console.error('读取目录出错:', err);
    return;
  }

  // 创建文件信息数组
  const fileList = files.map(file => {
    const filePath = path.join(imagesDir, file);
    const stats = fs.statSync(filePath);

    return {
      name: file,
      path: `images/${file}`,
      size: stats.size,
      createTime: stats.birthtime,
      modifyTime: stats.mtime
    };
  });

  // 将数组转换为 JSON 并写入文件
  const jsonContent = JSON.stringify(fileList, null, 2);
  fs.writeFile('images.json', jsonContent, 'utf8', (err) => {
    if (err) {
      console.error('写入 JSON 文件失败:', err);
      return;
    }
    console.log('JSON 文件已生成');
  });
});