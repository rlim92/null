class CreateMemberships < ActiveRecord::Migration[5.2]
  def change
    create_table :memberships do |t|
      t.integer :member_id, null: false
      t.references :membershipable, polymorphic: true

      t.timestamps
    end
    add_index :memberships, :member_id
    add_index :memberships, [:membershipable_id, :membershipable_type, :member_id], unique: true, name: :membership_index
  end
end
