require 'rails_helper'

RSpec.describe TodoItem, type: :model do

  describe "creation" do
    let(:todo_item) { FactoryBot.create(:todo_item) }
    it "can be created" do
      expect(todo_item).to be_valid
    end
  end

  describe "validations" do
    let(:todo_item) { FactoryBot.build(:todo_item) }
    it "should have a title" do
      todo_item.title = nil
      expect(todo_item).to_not be_valid
    end
    it "should have a user" do
      todo_item.user = nil
      expect(todo_item).to_not be_valid
    end    
  end

  describe "default values" do
    let(:todo_item) { FactoryBot.build(:todo_item) }
    it "should have complete set to false" do
      expect(todo_item.complete).to eq(false)
    end
  end

end
