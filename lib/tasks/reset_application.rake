namespace :reset_application do
  desc "Deletes existing data, and replaces with a fresh set"
  task reset: :environment do
    User.destroy_all
    sh %{rails db:seed}
  end

end
