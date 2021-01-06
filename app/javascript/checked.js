function check() {
  const posts = document.querySelectorAll(".post");
  posts.forEach(function (post) { 
    if (post.getAttribute("data-load") != null) {
      return null;
    }
    post.setAttribute("data-load", "true");
    post.addEventListener("click", () => { 
      const postId = post.getAttribute("data-id");
      // ビューファイルにて、data-id=<%= post.id %> があるのでクリックしたメモを個別に取得できる。
      const XHR = new XMLHttpRequest();
      XHR.open("GET", `/posts/${postId}`, true);
      XHR.responseType = "json";
      XHR.send();  
      // XHR.sendまでが、ルーティングにリクエストを送信するまでの処理。
      XHR.onload = () => {
        // XHR.onloadからが、コントローラーから情報を受け取ってからの処理。
        if (XHR.status != 200) {
          alert(`Error ${XHR.status}: ${XHR.statusText}`);
          return null;          
        }
        const item = XHR.response.post;
        if (item.checked === true) {
          post.setAttribute("data-check", "true");
        } else if (item.checked === false) {
          post.removeAttribute("data-check");
        }
      };
    });
  });
}
setInterval(check, 1000);