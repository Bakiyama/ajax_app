class PostsController < ApplicationController
  def index 
    @posts = Post.all.order(id: "DESC")
  end

  def create
    Post.create(content: params[:content])
    redirect_to action: :index
  end

  def checked
    post = Post.find(params[:id])
    if post.checked # postsテーブルのレコードで、「checkedカラムの中身が入っていないか」を見る
      post.update(checked: false)
      # false＝入っていたので、中身を除く
    else
      post.update(checked: true)
      # true＝入っていないので、中身を加える
    end

    item = Post.find(params[:id])
    render json: { post: item } 
    # itemにif文の判定後の内容を代入し、javascriptに渡す為にjsonに入れる。
  end
end
