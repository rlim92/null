class Channel < ApplicationRecord
    validates :name, presence: true
    validates :is_private, :is_voice, inclusion: { in: [true, false] }

    after_initialize :default_public, :default_text

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
    def default_text
        self.is_voice ||= false
    end

end
