document.addEventListener('DOMContentLoaded', () => {
    // 要素の取得
    const bombNumber = document.getElementById('bombNumber');
    const bombInput = document.getElementById('bombInput');
    const decrementBtn = document.getElementById('decrementBtn');
    const incrementBtn = document.getElementById('incrementBtn');
    const applyBtn = document.getElementById('applyBtn');
    const backBtn = document.getElementById('backBtn');
    const codeElement = document.querySelector('.code');

    // 最大カウント数
    const MAX_COUNT = 3600;
    let autoDecreaseInterval = null;

    // カウントダウンを更新する関数
    function updateCountdown(number) {
        if (number < 1) number = 1;
        if (number > MAX_COUNT) number = MAX_COUNT;
        
        // 数字を更新
        bombNumber.textContent = number;
        bombInput.value = number;
        
        // コード表示を更新
        codeElement.textContent = `BM-${number}`;
        
        // 桁数に応じてクラスを更新
        updateDigitClass(number);
        
        // 残り時間が少なくなったら点滅速度を上げる
        updateBlinkRate(number);
    }

    // 桁数に応じたクラスを更新する関数
    function updateDigitClass(number) {
        // 既存の桁数クラスをすべて削除
        bombNumber.classList.remove('digits-1', 'digits-2', 'digits-3', 'digits-4');
        
        // 桁数を計算
        const digitCount = number.toString().length;
        
        // 桁数に応じたクラスを追加
        bombNumber.classList.add(`digits-${digitCount}`);
    }

    // 残り時間に応じて点滅速度を変更する関数
    function updateBlinkRate(number) {
        const led = document.querySelector('.led');
        
        // アニメーションを一旦削除
        led.style.animation = 'none';
        
        // 残り時間に応じて点滅速度を変更
        let blinkSpeed;
        if (number <= 10) {
            blinkSpeed = '0.2s';
            bombNumber.style.animation = 'pulse 0.2s infinite';
        } else if (number <= 60) {
            blinkSpeed = '0.5s';
            bombNumber.style.animation = 'pulse 0.5s infinite';
        } else {
            blinkSpeed = '1s';
            bombNumber.style.animation = 'pulse 1s infinite';
        }
        
        // 新しいアニメーションを適用
        setTimeout(() => {
            led.style.animation = `blink ${blinkSpeed} infinite`;
        }, 10);
    }

    // 自動的にカウントダウンする関数
    function startAutoDecrease() {
        if (autoDecreaseInterval) {
            clearInterval(autoDecreaseInterval);
        }
        
        autoDecreaseInterval = setInterval(() => {
            const currentNumber = parseInt(bombInput.value);
            if (currentNumber > 1) {
                updateCountdown(currentNumber - 1);
            } else {
                // 0になったら一旦停止（爆発演出などをここに入れることも可能）
                clearInterval(autoDecreaseInterval);
                triggerExplosionEffect();
            }
        }, 1000);
    }

    // 自動カウントダウンを停止する関数
    function stopAutoDecrease() {
        if (autoDecreaseInterval) {
            clearInterval(autoDecreaseInterval);
            autoDecreaseInterval = null;
        }
    }

    // 爆発演出を行う関数
    function triggerExplosionEffect() {
        // 画面を点滅させる
        document.body.classList.add('explosion');
        
        // 爆発音を再生（必要に応じて）
        // const explosionSound = new Audio('explosion.mp3');
        // explosionSound.play();
        
        // 少し待ってからリセット
        setTimeout(() => {
            document.body.classList.remove('explosion');
            updateCountdown(MAX_COUNT);
            startAutoDecrease();
        }, 3000);
    }

    // 爆発演出用のスタイルを追加
    const style = document.createElement('style');
    style.textContent = `
        @keyframes explode {
            0%, 100% { background-color: #121212; }
            25%, 75% { background-color: #ff0000; }
            50% { background-color: #ffff00; }
        }
        
        .explosion {
            animation: explode 0.5s ease-in-out 3;
        }
    `;
    document.head.appendChild(style);

    // ボタンのイベントリスナー
    decrementBtn.addEventListener('click', () => {
        const currentNumber = parseInt(bombInput.value);
        updateCountdown(currentNumber - 10);
    });

    incrementBtn.addEventListener('click', () => {
        const currentNumber = parseInt(bombInput.value);
        updateCountdown(currentNumber + 10);
    });

    applyBtn.addEventListener('click', () => {
        const inputNumber = parseInt(bombInput.value);
        updateCountdown(inputNumber);
        // リセットボタンとして機能
        if (autoDecreaseInterval) {
            clearInterval(autoDecreaseInterval);
        }
        startAutoDecrease();
    });

    // 選択画面に戻るボタン
    backBtn.addEventListener('click', () => {
        // 自動カウントダウンを停止
        stopAutoDecrease();
        // 選択画面に戻る
        window.location.href = 'index.html';
    });

    // 入力フィールドの変更イベント
    bombInput.addEventListener('change', () => {
        const inputNumber = parseInt(bombInput.value);
        if (isNaN(inputNumber) || inputNumber < 1) {
            bombInput.value = 1;
        } else if (inputNumber > MAX_COUNT) {
            bombInput.value = MAX_COUNT;
        }
    });

    // 初期表示
    updateCountdown(MAX_COUNT);
    // 自動カウントダウンを開始
    startAutoDecrease();
}); 