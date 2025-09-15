# تقویم شمسی Moonshid

این پکیج یک تقویم شمسی سبک و ساده است.

---

### شروع به کار (استفاده از CDN)

کافی است کد زیر را در فایل HTML خود قرار دهید.

```html
<!DOCTYPE html>
<html lang="fa" dir="rtl">
<head>
  <meta charset="UTF-8" />
  <title>تقویم شمسی</title>
</head>
<body>
  <h1>انتخاب تاریخ</h1>
  <input type="text" id="myDatePicker" placeholder="تاریخ را انتخاب کنید" />

  <script src="[https://cdn.jsdelivr.net/gh/](https://cdn.jsdelivr.net/gh/)<نام کاربری گیت‌هاب شما>/moonshid-jalali-datepicker@1.0.0/dist/moonshid-jalali-datepicker.min.js"></script>

  <script>
    document.addEventListener("DOMContentLoaded", () => {
      new JalaliDatePicker("myDatePicker");
    });
  </script>
</body>
</html>