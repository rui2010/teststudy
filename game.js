let game;

function startPhaserGame() {
    const config = {
        type: Phaser.AUTO,
        width: 800,
        height: 600,
        parent: 'game-container',
        backgroundColor: '#ffffff',
        scene: [BootScene, QuizScene, ResultScene]
    };
    game = new Phaser.Game(config);
}

// Boot Scene
class BootScene extends Phaser.Scene {
    constructor() {
        super('BootScene');
    }
    preload() {
        this.load.setBaseURL('');
    }
    create() {
        this.scene.start('QuizScene');
    }
}

// Quiz Scene
class QuizScene extends Phaser.Scene {
    constructor() {
        super('QuizScene');
    }

    init() {
        this.currentQuestionIndex = 0;
        this.score = 0;
        this.questions = Phaser.Utils.Array.Shuffle(quizData).slice(0, 15);
    }

    create() {
        this.add.text(400, 50, '社会 実力テスト', { fontSize: '32px', color: '#000' }).setOrigin(0.5);

        this.questionText = this.add.text(400, 150, '', { fontSize: '24px', color: '#000', wordWrap: { width: 700 } }).setOrigin(0.5);

        this.optionButtons = [];
        for (let i = 0; i < 4; i++) {
            const btn = this.add.text(400, 250 + i * 70, '', { fontSize: '20px', backgroundColor: '#eee', padding: { x: 10, y: 10 }, color: '#000' })
                .setOrigin(0.5)
                .setInteractive({ useHandCursor: true })
                .on('pointerdown', () => this.checkAnswer(i));
            this.optionButtons.push(btn);
        }

        this.scoreText = this.add.text(650, 20, 'スコア: 0', { fontSize: '20px', color: '#000' });
        this.showQuestion();
    }

    showQuestion() {
        if (this.currentQuestionIndex >= this.questions.length) {
            this.scene.start('ResultScene', { score: this.score, total: this.questions.length });
            return;
        }

        const q = this.questions[this.currentQuestionIndex];
        this.questionText.setText(`Q${this.currentQuestionIndex + 1}. ${q.question}`);
        q.options.forEach((opt, i) => {
            this.optionButtons[i].setText(opt);
        });
    }

    checkAnswer(selectedIndex) {
        const q = this.questions[this.currentQuestionIndex];
        if (selectedIndex === q.answer) {
            this.score += 10;
        }
        this.scoreText.setText(`スコア: ${this.score}`);
        this.currentQuestionIndex++;
        this.showQuestion();
    }
}

// Result Scene
class ResultScene extends Phaser.Scene {
    constructor() {
        super('ResultScene');
    }
    create(data) {
        this.add.text(400, 200, 'テスト終了！', { fontSize: '32px', color: '#000' }).setOrigin(0.5);
        this.add.text(400, 300, `スコア: ${data.score} / ${data.total * 10}`, { fontSize: '28px', color: '#000' }).setOrigin(0.5);
        this.add.text(400, 400, 'リロードで再挑戦', { fontSize: '20px', color: '#000' }).setOrigin(0.5);
    }
}

// 100問データ
const quizData = [
    { question: '日本の首都はどこ？', options: ['東京', '大阪', '京都', '札幌'], answer: 0 },
    { question: '鎌倉幕府を開いたのは誰？', options: ['源頼朝', '足利尊氏', '織田信長', '豊臣秀吉'], answer: 0 },
    { question: '日本で一番長い川は？', options: ['利根川', '信濃川', '淀川', '四万十川'], answer: 1 },
    { question: '世界で一番人口が多い国は？', options: ['インド', '中国', 'アメリカ', 'ロシア'], answer: 1 },
    { question: '江戸幕府を開いたのは誰？', options: ['徳川家康', '豊臣秀吉', '織田信長', '足利尊氏'], answer: 0 },
    // ここから90問追加（地理・歴史混合）
];

// ※ここで90問を埋めて合計100問にする
