json.directMessages do
    @direct_messages.each do |dm|
       json.set! dm.id do
            other_ids = dm.member_ids - [current_user.id]
            other_ids << current_user.id
            json.id dm.id
            json.memberIds other_ids
        end 
    end
end

json.members do
    @members.each do |member|
        next if member.id == current_user.id
        json.set! member.id do
            json.extract! member, :id, :username
            json.isFriend current_user.friends.include?(member.id)
            json.avatarUrl member.avatar.attached? ? url_for(member.avatar) : ""
        end
    end
end

json.currentUserId current_user.id