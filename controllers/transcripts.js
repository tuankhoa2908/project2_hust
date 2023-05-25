const db = require("../models/index");
const transcripts = db.transcripts;

const logger = require("../utils/logger");
const uuid = require("uuid");

module.exports = {
  input_module_score: async (req, res) => {
    //req.body = {transcript_username, id_module, name_module, institute, college, training_credits, practice_score, attendance_score, weight_practice, process_score, final_exam_score}
    try {
      let id_transcript = uuid.v4();
      const data = req.body;
      console.log(data);
      if (
        !data.id_module ||
        !data.transcript_username ||
        !data.name_module ||
        !data.college ||
        !data.training_credits ||
        !data.final_exam_score ||
        !data.weight_process
      ) {
        logger.fileLogger.log(
          "info",
          "Data Package can lost when send to server in module `input_module_score`."
        );
        return res.status(500).json({
          msg: "Data Package can lost when send to server in module `input_module_score`.",
        });
      } else {
        let process_score;
        if (!data.institute) data.institute = null;
        if (!data.practice_score || data.practice_score == 0) {
          data.practice_score = 0;
          data.weight_practice = 0;
        }
        console.log(data.weight_practice);
        if (!data.attendance_score) data.attendance_score = 0;
        if (!data.weight_practice) data.weight_practice = 0;
        if (!data.middle_exam_score) data.middle_exam_score = 0;
        if (
          parseFloat(data.middle_exam_score) +
            parseFloat(data.attendance_score) >
          10
        )
          data.attendance_score = 10 - parseFloat(data.middle_exam_score);
        console.log(data.attendance_score);
        if (!data.process_score) {
          process_score =
            parseFloat(data.practice_score) * parseFloat(data.weight_practice) +
            (parseFloat(data.attendance_score) +
              parseFloat(data.middle_exam_score)) *
              (1 - parseFloat(data.weight_practice));
        } else process_score = parseFloat(data.process_score);

        process_score = parseFloat(process_score);
        console.log(process_score);
        let x = (
          parseFloat(process_score) * parseFloat(data.weight_process)
        ).toFixed(1);
        let y = (
          parseFloat(data.final_exam_score) *
          (1 - parseFloat(data.weight_process))
        ).toFixed(1);
        //x = parseFloat(x).toFixed(1);
        console.log(x);
        console.log(y);
        x = (parseFloat(x) + parseFloat(y)).toFixed(1);
        x = parseFloat(x);
        console.log(x);
        console.log(8.5 <= x);
        if (8.5 <= x && x <= 10) module_score_word = "A";
        else if (8.0 <= x && x < 8.5) module_score_word = "B+";
        else if (7.0 <= x && x < 8.0) module_score_word = "B";
        else if (6.5 <= x && x < 7) module_score_word = "C+";
        else if (5.5 <= x && x < 6.5) module_score_word = "C";
        else if (5.0 <= x && x < 5.5) module_score_word = "D+";
        else if (4.0 <= x && x < 5.0) module_score_word = "D";
        else module_score_word = "F";
        await transcripts.create({
          id_transcript,
          transcript_username: data.transcript_username,
          id_module: data.id_module,
          name_module: data.name_module,
          institute: data.institute,
          college: data.college,
          training_credits: data.training_credits,
          practice_score: data.practice_score,
          attendance_score: data.attendance_score,
          weight_practice: data.weight_practice,
          middle_exam_score: data.middle_exam_score,
          process_score: process_score,
          final_exam_score: data.final_exam_score,
          weight_process: data.weight_process,
          module_score: x,
          module_score_word: module_score_word,
        });
        logger.fileLogger.log("info", "Input Socre Module Successfull");
        return res.status(200).json({
          msg: "OK",
          data,
        });
      }
    } catch (error) {
      if (error) res.status(500).json(error);
    }
  },

  get_transcript: async (req, res) => {
    let data_transcript = await transcripts.findAll({
      where: {
        transcript_username: req.body.username,
      },
      attributes: [
        "id_module",
        "name_module",
        "institute",
        "college",
        "training_credits",
        "practice_score",
        "attendance_score",
        "middle_exam_score",
        "weight_practice",
        "process_score",
        "final_exam_score",
        "weight_process",
        "module_score",
        "module_score_word",
      ],
    });
    if (!data_transcript) {
      logger.fileLogger.log("warn", "Không tìm thấy tài khoản yêu cầu.");
      res.status(500).json("Không tìm thấy tài khoản yêu cầu.");
    } else {
      logger.fileLogger.log(
        "info",
        `Truy xuất bảng điểm người dùng ${req.body.username} thành công`
      );
      res.status(200).json({
        msg: "OK",
        data_transcript,
      });
    }
  },
};
