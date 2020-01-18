require 'rails_helper'

RSpec.describe TodoItemController, type: :controller do
    describe "index" do
        it "displays the current users todo items" do
            skip
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
