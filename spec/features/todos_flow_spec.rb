require 'rails_helper'

RSpec.feature "TodosFlows", type: :feature do
  describe "creating a todo item", js: true do
    let(:user) { FactoryBot.create(:user) }
    valid_todo_item = 'this is a new note'
    context "todo item is valid" do
      it "creates a new todo item on the top of the list" do
        login_as(user, :scope => :user)
        visit root_path
        fill_in('title', with: valid_todo_item)
        click_button('Add To Do Item')
        new_todo_item = find('.table > tbody > tr:first-of-type td:nth-child(2) input:first-of-type')
        expect(new_todo_item.value).to eq(valid_todo_item)
      end
    end
    context "todo item is not valid", js: true do
      it "displays an error message" do
        skip
      end
    end
  end

  describe "updating a todo item", js: true do
    context "todo item is valid" do
      it "updates the todo item" do
        skip
      end
    end
    context "todo item is valid", js: true do
      it "displays an error message" do
        skip
      end
    end    
  end

  describe "deleting a todo item", js: true do
    it "removes the todo item from the list" do
      skip
    end
  end

  describe "filtering todo items", js: true do
    it "only shows incomplete todo items" do
      skip
    end
  end

end
