document.addEventListener('DOMContentLoaded', () => {
    // 要素の取得
    const carNumber = document.getElementById('carNumber');
    const carInput = document.getElementById('carInput');
    const decrementBtn = document.getElementById('decrementBtn');
    const incrementBtn = document.getElementById('incrementBtn');
    const applyBtn = document.getElementById('applyBtn');
    const carName = document.querySelector('.car-name');

    // 最大車両数
    const MAX_CARS = 3600;
    let autoDecreaseInterval = null;

    // 車両名を固定
    carName.textContent = 'GATANGO';

    // 車両番号を更新する関数
    function updateCarNumber(number) {
        if (number < 1) number = 1;
        if (number > MAX_CARS) number = MAX_CARS;
        
        // 数字を更新
        carNumber.textContent = number;
        carInput.value = number;
        
        // 桁数に応じてクラスを更新
        updateDigitClass(number);
    }

    // 桁数に応じたクラスを更新する関数
    function updateDigitClass(number) {
        // 既存の桁数クラスをすべて削除
        carNumber.classList.remove('digits-1', 'digits-2', 'digits-3', 'digits-4');
        
        // 桁数を計算
        const digitCount = number.toString().length;
        
        // 桁数に応じたクラスを追加
        carNumber.classList.add(`digits-${digitCount}`);
    }

    // 自動的に番号を減少させる関数
    function startAutoDecrease() {
        if (autoDecreaseInterval) {
            clearInterval(autoDecreaseInterval);
        }
        
        autoDecreaseInterval = setInterval(() => {
            const currentNumber = parseInt(carInput.value);
            if (currentNumber > 1) {
                updateCarNumber(currentNumber - 1);
            } else {
                // 1まで減少したら一旦停止
                stopAutoDecrease();
            }
        }, 1000);
    }

    // 自動減少を停止する関数
    function stopAutoDecrease() {
        if (autoDecreaseInterval) {
            clearInterval(autoDecreaseInterval);
            autoDecreaseInterval = null;
        }
    }

    // ボタンのイベントリスナー
    decrementBtn.addEventListener('click', () => {
        stopAutoDecrease();
        const currentNumber = parseInt(carInput.value);
        updateCarNumber(currentNumber - 1);
    });

    incrementBtn.addEventListener('click', () => {
        stopAutoDecrease();
        const currentNumber = parseInt(carInput.value);
        updateCarNumber(currentNumber + 1);
    });

    applyBtn.addEventListener('click', () => {
        stopAutoDecrease();
        const inputNumber = parseInt(carInput.value);
        updateCarNumber(inputNumber);
        // 適用ボタンを押したら自動減少を開始
        startAutoDecrease();
    });

    // 入力フィールドの変更イベント
    carInput.addEventListener('change', () => {
        stopAutoDecrease();
        const inputNumber = parseInt(carInput.value);
        if (isNaN(inputNumber) || inputNumber < 1) {
            carInput.value = 1;
        } else if (inputNumber > MAX_CARS) {
            carInput.value = MAX_CARS;
        }
    });

    // キーボードイベント
    document.addEventListener('keydown', (e) => {
        const currentNumber = parseInt(carInput.value);
        
        if (e.key === 'ArrowUp' || e.key === 'ArrowRight') {
            stopAutoDecrease();
            updateCarNumber(currentNumber + 1);
            e.preventDefault();
        } else if (e.key === 'ArrowDown' || e.key === 'ArrowLeft') {
            stopAutoDecrease();
            updateCarNumber(currentNumber - 1);
            e.preventDefault();
        } else if (e.key === 'Enter') {
            stopAutoDecrease();
            updateCarNumber(currentNumber);
            startAutoDecrease();
            e.preventDefault();
        }
    });

    // 初期表示
    updateCarNumber(MAX_CARS);
    // 自動減少を開始
    startAutoDecrease();
}); 