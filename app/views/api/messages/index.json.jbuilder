json.messages do 
    @dm.messages.each do |msg|
        json.set! msg.id do
            json.extract! msg, :id, :text
            json.authorId msg.author_id
            json.createdAt msg.created_at
            json.isPinned msg.is_pinned
        end
    end
end

json.members do 
    @members.each do |member|
        next if member.id === current_user.id
        json.set! member.id do
            json.extract! member, :id, :username
            json.isFriend current_user.friends.include?(member.id)
            json.avatarUrl member.avatar.attached? ? url_for(member.avatar) : ""
        end
    end
end
