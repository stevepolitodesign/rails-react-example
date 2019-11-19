# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

2.times do |i|
    User.create(email: "user-#{i}.example.com", password: "password")
end

User.all.each_with_index do |u, i|
    u.todo_items.create(title: "To Do Item #{i} for #{u.email}", complete: i % 2 ? true : false  )
end