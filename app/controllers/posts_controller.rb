class PostsController < ApplicationController

  def index
    @posts = Post.order(id: "DESC")
  end

  #def new
  #end

  def create
    Post.create(content: params[:content])
    redirect_to action: :index #メモを保存した後にトップページにリダイレクトされるようにする（自動でトップページに戻る処理）
  end
end
