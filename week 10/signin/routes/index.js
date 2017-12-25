var express = require('express');
var router = express.Router();
var User = require('../models/user');
var bcrypt = require('bcrypt-as-promised');

//login page
router.get('/', function (req, res, next) {
	if (req.session.user) {
		console.log("LOGIN:\n   user: " + req.session.user.username + "\n   STATE: Success");
		res.render('detail', {
			title: '用户详情',
			user: req.session.user
		});
	} else {
		res.render('login', {
			title: '登录',
			err: ''
		});
	}
});

//log in request
router.post('/', function (req, res, next) {
	var username = req.body.username;
	var password = req.body.password;
	User.find({
		"username": username
	}, function (err, user) {
		if (err) {
			console.log("Error: " + err);
		} else {
			if (!user.length) {
				res.json({
					"error": "用户不存在"
				});
			} else {
				bcrypt.compare(password, user[0].password).then(function () {
					var info = {
						"username": user[0].username,
						"studentId": user[0].studentId,
						"tel": user[0].tel,
						"mailBox": user[0].mailBox
					}
					req.session.user = info;
					res.render('detail', {
						title: '用户详情',
						user: req.session.user
					});
				}).catch(bcrypt.MISMATCH_ERROR, function () {
					console.log("LOGIN:\n   user: " + user.username + "\n   STATE: Wrong password");
					res.json({
						"error": "密码错误"
					});
				});
				return;
			}
		}
	});
});

//detail page
router.get('/detail', function (req, res, next) {
	if (req.session.user) {
		console.log("LOGIN:\n   user: " + req.session.user.username + "\n   STATE: Success");
		res.render('detail', {
			title: '用户详情',
			user: req.session.user
		});
	} else {
		console.log("LOGIN:\n   user: " + "Unknown" + "\n   STATE: Reject");
		res.render('login', {
			title: "登录",
			err: ""
		});
		return;
	}
});

//logout
router.get('/logout', function (req, res, next) {
	console.log("LOGOUT:\n   user: " + req.session.user.username + "\n   STATE: Success");
	delete req.session.user;
	return res.render('login', {
		title: "登录",
		err: ""
	});
});

//regist page
router.get('/regist', function (req, res, next) {
	res.render('signup', {
		title: '注册',
		error: ''
	});
});

//regist request
router.post('/regist', function (req, res, next) {
	var user = req.body;
	User.find({
		$or: [{
				"username": user.username
			},
			{
				"studentId": user.studentId
			},
			{
				"tel": user.tel
			},
			{
				"mailBox": user.mailBox
			}
		]
	}, function (err, users) {
		if (err) {
			console.log("Error: " + err);
		} else {
			if (!users.length) {
				//encode the password
				bcrypt.hash(user.password, 10).then(function (hash) {
					var newUser = User({
						username: user.username,
						password: hash,
						studentId: user.studentId,
						tel: user.tel,
						mailBox: user.mailBox
					});
					console.log("SIGNUP:\n   user: " + user.username + "\n   STATE: Success");
					newUser.save(function (err) {
						if (err) throw err;
					});
					req.session.user = user;
					res.render('detail', {
						title: '用户详情',
						user: req.session.user
					});
				});
				return;
			} else {
				console.log("SIGNUP:\n   user: " + user.username + "\n   STATE: Fail with repeat messages");
				res.json({
					"error": "信息被占用"
				});
			}
		}
	});
});

module.exports = router;