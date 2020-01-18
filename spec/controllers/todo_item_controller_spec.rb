require 'rails_helper'

RSpec.describe Api::V1::TodoItemsController, type: :controller do
    describe "index" do
        let(:user_with_todo_items) { FactoryBot.build(:user_with_todo_items) }
        it "displays the current users todo items" do
            sign_in user_with_todo_items
        end
    end

    describe "show" do
        context "when authenticated" do
            it "returns a todo_item" do
                skip
            end
        end
        context "when not authenticated" do
            it "returns unauthorized" do
                skip
            end
        end        
    end

    describe "create" do
        context "when authenticated" do
            it "returns a todo_item" do
                skip
            end
        end
        context "when not authenticated" do
            it "returns unauthorized" do
                skip
            end
        end        
    end
    
    describe "update" do
        context "when authenticated" do
            it "returns a todo_item" do
                skip
            end
        end
        context "when not authenticated" do
            it "returns unauthorized" do
                skip
            end
        end        
    end
    
    describe "destroy" do
        it "returns no content" do
            skip
        end      
    end

end
