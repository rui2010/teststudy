const quizData = [
    // ✅ 日本史
    { question: '日本の首都はどこ？', options: ['東京', '大阪', '京都', '札幌'], answer: 0 },
    { question: '鎌倉幕府を開いたのは誰？', options: ['源頼朝', '足利尊氏', '織田信長', '豊臣秀吉'], answer: 0 },
    { question: '江戸幕府を開いたのは誰？', options: ['徳川家康', '豊臣秀吉', '織田信長', '足利尊氏'], answer: 0 },
    { question: '大化の改新が始まったのは何年？', options: ['645年', '710年', '794年', '1185年'], answer: 0 },
    { question: '平安京に都が移されたのは何年？', options: ['710年', '794年', '1185年', '1603年'], answer: 1 },
    // ✅ 世界史
    { question: '産業革命が始まった国はどこ？', options: ['イギリス', 'フランス', 'ドイツ', 'アメリカ'], answer: 0 },
    { question: 'アメリカ独立宣言は何年？', options: ['1776年', '1789年', '1812年', '1492年'], answer: 0 },
    { question: 'フランス革命が始まった年は？', options: ['1776年', '1789年', '1848年', '1914年'], answer: 1 },
    { question: 'ローマ帝国が西ローマと東ローマに分裂した年は？', options: ['395年', '476年', '1453年', '800年'], answer: 0 },
    { question: 'キリスト教を公認したローマ皇帝は？', options: ['コンスタンティヌス', 'ネロ', 'アウグストゥス', 'ユリウス・カエサル'], answer: 0 },
    // ✅ 地理（日本）
    { question: '日本で一番長い川は？', options: ['利根川', '信濃川', '淀川', '四万十川'], answer: 1 },
    { question: '日本で一番大きい湖は？', options: ['琵琶湖', '霞ヶ浦', '諏訪湖', '猪苗代湖'], answer: 0 },
    { question: '北海道の県庁所在地は？', options: ['札幌', '旭川', '函館', '釧路'], answer: 0 },
    { question: '九州で一番面積が大きい県は？', options: ['鹿児島県', '熊本県', '宮崎県', '福岡県'], answer: 0 },
    { question: '日本の本州で最北端の県は？', options: ['青森県', '岩手県', '秋田県', '北海道'], answer: 0 },
    // ✅ 地理（世界）
    { question: '世界で一番人口が多い国は？', options: ['インド', '中国', 'アメリカ', 'ロシア'], answer: 1 },
    { question: '世界で一番面積が広い国は？', options: ['ロシア', 'カナダ', '中国', 'アメリカ'], answer: 0 },
    { question: '世界で一番長い川は？', options: ['ナイル川', 'アマゾン川', '長江', 'ミシシッピ川'], answer: 1 },
    { question: 'エベレストの標高は約何m？', options: ['8848m', '8028m', '9164m', '7890m'], answer: 0 },
    { question: 'サハラ砂漠はどの大陸にある？', options: ['アフリカ', 'アジア', 'オーストラリア', '南アメリカ'], answer: 0 },
    // ✅ ここから追加で80問（日本史・世界史・地理をランダムに）...
];
// 上記の続きを埋める必要あり（合計100問にする）

let selectedQuestions = [];
let currentIndex = 0;
let score = 0;
let userAnswers = [];

window.startQuizGame = function() {
    const config = {
        type: Phaser.AUTO,
        width: 800,
        height: 600,
        backgroundColor: '#222',
        parent: 'game-container',
        scene: { preload, create }
    };
    new Phaser.Game(config);
};

function preload() {}

function create() {
    this.add.text(200, 50, '社会クイズ 実力テスト', { fontSize: '32px', fill: '#fff' });

    // ランダムに15問選択
    selectedQuestions = Phaser.Utils.Array.Shuffle(quizData).slice(0, 15);

    showQuestion(this);
}

function showQuestion(scene) {
    scene.children.removeAll();

    if (currentIndex >= selectedQuestions.length) {
        showResult(scene);
        return;
    }

    const q = selectedQuestions[currentIndex];

    scene.add.text(50, 50, `Q${currentIndex+1}. ${q.question}`, { fontSize: '24px', fill: '#fff' });

    q.options.forEach((opt, i) => {
        const btn = scene.add.text(100, 150 + i * 60, `${i+1}. ${opt}`, { fontSize: '22px', fill: '#00ffcc', backgroundColor: '#333', padding: { x: 10, y: 5 } })
            .setInteractive()
            .on('pointerdown', () => {
                userAnswers.push({ question: q.question, options: q.options, correct: q.answer, selected: i });
                if (i === q.answer) score++;
                currentIndex++;
                showQuestion(scene);
            });
    });
}

function showResult(scene) {
    scene.children.removeAll();

    scene.add.text(200, 50, `結果発表！`, { fontSize: '32px', fill: '#fff' });
    scene.add.text(200, 120, `正解数: ${score} / ${selectedQuestions.length}`, { fontSize: '28px', fill: '#ff0' });
    scene.add.text(200, 180, `正答率: ${(score / selectedQuestions.length * 100).toFixed(1)}%`, { fontSize: '24px', fill: '#0f0' });

    const reviewBtn = scene.add.text(250, 300, '解答を確認する', { fontSize: '26px', fill: '#fff', backgroundColor: '#008' })
        .setInteractive()
        .on('pointerdown', () => {
            showReview(scene, 0);
        });
}

function showReview(scene, index) {
    scene.children.removeAll();

    if (index >= userAnswers.length) {
        scene.add.text(200, 200, 'お疲れさまでした！', { fontSize: '32px', fill: '#fff' });
        return;
    }

    const ans = userAnswers[index];
    scene.add.text(50, 50, `Q${index+1}. ${ans.question}`, { fontSize: '22px', fill: '#fff' });

    ans.options.forEach((opt, i) => {
        let color = '#fff';
        if (i === ans.correct) color = '#0f0';
        if (i === ans.selected && ans.selected !== ans.correct) color = '#f00';
        scene.add.text(80, 150 + i * 50, `${i+1}. ${opt}`, { fontSize: '20px', fill: color });
    });

    const nextBtn = scene.add.text(300, 400, '次へ', { fontSize: '26px', fill: '#fff', backgroundColor: '#008' })
        .setInteractive()
        .on('pointerdown', () => {
            showReview(scene, index + 1);
        });
}
