class CreateDirectMessages < ActiveRecord::Migration[5.2]
  def change
    create_table :direct_messages do |t|
      t.boolean :is_group, default: false, null: false

      t.timestamps
    end
  end
end
