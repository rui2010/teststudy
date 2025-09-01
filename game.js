window.startQuizGame = function () {
    const quizData = [
        // ▼ここに100問のクイズデータを作成
        { question: "日本で一番面積が大きい都道府県は？", options: ["北海道", "岩手県", "福島県", "長野県"], answer: 0 },
        { question: "鎌倉幕府を開いた人物は？", options: ["足利尊氏", "源頼朝", "織田信長", "徳川家康"], answer: 1 },
        { question: "世界で一番長い川は？", options: ["ナイル川", "アマゾン川", "ミシシッピ川", "長江"], answer: 0 },
        { question: "日本の国会は何院制？", options: ["一院制", "二院制", "三院制", "四院制"], answer: 1 },
        { question: "フランスの首都は？", options: ["ベルリン", "パリ", "ローマ", "マドリード"], answer: 1 },
        // …後で100問に拡張
    ];

    // 100問に拡張（ダミーで追加）
    for (let i = quizData.length; i < 100; i++) {
        quizData.push({
            question: `ダミー問題${i + 1}：サンプル？`,
            options: ["A", "B", "C", "D"],
            answer: Math.floor(Math.random() * 4)
        });
    }

    // ランダムに15問選ぶ
    const selectedQuestions = Phaser.Utils.Array.Shuffle(quizData).slice(0, 15);

    const config = {
        type: Phaser.AUTO,
        width: 800,
        height: 600,
        parent: 'game-container',
        backgroundColor: '#ffffff',
        scene: {
            preload: preload,
            create: create
        }
    };

    const game = new Phaser.Game(config);
    let score = 0;
    let currentIndex = 0;
    let questionText, optionButtons = [];

    function preload() {}

    function create() {
        showQuestion();
    }

    function showQuestion() {
        if (questionText) questionText.destroy();
        optionButtons.forEach(btn => btn.destroy());
        optionButtons = [];

        if (currentIndex >= selectedQuestions.length) {
            showResult();
            return;
        }

        const q = selectedQuestions[currentIndex];
        questionText = this.add.text(400, 100, `Q${currentIndex + 1}: ${q.question}`, {
            fontSize: '28px', color: '#000', wordWrap: { width: 700 }
        }).setOrigin(0.5);

        for (let i = 0; i < 4; i++) {
            const btn = this.add.text(400, 200 + i * 80, q.options[i], {
                fontSize: '24px',
                color: '#fff',
                backgroundColor: '#007bff',
                padding: { x: 20, y: 10 }
            }).setOrigin(0.5).setInteractive();

            btn.on('pointerdown', () => {
                if (i === q.answer) score++;
                currentIndex++;
                showQuestion.call(this);
            });

            btn.on('pointerover', () => btn.setStyle({ backgroundColor: '#0056b3' }));
            btn.on('pointerout', () => btn.setStyle({ backgroundColor: '#007bff' }));

            optionButtons.push(btn);
        }
    }

    function showResult() {
        if (questionText) questionText.destroy();
        optionButtons.forEach(btn => btn.destroy());
        this.add.text(400, 200, `テスト終了！\nあなたのスコア: ${score}/${selectedQuestions.length}`, {
            fontSize: '32px',
            color: '#333',
            align: 'center'
        }).setOrigin(0.5);

        const retryBtn = this.add.text(400, 400, 'もう一度', {
            fontSize: '28px',
            color: '#fff',
            backgroundColor: '#28a745',
            padding: { x: 30, y: 15 }
        }).setOrigin(0.5).setInteractive();

        retryBtn.on('pointerdown', () => {
            game.destroy(true);
            window.startQuizGame();
        });

        retryBtn.on('pointerover', () => retryBtn.setStyle({ backgroundColor: '#218838' }));
        retryBtn.on('pointerout', () => retryBtn.setStyle({ backgroundColor: '#28a745' }));
    }
};
