const express = require("express");
const mongoose = require("mongoose");

const Media = require("../../models/Media");
const router = express.Router();

router.post("/post_image", (req, res) => {
  const { usageType, createdBy, mediaEncode, mediaType } = req.body;
  if (!usageType || !createdBy || !mediaEncode || !mediaType) {
    console.log("err")
    return res.json({
      error: "Please submit all the required fields.",
    });
  }
  const media = new Media({
    usageType: usageType,
    createdBy: createdBy
  });

  saveImage(media, mediaEncode, mediaType);
  media.save()
    .then((result) => {
      res.json({ message: "Post created successfully" });
    })
    .catch((err) => {
      console.log(err);
    });
});


router.get("/get_media/:createdBy/:usageType", (req, res) => {
  const createdBy = req.params.createdBy
  const usageType = req.params.usageType
  Media.find({ $and: [{ createdBy: createdBy }, { usageType: usageType }] })
    .then((data) => {
      let medias = [];
      data.map((item) => {
        medias.push({
          id: item._id,
          mediaBuffer: item.mediaBuffer.toString(),
          usageType: item.usageType,
          mediaType: item.mediaType,
          createdBy: item.createdBy
        });
      });
      res.json({ medias });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.post("/remove_media/:mediaId", (req, res) => {
  const mediaId = req.params.mediaId
  Media.deleteOne({ "_id": mongoose.Types.ObjectId(mediaId) })
  .then(() => res.json("Successfully Deleted"))
  .catch(err => res.json("Failed to Delete, Err: ", err))
});

function saveImage(media, mediaEncode, mediaType) {
  if (mediaEncode != null) {
    media.mediaBuffer = mediaEncode
    media.mediaType = mediaType
  }
}

module.exports = router;