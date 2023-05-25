const db = require("../models/index");
const profile_user = db.profile_user;
const users = db.users;
const logger = require("../utils/logger");

const uuid = require("uuid");

module.exports = {
  create_profile: async (req, res) => {
    let id = uuid.v4();
    // req.boody = {full_name, date_of_birth, num_phone, c_id, username_profile}
    try {
      data = req.body;
      console.log(data);
      if (
        !data.full_name ||
        !data.date_of_birth ||
        !data.num_phone ||
        !data.c_id ||
        !data.username_profile
      ) {
        logger.fileLogger.log(
          "warn",
          "package data can lost when send to server in module `create_profile`."
        );
        res.status(500).json({
          msg: "package data can lost when send to server in module `create_profile`.",
        });
      } else {
        await profile_user.create({
          id_profile: id,
          full_name: data.full_name,
          date_of_birth: data.date_of_birth,
          num_phone: data.num_phone,
          c_id: data.c_id,
          username_profile: data.username_profile,
        });

        logger.fileLogger.log(
          "info",
          `Account ${data.username_profile} update profile successful.`
        );

        res.status(200).json({
          msg: "OK",
        });
      }
    } catch (error) {
      if (error) {
        logger.fileLogger.log(
          "error",
          "Has error undefined with module `create_profile`"
        );
        res.status(500).json(error);
      }
    }
  },

  get_profile: async (req, res) => {
    // req.body = {username}
    try {
      if (!req.body.username) {
        logger.fileLogger.log(
          "warn",
          "package data maybe lost when send to server in module `get_profile`"
        );
        res.status(500).json({
          msg: "package data maybe lost when send to server in module `get_profile`",
        });
      } else {
        data = await profile_user.findOne({
          where: {
            username_profile: req.body.username,
          },
          attributes: [
            "username_profile",
            "full_name",
            "date_of_birth",
            "num_phone",
            "c_id",
          ],
          include: [
            {
              model: users,
              attributes: ["email"],
            },
          ],
          raw: true,
        });
        logger.fileLogger.log(
          "info",
          `Account ${req.body.username} get info profile succesful.`
        );
        res.status(200).json({
          msg: "OK",
          data,
        });
      }
    } catch (error) {
      if (error) {
        res.send(error);
      }
    }
  },
};
