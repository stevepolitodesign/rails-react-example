require 'rails_helper'

RSpec.feature "TodosFlows", type: :feature do
  describe "creating a todo item" do
    context "todo item is valid" do
      it "creates a new todo item on the top of the list" do
        skip
      end
    end
    context "todo item is not valid" do
      it "displays an error message" do
        skip
      end
    end
  end

  describe "updating a todo item" do
    context "todo item is valid" do
      it "updates the todo item" do
        skip
      end
    end
    context "todo item is valid" do
      it "displays an error message" do
        skip
      end
    end    
  end

  describe "deleting a todo item" do
    it "removes the todo item from the list" do
      skip
    end
  end

  describe "filtering todo items" do
    it "only shows incomplete todo items" do
      skip
    end
  end
end
