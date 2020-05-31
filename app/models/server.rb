class Server < ApplicationRecord
    validates :name, :description, presence: true
    validates :is_public, inclusion: { in: [true, false] }

    before_save :default_private

    belongs_to :owner,
        class_name: :User,
        foreign_key: :owner_id

    has_many :memberships, 
        as: :membershipable
    
    has_many :messages, 
        as: :messageable

    has_many :members,
        through: :memberships,
        source: :member

    has_many :channels,
        class_name: :Channel,
        foreign_key: :server_id

    def default_private
        self.is_public ||= false
    end
end
