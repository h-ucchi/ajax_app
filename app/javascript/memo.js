const buildHTML = (XHR) => {
  const item = XHR.response.post; //postsコントローラーのcreateアクションにrender json: {post: post}と記述しているため、postというキーと投稿されたメモの内容が紐付いている
  const html = `
  <div class="post">
    <div class="post-date">
      投稿日時：${item.created_at}
    </div>
    <div class="post-content">
      ${item.content}
    </div>
  </div>`;
  return html; //関数buildHTMLの返り値にhtmlを指定
};

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
    XHR.onload = () => { //リクエストの送信が成功したときの処理をonload以下に記載
      if (XHR.status != 200) { //XHR.statusには、HTTPステータスコードが格納される
        alert(`Error ${XHR.status}: ${XHR.statusText}`); //XHR.statusTextには、ステータスコードに応じたメッセージが格納
        return null; //エラーが出た場合に、30行目以降に記述されている処理を行わないようにすることが目的で、エラー発生時はJavaScriptの処理から抜け出す
      };
      const list = document.getElementById("list"); //新しいメモを挿入するための要素を取得して、変数listに格納
      const formText = document.getElementById("content");
        list.insertAdjacentHTML("afterend", buildHtml(XHR)); //insertAdjacentHTMLメソッドの第一引数にafterendを指定することで、変数listに格納された要素の直後に生成したHTMLを挿入
        formText.value = "";
    };
  })
};

window.addEventListener('load', post);
