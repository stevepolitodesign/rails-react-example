class Api::V1::UsersController < ApplicationController
    
    before_filter :authenticate_user!

    def current_user
    end
    
end