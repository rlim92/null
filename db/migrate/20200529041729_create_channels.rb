class CreateChannels < ActiveRecord::Migration[5.2]
  def change
    create_table :channels do |t|
      t.string :name, null: false
      t.text :description, null: false
      t.boolean :is_voice, null: false
      t.boolean :is_private, null: false

      t.timestamps
    end
  end
end
