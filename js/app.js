//DOMをキャッシュする
let table = document.querySelector('.table');
let tbody = table.getElementsByTagName('tbody')[0];
let start_btn = document.getElementById('start');
let end_btn = document.getElementById('stop');
let sort_btn = document.getElementById('sort');


//TABEL_DATAのデータをテーブルに表示する
window.addEventListener('load', (e)=>{
    displayTable(TABLE_DATA);
});


//オブジェクトの配列を受け取り、テーブルの行を作り、データを表示する
function displayTable(arr_of_object){
    arr_of_object.forEach(data => {
        let newRow = tbody.insertRow(-1);
        //id, thumbnailUrl, name, priceの順にデータを行に入れる
        //もっといい方法があるはず
        let newCell, newText; 
        //idセルの挿入
        newCell = newRow.insertCell(-1);
        newText = document.createTextNode(data.id);
        newCell.appendChild(newText);
        //thumbnailUrlセルの挿入
        newCell = newRow.insertCell(-1);
        let newImg = document.createElement('img');
        newImg.setAttribute('src', data.thumbnailUrl);
        newCell.appendChild(newImg);
        //nameセルの挿入
        newCell = newRow.insertCell(-1);
        newText = document.createTextNode(data.name);
        newCell.appendChild(newText);
        //priceセルの挿入
        newCell = newRow.insertCell(-1);
        newText = document.createTextNode(data.price);
        newCell.appendChild(newText);
    });
}


//配列をシャッフルする
function shuffle(array){
    if(!Array.isArray(array) || array === false){
        return 'invalid input';
    }
    for(let i = array.length - 1; i > 0; i--){
    let randumNum = Math.floor(Math.random()*i);
    [array[randumNum], array[i]] = [array[i], array[randumNum]];
    }
    return array;
}


//sortボタンがクリックされた場合
sort_btn.addEventListener('click', (e)=>{
    //TABEL_DATAを昇順にソートする
    TABLE_DATA.sort((a, b) => {
        return a.id - b.id
    })
    //テーブルの行を空にする
    for(var i = tbody.rows.length; i > 0; i--){
        table.deleteRow(i);
    }
    //ソートされたデータを表示
    displayTable(TABLE_DATA);
})


//start randomボタンをクリックされた場合
let intervalId;
start_btn.addEventListener('click', (e)=>{
    intervalId = setInterval(()=>{
        //テーブルの行を空にする
        for(var i = tbody.rows.length; i > 0; i--){
            table.deleteRow(i);
        }
        //TABLE_DATAをシャッフルして、表示する
        shuffle(TABLE_DATA);
        displayTable(TABLE_DATA);
    }, 1000);
},false)


//end randomボタンをクリックされた場合
end_btn.addEventListener('click', (e)=>{
    clearInterval(intervalId);
})

