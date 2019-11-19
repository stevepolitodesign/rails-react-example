class CreateTodoItems < ActiveRecord::Migration[6.0]
  def change
    create_table :todo_items do |t|
      t.string :title
      t.references :user, null: false, foreign_key: true
      t.boolean :complete, default: false

      t.timestamps
    end
  end
end
