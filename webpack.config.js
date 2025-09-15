const path = require("path");

module.exports = {
  // حالت ساخت را مشخص می‌کند. 'production' برای بهینه‌سازی کد است.
  mode: "production",

  // نقطه ورودی پروژه (فایل اصلی)
  entry: "./src/datepicker.js",

  // تنظیمات مربوط به فایل خروجی
  output: {
    // نام فایل خروجی
    filename: "moonshid-jalali-datepicker.min.js",
    // مسیر پوشه خروجی
    path: path.resolve(__dirname, "dist"),
    // نام کتابخانه‌ای که در سطح جهانی قابل دسترسی خواهد بود
    library: "JalaliDatePicker",
    // نوع خروجی برای سازگاری با محیط‌های مختلف (مرورگر، Node.js)
    libraryTarget: "umd",
    // مشخص کردن شیء جهانی
    globalObject: "this",
  },

  // قوانین مربوط به پردازش انواع فایل‌ها
  module: {
    rules: [
      {
        // اعمال این قانون بر روی تمامی فایل‌های .css
        test: /\.css$/,
        // استفاده از این لودرها برای پردازش فایل‌های CSS
        use: ["style-loader", "css-loader"],
      },
    ],
  },
};
