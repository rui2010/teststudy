const quizData = [
    // ★ 地理50問
    { question: '日本の首都はどこ？', options: ['東京', '大阪', '京都', '札幌'], answer: 0 },
    { question: '日本で一番長い川は？', options: ['利根川', '信濃川', '淀川', '四万十川'], answer: 1 },
    { question: '世界で一番人口が多い国は？', options: ['インド', '中国', 'アメリカ', 'ロシア'], answer: 1 },
    { question: '富士山の標高はおよそ何m？', options: ['2776m', '3376m', '3776m', '4176m'], answer: 2 },
    { question: '日本で最も面積が大きい都道府県は？', options: ['北海道', '岩手県', '福島県', '新潟県'], answer: 0 },
    { question: '世界で最も面積が大きい国は？', options: ['カナダ', '中国', 'ロシア', 'アメリカ'], answer: 2 },
    { question: '東経135度が通る日本の都市は？', options: ['神戸', '京都', '広島', '札幌'], answer: 0 },
    { question: '日本で一番人口が多い都道府県は？', options: ['大阪府', '愛知県', '東京都', '神奈川県'], answer: 2 },
    { question: '世界で最も人口密度が高い国は？', options: ['モナコ', 'バングラデシュ', 'シンガポール', '日本'], answer: 0 },
    { question: '日本で一番北にある都道府県は？', options: ['北海道', '青森県', '秋田県', '岩手県'], answer: 0 },
    // …（ここからさらに40問地理を追加）
    { question: 'アフリカで最も人口が多い国は？', options: ['エジプト', 'ナイジェリア', '南アフリカ', 'ケニア'], answer: 1 },
    { question: '世界で最も高い山は？', options: ['エベレスト', 'K2', 'カンチェンジュンガ', 'ローツェ'], answer: 0 },
    { question: '日本海と太平洋をつなぐ海峡は？', options: ['津軽海峡', '宗谷海峡', '対馬海峡', '関門海峡'], answer: 0 },
    { question: '東南アジアで面積が最も大きい国は？', options: ['タイ', 'ミャンマー', 'ベトナム', 'インドネシア'], answer: 3 },
    { question: '日本で一番深い湖は？', options: ['琵琶湖', '田沢湖', '洞爺湖', '猪苗代湖'], answer: 1 },
    { question: '日本で一番大きな湖は？', options: ['田沢湖', '琵琶湖', '霞ヶ浦', '洞爺湖'], answer: 1 },
    { question: '赤道直下にある大陸は？', options: ['アジア', 'アフリカ', 'オセアニア', '南アメリカ'], answer: 1 },
    { question: 'オーストラリアの首都は？', options: ['シドニー', 'メルボルン', 'キャンベラ', 'パース'], answer: 2 },
    { question: '日本で一番南にある島は？', options: ['沖縄本島', '石垣島', '与那国島', '波照間島'], answer: 2 },
    { question: '世界で最も大きな砂漠は？', options: ['サハラ砂漠', 'ゴビ砂漠', 'カラハリ砂漠', 'アタカマ砂漠'], answer: 0 },

    // ★ 歴史50問
    { question: '鎌倉幕府を開いたのは誰？', options: ['源頼朝', '足利尊氏', '織田信長', '豊臣秀吉'], answer: 0 },
    { question: '江戸幕府を開いたのは誰？', options: ['徳川家康', '豊臣秀吉', '織田信長', '足利尊氏'], answer: 0 },
    { question: '大化の改新は何年？', options: ['645年', '794年', '710年', '1185年'], answer: 0 },
    { question: '平安京遷都は何年？', options: ['710年', '794年', '1185年', '1603年'], answer: 1 },
    { question: '明治維新が始まったのは何年？', options: ['1868年', '1853年', '1877年', '1889年'], answer: 0 },
    { question: '江戸幕府が開かれたのは何年？', options: ['1600年', '1603年', '1615年', '1590年'], answer: 1 },
    { question: '織田信長が本能寺で倒れたのは何年？', options: ['1582年', '1600年', '1592年', '1568年'], answer: 0 },
    { question: '日本で最初の貨幣は？', options: ['和同開珎', '寛永通宝', '永楽通宝', '富本銭'], answer: 3 },
    { question: '江戸時代に参勤交代を定めたのは誰？', options: ['徳川家康', '徳川家光', '徳川綱吉', '徳川吉宗'], answer: 1 },
    { question: '鎖国を完成させたのは誰？', options: ['徳川家康', '徳川秀忠', '徳川家光', '徳川吉宗'], answer: 2 },
    // …（ここからさらに40問歴史を追加）
];
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
