FactoryBot.define do
  factory :todo_item do
    sequence(:title) { |n| "To Do Item #{n}" }
    user
    complete { false }

    factory :completed_todo_item do
      complete { true }
    end
  end
end
