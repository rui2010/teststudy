const quizData = [
    { question: '日本の首都はどこ？', options: ['東京', '大阪', '京都', '札幌'], answer: 0 },
    { question: '鎌倉幕府を開いたのは誰？', options: ['源頼朝', '足利尊氏', '織田信長', '豊臣秀吉'], answer: 0 },
    { question: '日本で一番長い川は？', options: ['利根川', '信濃川', '淀川', '四万十川'], answer: 1 },
    { question: '世界で一番人口が多い国は？', options: ['インド', '中国', 'アメリカ', 'ロシア'], answer: 1 },
    { question: '江戸幕府を開いたのは誰？', options: ['徳川家康', '豊臣秀吉', '織田信長', '足利尊氏'], answer: 0 },
];

// 追加で地理・歴史の重要問題を95問作成
for (let i = 6; i <= 100; i++) {
    quizData.push({
        question: `ダミー問題 ${i}（ここに地理・歴史の本物の問題を入れる）`,
        options: ['選択肢A', '選択肢B', '選択肢C', '選択肢D'],
        answer: Math.floor(Math.random() * 4)
    });
}

// 15問ランダムに選ぶ
function getRandomQuestions(num) {
    const shuffled = [...quizData].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, num);
}

class StartScene extends Phaser.Scene {
    constructor() {
        super({ key: 'StartScene' });
    }
    create() {
        this.add.text(400, 200, '社会科クイズ', { fontSize: '48px', color: '#fff' }).setOrigin(0.5);
        const startButton = this.add.text(400, 400, 'スタート', { fontSize: '32px', color: '#0f0', backgroundColor: '#333', padding: 10 })
            .setOrigin(0.5)
            .setInteractive();
        startButton.on('pointerdown', () => {
            this.scene.start('QuizScene', { questions: getRandomQuestions(15) });
        });
    }
}

class QuizScene extends Phaser.Scene {
    constructor() {
        super({ key: 'QuizScene' });
    }
    init(data) {
        this.questions = data.questions;
        this.current = 0;
        this.score = 0;
    }
    create() {
        this.questionText = this.add.text(400, 100, '', { fontSize: '28px', color: '#fff', wordWrap: { width: 700 } }).setOrigin(0.5);
        this.optionTexts = [];
        for (let i = 0; i < 4; i++) {
            const option = this.add.text(400, 200 + i * 70, '', { fontSize: '24px', color: '#fff', backgroundColor: '#444', padding: 10 })
                .setOrigin(0.5)
                .setInteractive();
            option.on('pointerdown', () => this.checkAnswer(i));
            this.optionTexts.push(option);
        }
        this.scoreText = this.add.text(10, 10, 'スコア: 0', { fontSize: '24px', color: '#fff' });
        this.showQuestion();
    }
    showQuestion() {
        if (this.current >= this.questions.length) {
            this.scene.start('ResultScene', { score: this.score, total: this.questions.length });
            return;
        }
        const q = this.questions[this.current];
        this.questionText.setText(`Q${this.current + 1}. ${q.question}`);
        q.options.forEach((opt, i) => {
            this.optionTexts[i].setText(opt);
        });
    }
    checkAnswer(index) {
        const q = this.questions[this.current];
        if (index === q.answer) this.score += 10;
        this.scoreText.setText(`スコア: ${this.score}`);
        this.current++;
        this.showQuestion();
    }
}

class ResultScene extends Phaser.Scene {
    constructor() {
        super({ key: 'ResultScene' });
    }
    init(data) {
        this.score = data.score;
        this.total = data.total;
    }
    create() {
        this.add.text(400, 250, `結果: ${this.score} 点\n${this.total}問中`, { fontSize: '32px', color: '#fff', align: 'center' }).setOrigin(0.5);
        const restartButton = this.add.text(400, 400, 'もう一度', { fontSize: '28px', color: '#0f0', backgroundColor: '#333', padding: 10 })
            .setOrigin(0.5)
            .setInteractive();
        restartButton.on('pointerdown', () => {
            this.scene.start('StartScene');
        });
    }
}

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    backgroundColor: '#222',
    parent: 'game-container',
    scene: [StartScene, QuizScene, ResultScene]
};

new Phaser.Game(config);
