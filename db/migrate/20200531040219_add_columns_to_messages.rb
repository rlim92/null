class AddColumnsToMessages < ActiveRecord::Migration[5.2]
  def change
    change_table :messages do |t|
      t.references :messageable, polymorphic: true
    end
  end
end
