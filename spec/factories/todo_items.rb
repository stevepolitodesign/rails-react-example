FactoryBot.define do
  factory :todo_item do
    title { "MyString" }
    user { nil }
    complete { false }
  end
end
