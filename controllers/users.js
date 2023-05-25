const db = require("../models/index");
const users = db.users;

const bcrypt = require("bcrypt");
const uuid = require("uuid");
const logger = require("../utils/logger");

module.exports = {
  register_account: async (req, res) => {
    // req.body = {username, password, email}
    try {
      flag = true;
      id_user = uuid.v4();
      data = req.body;
      if (
        data.username == undefined ||
        data.password == undefined ||
        data.email == undefined
      ) {
        logger.fileLogger.log(
          "warn",
          "Error because user don't provide enough information account"
        );
        flag = false;
        res
          .status(500)
          .json("Error because user don't provide enough information account");
      } else {
        await users.create({
          id_user: id_user,
          username: data.username,
          password: bcrypt.hashSync(req.body.password, 10),
          email: data.email,
        });
        res.status(200).json({
          msg: "Create Your Account Successful",
        });
        logger.fileLogger.log("info", "Create User Account Successful !!!");
      }
    } catch (error) {
      if (flag == true) {
        res.status(500).json(error);
        logger.fileLogger.log("error", "Error when create user account.");
      }
    }
  },

  login_account: async (req, res) => {
    // req.body = {username, password}
    try {
      data = req.body;
      if (data.username == undefined || data.password == undefined) {
        logger.fileLogger.log(
          "warn",
          "Error because user don't provide enough information account or package can lost when send to server."
        );
      } else {
        info_account = await users.findOne({
          attributes: ["id_user", "username", "password"],
          where: {
            username: data.username,
          },
        });
        if (info_account == null) {
          logger.fileLogger.log("warn", "Wrong username or password.");
          res.status(500).json("Wrong username or password.");
        } else {
          if (bcrypt.compareSync(data.password, info_account.password)) {
            logger.fileLogger.log(
              "info",
              `account ${data.username} login successful`
            );
            res.status(200).json("Login Successful");
          } else {
            logger.fileLogger.log("warn", "Wrong password.");
            res.status(200).json("Wrong Password.");
          }
        }
      }
    } catch (error) {
      if (error) {
        logger.fileLogger.log(
          "error",
          "Has some error undefined with module `login_account`."
        );
        res.status(500).json(error);
      }
    }
  },

  change_password: async (req, res) => {
    // req.body = {new_password, old_password, username}
    try {
      new_password = req.body.new_password;
      old_password = req.body.old_password;
      username = req.body.username;
      if (!new_password || !old_password || !username) {
        logger.fileLogger.log(
          "warn",
          "data package can lost when send to server."
        );
        res.status(500).json("Please Resend Information.");
      } else {
        data = await users.findOne({
          attributes: ["password"],
          where: {
            username: username,
          },
        });
        if (bcrypt.compareSync(old_password, data.password)) {
          await users.update(
            {
              password: bcrypt.hashSync(new_password, 10),
            },
            {
              where: {
                username: username,
              },
            }
          );
          logger.fileLogger.log(
            "info",
            `Account ${username} change password successful.`
          );
          res.status(200).json({
            msg: "Change Your Password Successful.",
          });
        }
      }
    } catch (error) {
      if (error) {
        logger.fileLogger.log(
          "error",
          "Has some error undefined with module `change_password`."
        );
        res.status(500).json(error);
      }
    }
  },

  del_account: async (req, res) => {
    
  },
};
