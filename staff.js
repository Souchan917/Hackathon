document.addEventListener('DOMContentLoaded', () => {
    // 要素の取得
    const trainBtn = document.getElementById('trainBtn');
    const bombBtn = document.getElementById('bombBtn');
    const backBtn = document.getElementById('backToSelectionBtn');
    const displayArea = document.getElementById('displayArea');
    const displayOptions = document.querySelector('.display-options');
    
    // 車両番号表示を選択
    trainBtn.addEventListener('click', () => {
        // 同じタブで車両番号表示ページに遷移
        window.location.href = 'train.html';
    });
    
    // 爆弾カウントダウン表示を選択
    bombBtn.addEventListener('click', () => {
        // 同じタブで爆弾カウントダウン表示ページに遷移
        window.location.href = 'bomb.html';
    });
    
    // 選択画面に戻るボタン（現在は使用していないが、将来的に必要になる場合のため）
    backBtn.addEventListener('click', () => {
        // 選択画面に戻る
        window.location.href = 'index.html';
    });
}); 