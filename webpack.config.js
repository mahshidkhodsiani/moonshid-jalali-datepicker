const path = require("path");

module.exports = {
  mode: "production",
  entry: "./src/datepicker.js", // فایل ورودی
  output: {
    filename: "moonshid-jalali-datepicker.min.js", // نام فایل خروجی
    path: path.resolve(__dirname, "dist"), // مسیر پوشه خروجی
    library: "JalaliDatePicker",
    libraryTarget: "umd",
    globalObject: "this",
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
};
