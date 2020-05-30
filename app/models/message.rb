class Message < ApplicationRecord
    validates :text, :messageable_id, :messageable_type, :author_id, presence: true
    validates :is_pinned, inclusion: { in: [true, false] }

    before_save: :default_unpinned

    belongs_to :author,
        class_name: :User,
        foreign_key: :author_id

    belongs_to :messageable, polymorphic: true
    
    def default_unpinned
        self.is_pinned ||= false
    end
end
