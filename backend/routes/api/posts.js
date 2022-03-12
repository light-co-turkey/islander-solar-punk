/**
 *
 * @author Anass Ferrak aka " TheLordA " <an.ferrak@gmail.com>
 * GitHub repo: https://github.com/TheLordA/Instagram-Web-App-MERN-Stack-Clone
 *
 */

const express = require("express");
const mongoose = require("mongoose");

const Post = require("../../models/Post");
const router = express.Router();

router.post("/createpost", (req, res) => {
	const { draftJsRaw, createdBy, settings } = req.body;
	if (!draftJsRaw) {
		return res.json({
			error: "Please submit all the required fields.",
		});
	}
	console.log(settings)
	const post = new Post({
		settings: settings,
		createdBy: createdBy,
		draftJsRaw: draftJsRaw
	});

	post.save()
		.then(() => {
			res.json(post);
		})
		.catch((err) => {
			res.json(err)
		});
});

// @route Get Post
router.get('/get_post/:postId', (req, res) => {
	let postId = req.params.postId
	Post.findOne({ "_id": mongoose.Types.ObjectId(postId) }, (error, data) => {
		if (error) {
			return console.log(error)
		} else {
			res.json(data)
		}
	})
});

router.get("/allpost", (req, res) => {
	const userId = req.query.userId
	console.log(userId)
	Post.find({ $or: [{ 'settings.mainFeed': true }, { createdBy: userId }] })
		.sort("-createdAt")
		.then((data) => {
			let posts = [];
			data.map((item) => {
				posts.push({
					_id: item._id,
					draftJsRaw: item.draftJsRaw,
					createdBy: item.createdBy,
					createdAt: item.createdAt,
					settings: item.settings,
					comments: item.comments
				});
			});
			res.json({ posts });
		})
		.catch((err) => {
			res.json(err);
		});
});

router.post('/editpost/:postId', (req, res) => {
	const postId = req.params.postId
	let setFigure = () => {
		if (!req.body.settings) {
			return {
				draftJsRaw: req.body.draftJsRaw
			}
		} else {
			return {
				draftJsRaw: req.body.draftJsRaw,
				settings: req.body.settings
			}
		}
	}
	Post.updateOne({ _id: mongoose.Types.ObjectId(postId) },
		{
			$set: setFigure()
		})
		.then(() => res.json('Post updated!'))
		.catch(err => res.status(400).json('Error: ' + err));
});

router.post("/deletepost/:postId", (req, res) => {
	const postId = req.params.postId
	Post.findOne({ _id: postId })
		.populate("PostedBy", "_id")
		.exec((err, post) => {
			if (err || !post) return res.status(422).json({ Error: err });
			post.remove()
				.then((result) => {
					res.json(result._id);
				})
				.catch((err) => console.log(err));
		});
});

module.exports = router;