<!DOCTYPE html>
<html lang="fa" dir="rtl">
<head>
  <meta charset="UTF-8" />
  <title>تقویم شمسی</title>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/mahshidkhodsiani/moonshid-jalali-datepicker@1.0.0/dist/moonshid-jalali-datepicker.min.css" />
</head>
<body>
  <h1>انتخاب تاریخ</h1>
  <input type="text" id="myDatePicker" placeholder="تاریخ را انتخاب کنید" />

  <script src="https://cdn.jsdelivr.net/gh/mahshidkhodsiani/moonshid-jalali-datepicker@1.0.0/dist/moonshid-jalali-datepicker.min.js"></script>

  <script>
    document.addEventListener("DOMContentLoaded", () => {
      new JalaliDatePicker("myDatePicker");
    });
  </script>
</body>
</html>