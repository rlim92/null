class Channel < ApplicationRecord
    validates :name, presence: true
    validates :is_private, inclusion: { in: [true, false] }

    before_save :default_public

    belongs_to :server,
        class_name: :Server,
        foreign_key: :server_id

    has_many :memberships, 
        as: :membershipable
    
    has_many :messages, 
        as: :messageable

    has_many :members,
        through: :memberships,
        source: :member

    def default_public
        self.is_private ||= false
    end

end
