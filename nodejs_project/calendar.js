"use strict";

const args = process.argv.slice(2);

const now = new Date();
const year = now.getFullYear();
let month = now.getMonth() + 1;

const mIndex = args.indexOf("-m");
if (mIndex !== -1) {
  const value = args[mIndex + 1];
  const parsed = Number(value);

  if (!value || Number.isNaN(parsed) || parsed < 1 || parsed > 12) {
    process.stderr.write(
      `エラー: -m の引数が不正です(1~12の数値を指定してください)。指定値: "${value}"\n`,
    );
    process.exit(1);
  }
  month = parsed;
}

// その月の最初の日を取得して
const firstDay = new Date(year, month - 1, 1);
// console.log(firstDay.toLocaleDateString("ja-JP"));

// 最後の日を取得して
const lastDay = new Date(year, month, 1 - 1);
// console.log(lastDay.toLocaleDateString("ja-JP"));

// カレンダーの最初の1行を作成して
console.log(`     ${month}月 ${year}年     `);
console.log(" 日 月 火 水 木 金 土 ");
// 最初の日から最後の日までを配列に入れる

const startWeekday = firstDay.getDay();
for (let i = 0; i < startWeekday; i++) {
  process.stdout.write("   ");
}

for (let i = new Date(firstDay); i <= lastDay; i.setDate(i.getDate() + 1)) {
  const dayText = String(i.getDate()).padStart(2, " ");
  process.stdout.write(`${dayText} `);
  if (i.getDay() === 6) {
    process.stdout.write(`\n`);
  }
}
process.stdout.write(`\n`);
