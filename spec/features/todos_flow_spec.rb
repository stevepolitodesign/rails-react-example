require 'rails_helper'

RSpec.feature "TodosFlows", type: :feature do
  describe "creating a todo item", js: true do
    let(:user) { FactoryBot.create(:user) }
    valid_todo_item = 'this is a new note'
    in_valid_todo_item = ''
    it "creates a new todo item on the top of the list" do
      login_as(user, :scope => :user)
      visit root_path
      fill_in('title', with: valid_todo_item)
      click_button('Add To Do Item')
      new_todo_item = find('.table > tbody > tr:first-of-type td:nth-child(2) input:first-of-type')
      expect(new_todo_item.value).to eq(valid_todo_item)
    end
  end

  describe "updating a todo item", js: true do
    let(:user_with_todo_items) { FactoryBot.create(:user_with_todo_items) }
    updated_todo_item_text = 'updated'
    context "todo item is valid" do
      it "updates the todo item" do
        login_as(user_with_todo_items, :scope => :user)
        visit root_path
        todo_item = user_with_todo_items.todo_items.first
        find("#todoItem__title-#{todo_item.id}").send_keys(updated_todo_item_text)
        sleep 2
        visit root_path
        updated_todo_item = find('.table > tbody > tr:first-of-type td:nth-child(2) input:first-of-type')
        expect(updated_todo_item.value).to eq(todo_item.title + updated_todo_item_text)
      end
    end
    context "todo item is invalid", js: true do
      it "displays an error message" do
        login_as(user_with_todo_items, :scope => :user)
        visit root_path
        todo_item = user_with_todo_items.todo_items.first
        fill_in("todoItem__title-#{todo_item.id}", with: "")
        expect(page).to have_content("can't be blank")
      end
    end    
  end

  describe "deleting a todo item", js: true do
    let(:user_with_todo_items) { FactoryBot.create(:user_with_todo_items) }
    it "removes the todo item from the list" do
      login_as(user_with_todo_items, :scope => :user)
      visit root_path
      todo_item = user_with_todo_items.todo_items.first
      row = find(".table > tbody > tr:first-of-type td:nth-child(3)")
      accept_confirm do
        row.click_button("Delete")
      end
      expect(page).to_not have_content(todo_item.title)
    end
  end

  describe "filtering todo items", js: true do
    let(:user_with_completed_todo_items) { FactoryBot.create(:user_with_completed_todo_items) }
    let(:user_with_todo_items) { FactoryBot.create(:user_with_todo_items) }
    it "hides newly completed item" do
      login_as(user_with_todo_items, :scope => :user)
      visit root_path
      todo_item = user_with_todo_items.todo_items.first
      check("complete-#{todo_item.id}")
      click_button("Hide Completed Items")
      within(".table-responsive tbody") do
        expect(page).to_not have_content(todo_item.title)
      end
    end
    it "only shows incomplete todo items" do
      login_as(user_with_completed_todo_items, :scope => :user)
      visit root_path
      todo_items = user_with_completed_todo_items.todo_items
      todo_items.each do |todo_item|
        expect(find("#todoItem__title-#{todo_item.id}").value).to eq(todo_item.title)
      end
      click_button("Hide Completed Items")
      within(".table-responsive tbody") do
        todo_items.each do |todo_item|
          expect(page).to_not have_content(todo_item.title)
        end
      end
    end
  end

end
