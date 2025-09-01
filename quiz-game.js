// ゲーム設定
const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    backgroundColor: "#333",
    parent: "game-container",
    scene: [TitleScene, QuizScene, ResultScene]
};

let game = new Phaser.Game(config);

// クイズデータ
const quizData = [
    { question: "鎌倉幕府を開いた人物は？", choices: ["源頼朝", "足利尊氏", "織田信長", "徳川家康"], answer: 0 },
    { question: "日本の最北端にある島は？", choices: ["択捉島", "沖ノ鳥島", "与那国島", "佐渡島"], answer: 0 },
    { question: "1945年に終わった戦争は？", choices: ["日清戦争", "太平洋戦争", "日露戦争", "朝鮮戦争"], answer: 1 },
    { question: "三権分立で司法を担当するのは？", choices: ["国会", "内閣", "裁判所", "内務省"], answer: 2 },
    { question: "日本の首都は？", choices: ["大阪", "京都", "東京", "名古屋"], answer: 2 },
    // ここに50問くらい追加可能
];

// ======= シーン定義 =======
class TitleScene extends Phaser.Scene {
    constructor() { super({ key: 'TitleScene' }); }
    create() {
        this.add.text(400, 200, "社会クイズゲーム", { fontSize: '40px', fill: '#fff' }).setOrigin(0.5);
        const startButton = this.add.text(400, 400, "スタート", { fontSize: '32px', fill: '#0f0' }).setOrigin(0.5).setInteractive();
        startButton.on('pointerdown', () => this.scene.start('QuizScene'));
    }
}

class QuizScene extends Phaser.Scene {
    constructor() { super({ key: 'QuizScene' }); }
    create() {
        this.score = 0;
        this.currentQuestionIndex = 0;
        this.questions = Phaser.Utils.Array.Shuffle(quizData).slice(0, 25);
        this.timeLeft = 15;
        this.createQuestion();
        this.timerText = this.add.text(700, 20, "15", { fontSize: '32px', fill: '#fff' });
        this.timeEvent = this.time.addEvent({
            delay: 1000,
            callback: () => {
                this.timeLeft--;
                this.timerText.setText(this.timeLeft);
                if (this.timeLeft <= 0) {
                    this.nextQuestion(false);
                }
            },
            loop: true
        });
    }
    createQuestion() {
        this.children.removeAll();
        const q = this.questions[this.currentQuestionIndex];
        this.add.text(400, 100, q.question, { fontSize: '28px', fill: '#fff', wordWrap: { width: 700 } }).setOrigin(0.5);
        q.choices.forEach((choice, i) => {
            const btn = this.add.text(400, 200 + i * 60, choice, { fontSize: '24px', fill: '#0ff' }).setOrigin(0.5).setInteractive();
            btn.on('pointerdown', () => this.checkAnswer(i));
        });
        this.add.text(100, 20, `スコア: ${this.score}`, { fontSize: '24px', fill: '#fff' });
        this.timerText = this.add.text(700, 20, this.timeLeft, { fontSize: '32px', fill: '#fff' });
    }
    checkAnswer(i) {
        const correct = this.questions[this.currentQuestionIndex].answer;
        if (i === correct) this.score += 4;
        this.nextQuestion(true);
    }
    nextQuestion(resetTimer) {
        if (resetTimer) this.timeLeft = 15;
        this.currentQuestionIndex++;
        if (this.currentQuestionIndex >= this.questions.length) {
            this.scene.start('ResultScene', { score: this.score });
        } else {
            this.createQuestion();
        }
    }
}

class ResultScene extends Phaser.Scene {
    constructor() { super({ key: 'ResultScene' }); }
    init(data) { this.finalScore = data.score; }
    create() {
        this.add.text(400, 200, `お疲れさま！\nスコア: ${this.finalScore}`, { fontSize: '32px', fill: '#fff', align: 'center' }).setOrigin(0.5);
        const retryBtn = this.add.text(400, 400, "もう一度", { fontSize: '32px', fill: '#0f0' }).setOrigin(0.5).setInteractive();
        retryBtn.on('pointerdown', () => this.scene.start('TitleScene'));
    }
}
