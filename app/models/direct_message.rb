class DirectMessage < ApplicationRecord
    validates :is_group, inclusion: { in: [true, false] }

    after_initialize :default_duo

    has_many :memberships,
        as: :membershipable
    
    has_many :members,
        through: :memberships,
        source: :member
    
    has_many :messages,
        as: :messageable

    
    def default_duo
        self.is_group ||= false
    end

end
