class AddOmniauthColumnsToUsers < ActiveRecord::Migration[5.2]
  def change
    add_column :users, :provider, :string
    add_column :users, :uid, :string
    add_column :users, :image_url, :string
    add_column :users, :name, :string
    add_column :users, :description, :string

    add_index :users, [:uid, :provider], unique: true
  end
end
