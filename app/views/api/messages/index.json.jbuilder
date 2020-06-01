@messages.each do |msg|
    json.set! msg.id do
        json.extract! msg, :id, :text
        json.authorId msg.author_id
        json.createdAt msg.created_at
        json.isPinned msg.is_pinned
    end
end