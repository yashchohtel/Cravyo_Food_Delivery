//  CREATE PROMOTION BANNER
export const createPromotionBanner = (req, res) => {

    console.log(req.file);

    res.status(200).json({
        success: true,
        message: "Image received successfully",
        file: req.file,
    });

};