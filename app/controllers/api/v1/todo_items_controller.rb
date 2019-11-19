class Api::V1::TodoItemsController < ApplicationController
    before_action :authenticate_user!
    before_action :set_todo_item, only: [:show, :edit, :update, :destroy]

    def index
      @todo_items = current_user.todo_items.all
    end
  
    def show
      respond_to do |format|
        if authorized?
          format.json { render :show }
        else
          format.json { render :unauthorized, status: 401 }
        end
      end
    end
  
    def new
      @todo_item = current_user.todo_item.build
    end
  
    def edit
    end
  
    def create
      @todo_item = current_user.todo_item.build(todo_item_params)
  
      respond_to do |format|
        if @todo_item.save
          format.json { render :show, status: :created, location: @todo_item }
        else
          format.json { render json: @todo_item.errors, status: :unprocessable_entity }
        end
      end
    end
  
    def update
      respond_to do |format|
        if @todo_item.update(todo_item_params)
          format.json { render :show, status: :ok, location: @todo_item }
        else
          format.json { render json: @todo_item.errors, status: :unprocessable_entity }
        end
      end
    end

    def destroy
      @todo_item.destroy
      respond_to do |format|
        format.json { head :no_content }
      end
    end
  
    private
      
      def set_todo_item
        @todo_item = TodoItem.find(params[:id])
      end

      def authorized?
        @todo_item.user == current_user
      end
  
      def todo_item_params
        params.require(:post).permit(:title, :complete)
      end    
end