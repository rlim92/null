json.members do
    @dms.each do |dm|
        dm.members.each do |member|
            next if member.id == current_user.id
            json.set! member.id do
                json.extract! member, :id, :username
                json.isFriend current_user.friends.include?(member.id)
            end
        end
    end
end

json.currentUserId current_user.id