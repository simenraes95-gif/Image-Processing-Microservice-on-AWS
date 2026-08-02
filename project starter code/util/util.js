import fs from "fs";
import Jimp from "jimp";

// filterImageFromURL
// helper function to download, filter, and save the filtered image locally
// returns the absolute path to the local image
// INPUTS
//    inputURL: string - a publicly accessible url to an image file
// RETURNS
//    an absolute path to a filtered image locally saved file
export async function filterImageFromURL(inputURL) {
    const response = await fetch(inputURL, {
        headers: {
            "User-Agent": "Udacity-Image-Filter/1.0"
        }
    });

    if (!response.ok) {
        throw new Error(
            `Image download failed: ${response.status} ${response.statusText}`
        );
    }

    const arrayBuffer = await response.arrayBuffer();
    const imageBuffer = Buffer.from(arrayBuffer);

    const photo = await Jimp.read(imageBuffer);

    const outpath =
        "/tmp/filtered." + Math.floor(Math.random() * 2000) + ".jpg";

    await photo
        .resize(256, 256)
        .quality(60)
        .greyscale()
        .writeAsync(outpath);

    return outpath;
}

// deleteLocalFiles
// helper function to delete files on the local disk
// useful to cleanup after tasks
// INPUTS
//    files: Array<string> an array of absolute paths to files
export async function deleteLocalFiles(files) {
    for (const file of files) {
        if (fs.existsSync(file)) {
            fs.unlinkSync(file);
        }
    }
}