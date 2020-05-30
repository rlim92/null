class ChangeColumnNameInServers < ActiveRecord::Migration[5.2]
  def change
    rename_column :servers, :is_private, :is_public
  end
end
