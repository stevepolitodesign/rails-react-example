FactoryBot.define do
  factory :todo_item do
    sequence(:title) { |n| "To Do Item #{n}" }
    user
    complete { false }
  end
end
