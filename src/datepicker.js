// ========================
// تقویم شمسی با تعطیلات + انتخاب خودکار امروز
// ========================

const jalali_months = [
  "فروردین",
  "اردیبهشت",
  "خرداد",
  "تیر",
  "مرداد",
  "شهریور",
  "مهر",
  "آبان",
  "آذر",
  "دی",
  "بهمن",
  "اسفند",
];
const jalali_weekdays = ["ش", "ی", "د", "س", "چ", "پ", "ج"];


// helper: تقسیم صحیح
const _div = (a, b) => Math.floor(a / b);

// 📌 تبدیل میلادی -> شمسی (الگوریتم استاندارد jalaali-js)
function gregorian_to_jalali(gy, gm, gd) {
  const g_d_m = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  let gy2 = gy - 1600;
  let gm2 = gm - 1;
  let gd2 = gd - 1;

  let g_day_no =
    365 * gy2 + _div(gy2 + 3, 4) - _div(gy2 + 99, 100) + _div(gy2 + 399, 400);

  for (let i = 0; i < gm2; ++i) g_day_no += g_d_m[i];
  g_day_no += gd2;

  let j_day_no = g_day_no - 79;

  let j_np = _div(j_day_no, 12053); // 12053 = 33*365 + 8
  j_day_no = j_day_no % 12053;

  let jy = 979 + 33 * j_np + 4 * _div(j_day_no, 1461);
  j_day_no = j_day_no % 1461;

  if (j_day_no >= 366) {
    jy += _div(j_day_no - 1, 365);
    j_day_no = (j_day_no - 1) % 365;
  }

  const jm_days = [31, 31, 31, 31, 31, 31, 30, 30, 30, 30, 30, 29];
  let jm = 0;
  for (let i = 0; i < 12; i++) {
    if (j_day_no < jm_days[i]) {
      jm = i + 1;
      break;
    }
    j_day_no -= jm_days[i];
  }
  let jd = j_day_no + 1;

  return [jy, jm, jd];
}

// 📌 پیدا کردن روز هفته برای روز اول ماه شمسی
function getJalaliFirstDayOfWeek(year, month) {
  const approxGregorianYear = year + 621;
  const start = new Date(approxGregorianYear - 1, 0, 1);
  const end = new Date(approxGregorianYear + 1, 11, 31);

  for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
    const [jy, jm, jd] = gregorian_to_jalali(
      d.getFullYear(),
      d.getMonth() + 1,
      d.getDate()
    );
    if (jy === year && jm === month && jd === 1) {
      const gDay = d.getDay(); // 0=Sun..6=Sat
      return (gDay + 1) % 7; // تبدیل به 0=Sat..6=Fri
    }
  }
  return 0;
}

class JalaliDatePicker {
  constructor(inputElementId) {
    this.input = document.getElementById(inputElementId);
    if (!this.input) {
      console.error("Input element not found.");
      return;
    }
    this.currentDate = new Date();
    this.jalaliDate = gregorian_to_jalali(
      this.currentDate.getFullYear(),
      this.currentDate.getMonth() + 1,
      this.currentDate.getDate()
    );
    this.container = null;
    this.init();
  }

  init() {
    this.input.addEventListener("focus", () => this.show());
    document.addEventListener("click", (e) => {
      if (
        this.container &&
        !this.container.contains(e.target) &&
        e.target !== this.input
      ) {
        this.hide();
      }
    });
  }

  show() {
    if (!this.container) {
      this.createContainer();
      document.body.appendChild(this.container);
    }
    this.updateCalendar();
    this.container.style.display = "block";
    this.positionContainer();
  }

  hide() {
    if (this.container) this.container.style.display = "none";
  }

  createContainer() {
    this.container = document.createElement("div");
    this.container.className = "datepicker-container";

    this.container.innerHTML = `
      <div class="datepicker-header">
        <button class="prev-month">&lt;</button>
        <span class="month-year"></span>
        <button class="next-month">&gt;</button>
      </div>
      <table class="datepicker-table">
        <thead>
          <tr>${jalali_weekdays.map((day) => `<th>${day}</th>`).join("")}</tr>
        </thead>
        <tbody></tbody>
      </table>
    `;

    this.container
      .querySelector(".prev-month")
      .addEventListener("click", () => this.changeMonth(-1));
    this.container
      .querySelector(".next-month")
      .addEventListener("click", () => this.changeMonth(1));
    this.container.addEventListener("click", (e) => {
      if (
        e.target.tagName === "TD" &&
        !e.target.classList.contains("disabled")
      ) {
        this.selectDate(e.target);
      }
    });
  }

  updateCalendar() {
    const [currentYear, currentMonth] = this.jalaliDate;

    this.container.querySelector(".month-year").textContent = `${
      jalali_months[currentMonth - 1]
    } ${currentYear}`;

    const tableBody = this.container.querySelector("tbody");
    tableBody.innerHTML = "";

    const daysInMonth = this.getJalaliDaysInMonth(currentYear, currentMonth);
    const firstDayOfWeek = getJalaliFirstDayOfWeek(currentYear, currentMonth);

    let row = document.createElement("tr");
    for (let i = 0; i < firstDayOfWeek; i++) {
      row.innerHTML += '<td class="disabled"></td>';
    }

    // 📌 امروز شمسی
    const [jyToday, jmToday, jdToday] = gregorian_to_jalali(
      new Date().getFullYear(),
      new Date().getMonth() + 1,
      new Date().getDate()
    );

    for (let day = 1; day <= daysInMonth; day++) {
      const cell = document.createElement("td");
      cell.textContent = day;
      cell.dataset.day = day;
      cell.dataset.month = currentMonth;
      cell.dataset.year = currentYear;

      const dayOfWeekIndex = (firstDayOfWeek + day - 1) % 7;
      // ✨ اضافه کردن کلاس برای روز جمعه
      if (dayOfWeekIndex === 6) {
        // 6 = جمعه
        cell.classList.add("friday");
      }

 

      // ✨ امروز
      if (
        jyToday === currentYear &&
        jmToday === currentMonth &&
        jdToday === day
      ) {
        cell.classList.add("today");
        if (!this.input.value) {
          this.input.value = `${jyToday}/${String(jmToday).padStart(
            2,
            "0"
          )}/${String(jdToday).padStart(2, "0")}`;
        }
      }

      if ((firstDayOfWeek + day - 1) % 7 === 0 && day !== 1) {
        tableBody.appendChild(row);
        row = document.createElement("tr");
      }
      row.appendChild(cell);
    }
    tableBody.appendChild(row);

    // ✨ هایلایت روز انتخاب‌شده
    if (this.input.value) {
      const parts = this.input.value.split("/").map((v) => parseInt(v, 10));
      if (parts.length === 3) {
        const [sy, sm, sd] = parts;
        const cells = this.container.querySelectorAll(".datepicker-table td");
        cells.forEach((cell) => {
          if (
            parseInt(cell.dataset.year, 10) === sy &&
            parseInt(cell.dataset.month, 10) === sm &&
            parseInt(cell.dataset.day, 10) === sd
          ) {
            cell.classList.add("selected");
          } else {
            cell.classList.remove("selected");
          }
        });
      }
    }
  }

  getJalaliDaysInMonth(year, month) {
    if (month <= 6) return 31;
    if (month <= 11) return 30;
    const leap = (year % 33) % 4 === 1;
    return leap ? 30 : 29;
  }

  changeMonth(delta) {
    let [year, month] = this.jalaliDate;
    month += delta;
    if (month < 1) {
      month = 12;
      year--;
    } else if (month > 12) {
      month = 1;
      year++;
    }
    this.jalaliDate = [year, month, 1];
    this.updateCalendar();
  }

  selectDate(cell) {
    const year = parseInt(cell.dataset.year, 10);
    const month = parseInt(cell.dataset.month, 10);
    const day = parseInt(cell.dataset.day, 10);
    this.input.value = `${year}/${String(month).padStart(2, "0")}/${String(
      day
    ).padStart(2, "0")}`;
    this.hide();
  }

  positionContainer() {
    const rect = this.input.getBoundingClientRect();
    this.container.style.top = `${rect.bottom + window.scrollY}px`;
    this.container.style.left = `${rect.left + window.scrollX}px`;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  new JalaliDatePicker("jalaliDatePicker");
});
