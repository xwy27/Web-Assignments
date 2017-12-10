var http = require('http'),
    url = require('url'),
    path = require('path'),
    querystring = require('querystring'),
    fs = require('fs');

http.createServer(function (request, response) {
    if (request.method == 'POST') {
        postMethod(request, response);
    } else {
        getMethod(request, response);
    }
}).listen(8080);

console.log('Server running at http://localhost:8080/');

function postMethod(request, response) {
    var data = "";
    request.addListener("data", function (chunk) {
        if (chunk != undefined) {
            data += chunk;
        }
    });
    request.addListener("end", function () {
        var newUser = querystring.parse(data);
        createUser(newUser, response);
    });
}

function createUser(newUser, response) {
    fs.readFile("../dataBase/data.json", function (error, data) {
        if (error) throw error;
        var users = JSON.parse(data);
        var result = isValid(users, newUser);
        if (result == null) {
            users.push(newUser);
            var userString = JSON.stringify(users);
            fs.writeFileSync("../dataBase/data.json", userString);
            toSignIn(newUser, response);
            console.log("> " + newUser.username + " is signed up");
        } else {
            console.log("> " + result);
            toSignUp(response, result);
        }
    });
}

function isValid(users, newUser) {
    for (var i = 0; i < users.length; ++i) {
        if (users[i].username == newUser.username) {
            return "昵称已被占用";
        } else if (users[i].studentId == newUser.studentId) {
            return "学号已被使用";
        } else if (users[i].tel == newUser.tel) {
            return "电话已被绑定";
        } else if (users[i].mailBox == newUser.mailBox) {
            return "邮箱已被绑定";
        }
    }
    return null;
}

function toSignIn(user, response) {
    response.writeHead(200, {
        "Content-Type": "text/html; charset=utf-8"
    });
    fs.readFile("../html/signIn.html", function (error, data) {
        if (error) throw error;
        var pageString = data.toString();
        pageString = pageString.replace("Username", user.username);
        pageString = pageString.replace("StudentId", user.studentId);
        pageString = pageString.replace("Tel", user.tel);
        pageString = pageString.replace("MailBox", user.mailBox);
        response.write(pageString);
        response.end();
    });
    console.log("> " + user.username + " log in");
}

function getMethod(request, response) {
    var pathName = url.parse(request.url).pathname;
    if (path.extname(pathName) == ".css" ||
        path.extname(pathName) == ".js" ||
        path.extname(pathName) == ".jpg") {
        getFileType(pathName, response);
    } else if (pathName == null || pathName == undefined) {
        toSignUp(response);
    } else {
        var userName = querystring.parse(url.parse(request.url).query);
        if (userName == null || userName == undefined) {
            toSignUp(response);
        } else {
            fs.readFile("../dataBase/data.json", function (error, data) {
                if (error) throw error;
                if (data == undefined || data == null || data.length == 0) {
                    data += "[]";
                }
                var users = JSON.parse(data);
                var user = checkUser(users, userName);
                if (user != null) toSignIn(user, response);
                else toSignUp(response);
            });
        }
    }
}

function checkUser(users, userName) {
    for (var i = 0; i < users.length; ++i) {
        if (users[i].username == userName.username) {
            return users[i];
        }
    }
    return null;
}

function toSignUp(response, mayNewUser) {
    response.writeHead(200, {
        "Content-Type": "text/html; charset=utf-8"
    });
    fs.readFile("../html/signUp.html", function (error, data) {
        if (error) throw error;
        if (mayNewUser == undefined || mayNewUser == null) {
            response.write(data);
        } else {
            var pageString = data.toString();
            pageString = pageString.replace("right", mayNewUser);
            response.write(pageString);
        }
        response.end();
    });
}

function getFileType(pathName, response) {
    var search = "../";
    fs.readFile(search + pathName, function (error, data) {
        if (error) {
            toSignUp(response);
            return;
        }
        response.writeHead(200, {
            "Content-Type": getContentType(pathName)
        });
        response.write(data);
        response.end();
    });
}

function getContentType(filePath) {
    var contentType = "";
    //使用路径解析模块获取文件扩展名
    var extension = path.extname(filePath);
    switch (extension) {
        case ".html":
            contentType = "text/html";
            break;
        case ".js":
            contentType = "text/javascript";
            break;
        case ".css":
            contentType = "text/css";
            break;
        case ".gif":
            contentType = "image/gif";
            break;
        case ".jpg":
            contentType = "image/jpeg";
            break;
        case ".png":
            contentType = "image/png";
            break;
        case ".ico":
            contentType = "image/icon";
            break;
        default:
            contentType = "application/octet-stream";
    }
    return contentType + "; charset = utf-8"; //返回内容类型字符串
}