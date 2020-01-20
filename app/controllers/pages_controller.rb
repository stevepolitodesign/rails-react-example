class PagesController < ApplicationController

    before_action :authenticate_user!, only: [:my_todo_items]

    def home
    end
    
    def my_todo_items
    end
end