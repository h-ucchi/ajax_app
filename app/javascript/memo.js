function post (){
  const submit = document.getElementById("submit");
  submit.addEventListener("click", (e) => { //「投稿ボタンがクリックされたこと」を認識すべくsubmit.addEventListenerと記述
    e.preventDefault(); //preventDefault()の対象をeとすることにより、「投稿ボタンをクリックした」という現象を無効化
    const form = document.getElementById("form"); //フォームの要素をサーバー側で取得（getElementByIdメソッドで取得したフォームの要素を変数formに格納）
    const formData = new FormData(form); //フォームの値をサーバー側で取得（新たに生成したFormDataオブジェクトを変数formDataに格納）
    const XHR = new XMLHttpRequest(); //非同期通信を行うためにXMLHttpRequestオブジェクトを生成（変数名のXHRはXMLHttpRequestの略）
    XHR.open("POST", "/posts", true); //openメソッドを用いて、リクエスト内容を指定（非同期で投稿したメモをデータベースに保存したいので、HTTPメソッドにはPOSTを指定）
    XHR.responseType = "json"; //responseTypeプロパティを使用して、受け取るレスポンスのデータフォーマットをjsonに指定
    XHR.send(formData); //フォームに入力された内容をサーバー側に送信
  })
};

window.addEventListener('load', post);
