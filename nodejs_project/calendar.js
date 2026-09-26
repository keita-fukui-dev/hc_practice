"use strict";

const args = process.argv.slice(2); // argvは引数の配列。[0]はNode.js本体、[1]はこのスクリプトの絶対パス、[2]以降が指定した引数なので、slice(2)で取り出す。

const now = new Date();
const year = now.getFullYear();
let month = now.getMonth() + 1;

const mIndex = args.indexOf("-m");
if (mIndex !== -1) {
  const value = args[mIndex + 1];
  const parsed = Number(value);

  if (!value || !Number.isInteger(parsed) || parsed < 1 || parsed > 12) {
    process.stderr.write(
      `エラー: -m の引数が不正です(1~12の数値を指定してください)。指定値: "${value}"\n`, // 改行のため\nを使用。console.errorなら予め組み込まれているため不要だが、全体の統一感を考慮してprocess.stderr.writeを採用。
    );
    process.exit(1); // exitの戻り値：0は成功、1はエラー。シェルへ状態を通知する。
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
  process.stdout.write(`${dayText} `); // console.log ではないので、改行されずに横に数字が並んでいく
  if (i.getDay() === 6) {
    process.stdout.write(`\n`);
  }
}
process.stdout.write(`\n`);
