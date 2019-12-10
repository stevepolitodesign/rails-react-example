class TodoItem < ApplicationRecord
  default_scope { order(created_at: :desc) }

  belongs_to :user

  validates :title, presence: true
end
