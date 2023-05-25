const { createLogger, transports, format } = require("winston");
const path = require("path");
const DailyRotateFile = require("winston-daily-rotate-file");

//   Logging function

const logDirectory = path.join(__dirname, "../logs");

const fileLogger = createLogger({
  transports: [
    new transports.File({
      filename: path.join(logDirectory, "loginfo.log"),
      level: "info",
      format: format.combine(
        format.json(),
        format.timestamp({
          format: "HH:MM:ss DD-MM-YYYY",
        }),

        format.prettyPrint()
        // format.simple()
        // format.colorize(),
      ),
      maxsize: 5242880, // max size of file customer.log is 5MB
    }),
    
    new transports.File({
      filename: path.join(logDirectory, "logwarn.log"),
      level: "warn",
      format: format.combine(
        format.timestamp({
          format: "HH:MM:ss DD-MM-YYYY",
        }),
        format.json(),
        format.prettyPrint()
        //format.simple()
      ),
      maxsize: 5242880,
    }),

    new DailyRotateFile({
      filename: path.join(logDirectory, "application-log-%DATE%.log"),
      // level: "info",
      datePattern: "DD-MM-YYYY",
      zippedArchive: true,
      maxSize: "20m",
      maxFiles: "14d",
      format: format.combine(
        format.timestamp({
          format: "HH:MM:ss DD-MM-YYYY",
        }),
        format.json(),
        format.prettyPrint()
      ),
    }),
  ],
});

module.exports = { fileLogger };
