<!DOCTYPE html>
<html lang="zh-TW">
<head>
    <meta charset="UTF-8">
    <title>全學段學習挑戰站</title>
</head>
<body>

    <!-- 您原本的網頁 UI（下拉選單與開始按鈕） -->
    <!-- 這裡的 id 需對應下方的程式碼 -->
    <select id="stageSelect">
        <option value="國小">國小</option>
        <option value="國中">國中</option>
        <option value="高中">高中</option>
    </select>
    
    <select id="gradeSelect">
        <option value="國小三年級">國小三年級</option>
        <!-- 其他年級... -->
    </select>

    <select id="subjectSelect">
        <option value="數學">數學</option>
        <option value="英文">英文</option>
        <option value="資訊">資訊</option>
    </select>

    <select id="countSelect">
        <option value="5">5 題</option>
        <option value="10">10 題</option>
    </select>

    <!-- 您的開始測驗按鈕 -->
    <button id="startBtn">開始測驗 →</button>


    <!-- ========================================== -->
    <!-- 貼在這裡：</body> 之前的 script 區塊 -->
    <!-- ========================================== -->
    <script>
        // 1. 先貼上剛才幫您寫的 QuizGenerator 類別
        class QuizGenerator {
            constructor() {
                this.names = ["小明", "小華", "小美", "阿豪"];
                this.items = ["蘋果", "鉛筆", "橡皮擦", "香蕉"];
                this.englishWords = [{ q: "apple", a: "蘋果" }, { q: "banana", a: "香蕉" }];
            }
            generate(stage, grade, subject, count = 5) {
                const questions = [];
                for (let i = 0; i < count; i++) {
                    let qData = (subject === "數學") ? this._math(stage, grade) : this._english(stage, grade);
                    questions.push({
                        stage: stage, grade: grade, subject: subject,
                        question: qData.question, options: qData.options,
                        answer: qData.answer, explanation: qData.explanation, source: "演算法即時生成"
                    });
                }
                return questions;
            }
            _math(stage, grade) {
                const num1 = Math.floor(Math.random() * 50) + 10;
                const num2 = Math.floor(Math.random() * 9) + 2;
                return {
                    question: `隨機數學題：${num2} 盒蘋果，每盒有 ${num1} 個，總共幾個？`,
                    options: [`${num1*num2-5}`, `${num1*num2}`, `${num1*num2+5}`, `${num1+num2}`],
                    answer: 1,
                    explanation: `計算：${num1} × ${num2} = ${num1*num2}`
                };
            }
            _english() {
                return { question: "「apple」是什麼意思？", options: ["蘋果", "香蕉", "貓", "狗"], answer: 0, explanation: "apple 即蘋果。" };
            }
        }

        // 2. 初始化產生器
        const generator = new QuizGenerator();

        // 3. 綁定按鈕點擊事件
        document.getElementById('startBtn').addEventListener('click', () => {
            // 讀取使用者選了什麼
            const stage = document.getElementById('stageSelect').value;
            const grade = document.getElementById('gradeSelect').value;
            const subject = document.getElementById('subjectSelect').value;
            const count = parseInt(document.getElementById('countSelect').value) || 5;

            // 呼叫產生器生成 100% 相容您格式的題目 JSON 陣列
            const newQuestions = generator.generate(stage, grade, subject, count);

            console.log("成功生成新題目：", newQuestions);

            // 接下來可以將 newQuestions 丟進您原本負責「把題目畫在網頁上」的函數中
            // 例如：您的渲染函數名為 renderQuiz(newQuestions);
        });
    </script>
</body>
</html>
