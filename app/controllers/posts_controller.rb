class PostsController < ApplicationController

  def index
    @posts = Post.order(id: "DESC")
  end

  #def new
  #end

  def create
    post = Post.create(content: params[:content]) #レスポンスをjsonで返すための前処理（post変数の定義）
    render json:{ post: post} #レスポンスをjson形式で返す
  end
end
