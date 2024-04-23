//Створити папку "baseFolder". В ній створити 5 папок, в кожній з яких створити по 5 файлів з розширенням txt.
// Вивести в консоль шляхи до кожного файлу чи папки, також вивести поряд інформацію про те, чи є це файл чи папка.

const path = require('node:path');
const fs = require('node:fs/promises');

async function foo (){
    try {
        const basePath = path.join(process.cwd(), 'baseFolder');
        await fs.mkdir(basePath, {recursive: true});
        const folderNames = ['folder1', 'folder2', 'folder3', 'folder4', 'folder5']
        const filesNames = ['file1.txt', 'file2.txt', 'file3.txt', 'file4.txt', 'file5.txt']

        for (const folderName of folderNames) {
            const folderPath = path.join(basePath, folderName);
            await fs.mkdir(path.join(basePath, folderName), {recursive: true});

            for (const fileName of filesNames) {
                await fs.writeFile(path.join(folderPath, fileName), 'hello ')
            }
        }

        const result = await fs.readdir(basePath)
        for (const folderName of result) {
            const folderPath = path.join(basePath, folderName);
            const stat = await fs.stat(folderPath)
            console.log(__dirname, 'stat: isDirectory: ', stat.isDirectory());

            const result = await fs.readdir(folderPath)
            for (const item of result) {
                const itemPath = path.join(folderPath, item);
                const stat = await fs.stat(itemPath)
                console.log(__filename, 'stat: isFile: ', stat.isFile());

            }
        }
    }catch (e) {
        console.error(e)
    }
}

void foo();