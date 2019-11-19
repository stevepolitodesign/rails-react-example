class Api::V1::TodoItemsController < ApplicationController
    before_action :set_todo_item, only: [:show, :edit, :update, :destroy]

    def index
      @todo_items = TodoItem.all
    end
  
    def show
    end
  
    def new
      @todo_item = TodoItem.new
    end
  
    def edit
    end
  
    def create
      @todo_item = TodoItem.new(todo_item_params)
  
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
  
      def todo_item_params
        params.require(:post).permit(:title, :complete)
      end    
end