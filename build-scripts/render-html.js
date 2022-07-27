const fs = require('fs');
const path = require('path');
const nunjucks = require('nunjucks');

const srcPath = './_src/html';
const distPath = './_dist';

const pageSrcPath = srcPath + '/pages';

const env = nunjucks.configure(srcPath, { autoescape: true });



const getAllFilesAndFolders = function(dirPath, allFiles, allFolders) {
	items = fs.readdirSync(dirPath)

	allFiles = allFiles || []
	allFolders = allFolders || []

	items.forEach(function (item) {
		if (fs.statSync(dirPath + '/' + item).isDirectory()) {
			allFolders.push(dirPath + '/' + item)

			allFiles = getAllFilesAndFolders(dirPath + '/' + item, allFiles, allFolders).files
		} else {
			allFiles.push(dirPath + '/' + item)
		}
	})

	const all = {"folders": allFolders, "files": allFiles}

	return all
}





const renderPages = async () => {
	const allItems = getAllFilesAndFolders(pageSrcPath)
	const folders = allItems.folders;
	const files = allItems.files;

	// Create destination folder if it doesn't exist
	if (folders.length > 0 || files.length > 0) {
		if (!fs.existsSync(distPath)) {
			fs.mkdirSync(distPath)
		}
	}

	// Create folders and sub-folders if they don't exist
	if (folders.length > 0) {
		folders.forEach(function(folder) {
			const destFolderPath = folder.replace(pageSrcPath, distPath)

			if (!fs.existsSync(destFolderPath)) {
				fs.mkdirSync(destFolderPath)
			}
		})
	}

	// Create HTML pages
	if (files.length > 0) {

		files.forEach(function (file) {
			const basePath = file.replace(srcPath + '/', '')
			const destPath = file.replace(pageSrcPath, distPath)

			try {
				const content = env.render(basePath)
				fs.writeFile(destPath, content, function () {})
			} catch (err) {
				console.error(err);
			}
		})
	}
}

renderPages();
