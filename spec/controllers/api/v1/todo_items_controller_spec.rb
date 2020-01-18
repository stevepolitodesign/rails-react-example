require 'rails_helper'

RSpec.describe Api::V1::TodoItemsController, type: :controller do
    render_views
    describe "index" do
        let!(:user_with_todo_items) { FactoryBot.create(:user_with_todo_items) }
        context "when authenticated" do
            it "displays the current users todo items" do
                sign_in user_with_todo_items
                get :index, format: :json
                expect(response.status).to eq(200)
                expect(JSON.parse(response.body)).to eq(JSON.parse(user_with_todo_items.todo_items.to_json))
            end
        end
        context "when not authenticated" do
            it "returns unauthorized" do
                get :index, format: :json
                expect(response.status).to eq(401)
            end
        end
    end

    describe "show" do
        context "when authenticated" do
            it "returns a todo_item" do
                skip
            end
            it "does not allow a user to view other's todo_items" do
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
            it "creates a todo_item" do
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
            it "does not allow a user to update other's todo_items" do
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
        it "destroys a todo_item" do
            skip
        end
        it "does not allow a user to destroy other's todo_items" do
            skip
        end        
    end

end
