class CreateGroups < ActiveRecord::Migration
  def change
    create_table :groups do |t|
      t.string :name
      t.string :address
      t.string :phone
      t.string :city
      t.string :state
      t.string :zip

      t.timestamps
    end
  end
end
