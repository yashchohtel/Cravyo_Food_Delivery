import cloudinary from "../config/cloudinary.js";

// Upload buffer to Cloudinary
export const uploadBufferToCloudinary = (buffer, folderName) => {

    return new Promise((resolve, reject) => {

        const stream = cloudinary.uploader.upload_stream(

            { folder: folderName, resource_type: "image", },

            (error, result) => {

                if (error) {
                    reject(error);
                } else {
                    resolve(result);
                }

            }
        );

        stream.end(buffer);

    });

};

// Delete image from Cloudinary
export const deleteFromCloudinary = (publicId) => {

    return new Promise((resolve, reject) => {

        cloudinary.uploader.destroy(

            publicId,

            {resource_type: "image",},

            (error, result) => {

                if (error) {
                    reject(error);
                } else {
                    resolve(result);
                }

            }
        );

    });

};